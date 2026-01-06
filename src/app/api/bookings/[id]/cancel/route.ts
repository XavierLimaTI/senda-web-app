import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendCancellationEmail } from '@/lib/email'

/**
 * POST /api/bookings/[id]/cancel
 * 
 * Cancela um booking existente
 * 
 * Body:
 * {
 *   reason?: string (opcional)
 * }
 * 
 * Política de cancelamento:
 * - Grátis se cancelar com 24h+ de antecedência
 * - Taxa de 50% se cancelar com menos de 24h
 * - Cliente pode sinalizar emergência para pedir isenção
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }

    const bookingId = parseInt(params.id)
    const body = await req.json()
    const { reason } = body

    // Buscar booking existente
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        client: true,
        therapist: { include: { user: true } }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar permissão (cliente dono ou terapeuta)
    const userIdNum = parseInt(session.user.id)
    const isClient = booking.clientId === userIdNum
    const isTherapist = booking.therapist.userId === userIdNum

    if (!isClient && !isTherapist) {
      return NextResponse.json(
        { error: 'Você não tem permissão para cancelar este agendamento' },
        { status: 403 }
      )
    }

    // Validar status (não pode cancelar se já está cancelado ou completo)
    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Este agendamento já está cancelado' },
        { status: 400 }
      )
    }

    if (booking.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Não é possível cancelar um agendamento já realizado' },
        { status: 400 }
      )
    }

    // Calcular política de cancelamento
    const now = new Date()
    const startTime = new Date(booking.startTime)
    const hoursUntilSession = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    let refundPercentage = 100
    let cancellationFee = 0

    if (hoursUntilSession < 24) {
      refundPercentage = 50
      cancellationFee = booking.service.price * 0.5
    }

    // Atualizar booking para CANCELLED
    const cancelledBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        notes: reason ? `Cancelado: ${reason}` : 'Cancelado pelo usuário'
      },
      include: {
        service: true,
        client: true,
        therapist: { include: { user: true } }
      }
    })

    // Enviar emails de notificação
    Promise.all([
      // Email para o cliente
      sendCancellationEmail(
        cancelledBooking.client.email,
        cancelledBooking.client.name,
        {
          serviceName: cancelledBooking.service.name,
          startTime: cancelledBooking.startTime,
          reason,
          isClient: true
        }
      ),
      // Email para o terapeuta
      sendCancellationEmail(
        cancelledBooking.therapist.user.email,
        cancelledBooking.therapist.user.name,
        {
          serviceName: cancelledBooking.service.name,
          startTime: cancelledBooking.startTime,
          reason,
          isClient: false
        }
      )
    ]).catch(err => console.error('Erro ao enviar emails de cancelamento:', err))

    return NextResponse.json({
      booking: cancelledBooking,
      refundInfo: {
        originalAmount: booking.service.price,
        refundPercentage,
        refundAmount: booking.service.price * (refundPercentage / 100),
        cancellationFee,
        hoursUntilSession: Math.round(hoursUntilSession * 10) / 10
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Erro ao cancelar:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

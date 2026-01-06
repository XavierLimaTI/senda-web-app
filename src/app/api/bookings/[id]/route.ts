import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendCancellationEmail } from '@/lib/email'

/**
 * PATCH /api/bookings/[id]
 * 
 * Atualiza status do agendamento
 * 
 * Body:
 * {
 *   status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
 * }
 */
export async function PATCH(
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

    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json(
        { error: 'Apenas terapeutas podem atualizar agendamentos' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { status } = body

    if (!status || !['CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      )
    }

    // Buscar perfil do terapeuta
    const therapist = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id) }
    })

    if (!therapist) {
      return NextResponse.json(
        { error: 'Perfil de terapeuta não encontrado' },
        { status: 404 }
      )
    }

    // Buscar agendamento
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(params.id) }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }

    // Validar que o agendamento pertence ao terapeuta
    if (booking.therapistId !== therapist.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para atualizar este agendamento' },
        { status: 403 }
      )
    }

    // Validar transições de status
    const validTransitions: Record<string, string[]> = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['COMPLETED', 'CANCELLED'],
      COMPLETED: [],
      CANCELLED: []
    }

    if (!validTransitions[booking.status]?.includes(status)) {
      return NextResponse.json(
        { error: `Transição inválida de ${booking.status} para ${status}` },
        { status: 400 }
      )
    }

    // Atualizar agendamento
    const updatedBooking = await prisma.booking.update({
      where: { id: parseInt(params.id) },
      data: { status },
      include: {
        service: true,
        client: true,
        therapist: { include: { user: { select: { name: true } } } }
      }
    })

    // TODO: Enviar email de notificação ao cliente

    return NextResponse.json({ booking: updatedBooking })
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/bookings/[id]
 * 
 * Cancela um agendamento
 */
export async function DELETE(
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

    // Buscar agendamento
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(params.id) },
      include: { client: true }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }

    // Validar que o usuário é o cliente ou terapeuta
    const isClient = booking.clientId === parseInt(session.user.id)
    const isTherapist = session.user.role === 'THERAPIST' && 
      (await prisma.therapistProfile.findUnique({
        where: { userId: parseInt(session.user.id) }
      }))?.id === booking.therapistId

    if (!isClient && !isTherapist) {
      return NextResponse.json(
        { error: 'Você não tem permissão para cancelar este agendamento' },
        { status: 403 }
      )
    }

    // Validar que agendamento não foi realizado
    if (booking.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Não é possível cancelar um agendamento já realizado' },
        { status: 400 }
      )
    }

    // Cancelar agendamento
    const cancelledBooking = await prisma.booking.update({
      where: { id: parseInt(params.id) },
      data: { status: 'CANCELLED' },
      include: {
        service: { select: { name: true } },
        client: { select: { name: true, email: true } },
        therapist: { include: { user: { select: { name: true, email: true } } } }
      }
    })

    // Enviar emails de notificação (não bloquear resposta)
    Promise.all([
      sendCancellationEmail(
        cancelledBooking.client.email,
        cancelledBooking.client.name,
        {
          serviceName: cancelledBooking.service.name,
          startTime: cancelledBooking.startTime,
          isClient: true
        }
      ),
      sendCancellationEmail(
        cancelledBooking.therapist.user.email,
        cancelledBooking.therapist.user.name,
        {
          serviceName: cancelledBooking.service.name,
          startTime: cancelledBooking.startTime,
          isClient: false
        }
      )
    ]).catch(err => {
      console.error('Erro ao enviar emails de cancelamento:', err)
    })

    // TODO: Processar reembolso se pagamento foi processado

    return NextResponse.json({ booking: cancelledBooking })
  } catch (error) {
    console.error('Erro ao cancelar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

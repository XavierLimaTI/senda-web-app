import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendRescheduleNotificationToClient, sendRescheduleNotificationToTherapist } from '@/lib/email'

/**
 * POST /api/bookings/[id]/reschedule
 * 
 * Reagenda um booking existente
 * 
 * Body:
 * {
 *   newStartTime: Date (ISO string)
 * }
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
    const { newStartTime } = body

    if (!newStartTime) {
      return NextResponse.json(
        { error: 'newStartTime é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar booking existente
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        client: true,
        therapist: true
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar permissão (apenas cliente dono do agendamento)
    const userIdNum = parseInt(session.user.id)
    if (booking.clientId !== userIdNum) {
      return NextResponse.json(
        { error: 'Você não tem permissão para reagendar este agendamento' },
        { status: 403 }
      )
    }

    // Validar status (só pode reagendar CONFIRMED)
    if (booking.status !== 'CONFIRMED') {
      return NextResponse.json(
        { error: 'Apenas agendamentos confirmados podem ser reagendados' },
        { status: 400 }
      )
    }

    // Validar prazo mínimo (24h de antecedência)
    const now = new Date()
    const originalStart = new Date(booking.startTime)
    const hoursUntilOriginal = (originalStart.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursUntilOriginal < 24) {
      return NextResponse.json(
        { error: 'Reagendamento deve ser feito com no mínimo 24h de antecedência' },
        { status: 400 }
      )
    }

    // Validar nova data (não pode ser no passado)
    const newStart = new Date(newStartTime)
    if (newStart < now) {
      return NextResponse.json(
        { error: 'A nova data não pode ser no passado' },
        { status: 400 }
      )
    }

    // Calcular novo horário de término
    const newEndTime = new Date(newStart.getTime() + booking.service.duration * 60000)

    // Verificar disponibilidade do terapeuta no novo horário
    const dayOfWeek = newStart.getDay()
    const timeString = newStart.toTimeString().substring(0, 5) // "HH:MM"

    const availability = await prisma.availability.findFirst({
      where: {
        therapistId: booking.therapistId,
        dayOfWeek,
        startTime: { lte: timeString },
        endTime: { gte: timeString }
      }
    })

    if (!availability) {
      return NextResponse.json(
        { error: 'Terapeuta não disponível no horário escolhido' },
        { status: 400 }
      )
    }

    // Verificar conflitos com outros agendamentos
    const conflicts = await prisma.booking.findFirst({
      where: {
        therapistId: booking.therapistId,
        status: { in: ['CONFIRMED', 'PENDING'] },
        id: { not: bookingId }, // Excluir o próprio booking
        OR: [
          {
            AND: [
              { startTime: { lte: newStart } },
              { endTime: { gt: newStart } }
            ]
          },
          {
            AND: [
              { startTime: { lt: newEndTime } },
              { endTime: { gte: newEndTime } }
            ]
          }
        ]
      }
    })

    if (conflicts) {
      return NextResponse.json(
        { error: 'Horário já está ocupado' },
        { status: 409 }
      )
    }

    // Atualizar booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        startTime: newStart,
        endTime: newEndTime
      },
      include: {
        service: true,
        client: true,
        therapist: { include: { user: true } }
      }
    })

    // Enviar emails de notificação de reagendamento
    Promise.all([
      sendRescheduleNotificationToClient(
        updatedBooking.client.email,
        updatedBooking.client.name,
        {
          therapistName: updatedBooking.therapist.user.name,
          serviceName: updatedBooking.service.name,
          oldStartTime: booking.startTime,
          newStartTime: updatedBooking.startTime,
          price: updatedBooking.service.price,
          bookingId: updatedBooking.id
        }
      ),
      sendRescheduleNotificationToTherapist(
        updatedBooking.therapist.user.email,
        updatedBooking.therapist.user.name,
        {
          clientName: updatedBooking.client.name,
          serviceName: updatedBooking.service.name,
          oldStartTime: booking.startTime,
          newStartTime: updatedBooking.startTime,
          price: updatedBooking.service.price,
          bookingId: updatedBooking.id
        }
      )
    ]).catch(err => console.error('Erro ao enviar emails de reagendamento:', err))

    return NextResponse.json({ booking: updatedBooking }, { status: 200 })

  } catch (error) {
    console.error('Erro ao reagendar:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

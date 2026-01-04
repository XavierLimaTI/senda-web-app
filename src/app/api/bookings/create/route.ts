import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  sendBookingConfirmationToClient,
  sendBookingNotificationToTherapist
} from '@/lib/email-notifications'

/**
 * POST /api/bookings/create
 * 
 * Creates a booking with payment processing
 * 
 * Body:
 * {
 *   therapistId: number
 *   serviceId: number
 *   startTime: ISO string
 *   amount: number (price in R$)
 *   paymentMethod: 'credit_card' | 'pix'
 * }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Apenas clientes podem criar agendamentos' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { therapistId, serviceId, startTime, amount, paymentMethod } = body

    // Validate inputs
    if (!therapistId || !serviceId || !startTime || amount === undefined) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    const start = new Date(startTime)
    if (isNaN(start.getTime())) {
      return NextResponse.json(
        { error: 'Data/hora inválida' },
        { status: 400 }
      )
    }

    if (start < new Date()) {
      return NextResponse.json(
        { error: 'Não é possível agendar para o passado' },
        { status: 400 }
      )
    }

    // Verify therapist exists and is verified
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
      include: { user: true }
    })

    if (!therapist) {
      return NextResponse.json(
        { error: 'Terapeuta não encontrado' },
        { status: 404 }
      )
    }

    if (!therapist.verified) {
      return NextResponse.json(
        { error: 'Terapeuta não está verificado' },
        { status: 400 }
      )
    }

    // Verify service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })

    if (!service || service.therapistId !== therapistId) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    // Check for conflicting bookings
    const conflict = await prisma.booking.findFirst({
      where: {
        therapistId,
        startTime: {
          lte: new Date(start.getTime() + (service.duration || 60) * 60000),
          gte: start
        },
        status: { in: ['CONFIRMED', 'PENDING'] }
      }
    })

    if (conflict) {
      return NextResponse.json(
        { error: 'Horário não está disponível' },
        { status: 400 }
      )
    }

    // Calculate end time (duration in minutes)
    const duration = service.duration || 60
    const end = new Date(start.getTime() + duration * 60000)

    // Get userId (convert from string to number)
    const userId = parseInt(session.user.id as string)

    // Create booking with payment in a transaction
    const booking = await prisma.booking.create({
      data: {
        clientId: userId,
        therapistId,
        serviceId,
        startTime: start,
        endTime: end,
        status: 'PENDING',
        payment: {
          create: {
            userId: userId,
            amount: amount,
            sendaFee: Math.round(amount * 0.15 * 100) / 100, // 15% fee
            professionalAmount: Math.round(amount * 0.85 * 100) / 100,
            status: 'APPROVED',
            method: paymentMethod === 'pix' ? 'pix' : 'credit_card',
            transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
          }
        }
      },
      include: {
        service: true,
        payment: true,
        therapist: { include: { user: true } }
      }
    })

    // Update booking status to CONFIRMED after payment
    const confirmedBooking = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'CONFIRMED' },
      include: {
        service: true,
        payment: true,
        therapist: { include: { user: true } },
        client: true
      }
    })

    // Send confirmation emails asynchronously (don't block response)
    const appointmentDate = start.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const appointmentTime = start.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })

    // Send to client
    if (confirmedBooking.client?.email) {
      sendBookingConfirmationToClient({
        clientEmail: confirmedBooking.client.email,
        clientName: confirmedBooking.client.name || 'Cliente',
        therapistName: therapist.user.name || 'Terapeuta',
        serviceName: confirmedBooking.service.name,
        appointmentDate,
        appointmentTime,
        bookingId: confirmedBooking.id
      }).catch(error => console.error('[Email to client]', error))
    }

    // Send to therapist
    if (confirmedBooking.therapist?.user?.email) {
      sendBookingNotificationToTherapist({
        therapistEmail: confirmedBooking.therapist.user.email,
        therapistName: therapist.user.name || 'Terapeuta',
        clientName: confirmedBooking.client?.name || 'Cliente',
        clientPhone: confirmedBooking.client?.phone || null,
        serviceName: confirmedBooking.service.name,
        appointmentDate,
        appointmentTime,
        bookingId: confirmedBooking.id
      }).catch(error => console.error('[Email to therapist]', error))
    }

    return NextResponse.json(confirmedBooking, { status: 201 })
  } catch (error) {
    console.error('[/api/bookings/create] Error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar agendamento' },
      { status: 500 }
    )
  }
}

import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'
import { sendBookingConfirmationEmail, sendBookingNotificationToTherapist } from '@/lib/email'

/**
 * POST /api/payments/simulate-confirm
 * 
 * Simula confirmação de pagamento (apenas para testes/desenvolvimento)
 * 
 * Body: { transactionId: string, method: 'CREDIT_CARD' | 'PIX' | 'BOLETO' }
 */
export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { transactionId, method } = body

    if (!transactionId || !method) {
      return NextResponse.json(
        { error: 'transactionId e method obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar pagamento
    const payment = await prisma.payment.findFirst({
      where: { transactionId },
      include: { booking: true }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Pagamento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar permissão
    if (payment.userId !== parseInt(session.user.id)) {
      return NextResponse.json(
        { error: 'Sem permissão' },
        { status: 403 }
      )
    }

    // Atualizar pagamento e booking (transação atômica)
    const [updatedPayment, updatedBooking] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'APPROVED',
          method: method
        }
      }),
      prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' }
      }),
      // Buscar dados completos para emails
      prisma.booking.findUnique({
        where: { id: payment.bookingId },
        include: {
          client: { select: { name: true, email: true } },
          therapist: { include: { user: { select: { name: true, email: true } } } },
          service: { select: { name: true, price: true } }
        }
      })
    ])

    // Enviar emails de confirmação (não bloquear resposta)
    const bookingData = updatedBooking as any
    if (bookingData && bookingData.client && bookingData.therapist) {
      Promise.all([
        sendBookingConfirmationEmail(
          bookingData.client.email,
          bookingData.client.name,
          {
            therapistName: bookingData.therapist.user.name,
            serviceName: bookingData.service.name,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            price: bookingData.service.price,
            bookingId: bookingData.id
          }
        ),
        sendBookingNotificationToTherapist(
          bookingData.therapist.user.email,
          bookingData.therapist.user.name,
          {
            clientName: bookingData.client.name,
            serviceName: bookingData.service.name,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            price: bookingData.service.price,
            bookingId: bookingData.id
          }
        )
      ]).catch(err => {
        console.error('Erro ao enviar emails:', err)
      })
    }

    return NextResponse.json({
      success: true,
      payment: updatedPayment,
      booking: updatedBooking
    })
  } catch (error) {
    console.error('Erro ao simular pagamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}


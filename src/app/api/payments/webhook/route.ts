import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/payments/webhook
 * 
 * Webhook do Asaas para confirmar pagamentos
 * 
 * Headers:
 * - asaas-webhook-token: token de verificação (opcional)
 * 
 * Body (exemplo Asaas):
 * {
 *   event: "payment.confirmed" | "payment.received" | "payment.failed",
 *   payment: {
 *     id: "pay_xxx",
 *     status: "CONFIRMED" | "RECEIVED" | "OVERDUE",
 *     value: 100.00,
 *     externalReference: "booking_123"
 *   }
 * }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { event, payment } = body

    console.log('Webhook Asaas recebido:', { event, paymentId: payment?.id })

    // Extrair booking ID da referência externa
    if (!payment?.externalReference?.startsWith('booking_')) {
      return NextResponse.json({ received: true })
    }

    const bookingId = parseInt(payment.externalReference.replace('booking_', ''))

    // Buscar pagamento no BD
    const existingPayment = await prisma.payment.findUnique({
      where: { bookingId },
      include: { booking: true }
    })

    if (!existingPayment) {
      console.warn('Pagamento não encontrado para booking:', bookingId)
      return NextResponse.json({ received: true })
    }

    // Mapear status Asaas → Senda
    let newStatus = existingPayment.status
    let bookingStatus = existingPayment.booking.status

    if (event === 'payment.confirmed' || event === 'payment.received') {
      newStatus = 'APPROVED'
      // Confirmar agendamento automaticamente
      if (existingPayment.booking.status === 'PENDING') {
        bookingStatus = 'CONFIRMED'
      }
    } else if (event === 'payment.failed' || event === 'payment.overdue') {
      newStatus = 'FAILED'
      // Manter booking em PENDING para cliente tentar novamente
    }

    // Atualizar pagamento e agendamento
    const [updatedPayment, updatedBooking] = await Promise.all([
      prisma.payment.update({
        where: { bookingId },
        data: {
          status: newStatus,
          method: payment.billingType || 'UNDEFINED'
        }
      }),
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: bookingStatus }
      })
    ])

    console.log('Pagamento atualizado:', {
      bookingId,
      paymentStatus: newStatus,
      bookingStatus: bookingStatus
    })

    // TODO: Enviar email de confirmação ao cliente e terapeuta

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    // Retornar 200 para Asaas não reenviar
    return NextResponse.json({ received: true }, { status: 200 })
  }
}

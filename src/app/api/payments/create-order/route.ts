import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'
import { createAsaasPayment } from '@/lib/asaas'

/**
 * POST /api/payments/create-order
 * 
 * Cria uma cobrança de pagamento para um agendamento
 * 
 * Body:
 * {
 *   bookingId: number
 * }
 * 
 * Response:
 * {
 *   payment: { id, value, status, invoiceUrl, checkoutUrl },
 *   booking: { id, status }
 * }
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

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Apenas clientes podem fazer pagamentos' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { bookingId } = body

    if (!bookingId) {
      return NextResponse.json(
        { error: 'bookingId obrigatório' },
        { status: 400 }
      )
    }

    // Buscar agendamento
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
        payment: true
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }

    // Buscar dados do cliente (clientId na tabela Booking é o User.id)
    const client = await prisma.clientProfile.findUnique({
      where: { userId: booking.clientId },
      include: { user: true }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Perfil de cliente não encontrado' },
        { status: 404 }
      )
    }

    const clientUser = client.user

    // Buscar terapeuta
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: booking.therapistId },
      include: { user: { select: { name: true } } }
    })

    // Validar que o agendamento pertence ao cliente
    if (booking.clientId !== parseInt(session.user.id)) {
      return NextResponse.json(
        { error: 'Você não tem permissão para pagar este agendamento' },
        { status: 403 }
      )
    }

    // Validar que agendamento está em estado para pagamento
    if (booking.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Agendamento em status ${booking.status} não pode ser pago` },
        { status: 400 }
      )
    }

    // Validar que não existe pagamento já criado
    if (booking.payment) {
      return NextResponse.json(
        { error: 'Este agendamento já possui um pagamento' },
        { status: 400 }
      )
    }

    // Calcular taxa Senda (10% padrão)
    const sendaFeePercent = 0.10
    const servicePrice = booking.service.price
    const sendaFee = Math.round(servicePrice * sendaFeePercent * 100) / 100
    const therapistAmount = servicePrice - sendaFee

    // Criar pagamento no Asaas
    const asaasPayment = await createAsaasPayment({
      customer: {
        name: clientUser?.name || 'Cliente',
        email: clientUser?.email || '',
        phone: clientUser?.phone || ''
      },
      billing: {
        bookingId: booking.id,
        therapistId: booking.therapistId,
        servicePrice: servicePrice,
        sendaFee: sendaFee
      },
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Próximas 24h
      description: `Sessão de ${booking.service.name} com ${therapist?.user.name || 'Terapeuta'}`
    })

    // Criar registro de pagamento no BD
    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: booking.clientId,
        amount: servicePrice,
        sendaFee: sendaFee,
        professionalAmount: therapistAmount,
        status: 'PENDING',
        method: 'UNDEFINED', // Será definido no checkout
        transactionId: asaasPayment.id
      }
    })

    return NextResponse.json({
      payment: {
        id: asaasPayment.id, // Transaction ID para o checkout
        transactionId: asaasPayment.id,
        value: asaasPayment.value,
        netValue: asaasPayment.netValue,
        status: asaasPayment.status,
        invoiceUrl: asaasPayment.invoiceUrl,
        checkoutUrl: asaasPayment.paymentUrl
      },
      booking: {
        id: booking.id,
        status: booking.status
      }
    })
  } catch (error) {
    console.error('Erro ao criar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}


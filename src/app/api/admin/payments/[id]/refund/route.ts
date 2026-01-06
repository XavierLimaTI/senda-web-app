import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
// Refunds via Asaas are not implemented yet. This endpoint now only marks the
// payment as refunded in the database. When Asaas refund API is available,
// replace this stub with the real call.

interface RouteParams {
  params: { id: string }
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await req.json()

    // Buscar pagamento antes de marcar reembolso
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        booking: {
          include: {
            client: true,
            therapist: { include: { user: true } },
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Pagamento não encontrado' },
        { status: 404 }
      )
    }

    // Validate payment can be refunded
    if (payment.status === 'REFUNDED') {
      return NextResponse.json(
        { error: 'Pagamento já foi reembolsado' },
        { status: 400 }
      )
    }

    if (payment.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Apenas pagamentos aprovados podem ser reembolsados' },
        { status: 400 }
      )
    }

    // Update payment status in database (manual Asaas refund stub)
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(params.id) },
      data: {
        status: 'REFUNDED',
        refundedAt: new Date(),
        description: `${payment.description || ''} [Refund manual (Asaas pending)]`,
      },
      include: {
        booking: {
          include: {
            client: true,
            therapist: { include: { user: true } },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      payment: updatedPayment,
      note: 'Reembolso marcado como REFUNDED. Processar no Asaas manualmente se aplicável.',
    })
  } catch (error: any) {
    console.error('❌ Error processing refund:', error)
    return NextResponse.json(
      { 
        error: 'Erro ao processar reembolso',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

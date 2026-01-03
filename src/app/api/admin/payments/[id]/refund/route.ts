import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { amount } = body

    // Update payment status
    const payment = await prisma.payment.update({
      where: { id: parseInt(params.id) },
      data: {
        status: 'refunded',
        refundedAt: new Date(),
      },
    })

    // TODO: Integrate with Stripe API to process actual refund
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // if (payment.stripePaymentIntentId) {
    //   await stripe.refunds.create({
    //     payment_intent: payment.stripePaymentIntentId,
    //     amount: amount,
    //   })
    // }

    return NextResponse.json(payment)
  } catch (error) {
    console.error('Error processing refund:', error)
    return NextResponse.json(
      { error: 'Erro ao processar reembolso' },
      { status: 500 }
    )
  }
}

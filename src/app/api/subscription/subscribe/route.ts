import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/subscription/subscribe
 * Create a new subscription for the user
 * Body: { planId: number }
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId } = await req.json()

    if (!planId || typeof planId !== 'number') {
      return NextResponse.json({ error: 'Invalid planId' }, { status: 400 })
    }

    // Verify plan exists and is active
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    })

    if (!plan || !plan.active) {
      return NextResponse.json({ error: 'Plan not found or inactive' }, { status: 404 })
    }

    // Check if user has active subscription - cancel it first
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: parseInt(session.user.id),
        status: 'ACTIVE',
      },
    })

    if (existingSubscription) {
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
          cancelReason: 'Upgraded or downgraded plan',
        },
      })
    }

    // Create new subscription
    const now = new Date()
    const periodEnd = new Date(now)
    periodEnd.setMonth(periodEnd.getMonth() + 1)

    const subscription = await prisma.subscription.create({
      data: {
        userId: parseInt(session.user.id),
        planId,
        status: 'ACTIVE',
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        autoRenew: true,
      },
      include: { plan: true },
    })

    // TODO: Create Payment record for initial subscription
    // This will be connected to your billing provider (Asaas, Stripe, etc)

    return NextResponse.json(
      { subscription, message: 'Subscription created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

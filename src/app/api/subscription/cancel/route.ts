import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * PATCH /api/subscription/cancel
 * Cancel user's current subscription
 * Body: { reason?: string }
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { reason } = await req.json()

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: parseInt(session.user.id),
        status: 'ACTIVE',
      },
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      )
    }

    const updated = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancelReason: reason || 'User cancelled',
        autoRenew: false,
      },
      include: { plan: true },
    })

    return NextResponse.json(
      { subscription: updated, message: 'Subscription cancelled' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}

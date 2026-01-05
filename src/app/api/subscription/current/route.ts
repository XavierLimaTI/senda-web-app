import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * GET /api/subscription/current
 * Get current user's active subscription
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: parseInt(session.user.id),
        status: 'ACTIVE',
      },
      include: {
        plan: true,
      },
    })

    if (!subscription) {
      return NextResponse.json({ subscription: null }, { status: 200 })
    }

    return NextResponse.json({ subscription }, { status: 200 })
  } catch (error) {
    console.error('Error fetching current subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}


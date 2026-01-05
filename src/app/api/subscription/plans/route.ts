import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * GET /api/subscription/plans
 * List available subscription plans filtered by user role
 * Query params: role (optional, defaults to user's role)
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const roleParam = req.nextUrl.searchParams.get('role')
    const role = (roleParam as 'CLIENT' | 'THERAPIST' | 'SPACE') || (session.user.role as string)

    const plans = await prisma.subscriptionPlan.findMany({
      where: {
        active: true,
        role: role as 'CLIENT' | 'THERAPIST' | 'SPACE',
      },
      orderBy: { monthlyFee: 'asc' },
    })

    return NextResponse.json({ plans }, { status: 200 })
  } catch (error) {
    console.error('Error fetching subscription plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    )
  }
}


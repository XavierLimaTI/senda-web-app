import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/trails/progress - Get client's trail progress
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clientProfile: true },
    })

    if (!user?.clientProfile) {
      return NextResponse.json(
        { error: 'Only clients can view trail progress' },
        { status: 403 }
      )
    }

    const progress = await prisma.trailProgress.findMany({
      where: { clientId: user.clientProfile.id },
      include: {
        trail: {
          include: {
            author: {
              select: {
                user: { select: { name: true } },
              },
            },
            lessons: { select: { id: true } },
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching trail progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

// POST /api/trails/progress - Start/enroll in a trail
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clientProfile: true },
    })

    if (!user?.clientProfile) {
      return NextResponse.json(
        { error: 'Only clients can enroll in trails' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { trailId } = body

    if (!trailId) {
      return NextResponse.json(
        { error: 'Missing required field: trailId' },
        { status: 400 }
      )
    }

    // Check if trail exists and is published
    const trail = await prisma.trail.findUnique({
      where: { id: parseInt(trailId) },
    })

    if (!trail || !trail.published) {
      return NextResponse.json({ error: 'Trail not found' }, { status: 404 })
    }

    // Check if already enrolled
    const existingProgress = await prisma.trailProgress.findFirst({
      where: {
        clientId: user.clientProfile.id,
        trailId: parseInt(trailId),
      },
    })

    if (existingProgress) {
      return NextResponse.json(existingProgress)
    }

    // Create new trail progress
    const progress = await prisma.trailProgress.create({
      data: {
        clientId: user.clientProfile.id,
        trailId: parseInt(trailId),
        status: 'IN_PROGRESS',
      },
      include: {
        trail: {
          include: {
            lessons: { orderBy: { order: 'asc' } },
          },
        },
      },
    })

    return NextResponse.json(progress, { status: 201 })
  } catch (error) {
    console.error('Error starting trail:', error)
    return NextResponse.json(
      { error: 'Failed to start trail' },
      { status: 500 }
    )
  }
}

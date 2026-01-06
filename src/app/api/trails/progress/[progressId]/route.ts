import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/trails/progress/[progressId] - Update trail progress
export async function PUT(
  request: Request,
  { params }: { params: { progressId: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clientProfile: true },
    })

    if (!user?.clientProfile) {
      return NextResponse.json(
        { error: 'Only clients can update progress' },
        { status: 403 }
      )
    }

    const progressId = parseInt(params.progressId)
    const progress = await prisma.trailProgress.findUnique({
      where: { id: progressId },
    })

    if (!progress) {
      return NextResponse.json(
        { error: 'Progress record not found' },
        { status: 404 }
      )
    }

    if (progress.clientId !== user.clientProfile.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this progress' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { completedLessons, status } = body

    const updatedProgress = await prisma.trailProgress.update({
      where: { id: progressId },
      data: {
        ...(completedLessons !== undefined && { completedLessons }),
        ...(status && { status }),
        ...(status === 'COMPLETED' && { completedAt: new Date() }),
      },
      include: { trail: true },
    })

    return NextResponse.json(updatedProgress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

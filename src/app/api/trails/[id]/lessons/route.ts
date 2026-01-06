import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/trails/[id]/lessons - Create lesson in trail
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { therapistProfile: true },
    })

    if (!user?.therapistProfile) {
      return NextResponse.json(
        { error: 'Only therapists can create lessons' },
        { status: 403 }
      )
    }

    const trailId = parseInt(params.id)
    const trail = await prisma.trail.findUnique({
      where: { id: trailId },
    })

    if (!trail) {
      return NextResponse.json({ error: 'Trail not found' }, { status: 404 })
    }

    if (trail.authorId !== user.therapistProfile.id) {
      return NextResponse.json(
        { error: 'Unauthorized to edit this trail' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, contentType, mediaUrl, order } = body

    if (!title || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields: title, contentType' },
        { status: 400 }
      )
    }

    // Get next order number if not provided
    const nextOrder =
      order ||
      (await prisma.lesson.findMany({
        where: { trailId },
        select: { order: true },
        orderBy: { order: 'desc' },
        take: 1,
      })) [0]?.order + 1 ||
      1

    const lesson = await prisma.lesson.create({
      data: {
        trailId,
        title,
        content: content || '',
        contentType,
        mediaUrl: mediaUrl || null,
        order: nextOrder,
      },
    })

    return NextResponse.json(lesson, { status: 201 })
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}

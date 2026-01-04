import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PUT /api/trails/lessons/[lessonId] - Update lesson
export async function PUT(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { therapistProfile: true },
    })

    if (!user?.therapistProfile) {
      return NextResponse.json(
        { error: 'Only therapists can edit lessons' },
        { status: 403 }
      )
    }

    const lessonId = parseInt(params.lessonId)
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { trail: true },
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    if (lesson.trail.authorId !== user.therapistProfile.id) {
      return NextResponse.json(
        { error: 'Unauthorized to edit this lesson' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, contentType, mediaUrl, order } = body

    const updatedLesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(contentType && { contentType }),
        ...(mediaUrl !== undefined && { mediaUrl }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(updatedLesson)
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 }
    )
  }
}

// DELETE /api/trails/lessons/[lessonId] - Delete lesson
export async function DELETE(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { therapistProfile: true },
    })

    if (!user?.therapistProfile) {
      return NextResponse.json(
        { error: 'Only therapists can delete lessons' },
        { status: 403 }
      )
    }

    const lessonId = parseInt(params.lessonId)
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { trail: true },
    })

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    if (lesson.trail.authorId !== user.therapistProfile.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this lesson' },
        { status: 403 }
      )
    }

    await prisma.lesson.delete({
      where: { id: lessonId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/trails/[id] - Get trail details with lessons
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trailId = parseInt(params.id)

    const trail = await prisma.trail.findUnique({
      where: { id: trailId },
      include: {
        author: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
            specialty: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            content: true,
            contentType: true,
            mediaUrl: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!trail) {
      return NextResponse.json({ error: 'Trail not found' }, { status: 404 })
    }

    // Check if published or user is author
    const session = await getServerSession(authOptions)
    if (!trail.published && session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { therapistProfile: true },
      })
      if (user?.therapistProfile?.id !== trail.authorId) {
        return NextResponse.json(
          { error: 'Trail not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(trail)
  } catch (error) {
    console.error('Error fetching trail:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trail' },
      { status: 500 }
    )
  }
}

// PUT /api/trails/[id] - Update trail (therapist author only)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
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
        { error: 'Only therapists can edit trails' },
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
    const { title, description, coverImage, category, duration, published } =
      body

    const updatedTrail = await prisma.trail.update({
      where: { id: trailId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(coverImage !== undefined && { coverImage }),
        ...(category && { category }),
        ...(duration && { duration: parseInt(duration) }),
        ...(published !== undefined && { published }),
      },
      include: {
        lessons: { orderBy: { order: 'asc' } },
      },
    })

    return NextResponse.json(updatedTrail)
  } catch (error) {
    console.error('Error updating trail:', error)
    return NextResponse.json(
      { error: 'Failed to update trail' },
      { status: 500 }
    )
  }
}

// DELETE /api/trails/[id] - Delete trail (therapist author only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
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
        { error: 'Only therapists can delete trails' },
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
        { error: 'Unauthorized to delete this trail' },
        { status: 403 }
      )
    }

    await prisma.trail.delete({
      where: { id: trailId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting trail:', error)
    return NextResponse.json(
      { error: 'Failed to delete trail' },
      { status: 500 }
    )
  }
}

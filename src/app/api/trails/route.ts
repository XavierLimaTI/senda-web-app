import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

// GET /api/trails - List all published trails
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const published = url.searchParams.get('published') === 'true'
    
    const trails = await prisma.trail.findMany({
      where: published ? { published: true } : undefined,
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
            contentType: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { progress: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(trails)
  } catch (error) {
    console.error('Error fetching trails:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trails' },
      { status: 500 }
    )
  }
}

// POST /api/trails - Create new trail (therapists only)
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is a therapist
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { therapistProfile: true },
    })

    if (!user?.therapistProfile) {
      return NextResponse.json(
        { error: 'Only therapists can create trails' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, coverImage, category, duration } = body

    if (!title || !category || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, duration' },
        { status: 400 }
      )
    }

    const trail = await prisma.trail.create({
      data: {
        title,
        description: description || '',
        coverImage: coverImage || '',
        category,
        duration: parseInt(duration),
        authorId: user.therapistProfile.id,
        published: false,
      },
      include: {
        author: {
          select: {
            user: { select: { name: true } },
          },
        },
      },
    })

    return NextResponse.json(trail, { status: 201 })
  } catch (error) {
    console.error('Error creating trail:', error)
    return NextResponse.json(
      { error: 'Failed to create trail' },
      { status: 500 }
    )
  }
}


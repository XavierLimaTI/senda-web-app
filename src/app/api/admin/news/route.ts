import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * GET /api/admin/news
 * List all news articles (admin only)
 * 
 * POST /api/admin/news
 * Create a new news article (admin only)
 * Body: { title, slug, description, content, thumbnail, featured? }
 */

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin role
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50', 10)
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0', 10)

    const [articles, total] = await Promise.all([
      prisma.newsArticle.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.newsArticle.count(),
    ])

    return NextResponse.json(
      {
        articles,
        pagination: {
          total,
          limit,
          offset,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching admin news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin role
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
    })

    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, slug, description, content, thumbnail, featured } = await req.json()

    // Validate required fields
    if (!title || !slug || !description || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, description, content' },
        { status: 400 }
      )
    }

    // Check slug uniqueness
    const existing = await prisma.newsArticle.findFirst({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      )
    }

    const article = await prisma.newsArticle.create({
      data: {
        title,
        slug,
        description,
        content,
        thumbnail: thumbnail || null,
        featured: featured || false,
        published: false,
        authorId: parseInt(session.user.id),
        views: 0,
      },
    })

    return NextResponse.json(
      { article, message: 'Article created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating news article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/news
 * Get published news articles
 * Query params: limit (default 10), offset (default 0), featured (boolean)
 */
export async function GET(req: NextRequest) {
  try {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10)
    const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0', 10)
    const featured = req.nextUrl.searchParams.get('featured') === 'true'

    const where = {
      published: true,
      ...(featured && { featured: true }),
    }

    const [articles, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          thumbnail: true,
          publishedAt: true,
          views: true,
          createdAt: true,
        },
      }),
      prisma.newsArticle.count({ where }),
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
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}

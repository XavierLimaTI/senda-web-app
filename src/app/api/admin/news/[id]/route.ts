import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const article = await prisma.newsArticle.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar artigo' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, slug, description, content, thumbnail, published, featured } = body

    // Validation
    if (!title || !description || !content) {
      return NextResponse.json(
        { error: 'Título, descrição e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }

    // Update article
    const article = await prisma.newsArticle.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        slug,
        description,
        content,
        thumbnail: thumbnail || null,
        published,
        featured,
        publishedAt: published ? new Date() : null,
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar artigo' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const article = await prisma.newsArticle.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Article deleted', article })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar artigo' },
      { status: 500 }
    )
  }
}

import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminNewsFormPage from './AdminNewsFormPage'

export default async function NewsEditPage({ params }: { params: { id: string } }) {
  const session = await auth()

  // Verificar se é admin
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  // Se id = 'new', criar novo artigo
  if (params.id === 'new') {
    return <AdminNewsFormPage />
  }

  // Caso contrário, buscar artigo para editar
  const article = await prisma.newsArticle.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  if (!article) {
    redirect('/dashboard/admin/news')
  }

  return (
    <AdminNewsFormPage
      article={{
        id: article.id,
        title: article.title,
        slug: article.slug,
        description: article.description,
        content: article.content,
        thumbnail: article.thumbnail,
        published: article.published,
        featured: article.featured,
        publishedAt: article.publishedAt,
      }}
    />
  )
}

'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit2, Eye, EyeOff } from 'lucide-react'
import NewsListClient from './NewsListClient'

export default async function AdminNewsPage() {
  const session = await getServerSession(authOptions)

  // Auth check - admin only
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  const articles = await prisma.newsArticle.findMany({
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notícias</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {articles.length} artigo{articles.length !== 1 ? 's' : ''} publicado{articles.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            href="/dashboard/admin/news/new"
            className="flex items-center gap-2 px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9d9f8f] transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Nova Notícia
          </Link>
        </div>

        {/* News List */}
        <div className="grid gap-4">
          {articles.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhuma notícia publicada</p>
              <Link
                href="/dashboard/admin/news/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9d9f8f] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Criar primeira notícia
              </Link>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex gap-6 items-start">
                  {/* Thumbnail */}
                  {article.thumbnail && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {article.title}
                          </h3>
                          {article.featured && (
                            <span className="px-2 py-1 bg-[#C8963E] text-white text-xs rounded font-semibold">
                              ⭐ Destaque
                            </span>
                          )}
                          {article.published ? (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs rounded">
                              <Eye className="w-3 h-3" />
                              Publicado
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                              <EyeOff className="w-3 h-3" />
                              Rascunho
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {article.description.length > 150
                            ? article.description.substring(0, 150) + '...'
                            : article.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            Por{' '}
                            <span className="font-medium text-gray-900 dark:text-white">
                              {article.author?.name}
                            </span>
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(article.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <Link
                          href={`/dashboard/admin/news/${article.id}`}
                          className="p-2 text-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <NewsListClient articleId={article.id} articleTitle={article.title} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

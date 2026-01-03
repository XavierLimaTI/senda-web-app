'use client'

import { useState, useMemo } from 'react'
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface NewsArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  author: string
  category: string | null
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

interface Stats {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
}

export default function AdminNewsClient({
  articles,
  stats,
}: {
  articles: NewsArticle[]
  stats: Stats
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesStatus = true
      if (filterStatus === 'published') {
        matchesStatus = article.published
      } else if (filterStatus === 'draft') {
        matchesStatus = !article.published
      }

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, filterStatus, articles])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este artigo?')) {
      return
    }
    // TODO: Implementar delete via API
    console.log('Deletar artigo:', id)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Gerenciamento de Notícias
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {articles.length} artigos no total
            </p>
          </div>
          <Link
            href="/dashboard/admin/news/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9d9f8f] transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Artigo
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: 'Total',
              count: stats.totalArticles,
              color: 'bg-blue-50 border-blue-200',
            },
            {
              label: 'Publicados',
              count: stats.publishedArticles,
              color: 'bg-green-50 border-green-200',
            },
            {
              label: 'Rascunhos',
              count: stats.draftArticles,
              color: 'bg-yellow-50 border-yellow-200',
            },
          ].map((stat) => (
            <div key={stat.label} className={`p-4 rounded-lg border ${stat.color}`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, resumo ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>

          {/* Filtro por Status */}
          <div className="flex gap-2">
            {[
              { value: 'all' as const, label: 'Todos' },
              { value: 'published' as const, label: 'Publicados' },
              { value: 'draft' as const, label: 'Rascunhos' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filterStatus === filter.value
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela de Artigos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhum artigo encontrado</p>
              <Link
                href="/dashboard/admin/news/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9d9f8f] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Criar primeiro artigo
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Autor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Criado em
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{article.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">/{article.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {article.author}
                      </td>
                      <td className="px-6 py-4">
                        {article.category ? (
                          <span className="px-2 py-1 bg-[#B2B8A3]/20 text-[#B2B8A3] text-xs rounded-full font-medium">
                            {article.category}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {article.published ? (
                            <>
                              <Eye className="w-4 h-4 text-green-600" />
                              <span className="text-xs font-medium text-green-600">Publicado</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-4 h-4 text-yellow-600" />
                              <span className="text-xs font-medium text-yellow-600">Rascunho</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/admin/news/${article.id}/edit`}
                            className="p-2 text-gray-600 hover:text-[#B2B8A3] transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Deletar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

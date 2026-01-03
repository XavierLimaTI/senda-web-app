'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NewsArticle {
  id: number
  title: string
  slug: string
  description: string
  thumbnail: string | null
  publishedAt: string
  views: number
}

export function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/news?limit=3')
      if (!response.ok) throw new Error('Failed to fetch news')
      const data = await response.json()
      setArticles(data.articles)
    } catch (err) {
      console.error('Error fetching news:', err)
      setError('Não foi possível carregar as notícias')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <div className="text-[#B2B8A3]">Carregando notícias...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <div className="text-[#D99A8B]">{error}</div>
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="w-full py-8 text-center">
        <div className="text-[#B2B8A3]">Nenhuma notícia publicada ainda</div>
      </div>
    )
  }

  return (
    <section className="w-full py-12 px-4 bg-[#F0EBE3]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif text-gray-900 mb-2">
            📰 Últimas Notícias
          </h2>
          <p className="text-gray-600">
            Fique atualizado com os últimos artigos e novidades da Senda
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                {article.thumbnail && (
                  <div className="relative w-full h-48 overflow-hidden bg-gray-200 group-hover:opacity-90 transition-opacity">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif text-gray-900 mb-2 line-clamp-2 group-hover:text-[#B2B8A3] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {article.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </time>
                    <span>👁️ {article.views}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <span className="text-sm font-medium text-[#B2B8A3] group-hover:text-[#C8963E] transition-colors">
                    Ler mais →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="inline-block px-6 py-3 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#C8963E] transition-colors font-medium"
          >
            Ver todas as notícias
          </Link>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Star } from 'lucide-react'

interface NewsPageProps {
  searchParams: {
    page?: string
  }
}

export const metadata = {
  title: 'Notícias & Artigos | Senda',
  description: 'Fique atualizado com artigos sobre bem-estar, terapias integrativas e autocuidado',
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const page = parseInt(searchParams.page || '1', 10)
  const limit = 12
  const offset = (page - 1) * limit

  const [articles, total] = await Promise.all([
    prisma.newsArticle.findMany({
      where: { published: true },
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
      },
    }),
    prisma.newsArticle.count({ where: { published: true } }),
  ])

  const totalPages = Math.ceil(total / limit)

  // Get featured articles for sidebar
  const featured = await prisma.newsArticle.findMany({
    where: { published: true, featured: true },
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 5,
  })

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Hero Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-5xl font-serif text-gray-900 mb-4">
            📰 Notícias & Artigos
          </h1>
          <p className="text-xl text-gray-600">
            Explore artigos sobre bem-estar, terapias integrativas e sua jornada de autocuidado
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Articles Grid */}
            <div className="grid gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    {article.thumbnail && (
                      <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-2xl font-serif text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {article.description}
                      </p>

                      {/* Meta & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <time dateTime={article.publishedAt?.toISOString() || ''}>
                            {article.publishedAt
                              ? new Date(article.publishedAt).toLocaleDateString(
                                  'pt-BR',
                                  {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  }
                                )
                              : ''}
                          </time>
                          <span>👁️ {article.views}</span>
                        </div>
                        <span className="text-sm font-medium text-[#B2B8A3] group-hover:text-[#C8963E] transition-colors">
                          Ler mais →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {page > 1 && (
                  <Link
                    href={`/news?page=${page - 1}`}
                    className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    ← Anterior
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 1 && p <= page + 1)
                  )
                  .map((p, idx, arr) => (
                    <div key={p}>
                      {idx > 0 && arr[idx - 1] !== p - 1 && (
                        <span className="px-4 py-2 text-gray-400">...</span>
                      )}
                      <Link
                        href={`/news?page=${p}`}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          p === page
                            ? 'bg-[#B2B8A3] text-white'
                            : 'bg-white hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {p}
                      </Link>
                    </div>
                  ))}

                {page < totalPages && (
                  <Link
                    href={`/news?page=${page + 1}`}
                    className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                  >
                    Próxima →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Featured Articles */}
            {featured.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-[#C8963E]" />
                  <h3 className="text-lg font-serif text-gray-900">Destaque</h3>
                </div>

                <div className="space-y-4">
                  {featured.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="group block pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex gap-3">
                        {article.thumbnail && (
                          <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                            <Image
                              src={article.thumbnail}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                        )}
                        <div className="flex-grow">
                          <h4 className="text-sm font-serif text-gray-900 group-hover:text-[#B2B8A3] transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="bg-[#B2B8A3] text-white rounded-lg p-6 mt-6">
              <h3 className="text-lg font-serif mb-2">📬 Newsletter</h3>
              <p className="text-sm mb-4 opacity-90">
                Receba notícias sobre bem-estar e terapias
              </p>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/60 mb-3 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="w-full py-2 bg-white text-[#B2B8A3] rounded hover:bg-gray-100 transition-colors font-medium text-sm">
                Se inscrever
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg p-6 mt-6 shadow-sm">
              <div className="text-center">
                <div className="text-3xl font-serif text-[#C8963E] mb-2">
                  {total}
                </div>
                <p className="text-sm text-gray-600">
                  Artigos publicados
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface NewsDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    select: { slug: true },
  })

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const article = await prisma.newsArticle.findFirst({
    where: {
      slug: params.slug,
      published: true,
    },
  })

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      image: article.thumbnail,
    },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const article = await prisma.newsArticle.findFirst({
    where: {
      slug: params.slug,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
  })

  if (!article) {
    notFound()
  }

  // Increment views
  await prisma.newsArticle.update({
    where: { id: article.id },
    data: { views: article.views + 1 },
  })

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Header */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/news"
            className="text-[#B2B8A3] hover:text-[#C8963E] transition-colors mb-4 inline-flex items-center"
          >
            ← Voltar às notícias
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-4">
      {article.author?.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name || 'Author'}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {article.author?.name || 'Senda'}
                </p>
              <time
                dateTime={article.publishedAt?.toISOString() || ''}
                className="text-sm text-gray-600"
              >
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Data não disponível'}
              </time>
            </div>
          </div>
          <span className="text-sm text-gray-500">👁️ {article.views} visualizações</span>
        </div>

        {/* Featured Image */}
        {article.thumbnail && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          {article.description}
        </p>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* CTA Section */}
      <section className="bg-[#B2B8A3] py-12">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-serif mb-4">
            Quer se manter atualizado?
          </h2>
          <p className="mb-6 opacity-90">
            Receba notícias e artigos sobre bem-estar e terapias integrativas
          </p>
          <button className="px-8 py-3 bg-white text-[#B2B8A3] rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Se inscrever na newsletter
          </button>
        </div>
      </section>
    </div>
  )
}

'use client'

import { Star } from 'lucide-react'

interface Review {
  id: number
  rating: number
  comment: string | null
  createdAt: Date
  booking?: {
    service?: { name: string } | null
    startTime?: Date
  } | null
  client?: {
    name: string
    avatar: string | null
  } | null
}

interface Props {
  reviews: Review[]
  averageRating: number
  ratingDistribution: Record<number, number>
  totalReviews: number
}

export default function TherapistReviews({
  reviews,
  averageRating,
  ratingDistribution,
  totalReviews
}: Props) {
  const maxCount = Math.max(...Object.values(ratingDistribution), 1)

  return (
    <section className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-serif text-gray-900 mb-8">Avaliações</h2>

      {totalReviews === 0 ? (
        <div className="text-center py-12">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">
            Ainda não há avaliações para este terapeuta
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1">
            {/* Avaliação média grande */}
            <div className="text-center mb-8 pb-8 border-b border-gray-200">
              <div className="text-6xl font-serif font-bold text-[#C8963E] mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(averageRating)
                        ? 'fill-[#C8963E] text-[#C8963E]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {totalReviews} {totalReviews === 1 ? 'avaliação' : 'avaliações'}
              </p>
            </div>

            {/* Distribuição de ratings */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 w-12">
                    {rating}
                    <Star className="w-3 h-3 fill-[#C8963E] text-[#C8963E]" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C8963E] rounded-full transition-all"
                      style={{
                        width: `${
                          maxCount > 0
                            ? (ratingDistribution[rating] / maxCount) * 100
                            : 0
                        }%`
                      }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-8 text-right">
                    {ratingDistribution[rating] || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards de avaliações */}
          <div className="lg:col-span-2 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600 py-8">Sem avaliações para exibir</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* Cabeçalho */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      {review.client?.avatar ? (
                        <img
                          src={review.client.avatar}
                          alt={review.client.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#B2B8A3] text-white flex items-center justify-center text-sm font-semibold">
                          {review.client?.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {review.client?.name || 'Anônimo'}
                        </p>
                        {review.booking?.service && (
                          <p className="text-xs text-gray-600">
                            {review.booking.service.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[#C8963E] text-[#C8963E]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Texto da avaliação */}
                  {review.comment && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-2 line-clamp-3">
                      {review.comment}
                    </p>
                  )}

                  {/* Data */}
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              ))
            )}

            {reviews.length > 0 && totalReviews > reviews.length && (
              <a
                href="#"
                className="block text-center py-4 text-[#B2B8A3] hover:text-[#9da390] font-medium text-sm"
              >
                Ver todas as avaliações ({totalReviews})
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

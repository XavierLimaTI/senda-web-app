'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Flag, CheckCircle, Trash2, MessageSquare } from 'lucide-react'

interface Review {
  id: number
  rating: number
  comment: string
  therapist: string
  client: string
  createdAt: Date
  status: 'approved' | 'flagged'
}

interface Stats {
  totalReviews: number
  avgRating: string | number
  reviewsPerRating: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

interface ReviewsClientProps {
  reviews: Review[]
  stats: Stats
}

export default function ReviewsClient({ reviews: initialReviews, stats }: ReviewsClientProps) {
  const router = useRouter()
  const [reviews, setReviews] = useState(initialReviews)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const filteredReviews = selectedRating
    ? reviews.filter((r) => r.rating === selectedRating)
    : reviews

  const handleFlag = async (id: number) => {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/reviews/${id}/flag`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Erro ao marcar review')

      setReviews(reviews.map((r) => (r.id === id ? { ...r, status: 'flagged' } : r)))
    } catch (error) {
      console.error(error)
      alert('Erro ao marcar review como problemático')
    } finally {
      setLoadingId(null)
    }
  }

  const handleApprove = async (id: number) => {
    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/reviews/${id}/approve`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Erro ao aprovar review')

      setReviews(reviews.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)))
    } catch (error) {
      console.error(error)
      alert('Erro ao aprovar review')
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este review?')) return

    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Erro ao deletar review')

      setReviews(reviews.filter((r) => r.id !== id))
    } catch (error) {
      console.error(error)
      alert('Erro ao deletar review')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Avaliações & Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Moderação de avaliações dos clientes sobre terapeutas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total de Avaliações</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {stats.totalReviews}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Classificação Média</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    fill={i <= Math.round(Number(stats.avgRating)) ? '#C8963E' : '#e5e7eb'}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Distribuição de Votos</p>
            <div className="mt-3 space-y-1 text-sm">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-4">{rating}⭐</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded h-2">
                    <div
                      className="bg-[#C8963E] h-2 rounded"
                      style={{
                        width: `${stats.totalReviews > 0 ? (stats.reviewsPerRating[rating as 1 | 2 | 3 | 4 | 5] / stats.totalReviews) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-medium text-gray-600 dark:text-gray-400">
                    {stats.reviewsPerRating[rating as 1 | 2 | 3 | 4 | 5]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedRating(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedRating === null
                ? 'bg-[#B2B8A3] text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Todos ({reviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedRating === rating
                  ? 'bg-[#B2B8A3] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {rating} ⭐ ({stats.reviewsPerRating[rating as 1 | 2 | 3 | 4 | 5]})
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                {selectedRating ? `Nenhuma avaliação com ${selectedRating} estrelas` : 'Nenhuma avaliação disponível'}
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 ${
                  review.status === 'flagged' ? 'border-l-red-500' : 'border-l-green-500'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.therapist}
                      </h3>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            fill={i <= review.rating ? '#C8963E' : '#e5e7eb'}
                          />
                        ))}
                      </div>
                      {review.status === 'flagged' && (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-xs rounded font-semibold">
                          ⚠️ Reportado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Por <span className="font-medium">{review.client}</span> •{' '}
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {review.comment}
                </p>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {review.status === 'flagged' ? (
                    <button
                      onClick={() => handleApprove(review.id)}
                      disabled={loadingId === review.id}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Aprovar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFlag(review.id)}
                      disabled={loadingId === review.id}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors disabled:opacity-50 text-sm font-medium"
                    >
                      <Flag className="w-4 h-4" />
                      Marcar como Problemático
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(review.id)}
                    disabled={loadingId === review.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors disabled:opacity-50 ml-auto text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ReviewCardProps {
  rating: number
  comment?: string
  serviceName: string
  sessionDate: Date
  createdAt: Date
}

export default function ReviewCard({
  rating,
  comment,
  serviceName,
  sessionDate,
  createdAt
}: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-[#C8963E]' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const formattedSessionDate = format(new Date(sessionDate), "d 'de' MMMM 'de' yyyy", {
    locale: ptBR
  })

  const formattedReviewDate = format(new Date(createdAt), "d 'de' MMMM 'de' yyyy", {
    locale: ptBR
  })

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      {/* Header com rating e data da sessão */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {renderStars(rating)}
          <p className="text-sm text-gray-500 mt-1">{serviceName}</p>
        </div>
        <div className="text-right text-xs text-gray-400">
          <p>Sessão: {formattedSessionDate}</p>
          <p className="mt-1">Avaliado em {formattedReviewDate}</p>
        </div>
      </div>

      {/* Comentário */}
      {comment && (
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          "{comment}"
        </p>
      )}

      {/* Caso não tenha comentário */}
      {!comment && (
        <p className="text-gray-400 text-sm italic">
          Cliente não deixou comentário
        </p>
      )}
    </div>
  )
}

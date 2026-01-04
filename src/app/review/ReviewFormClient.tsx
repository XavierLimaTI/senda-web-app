'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, AlertCircle, CheckCircle } from 'lucide-react'

interface ReviewFormClientProps {
  bookingId: number
  therapistName: string
  therapistId: number
  serviceName: string
}

export default function ReviewFormClient({
  bookingId,
  therapistName,
  therapistId,
  serviceName
}: ReviewFormClientProps) {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hoveredRating, setHoveredRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          therapistId,
          rating,
          comment
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao enviar avaliação')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(`/booking/${bookingId}`)
      }, 2000)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  const displayRating = hoveredRating || rating

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Therapist Info */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{therapistName}</h2>
        <p className="text-gray-600">{serviceName}</p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-green-700">Avaliação enviada com sucesso! Redirecionando...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Rating Stars */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Como foi sua experiência?
          </label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 transition-all ${
                    star <= displayRating
                      ? 'fill-[#C8963E] text-[#C8963E]'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {rating === 1 && 'Precisa melhorar'}
            {rating === 2 && 'Insatisfeito'}
            {rating === 3 && 'Satisfeito'}
            {rating === 4 && 'Muito satisfeito'}
            {rating === 5 && 'Excelente!'}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Deixe um comentário (opcional)
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Compartilhe mais sobre sua experiência... O que gostou? O que pode melhorar?"
            maxLength={500}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B2B8A3] resize-none"
          />
          <p className="mt-1 text-xs text-gray-500">{comment.length}/500 caracteres</p>
        </div>

        {/* Submission */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Não, obrigado
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#B2B8A3] text-white rounded-lg font-medium hover:bg-[#9fa58f] disabled:opacity-50 transition"
          >
            {loading ? 'Enviando...' : 'Enviar Avaliação'}
          </button>
        </div>
      </form>

      {/* Privacy Note */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Sua avaliação será pública e ajudará a comunidade Senda.<br />
          Nunca compartilhamos seus dados com terceiros.
        </p>
      </div>
    </div>
  )
}

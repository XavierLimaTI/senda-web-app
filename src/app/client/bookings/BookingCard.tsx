'use client'

import { useState } from 'react'
import { Booking, Service, TherapistProfile, Review } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import RescheduleModal from './RescheduleModal'
import CancelModal from './CancelModal'
import { useToast } from '@/context/ToastContext'

interface BookingCardProps {
  booking: Booking & {
    service: Service
    therapist: TherapistProfile & {
      user: { name: string; avatar: string | null }
    }
    review: Review | null
  }
  onUpdate?: () => void
}

type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export default function BookingCard({ booking, onUpdate }: BookingCardProps) {
  const { showToast } = useToast()
  const isUpcoming = booking.startTime > new Date()
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(Boolean(booking.review))
  
  const statusColor: Record<BookingStatus, string> = {
    PENDING: 'bg-yellow-50 border-yellow-200',
    CONFIRMED: 'bg-blue-50 border-blue-200',
    COMPLETED: 'bg-green-50 border-green-200',
    CANCELLED: 'bg-red-50 border-red-200'
  }

  const statusLabel: Record<BookingStatus, string> = {
    PENDING: 'Pendente',
    CONFIRMED: 'Confirmado',
    COMPLETED: 'Realizado',
    CANCELLED: 'Cancelado'
  }

  const statusTextColor: Record<BookingStatus, string> = {
    PENDING: 'text-yellow-700',
    CONFIRMED: 'text-blue-700',
    COMPLETED: 'text-green-700',
    CANCELLED: 'text-red-700'
  }

  async function handleSubmitReview() {
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          rating,
          comment: comment.trim() || undefined
        })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erro ao enviar avaliação')
      }

      setSubmitted(true)
      setShowReviewModal(false)
      showToast({ message: 'Avaliação enviada com sucesso!', type: 'success' })
    } catch (err) {
      console.error(err)
      showToast({ message: (err as Error).message, type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  function handleRescheduleSuccess() {
    showToast({ message: 'Agendamento reagendado com sucesso!', type: 'success' })
    if (onUpdate) onUpdate()
  }

  function handleCancelSuccess() {
    showToast({ message: 'Agendamento cancelado com sucesso.', type: 'info' })
    if (onUpdate) onUpdate()
  }

  return (
    <div className={`${statusColor[booking.status as BookingStatus]} rounded-lg border p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        {/* Foto do terapeuta */}
        {booking.therapist.user.avatar ? (
          <img
            src={booking.therapist.user.avatar}
            alt={booking.therapist.user.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                          flex items-center justify-center flex-shrink-0">
            <span className="text-2xl text-white font-serif">
              {booking.therapist.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Detalhes do agendamento */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {booking.service.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                com <span className="font-medium">{booking.therapist.user.name}</span>
              </p>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
              ${statusTextColor[booking.status as BookingStatus]}`}>
              {statusLabel[booking.status as BookingStatus]}
            </span>
          </div>

          {/* Data e hora */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{format(booking.startTime, 'd \'de\' MMMM', { locale: ptBR })}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{format(booking.startTime, 'HH:mm')}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>R$ {booking.service.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4">
            {isUpcoming && booking.status !== 'CANCELLED' && (
              <>
                <button
                  onClick={() => setShowRescheduleModal(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reagendar
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Cancelar
                </button>
              </>
            )}
            {booking.status === 'COMPLETED' && (
              <button
                onClick={() => setShowReviewModal(true)}
                disabled={submitted}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                  submitted
                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-[#B2B8A3] text-[#B2B8A3] hover:bg-[#F0EBE3]'
                }`}
              >
                {submitted ? 'Avaliação enviada' : 'Deixar Avaliação'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <RescheduleModal
        booking={booking}
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        onSuccess={handleRescheduleSuccess}
      />

      {/* Cancel Modal */}
      <CancelModal
        booking={booking}
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onSuccess={handleCancelSuccess}
      />

      {showReviewModal && !submitted && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Avaliar sessão</h3>
                <p className="text-sm text-gray-600">{booking.service.name} com {booking.therapist.user.name}</p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Estrelas */}
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-7 h-7 ${star <= rating ? 'text-[#C8963E]' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="text-sm text-gray-600">{rating} / 5</span>
            </div>

            {/* Comentário */}
            <div>
              <label className="text-sm text-gray-700 font-medium">Comentário (opcional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-200 focus:border-[#B2B8A3] focus:ring-[#B2B8A3] text-sm"
                placeholder="Como foi sua experiência?"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={submitting}
                className={`px-4 py-2 text-sm font-medium rounded-lg text-white ${
                  submitting ? 'bg-[#B2B8A3]/60 cursor-not-allowed' : 'bg-[#B2B8A3] hover:bg-[#9da390]'
                }`}
              >
                {submitting ? 'Enviando...' : 'Enviar avaliação'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

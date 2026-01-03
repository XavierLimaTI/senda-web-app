'use client'

import { Booking, Service, ClientProfile, Review } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TherapistBookingCardProps {
  booking: Booking & {
    service: Service
    client: ClientProfile & {
      user: { name: string; email: string; avatar: string | null }
    }
    review: Review | null
  }
}

type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'

export default function TherapistBookingCard({ booking }: TherapistBookingCardProps) {
  const isUpcoming = booking.startTime > new Date()
  
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

  const hasReview = Boolean(booking.review)

  const renderStars = (value: number) => (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(star => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= value ? 'text-[#C8963E]' : 'text-gray-300'}`}
          viewBox="0 0 20 20" fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <div className={`${statusColor[booking.status as BookingStatus]} rounded-lg border p-6 transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        {/* Foto do cliente */}
        {booking.client.user.avatar ? (
          <img
            src={booking.client.user.avatar}
            alt={booking.client.user.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                          flex items-center justify-center flex-shrink-0">
            <span className="text-2xl text-white font-serif">
              {booking.client.user.name.charAt(0).toUpperCase()}
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
                com <span className="font-medium">{booking.client.user.name}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {booking.client.user.email}
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
              <span>
                {format(booking.startTime, 'HH:mm')} - {format(booking.endTime, 'HH:mm')}
              </span>
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
                {booking.status === 'PENDING' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                    Confirmar
                  </button>
                )}
                {booking.status === 'CONFIRMED' && (
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    Marcar como Realizado
                  </button>
                )}
                <button className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                  Cancelar
                </button>
              </>
            )}
            {!isUpcoming && booking.status === 'COMPLETED' && hasReview && (
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1">
                {renderStars(booking.review!.rating)}
                {booking.review?.comment && (
                  <span className="text-gray-500 truncate max-w-xs" title={booking.review.comment}>
                    “{booking.review.comment}”
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useLanguage } from '@/context/LanguageContext'
import ClientBookingsClient from './ClientBookingsClient'

interface Booking {
  id: number
  startTime: Date
  endTime: Date
  status: string
  notes: string | null
  service: {
    id: number
    name: string
    duration: number
    price: number
  } | null
  therapist: {
    id: number
    user: {
      name: string
      avatar: string | null
    }
  }
  review: {
    id: number
    rating: number
    comment: string | null
  } | null
}

interface Props {
  bookings: Booking[]
}

export default function ClientBookingsWrapper({ bookings }: Props) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">
            {t('bookings.my_bookings')}
          </h1>
          <p className="text-gray-600">
            {t('bookings.subtitle')}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              {t('bookings.no_bookings_title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('bookings.no_bookings_desc')}
            </p>
            <a
              href="/explore/therapists"
              className="inline-block px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
            >
              {t('bookings.explore_therapists')}
            </a>
          </div>
        ) : (
          <ClientBookingsClient bookings={bookings} />
        )}
      </div>
    </div>
  )
}

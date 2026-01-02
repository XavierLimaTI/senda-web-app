'use client'

import { useState } from 'react'
import { Booking, Service, TherapistProfile, User } from '@prisma/client'
import BookingCard from './BookingCard'
import BookingFilters from './BookingFilters'

interface ClientBookingsClientProps {
  bookings: (Booking & {
    service: Service
    therapist: TherapistProfile & {
      user: { name: string; avatar: string | null }
    }
  })[]
}

type FilterStatus = 'all' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
type FilterSort = 'upcoming' | 'past' | 'newest'

export default function ClientBookingsClient({ bookings }: ClientBookingsClientProps) {
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all')
  const [sortBy, setSortBy] = useState<FilterSort>('upcoming')

  // Filtrar por status
  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter(b => b.status === statusFilter)

  // Ordenar
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case 'upcoming':
        return a.startTime.getTime() - b.startTime.getTime()
      case 'past':
        return b.startTime.getTime() - a.startTime.getTime()
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime()
      default:
        return 0
    }
  })

  // Separar em próximos, em andamento e passados
  const now = new Date()
  const upcomingBookings = sortedBookings.filter(b => b.startTime > now && b.status !== 'CANCELLED')
  const pastBookings = sortedBookings.filter(b => b.startTime <= now || b.status === 'CANCELLED' || b.status === 'COMPLETED')

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <BookingFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Próximos Agendamentos */}
      {upcomingBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Próximos</h2>
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {/* Agendamentos Passados/Completados */}
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Histórico</h2>
          <div className="space-y-4">
            {pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      {/* Nenhum resultado */}
      {sortedBookings.length === 0 && (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-600">Nenhum agendamento encontrado com os filtros selecionados</p>
        </div>
      )}
    </div>
  )
}

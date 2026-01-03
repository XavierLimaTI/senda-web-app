'use client'

import { useState, useMemo } from 'react'
import { Calendar, DollarSign, CheckCircle, XCircle, Clock, Search } from 'lucide-react'

interface BookingData {
  id: number
  clientName: string
  clientEmail: string
  therapistName: string
  serviceName: string
  startTime: Date
  endTime: Date
  status: string
  amount: number
  paymentStatus: string
}

interface Stats {
  totalBookings: number
  confirmedBookings: number
  cancelledBookings: number
  completedBookings: number
  totalRevenue: number
}

export default function AdminBookingsClient({
  bookings,
  stats,
}: {
  bookings: BookingData[]
  stats: Stats
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.therapistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = !filterStatus || booking.status === filterStatus

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, filterStatus, bookings])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount / 100)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmado'
      case 'COMPLETED':
        return 'Concluído'
      case 'CANCELLED':
        return 'Cancelado'
      case 'PENDING':
        return 'Pendente'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gerenciamento de Agendamentos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {bookings.length} agendamentos no total
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: 'Total de Agendamentos',
              count: stats.totalBookings,
              icon: Calendar,
              color: 'bg-blue-50 border-blue-200',
            },
            {
              label: 'Confirmados',
              count: stats.confirmedBookings,
              icon: CheckCircle,
              color: 'bg-green-50 border-green-200',
            },
            {
              label: 'Cancelados',
              count: stats.cancelledBookings,
              icon: XCircle,
              color: 'bg-red-50 border-red-200',
            },
            {
              label: 'Concluídos',
              count: stats.completedBookings,
              icon: CheckCircle,
              color: 'bg-[#B2B8A3]/10 border-[#B2B8A3]/30',
            },
            {
              label: 'Receita Total',
              count: formatCurrency(stats.totalRevenue),
              icon: DollarSign,
              color: 'bg-[#C8963E]/10 border-[#C8963E]/30',
            },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className={`p-4 rounded-lg border ${stat.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
              </div>
            )
          })}
        </div>

        {/* Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cliente, terapeuta ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>

          {/* Filtro por Status */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus(null)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                !filterStatus
                  ? 'bg-[#B2B8A3] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Todos
            </button>
            {['CONFIRMED', 'COMPLETED', 'CANCELLED', 'PENDING'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  filterStatus === status
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabela de Agendamentos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {filteredBookings.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Nenhum agendamento encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Terapeuta
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Serviço
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Data e Hora
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Pgto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{booking.clientName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{booking.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {booking.therapistName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {booking.serviceName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(booking.startTime)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            booking.status
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {formatCurrency(booking.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.paymentStatus === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : booking.paymentStatus === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {booking.paymentStatus === 'COMPLETED'
                            ? 'Pago'
                            : booking.paymentStatus === 'PENDING'
                              ? 'Pendente'
                              : 'Falhou'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { BarChart3, TrendingUp, Users, Calendar, DollarSign } from 'lucide-react'

interface BookingData {
  date: string
  count: number
}

interface UserRole {
  role: string
  _count: number
}

interface TherapistData {
  name: string
  bookings: number
}

interface Stats {
  totalUsers: number
  totalBookings: number
  totalClients: number
  totalTherapists: number
  monthlyRevenue: number
}

interface ReportsClientProps {
  bookingsByDate: BookingData[]
  usersByRole: UserRole[]
  topTherapists: TherapistData[]
  stats: Stats
}

export default function ReportsClient({
  bookingsByDate,
  usersByRole,
  topTherapists,
  stats,
}: ReportsClientProps) {
  const maxBookings = Math.max(...bookingsByDate.map((b) => b.count), 1)
  const maxTherapistBookings = Math.max(...topTherapists.map((t) => t.bookings), 1)

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Relatórios & Análises</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Visão geral de desempenho e estatísticas da plataforma
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Users */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total de Usuários</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalUsers.toLocaleString('pt-BR')}
                </p>
              </div>
              <Users className="w-8 h-8 text-[#B2B8A3]" />
            </div>
          </div>

          {/* Total Clients */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Clientes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalClients.toLocaleString('pt-BR')}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Total Therapists */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Terapeutas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalTherapists.toLocaleString('pt-BR')}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Total Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Agendamentos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stats.totalBookings.toLocaleString('pt-BR')}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-[#D99A8B]" />
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Receita (30d)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  R$ {(stats.monthlyRevenue / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-[#C8963E]" />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bookings by Date */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#B2B8A3]" />
              Agendamentos por Dia (últimos 30 dias)
            </h2>
            <div className="space-y-3">
              {bookingsByDate.slice(-7).map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.date}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#B2B8A3] h-2 rounded-full transition-all"
                      style={{ width: `${(item.count / maxBookings) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users by Role */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#B2B8A3]" />
              Distribuição de Usuários por Tipo
            </h2>
            <div className="space-y-4">
              {usersByRole.map((item) => {
                const total = stats.totalUsers
                const percentage = ((item._count / total) * 100).toFixed(1)
                const roleLabel = {
                  CLIENT: 'Clientes',
                  THERAPIST: 'Terapeutas',
                  SPACE: 'Espaços',
                  ADMIN: 'Admins',
                }[item.role] || item.role

                return (
                  <div key={item.role}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{roleLabel}</span>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {item._count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          item.role === 'CLIENT'
                            ? 'bg-blue-500'
                            : item.role === 'THERAPIST'
                              ? 'bg-green-500'
                              : item.role === 'SPACE'
                                ? 'bg-purple-500'
                                : 'bg-gray-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Top Therapists */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#B2B8A3]" />
            Top 5 Terapeutas por Agendamentos
          </h2>

          {topTherapists.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm">Nenhum agendamento registrado</p>
          ) : (
            <div className="space-y-4">
              {topTherapists.map((therapist, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#B2B8A3] text-white text-sm font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">{therapist.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#B2B8A3]">{therapist.bookings} agendamentos</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-[#B2B8A3] h-2 rounded-full transition-all"
                      style={{ width: `${(therapist.bookings / maxTherapistBookings) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

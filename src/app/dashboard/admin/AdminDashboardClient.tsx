'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  UserCheck, 
  Building2, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface Metrics {
  totalUsers: number
  totalTherapists: number
  totalClients: number
  totalSpaces: number
  pendingTherapists: number
  totalBookings: number
  totalRevenue: number
  recentUsers: Array<{
    id: number
    name: string
    email: string
    role: string
    createdAt: Date
    emailVerified: Date | null
  }>
}

export default function AdminDashboardClient({ metrics }: { metrics: Metrics }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'pending'>('overview')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visão geral e gestão da plataforma Senda
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#B2B8A3] text-[#B2B8A3]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === 'users'
                  ? 'border-[#B2B8A3] text-[#B2B8A3]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Usuários Recentes
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium border-b-2 transition-colors relative ${
                activeTab === 'pending'
                  ? 'border-[#B2B8A3] text-[#B2B8A3]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Aprovações Pendentes
              {metrics.pendingTherapists > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {metrics.pendingTherapists}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Users */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metrics.totalUsers}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Usuários</p>
              </div>

              {/* Total Therapists */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#B2B8A3]/20 rounded-lg">
                    <UserCheck className="w-6 h-6 text-[#B2B8A3]" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {metrics.pendingTherapists} pendentes
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metrics.totalTherapists}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Terapeutas</p>
              </div>

              {/* Total Spaces */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metrics.totalSpaces}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Espaços Cadastrados</p>
              </div>

              {/* Total Revenue */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatCurrency(metrics.totalRevenue)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receita Total</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bookings Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#B2B8A3]" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Agendamentos
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Total de agendamentos</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {metrics.totalBookings}
                    </span>
                  </div>
                  <Link
                    href="/dashboard/admin/bookings"
                    className="block w-full text-center px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
                  >
                    Ver Todos
                  </Link>
                </div>
              </div>

              {/* Pending Approvals Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Aprovações Pendentes
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Terapeutas aguardando</span>
                    <span className="font-semibold text-orange-500">
                      {metrics.pendingTherapists}
                    </span>
                  </div>
                  <Link
                    href="/dashboard/admin/therapists/pending"
                    className="block w-full text-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Revisar Agora
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Usuários Recentes
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Cadastro
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {metrics.recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'THERAPIST' 
                            ? 'bg-[#B2B8A3]/20 text-[#B2B8A3]'
                            : user.role === 'CLIENT'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : user.role === 'SPACE'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.emailVerified ? (
                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Verificado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm">
                            <Clock className="w-4 h-4" />
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pending Tab */}
        {activeTab === 'pending' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {metrics.pendingTherapists} Terapeutas Aguardando Aprovação
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Revise documentos, credenciais e perfis antes de aprovar
              </p>
              <Link
                href="/dashboard/admin/therapists/pending"
                className="inline-block px-6 py-3 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
              >
                Ir para Aprovações
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

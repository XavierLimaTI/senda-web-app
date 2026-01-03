'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, CheckCircle, Clock, XCircle, RotateCcw, Search } from 'lucide-react'

type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded'

interface Payment {
  id: number
  amount: number
  status: PaymentStatus
  therapist: string
  client: string
  transactionId: string
  createdAt: Date
  refundedAt: Date | null
  description: string
}

interface Stats {
  totalTransactions: number
  totalRevenue: number
  pendingAmount: number
  refundedAmount: number
  statusCounts: {
    completed: number
    pending: number
    failed: number
    refunded: number
  }
}

interface PaymentsClientProps {
  payments: Payment[]
  stats: Stats
}

export default function PaymentsClient({ payments: initialPayments, stats }: PaymentsClientProps) {
  const router = useRouter()
  const [payments, setPayments] = useState(initialPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all')
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleRefund = async (id: number, amount: number) => {
    if (!confirm(`Tem certeza que deseja reembolsar R$ ${(amount / 100).toLocaleString('pt-BR')}`)) {
      return
    }

    setLoadingId(id)
    try {
      const res = await fetch(`/api/admin/payments/${id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })

      if (!res.ok) throw new Error('Erro ao reembolsar')

      const updatedPayment = await res.json()
      setPayments(payments.map((p) => (p.id === id ? { ...p, status: 'refunded' as PaymentStatus } : p)))
    } catch (error) {
      console.error(error)
      alert('Erro ao processar reembolso')
    } finally {
      setLoadingId(null)
    }
  }

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'refunded':
        return <RotateCcw className="w-5 h-5 text-blue-600" />
    }
  }

  const getStatusLabel = (status: PaymentStatus) => {
    const labels: Record<PaymentStatus, string> = {
      completed: 'Concluído',
      pending: 'Pendente',
      failed: 'Falhou',
      refunded: 'Reembolsado',
    }
    return labels[status]
  }

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200'
      case 'failed':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'
      case 'refunded':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
    }
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pagamentos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gerenciamento de transações e reembolsos
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total em Transações</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              R$ {(stats.totalRevenue / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {stats.totalTransactions} transações
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              R$ {(stats.pendingAmount / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {stats.statusCounts.pending} pagamentos
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Reembolsados</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              R$ {(stats.refundedAmount / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {stats.statusCounts.refunded} reembolsos
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Taxa de Sucesso</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {stats.totalTransactions > 0
                ? ((stats.statusCounts.completed / stats.totalTransactions) * 100).toFixed(1)
                : 0}
              %
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {stats.statusCounts.completed} concluídos
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por terapeuta, cliente ou transação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Todos
              </button>
              {(['completed', 'pending', 'failed', 'refunded'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    statusFilter === status
                      ? 'bg-[#B2B8A3] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {getStatusLabel(status)} ({stats.statusCounts[status]})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {filteredPayments.length === 0 ? (
            <div className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all'
                  ? 'Nenhuma transação encontrada'
                  : 'Nenhuma transação registrada'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Transação
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Terapeuta / Cliente
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Data
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            #{payment.id}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{payment.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 dark:text-white">{payment.therapist}</p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Cliente: {payment.client}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          R$ {(payment.amount / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full ${getStatusColor(payment.status)}`}
                        >
                          {getStatusIcon(payment.status)}
                          <span className="text-sm font-medium">{getStatusLabel(payment.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {payment.status === 'completed' && !payment.refundedAt && (
                          <button
                            onClick={() => handleRefund(payment.id, payment.amount)}
                            disabled={loadingId === payment.id}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 disabled:opacity-50"
                          >
                            {loadingId === payment.id ? 'Processando...' : 'Reembolsar'}
                          </button>
                        )}
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

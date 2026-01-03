'use client'

import { useState, useEffect } from 'react'
import RevenueCard from './RevenueCard'
import RevenueChart from './RevenueChart'

interface RevenueMetrics {
  totalRevenue: number
  sendaFee: number
  netRevenue: number
  totalSessions: number
  averageTicket: number
  upcomingRevenue: number
}

interface TopService {
  name: string
  count: number
  revenue: number
}

interface ChartData {
  date: string
  revenue: number
}

interface RevenueData {
  period: string
  metrics: RevenueMetrics
  topServices: TopService[]
  revenueChart: ChartData[]
}

export default function RevenueClient() {
  const [data, setData] = useState<RevenueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'all'>('month')

  useEffect(() => {
    fetchRevenue()
  }, [period])

  const fetchRevenue = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/therapist/revenue?period=${period}`)
      if (res.ok) {
        const json = await res.json()
        setData(json)
      } else {
        console.error('Erro ao buscar receitas')
      }
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">Erro ao carregar dados de receita</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com filtro de período */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif text-gray-900">Receitas</h1>
            <p className="text-gray-600 mt-1">Acompanhe seus ganhos e repasses</p>
          </div>

          <div className="flex gap-2">
            {[
              { value: 'day' as const, label: 'Hoje' },
              { value: 'week' as const, label: '7 dias' },
              { value: 'month' as const, label: '30 dias' },
              { value: 'all' as const, label: 'Tudo' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setPeriod(value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  period === value
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards de métricas principais */}
        <div className="grid md:grid-cols-3 gap-4">
          <RevenueCard
            title="Receita Bruta"
            value={data.metrics.totalRevenue}
            subtitle={`${data.metrics.totalSessions} sessões`}
            icon="💰"
            color="green"
          />

          <RevenueCard
            title="Receita Líquida"
            value={data.metrics.netRevenue}
            subtitle="Após taxa Senda (10%)"
            icon="✅"
            color="blue"
          />

          <RevenueCard
            title="Ticket Médio"
            value={data.metrics.averageTicket}
            subtitle="Por sessão"
            icon="📊"
            color="orange"
          />
        </div>

        {/* Próximos repasses */}
        {data.metrics.upcomingRevenue > 0 && (
          <div className="bg-gradient-to-r from-[#C8963E] to-[#B2B8A3] rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Receita Futura (Agendamentos Confirmados)</p>
                <p className="text-3xl font-bold">{formatCurrency(data.metrics.upcomingRevenue)}</p>
              </div>
              <div className="text-5xl">🔮</div>
            </div>
          </div>
        )}

        {/* Gráfico de evolução */}
        <RevenueChart data={data.revenueChart} />

        {/* Top serviços */}
        {data.topServices.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Serviços Mais Rentáveis
            </h3>
            <div className="space-y-3">
              {data.topServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F0EBE3] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C8963E] text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.count} sessões</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-[#B2B8A3]">
                    {formatCurrency(service.revenue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detalhamento de taxas */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Detalhamento de Taxas
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Receita Bruta</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(data.metrics.totalRevenue)}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Taxa Senda (10%)</span>
              <span className="font-medium text-red-600">
                - {formatCurrency(data.metrics.sendaFee)}
              </span>
            </div>
            <div className="flex justify-between py-3 bg-green-50 -mx-6 px-6 rounded">
              <span className="font-semibold text-gray-900">Receita Líquida</span>
              <span className="font-bold text-green-600 text-lg">
                {formatCurrency(data.metrics.netRevenue)}
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-[#F0EBE3] rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>ℹ️ Repasses:</strong> A receita líquida será depositada na sua conta 
              1 dia após cada sessão completada, garantindo segurança contra cancelamentos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

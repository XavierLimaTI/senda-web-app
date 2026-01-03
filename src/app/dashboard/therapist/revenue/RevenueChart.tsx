'use client'

interface RevenueChartProps {
  data: Array<{
    date: string
    revenue: number
  }>
}

export default function RevenueChart({ data }: RevenueChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Nenhuma receita registrada no período</p>
      </div>
    )
  }

  // Encontrar valor máximo para escala
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  const chartHeight = 200

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short'
    }).format(date)
  }

  // Formatar moeda
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Evolução de Receitas (Últimos 30 dias)
      </h3>

      {/* Gráfico de barras simples */}
      <div className="relative" style={{ height: chartHeight }}>
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100
            
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group relative"
              >
                {/* Barra */}
                <div
                  className="w-full bg-gradient-to-t from-[#B2B8A3] to-[#C8963E] rounded-t transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${height}%` }}
                >
                  {/* Tooltip hover */}
                  <div className="invisible group-hover:visible absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                    {formatCurrency(item.revenue)}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>

                {/* Label da data */}
                {index % Math.ceil(data.length / 10) === 0 && (
                  <span className="text-xs text-gray-500 mt-2 rotate-45 origin-top-left">
                    {formatDate(item.date)}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Receita Total</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0))}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Média Diária</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0) / data.length)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Maior Dia</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(maxRevenue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

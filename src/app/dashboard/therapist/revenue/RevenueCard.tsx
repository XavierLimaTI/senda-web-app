'use client'

interface RevenueCardProps {
  title: string
  value: number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: string
  color?: 'green' | 'blue' | 'orange' | 'gray'
}

export default function RevenueCard({
  title,
  value,
  subtitle,
  trend,
  icon = '💰',
  color = 'green'
}: RevenueCardProps) {
  const colorClasses = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    orange: 'bg-orange-50 border-orange-200',
    gray: 'bg-gray-50 border-gray-200'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount)
  }

  return (
    <div className={`rounded-lg border-2 p-6 ${colorClasses[color]}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(value)}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

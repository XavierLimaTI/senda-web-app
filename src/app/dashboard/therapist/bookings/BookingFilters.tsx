'use client'

type FilterStatus = 'all' | 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
type FilterSort = 'upcoming' | 'past' | 'newest'

interface BookingFiltersProps {
  statusFilter: FilterStatus
  onStatusChange: (status: FilterStatus) => void
  sortBy: FilterSort
  onSortChange: (sort: FilterSort) => void
}

export default function BookingFilters({
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange
}: BookingFiltersProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
      {/* Status Filter */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'PENDING', label: 'Pendente' },
            { value: 'CONFIRMED', label: 'Confirmado' },
            { value: 'COMPLETED', label: 'Realizado' },
            { value: 'CANCELLED', label: 'Cancelado' }
          ].map(status => (
            <button
              key={status.value}
              onClick={() => onStatusChange(status.value as FilterStatus)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${statusFilter === status.value
                  ? 'bg-[#B2B8A3] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Ordenar por
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as FilterSort)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
        >
          <option value="upcoming">Próximos</option>
          <option value="past">Passados</option>
          <option value="newest">Mais Recentes</option>
        </select>
      </div>
    </div>
  )
}

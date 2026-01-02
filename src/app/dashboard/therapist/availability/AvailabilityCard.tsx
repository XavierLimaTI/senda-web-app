'use client'

interface Availability {
  id: number
  therapistId: number
  dayOfWeek: number
  startTime: string
  endTime: string
}

interface Props {
  availability: Availability
  onEdit: (availability: Availability) => void
  onDelete: (id: number) => void
}

export default function AvailabilityCard({ availability, onEdit, onDelete }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-[#B2B8A3] 
                    transition-all duration-200 group">
      {/* Horário */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[#B2B8A3]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium text-gray-900 text-sm">
            {availability.startTime} - {availability.endTime}
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onEdit(availability)}
          className="flex-1 text-xs px-2 py-1.5 bg-[#B2B8A3] hover:bg-[#9da390] text-white 
                     rounded transition-colors"
          title="Editar"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(availability.id)}
          className="flex-1 text-xs px-2 py-1.5 bg-[#D99A8B] hover:bg-[#c68878] text-white 
                     rounded transition-colors"
          title="Remover"
        >
          Remover
        </button>
      </div>
    </div>
  )
}

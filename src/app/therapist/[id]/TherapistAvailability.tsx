'use client'

import { Availability } from '@prisma/client'

interface Props {
  availability: Availability[]
}

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const DAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function TherapistAvailability({ availability }: Props) {
  // Agrupar por dia da semana
  const availabilityByDay: Record<number, Availability[]> = {}
  availability.forEach((av) => {
    if (!availabilityByDay[av.dayOfWeek]) {
      availabilityByDay[av.dayOfWeek] = []
    }
    availabilityByDay[av.dayOfWeek].push(av)
  })

  return (
    <section>
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Horários Disponíveis</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
          const dayAvailability = availabilityByDay[dayIndex] || []
          const hasAvailability = dayAvailability.length > 0

          return (
            <div
              key={dayIndex}
              className={`
                rounded-lg p-4 text-center border-2 transition-all
                ${hasAvailability
                  ? 'border-[#B2B8A3] bg-[#B2B8A3] bg-opacity-5'
                  : 'border-gray-200 bg-gray-50 opacity-60'
                }
              `}
            >
              <p className="font-serif text-sm font-medium text-gray-900 mb-1">
                {DAYS_SHORT[dayIndex]}
              </p>
              <p className="text-xs text-gray-600 mb-2">
                {DAYS[dayIndex]}
              </p>

              {hasAvailability ? (
                <div className="space-y-1">
                  {dayAvailability
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((av, idx) => (
                      <p key={idx} className="text-xs font-medium text-[#B2B8A3]">
                        {av.startTime} - {av.endTime}
                      </p>
                    ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">Fechado</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

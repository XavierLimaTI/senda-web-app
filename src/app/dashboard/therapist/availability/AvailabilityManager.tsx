'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import AvailabilityCard from './AvailabilityCard'
import AvailabilityFormModal from './AvailabilityFormModal'

interface Availability {
  id: number
  therapistId: number
  dayOfWeek: number
  startTime: string
  endTime: string
}

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const DAYS_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function AvailabilityManager() {
  const { data: session, status } = useSession()
  const [availability, setAvailability] = useState<Availability[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAvailability, setEditingAvailability] = useState<Availability | null>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAvailability()
    }
  }, [status])

  const fetchAvailability = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/therapist/availability')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao buscar disponibilidade')
      }

      setAvailability(data.availability)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingAvailability(null)
    setIsModalOpen(true)
  }

  const handleEdit = (av: Availability) => {
    setEditingAvailability(av)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja remover esta disponibilidade?')) {
      return
    }

    try {
      const res = await fetch(`/api/therapist/availability/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao remover disponibilidade')
      }

      alert('Disponibilidade removida com sucesso')
      fetchAvailability()
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleModalClose = (saved: boolean) => {
    setIsModalOpen(false)
    setEditingAvailability(null)
    if (saved) {
      fetchAvailability()
    }
  }

  // Agrupar availability por dia da semana
  const availabilityByDay: Record<number, Availability[]> = {}
  availability.forEach((av) => {
    if (!availabilityByDay[av.dayOfWeek]) {
      availabilityByDay[av.dayOfWeek] = []
    }
    availabilityByDay[av.dayOfWeek].push(av)
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B2B8A3]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Botão Adicionar */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {availability.length === 0 
            ? 'Nenhuma disponibilidade configurada'
            : `${availability.length} ${availability.length === 1 ? 'janela configurada' : 'janelas configuradas'}`
          }
        </p>
        <button
          onClick={handleCreate}
          className="bg-[#B2B8A3] hover:bg-[#9da390] text-white px-6 py-2.5 rounded-lg 
                     font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          + Adicionar Horário
        </button>
      </div>

      {/* Grid de dias da semana */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
          const dayAvailability = availabilityByDay[dayIndex] || []
          const hasAvailability = dayAvailability.length > 0

          return (
            <div
              key={dayIndex}
              className={`
                rounded-lg border-2 p-4 transition-all duration-200
                ${hasAvailability 
                  ? 'border-[#B2B8A3] bg-white shadow-sm' 
                  : 'border-gray-200 bg-gray-50'
                }
              `}
            >
              {/* Cabeçalho do dia */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {DAYS[dayIndex]}
                  </h3>
                  <span className={`
                    text-xs font-medium px-2 py-1 rounded-full
                    ${hasAvailability 
                      ? 'bg-[#B2B8A3] text-white' 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {DAYS_SHORT[dayIndex]}
                  </span>
                </div>
              </div>

              {/* Lista de janelas */}
              <div className="space-y-2">
                {hasAvailability ? (
                  dayAvailability
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((av) => (
                      <AvailabilityCard
                        key={av.id}
                        availability={av}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))
                ) : (
                  <p className="text-sm text-gray-400 italic text-center py-4">
                    Sem horários
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legenda */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2">💡 Dicas</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Configure múltiplas janelas no mesmo dia (ex: manhã e tarde)</li>
          <li>• Os horários não podem se sobrepor no mesmo dia</li>
          <li>• Clientes verão apenas slots livres (considerando agendamentos existentes)</li>
          <li>• Use o formato 24h (ex: 14:00 para 2 da tarde)</li>
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AvailabilityFormModal
          availability={editingAvailability}
          onClose={handleModalClose}
        />
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Service, Availability, TherapistProfile } from '@prisma/client'

interface Props {
  service: Service
  therapist: TherapistProfile & {
    availability: Availability[]
  }
  onSelect: (date: string, time: string) => void
  onBack: () => void
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export default function DateTimeSelector({
  service,
  therapist,
  onSelect,
  onBack
}: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  // Buscar slots disponíveis quando data mudar
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([])
      return
    }

    const fetchSlots = async () => {
      setLoadingSlots(true)
      try {
        const res = await fetch(
          `/api/slots?therapistId=${therapist.id}&date=${selectedDate}&serviceId=${service.id}`
        )
        const data = await res.json()
        setAvailableSlots(data.slots || [])
      } catch (error) {
        console.error('Erro ao buscar slots:', error)
        setAvailableSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }

    fetchSlots()
  }, [selectedDate, service.id, therapist.id])

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Selecione data e horário')
      return
    }
    onSelect(selectedDate, selectedTime)
  }

  // Gerar próximos 30 dias disponíveis
  const nextDays = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date
  })

  // Filtrar apenas dias com disponibilidade configurada
  const availableDates = nextDays.filter((date) => {
    const dayOfWeek = date.getDay()
    return therapist.availability.some((av) => av.dayOfWeek === dayOfWeek)
  })

  return (
    <div>
      <h2 className="text-xl font-serif text-gray-900 mb-6">
        Escolha a data e horário
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Seleção de Data */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Data
          </label>
          <div className="space-y-2 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-3">
            {availableDates.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma data disponível
              </p>
            ) : (
              availableDates.map((date) => {
                const dateStr = date.toISOString().split('T')[0]
                const dayOfWeek = date.getDay()
                const dayName = DAYS[dayOfWeek]
                const dateFormat = date.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit'
                })

                return (
                  <button
                    key={dateStr}
                    onClick={() => {
                      setSelectedDate(dateStr)
                      setSelectedTime('')
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedDate === dateStr
                        ? 'bg-[#B2B8A3] text-white'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">
                      {dayName}, {dateFormat}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Seleção de Hora */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Horário
          </label>
          {selectedDate ? (
            loadingSlots ? (
              <div className="flex items-center justify-center h-80 border border-gray-200 rounded-lg">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#B2B8A3] mb-2"></div>
                  <p className="text-sm text-gray-500">Carregando horários...</p>
                </div>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="flex items-center justify-center h-80 border border-gray-200 rounded-lg text-center text-gray-500">
                <p className="text-sm">Nenhum horário disponível nesta data</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-80 overflow-y-auto border border-gray-200 rounded-lg p-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === time
                        ? 'bg-[#B2B8A3] text-white'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-80 border border-gray-200 rounded-lg text-gray-400">
              <p className="text-sm">Selecione uma data</p>
            </div>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 
                     transition-colors font-medium"
        >
          ← Voltar
        </button>
        <button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className="flex-1 px-6 py-3 bg-[#B2B8A3] hover:bg-[#9da390] disabled:opacity-50 disabled:cursor-not-allowed
                     text-white rounded-lg transition-colors font-medium"
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}

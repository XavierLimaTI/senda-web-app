'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, AlertCircle } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
  reason?: string
}

interface Day {
  date: Date
  dayOfWeek: string
  dateStr: string
  slots: TimeSlot[]
}

interface Props {
  therapistId: number
  serviceId: number
  duration: number // em minutos
  onSelectSlot: (datetime: Date) => void
  isLoading?: boolean
}

export default function TherapistTimeSlotSelector({
  therapistId,
  serviceId,
  duration,
  onSelectSlot,
  isLoading = false
}: Props) {
  const [days, setDays] = useState<Day[]>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar horários disponíveis quando componente montar
  useEffect(() => {
    fetchAvailableSlots()
  }, [therapistId, serviceId, duration])

  // Gerar 14 dias a partir de amanhã
  const fetchAvailableSlots = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/therapists/${therapistId}/available-slots?serviceId=${serviceId}&days=14&duration=${duration}`
      )

      if (!response.ok) {
        throw new Error('Erro ao carregar horários disponíveis')
      }

      const data = await response.json()
      setDays(data.days || [])

      if (data.days?.length > 0) {
        setSelectedDay(data.days[0].dateStr)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
      generateFallbackSlots()
    } finally {
      setLoading(false)
    }
  }

  // Fallback: gerar slots manualmente se API falhar
  const generateFallbackSlots = () => {
    const days: Day[] = []
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    for (let i = 0; i < 14; i++) {
      const date = new Date(tomorrow)
      date.setDate(date.getDate() + i)

      const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()
      const dateStr = date.toISOString().split('T')[0]

      // Gerar slots de 9:00 às 17:00 (intervalo de 1 hora)
      const slots: TimeSlot[] = []
      for (let hour = 9; hour < 17; hour++) {
        slots.push({
          time: `${String(hour).padStart(2, '0')}:00`,
          available: Math.random() > 0.3 // 70% de disponibilidade
        })
      }

      days.push({
        date,
        dayOfWeek,
        dateStr,
        slots
      })
    }

    setDays(days)
    if (days.length > 0) {
      setSelectedDay(days[0].dateStr)
    }
  }

  const handleSelectSlot = () => {
    if (!selectedDay || !selectedTime) return

    const selectedDayObj = days.find(d => d.dateStr === selectedDay)
    if (!selectedDayObj) return

    // Construir DateTime
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const datetime = new Date(selectedDayObj.date)
    datetime.setHours(hours, minutes)

    onSelectSlot(datetime)
  }

  const selectedDayObj = days.find(d => d.dateStr === selectedDay)
  const selectedSlot = selectedDayObj?.slots.find(s => s.time === selectedTime)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B2B8A3]" />
        <span className="ml-2 text-[#666666]">Carregando horários...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-900">{error}</p>
          <p className="text-xs text-amber-700 mt-1">
            Estamos gerando horários padrão, mas recomendamos recarregar a página.
          </p>
        </div>
      </div>
    )
  }

  if (days.length === 0) {
    return (
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
        <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <p className="text-sm text-blue-900">
          Nenhum horário disponível nos próximos 14 dias
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Seletor de Dias */}
      <div>
        <label className="block text-sm font-medium text-[#2C3E2D] mb-3">
          <Calendar className="w-4 h-4 inline mr-2" />
          Escolha o dia
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {days.map(day => {
            const hasAvailableSlot = day.slots.some(s => s.available)
            return (
              <button
                key={day.dateStr}
                onClick={() => {
                  setSelectedDay(day.dateStr)
                  setSelectedTime(null)
                }}
                disabled={!hasAvailableSlot || isLoading}
                className={`p-3 rounded-lg border-2 transition-all text-center font-medium ${
                  selectedDay === day.dateStr
                    ? 'border-[#B2B8A3] bg-[#B2B8A3]/10 text-[#B2B8A3]'
                    : hasAvailableSlot
                    ? 'border-[#B2B8A3]/30 hover:border-[#B2B8A3] text-[#2C3E2D]'
                    : 'border-[#D3D3D3] bg-[#F5F5F5] text-[#999999] cursor-not-allowed'
                }`}
              >
                <div className="text-xs text-[#777777] mb-1">{day.dayOfWeek}</div>
                <div className="text-sm">
                  {new Date(day.dateStr).toLocaleDateString('pt-BR', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Seletor de Horários */}
      {selectedDayObj && (
        <div>
          <label className="block text-sm font-medium text-[#2C3E2D] mb-3">
            <Clock className="w-4 h-4 inline mr-2" />
            Horário ({duration} minutos)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
            {selectedDayObj.slots.map(slot => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available || isLoading}
                title={slot.reason}
                className={`p-2.5 rounded-lg border-2 transition-all text-sm font-medium ${
                  selectedTime === slot.time && slot.available
                    ? 'border-[#B2B8A3] bg-[#B2B8A3] text-white'
                    : slot.available
                    ? 'border-[#B2B8A3]/30 hover:border-[#B2B8A3] text-[#2C3E2D] hover:bg-[#F0EBE3]'
                    : 'border-[#D3D3D3] bg-[#F5F5F5] text-[#999999] cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resumo da Seleção */}
      {selectedDay && selectedTime && (
        <div className="p-4 bg-[#B2B8A3]/5 border border-[#B2B8A3]/20 rounded-lg">
          <p className="text-sm text-[#2C3E2D]">
            <span className="font-medium">Data/Hora selecionada:</span>{' '}
            {new Date(selectedDay).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{' '}
            às <span className="font-semibold">{selectedTime}</span>
          </p>
        </div>
      )}

      {/* Botão de Confirmação */}
      <button
        onClick={handleSelectSlot}
        disabled={!selectedTime || !selectedSlot?.available || isLoading}
        className="w-full py-3 bg-[#B2B8A3] hover:bg-[#9da390] disabled:bg-[#D3D3D3] disabled:cursor-not-allowed 
                   text-white rounded-lg font-medium transition-colors"
      >
        {isLoading ? 'Processando...' : 'Confirmar Horário'}
      </button>

      {/* Aviso: mostrar se nenhum horário selecionado */}
      {!selectedTime && (
        <p className="text-xs text-[#777777] text-center">
          Selecione um dia e um horário para continuar
        </p>
      )}
    </div>
  )
}

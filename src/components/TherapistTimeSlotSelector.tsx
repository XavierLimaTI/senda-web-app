'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

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
  const { t, language } = useLanguage()
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
        throw new Error(t('slots.error.load'))
      }

      const data = await response.json()
      setDays(data.days || [])

      if (data.days?.length > 0) {
        setSelectedDay(data.days[0].dateStr)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.unknown'))
      generateFallbackSlots()
    } finally {
      setLoading(false)
    }
  }

  // Fallback: gerar slots manualmente se API falhar
  const generateFallbackSlots = () => {
    const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : language === 'zh' ? 'zh-CN' : 'en-US'
    const daysArr: Day[] = []
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    for (let i = 0; i < 14; i++) {
      const date = new Date(tomorrow)
      date.setDate(date.getDate() + i)

      const dayOfWeek = date.toLocaleDateString(locale, { weekday: 'short' }).toUpperCase()
      const dateStr = date.toISOString().split('T')[0]

      // Gerar slots de 9:00 às 17:00 (intervalo de 1 hora)
      const slots: TimeSlot[] = []
      for (let hour = 9; hour < 17; hour++) {
        slots.push({
          time: `${String(hour).padStart(2, '0')}:00`,
          available: Math.random() > 0.3 // 70% de disponibilidade
        })
      }

      daysArr.push({
        date,
        dayOfWeek,
        dateStr,
        slots
      })
    }

    setDays(daysArr)
    if (daysArr.length > 0) {
      setSelectedDay(daysArr[0].dateStr)
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
  const locale = language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : language === 'zh' ? 'zh-CN' : 'en-US'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-salvia" />
        <span className="ml-2 text-gray-500">{t('slots.loading')}</span>
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
            {t('slots.error.fallback')}
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
          {t('slots.noSlots')}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Seletor de Dias */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-3">
          <Calendar className="w-4 h-4 inline mr-2" />
          {t('slots.chooseDay')}
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
                    ? 'border-salvia bg-salvia/10 text-salvia'
                    : hasAvailableSlot
                    ? 'border-salvia/30 hover:border-salvia text-gray-800'
                    : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">{day.dayOfWeek}</div>
                <div className="text-sm">
                  {new Date(day.dateStr).toLocaleDateString(locale, {
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
          <label className="block text-sm font-medium text-gray-800 mb-3">
            <Clock className="w-4 h-4 inline mr-2" />
            {t('slots.chooseTime', { duration: String(duration) })}
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
                    ? 'border-salvia bg-salvia text-white'
                    : slot.available
                    ? 'border-salvia/30 hover:border-salvia text-gray-800 hover:bg-areia'
                    : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
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
        <div className="p-4 bg-salvia/5 border border-salvia/20 rounded-lg">
          <p className="text-sm text-gray-800">
            <span className="font-medium">{t('slots.selectedDateTime')}</span>{' '}
            {new Date(selectedDay).toLocaleDateString(locale, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{' '}
            {t('slots.at')} <span className="font-semibold">{selectedTime}</span>
          </p>
        </div>
      )}

      {/* Botão de Confirmação */}
      <button
        onClick={handleSelectSlot}
        disabled={!selectedTime || !selectedSlot?.available || isLoading}
        className="w-full py-3 bg-salvia hover:bg-salvia-hover disabled:bg-gray-300 disabled:cursor-not-allowed 
                   text-white rounded-lg font-medium transition-colors"
      >
        {isLoading ? t('actions.processing') : t('slots.confirm')}
      </button>

      {/* Aviso: mostrar se nenhum horário selecionado */}
      {!selectedTime && (
        <p className="text-xs text-gray-500 text-center">
          {t('slots.selectTooltip')}
        </p>
      )}
    </div>
  )
}

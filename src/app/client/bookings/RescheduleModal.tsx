'use client'

import { useState, useEffect } from 'react'
import { format, addDays, startOfDay, isBefore, differenceInHours } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Booking, Service, TherapistProfile } from '@prisma/client'

interface RescheduleModalProps {
  booking: Booking & {
    service: Service
    therapist: TherapistProfile & {
      user: { name: string }
    }
  }
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface TimeSlot {
  time: string
  available: boolean
}

export default function RescheduleModal({ booking, isOpen, onClose, onSuccess }: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Datas disponíveis (próximos 30 dias)
  const availableDates = Array.from({ length: 30 }, (_, i) => addDays(startOfDay(new Date()), i + 1))

  // Verificar se pode reagendar (mínimo 24h antes)
  const canReschedule = differenceInHours(booking.startTime, new Date()) >= 24

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate)
    }
  }, [selectedDate])

  async function fetchAvailableSlots(date: Date) {
    setLoadingSlots(true)
    setError(null)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      const res = await fetch(`/api/slots?therapistId=${booking.therapistId}&date=${dateStr}&serviceId=${booking.serviceId}`)
      
      if (!res.ok) {
        throw new Error('Erro ao carregar horários disponíveis')
      }

      const data = await res.json()
      // API retorna array de strings, converter para formato esperado
      const slotsWithAvailability = (data.slots || []).map((time: string) => ({
        time,
        available: true
      }))
      setAvailableSlots(slotsWithAvailability)
    } catch (err) {
      console.error(err)
      setError((err as Error).message)
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  async function handleReschedule() {
    if (!selectedDate || !selectedTime) {
      setError('Por favor, selecione data e horário')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [hours, minutes] = selectedTime.split(':').map(Number)
      const newStartTime = new Date(selectedDate)
      newStartTime.setHours(hours, minutes, 0, 0)

      const res = await fetch(`/api/bookings/${booking.id}/reschedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newStartTime: newStartTime.toISOString()
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao reagendar')
      }

      onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  if (!canReschedule) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 mx-auto flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Reagendamento não disponível</h3>
            <p className="text-sm text-gray-600">
              É necessário reagendar com no mínimo 24 horas de antecedência.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 my-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-serif font-semibold text-gray-900">Reagendar sessão</h3>
            <p className="text-sm text-gray-600 mt-1">
              {booking.service.name} com {booking.therapist.user.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Informação atual */}
        <div className="bg-[#F0EBE3] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-gray-600">Agendamento atual:</span>
              <p className="text-gray-900 font-medium mt-1">
                {format(booking.startTime, "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            {selectedDate && selectedTime && (
              <>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div>
                  <span className="text-gray-600">Novo agendamento:</span>
                  <p className="text-[#B2B8A3] font-medium mt-1">
                    {format(selectedDate, "d 'de' MMMM", { locale: ptBR })} às {selectedTime}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Seleção de data */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Escolha a nova data</label>
          <div className="grid grid-cols-7 gap-2 max-h-48 overflow-y-auto">
            {availableDates.map((date) => {
              const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    setSelectedDate(date)
                    setSelectedTime(null)
                  }}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    isSelected
                      ? 'bg-[#B2B8A3] text-white border-[#B2B8A3]'
                      : 'bg-white border-gray-200 hover:border-[#B2B8A3] hover:bg-[#F0EBE3]'
                  }`}
                >
                  <div className="text-xs text-gray-600">{format(date, 'EEE', { locale: ptBR })}</div>
                  <div className="text-sm font-medium">{format(date, 'd', { locale: ptBR })}</div>
                  <div className="text-xs">{format(date, 'MMM', { locale: ptBR })}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Seleção de horário */}
        {selectedDate && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Escolha o horário</label>
            {loadingSlots ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="animate-spin h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Carregando horários...
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Nenhum horário disponível para esta data</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {availableSlots.map((slot, index) => (
                  <button
                    key={`${slot.time}-${index}`}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedTime === slot.time
                        ? 'bg-[#B2B8A3] text-white border-[#B2B8A3]'
                        : slot.available
                        ? 'bg-white border-gray-200 hover:border-[#B2B8A3] hover:bg-[#F0EBE3]'
                        : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleReschedule}
            disabled={!selectedDate || !selectedTime || loading}
            className={`px-6 py-2 text-sm font-medium rounded-lg text-white transition-colors ${
              !selectedDate || !selectedTime || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#B2B8A3] hover:bg-[#9da390]'
            }`}
          >
            {loading ? 'Reagendando...' : 'Confirmar reagendamento'}
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface Availability {
  id: number
  therapistId: number
  dayOfWeek: number
  startTime: string
  endTime: string
}

interface Props {
  availability: Availability | null
  onClose: (saved: boolean) => void
}

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function AvailabilityFormModal({ availability, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    dayOfWeek: availability?.dayOfWeek ?? 1,
    startTime: availability?.startTime ?? '09:00',
    endTime: availability?.endTime ?? '18:00',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações client-side
    if (formData.startTime >= formData.endTime) {
      alert('Horário de início deve ser anterior ao de término')
      return
    }

    setLoading(true)

    try {
      const url = availability
        ? `/api/therapist/availability/${availability.id}`
        : '/api/therapist/availability'
      
      const method = availability ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao salvar disponibilidade')
      }

      alert(
        availability 
          ? 'Disponibilidade atualizada com sucesso' 
          : 'Disponibilidade criada com sucesso'
      )
      onClose(true)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h2 className="text-2xl font-serif text-gray-900 mb-6">
          {availability ? 'Editar Horário' : 'Novo Horário'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dia da semana */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dia da Semana
            </label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-[#B2B8A3] focus:border-transparent outline-none"
              required
            >
              {DAYS.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Horário de início */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário de Início
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-[#B2B8A3] focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Horário de término */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário de Término
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                         focus:ring-[#B2B8A3] focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg 
                         hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-[#B2B8A3] hover:bg-[#9da390] text-white rounded-lg 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                         font-medium shadow-sm"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

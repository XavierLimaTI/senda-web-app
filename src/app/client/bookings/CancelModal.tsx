'use client'

import { useState } from 'react'
import { Booking, Service, TherapistProfile } from '@prisma/client'

interface CancelModalProps {
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

export default function CancelModal({ booking, isOpen, onClose, onSuccess }: CancelModalProps) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calcular horas até a sessão
  const now = new Date()
  const startTime = new Date(booking.startTime)
  const hoursUntil = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60)
  const refundPercentage = hoursUntil >= 24 ? 100 : 50
  const fee = hoursUntil < 24 ? booking.service.price * 0.5 : 0

  async function handleCancel() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/bookings/${booking.id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: reason.trim() || undefined })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao cancelar agendamento')
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-serif font-semibold text-gray-900">Cancelar agendamento</h3>
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

        {/* Política de cancelamento */}
        <div className={`rounded-lg p-4 mb-4 ${
          refundPercentage === 100 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <div className="flex items-start gap-3">
            <svg 
              className={`w-6 h-6 flex-shrink-0 ${refundPercentage === 100 ? 'text-green-600' : 'text-yellow-600'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className={`font-medium ${refundPercentage === 100 ? 'text-green-900' : 'text-yellow-900'}`}>
                Política de cancelamento
              </p>
              <p className={`text-sm mt-1 ${refundPercentage === 100 ? 'text-green-700' : 'text-yellow-700'}`}>
                {refundPercentage === 100 ? (
                  <>
                    ✓ Cancelamento gratuito - Reembolso integral de <strong>R$ {booking.service.price.toFixed(2)}</strong>
                  </>
                ) : (
                  <>
                    ⚠️ Cancelamento com taxa de 50% - Taxa de <strong>R$ {fee.toFixed(2)}</strong>
                    <br />
                    <span className="text-xs">Reembolso: R$ {(booking.service.price - fee).toFixed(2)}</span>
                  </>
                )}
              </p>
              <p className="text-xs mt-2 text-gray-600">
                Faltam {Math.round(hoursUntil * 10) / 10}h para a sessão
              </p>
            </div>
          </div>
        </div>

        {/* Motivo */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo do cancelamento (opcional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-200 focus:border-[#B2B8A3] focus:ring-[#B2B8A3] text-sm"
            placeholder="Ex: Imprevisto, mudança de agenda..."
          />
        </div>

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
            Manter agendamento
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className={`px-6 py-2 text-sm font-medium rounded-lg text-white transition-colors ${
              loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Cancelando...' : 'Confirmar cancelamento'}
          </button>
        </div>
      </div>
    </div>
  )
}

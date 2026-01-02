'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Payment {
  id: number
  amount: number
  status: string
  transactionId: string
  booking: {
    id: number
    startTime: Date
    service: {
      name: string
      duration: number
    }
    therapist: {
      user: {
        name: string
      }
    }
  }
}

export default function CheckoutClient({ payment }: { payment: Payment }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX' | 'BOLETO'>('CREDIT_CARD')

  const handlePayment = async () => {
    setLoading(true)

    // Simular pagamento (2 segundos de processamento)
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      const res = await fetch('/api/payments/simulate-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: payment.transactionId,
          method: paymentMethod
        })
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Erro ao processar pagamento')
        setLoading(false)
        return
      }

      // Redirecionar para página de sucesso
      router.push(`/checkout/success?bookingId=${payment.booking.id}`)
    } catch (error) {
      alert('Erro ao processar pagamento')
      setLoading(false)
    }
  }

  const startDate = new Date(payment.booking.startTime)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#B2B8A3] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">Checkout Senda</h1>
          <p className="text-gray-600">Ambiente de Teste - Pagamento Simulado</p>
        </div>

        {/* Resumo do agendamento */}
        <div className="bg-[#F0EBE3] rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Resumo do Agendamento</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Terapeuta:</span>
              <span className="font-medium">{payment.booking.therapist.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Serviço:</span>
              <span className="font-medium">{payment.booking.service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data:</span>
              <span className="font-medium">
                {startDate.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  day: '2-digit', 
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Horário:</span>
              <span className="font-medium">
                {startDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duração:</span>
              <span className="font-medium">{payment.booking.service.duration} minutos</span>
            </div>
          </div>
        </div>

        {/* Método de pagamento */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Método de Pagamento</h3>
          <div className="space-y-3">
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'CREDIT_CARD' ? 'border-[#B2B8A3] bg-[#F0EBE3]' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="payment"
                value="CREDIT_CARD"
                checked={paymentMethod === 'CREDIT_CARD'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <span className="font-medium">Cartão de Crédito</span>
            </label>
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'PIX' ? 'border-[#B2B8A3] bg-[#F0EBE3]' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="payment"
                value="PIX"
                checked={paymentMethod === 'PIX'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <span className="font-medium">PIX</span>
            </label>
            <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              paymentMethod === 'BOLETO' ? 'border-[#B2B8A3] bg-[#F0EBE3]' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="payment"
                value="BOLETO"
                checked={paymentMethod === 'BOLETO'}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="mr-3"
              />
              <span className="font-medium">Boleto Bancário</span>
            </label>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex justify-between items-center text-2xl font-serif">
            <span className="text-gray-900">Total:</span>
            <span className="text-[#B2B8A3] font-bold">
              R$ {payment.amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Botão de pagamento */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-[#B2B8A3] hover:bg-[#9da390] disabled:opacity-50 disabled:cursor-not-allowed
                     text-white font-semibold py-4 rounded-lg transition-colors text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processando pagamento...
            </span>
          ) : (
            `Pagar R$ ${payment.amount.toFixed(2)}`
          )}
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          🧪 Modo de Teste: Este pagamento será confirmado automaticamente sem cobrança real
        </p>
      </div>
    </div>
  )
}

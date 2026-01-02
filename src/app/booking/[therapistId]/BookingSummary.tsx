'use client'

import { Service, TherapistProfile } from '@prisma/client'

interface Props {
  therapist: TherapistProfile & {
    user: { name: string }
  }
  service: Service
  date: string
  time: string
  onBack: () => void
  onConfirm: () => void
  loading: boolean
}

export default function BookingSummary({
  therapist,
  service,
  date,
  time,
  onBack,
  onConfirm,
  loading
}: Props) {
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div>
      <h2 className="text-xl font-serif text-gray-900 mb-6">
        Confirme seu agendamento
      </h2>

      <div className="space-y-4 mb-8">
        {/* Terapeuta */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
            Profissional
          </p>
          <p className="text-lg font-medium text-gray-900">
            {therapist.user.name}
          </p>
        </div>

        {/* Serviço */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
            Serviço
          </p>
          <p className="text-lg font-medium text-gray-900 mb-1">
            {service.name}
          </p>
          <p className="text-sm text-gray-600">
            Duração: {service.duration} minutos
          </p>
        </div>

        {/* Data */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
            Data
          </p>
          <p className="text-lg font-medium text-gray-900">
            {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
          </p>
        </div>

        {/* Horário */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
            Horário
          </p>
          <p className="text-lg font-medium text-gray-900">
            {time}
          </p>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gray-200 my-2"></div>

        {/* Preço */}
        <div className="p-4 bg-[#F0EBE3] rounded-lg border-2 border-[#B2B8A3]">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 font-medium">Valor total:</p>
            <p className="text-3xl font-serif text-[#B2B8A3] font-bold">
              R$ {service.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
        <p className="font-medium mb-1">ℹ Informações importantes</p>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>Você receberá um email de confirmação com os detalhes</li>
          <li>Chegue com 5-10 minutos de antecedência</li>
          <li>Você pode cancelar com até 24 horas de antecedência sem multa</li>
        </ul>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 
                     transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Voltar
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-[#B2B8A3] hover:bg-[#9da390] disabled:opacity-50 disabled:cursor-not-allowed
                     text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Confirmando...
            </>
          ) : (
            <>
              ✓ Confirmar Agendamento
            </>
          )}
        </button>
      </div>
    </div>
  )
}

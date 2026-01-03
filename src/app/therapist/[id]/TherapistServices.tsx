'use client'

import { Service } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Props {
  services: Service[]
  therapistId: number
}

export default function TherapistServices({ services, therapistId }: Props) {
  const router = useRouter()
  return (
    <section>
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Serviços</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            {/* Nome do serviço */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {service.name}
            </h3>

            {/* Descrição */}
            {service.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {service.description}
              </p>
            )}

            {/* Info Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Duração</p>
                <p className="font-medium text-gray-900">
                  {service.duration}min
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">A partir de</p>
                <p className="text-xl font-serif text-[#B2B8A3]">
                  R$ {service.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Botão Agendar */}
            <button
              onClick={() => router.push(`/booking/${therapistId}?serviceId=${service.id}`)}
              className="w-full mt-4 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                         hover:from-[#9da390] hover:to-[#8a9280] text-white font-medium py-2.5 rounded-lg
                         transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Agendar {service.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'

import { Service } from '@prisma/client'

interface Props {
  services: Service[]
  onSelect: (service: Service) => void
}

export default function ServiceSelector({ services, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-xl font-serif text-gray-900 mb-6">
        Qual serviço você deseja agendar?
      </h2>

      <div className="space-y-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-[#B2B8A3] 
                       hover:bg-[#F0EBE3] transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#B2B8A3] transition-colors">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-2xl font-serif text-[#B2B8A3] font-semibold">
                  R$ {service.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {service.duration}min
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

'use client'

import { Service } from '@prisma/client'

interface ServiceCardProps {
  service: Service
  onEdit: (service: Service) => void
  onDelete: (serviceId: number) => void
}

export default function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-serif text-gray-900">{service.name}</h3>
            {!service.active && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Desativado
              </span>
            )}
          </div>
          
          {service.description && (
            <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">
              {service.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-salvia" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{service.duration} minutos</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-salvia" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">R$ {service.price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onEdit(service)}
            className="p-2 text-gray-600 hover:text-salvia hover:bg-gray-50 rounded-lg transition-colors"
            title="Editar serviço"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {service.active && (
            <button
              onClick={() => onDelete(service.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Desativar serviço"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

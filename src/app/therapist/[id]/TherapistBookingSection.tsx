'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, MapPin, Video } from 'lucide-react'
import TherapistTimeSlotSelector from '@/components/TherapistTimeSlotSelector'
import { useLanguage } from '@/context/LanguageContext'

interface Service {
  id: number
  name: string
  description: string | null
  price: number
  duration: number
}

interface Props {
  therapistId: number
  therapistName: string
  services: Service[]
  onlineAvailable?: boolean
  city?: string | null
  neighborhood?: string | null
}

export default function TherapistBookingSection({
  therapistId,
  therapistName,
  services,
  onlineAvailable,
  city,
  neighborhood
}: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(services[0] || null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const { t } = useLanguage()

  if (!services.length) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-amber-200 bg-amber-50">
        <p className="text-gray-700">
          {t('therapist.no_services')}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Coluna esquerda - Serviços */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-2xl font-serif text-gray-900 mb-4">{t('therapist.services')}</h3>
        
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => {
              setSelectedService(service)
              setShowBookingForm(true)
            }}
            className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
              selectedService?.id === service.id
                ? 'bg-[#B2B8A3]/10 border-[#B2B8A3]'
                : 'bg-white border-gray-200 hover:border-[#B2B8A3]/50'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
                {service.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-serif text-[#B2B8A3] font-bold">
                  R$ {service.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Info do serviço */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#B2B8A3]" />
                {service.duration} {t('therapist.minutes')}
              </div>
              {onlineAvailable && (
                <div className="flex items-center gap-1">
                  <Video className="w-4 h-4 text-[#B2B8A3]" />
                  {t('therapist.available_online')}
                </div>
              )}
              {city && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#B2B8A3]" />
                  {city}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Coluna direita - Booking CTA */}
      <div className="lg:col-span-1">
        {selectedService && (
          <div className="sticky top-4 bg-gradient-to-br from-[#B2B8A3] to-[#9da390] rounded-lg p-6 text-white shadow-lg">
            <h4 className="text-lg font-serif mb-2">{t('therapist.schedule_session')}</h4>
            
            <div className="bg-white/10 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-white/90 text-sm">{selectedService.name}</span>
                <span className="text-xl font-bold">R$ {selectedService.price.toFixed(2)}</span>
              </div>
              <div className="text-sm text-white/80 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedService.duration} {t('therapist.minutes')}
              </div>
            </div>

            {/* Localização */}
            {(city || onlineAvailable) && (
              <div className="mb-4 p-3 bg-white/10 rounded text-sm text-white/90 space-y-1">
                {onlineAvailable && (
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    {t('therapist.available_online')}
                  </div>
                )}
                {city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {neighborhood ? `${neighborhood}, ` : ''}{city}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setShowBookingForm(true)}
              className="w-full py-3 bg-white text-[#B2B8A3] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              {t('therapist.choose_time')}
            </button>

            <p className="text-xs text-white/70 text-center mt-3">
              {t('therapist.with').replace('{name}', therapistName)}
            </p>
          </div>
        )}
      </div>

      {/* Modal de agendamento */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif text-gray-900">{t('therapist.schedule_session')}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedService.name}</p>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Seletor de Horários */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">{t('therapist.select_slot')}</h4>
                <TherapistTimeSlotSelector
                  therapistId={therapistId}
                  serviceId={selectedService.id}
                  duration={selectedService.duration || 60}
                  onSelectSlot={(datetime) => {
                    // Após selecionar horário, redirecionar para checkout
                    const params = new URLSearchParams({
                      therapistId: therapistId.toString(),
                      therapistName,
                      serviceId: selectedService.id.toString(),
                      serviceName: selectedService.name,
                      datetime: datetime.toISOString(),
                      price: selectedService.price.toString(),
                      duration: (selectedService.duration || 60).toString()
                    })
                    window.location.href = `/checkout?${params.toString()}`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

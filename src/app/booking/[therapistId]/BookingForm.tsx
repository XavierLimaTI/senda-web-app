'use client'

import { useState } from 'react'
import { Service, Availability, TherapistProfile, User } from '@prisma/client'
import ServiceSelector from './ServiceSelector'
import DateTimeSelector from './DateTimeSelector'
import BookingSummary from './BookingSummary'

interface BookingFormProps {
  therapist: TherapistProfile & {
    user: { name: string; avatar: string | null }
    services: Service[]
    availability: Availability[]
  }
  clientEmail: string
}

type Step = 'service' | 'datetime' | 'summary' | 'confirmation'

export default function BookingForm({ therapist, clientEmail }: BookingFormProps) {
  const [step, setStep] = useState<Step>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep('datetime')
  }

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setStep('summary')
  }

  const handleBackFromDateTime = () => {
    setStep('service')
  }

  const handleBackFromSummary = () => {
    setStep('datetime')
  }

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setError('Dados incompletos')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Construir datetime ISO
      const dateTime = new Date(`${selectedDate}T${selectedTime}`).toISOString()

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          therapistId: therapist.id,
          serviceId: selectedService.id,
          dateTime
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao criar agendamento')
        return
      }

      setStep('confirmation')
    } catch (err: any) {
      setError(err.message || 'Erro ao agendar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                  ${step === 'service' || ['datetime', 'summary', 'confirmation'].includes(step)
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-gray-200 text-gray-600'
                  }`}
              >
                ✓
              </div>
              <span className="text-gray-600 font-medium">Serviço</span>
            </div>

            <div className="flex-1 h-0.5 mx-2 bg-gray-200"></div>

            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                  ${step === 'datetime' || ['summary', 'confirmation'].includes(step)
                    ? 'bg-[#B2B8A3] text-white'
                    : step === 'service'
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-[#B2B8A3] text-white'
                  }`}
              >
                {['summary', 'confirmation'].includes(step) ? '✓' : '2'}
              </div>
              <span className="text-gray-600 font-medium">Data e Hora</span>
            </div>

            <div className="flex-1 h-0.5 mx-2 bg-gray-200"></div>

            <div className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                  ${['summary', 'confirmation'].includes(step)
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {step === 'confirmation' ? '✓' : '3'}
              </div>
              <span className="text-gray-600 font-medium">Confirmação</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Content */}
          {step === 'service' && (
            <ServiceSelector
              services={therapist.services}
              onSelect={handleServiceSelect}
            />
          )}

          {step === 'datetime' && selectedService && (
            <DateTimeSelector
              service={selectedService}
              therapist={therapist}
              onSelect={handleDateTimeSelect}
              onBack={handleBackFromDateTime}
            />
          )}

          {step === 'summary' && selectedService && (
            <BookingSummary
              therapist={therapist}
              service={selectedService}
              date={selectedDate}
              time={selectedTime}
              onBack={handleBackFromSummary}
              onConfirm={handleConfirmBooking}
              loading={loading}
            />
          )}

          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#B2B8A3] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-gray-900 mb-2">
                Agendamento Confirmado!
              </h2>
              <p className="text-gray-600 mb-6">
                Um email de confirmação foi enviado para {clientEmail}
              </p>
              <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Terapeuta:</span> {therapist.user.name}
                </p>
                {selectedService && (
                  <>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Serviço:</span> {selectedService.name}
                    </p>
                  </>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Data:</span> {selectedDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Horário:</span> {selectedTime}
                </p>
              </div>
              <a
                href="/client/bookings"
                className="inline-block px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
              >
                Ver Meus Agendamentos
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Terapeuta Info */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-6">
          <h3 className="text-lg font-serif text-gray-900 mb-4">Profissional</h3>
          
          {therapist.user.avatar ? (
            <img
              src={therapist.user.avatar}
              alt={therapist.user.name}
              className="w-full h-48 rounded-lg object-cover mb-4"
            />
          ) : (
            <div className="w-full h-48 rounded-lg bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                            flex items-center justify-center mb-4">
              <span className="text-6xl text-white font-serif">
                {therapist.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <h4 className="text-lg font-medium text-gray-900 mb-1">
            {therapist.user.name}
          </h4>

          {therapist.specialty && (
            <p className="text-sm text-gray-600 mb-4">
              {therapist.specialty}
            </p>
          )}

          {therapist.rating > 0 && (
            <div className="flex items-center gap-1 mb-4 pb-4 border-b border-gray-200">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(therapist.rating)
                      ? 'text-[#C8963E]'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm font-medium text-gray-900">
                {therapist.rating.toFixed(1)}
              </span>
            </div>
          )}

          <a
            href={`/therapist/${therapist.id}`}
            className="w-full py-2 px-4 text-center border border-[#B2B8A3] text-[#B2B8A3] 
                       rounded-lg hover:bg-[#B2B8A3] hover:text-white transition-colors text-sm font-medium"
          >
            Ver Perfil Completo
          </a>
        </div>
      </div>
    </div>
  )
}

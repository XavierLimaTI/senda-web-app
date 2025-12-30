'use client'

import { useState } from 'react'
import { Service } from '@prisma/client'
import ServiceCard from './ServiceCard'
import ServiceFormModal from './ServiceFormModal'

interface ServicesManagerProps {
  initialServices: Service[]
  isVerified: boolean
}

export default function ServicesManager({ initialServices, isVerified }: ServicesManagerProps) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleCreateService = (newService: Service) => {
    setServices(prev => [newService, ...prev])
    setIsModalOpen(false)
  }

  const handleUpdateService = (updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s))
    setEditingService(null)
    setIsModalOpen(false)
  }

  const handleDeleteService = async (serviceId: number) => {
    if (!confirm('Tem certeza que deseja desativar este serviço?')) {
      return
    }

    try {
      const res = await fetch(`/api/therapist/services?id=${serviceId}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Erro ao desativar serviço')
        return
      }

      const data = await res.json()
      setServices(prev => prev.map(s => s.id === serviceId ? data.service : s))
    } catch (error) {
      console.error('Erro ao desativar serviço:', error)
      alert('Erro ao desativar serviço')
    }
  }

  const handleEditClick = (service: Service) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingService(null)
  }

  const activeServices = services.filter(s => s.active)
  const inactiveServices = services.filter(s => !s.active)

  return (
    <div>
      {/* Botão criar novo */}
      <button
        onClick={() => isVerified ? setIsModalOpen(true) : alert('Seu perfil ainda não está verificado. Aguarde aprovação para criar serviços.')}
        disabled={!isVerified}
        className={`mb-6 px-6 py-3 rounded-lg font-semibold transition-opacity flex items-center gap-2 ${isVerified ? 'bg-salvia text-white hover:opacity-90' : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Novo Serviço
      </button>

      {/* Lista de serviços ativos */}
      {activeServices.length === 0 && inactiveServices.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-lg font-serif text-gray-900">Nenhum serviço cadastrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comece criando seu primeiro serviço para que clientes possam agendar com você
          </p>
          <button
            onClick={() => isVerified ? setIsModalOpen(true) : alert('Seu perfil ainda não está verificado. Aguarde aprovação para criar serviços.')}
            disabled={!isVerified}
            className={`mt-6 px-6 py-2 rounded-lg font-semibold ${isVerified ? 'bg-salvia text-white hover:opacity-90' : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-70'}`}
          >
            Criar Primeiro Serviço
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {activeServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onEdit={handleEditClick}
                onDelete={handleDeleteService}
              />
            ))}
          </div>

          {/* Serviços inativos */}
          {inactiveServices.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-serif mb-4 text-gray-500">Serviços Desativados</h2>
              <div className="space-y-4 opacity-60">
                {inactiveServices.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteService}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal de criação/edição */}
      {isModalOpen && (
        <ServiceFormModal
          service={editingService}
          onClose={handleModalClose}
          onSuccess={editingService ? handleUpdateService : handleCreateService}
        />
      )}
    </div>
  )
}

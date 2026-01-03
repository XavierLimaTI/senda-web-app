'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle, XCircle, Eye, Mail, Phone, Calendar, MapPin } from 'lucide-react'

interface PendingTherapist {
  id: number
  userId: number
  bio: string | null
  specialty: string  // singular, conforme schema Prisma
  experience: number | null
  verified: boolean
  createdAt: Date
  user: {
    id: number
    name: string
    email: string
    phone: string | null
    avatar: string | null
    createdAt: Date
  }
}

export default function PendingTherapistsClient({ 
  therapists 
}: { 
  therapists: PendingTherapist[] 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState<number | null>(null)
  const [selectedTherapist, setSelectedTherapist] = useState<PendingTherapist | null>(null)

  const handleApprove = async (therapistId: number) => {
    if (!confirm('Tem certeza que deseja APROVAR este terapeuta?')) return

    setLoading(therapistId)
    try {
      const response = await fetch('/api/admin/therapists/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ therapistId })
      })

      if (response.ok) {
        alert('Terapeuta aprovado com sucesso!')
        router.refresh()
      } else {
        const data = await response.json()
        alert(`Erro: ${data.error}`)
      }
    } catch (error) {
      alert('Erro ao aprovar terapeuta')
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (therapistId: number) => {
    const reason = prompt('Motivo da rejeição (será enviado por email):')
    if (!reason) return

    setLoading(therapistId)
    try {
      const response = await fetch('/api/admin/therapists/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ therapistId, reason })
      })

      if (response.ok) {
        alert('Terapeuta rejeitado. Email de notificação enviado.')
        router.refresh()
      } else {
        const data = await response.json()
        alert(`Erro: ${data.error}`)
      }
    } catch (error) {
      alert('Erro ao rejeitar terapeuta')
    } finally {
      setLoading(null)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  if (therapists.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Terapeutas Pendentes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum terapeuta aguardando aprovação
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tudo em dia!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Não há terapeutas pendentes de aprovação no momento.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Terapeutas Pendentes de Aprovação
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {therapists.length} {therapists.length === 1 ? 'terapeuta aguardando' : 'terapeutas aguardando'} sua revisão
          </p>
        </div>

        {/* Therapists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#B2B8A3]/10 to-[#D99A8B]/10">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                    {therapist.user.avatar ? (
                      <Image
                        src={therapist.user.avatar}
                        alt={therapist.user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                        {therapist.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {therapist.user.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Mail className="w-4 h-4" />
                      {therapist.user.email}
                    </div>
                    {therapist.user.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        {therapist.user.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Bio */}
                {therapist.bio && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Sobre
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {therapist.bio}
                    </p>
                  </div>
                )}

                {/* Specialty */}
                {therapist.specialty && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Especialidade
                    </h4>
                    <span className="px-2 py-1 bg-[#B2B8A3]/20 text-[#B2B8A3] text-xs rounded-full">
                      {therapist.specialty}
                    </span>
                  </div>
                )}

                {/* Experience */}
                {therapist.experience && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {therapist.experience} {therapist.experience === 1 ? 'ano' : 'anos'} de experiência
                  </div>
                )}

                {/* Registration Date */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Cadastrado em {formatDate(therapist.user.createdAt)}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(therapist.id)}
                    disabled={loading === therapist.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {loading === therapist.id ? 'Aprovando...' : 'Aprovar'}
                  </button>
                  <button
                    onClick={() => handleReject(therapist.id)}
                    disabled={loading === therapist.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    {loading === therapist.id ? 'Rejeitando...' : 'Rejeitar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

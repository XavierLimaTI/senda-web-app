import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import TherapistHeader from './TherapistHeader'
import TherapistServices from './TherapistServices'
import TherapistAvailability from './TherapistAvailability'
import BookingButton from './BookingButton'

interface Props {
  params: { id: string }
}

export default async function TherapistPage({ params }: Props) {
  const therapistId = parseInt(params.id)

  if (isNaN(therapistId)) {
    notFound()
  }

  // Buscar terapeuta com todas as relações
  const therapist = await prisma.therapistProfile.findUnique({
    where: { id: therapistId },
    include: {
      user: {
        select: { name: true, email: true, avatar: true, phone: true }
      },
      services: {
        where: { active: true },
        orderBy: { createdAt: 'desc' }
      },
      availability: {
        orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
      },
      bookings: {
        where: {
          status: 'completed'
        },
        take: 10,
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!therapist) {
    notFound()
  }

  // Verificar se terapeuta está verificado
  if (!therapist.verified) {
    // Mostrar página indicando que terapeuta não está ativo
    return (
      <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-lg">
          <h1 className="text-2xl font-serif text-gray-900 mb-2">
            Perfil não disponível
          </h1>
          <p className="text-gray-600 mb-4">
            Este terapeuta ainda está em processo de verificação.
            <br />
            Em breve estará disponível para agendamentos.
          </p>
          <a
            href="/"
            className="inline-block text-[#B2B8A3] hover:underline font-medium"
          >
            Voltar para Senda
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Header/Hero */}
      <TherapistHeader therapist={therapist} />

      {/* Conteúdo principal */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Bio */}
        {therapist.bio && (
          <section className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Sobre</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {therapist.bio}
            </p>

            {/* Informações adicionais */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
              {therapist.experience && (
                <div>
                  <p className="text-sm text-gray-600">Experiência</p>
                  <p className="text-lg font-medium text-gray-900">
                    {therapist.experience} {therapist.experience === 1 ? 'ano' : 'anos'}
                  </p>
                </div>
              )}
              {therapist.specialty && (
                <div>
                  <p className="text-sm text-gray-600">Especialidades</p>
                  <p className="text-lg font-medium text-gray-900">
                    {therapist.specialty}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Serviços */}
        {therapist.services.length > 0 && (
          <TherapistServices services={therapist.services} />
        )}

        {/* Disponibilidade */}
        {therapist.availability.length > 0 && (
          <TherapistAvailability availability={therapist.availability} />
        )}

        {/* Contato */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Entre em Contato</h2>
          <div className="space-y-2">
            {therapist.user.email && (
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{' '}
                <a
                  href={`mailto:${therapist.user.email}`}
                  className="text-[#B2B8A3] hover:underline"
                >
                  {therapist.user.email}
                </a>
              </p>
            )}
            {therapist.user.phone && (
              <p className="text-gray-700">
                <span className="font-medium">Telefone:</span>{' '}
                <a
                  href={`tel:${therapist.user.phone}`}
                  className="text-[#B2B8A3] hover:underline"
                >
                  {therapist.user.phone}
                </a>
              </p>
            )}
          </div>
        </section>
      </div>

      {/* CTA flutuante no mobile, fixo no desktop */}
      <BookingButton therapistId={therapist.id} therapistName={therapist.user.name} />
    </div>
  )
}

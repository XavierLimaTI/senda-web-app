import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import TherapistHeader from './TherapistHeader'
import TherapistBookingSection from './TherapistBookingSection'
import TherapistReviewsSection from './TherapistReviewsSection'
import BookingButton from './BookingButton'

interface Props {
  params: { id: string }
}

export default async function TherapistPage({ params }: Props) {
  const therapistId = parseInt(params.id)

  if (isNaN(therapistId)) {
    notFound()
  }

  // Buscar terapeuta com relações principais
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

  // Reviews e métrica agregada
  const [reviews, reviewCount, ratingAvg, distribution] = await Promise.all([
    prisma.review.findMany({
      where: { therapistId },
      include: {
        booking: {
          select: {
            service: { select: { name: true } },
            startTime: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 6
    }),
    prisma.review.count({ where: { therapistId } }),
    prisma.review.aggregate({
      where: { therapistId },
      _avg: { rating: true }
    }),
    prisma.review.groupBy({
      by: ['rating'],
      where: { therapistId },
      _count: { rating: true }
    })
  ])

  const ratingAverage = ratingAvg._avg.rating ? Number(ratingAvg._avg.rating.toFixed(1)) : 0
  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  distribution.forEach((d) => {
    ratingDistribution[d.rating as number] = d._count.rating
  })

  // Verificar se o terapeuta está nos favoritos do usuário (se logado como cliente)
  const session = await auth()
  let isFavorite = false
  
  if (session && session.user.role === 'CLIENT') {
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: {
        favorites: {
          where: { therapistId },
          select: { id: true }
        }
      }
    })
    
    if (clientProfile) {
      isFavorite = clientProfile.favorites.length > 0
    }
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Header/Hero */}
      <TherapistHeader therapist={therapist} therapistId={therapist.id} isFavorite={isFavorite} />

      {/* Conteúdo principal */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Seção de Agendamento */}
        <TherapistBookingSection
          therapistId={therapist.id}
          therapistName={therapist.user.name}
          services={therapist.services}
          onlineAvailable={therapist.onlineAvailable}
          city={therapist.city}
          neighborhood={therapist.neighborhood}
        />

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

        {/* Avaliações */}
        <TherapistReviewsSection
          reviews={reviews}
          averageRating={ratingAverage}
          ratingDistribution={ratingDistribution}
          totalReviews={reviewCount}
        />

        {/* CTA flutuante no mobile, fixo no desktop */}
        <BookingButton therapistId={therapist.id} therapistName={therapist.user.name} />
      </div>
    </div>
  )
}

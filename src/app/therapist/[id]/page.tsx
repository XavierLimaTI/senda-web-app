import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import TherapistHeader from './TherapistHeader'
import TherapistServices from './TherapistServices'
import TherapistAvailability from './TherapistAvailability'
import BookingButton from './BookingButton'
import ReviewCard from '@/components/ReviewCard'

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
  const session = await getServerSession(authOptions)
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
          <TherapistServices services={therapist.services} therapistId={therapist.id} />
        )}

        {/* Disponibilidade */}
        {therapist.availability.length > 0 && (
          <TherapistAvailability availability={therapist.availability} />
        )}

        {/* Reviews */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif text-gray-900">Avaliações</h2>
            <div className="text-right">
              <p className="text-3xl font-semibold text-[#C8963E] leading-tight">
                {ratingAverage.toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">{reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'}</p>
            </div>
          </div>

          {/* Distribuição */}
          {reviewCount > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-10 text-right font-medium">{star}★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B2B8A3]"
                      style={{
                        width: `${reviewCount ? (ratingDistribution[star] / reviewCount) * 100 : 0}%`
                      }}
                    />
                  </div>
                  <span className="w-8 text-left">{ratingDistribution[star]}</span>
                </div>
              ))}
            </div>
          )}

          {/* Lista de reviews */}
          {reviewCount === 0 ? (
            <p className="text-gray-600">Ainda não há avaliações para este terapeuta.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  rating={review.rating}
                  comment={review.comment || undefined}
                  serviceName={review.booking.service.name}
                  sessionDate={review.booking.startTime}
                  createdAt={review.createdAt}
                />
              ))}
            </div>
          )}
        </section>

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

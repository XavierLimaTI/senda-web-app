import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Calendar, Heart, Search, Star, Sparkles, ArrowRight } from 'lucide-react'
import TherapistsCarousel from '@/components/TherapistsCarousel'

export default async function ClientHome() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'CLIENT') {
    redirect('/auth/signin')
  }

  // Buscar próximas sessões do cliente
  const upcomingBookings = await prisma.booking.findMany({
    where: {
      clientId: parseInt(session.user.id),
      startTime: { gte: new Date() },
      status: 'CONFIRMED'
    },
    include: {
      service: true,
      therapist: {
        include: {
          user: true
        }
      }
    },
    orderBy: { startTime: 'asc' },
    take: 3
  })

  // Buscar terapeutas favoritos
  const clientProfile = await prisma.clientProfile.findUnique({
    where: { userId: parseInt(session.user.id) },
    include: {
      favorites: {
        include: {
          therapist: {
            include: {
              user: true,
              services: { take: 1, where: { active: true } }
            }
          }
        },
        take: 4
      }
    }
  })

  // Buscar terapeutas verificados para o carrossel
  const featuredTherapists = await prisma.therapistProfile.findMany({
    where: {
      verified: true,
      rating: { gte: 4 }
    },
    include: {
      user: true,
      services: { take: 1, where: { active: true } }
    },
    orderBy: { rating: 'desc' },
    take: 12
  })

  const firstName = session.user.name?.split(' ')[0] || 'você'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Hero Section com CTA */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B2B8A3] rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C8963E] rounded-full opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Greeting */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">
                {greeting}, {firstName}
              </h1>
              <Sparkles className="w-12 h-12 text-[#B2B8A3] animate-pulse" />
            </div>
            <p className="text-xl text-gray-700 max-w-2xl">
              Bem-vindo à sua jornada de bem-estar. Explore terapeutas, agende sessões e caminhe rumo ao autocuidado.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/explore/therapists"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#B2B8A3] text-white rounded-xl hover:bg-[#9da390] transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Descobrir Terapeutas
            </Link>
            {clientProfile?.favorites && clientProfile.favorites.length > 0 && (
              <Link
                href="/favorites"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#B2B8A3] border-2 border-[#B2B8A3] rounded-xl hover:bg-[#F0EBE3] transition-all duration-300 transform hover:scale-105 font-medium"
              >
                <Heart className="w-5 h-5 mr-2" />
                Meus Favoritos ({clientProfile.favorites.length})
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-serif text-[#C8963E] mb-2">{upcomingBookings.length}</div>
              <div className="text-sm text-gray-600">Sessões Agendadas</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-serif text-[#B2B8A3] mb-2">200+</div>
              <div className="text-sm text-gray-600">Terapeutas Verificados</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-serif text-[#D99A8B] mb-2">4.8 <Star className="w-6 h-6 inline text-[#C8963E]" /></div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximas Sessões */}
      {upcomingBookings.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-serif text-gray-900">Suas Próximas Sessões</h2>
            <Calendar className="w-8 h-8 text-[#B2B8A3]" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#B2B8A3]"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-serif text-gray-900">{booking.service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">com {booking.therapist.user.name}</p>
                    </div>
                    <svg className="w-6 h-6 text-[#B2B8A3]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                    </svg>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(booking.startTime).toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <Link
                    href={`/therapist/${booking.therapist.id}`}
                    className="inline-block w-full text-center px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors text-sm font-medium"
                  >
                    Ver Perfil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Carrossel de Terapeutas Destacados */}
      {featuredTherapists.length > 0 && (
        <TherapistsCarousel therapists={featuredTherapists as any} />
      )}

      {/* Terapeutas Favoritos */}
      {clientProfile?.favorites && clientProfile.favorites.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-serif text-gray-900">Seus Favoritos</h2>
            <Heart className="w-8 h-8 text-[#D99A8B]" />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {clientProfile.favorites.map((fav) => (
              <Link
                key={fav.therapist.id}
                href={`/therapist/${fav.therapist.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {fav.therapist.user.avatar ? (
                    <div className="relative w-full h-40">
                      <Image
                        src={fav.therapist.user.avatar}
                        alt={fav.therapist.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-[#B2B8A3] to-[#9da390] flex items-center justify-center text-white text-4xl font-serif">
                      {fav.therapist.user.name[0]}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-gray-900 group-hover:text-[#B2B8A3]">
                      {fav.therapist.user.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{fav.therapist.specialty}</p>
                    {fav.therapist.services[0] && (
                      <p className="text-xs text-gray-500 mt-2">
                        A partir de R$ {fav.therapist.services[0].price.toFixed(2).replace('.', ',')}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Feature Section - Como Funciona */}
      <section className="bg-white py-16 md:py-24 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 text-center mb-12">Como Funciona o Senda</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Search, title: 'Explore', desc: 'Encontre terapeutas verificados em sua área' },
              { icon: Star, title: 'Escolha', desc: 'Veja avaliações, especialidades e disponibilidade' },
              { icon: Calendar, title: 'Agende', desc: 'Reserve sessões em horários convenientes' },
              { icon: Sparkles, title: 'Transforme', desc: 'Inicie sua jornada de bem-estar' }
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <step.icon className="w-12 h-12 text-[#B2B8A3]" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-[#B2B8A3] to-[#C8963E] rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-serif mb-4">Pronto para Começar Sua Jornada?</h2>
          <p className="text-lg opacity-90 mb-6">Descubra terapeutas incríveis e transforme sua vida</p>
          <Link
            href="/explore/therapists"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#B2B8A3] rounded-lg hover:bg-gray-100 transition-colors font-medium gap-2"
          >
            Explorar Galeria de Terapeutas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

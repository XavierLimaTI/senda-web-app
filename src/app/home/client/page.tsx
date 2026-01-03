import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

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
          therapistProfile: true
        }
      }
    },
    orderBy: { startTime: 'asc' },
    take: 3
  })

  // Buscar trilhas em destaque (simulado - será implementado em Sprint 4)
  // const featuredTrails = await prisma.trail.findMany({ where: { published: true }, take: 3 })

  const firstName = session.user.name?.split(' ')[0] || 'você'
  const greeting = getGreeting()

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Saudação Personalizada */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-3">
            {greeting}, {firstName}
          </h1>
          <p className="text-xl text-gray-600">Como você quer se sentir hoje?</p>
        </div>

        {/* Próximas Sessões */}
        {upcomingBookings.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-gray-900">Suas próximas sessões</h2>
              <Link 
                href="/client/bookings" 
                className="text-[#B2B8A3] hover:underline font-medium"
              >
                Ver todas →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingBookings.map(booking => {
                const date = new Date(booking.startTime)
                const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                
                return (
                  <div 
                    key={booking.id}
                    className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#B2B8A3] hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B2B8A3] to-[#9da390] flex items-center justify-center text-white font-semibold">
                        {booking.therapist.name?.[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {booking.therapist.therapistProfile?.specialty || 'Terapeuta'}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.therapist.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-[#B2B8A3]">{booking.service.name}</p>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{day} às {time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{booking.service.duration} min</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Explorar Terapias */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Descubra novas terapias</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Massoterapia */}
            <Link href="/explore/therapists?specialty=Massoterapia" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-[#D99A8B] to-[#c88a7b] flex items-center justify-center">
                  <span className="text-6xl">💆</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors">
                    Massoterapia
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Relaxe corpo e mente com técnicas de massagem profissional
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2: Acupuntura */}
            <Link href="/explore/therapists?specialty=Acupuntura" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-[#B2B8A3] to-[#9da390] flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors">
                    Acupuntura
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Equilíbrio energético através da medicina tradicional chinesa
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3: Reiki */}
            <Link href="/explore/therapists?specialty=Reiki" className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="h-48 bg-gradient-to-br from-[#C8963E] to-[#b8862e] flex items-center justify-center">
                  <span className="text-6xl">✨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors">
                    Reiki
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Cura energética para harmonizar chakras e bem-estar integral
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/explore/therapists"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                         hover:from-[#9da390] hover:to-[#8a9280] text-white font-serif text-lg font-semibold
                         rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explorar Todos os Terapeutas
            </Link>
          </div>
        </section>

        {/* Trilhas de Cuidado (Preview - Sprint 4) */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-gray-900 mb-3">Trilhas de Cuidado</h2>
          <p className="text-gray-600 mb-6">Jornadas guiadas para seu bem-estar</p>
          
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#B2B8A3] to-[#9da390] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif text-gray-900 mb-3">Em breve: Trilhas Personalizadas</h3>
            <p className="text-gray-600 max-w-lg mx-auto">
              Jornadas guiadas de autocuidado criadas por nossos terapeutas. 
              Combine leitura, áudio e vídeo para transformar sua rotina de bem-estar.
            </p>
          </div>
        </section>

        {/* Blog/Novidades */}
        <section>
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Novidades e Dicas</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#B2B8A3]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    5 Práticas Diárias de Autocuidado
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Pequenos hábitos que transformam sua rotina e promovem equilíbrio emocional...
                  </p>
                  <span className="text-xs text-[#B2B8A3] font-medium">3 min de leitura</span>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D99A8B]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🧘</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Meditação para Iniciantes
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Aprenda técnicas simples para começar a praticar meditação e reduzir o estresse...
                  </p>
                  <span className="text-xs text-[#B2B8A3] font-medium">5 min de leitura</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

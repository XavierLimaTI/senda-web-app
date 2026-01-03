import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export default async function TherapistHome() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'THERAPIST') {
    redirect('/auth/signin')
  }

  const therapistId = parseInt(session.user.id)

  // Buscar sessões de hoje
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const todayBookings = await prisma.booking.findMany({
    where: {
      therapistId,
      startTime: {
        gte: today,
        lt: tomorrow
      },
      status: { in: ['CONFIRMED', 'PENDING'] }
    },
    include: {
      client: true,
      service: true
    },
    orderBy: { startTime: 'asc' }
  })

  // Buscar próximas sessões (próximos 7 dias excluindo hoje)
  const upcomingBookings = await prisma.booking.findMany({
    where: {
      therapistId,
      startTime: {
        gte: tomorrow,
        lt: new Date(tomorrow.getTime() + 7 * 24 * 60 * 60 * 1000)
      },
      status: { in: ['CONFIRMED', 'PENDING'] }
    },
    include: {
      client: true,
      service: true
    },
    orderBy: { startTime: 'asc' },
    take: 5
  })

  // Calcular receita do mês
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const monthBookings = await prisma.booking.findMany({
    where: {
      therapistId,
      startTime: { gte: firstDayOfMonth },
      status: 'CONFIRMED'
    },
    include: { service: true }
  })

  const monthRevenue = monthBookings.reduce((sum, b) => sum + b.service.price, 0)
  const monthSessions = monthBookings.length

  // Buscar total de serviços ativos
  const activeServices = await prisma.service.count({
    where: { therapistId, active: true }
  })

  const firstName = session.user.name?.split(' ')[0] || 'Terapeuta'
  const greeting = getGreeting()

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Dashboard Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-3xl shadow-lg mb-8">
        <Image
          src="/images/senda/home-therapist/dashboard-banner.jpg"
          alt="Dashboard do Terapeuta - Gerencie suas sessões"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>
        <div className="absolute inset-0 flex items-center px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
              {greeting}, {firstName}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {todayBookings.length > 0 
                ? `Você tem ${todayBookings.length} ${todayBookings.length === 1 ? 'sessão' : 'sessões'} hoje`
                : 'Nenhuma sessão agendada para hoje'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Cards de Resumo */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Receita do Mês */}
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#C8963E]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Receita do Mês</h3>
              <div className="w-10 h-10 rounded-full bg-[#C8963E]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#C8963E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-gray-900">
              R$ {monthRevenue.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">{monthSessions} sessões realizadas</p>
          </div>

          {/* Sessões Hoje */}
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#B2B8A3]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Sessões Hoje</h3>
              <div className="w-10 h-10 rounded-full bg-[#B2B8A3]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-gray-900">
              {todayBookings.length}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {todayBookings.length > 0 ? 'Próxima: ' + new Date(todayBookings[0].startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Dia livre'}
            </p>
          </div>

          {/* Serviços Ativos */}
          <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#D99A8B]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Serviços Ativos</h3>
              <div className="w-10 h-10 rounded-full bg-[#D99A8B]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#D99A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-serif font-bold text-gray-900">
              {activeServices}
            </p>
            <Link href="/dashboard/therapist/services" className="text-sm text-[#B2B8A3] hover:underline mt-2 inline-block">
              Gerenciar →
            </Link>
          </div>
        </div>

        {/* Sessões de Hoje */}
        {todayBookings.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Agenda de Hoje</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="space-y-4">
                {todayBookings.map(booking => {
                  const time = new Date(booking.startTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                  
                  return (
                    <div 
                      key={booking.id}
                      className="flex items-center gap-4 p-4 bg-[#F0EBE3] rounded-xl hover:bg-[#B2B8A3]/10 transition-colors"
                    >
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#B2B8A3] to-[#9da390] text-white font-serif text-lg font-bold">
                        {time}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{booking.service.name}</h3>
                        <p className="text-sm text-gray-600">Cliente: {booking.client.name}</p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm text-gray-600">{booking.service.duration} min</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'CONFIRMED' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Próximas Sessões */}
        {upcomingBookings.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-gray-900">Próximas Sessões</h2>
              <Link 
                href="/dashboard/therapist/bookings" 
                className="text-[#B2B8A3] hover:underline font-medium"
              >
                Ver agenda completa →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingBookings.map(booking => {
                const date = new Date(booking.startTime)
                const day = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', weekday: 'short' })
                const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                
                return (
                  <div 
                    key={booking.id}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                  >
                    <div className="text-center min-w-[60px]">
                      <p className="text-xs text-gray-500 uppercase">{day.split(',')[0]}</p>
                      <p className="text-2xl font-serif font-bold text-[#B2B8A3]">{day.split(',')[1]?.trim().split(' ')[0]}</p>
                      <p className="text-sm text-gray-600">{time}</p>
                    </div>
                    
                    <div className="flex-1 border-l-2 border-gray-200 pl-4">
                      <h3 className="font-semibold text-gray-900">{booking.service.name}</h3>
                      <p className="text-sm text-gray-600">{booking.client.name}</p>
                      <p className="text-xs text-gray-500">{booking.service.duration} min</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Ações Rápidas */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Ações Rápidas</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/dashboard/therapist/services"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#D99A8B]/20 flex items-center justify-center mb-4 group-hover:bg-[#D99A8B]/30 transition-colors">
                <svg className="w-6 h-6 text-[#D99A8B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors">
                Gerenciar Serviços
              </h3>
              <p className="text-sm text-gray-600">
                Criar, editar ou desativar seus serviços terapêuticos
              </p>
            </Link>

            <Link 
              href="/dashboard/therapist/availability"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#B2B8A3]/20 flex items-center justify-center mb-4 group-hover:bg-[#B2B8A3]/30 transition-colors">
                <svg className="w-6 h-6 text-[#B2B8A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors">
                Configurar Horários
              </h3>
              <p className="text-sm text-gray-600">
                Defina sua disponibilidade semanal
              </p>
            </Link>

            <Link 
              href="/dashboard/therapist/revenue"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8963E]/20 flex items-center justify-center mb-4 group-hover:bg-[#C8963E]/30 transition-colors">
                <svg className="w-6 h-6 text-[#C8963E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-[#B2B8A3] transition-colors">
                Ver Receitas
              </h3>
              <p className="text-sm text-gray-600">
                Acompanhe seus ganhos e repasses
              </p>
            </Link>
          </div>
        </section>

        {/* Dicas para Terapeutas */}
        <section>
          <h2 className="text-2xl font-serif text-gray-900 mb-6">Dicas para Crescer</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <article className="bg-gradient-to-br from-[#B2B8A3] to-[#9da390] text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Otimize Seu Perfil</h3>
                  <p className="text-sm text-white/90">
                    Adicione fotos profissionais e uma bio que ressoe com seus clientes ideais. 
                    Perfis completos recebem 3x mais agendamentos.
                  </p>
                </div>
              </div>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#B2B8A3]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C8963E]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#C8963E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Crie Trilhas de Cuidado</h3>
                  <p className="text-sm text-gray-600">
                    Em breve você poderá criar jornadas guiadas para seus clientes. 
                    Combine texto, áudio e vídeo para compartilhar seu conhecimento.
                  </p>
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

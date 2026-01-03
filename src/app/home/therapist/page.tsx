import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Calendar, TrendingUp, Users, Clock, ChevronRight } from 'lucide-react'

export default async function TherapistHome() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== 'THERAPIST') {
    redirect('/auth/signin')
  }

  // Fetch therapist profile
  const therapist = await prisma.therapistProfile.findUnique({
    where: { userId: parseInt(session.user.id) },
    include: {
      user: true,
      services: { take: 5, where: { active: true } },
    },
  })

  if (!therapist) {
    redirect('/dashboard')
  }

  // Upcoming bookings
  const upcomingBookings = await prisma.booking.findMany({
    where: {
      therapistId: therapist.id,
      startTime: { gte: new Date() },
      status: { in: ['CONFIRMED', 'PENDING'] },
    },
    include: { client: true, service: true },
    orderBy: { startTime: 'asc' },
    take: 5,
  })

  // Statistics
  const completedBookings = await prisma.booking.count({
    where: {
      therapistId: therapist.id,
      status: 'COMPLETED',
    },
  })

  const firstName = session.user.name?.split(' ')[0] || 'você'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B2B8A3] rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C8963E] rounded-full opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Card */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {therapist.user.avatar ? (
                  <Image
                    src={therapist.user.avatar}
                    alt={therapist.user.name}
                    width={120}
                    height={120}
                    className="w-32 h-32 rounded-xl object-cover shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-[#B2B8A3] to-[#9da390] flex items-center justify-center text-white text-5xl font-serif shadow-md">
                    {therapist.user.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-serif text-gray-900 dark:text-white">
                    {greeting}, {firstName}
                  </h1>
                  {therapist.verified && (
                    <span className="bg-[#C8963E] text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Verificado
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {therapist.specialty}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-2xl font-serif text-[#B2B8A3]">{therapist.rating}</span>
                    <span className="text-sm">★ Avaliação média</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-2xl font-serif text-[#D99A8B]">{completedBookings}</span>
                    <span className="text-sm">Sessões completas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Link
              href="/dashboard/therapist/bookings"
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#B2B8A3] dark:border-[#C8963E] hover:translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Calendar className="w-6 h-6 text-[#B2B8A3] mb-2" />
                  <h3 className="font-serif text-lg text-gray-900 dark:text-white">Meus Agendamentos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {upcomingBookings.length} próximas sessões
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#B2B8A3] transition-colors" />
              </div>
            </Link>

            <Link
              href="/dashboard/therapist/services"
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#D99A8B] dark:border-[#D99A8B] hover:translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Users className="w-6 h-6 text-[#D99A8B] mb-2" />
                  <h3 className="font-serif text-lg text-gray-900 dark:text-white">Meus Serviços</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {therapist.services.length} serviços ativos
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#D99A8B] transition-colors" />
              </div>
            </Link>

            <Link
              href="/dashboard/therapist/revenue"
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#C8963E] dark:border-[#B2B8A3] hover:translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <TrendingUp className="w-6 h-6 text-[#C8963E] mb-2" />
                  <h3 className="font-serif text-lg text-gray-900 dark:text-white">Receita</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Ver ganhos e repasses
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#C8963E] transition-colors" />
              </div>
            </Link>
          </div>

          {/* Upcoming Bookings */}
          {upcomingBookings.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#B2B8A3]" />
                <h2 className="text-2xl font-serif text-gray-900 dark:text-white">
                  Próximas Sessões
                </h2>
              </div>

              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-gray-900 dark:text-white">
                          {booking.service.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          com {booking.client.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          {new Date(booking.startTime).toLocaleDateString('pt-BR', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          } as Intl.DateTimeFormatOptions)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {booking.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Services */}
          {therapist.services.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6">
                Meus Serviços
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {therapist.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="font-serif text-lg text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {service.description}
                      </p>
                    )}
                    <div className="flex items-baseline justify-between mt-4">
                      <span className="text-2xl font-serif text-[#B2B8A3]">
                        R$ {(service.price / 100).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {service.duration}h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import TherapistBookingsClient from './TherapistBookingsClient'
import { Calendar, Users, CheckCircle, TrendingUp } from 'lucide-react'

export default async function TherapistBookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'THERAPIST') {
    redirect('/dashboard')
  }

  // Buscar perfil do terapeuta
  const therapist = await prisma.therapistProfile.findUnique({
    where: { userId: parseInt(session.user.id) },
    include: {
      user: {
        select: { name: true, avatar: true }
      }
    }
  })

  if (!therapist) {
    redirect('/dashboard')
  }

  // Buscar agendamentos
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [allBookings, upcomingBookings] = await Promise.all([
    prisma.booking.findMany({
      where: {
        therapistId: therapist.id
      },
      include: {
        service: true,
        client: true,
        review: true,
        payment: true
      },
      orderBy: { startTime: 'desc' }
    }),
    prisma.booking.findMany({
      where: {
        therapistId: therapist.id,
        startTime: { gte: today },
        status: { in: ['CONFIRMED', 'PENDING'] }
      },
      include: {
        service: true,
        client: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { startTime: 'asc' },
      take: 5
    })
  ])

  // Calcular estatísticas
  const stats = {
    total: allBookings.length,
    confirmed: allBookings.filter(b => b.status === 'CONFIRMED').length,
    completed: allBookings.filter(b => b.status === 'COMPLETED').length,
    upcoming: upcomingBookings.length,
    revenue: allBookings
      .filter(b => b.status === 'COMPLETED' && b.payment?.status === 'APPROVED')
      .reduce((sum, b) => sum + (b.payment?.professionalAmount || 0), 0)
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            {therapist.user.avatar && (
              <img
                src={therapist.user.avatar}
                alt={therapist.user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-serif text-gray-900">
                {therapist.user.name}
              </h1>
              <p className="text-gray-600">Gerencie seus agendamentos</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F0EBE3] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Total</p>
                  <p className="text-2xl font-serif text-[#B2B8A3] font-bold">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#B2B8A3] opacity-50" />
              </div>
            </div>

            <div className="bg-[#F0EBE3] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Próximos</p>
                  <p className="text-2xl font-serif text-[#B2B8A3] font-bold">{stats.upcoming}</p>
                </div>
                <Users className="w-8 h-8 text-[#B2B8A3] opacity-50" />
              </div>
            </div>

            <div className="bg-[#F0EBE3] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Completos</p>
                  <p className="text-2xl font-serif text-[#B2B8A3] font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-[#B2B8A3] opacity-50" />
              </div>
            </div>

            <div className="bg-[#F0EBE3] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">Receita</p>
                  <p className="text-2xl font-serif text-[#C8963E] font-bold">
                    R$ {stats.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#C8963E] opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {allBookings.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Nenhum agendamento ainda</h2>
            <p className="text-gray-600">Seus agendamentos aparecerão aqui assim que os clientes marcarem sessões</p>
          </div>
        ) : (
          <TherapistBookingsClient bookings={allBookings as any} />
        )}
      </div>
    </div>
  )
}

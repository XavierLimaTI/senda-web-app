import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import TherapistBookingsClient from './TherapistBookingsClient'

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
    where: { userId: parseInt(session.user.id) }
  })

  if (!therapist) {
    redirect('/dashboard')
  }

  // Buscar agendamentos do terapeuta
  const bookings = await prisma.booking.findMany({
    where: {
      therapistId: therapist.id
    },
    include: {
      service: true,
      client: true,
      review: true
    },
    orderBy: { startTime: 'desc' }
  })

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Meus Agendamentos</h1>
          <p className="text-gray-600">Gerencie todas as suas sessões agendadas</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Nenhum agendamento ainda</h2>
            <p className="text-gray-600">Seus agendamentos aparecerão aqui assim que os clientes marcarem sessões</p>
          </div>
        ) : (
          <TherapistBookingsClient bookings={bookings as any} />
        )}
      </div>
    </div>
  )
}

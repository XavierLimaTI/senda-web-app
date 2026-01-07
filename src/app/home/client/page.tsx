import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ClientHomeContent from './ClientHomeContent'

export default async function ClientHome() {
  const session = await auth()
  
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

  // Serialize dates for client component
  const serializedBookings = upcomingBookings.map(b => ({
    id: b.id,
    startTime: b.startTime,
    service: { name: b.service.name },
    therapist: { id: b.therapist.id, user: { name: b.therapist.user.name } }
  }))

  const serializedFavorites = clientProfile?.favorites?.map(f => ({
    therapist: {
      id: f.therapist.id,
      user: { name: f.therapist.user.name, avatar: f.therapist.user.avatar },
      specialty: f.therapist.specialty,
      services: f.therapist.services.map(s => ({ price: s.price }))
    }
  })) || []

  const serializedTherapists = featuredTherapists.map(t => ({
    id: t.id,
    userId: t.userId,
    user: { name: t.user.name, avatar: t.user.avatar },
    specialty: t.specialty || '',
    rating: t.rating,
    verified: t.verified,
    services: t.services.map(s => ({ price: s.price }))
  }))

  return (
    <ClientHomeContent
      firstName={firstName}
      upcomingBookings={serializedBookings}
      favorites={serializedFavorites}
      featuredTherapists={serializedTherapists}
    />
  )
}


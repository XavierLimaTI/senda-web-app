import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import FavoritesClient from './FavoritesClient'

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'CLIENT') {
    redirect('/dashboard')
  }

  // Buscar perfil do cliente
  const clientProfile = await prisma.clientProfile.findUnique({
    where: { userId: parseInt(session.user.id) },
  })

  if (!clientProfile) {
    redirect('/dashboard')
  }

  // Buscar favoritos
  const favorites = await prisma.therapistFavorite.findMany({
    where: { clientId: clientProfile.id },
    include: {
      therapist: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          services: {
            where: { active: true },
            take: 3,
            select: {
              id: true,
              name: true,
              price: true,
              duration: true,
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return <FavoritesClient favorites={favorites} />
}

import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import PendingTherapistsClient from './PendingTherapistsClient'

export default async function PendingTherapistsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  // Buscar terapeutas pendentes com informações do usuário
  const pendingTherapists = await prisma.therapistProfile.findMany({
    where: {
      verified: false
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          avatar: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <PendingTherapistsClient therapists={pendingTherapists} />
}


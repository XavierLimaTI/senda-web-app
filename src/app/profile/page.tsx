import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

import ProfileClient from './ProfileClient'
import { prisma } from '@/lib/prisma'

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  // Buscar dados do usuário com perfil específico
  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    include: {
      clientProfile: session.user.role === 'CLIENT',
      therapistProfile: session.user.role === 'THERAPIST',
      spaceProfile: session.user.role === 'SPACE',
    },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return <ProfileClient user={user} />
}


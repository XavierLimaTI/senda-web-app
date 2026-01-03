import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminUsersClient from './AdminUsersClient'

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)

  // Verificar se é admin
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  // Buscar usuários com suas informações de perfil
  const users = await prisma.user.findMany({
    include: {
      clientProfile: true,
      therapistProfile: true,
      spaceProfile: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  // Formatar dados para o cliente
  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    hasClientProfile: !!user.clientProfile,
    hasTherapistProfile: !!user.therapistProfile,
    hasSpaceProfile: !!user.spaceProfile,
    isVerified:
      user.role === 'CLIENT'
        ? !!user.clientProfile
        : user.role === 'THERAPIST'
          ? user.therapistProfile?.verified || false
          : user.role === 'SPACE'
            ? user.spaceProfile?.verified || false
            : false,
  }))

  return <AdminUsersClient users={formattedUsers} />
}

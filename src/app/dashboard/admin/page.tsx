import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboard() {
  const session = await auth()

  // Verificar se é admin
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  // Buscar métricas gerais
  const [
    totalUsers,
    totalTherapists,
    totalClients,
    totalSpaces,
    pendingTherapists,
    totalBookings,
    totalRevenue,
    recentUsers
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: 'THERAPIST' } }),
    prisma.user.count({ where: { role: 'CLIENT' } }),
    prisma.user.count({ where: { role: 'SPACE' } }),
    prisma.therapistProfile.count({ where: { verified: false } }),
    prisma.booking.count(),
    prisma.payment.aggregate({
      _sum: { amount: true }
    }),
    prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        emailVerified: true
      }
    })
  ])

  const metrics = {
    totalUsers,
    totalTherapists,
    totalClients,
    totalSpaces,
    pendingTherapists,
    totalBookings,
    totalRevenue: totalRevenue._sum.amount || 0,
    recentUsers
  }

  return <AdminDashboardClient metrics={metrics} />
}


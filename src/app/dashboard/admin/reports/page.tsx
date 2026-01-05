'use server'


import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import ReportsClient from './ReportsClient'

export default async function ReportsPage() {
  const session = await auth()

  // Auth check - admin only
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  // Get booking data for last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  // Bookings by date (agrupado)
  const bookingsByDateRaw = await prisma.booking.groupBy({
    by: ['createdAt'],
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    _count: true,
    orderBy: { createdAt: 'asc' },
  })

  // Users by role
  const usersByRole = await prisma.user.groupBy({
    by: ['role'],
    _count: true,
  })

  // Top therapists by bookings
  const topTherapists = await prisma.booking.groupBy({
    by: ['therapistId'],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: 5,
  })

  // Get therapist names
  const therapistIds = topTherapists.map((t) => t.therapistId).filter(Boolean) as number[]
  const therapists = await prisma.therapistProfile.findMany({
    where: { id: { in: therapistIds } },
    include: { user: { select: { name: true } } },
  })

  // Total stats
  const totalUsers = await prisma.user.count()
  const totalBookings = await prisma.booking.count()
  const totalClients = await prisma.user.count({ where: { role: 'CLIENT' } })
  const totalTherapists = await prisma.user.count({ where: { role: 'THERAPIST' } })

  // Monthly revenue (if Payment model exists)
  let monthlyRevenue = 0
  try {
    const payments = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })
    monthlyRevenue = (payments._sum?.amount || 0) * 100 // Converter para centavos
  } catch (error) {
    // Payment model might not exist yet
    console.log('Payment model not found, skipping revenue calculation')
  }

  // Parse bookings data with date as string key
  const bookingsByDate = bookingsByDateRaw.map((b) => ({
    date: new Date(b.createdAt).toLocaleDateString('pt-BR'),
    count: b._count,
  }))

  return (
    <ReportsClient
      bookingsByDate={bookingsByDate}
      usersByRole={usersByRole}
      topTherapists={topTherapists.map((t) => {
        const therapist = therapists.find((th) => th.id === t.therapistId)
        return {
          name: therapist?.user?.name || 'Desconhecido',
          bookings: t._count.id,
        }
      })}
      stats={{
        totalUsers,
        totalBookings,
        totalClients,
        totalTherapists,
        monthlyRevenue,
      }}
    />
  )
}


import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminBookingsClient from './AdminBookingsClient'

export default async function AdminBookingsPage() {
  const session = await auth()

  // Verificar se é admin
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  // Buscar agendamentos com informações completas
  const bookings = await prisma.booking.findMany({
    include: {
      client: true,
      service: {
        include: {
          therapist: {
            include: {
              user: true,
            },
          },
        },
      },
      payment: true,
    },
    orderBy: { startTime: 'desc' },
    take: 100,
  })

  // Buscar estatísticas
  const stats = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.count({ where: { status: 'CANCELLED' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'COMPLETED' },
    }),
  ])

  const totalRevenue = stats[4]._sum.amount || 0

  return (
    <AdminBookingsClient
      bookings={bookings.map((b) => ({
        id: b.id,
        clientName: b.client.name,
        clientEmail: b.client.email,
        therapistName: b.service.therapist.user.name,
        serviceName: b.service.name,
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
        amount: b.payment?.amount || 0,
        paymentStatus: b.payment?.status || 'PENDING',
      }))}
      stats={{
        totalBookings: stats[0],
        confirmedBookings: stats[1],
        cancelledBookings: stats[2],
        completedBookings: stats[3],
        totalRevenue,
      }}
    />
  )
}


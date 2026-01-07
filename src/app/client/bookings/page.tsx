import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import ClientBookingsClient from './ClientBookingsClient'
import ClientBookingsWrapper from './ClientBookingsWrapper'

export default async function ClientBookingsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'CLIENT') {
    redirect('/dashboard')
  }

  // Buscar agendamentos do cliente
  const bookings = await prisma.booking.findMany({
    where: {
      clientId: parseInt(session.user.id)
    },
    include: {
      service: true,
      therapist: { include: { user: { select: { name: true, avatar: true } } } },
      review: true
    },
    orderBy: { startTime: 'desc' }
  })

  return <ClientBookingsWrapper bookings={bookings} />


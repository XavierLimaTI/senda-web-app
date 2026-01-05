'use server'


import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import PaymentsClient from './PaymentsClient'

export default async function PaymentsPage() {
  const session = await auth()

  // Auth check - admin only
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  // Get all payments - using raw query to handle complex relations
  const paymentsData = await prisma.$queryRaw`
    SELECT 
      p.id,
      p.amount,
      p.status,
      p.createdAt,
      p.refundedAt,
      p.stripePaymentIntentId,
      p.transactionId,
      p.description,
      p.bookingId,
      b.therapistId,
      b.clientId,
      tp.userId as therapistUserId,
      u1.name as therapistName,
      u2.name as clientName
    FROM Payment p
    JOIN Booking b ON p.bookingId = b.id
    JOIN TherapistProfile tp ON b.therapistId = tp.id
    JOIN User u1 ON tp.userId = u1.id
    JOIN User u2 ON b.clientId = u2.id
    ORDER BY p.createdAt DESC
  ` as any[]

  const payments = paymentsData.map((p) => ({
    id: p.id,
    amount: p.amount,
    status: p.status,
    createdAt: new Date(p.createdAt),
    refundedAt: p.refundedAt ? new Date(p.refundedAt) : null,
    stripePaymentIntentId: p.stripePaymentIntentId,
    transactionId: p.transactionId,
    description: p.description,
    bookingId: p.bookingId,
    therapistName: p.therapistName || 'Desconhecido',
    clientName: p.clientName || 'Desconhecido',
  }))

  // Calculate stats
  const stats = {
    totalTransactions: payments.length,
    totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0) * 100, // Converter para centavos
    pendingAmount: payments
      .filter((p) => p.status === 'PENDING')
      .reduce((sum, p) => sum + p.amount, 0) * 100,
    refundedAmount: payments
      .filter((p) => p.status === 'REFUNDED')
      .reduce((sum, p) => sum + p.amount, 0) * 100,
    statusCounts: {
      completed: payments.filter((p) => p.status === 'APPROVED').length,
      pending: payments.filter((p) => p.status === 'PENDING').length,
      failed: payments.filter((p) => p.status === 'FAILED').length,
      refunded: payments.filter((p) => p.status === 'REFUNDED').length,
    },
  }

  return (
    <PaymentsClient
      payments={payments.map((p) => ({
        id: p.id,
        amount: p.amount * 100, // Converter para centavos
        status: (p.status === 'APPROVED' ? 'completed' : p.status === 'PENDING' ? 'pending' : p.status === 'FAILED' ? 'failed' : 'refunded') as any,
        therapist: p.therapistName,
        client: p.clientName,
        transactionId: p.stripePaymentIntentId || p.transactionId || p.id.toString(),
        createdAt: p.createdAt,
        refundedAt: p.refundedAt,
        description: p.description || `Agendamento #${p.bookingId}`,
      }))}
      stats={stats}
    />
  )
}


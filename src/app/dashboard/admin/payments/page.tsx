'use server'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import PaymentsClient from './PaymentsClient'

export default async function PaymentsPage() {
  const session = await auth()

  // Auth check - admin only
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  // Get all payments using Prisma relations (sem raw SQL)
  const paymentsData = await prisma.payment.findMany({
    include: {
      booking: {
        include: {
          therapist: {
            include: {
              user: {
                select: { name: true }
              }
            }
          },
          client: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 500 // Limitar para performance
  })

  const payments = paymentsData.map((p) => ({
    id: p.id,
    amount: p.amount, // Já em reais (float)
    status: p.status,
    createdAt: p.createdAt,
    refundedAt: p.refundedAt,
    stripePaymentIntentId: p.stripePaymentIntentId,
    transactionId: p.transactionId,
    description: p.description,
    bookingId: p.bookingId,
    therapistName: p.booking?.therapist?.user?.name || 'Desconhecido',
    clientName: p.booking?.client?.name || 'Desconhecido',
  }))

  // Calculate stats - valores em reais (não centavos)
  const stats = {
    totalTransactions: payments.length,
    totalRevenue: payments.reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments
      .filter((p) => p.status === 'PENDING')
      .reduce((sum, p) => sum + p.amount, 0),
    refundedAmount: payments
      .filter((p) => p.status === 'REFUNDED')
      .reduce((sum, p) => sum + p.amount, 0),
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
        amount: p.amount, // Já em reais
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


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/bookings/expire
// Cancela bookings PENDING criados há mais de 10 minutos e marca pagamentos como FAILED
export async function POST(req: Request) {
  const bearer = req.headers.get('authorization') || ''
  const token = bearer.replace(/^Bearer\s+/i, '')
  const expected = process.env.CLEANUP_BEARER_TOKEN

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = Date.now()
  const cutoff = new Date(now - 10 * 60 * 1000) // 10 minutos

  try {
    const pending = await prisma.booking.findMany({
      where: {
        status: 'PENDING',
        createdAt: { lt: cutoff },
      },
      select: { id: true }
    })

    if (pending.length === 0) {
      return NextResponse.json({ expired: 0, paymentMarkedFailed: 0 })
    }

    const ids = pending.map((b) => b.id)

    const [bookingResult, paymentResult] = await prisma.$transaction([
      prisma.booking.updateMany({
        where: { id: { in: ids }, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      }),
      prisma.payment.updateMany({
        where: { bookingId: { in: ids }, status: 'PENDING' },
        data: { status: 'FAILED' },
      }),
    ])

    return NextResponse.json({
      expired: bookingResult.count,
      paymentMarkedFailed: paymentResult.count,
      cutoff: cutoff.toISOString(),
    })
  } catch (error) {
    console.error('Erro ao expirar bookings:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

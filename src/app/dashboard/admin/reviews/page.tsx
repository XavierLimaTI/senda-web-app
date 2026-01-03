'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ReviewsClient from './ReviewsClient'

export default async function ReviewsPage() {
  const session = await getServerSession(authOptions)

  // Auth check - admin only
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  // Get all reviews with related data - raw SQL would be simpler but using Prisma relations
  // We need to fetch therapist.user to get the name, so include the entire user object via relation chain
  const reviewsData = await prisma.$queryRaw`
    SELECT 
      r.id,
      r.rating,
      r.comment,
      r.flagged,
      r.createdAt,
      r.bookingId,
      b.therapistId,
      b.clientId,
      tp.userId as therapistUserId,
      u1.name as therapistName,
      u2.name as clientName
    FROM Review r
    JOIN Booking b ON r.bookingId = b.id
    JOIN TherapistProfile tp ON b.therapistId = tp.id
    JOIN User u1 ON tp.userId = u1.id
    JOIN User u2 ON b.clientId = u2.id
    ORDER BY r.createdAt DESC
  ` as any[]

  // Transform the raw data
  const reviews = reviewsData.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment || '',
    flagged: r.flagged,
    createdAt: new Date(r.createdAt),
    therapistName: r.therapistName || 'Desconhecido',
    clientName: r.clientName || 'Desconhecido',
  }))

  // Calculate stats
  const stats = {
    totalReviews: await prisma.review.count(),
    avgRating:
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0,
    reviewsPerRating: {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    },
  }

  return (
    <ReviewsClient
      reviews={reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        therapist: r.therapistName,
        client: r.clientName,
        createdAt: r.createdAt,
        status: (r.flagged ? 'flagged' : 'approved') as 'flagged' | 'approved',
      }))}
      stats={stats}
    />
  )
}

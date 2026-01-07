'use server'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import ReviewsClient from './ReviewsClient'

export default async function ReviewsPage() {
  const session = await auth()

  // Auth check - admin only
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/')
  }

  // Get all reviews using Prisma relations (sem raw SQL)
  const reviewsData = await prisma.review.findMany({
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
    take: 500
  })

  // Transform the data
  const reviews = reviewsData.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment || '',
    flagged: r.flagged,
    createdAt: r.createdAt,
    therapistName: r.booking?.therapist?.user?.name || 'Desconhecido',
    clientName: r.booking?.client?.name || 'Desconhecido',
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


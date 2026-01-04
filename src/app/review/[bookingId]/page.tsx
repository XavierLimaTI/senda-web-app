import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import ReviewFormClient from '../ReviewFormClient'

export const dynamic = 'force-dynamic'

interface ReviewPageProps {
  params: {
    bookingId: string
  }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'CLIENT') {
    redirect('/dashboard')
  }

  const bookingId = parseInt(params.bookingId)

  // Verify booking exists and belongs to user
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      therapist: { include: { user: true } },
      service: true
    }
  })

  if (!booking) {
    redirect('/dashboard')
  }

  if (booking.clientId !== parseInt(session.user.id as string)) {
    redirect('/dashboard')
  }

  // Only allow review if booking is completed or 24h after end time
  const now = new Date()
  if (booking.status !== 'COMPLETED' && booking.endTime > now) {
    redirect(`/booking/${bookingId}`)
  }

  // Check if review already exists
  const existingReview = await prisma.review.findUnique({
    where: { bookingId }
  })

  if (existingReview) {
    redirect(`/booking/${bookingId}`)
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">
            Como foi sua experiência?
          </h1>
          <p className="text-gray-600">
            Sua opinião nos ajuda a melhorar e ajuda outros clientes a encontrar excelentes profissionais
          </p>
        </div>

        <ReviewFormClient
          bookingId={bookingId}
          therapistName={booking.therapist.user.name || 'Terapeuta'}
          therapistId={booking.therapist.id}
          serviceName={booking.service.name}
        />
      </div>
    </div>
  )
}

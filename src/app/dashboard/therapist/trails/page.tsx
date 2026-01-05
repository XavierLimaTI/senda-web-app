import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { TherapistTrailsClient } from './TherapistTrailsClient'

export const metadata: Metadata = {
  title: 'Minhas Trilhas de Cuidado | Senda',
  description: 'Crie e gerencie suas trilhas de cuidado',
}

export default async function TherapistTrailsPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { therapistProfile: true },
  })

  if (!user?.therapistProfile) {
    redirect('/auth/signin')
  }

  // Fetch therapist's trails
  const trails = await prisma.trail.findMany({
    where: { authorId: user.therapistProfile.id },
    include: {
      lessons: { select: { id: true } },
      _count: { select: { progress: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen bg-[#F0EBE3] py-8">
      <div className="container mx-auto px-4">
        <TherapistTrailsClient
          initialTrails={trails}
          therapistId={user.therapistProfile.id}
        />
      </div>
    </main>
  )
}


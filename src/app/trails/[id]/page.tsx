import { getServerSession } from 'next-auth/next'
import { notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { TrailPlayerClient } from './TrailPlayerClient'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const trail = await prisma.trail.findUnique({
    where: { id: parseInt(params.id) },
  })

  return {
    title: trail ? `${trail.title} | Senda` : 'Trilha não encontrada | Senda',
    description: trail?.description || 'Trilha de cuidado',
  }
}

export default async function TrailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  const trailId = parseInt(params.id)

  const trail = await prisma.trail.findUnique({
    where: { id: trailId },
    include: {
      author: {
        select: {
          id: true,
          user: { select: { name: true, avatar: true } },
          specialty: true,
        },
      },
      lessons: {
        select: {
          id: true,
          title: true,
          content: true,
          contentType: true,
          mediaUrl: true,
          order: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!trail) {
    notFound()
  }

  // Check authorization
  if (
    !trail.published &&
    (!session?.user?.email ||
      trail.author?.id !==
        (
          await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { therapistProfile: true },
          })
        )?.therapistProfile?.id)
  ) {
    notFound()
  }

  // Get client progress if logged in
  let clientProgress = null
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clientProfile: true },
    })

    if (user?.clientProfile) {
      clientProgress = await prisma.trailProgress.findFirst({
        where: {
          clientId: user.clientProfile.id,
          trailId: trailId,
        },
      })
    }
  }

  return (
    <main className="min-h-screen bg-[#F0EBE3] py-8">
      <div className="container mx-auto px-4">
        <TrailPlayerClient
          trail={trail}
          clientProgress={clientProgress}
          isLoggedIn={!!session?.user?.email}
        />
      </div>
    </main>
  )
}

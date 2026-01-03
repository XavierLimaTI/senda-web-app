import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const review = await prisma.review.update({
      where: { id: parseInt(params.id) },
      data: { flagged: false },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error approving review:', error)
    return NextResponse.json(
      { error: 'Erro ao aprovar review' },
      { status: 500 }
    )
  }
}

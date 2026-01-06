import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

export async function POST(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const review = await prisma.review.update({
      where: { id: parseInt(params.id) },
      data: { flagged: true },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error flagging review:', error)
    return NextResponse.json(
      { error: 'Erro ao marcar review' },
      { status: 500 }
    )
  }
}

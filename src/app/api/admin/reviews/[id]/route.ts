import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: { id: string }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const session = await auth()

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const review = await prisma.review.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Review deleted', review })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar review' },
      { status: 500 }
    )
  }
}

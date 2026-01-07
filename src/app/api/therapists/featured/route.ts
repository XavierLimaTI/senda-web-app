import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Buscar terapeutas verificados com bom rating
    const therapists = await prisma.therapistProfile.findMany({
      where: {
        verified: true,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: 6,
    })

    // Se não houver terapeutas verificados, retornar array vazio
    if (!therapists || therapists.length === 0) {
      return NextResponse.json({ therapists: [] })
    }

    // Randomizar a ordem para cada visita
    const shuffled = therapists.sort(() => Math.random() - 0.5)

    return NextResponse.json({ therapists: shuffled })
  } catch (error) {
    console.error('Error fetching featured therapists:', error)
    return NextResponse.json({ therapists: [] })
  }
}

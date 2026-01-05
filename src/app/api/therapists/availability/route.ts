import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * GET /api/therapists/availability
 * Get current user's availability
 */
export async function GET(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json({ error: 'Apenas terapeutas' }, { status: 403 })
    }

    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id as string) },
      select: { id: true }
    })

    if (!therapistProfile) {
      return NextResponse.json({ error: 'Perfil de terapeuta não encontrado' }, { status: 404 })
    }

    const availability = await prisma.availability.findMany({
      where: { therapistId: therapistProfile.id },
      orderBy: { dayOfWeek: 'asc' }
    })

    return NextResponse.json(availability)
  } catch (error) {
    console.error('[GET /api/therapists/availability]', error)
    return NextResponse.json({ error: 'Erro ao buscar disponibilidade' }, { status: 500 })
  }
}

/**
 * POST /api/therapists/availability
 * Add new availability slot
 */
export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json({ error: 'Apenas terapeutas' }, { status: 403 })
    }

    const body = await req.json()
    const { dayOfWeek, startTime, endTime } = body

    // Validate inputs
    if (dayOfWeek === undefined || !startTime || !endTime) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    if (dayOfWeek < 0 || dayOfWeek > 6) {
      return NextResponse.json({ error: 'Dia da semana inválido' }, { status: 400 })
    }

    if (startTime >= endTime) {
      return NextResponse.json({ error: 'Horário de início deve ser antes do término' }, { status: 400 })
    }

    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id as string) },
      select: { id: true }
    })

    if (!therapistProfile) {
      return NextResponse.json({ error: 'Perfil de terapeuta não encontrado' }, { status: 404 })
    }

    // Check if already has availability for this day
    const existing = await prisma.availability.findFirst({
      where: {
        therapistId: therapistProfile.id,
        dayOfWeek
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: `Você já tem um horário configurado para este dia` },
        { status: 400 }
      )
    }

    const availability = await prisma.availability.create({
      data: {
        therapistId: therapistProfile.id,
        dayOfWeek,
        startTime,
        endTime
      }
    })

    return NextResponse.json(availability, { status: 201 })
  } catch (error) {
    console.error('[POST /api/therapists/availability]', error)
    return NextResponse.json({ error: 'Erro ao criar disponibilidade' }, { status: 500 })
  }
}


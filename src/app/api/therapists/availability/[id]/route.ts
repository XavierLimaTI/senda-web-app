import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: {
    id: string
  }
}

/**
 * PUT /api/therapists/availability/[id]
 * Update availability slot
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json({ error: 'Apenas terapeutas' }, { status: 403 })
    }

    const availabilityId = parseInt(params.id)
    const body = await req.json()
    const { startTime, endTime } = body

    // Get therapist profile
    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id as string) }
    })

    if (!therapistProfile) {
      return NextResponse.json({ error: 'Perfil de terapeuta não encontrado' }, { status: 404 })
    }

    // Verify availability belongs to this therapist
    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId }
    })

    if (!availability || availability.therapistId !== therapistProfile.id) {
      return NextResponse.json({ error: 'Disponibilidade não encontrada' }, { status: 404 })
    }

    // Validate times
    if (startTime >= endTime) {
      return NextResponse.json({ error: 'Horário de início deve ser antes do término' }, { status: 400 })
    }

    const updated = await prisma.availability.update({
      where: { id: availabilityId },
      data: { startTime, endTime }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[PUT /api/therapists/availability/[id]]', error)
    return NextResponse.json({ error: 'Erro ao atualizar disponibilidade' }, { status: 500 })
  }
}

/**
 * DELETE /api/therapists/availability/[id]
 * Remove availability slot
 */
export async function DELETE(req: Request, { params }: Params) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json({ error: 'Apenas terapeutas' }, { status: 403 })
    }

    const availabilityId = parseInt(params.id)

    // Get therapist profile
    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id as string) }
    })

    if (!therapistProfile) {
      return NextResponse.json({ error: 'Perfil de terapeuta não encontrado' }, { status: 404 })
    }

    // Verify availability belongs to this therapist
    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId }
    })

    if (!availability || availability.therapistId !== therapistProfile.id) {
      return NextResponse.json({ error: 'Disponibilidade não encontrada' }, { status: 404 })
    }

    await prisma.availability.delete({
      where: { id: availabilityId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE /api/therapists/availability/[id]]', error)
    return NextResponse.json({ error: 'Erro ao remover disponibilidade' }, { status: 500 })
  }
}

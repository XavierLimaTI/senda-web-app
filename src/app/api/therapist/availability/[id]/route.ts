import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * PUT /api/therapist/availability/[id]
 * 
 * Atualiza janela de disponibilidade existente
 * 
 * Body:
 * {
 *   dayOfWeek?: 0-6 (opcional)
 *   startTime?: "HH:MM" (opcional)
 *   endTime?: "HH:MM" (opcional)
 * }
 * 
 * Response: { availability: Availability }
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }
    
    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json(
        { error: 'Apenas terapeutas podem acessar esta rota' },
        { status: 403 }
      )
    }
    
    // Buscar perfil do terapeuta
    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
      select: { id: true }
    })
    
    if (!therapistProfile) {
      return NextResponse.json(
        { error: 'Perfil de terapeuta não encontrado' },
        { status: 404 }
      )
    }
    
    const availabilityId = parseInt(params.id)
    
    // Verificar se availability existe e pertence ao terapeuta
    const existing = await prisma.availability.findUnique({
      where: { id: availabilityId }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Disponibilidade não encontrada' },
        { status: 404 }
      )
    }
    
    if (existing.therapistId !== therapistProfile.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar esta disponibilidade' },
        { status: 403 }
      )
    }
    
    const body = await req.json()
    const { dayOfWeek, startTime, endTime } = body
    
    // Preparar dados de atualização
    const updateData: any = {}
    
    if (dayOfWeek !== undefined) {
      if (typeof dayOfWeek !== 'number' || dayOfWeek < 0 || dayOfWeek > 6) {
        return NextResponse.json(
          { error: 'dayOfWeek deve ser um número entre 0 (Domingo) e 6 (Sábado)' },
          { status: 400 }
        )
      }
      updateData.dayOfWeek = dayOfWeek
    }
    
    if (startTime !== undefined) {
      if (typeof startTime !== 'string' || !/^\d{2}:\d{2}$/.test(startTime)) {
        return NextResponse.json(
          { error: 'startTime deve estar no formato HH:MM (ex: 09:00)' },
          { status: 400 }
        )
      }
      updateData.startTime = startTime
    }
    
    if (endTime !== undefined) {
      if (typeof endTime !== 'string' || !/^\d{2}:\d{2}$/.test(endTime)) {
        return NextResponse.json(
          { error: 'endTime deve estar no formato HH:MM (ex: 18:00)' },
          { status: 400 }
        )
      }
      updateData.endTime = endTime
    }
    
    // Valores finais (mesclar com valores existentes)
    const finalDayOfWeek = updateData.dayOfWeek ?? existing.dayOfWeek
    const finalStartTime = updateData.startTime ?? existing.startTime
    const finalEndTime = updateData.endTime ?? existing.endTime
    
    // Validar que startTime < endTime
    const [startHour, startMin] = finalStartTime.split(':').map(Number)
    const [endHour, endMin] = finalEndTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    if (startMinutes >= endMinutes) {
      return NextResponse.json(
        { error: 'Horário de início deve ser anterior ao horário de término' },
        { status: 400 }
      )
    }
    
    // Validar sobreposição com outras availability (excluindo a atual)
    const otherAvailability = await prisma.availability.findMany({
      where: {
        therapistId: therapistProfile.id,
        dayOfWeek: finalDayOfWeek,
        id: { not: availabilityId }
      }
    })
    
    for (const other of otherAvailability) {
      const [otherStartHour, otherStartMin] = other.startTime.split(':').map(Number)
      const [otherEndHour, otherEndMin] = other.endTime.split(':').map(Number)
      const otherStartMinutes = otherStartHour * 60 + otherStartMin
      const otherEndMinutes = otherEndHour * 60 + otherEndMin
      
      // Verificar sobreposição
      if (
        (startMinutes >= otherStartMinutes && startMinutes < otherEndMinutes) ||
        (endMinutes > otherStartMinutes && endMinutes <= otherEndMinutes) ||
        (startMinutes <= otherStartMinutes && endMinutes >= otherEndMinutes)
      ) {
        return NextResponse.json(
          { error: `Conflito com horário existente: ${other.startTime} - ${other.endTime}` },
          { status: 409 }
        )
      }
    }
    
    // Atualizar availability
    const availability = await prisma.availability.update({
      where: { id: availabilityId },
      data: updateData
    })
    
    return NextResponse.json({ availability })
    
  } catch (error) {
    console.error('Erro ao atualizar availability:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/therapist/availability/[id]
 * 
 * Remove janela de disponibilidade
 * 
 * Response: { success: true }
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }
    
    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json(
        { error: 'Apenas terapeutas podem acessar esta rota' },
        { status: 403 }
      )
    }
    
    // Buscar perfil do terapeuta
    const therapistProfile = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
      select: { id: true }
    })
    
    if (!therapistProfile) {
      return NextResponse.json(
        { error: 'Perfil de terapeuta não encontrado' },
        { status: 404 }
      )
    }
    
    const availabilityId = parseInt(params.id)
    
    // Verificar se availability existe e pertence ao terapeuta
    const existing = await prisma.availability.findUnique({
      where: { id: availabilityId }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Disponibilidade não encontrada' },
        { status: 404 }
      )
    }
    
    if (existing.therapistId !== therapistProfile.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para remover esta disponibilidade' },
        { status: 403 }
      )
    }
    
    // Deletar availability
    await prisma.availability.delete({
      where: { id: availabilityId }
    })
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Erro ao deletar availability:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

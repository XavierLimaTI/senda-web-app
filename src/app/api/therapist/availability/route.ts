import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * GET /api/therapist/availability
 * 
 * Retorna todas as janelas de disponibilidade do terapeuta autenticado
 * 
 * Response: { availability: Availability[] }
 */
export async function GET() {
  try {
    const session = await auth()
    
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
      select: { id: true, verified: true }
    })
    
    if (!therapistProfile) {
      return NextResponse.json(
        { error: 'Perfil de terapeuta não encontrado' },
        { status: 404 }
      )
    }
    
    // Buscar availability
    const availability = await prisma.availability.findMany({
      where: { therapistId: therapistProfile.id },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    })
    
    return NextResponse.json({ availability })
    
  } catch (error) {
    console.error('Erro ao buscar availability:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/therapist/availability
 * 
 * Cria nova janela de disponibilidade para o terapeuta autenticado
 * 
 * Body:
 * {
 *   dayOfWeek: 0-6 (0=Domingo, 6=Sábado)
 *   startTime: "HH:MM" (ex: "09:00")
 *   endTime: "HH:MM" (ex: "18:00")
 * }
 * 
 * Response: { availability: Availability }
 */
export async function POST(req: Request) {
  try {
    const session = await auth()
    
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
      select: { id: true, verified: true }
    })
    
    if (!therapistProfile) {
      return NextResponse.json(
        { error: 'Perfil de terapeuta não encontrado' },
        { status: 404 }
      )
    }
    
    const body = await req.json()
    const { dayOfWeek, startTime, endTime } = body
    
    // Validações
    if (typeof dayOfWeek !== 'number' || dayOfWeek < 0 || dayOfWeek > 6) {
      return NextResponse.json(
        { error: 'dayOfWeek deve ser um número entre 0 (Domingo) e 6 (Sábado)' },
        { status: 400 }
      )
    }
    
    if (!startTime || typeof startTime !== 'string' || !/^\d{2}:\d{2}$/.test(startTime)) {
      return NextResponse.json(
        { error: 'startTime deve estar no formato HH:MM (ex: 09:00)' },
        { status: 400 }
      )
    }
    
    if (!endTime || typeof endTime !== 'string' || !/^\d{2}:\d{2}$/.test(endTime)) {
      return NextResponse.json(
        { error: 'endTime deve estar no formato HH:MM (ex: 18:00)' },
        { status: 400 }
      )
    }
    
    // Validar que startTime < endTime
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    if (startMinutes >= endMinutes) {
      return NextResponse.json(
        { error: 'Horário de início deve ser anterior ao horário de término' },
        { status: 400 }
      )
    }
    
    // Validar sobreposição com availability existente no mesmo dia
    const existingAvailability = await prisma.availability.findMany({
      where: {
        therapistId: therapistProfile.id,
        dayOfWeek
      }
    })
    
    for (const existing of existingAvailability) {
      const [exStartHour, exStartMin] = existing.startTime.split(':').map(Number)
      const [exEndHour, exEndMin] = existing.endTime.split(':').map(Number)
      const exStartMinutes = exStartHour * 60 + exStartMin
      const exEndMinutes = exEndHour * 60 + exEndMin
      
      // Verificar sobreposição
      if (
        (startMinutes >= exStartMinutes && startMinutes < exEndMinutes) ||
        (endMinutes > exStartMinutes && endMinutes <= exEndMinutes) ||
        (startMinutes <= exStartMinutes && endMinutes >= exEndMinutes)
      ) {
        return NextResponse.json(
          { error: `Conflito com horário existente: ${existing.startTime} - ${existing.endTime}` },
          { status: 409 }
        )
      }
    }
    
    // Criar availability
    const availability = await prisma.availability.create({
      data: {
        therapistId: therapistProfile.id,
        dayOfWeek,
        startTime,
        endTime
      }
    })
    
    return NextResponse.json({ availability }, { status: 201 })
    
  } catch (error) {
    console.error('Erro ao criar availability:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}


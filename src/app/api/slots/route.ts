import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Gera slots de tempo entre start e end com duração específica
function generateTimeSlots(startTime: string, endTime: string, durationMinutes: number): string[] {
  const slots: string[] = []
  
  // Converter "HH:MM" para minutos desde meia-noite
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }
  
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = timeToMinutes(endTime)
  
  for (let current = startMinutes; current + durationMinutes <= endMinutes; current += durationMinutes) {
    slots.push(minutesToTime(current))
  }
  
  return slots
}

// Verifica se um slot conflita com um agendamento existente
function isSlotConflicting(
  slotTime: string,
  slotDate: Date,
  durationMinutes: number,
  booking: { startTime: Date; endTime: Date }
): boolean {
  // Criar Date do slot
  const [hours, minutes] = slotTime.split(':').map(Number)
  const slotStart = new Date(slotDate)
  slotStart.setHours(hours, minutes, 0, 0)
  
  const slotEnd = new Date(slotStart)
  slotEnd.setMinutes(slotEnd.getMinutes() + durationMinutes)
  
  // Verificar sobreposição
  // Slots conflitam se: slot começa antes do booking terminar E slot termina depois do booking começar
  return slotStart < booking.endTime && slotEnd > booking.startTime
}

// GET /api/slots?therapistId=123&date=2026-01-02&serviceId=456
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const therapistIdStr = searchParams.get('therapistId')
    const dateStr = searchParams.get('date')
    const serviceIdStr = searchParams.get('serviceId')
    
    // Validações
    if (!therapistIdStr || !dateStr || !serviceIdStr) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios: therapistId, date, serviceId' },
        { status: 400 }
      )
    }
    
    const therapistId = parseInt(therapistIdStr)
    const serviceId = parseInt(serviceIdStr)
    const date = new Date(dateStr)
    
    if (isNaN(therapistId) || isNaN(serviceId) || isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos' },
        { status: 400 }
      )
    }
    
    // 1. Buscar Service para saber a duração
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })
    
    if (!service || !service.active) {
      return NextResponse.json(
        { error: 'Serviço não encontrado ou inativo' },
        { status: 404 }
      )
    }
    
    // Verificar se o serviço pertence ao terapeuta
    if (service.therapistId !== therapistId) {
      return NextResponse.json(
        { error: 'Serviço não pertence a este terapeuta' },
        { status: 400 }
      )
    }
    
    // 2. Buscar Availability do terapeuta para aquele dia da semana
    const dayOfWeek = date.getDay() // 0 (Domingo) - 6 (Sábado)
    const availability = await prisma.availability.findMany({
      where: {
        therapistId,
        dayOfWeek
      }
    })
    
    if (availability.length === 0) {
      return NextResponse.json({
        slots: [],
        message: 'Terapeuta não disponível neste dia da semana'
      })
    }
    
    // 3. Gerar todos os slots possíveis baseado na disponibilidade
    let allSlots: string[] = []
    
    for (const block of availability) {
      const blockSlots = generateTimeSlots(
        block.startTime,
        block.endTime,
        service.duration
      )
      allSlots = [...allSlots, ...blockSlots]
    }
    
    // Remover duplicatas e ordenar
    const uniqueSlots = Array.from(new Set(allSlots))
    allSlots = uniqueSlots.sort()
    
    // 4. Buscar agendamentos já existentes para aquele dia
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    const bookings = await prisma.booking.findMany({
      where: {
        therapistId,
        startTime: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: {
          in: ['PENDING', 'CONFIRMED', 'COMPLETED']
        }
      },
      select: {
        startTime: true,
        endTime: true
      }
    })
    
    // 5. Filtrar slots que conflitam com agendamentos
    const now = new Date()
    const today = new Date(date)
    today.setHours(0, 0, 0, 0)
    const isToday = now.toDateString() === today.toDateString()

    const freeSlots = allSlots.filter(slot => {
      // Filtrar horários no passado (se for hoje)
      if (isToday) {
        const [hours, minutes] = slot.split(':').map(Number)
        const slotDateTime = new Date(date)
        slotDateTime.setHours(hours, minutes, 0, 0)
        
        if (slotDateTime <= now) {
          return false // Slot no passado
        }
      }

      // Filtrar conflitos com agendamentos existentes
      return !bookings.some(booking =>
        isSlotConflicting(slot, date, service.duration, booking)
      )
    })
    
    return NextResponse.json({
      slots: freeSlots,
      date: dateStr,
      therapistId,
      serviceId,
      serviceName: service.name,
      duration: service.duration
    })
    
  } catch (error: any) {
    console.error('Erro ao buscar slots:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar horários disponíveis' },
      { status: 500 }
    )
  }
}

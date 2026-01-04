// API para buscar horários disponíveis de um terapeuta
// GET /api/therapists/[id]/available-slots?days=14&duration=60

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Props {
  params: { id: string }
}

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const therapistId = parseInt(params.id)
    const { searchParams } = new URL(req.url)
    
    const days = parseInt(searchParams.get('days') || '14')
    const duration = parseInt(searchParams.get('duration') || '60')
    const serviceId = searchParams.get('serviceId')

    if (isNaN(therapistId) || isNaN(days) || isNaN(duration)) {
      return NextResponse.json(
        { error: 'Parâmetros inválidos' },
        { status: 400 }
      )
    }

    // Buscar disponibilidade do terapeuta
    const [therapist, availability, bookings] = await Promise.all([
      prisma.therapistProfile.findUnique({
        where: { id: therapistId },
        select: { id: true }
      }),
      prisma.availability.findMany({
        where: { therapistId },
        select: { dayOfWeek: true, startTime: true, endTime: true }
      }),
      prisma.booking.findMany({
        where: {
          therapistId,
          status: { in: ['CONFIRMED', 'PENDING'] }
        },
        select: { 
          startTime: true, 
          endTime: true,
          service: { select: { duration: true } }
        }
      })
    ])

    if (!therapist) {
      return NextResponse.json(
        { error: 'Terapeuta não encontrado' },
        { status: 404 }
      )
    }

    // Gerar arrays de dias disponíveis
    const result = []
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    // Converter bookings para Set para rápida verificação
    const bookedSlots = new Set(
      bookings.map(b => {
        const start = new Date(b.startTime)
        const end = new Date(b.endTime)
        return `${start.toISOString()}-${end.toISOString()}`
      })
    )

    for (let i = 0; i < days; i++) {
      const date = new Date(tomorrow)
      date.setDate(date.getDate() + i)
      
      const dayOfWeek = date.getDay()
      const dayName = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'][dayOfWeek]
      const dateStr = date.toISOString().split('T')[0]

      // Buscar disponibilidade para este dia da semana
      const dayAvailability = availability.filter(a => a.dayOfWeek === dayOfWeek)

      const slots: any[] = []

      if (dayAvailability.length === 0) {
        // Sem disponibilidade registrada para este dia
        // Gerar slots padrão (9-17, intervalo de 1h) como fallback
        for (let hour = 9; hour < 17; hour++) {
          const slotTime = `${String(hour).padStart(2, '0')}:00`
          const slotStart = new Date(date)
          slotStart.setHours(hour, 0)
          const slotEnd = new Date(slotStart)
          slotEnd.setMinutes(slotEnd.getMinutes() + duration)

          const isBooked = Array.from(bookedSlots).some(slot => {
            const [bookStart, bookEnd] = slot.split('-').map(s => new Date(s))
            return (
              (slotStart >= bookStart && slotStart < bookEnd) ||
              (slotEnd > bookStart && slotEnd <= bookEnd) ||
              (slotStart <= bookStart && slotEnd > bookEnd)
            )
          })

          slots.push({
            time: slotTime,
            available: !isBooked && hour + Math.ceil(duration / 60) <= 17,
            reason: isBooked ? 'Indisponível' : undefined
          })
        }
      } else {
        // Usar disponibilidade registrada
        for (const avail of dayAvailability) {
          const [startH, startM] = avail.startTime.split(':').map(Number)
          const [endH, endM] = avail.endTime.split(':').map(Number)

          const startMinutes = startH * 60 + startM
          const endMinutes = endH * 60 + endM

          // Gerar slots a cada 30 minutos
          for (let min = startMinutes; min + duration <= endMinutes; min += 30) {
            const hour = Math.floor(min / 60)
            const minute = min % 60
            const slotTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

            const slotStart = new Date(date)
            slotStart.setHours(hour, minute)
            const slotEnd = new Date(slotStart)
            slotEnd.setMinutes(slotEnd.getMinutes() + duration)

            const isBooked = Array.from(bookedSlots).some(slot => {
              const [bookStart, bookEnd] = slot.split('-').map(s => new Date(s))
              return (
                (slotStart >= bookStart && slotStart < bookEnd) ||
                (slotEnd > bookStart && slotEnd <= bookEnd) ||
                (slotStart <= bookStart && slotEnd > bookEnd)
              )
            })

            slots.push({
              time: slotTime,
              available: !isBooked,
              reason: isBooked ? 'Já agendado' : undefined
            })
          }
        }
      }

      result.push({
        date: date.toISOString(),
        dateStr,
        dayOfWeek: dayName,
        slots
      })
    }

    return NextResponse.json({ days: result })

  } catch (error) {
    console.error('❌ Erro ao buscar horários:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar horários disponíveis' },
      { status: 500 }
    )
  }
}

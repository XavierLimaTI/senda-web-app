import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * POST /api/bookings
 * 
 * Cria um novo agendamento (booking)
 * 
 * Body:
 * {
 *   therapistId: number
 *   serviceId: number
 *   dateTime: ISO string (ex: "2026-01-15T14:00:00")
 * }
 * 
 * Response: { booking: Booking }
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

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Apenas clientes podem criar agendamentos' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { therapistId, serviceId, dateTime } = body

    // Validar inputs
    if (!therapistId || !serviceId || !dateTime) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: therapistId, serviceId, dateTime' },
        { status: 400 }
      )
    }

    const startTime = new Date(dateTime)
    if (isNaN(startTime.getTime())) {
      return NextResponse.json(
        { error: 'dateTime inválido (use ISO format: 2026-01-15T14:00:00)' },
        { status: 400 }
      )
    }

    // Validar que o horário é no futuro
    if (startTime < new Date()) {
      return NextResponse.json(
        { error: 'Não é possível agendar para o passado' },
        { status: 400 }
      )
    }

    // Validar que terapeuta existe e está verificado
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
      select: { id: true, verified: true }
    })

    if (!therapist) {
      return NextResponse.json(
        { error: 'Terapeuta não encontrado' },
        { status: 404 }
      )
    }

    if (!therapist.verified) {
      return NextResponse.json(
        { error: 'Terapeuta não está verificado' },
        { status: 400 }
      )
    }

    // Validar que serviço existe e pertence ao terapeuta
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    })

    if (!service) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    if (service.therapistId !== therapistId) {
      return NextResponse.json(
        { error: 'Este serviço não pertence ao terapeuta selecionado' },
        { status: 400 }
      )
    }

    if (!service.active) {
      return NextResponse.json(
        { error: 'Este serviço não está disponível' },
        { status: 400 }
      )
    }

    // Validar que terapeuta tem disponibilidade no dia/hora
    const dayOfWeek = startTime.getDay()
    const availability = await prisma.availability.findMany({
      where: {
        therapistId,
        dayOfWeek
      }
    })

    if (availability.length === 0) {
      return NextResponse.json(
        { error: 'Terapeuta não tem disponibilidade neste dia' },
        { status: 400 }
      )
    }

    // Validar que horário está dentro da disponibilidade
    const bookingTime = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`
    const endTime = new Date(startTime.getTime() + service.duration * 60000)
    const endTimeStr = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`

    const isWithinAvailability = availability.some((av) => {
      return bookingTime >= av.startTime && endTimeStr <= av.endTime
    })

    if (!isWithinAvailability) {
      return NextResponse.json(
        { error: 'Horário selecionado não está dentro da disponibilidade do terapeuta' },
        { status: 400 }
      )
    }

    // Validar que não há conflito com outros agendamentos
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        therapistId,
        status: { in: ['PENDING', 'CONFIRMED', 'COMPLETED'] },
        OR: [
          {
            // Existing booking starts during our booking
            startTime: {
              gte: startTime,
              lt: endTime
            }
          },
          {
            // Our booking starts during existing booking
            endTime: {
              gt: startTime,
              lte: endTime
            }
          },
          {
            // Existing booking completely encompasses our booking
            AND: [
              { startTime: { lte: startTime } },
              { endTime: { gte: endTime } }
            ]
          }
        ]
      }
    })

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'Horário não disponível (conflito com outro agendamento)' },
        { status: 409 }
      )
    }

    // Criar agendamento
    const booking = await prisma.booking.create({
      data: {
        clientId: parseInt(session.user.id),
        therapistId,
        serviceId,
        startTime,
        endTime,
        status: 'PENDING' // Aguardando pagamento/confirmação
      },
      include: {
        service: true,
        therapist: { include: { user: { select: { name: true } } } }
      }
    })

    // TODO: Enviar email de confirmação
    // await sendConfirmationEmail(booking)

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/bookings
 * 
 * Lista agendamentos do cliente autenticado
 * 
 * Query params:
 * - status: PENDING | CONFIRMED | COMPLETED | CANCELLED
 * - page: número da página (padrão: 1)
 * 
 * Response: { bookings: Booking[], total: number }
 */
export async function GET(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Apenas clientes podem listar seus agendamentos' },
        { status: 403 }
      )
    }

    const url = new URL(req.url)
    const statusFilter = url.searchParams.get('status')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = 10
    const skip = (page - 1) * limit

    // Buscar agendamentos
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where: {
          clientId: parseInt(session.user.id),
          ...(statusFilter && { status: statusFilter })
        },
        include: {
          service: true,
          therapist: { include: { user: { select: { name: true, avatar: true } } } }
        },
        orderBy: { startTime: 'desc' },
        take: limit,
        skip
      }),
      prisma.booking.count({
        where: {
          clientId: parseInt(session.user.id),
          ...(statusFilter && { status: statusFilter })
        }
      })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      bookings,
      total,
      page,
      totalPages
    })
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}


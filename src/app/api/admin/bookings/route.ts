import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/bookings - Listar agendamentos com paginação e filtros
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || undefined
    const search = searchParams.get('search') || ''
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Construir filtro
    const where: any = {}
    
    if (status) {
      where.status = status
    }

    if (startDate) {
      where.startTime = { ...where.startTime, gte: new Date(startDate) }
    }

    if (endDate) {
      where.startTime = { ...where.startTime, lte: new Date(endDate) }
    }

    // Buscar agendamentos
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          client: {
            select: { id: true, name: true, email: true, avatar: true }
          },
          therapist: {
            include: {
              user: {
                select: { name: true, email: true, avatar: true }
              }
            }
          },
          service: {
            select: { name: true, price: true, duration: true }
          },
          payment: {
            select: { status: true, amount: true }
          }
        },
        orderBy: { startTime: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ])

    // Filtrar por busca (client ou therapist name)
    let filteredBookings = bookings
    if (search) {
      const searchLower = search.toLowerCase()
      filteredBookings = bookings.filter(b => 
        b.client?.name?.toLowerCase().includes(searchLower) ||
        b.therapist?.user?.name?.toLowerCase().includes(searchLower) ||
        b.service?.name?.toLowerCase().includes(searchLower)
      )
    }

    // Formatar dados
    const formattedBookings = filteredBookings.map((b) => ({
      id: b.id,
      status: b.status,
      startTime: b.startTime,
      endTime: b.endTime,
      notes: b.notes,
      createdAt: b.createdAt,
      client: {
        id: b.client?.id,
        name: b.client?.name || 'Desconhecido',
        email: b.client?.email,
        avatar: b.client?.avatar,
      },
      therapist: {
        id: b.therapist?.id,
        name: b.therapist?.user?.name || 'Desconhecido',
        email: b.therapist?.user?.email,
        avatar: b.therapist?.user?.avatar,
      },
      service: {
        name: b.service?.name || 'Serviço',
        price: b.service?.price || 0,
        duration: b.service?.duration || 60,
      },
      payment: b.payment ? {
        status: b.payment.status,
        amount: b.payment.amount,
      } : null,
    }))

    // Estatísticas
    const stats = await Promise.all([
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.count({ where: { status: 'CONFIRMED' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.booking.count({ where: { status: 'CANCELLED' } }),
    ])

    return NextResponse.json({
      success: true,
      bookings: formattedBookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        pending: stats[0],
        confirmed: stats[1],
        completed: stats[2],
        cancelled: stats[3],
        total,
      },
    })
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 })
  }
}

// PATCH /api/admin/bookings - Atualizar status de agendamento
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { bookingId, status, notes } = await req.json()

    if (!bookingId || !status) {
      return NextResponse.json({ error: 'ID e status são obrigatórios' }, { status: 400 })
    }

    const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 400 })
    }

    // Verificar se existe
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) {
      return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 })
    }

    // Atualizar
    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { 
        status,
        notes: notes || booking.notes,
      },
    })

    console.log(`[ADMIN] Agendamento #${bookingId} atualizado para ${status} por ${session.user.email}`)

    return NextResponse.json({ success: true, booking: updated })
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error)
    return NextResponse.json({ error: 'Erro ao atualizar agendamento' }, { status: 500 })
  }
}

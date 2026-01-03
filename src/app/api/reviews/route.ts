import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/reviews
 * 
 * Cria uma avaliação para um agendamento completado
 * 
 * Body:
 * {
 *   bookingId: number
 *   rating: number (1-5)
 *   comment?: string
 * }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Autenticação necessária' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Apenas clientes podem avaliar sessões' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { bookingId, rating, comment } = body

    // Validar inputs
    if (!bookingId || !rating) {
      return NextResponse.json(
        { error: 'bookingId e rating são obrigatórios' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'rating deve ser um número inteiro entre 1 e 5' },
        { status: 400 }
      )
    }

    // Buscar booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { review: true }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Agendamento não encontrado' },
        { status: 404 }
      )
    }

    // Validar que o booking pertence ao cliente
    if (booking.clientId !== parseInt(session.user.id)) {
      return NextResponse.json(
        { error: 'Você não tem permissão para avaliar este agendamento' },
        { status: 403 }
      )
    }

    // Validar que o booking foi completado
    if (booking.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Apenas agendamentos completados podem ser avaliados' },
        { status: 400 }
      )
    }

    // Validar que não existe review ainda
    if (booking.review) {
      return NextResponse.json(
        { error: 'Este agendamento já foi avaliado' },
        { status: 409 }
      )
    }

    // Criar review
    const review = await prisma.review.create({
      data: {
        bookingId,
        therapistId: booking.therapistId,
        clientId: booking.clientId,
        rating,
        comment: comment || null
      }
    })

    // Atualizar rating médio do terapeuta
    const reviews = await prisma.review.findMany({
      where: { therapistId: booking.therapistId },
      select: { rating: true }
    })

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

    await prisma.therapistProfile.update({
      where: { id: booking.therapistId },
      data: { rating: averageRating }
    })

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar avaliação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/reviews?therapistId=X
 * 
 * Lista avaliações de um terapeuta
 * 
 * Query params:
 * - therapistId: ID do terapeuta
 * - page: número da página (padrão: 1)
 * - limit: itens por página (padrão: 10, max: 50)
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const therapistId = url.searchParams.get('therapistId')
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 50)
    const skip = (page - 1) * limit

    if (!therapistId) {
      return NextResponse.json(
        { error: 'therapistId é obrigatório' },
        { status: 400 }
      )
    }

    const therapistIdNum = parseInt(therapistId)

    // Buscar reviews
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { therapistId: therapistIdNum },
        include: {
          booking: {
            select: {
              service: { select: { name: true } },
              startTime: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip
      }),
      prisma.review.count({
        where: { therapistId: therapistIdNum }
      })
    ])

    // Buscar rating médio e distribuição
    const allRatings = await prisma.review.findMany({
      where: { therapistId: therapistIdNum },
      select: { rating: true }
    })

    const averageRating = allRatings.length > 0
      ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
      : 0

    const distribution = {
      5: allRatings.filter(r => r.rating === 5).length,
      4: allRatings.filter(r => r.rating === 4).length,
      3: allRatings.filter(r => r.rating === 3).length,
      2: allRatings.filter(r => r.rating === 2).length,
      1: allRatings.filter(r => r.rating === 1).length,
    }

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      reviews,
      total,
      averageRating: Number(averageRating.toFixed(1)),
      distribution,
      page,
      totalPages
    })
  } catch (error) {
    console.error('Erro ao listar avaliações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

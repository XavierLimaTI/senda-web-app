import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/therapist/revenue
 * 
 * Retorna estatísticas de receita do terapeuta autenticado
 * 
 * Query params:
 * - period: 'day' | 'week' | 'month' | 'all' (default: 'month')
 */
export async function GET(req: Request) {
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
    const therapist = await prisma.therapistProfile.findUnique({
      where: { userId: parseInt(session.user.id) }
    })

    if (!therapist) {
      return NextResponse.json(
        { error: 'Perfil de terapeuta não encontrado' },
        { status: 404 }
      )
    }

    // Parâmetros de filtro
    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || 'month'

    // Calcular data inicial baseado no período
    const now = new Date()
    let startDate = new Date()

    switch (period) {
      case 'day':
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'all':
        startDate = new Date(0) // Desde o início dos tempos
        break
      default:
        startDate.setMonth(now.getMonth() - 1)
    }

    // Buscar todos os agendamentos COMPLETED do terapeuta no período
    const completedBookings = await prisma.booking.findMany({
      where: {
        therapistId: therapist.id,
        status: 'COMPLETED',
        startTime: {
          gte: startDate
        }
      },
      include: {
        service: {
          select: {
            name: true,
            price: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    // Calcular métricas
    const totalRevenue = completedBookings.reduce(
      (sum, booking) => sum + booking.service.price,
      0
    )

    // Taxa Senda (10% - conforme modelo de negócio)
    const sendaFee = totalRevenue * 0.10
    const netRevenue = totalRevenue - sendaFee

    // Contar sessões
    const totalSessions = completedBookings.length

    // Ticket médio
    const averageTicket = totalSessions > 0 ? totalRevenue / totalSessions : 0

    // Receita por serviço
    const revenueByService = completedBookings.reduce((acc, booking) => {
      const serviceName = booking.service.name
      if (!acc[serviceName]) {
        acc[serviceName] = {
          name: serviceName,
          count: 0,
          revenue: 0
        }
      }
      acc[serviceName].count++
      acc[serviceName].revenue += booking.service.price
      return acc
    }, {} as Record<string, { name: string; count: number; revenue: number }>)

    const topServices = Object.values(revenueByService)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    // Receita por dia (últimos 30 dias para gráfico)
    const last30Days = new Date()
    last30Days.setDate(now.getDate() - 30)

    const dailyBookings = await prisma.booking.findMany({
      where: {
        therapistId: therapist.id,
        status: 'COMPLETED',
        startTime: {
          gte: last30Days
        }
      },
      include: {
        service: {
          select: { price: true }
        }
      },
      orderBy: {
        startTime: 'asc'
      }
    })

    // Agrupar por dia
    const dailyRevenue = dailyBookings.reduce((acc, booking) => {
      const date = new Date(booking.startTime).toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = 0
      }
      acc[date] += booking.service.price
      return acc
    }, {} as Record<string, number>)

    // Converter para array para o gráfico
    const revenueChart = Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date,
      revenue
    }))

    // Próximos repasses (agendamentos confirmados)
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        therapistId: therapist.id,
        status: 'CONFIRMED',
        startTime: {
          gte: now
        }
      },
      include: {
        service: {
          select: { price: true }
        }
      }
    })

    const upcomingRevenue = upcomingBookings.reduce(
      (sum, booking) => sum + booking.service.price,
      0
    )

    return NextResponse.json({
      period,
      metrics: {
        totalRevenue,
        sendaFee,
        netRevenue,
        totalSessions,
        averageTicket,
        upcomingRevenue
      },
      topServices,
      revenueChart
    })

  } catch (error) {
    console.error('Erro ao buscar receitas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

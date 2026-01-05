import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

// GET: Buscar notificações do usuário
export async function GET(req: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const userId = parseInt(session.user.id)
    const { searchParams } = new URL(req.url)
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        ...(unreadOnly ? { read: false } : {})
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    const unreadCount = await prisma.notification.count({
      where: {
        userId,
        read: false,
      },
    })

    return NextResponse.json({ notifications, unreadCount })
    
  } catch (error) {
    console.error('Erro ao buscar notificações:', error)
    return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 })
  }
}

// POST: Marcar notificação como lida
export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await req.json()
    const { notificationId, markAllAsRead } = body
    const userId = parseInt(session.user.id)

    if (markAllAsRead) {
      // Marcar todas como lidas
      await prisma.notification.updateMany({
        where: {
          userId,
          read: false,
        },
        data: { read: true },
      })

      return NextResponse.json({ message: 'Todas as notificações marcadas como lidas' })
    }

    if (!notificationId) {
      return NextResponse.json({ error: 'notificationId é obrigatório' }, { status: 400 })
    }

    // Verificar se a notificação pertence ao usuário
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    })

    if (!notification) {
      return NextResponse.json({ error: 'Notificação não encontrada' }, { status: 404 })
    }

    if (notification.userId !== userId) {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }

    // Marcar como lida
    await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    })

    return NextResponse.json({ message: 'Notificação marcada como lida' })
    
  } catch (error) {
    console.error('Erro ao marcar notificação:', error)
    return NextResponse.json({ error: 'Erro ao marcar notificação' }, { status: 500 })
  }
}


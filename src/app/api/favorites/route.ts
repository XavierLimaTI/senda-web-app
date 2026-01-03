import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET: Obter favoritos do cliente
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Apenas clientes podem ter favoritos' }, { status: 403 })
    }

    // Buscar perfil do cliente
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
    })

    if (!clientProfile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    // Buscar favoritos com dados dos terapeutas
    const favorites = await prisma.therapistFavorite.findMany({
      where: { clientId: clientProfile.id },
      include: {
        therapist: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            services: {
              where: { active: true },
              take: 3,
            },
            reviews: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ favorites })
    
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error)
    return NextResponse.json({ error: 'Erro ao buscar favoritos' }, { status: 500 })
  }
}

// POST: Adicionar favorito
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Apenas clientes podem adicionar favoritos' }, { status: 403 })
    }

    const body = await req.json()
    const { therapistId } = body

    if (!therapistId) {
      return NextResponse.json({ error: 'therapistId é obrigatório' }, { status: 400 })
    }

    // Buscar perfil do cliente
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
    })

    if (!clientProfile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    // Verificar se terapeuta existe
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
    })

    if (!therapist) {
      return NextResponse.json({ error: 'Terapeuta não encontrado' }, { status: 404 })
    }

    // Criar favorito (unique constraint impede duplicatas)
    const favorite = await prisma.therapistFavorite.create({
      data: {
        clientId: clientProfile.id,
        therapistId,
      },
    })

    return NextResponse.json({ favorite, message: 'Terapeuta adicionado aos favoritos' })
    
  } catch (error: any) {
    console.error('Erro ao adicionar favorito:', error)
    
    // Se já existe favorito
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Terapeuta já está nos favoritos' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Erro ao adicionar favorito' }, { status: 500 })
  }
}

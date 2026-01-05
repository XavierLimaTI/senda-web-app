import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Apenas clientes podem usar favoritos' }, { status: 403 })
    }

    const body = await req.json()
    const { therapistId, action } = body

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

    if (action === 'remove') {
      // Remover favorito
      const favorite = await prisma.therapistFavorite.findFirst({
        where: {
          clientId: clientProfile.id,
          therapistId,
        },
      })

      if (favorite) {
        await prisma.therapistFavorite.delete({
          where: { id: favorite.id },
        })
      }

      return NextResponse.json({ message: 'Removido dos favoritos' })
    } else {
      // Adicionar favorito
      const favorite = await prisma.therapistFavorite.create({
        data: {
          clientId: clientProfile.id,
          therapistId,
        },
      })

      return NextResponse.json({ favorite, message: 'Adicionado aos favoritos' })
    }
    
  } catch (error: any) {
    console.error('Erro ao alterar favorito:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Já está nos favoritos' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Erro ao alterar favorito' }, { status: 500 })
  }
}


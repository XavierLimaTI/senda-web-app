import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE: Remover favorito
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    if (session.user.role !== 'CLIENT') {
      return NextResponse.json({ error: 'Apenas clientes podem remover favoritos' }, { status: 403 })
    }

    const favoriteId = parseInt(params.id)

    // Buscar perfil do cliente
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
    })

    if (!clientProfile) {
      return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
    }

    // Verificar se o favorito pertence ao cliente
    const favorite = await prisma.therapistFavorite.findUnique({
      where: { id: favoriteId },
    })

    if (!favorite) {
      return NextResponse.json({ error: 'Favorito não encontrado' }, { status: 404 })
    }

    if (favorite.clientId !== clientProfile.id) {
      return NextResponse.json({ error: 'Sem permissão para remover este favorito' }, { status: 403 })
    }

    // Remover favorito
    await prisma.therapistFavorite.delete({
      where: { id: favoriteId },
    })

    return NextResponse.json({ message: 'Favorito removido com sucesso' })
    
  } catch (error) {
    console.error('Erro ao remover favorito:', error)
    return NextResponse.json({ error: 'Erro ao remover favorito' }, { status: 500 })
  }
}

import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/admin/users - Listar usuários com paginação e filtros
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || undefined
    const verified = searchParams.get('verified')

    // Construir filtro
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (role) {
      where.role = role
    }

    // Buscar usuários
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          clientProfile: true,
          therapistProfile: true,
          spaceProfile: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    // Formatar dados
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      hasClientProfile: !!user.clientProfile,
      hasTherapistProfile: !!user.therapistProfile,
      hasSpaceProfile: !!user.spaceProfile,
      isVerified:
        user.role === 'CLIENT'
          ? !!user.clientProfile
          : user.role === 'THERAPIST'
            ? user.therapistProfile?.verified || false
            : user.role === 'SPACE'
              ? user.spaceProfile?.verified || false
              : false,
    }))

    // Estatísticas
    const stats = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true },
    })

    return NextResponse.json({
      success: true,
      users: formattedUsers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: stats.reduce((acc, s) => ({ ...acc, [s.role]: s._count.role }), {}),
    })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 })
  }
}

// DELETE /api/admin/users - Deletar usuário
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 })
    }

    // Não permitir deletar a si mesmo
    if (userId === session.user.id) {
      return NextResponse.json({ error: 'Não é possível deletar sua própria conta' }, { status: 400 })
    }

    // Verificar se usuário existe
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    // Deletar usuário (cascade deleta perfis)
    await prisma.user.delete({ where: { id: userId } })

    console.log(`[ADMIN] Usuário ${user.email} deletado por ${session.user.email}`)

    return NextResponse.json({ success: true, message: 'Usuário deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 })
  }
}

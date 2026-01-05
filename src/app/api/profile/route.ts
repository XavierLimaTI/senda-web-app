import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

export async function PUT(req: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const body = await req.json()
    const { name, phone, bio } = body

    const userId = parseInt(session.user.id)

    // Atualizar dados básicos do usuário
    await prisma.user.update({
      where: { id: userId },
      data: { name },
    })

    // Atualizar perfil específico
    if (session.user.role === 'CLIENT') {
      await prisma.clientProfile.update({
        where: { userId },
        data: { phone: phone || null },
      })
    } else if (session.user.role === 'THERAPIST') {
      await prisma.therapistProfile.update({
        where: { userId },
        data: { 
          phone: phone || null,
          bio: bio || null,
        },
      })
    } else if (session.user.role === 'SPACE') {
      await prisma.spaceProfile.update({
        where: { userId },
        data: { 
          phone: phone || null,
          description: bio || null,
        },
      })
    }

    return NextResponse.json({ message: 'Perfil atualizado com sucesso' })
    
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return NextResponse.json({ error: 'Erro ao atualizar perfil' }, { status: 500 })
  }
}


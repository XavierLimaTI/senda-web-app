import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

/**
 * POST /api/admin/create-admin
 * Endpoint para criar um usuário admin (apenas para setup inicial)
 * Bearer token obrigatório: SETUP_TOKEN
 */
export async function POST(req: Request) {
  try {
    // Verificar se o token de setup está correto
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (token !== process.env.SETUP_TOKEN) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    const email = 'admin@senda.app'
    const password = 'Admin123456'
    const name = 'Administrador Senda'

    // Verificar se já existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    })

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin já existe', email },
        { status: 200 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
        phone: '+55 11 99999-9999',
      },
    })

    return NextResponse.json(
      {
        message: 'Admin criado com sucesso',
        email,
        password,
        loginUrl: '/auth/signin',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar admin:', error)
    return NextResponse.json(
      { error: 'Erro ao criar admin' },
      { status: 500 }
    )
  }
}

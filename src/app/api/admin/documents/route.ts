import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function GET(req: NextRequest) {
  try {
    // Validar sessão
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Query params para filtro
    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get('status') || undefined
    const type = searchParams.get('type') || undefined
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Construir filtro
    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type

    // Buscar documentos com paginação
    const [documents, total] = await Promise.all([
      prisma.verificationDocument.findMany({
        where,
        include: {
          therapist: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  avatar: true,
                },
              },
              specialty: true,
              city: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.verificationDocument.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total,
        pending: await prisma.verificationDocument.count({ where: { ...where, status: 'PENDING' } }),
        approved: await prisma.verificationDocument.count({ where: { ...where, status: 'APPROVED' } }),
        rejected: await prisma.verificationDocument.count({ where: { ...where, status: 'REJECTED' } }),
      },
    })
  } catch (error) {
    console.error('Erro ao buscar documentos:', error)
    return NextResponse.json({ error: 'Erro ao buscar documentos' }, { status: 500 })
  }
}


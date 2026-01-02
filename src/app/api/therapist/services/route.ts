import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Listar todos os serviços do terapeuta logado
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Verificar se é terapeuta
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      include: { therapistProfile: true }
    })

    if (!user || user.role !== 'THERAPIST' || !user.therapistProfile) {
      return NextResponse.json({ error: 'Acesso negado. Apenas terapeutas podem acessar.' }, { status: 403 })
    }

    const services = await prisma.service.findMany({
      where: { therapistId: user.therapistProfile.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ services })
  } catch (error: any) {
    console.error('Erro ao buscar serviços:', error)
    return NextResponse.json({ error: 'Erro ao buscar serviços' }, { status: 500 })
  }
}

// POST - Criar novo serviço
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { name, description, duration, price } = body

    // Validações básicas
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      return NextResponse.json({ error: 'Nome deve ter no mínimo 3 caracteres' }, { status: 400 })
    }

    if (!duration || typeof duration !== 'number' || duration < 15 || duration % 15 !== 0) {
      return NextResponse.json({ error: 'Duração deve ser múltipla de 15 minutos (ex: 30, 45, 60)' }, { status: 400 })
    }

    if (!price || typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Preço deve ser um valor positivo' }, { status: 400 })
    }

    // Buscar perfil do terapeuta
    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      include: { therapistProfile: true }
    })

    if (!user || user.role !== 'THERAPIST' || !user.therapistProfile) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    // Verificar se terapeuta está verificado
    if (!user.therapistProfile.verified) {
      return NextResponse.json({ error: 'Apenas terapeutas verificados podem criar serviços' }, { status: 403 })
    }

    // Criar serviço
    const service = await prisma.service.create({
      data: {
        name: name.trim(),
        description: description?.trim() || '',
        duration,
        price,
        therapistId: user.therapistProfile.id,
        active: true
      }
    })

    return NextResponse.json({ service }, { status: 201 })
  } catch (error: any) {
    console.error('Erro ao criar serviço:', error)
    return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 500 })
  }
}

// PUT - Atualizar serviço existente
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { id, name, description, duration, price, active } = body

    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID do serviço é obrigatório' }, { status: 400 })
    }

    // Buscar serviço e verificar propriedade
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        therapist: {
          include: { user: true }
        }
      }
    })

    if (!service) {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 })
    }

    if (service.therapist.user.id !== parseInt(session.user.id)) {
      return NextResponse.json({ error: 'Você não tem permissão para editar este serviço' }, { status: 403 })
    }

    // Validações (se os campos forem fornecidos)
    if (name !== undefined && (typeof name !== 'string' || name.trim().length < 3)) {
      return NextResponse.json({ error: 'Nome deve ter no mínimo 3 caracteres' }, { status: 400 })
    }

    if (duration !== undefined && (typeof duration !== 'number' || duration < 15 || duration % 15 !== 0)) {
      return NextResponse.json({ error: 'Duração deve ser múltipla de 15 minutos' }, { status: 400 })
    }

    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return NextResponse.json({ error: 'Preço deve ser um valor positivo' }, { status: 400 })
    }

    // Atualizar apenas os campos fornecidos
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(duration !== undefined && { duration }),
        ...(price !== undefined && { price }),
        ...(active !== undefined && { active })
      }
    })

    return NextResponse.json({ service: updatedService })
  } catch (error: any) {
    console.error('Erro ao atualizar serviço:', error)
    return NextResponse.json({ error: 'Erro ao atualizar serviço' }, { status: 500 })
  }
}

// DELETE - Desativar serviço (soft delete)
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID do serviço é obrigatório' }, { status: 400 })
    }

    // Buscar serviço e verificar propriedade
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id) },
      include: {
        therapist: {
          include: { user: true }
        }
      }
    })

    if (!service) {
      return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 })
    }

    if (service.therapist.user.id !== parseInt(session.user.id)) {
      return NextResponse.json({ error: 'Você não tem permissão para desativar este serviço' }, { status: 403 })
    }

    // Desativar (soft delete)
    const deactivatedService = await prisma.service.update({
      where: { id: parseInt(id) },
      data: { active: false }
    })

    return NextResponse.json({ 
      message: 'Serviço desativado com sucesso',
      service: deactivatedService 
    })
  } catch (error: any) {
    console.error('Erro ao desativar serviço:', error)
    return NextResponse.json({ error: 'Erro ao desativar serviço' }, { status: 500 })
  }
}

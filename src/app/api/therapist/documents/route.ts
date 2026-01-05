import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Tipos permitidos de documento
const ALLOWED_TYPES = ['CRP', 'CREFITO', 'CERTIFICATE', 'DIPLOMA', 'CPF_ID', 'ADDRESS_PROOF']
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
  try {
    // Validar sessão
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Validar role THERAPIST
    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json({ error: 'Apenas terapeutas podem enviar documentos' }, { status: 403 })
    }

    // Buscar perfil do terapeuta
    const therapist = await prisma.therapistProfile.findUnique({
      where: { userId: (session.user as any).id },
    })

    if (!therapist) {
      return NextResponse.json({ error: 'Perfil de terapeuta não encontrado' }, { status: 404 })
    }

    // Parse FormData
    const formData = await req.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('type') as string
    const documentNumber = formData.get('documentNumber') as string

    // Validações
    if (!file) {
      return NextResponse.json({ error: 'Arquivo não fornecido' }, { status: 400 })
    }

    if (!documentType || !ALLOWED_TYPES.includes(documentType)) {
      return NextResponse.json(
        { error: `Tipo de documento inválido. Permitidos: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato de arquivo inválido. Permitidos: PDF, JPEG, PNG, WebP' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Arquivo muito grande (máximo 5MB)' }, { status: 400 })
    }

    // Ler conteúdo do arquivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gerar nome único do arquivo
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const filename = `${therapist.id}_${documentType}_${timestamp}_${random}${getFileExtension(file.type)}`

    // Salvar arquivo localmente (em /public/documents/)
    const documentsDir = join(process.cwd(), 'public', 'documents')
    
    // Criar diretório se não existir
    if (!existsSync(documentsDir)) {
      await mkdir(documentsDir, { recursive: true })
    }

    const filePath = join(documentsDir, filename)
    await writeFile(filePath, buffer)

    // Salvar referência no banco de dados
    const document = await prisma.verificationDocument.create({
      data: {
        therapistId: therapist.id,
        type: documentType,
        documentNumber: documentNumber || undefined,
        url: `/documents/${filename}`,
        fileName: file.name,
        mimeType: file.type,
        status: 'PENDING',
      },
      include: {
        therapist: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    console.log(`✅ Documento verificação criado: ${document.id} (${documentType})`)

    // TODO: Enviar email notificando admin
    // await sendEmail({
    //   to: ADMIN_EMAIL,
    //   subject: 'Novo documento para verificação',
    //   html: `<p>${document.therapist.user.name} enviou um documento do tipo ${documentType}</p>`
    // })

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        type: document.type,
        status: document.status,
        createdAt: document.createdAt,
      },
    })
  } catch (error) {
    console.error('Erro ao fazer upload do documento:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload do documento' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Validar sessão
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Validar role THERAPIST
    if (session.user.role !== 'THERAPIST') {
      return NextResponse.json(
        { error: 'Apenas terapeutas podem acessar seus documentos' },
        { status: 403 }
      )
    }

    // Buscar perfil do terapeuta
    const therapist = await prisma.therapistProfile.findUnique({
      where: { userId: (session.user as any).id },
    })

    if (!therapist) {
      return NextResponse.json({ error: 'Perfil de terapeuta não encontrado' }, { status: 404 })
    }

    // Buscar documentos
    const documents = await prisma.verificationDocument.findMany({
      where: { therapistId: therapist.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        documentNumber: true,
        status: true,
        rejectedReason: true,
        createdAt: true,
        reviewedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      documents,
      stats: {
        total: documents.length,
        pending: documents.filter((d) => d.status === 'PENDING').length,
        approved: documents.filter((d) => d.status === 'APPROVED').length,
        rejected: documents.filter((d) => d.status === 'REJECTED').length,
      },
    })
  } catch (error) {
    console.error('Erro ao buscar documentos:', error)
    return NextResponse.json({ error: 'Erro ao buscar documentos' }, { status: 500 })
  }
}

function getFileExtension(mimeType: string): string {
  const extensions: Record<string, string> = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  }
  return extensions[mimeType] || '.bin'
}


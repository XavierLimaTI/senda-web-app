import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas imagens são permitidas' }, { status: 400 })
    }

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 5MB' }, { status: 400 })
    }

    // Gerar nome único para o arquivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const timestamp = Date.now()
    const extension = file.type.split('/')[1]
    const filename = `avatar-${session.user.id}-${timestamp}.${extension}`
    
    // Criar diretório se não existir
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Diretório já existe
    }

    // Salvar arquivo
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)
    
    // URL pública do arquivo
    const avatarUrl = `/uploads/avatars/${filename}`
    
    // Atualizar avatar no banco de dados
    await prisma.user.update({
      where: { id: parseInt(session.user.id) },
      data: { avatar: avatarUrl },
    })

    return NextResponse.json({ 
      url: avatarUrl,
      message: 'Upload realizado com sucesso' 
    })
    
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json({ error: 'Erro ao fazer upload' }, { status: 500 })
  }
}

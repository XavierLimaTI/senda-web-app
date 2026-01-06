import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validar sessão
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const action = body.action as 'approve' | 'reject'
    const reason = body.reason as string | undefined

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Ação inválida' }, { status: 400 })
    }

    if (action === 'reject' && !reason) {
      return NextResponse.json(
        { error: 'Motivo da rejeição é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar documento
    const document = await prisma.verificationDocument.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        therapist: {
          select: {
            id: true,
            userId: true,
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

    if (!document) {
      return NextResponse.json({ error: 'Documento não encontrado' }, { status: 404 })
    }

    // Atualizar status
    const updatedDocument = await prisma.verificationDocument.update({
      where: { id: parseInt(params.id) },
      data: {
        status: action === 'approve' ? 'APPROVED' : 'REJECTED',
        reviewedBy: (session.user as any).id,
        reviewedAt: new Date(),
        rejectedReason: action === 'reject' ? reason : undefined,
      },
    })

    // Enviar email para terapeuta
    const subject = action === 'approve'
      ? `Documento verificado com sucesso! 🎉`
      : `Documento rejeitado - ação necessária`

    const htmlContent = action === 'approve'
      ? `
        <h2>Parabéns, ${document.therapist.user.name}!</h2>
        <p>Seu documento de tipo <strong>${document.type}</strong> foi verificado e aprovado.</p>
        <p>Você está um passo mais perto de ser um terapeuta verificado no Senda!</p>
        <p>Continue enviando os documentos restantes para completar sua verificação.</p>
        <hr />
        <p><a href="https://senda.app/dashboard/therapist/documents">Ver meus documentos</a></p>
      `
      : `
        <h2>Documento rejeitado</h2>
        <p>Olá ${document.therapist.user.name},</p>
        <p>Seu documento de tipo <strong>${document.type}</strong> foi rejeitado pela seguinte razão:</p>
        <blockquote>${reason}</blockquote>
        <p>Por favor, envie uma versão melhorada ou um documento diferente.</p>
        <hr />
        <p><a href="https://senda.app/dashboard/therapist/documents">Enviar novo documento</a></p>
      `

    try {
      await sendEmail({
        to: document.therapist.user.email,
        subject,
        html: htmlContent,
      })
      console.log(`✅ Email enviado para ${document.therapist.user.email}`)
    } catch (emailError) {
      console.warn(`⚠️ Erro ao enviar email: ${emailError}`)
      // Não falhar se email não puder ser enviado
    }

    console.log(`✅ Documento ${params.id} ${action}d`)

    return NextResponse.json({
      success: true,
      document: updatedDocument,
    })
  } catch (error) {
    console.error('Erro ao processar documento:', error)
    return NextResponse.json({ error: 'Erro ao processar documento' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validar sessão
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar documento
    const document = await prisma.verificationDocument.findUnique({
      where: { id: parseInt(params.id) },
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
            rating: true,
          },
        },
      },
    })

    if (!document) {
      return NextResponse.json({ error: 'Documento não encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      document,
    })
  } catch (error) {
    console.error('Erro ao buscar documento:', error)
    return NextResponse.json({ error: 'Erro ao buscar documento' }, { status: 500 })
  }
}

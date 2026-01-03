import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Verificar se é admin
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
    }

    const { therapistId, reason } = await req.json()

    if (!therapistId || !reason) {
      return NextResponse.json({ error: 'ID e motivo são obrigatórios' }, { status: 400 })
    }

    // Buscar terapeuta
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!therapist) {
      return NextResponse.json({ error: 'Terapeuta não encontrado' }, { status: 404 })
    }

    // Deletar perfil de terapeuta (ou marcar como rejeitado se preferir manter histórico)
    await prisma.therapistProfile.delete({
      where: { id: therapistId }
    })

    // TODO: Enviar email de rejeição (implementar função de email genérica)
    console.log('Email de rejeição seria enviado para:', therapist.user.email, 'Motivo:', reason)
    
    try {
      await sendEmail({
        to: therapist.user.email,
        subject: 'Atualização sobre seu cadastro no Senda',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D99A8B;">Olá, ${therapist.user.name}</h2>
            <p>Obrigado pelo interesse em fazer parte da plataforma Senda.</p>
            <p>Infelizmente, neste momento não conseguimos aprovar seu perfil de terapeuta pelos seguintes motivos:</p>
            <div style="background-color: #f5f5f5; padding: 16px; border-left: 4px solid #D99A8B; margin: 16px 0;">
              <p style="margin: 0;">${reason}</p>
            </div>
            <p>Você pode:</p>
            <ul>
              <li>Revisar suas informações e documentos</li>
              <li>Fazer um novo cadastro com informações atualizadas</li>
              <li>Entrar em contato conosco para mais detalhes</li>
            </ul>
            <p style="margin-top: 24px; color: #666; font-size: 14px;">
              Equipe Senda<br>
              <em>suporte@senda.app</em>
            </p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Erro ao enviar email de rejeição:', emailError)
      // Continuar mesmo que o email falhe
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Terapeuta rejeitado. Email enviado.' 
    })

  } catch (error) {
    console.error('Erro ao rejeitar terapeuta:', error)
    return NextResponse.json(
      { error: 'Erro ao rejeitar terapeuta' },
      { status: 500 }
    )
  }
}

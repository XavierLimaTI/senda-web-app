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

    const { therapistId } = await req.json()

    if (!therapistId) {
      return NextResponse.json({ error: 'ID do terapeuta é obrigatório' }, { status: 400 })
    }

    // Buscar terapeuta e atualizar status
    const therapist = await prisma.therapistProfile.update({
      where: { id: therapistId },
      data: { verified: true },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // TODO: Enviar email de aprovação (implementar função de email genérica)
    console.log('Email de aprovação seria enviado para:', therapist.user.email)
    
    try {
      await sendEmail({
        to: therapist.user.email,
        subject: '🎉 Parabéns! Seu perfil foi aprovado no Senda',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B2B8A3;">Olá, ${therapist.user.name}!</h2>
          <p>Temos ótimas notícias! Seu perfil de terapeuta foi aprovado pela equipe Senda.</p>
          <p>Agora você já pode:</p>
          <ul>
            <li>Aparecer nas buscas de clientes</li>
            <li>Receber agendamentos</li>
            <li>Gerenciar seus serviços e horários</li>
          </ul>
          <p>Acesse sua conta e comece a ajudar pessoas em sua jornada de bem-estar!</p>
          <a href="${process.env.NEXTAUTH_URL}/dashboard/therapist" 
             style="display: inline-block; padding: 12px 24px; background-color: #B2B8A3; color: white; text-decoration: none; border-radius: 8px; margin-top: 16px;">
            Acessar Painel
          </a>
          <p style="margin-top: 24px; color: #666; font-size: 14px;">
            Equipe Senda<br>
            <em>Seu caminho de autocuidado</em>
          </p>
        </div>
      `
      })
    } catch (emailError) {
      console.error('Erro ao enviar email de aprovação:', emailError)
      // Continuar mesmo que o email falhe
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Terapeuta aprovado com sucesso' 
    })

  } catch (error) {
    console.error('Erro ao aprovar terapeuta:', error)
    return NextResponse.json(
      { error: 'Erro ao aprovar terapeuta' },
      { status: 500 }
    )
  }
}

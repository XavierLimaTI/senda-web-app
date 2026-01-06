import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const therapistId = parseInt(params.id)
    const body = await req.json()
    const { reason } = body

    if (!reason || reason.trim() === '') {
      return NextResponse.json(
        { error: 'Reason for rejection is required' },
        { status: 400 }
      )
    }

    // Atualizar status do terapeuta (manter verified: false, mas registrar rejeição)
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: therapistId },
      include: {
        user: true,
      },
    })

    if (!therapist) {
      return NextResponse.json({ error: 'Therapist not found' }, { status: 404 })
    }

    // Enviar email de rejeição
    if (therapist.user.email) {
      await sendEmail({
        to: therapist.user.email,
        subject: 'Sobre sua solicitação de verificação na Senda',
        html: `
          <h2>Olá, ${therapist.user.name}</h2>
          <p>Obrigado por se inscrever na Senda!</p>
          <p>Infelizmente, não conseguimos verificar sua conta neste momento.</p>
          <h3>Motivo:</h3>
          <p>${reason}</p>
          <p>Você pode tentar novamente depois de resolver essas questões.</p>
          <p>Se tiver dúvidas, entre em contato conosco:</p>
          <a href="mailto:support@senda.app">support@senda.app</a>
        `,
      })
    }

    return NextResponse.json({
      message: 'Therapist rejected successfully',
      therapist,
    })
  } catch (error) {
    console.error('Error rejecting therapist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

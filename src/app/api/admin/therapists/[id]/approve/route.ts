import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const therapistId = parseInt(params.id)
    const body = await req.json()
    const { notes } = body

    // Atualizar status do terapeuta
    const therapist = await prisma.therapistProfile.update({
      where: { id: therapistId },
      data: {
        verified: true,
      },
      include: {
        user: true,
      },
    })

    // Enviar email de aprovação
    if (therapist.user.email) {
      await sendEmail({
        to: therapist.user.email,
        subject: '✓ Sua conta foi verificada na Senda!',
        html: `
          <h2>Parabéns, ${therapist.user.name}!</h2>
          <p>Sua conta foi verificada com sucesso na Senda.</p>
          <p>Você agora pode:</p>
          <ul>
            <li>Aparecer nos resultados de busca</li>
            <li>Receber agendamentos de clientes</li>
            <li>Ver seu badge de verificado no perfil</li>
          </ul>
          ${notes ? `<p><strong>Notas do admin:</strong> ${notes}</p>` : ''}
          <a href="https://senda.app/dashboard/therapist">
            Acessar seu Dashboard
          </a>
        `,
      })
    }

    return NextResponse.json({
      message: 'Therapist approved successfully',
      therapist,
    })
  } catch (error) {
    console.error('Error approving therapist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

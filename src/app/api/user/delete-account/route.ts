import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'


import { prisma } from '@/lib/prisma'

/**
 * POST /api/user/delete-account
 * 
 * Deleta permanentemente a conta do usuário e seus dados
 * LGPD Art. 18 - Direito ao esquecimento (deletion)
 * 
 * Body: { confirmEmail: string, reason?: string }
 */
export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { confirmEmail, reason } = await req.json()

    // Confirmar que é realmente o usuário
    if (confirmEmail !== session.user.email) {
      return NextResponse.json(
        { error: 'Email confirmation does not match' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Log de deleção (LGPD Art. 15 - responsabilidade do operador)
    console.log(`[LGPD] User deletion request: ${user.email} at ${new Date().toISOString()}`)
    if (reason) console.log(`[LGPD] Reason: ${reason}`)

    // Deletar usuário (cascade deleta profiles, tokens, etc)
    await prisma.user.delete({
      where: { id: user.id },
    })

    return NextResponse.json(
      { 
        message: 'Account deleted successfully',
        deletedAt: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}


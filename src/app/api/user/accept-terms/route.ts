import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/user/accept-terms
 * 
 * Atualiza a versão aceita de termos (para quando há novos termos)
 * 
 * Body: {
 *   acceptedTermsVersion: string (ex: "1.0.1"),
 *   marketingConsent?: boolean
 * }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { acceptedTermsVersion, marketingConsent } = await req.json()

    if (!acceptedTermsVersion) {
      return NextResponse.json({ error: 'acceptedTermsVersion is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Atualizar versão e consentimento
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        acceptedTermsAt: new Date(),
        acceptedTermsVersion,
        ...(marketingConsent !== undefined && { marketingConsent }),
      },
      select: {
        id: true,
        email: true,
        acceptedTermsAt: true,
        acceptedTermsVersion: true,
        marketingConsent: true,
      },
    })

    // Log de auditoria
    console.log(
      `[LGPD] Terms update: ${user.email} accepted version ${acceptedTermsVersion} at ${updated.acceptedTermsAt}`
    )

    return NextResponse.json(
      {
        message: 'Terms accepted successfully',
        termsVersion: updated.acceptedTermsVersion,
        acceptedAt: updated.acceptedTermsAt,
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}

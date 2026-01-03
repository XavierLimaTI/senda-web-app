import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/user/consent
 * 
 * Atualiza preferências de consentimento do usuário
 * LGPD Art. 8 - Fornecimento de consentimento
 * 
 * Body: { 
 *   marketingConsent?: boolean,
 *   dataProcessingConsent?: boolean,
 *   analyticsConsent?: boolean 
 * }
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { marketingConsent, dataProcessingConsent, analyticsConsent } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Validar que dataProcessingConsent é sempre true (necessário para serviço)
    if (dataProcessingConsent === false) {
      return NextResponse.json(
        { error: 'Data processing consent is required to use the service' },
        { status: 400 }
      )
    }

    // Atualizar consentimentos
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(marketingConsent !== undefined && { marketingConsent }),
        ...(dataProcessingConsent !== undefined && { dataProcessingConsent }),
      },
    })

    // Log para auditoria LGPD
    console.log(
      `[LGPD] Consent update: ${user.email} | Marketing: ${updated.marketingConsent} | Analytics: ${analyticsConsent ?? 'unchanged'}`
    )

    return NextResponse.json(
      {
        message: 'Consent preferences updated',
        preferences: {
          marketingConsent: updated.marketingConsent,
          dataProcessingConsent: updated.dataProcessingConsent,
          updatedAt: updated.updatedAt,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}

/**
 * GET /api/user/consent
 * 
 * Recupera preferências de consentimento do usuário
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        acceptedTermsAt: true,
        acceptedTermsVersion: true,
        marketingConsent: true,
        dataProcessingConsent: true,
        emailVerified: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}

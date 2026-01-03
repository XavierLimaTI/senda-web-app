import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/user/export-data
 * 
 * Exporta todos os dados do usuário em formato JSON
 * LGPD Art. 18 - Direito de acesso aos dados pessoais
 */
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        ClientProfile: true,
        TherapistProfile: true,
        SpaceProfile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Preparar dados para exportação
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      legalCompliance: {
        acceptedTermsAt: user.acceptedTermsAt,
        acceptedTermsVersion: user.acceptedTermsVersion,
        marketingConsent: user.marketingConsent,
        dataProcessingConsent: user.dataProcessingConsent,
        emailVerified: user.emailVerified,
      },
      profiles: {
        client: user.ClientProfile,
        therapist: user.TherapistProfile,
        space: user.SpaceProfile,
      },
    }

    // Retornar como download
    return NextResponse.json(exportData, {
      headers: {
        'Content-Disposition': `attachment; filename="senda-data-${Date.now()}.json"`,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 })
  }
}

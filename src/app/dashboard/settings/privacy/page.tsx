import { auth } from '@/lib/auth'

import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import PrivacyDashboard from '@/components/PrivacyDashboard'

export const metadata = {
  title: 'Configurações de Privacidade - Senda',
  description: 'Gerencie seus dados e preferências de privacidade conforme a LGPD',
}

export default async function PrivacySettingsPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect('/auth/signin')
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
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-[#B2B8A3] hover:text-[#C8963E] transition-colors mb-4"
          >
            ← Voltar para dashboard
          </Link>

          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              🔐 Configurações de Privacidade
            </h1>
            <p className="text-gray-600">
              Gerencie seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD)
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="text-2xl">ℹ️</div>
            <div className="text-sm">
              <strong className="text-blue-900">Lei Geral de Proteção de Dados (LGPD)</strong>
              <p className="text-blue-800 mt-1">
                Você tem direito a acessar, corrigir, exportar e deletar seus dados. Senda respeita
                todos os direitos previstos no Art. 18 da Lei 13.709/2018.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Componente */}
        <PrivacyDashboard
          initialConsents={{
            email: user.email,
            acceptedTermsAt: user.acceptedTermsAt?.toISOString() || null,
            acceptedTermsVersion: user.acceptedTermsVersion,
            marketingConsent: user.marketingConsent,
            dataProcessingConsent: user.dataProcessingConsent,
            emailVerified: !!user.emailVerified,
          }}
        />

        {/* Footer */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 text-center text-sm text-gray-600">
          <p>
            Dúvidas sobre privacidade?{' '}
            <a
              href="mailto:privacidade@senda.app"
              className="text-[#C8963E] hover:underline font-medium"
            >
              Entre em contato com nosso DPO
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


import type { Metadata } from 'next'
import './globals.css'
import Providers from './Providers'
import ClientLayout from '@/components/ClientLayout'
import { useSentryErrorTracking } from '@/lib/sentry-error-tracking'

export const metadata: Metadata = {
  title: 'Senda - Sua Jornada de Bem-Estar',
  description: 'Plataforma de conexão entre clientes e terapeutas integradores',
}

// Disable static generation for pages using client providers
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
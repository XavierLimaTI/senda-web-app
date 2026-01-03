import type { Metadata } from 'next'
import './globals.css'
import Providers from './Providers'
import Navbar from '@/components/Navbar'
import CookieConsent from '@/components/CookieConsent'
import TermsUpdateWrapper from '@/components/TermsUpdateWrapper'

export const metadata: Metadata = {
  title: 'Senda - Sua Jornada de Bem-Estar',
  description: 'Plataforma de conexão entre clientes e terapeutas integradores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <TermsUpdateWrapper />
          <Navbar />
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
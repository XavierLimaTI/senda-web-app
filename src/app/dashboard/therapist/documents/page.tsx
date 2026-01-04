import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import TherapistDocumentsClient from './TherapistDocumentsClient'

export const metadata = {
  title: 'Documentos de Verificação - Senda',
  description: 'Gerenciar documentos de verificação profissional',
}

export default async function TherapistDocumentsPage() {
  const session = await getServerSession(authOptions)

  // Validar autenticação e role
  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'THERAPIST') {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#F0EBE3]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TherapistDocumentsClient />
      </div>
    </main>
  )
}

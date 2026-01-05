import { auth } from '@/lib/auth'


import { redirect } from 'next/navigation'
import AdminDocumentsClient from './AdminDocumentsClient'

export const metadata = {
  title: 'Verificação de Documentos - Admin - Senda',
  description: 'Gerenciar verificação de documentos de terapeutas',
}

export default async function AdminDocumentsPage() {
  const session = await auth()

  // Validar autenticação e role
  if (!session?.user) {
    redirect('/auth/signin')
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-[#F0EBE3]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AdminDocumentsClient />
      </div>
    </main>
  )
}


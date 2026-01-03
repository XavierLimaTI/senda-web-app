'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/DashboardSidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebar?: {
    icon: string
    label: string
    href: string
    badge?: number
  }[]
  requireRole?: 'THERAPIST' | 'CLIENT' | 'SPACE' | 'ADMIN'
}

export default function DashboardLayout({ children, sidebar, requireRole }: DashboardLayoutProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F0EBE3] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="text-5xl mb-4">🌿</div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  if (requireRole && session.user.role !== requireRole) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-[#F0EBE3]">
      {sidebar && <DashboardSidebar links={sidebar} />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

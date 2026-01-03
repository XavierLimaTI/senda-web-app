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
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#B2B8A3] to-[#C8963E] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
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

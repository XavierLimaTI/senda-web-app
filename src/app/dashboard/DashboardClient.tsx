"use client"

import Link from "next/link"
import SignOutButton from "@/components/SignOutButton"
import { Calendar, Stethoscope, Clock, DollarSign, Search, Settings, Lock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface SessionLike {
  user: {
    id: number | string
    name: string | null | undefined
    email: string | null | undefined
    role: 'THERAPIST' | 'CLIENT' | 'SPACE' | 'ADMIN'
  }
}

export default function DashboardClient({ session }: { session: SessionLike }) {
  const { t, language } = useLanguage()

  const therapistLinks = [
    { href: '/dashboard/therapist/bookings', label: t('navbar.bookings'), description: t('dashboard.manage_sessions'), icon: Calendar },
    { href: '/dashboard/therapist/services', label: t('navbar.services'), description: t('dashboard.manage_services'), icon: Stethoscope },
    { href: '/dashboard/therapist/availability', label: t('navbar.availability'), description: t('dashboard.configure_availability'), icon: Clock },
    { href: '/dashboard/therapist/revenue', label: t('navbar.revenue'), description: t('dashboard.view_revenue'), icon: DollarSign },
  ]

  const clientLinks = [
    { href: '/client/bookings', label: t('navbar.bookings'), description: t('dashboard.manage_sessions'), icon: Calendar },
    { href: '/explore/therapists', label: t('navbar.explore'), description: t('dashboard.find_professionals'), icon: Search },
  ]

  const links = session.user.role === 'THERAPIST' ? therapistLinks : 
                session.user.role === 'CLIENT' ? clientLinks : []

  const roleLabel = session.user.role === 'THERAPIST'
    ? t('role.therapist')
    : session.user.role === 'CLIENT'
      ? t('role.client')
      : session.user.role === 'SPACE'
        ? t('role.space')
        : t('role.admin')

  return (
    <main className="min-h-screen bg-[#F0EBE3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-gray-900 mb-2">{t('dashboard.title')}</h1>
            <p className="text-gray-600">{t('dashboard.welcome')}, <strong>{session?.user?.name}</strong></p>
            <p className="text-sm text-gray-500">
              {session?.user?.email} • {roleLabel}
            </p>
          </div>

          {/* Quick Access */}
          {links.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.quick_access')}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {links.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block p-4 border-2 border-gray-200 rounded-lg hover:border-[#B2B8A3] hover:bg-[#F0EBE3] transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className="w-6 h-6 text-[#B2B8A3] flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 group-hover:text-[#B2B8A3] transition-colors">
                            {link.label}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.settings')}</h2>
            </div>
            <Link
              href="/dashboard/settings/privacy"
              className="block p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:border-[#B2B8A3] hover:bg-[#F0EBE3] transition-all group"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 group-hover:text-[#B2B8A3] transition-colors">
                    {t('dashboard.privacy_title')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('dashboard.privacy_desc')}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Logout */}
          <div className="pt-6 border-t border-gray-200">
            <SignOutButton />
          </div>
        </div>
      </div>
    </main>
  )
}

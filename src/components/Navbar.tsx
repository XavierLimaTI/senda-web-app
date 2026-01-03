'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import NotificationBell from './NotificationBell'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { language, setLanguage, t } = useLanguage()

  // Não mostrar navbar em páginas de autenticação
  if (pathname?.startsWith('/auth/')) {
    return null
  }

  const isTherapist = session?.user?.role === 'THERAPIST'
  const isClient = session?.user?.role === 'CLIENT'
  const isAdmin = session?.user?.role === 'ADMIN'
  
  // Link dinâmico para home baseado no role
  const homeLink = session?.user 
    ? isAdmin ? '/dashboard/admin'
    : isClient ? '/home/client' 
    : isTherapist ? '/home/therapist' 
    : '/dashboard'
    : '/'

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={homeLink} className="flex items-center group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-md group-hover:shadow-lg transition-shadow">
              <Image
                src="/images/senda/logo.png"
                alt="Senda"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          {session && (
            <div className="hidden md:flex items-center gap-6">
              {/* Link Início dinâmico */}
              <NavLink href={homeLink} active={pathname === homeLink || pathname?.startsWith('/home/')}>
                Início
              </NavLink>

              {isTherapist && (
                <>
                  <NavLink href="/dashboard/therapist/bookings" active={pathname === '/dashboard/therapist/bookings'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Agendamentos
                  </NavLink>
                  <NavLink href="/dashboard/therapist/services" active={pathname === '/dashboard/therapist/services'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Serviços
                  </NavLink>
                  <NavLink href="/dashboard/therapist/availability" active={pathname === '/dashboard/therapist/availability'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Horários
                  </NavLink>
                  <NavLink href="/dashboard/therapist/revenue" active={pathname === '/dashboard/therapist/revenue'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Receitas
                  </NavLink>
                </>
              )}

              {isClient && (
                <>
                  <NavLink href="/client/bookings" active={pathname === '/client/bookings'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Meus Agendamentos
                  </NavLink>
                  <NavLink href="/explore/therapists" active={pathname === '/explore/therapists'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Explorar
                  </NavLink>
                  <NavLink href="/explore/therapies" active={pathname === '/explore/therapies'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Terapias
                  </NavLink>
                  <NavLink href="/favorites" active={pathname === '/favorites'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Favoritos
                  </NavLink>
                </>
              )}

              {isAdmin && (
                <>
                  <NavLink href="/dashboard/admin" active={pathname === '/dashboard/admin'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </NavLink>
                  <NavLink href="/dashboard/admin/therapists/pending" active={pathname === '/dashboard/admin/therapists/pending'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Aprovações
                  </NavLink>
                  <NavLink href="/dashboard/admin/users" active={pathname === '/dashboard/admin/users'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Usuários
                  </NavLink>
                  <NavLink href="/dashboard/admin/news" active={pathname === '/dashboard/admin/news'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2zm-2-4h2m-2 4H7m10-7h-2M7 17h8" />
                    </svg>
                    Notícias
                  </NavLink>
                  <NavLink href="/dashboard/admin/reports" active={pathname === '/dashboard/admin/reports'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Relatórios
                  </NavLink>
                  <NavLink href="/dashboard/admin/reviews" active={pathname === '/dashboard/admin/reviews'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Reviews
                  </NavLink>
                  <NavLink href="/dashboard/admin/payments" active={pathname === '/dashboard/admin/payments'}>
                    <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pagamentos
                  </NavLink>
                </>
              )}
            </div>
          )}

          {/* Language Selector & User Menu */}
          {session ? (
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => {
                  const lang = e.target.value as 'pt' | 'en' | 'es' | 'zh'
                  setLanguage(lang)
                  // Atualizar idioma do HTML
                  document.documentElement.lang = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'zh' ? 'zh-CN' : 'pt-BR'
                }}
                className="p-2 rounded-lg bg-transparent hover:bg-gray-100 border border-gray-200 text-sm cursor-pointer font-medium"
                title={t('navbar.language') || 'Idioma / Language / Idioma / 语言'}
              >
                <option value="pt">🇧🇷 PT</option>
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="zh">🇨🇳 ZH</option>
              </select>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500">
                  {isTherapist ? 'Terapeuta' : isClient ? 'Cliente' : session.user.role}
                </p>
              </div>
              
              {/* Notificações */}
              <NotificationBell />
              
              {/* Avatar - Clicável para perfil */}
              <Link
                href="/profile"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8963E] to-[#B2B8A3] flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow overflow-hidden"
                title="Meu Perfil"
              >
                {(session.user as any).avatar ? (
                  <img
                    src={(session.user as any).avatar}
                    alt={session.user.name || ''}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  session.user.name?.[0].toUpperCase()
                )}
              </Link>

              {/* Logout */}
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                title="Sair"
              >
                🚪
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Entrar
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Cadastrar
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {session && (isTherapist || isClient) && (
        <div className="md:hidden border-t border-gray-200 px-4 py-2 overflow-x-auto">
          <div className="flex gap-4 whitespace-nowrap">
            {isTherapist && (
              <>
                <MobileNavLink href="/dashboard/therapist/bookings" active={pathname === '/dashboard/therapist/bookings'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </MobileNavLink>
                <MobileNavLink href="/dashboard/therapist/services" active={pathname === '/dashboard/therapist/services'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </MobileNavLink>
                <MobileNavLink href="/dashboard/therapist/availability" active={pathname === '/dashboard/therapist/availability'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </MobileNavLink>
                <MobileNavLink href="/dashboard/therapist/revenue" active={pathname === '/dashboard/therapist/revenue'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </MobileNavLink>
              </>
            )}

            {isClient && (
              <>
                <MobileNavLink href="/client/bookings" active={pathname === '/client/bookings'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendamentos
                </MobileNavLink>
                <MobileNavLink href="/explore/therapists" active={pathname === '/explore/therapists'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explorar
                </MobileNavLink>
                <MobileNavLink href="/favorites" active={pathname === '/favorites'}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favoritos
                </MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${
        active
          ? 'text-[#B2B8A3]'
          : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        active
          ? 'bg-[#B2B8A3] text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {children}
    </Link>
  )
}

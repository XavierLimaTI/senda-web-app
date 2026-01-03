'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Não mostrar navbar em páginas de autenticação
  if (pathname?.startsWith('/auth/')) {
    return null
  }

  const isTherapist = session?.user?.role === 'THERAPIST'
  const isClient = session?.user?.role === 'CLIENT'

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl">🌿</div>
            <span className="text-2xl font-serif text-gray-900 group-hover:text-[#B2B8A3] transition-colors">
              Senda
            </span>
          </Link>

          {/* Navigation Links */}
          {session && (
            <div className="hidden md:flex items-center gap-6">
              {isTherapist && (
                <>
                  <NavLink href="/dashboard/therapist/bookings" active={pathname === '/dashboard/therapist/bookings'}>
                    📅 Agendamentos
                  </NavLink>
                  <NavLink href="/dashboard/therapist/services" active={pathname === '/dashboard/therapist/services'}>
                    💆 Serviços
                  </NavLink>
                  <NavLink href="/dashboard/therapist/availability" active={pathname === '/dashboard/therapist/availability'}>
                    ⏰ Horários
                  </NavLink>
                  <NavLink href="/dashboard/therapist/revenue" active={pathname === '/dashboard/therapist/revenue'}>
                    💰 Receitas
                  </NavLink>
                </>
              )}

              {isClient && (
                <>
                  <NavLink href="/client/bookings" active={pathname === '/client/bookings'}>
                    📅 Meus Agendamentos
                  </NavLink>
                  <NavLink href="/explore/therapists" active={pathname === '/explore/therapists'}>
                    🔍 Explorar
                  </NavLink>
                </>
              )}
            </div>
          )}

          {/* User Menu */}
          {session ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                <p className="text-xs text-gray-500">
                  {isTherapist ? 'Terapeuta' : isClient ? 'Cliente' : session.user.role}
                </p>
              </div>
              
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8963E] to-[#B2B8A3] flex items-center justify-center text-white font-semibold">
                {session.user.name?.[0].toUpperCase()}
              </div>

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
                  📅
                </MobileNavLink>
                <MobileNavLink href="/dashboard/therapist/services" active={pathname === '/dashboard/therapist/services'}>
                  💆
                </MobileNavLink>
                <MobileNavLink href="/dashboard/therapist/availability" active={pathname === '/dashboard/therapist/availability'}>
                  ⏰
                </MobileNavLink>
                <MobileNavLink href="/dashboard/therapist/revenue" active={pathname === '/dashboard/therapist/revenue'}>
                  💰
                </MobileNavLink>
              </>
            )}

            {isClient && (
              <>
                <MobileNavLink href="/client/bookings" active={pathname === '/client/bookings'}>
                  📅 Agendamentos
                </MobileNavLink>
                <MobileNavLink href="/explore/therapists" active={pathname === '/explore/therapists'}>
                  🔍 Explorar
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

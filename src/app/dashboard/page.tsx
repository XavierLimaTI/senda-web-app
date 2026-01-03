import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import SignOutButton from "@/components/SignOutButton"
import { Calendar, Stethoscope, Clock, DollarSign, Search, Settings, Lock } from 'lucide-react'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/auth/signin')

  const therapistLinks = [
    { href: '/dashboard/therapist/bookings', label: 'Meus Agendamentos', description: 'Gerenciar sessões', icon: Calendar },
    { href: '/dashboard/therapist/services', label: 'Meus Serviços', description: 'CRUD de serviços', icon: Stethoscope },
    { href: '/dashboard/therapist/availability', label: 'Disponibilidade', description: 'Configurar horários', icon: Clock },
    { href: '/dashboard/therapist/revenue', label: 'Receitas', description: 'Ver ganhos e repasses', icon: DollarSign },
  ]

  const clientLinks = [
    { href: '/client/bookings', label: 'Meus Agendamentos', description: 'Ver e gerenciar sessões', icon: Calendar },
    { href: '/explore/therapists', label: 'Explorar Terapeutas', description: 'Encontrar profissionais', icon: Search },
  ]

  const links = session.user.role === 'THERAPIST' ? therapistLinks : 
                session.user.role === 'CLIENT' ? clientLinks : []

  return (
    <main className="min-h-screen bg-[#F0EBE3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo, <strong>{session?.user?.name}</strong></p>
            <p className="text-sm text-gray-500">
              {session?.user?.email} • {
                session?.user?.role === 'THERAPIST' ? 'Terapeuta' :
                session?.user?.role === 'CLIENT' ? 'Cliente' :
                session?.user?.role === 'SPACE' ? 'Espaço Terapêutico' :
                'Admin'
              }
            </p>
          </div>

          {/* Links de navegação */}
          {links.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Acesso Rápido</h2>
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

          {/* Configurações */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Configurações</h2>
            </div>
            <Link
              href="/dashboard/settings/privacy"
              className="block p-4 border-2 border-blue-200 bg-blue-50 rounded-lg hover:border-[#B2B8A3] hover:bg-[#F0EBE3] transition-all group"
            >
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 group-hover:text-[#B2B8A3] transition-colors">
                    Privacidade e Dados
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Gerencie seus dados conforme a LGPD (exportar, deletar, consentimentos)
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


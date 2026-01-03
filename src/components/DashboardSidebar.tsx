'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarLink {
  href: string
  icon: string
  label: string
  badge?: number
}

interface DashboardSidebarProps {
  links: SidebarLink[]
}

export default function DashboardSidebar({ links }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden lg:block">
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#F0EBE3] text-[#B2B8A3] font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="flex-1">{link.label}</span>
              {link.badge !== undefined && link.badge > 0 && (
                <span className="px-2 py-1 bg-[#D99A8B] text-white text-xs font-bold rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Quick Stats ou Info adicional */}
      <div className="p-4 bg-[#F0EBE3] rounded-lg">
        <p className="text-xs font-medium text-gray-600 mb-1">💡 Dica</p>
        <p className="text-sm text-gray-700">
          Mantenha seus horários atualizados para facilitar agendamentos.
        </p>
      </div>
    </aside>
  )
}

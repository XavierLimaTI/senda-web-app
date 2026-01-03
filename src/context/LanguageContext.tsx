'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'pt' | 'en' | 'es' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Dicionário de traduções
const translations = {
  pt: {
    // Navbar
    'navbar.home': 'Início',
    'navbar.bookings': 'Agendamentos',
    'navbar.services': 'Serviços',
    'navbar.availability': 'Horários',
    'navbar.revenue': 'Receitas',
    'navbar.explore': 'Explorar',
    'navbar.therapies': 'Terapias',
    'navbar.favorites': 'Favoritos',
    'navbar.dashboard': 'Dashboard',
    'navbar.approvals': 'Aprovações',
    'navbar.users': 'Usuários',
    'navbar.bookings_admin': 'Agendamentos',
    'navbar.news': 'Notícias',
    'navbar.logout': 'Sair',
    'navbar.profile': 'Meu Perfil',
    // Dashboard Admin
    'admin.dashboard_title': 'Dashboard Administrativo',
    'admin.total_users': 'Total de Usuários',
    'admin.therapists': 'Terapeutas',
    'admin.clients': 'Clientes',
    'admin.spaces': 'Espaços',
    'admin.pending_therapists': 'Terapeutas Pendentes',
    'admin.total_bookings': 'Total de Agendamentos',
    'admin.total_revenue': 'Receita Total',
    // Genérico
    'common.search': 'Buscar...',
    'common.filter': 'Filtrar',
    'common.delete': 'Deletar',
    'common.edit': 'Editar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro ao carregar dados',
  },
  en: {
    // Navbar
    'navbar.home': 'Home',
    'navbar.bookings': 'Bookings',
    'navbar.services': 'Services',
    'navbar.availability': 'Availability',
    'navbar.revenue': 'Revenue',
    'navbar.explore': 'Explore',
    'navbar.therapies': 'Therapies',
    'navbar.favorites': 'Favorites',
    'navbar.dashboard': 'Dashboard',
    'navbar.approvals': 'Approvals',
    'navbar.users': 'Users',
    'navbar.bookings_admin': 'Bookings',
    'navbar.news': 'News',
    'navbar.logout': 'Logout',
    'navbar.profile': 'My Profile',
    // Dashboard Admin
    'admin.dashboard_title': 'Admin Dashboard',
    'admin.total_users': 'Total Users',
    'admin.therapists': 'Therapists',
    'admin.clients': 'Clients',
    'admin.spaces': 'Spaces',
    'admin.pending_therapists': 'Pending Therapists',
    'admin.total_bookings': 'Total Bookings',
    'admin.total_revenue': 'Total Revenue',
    // Genérico
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Error loading data',
  },
  es: {
    // Navbar
    'navbar.home': 'Inicio',
    'navbar.bookings': 'Reservas',
    'navbar.services': 'Servicios',
    'navbar.availability': 'Disponibilidad',
    'navbar.revenue': 'Ingresos',
    'navbar.explore': 'Explorar',
    'navbar.therapies': 'Terapias',
    'navbar.favorites': 'Favoritos',
    'navbar.dashboard': 'Panel de Control',
    'navbar.approvals': 'Aprobaciones',
    'navbar.users': 'Usuarios',
    'navbar.bookings_admin': 'Reservas',
    'navbar.news': 'Noticias',
    'navbar.logout': 'Cerrar Sesión',
    'navbar.profile': 'Mi Perfil',
    // Dashboard Admin
    'admin.dashboard_title': 'Panel de Administración',
    'admin.total_users': 'Total de Usuarios',
    'admin.therapists': 'Terapeutas',
    'admin.clients': 'Clientes',
    'admin.spaces': 'Espacios',
    'admin.pending_therapists': 'Terapeutas Pendientes',
    'admin.total_bookings': 'Total de Reservas',
    'admin.total_revenue': 'Ingresos Totales',
    // Genérico
    'common.search': 'Buscar...',
    'common.filter': 'Filtrar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Cargando...',
    'common.error': 'Error al cargar datos',
  },
  zh: {
    // Navbar
    'navbar.home': '首页',
    'navbar.bookings': '预订',
    'navbar.services': '服务',
    'navbar.availability': '可用性',
    'navbar.revenue': '收入',
    'navbar.explore': '探索',
    'navbar.therapies': '疗法',
    'navbar.favorites': '收藏',
    'navbar.dashboard': '仪表板',
    'navbar.approvals': '批准',
    'navbar.users': '用户',
    'navbar.bookings_admin': '预订',
    'navbar.news': '新闻',
    'navbar.logout': '退出登录',
    'navbar.profile': '我的资料',
    // Dashboard Admin
    'admin.dashboard_title': '管理仪表板',
    'admin.total_users': '用户总数',
    'admin.therapists': '治疗师',
    'admin.clients': '客户端',
    'admin.spaces': '空间',
    'admin.pending_therapists': '待审批治疗师',
    'admin.total_bookings': '总预订数',
    'admin.total_revenue': '总收入',
    // Genérico
    'common.search': '搜索...',
    'common.filter': '筛选',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.loading': '加载中...',
    'common.error': '加载数据出错',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt')
  const [mounted, setMounted] = useState(false)

  // Carregar idioma salvo do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && Object.keys(translations).includes(saved)) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let current: any = translations[language]
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k]
      } else {
        return key // Retorna a chave se não encontrar
      }
    }
    
    return typeof current === 'string' ? current : key
  }

  if (!mounted) return <>{children}</> // Evitar hydration mismatch

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  }
  return context
}

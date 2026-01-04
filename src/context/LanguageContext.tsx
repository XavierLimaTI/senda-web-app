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
    'navbar.reports': 'Relatórios',
    'navbar.reviews': 'Avaliações',
    'navbar.payments': 'Pagamentos',
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
    // News
    'news.title': 'Notícias',
    'news.new_article': 'Nova Notícia',
    'news.edit_article': 'Editar Artigo',
    'news.no_articles': 'Nenhuma notícia publicada',
    'news.create_first': 'Criar primeira notícia',
    'news.title_field': 'Título',
    'news.slug_field': 'URL Amigável (Slug)',
    'news.description_field': 'Descrição (Resumo)',
    'news.content_field': 'Conteúdo',
    'news.thumbnail_field': 'URL da Imagem de Capa',
    'news.published': 'Publicado',
    'news.draft': 'Rascunho',
    'news.featured': 'Destaque',
    'news.mark_featured': 'Marcar como destaque',
    'news.save_article': 'Salvar Artigo',
    'news.saving': 'Salvando...',
    'news.delete_confirm': 'Tem certeza que deseja deletar',
    // Reports
    'reports.title': 'Relatórios & Análises',
    'reports.subtitle': 'Visão geral de desempenho e estatísticas da plataforma',
    'reports.total_users': 'Total de Usuários',
    'reports.clients': 'Clientes',
    'reports.therapists': 'Terapeutas',
    'reports.bookings': 'Agendamentos',
    'reports.revenue_30d': 'Receita (30d)',
    'reports.bookings_by_day': 'Agendamentos por Dia (últimos 30 dias)',
    'reports.users_distribution': 'Distribuição de Usuários por Tipo',
    'reports.top_therapists': 'Top 5 Terapeutas por Agendamentos',
    'reports.no_bookings': 'Nenhum agendamento registrado',
    // Reviews
    'reviews.title': 'Avaliações & Reviews',
    'reviews.subtitle': 'Moderação de avaliações dos clientes sobre terapeutas',
    'reviews.total_reviews': 'Total de Avaliações',
    'reviews.avg_rating': 'Classificação Média',
    'reviews.distribution': 'Distribuição de Votos',
    'reviews.all': 'Todos',
    'reviews.flagged': 'Reportado',
    'reviews.approved': 'Aprovado',
    'reviews.no_reviews': 'Nenhuma avaliação disponível',
    'reviews.flag': 'Marcar como Problemático',
    'reviews.approve': 'Aprovar',
    'reviews.delete': 'Deletar',
    'reviews.delete_confirm': 'Tem certeza que deseja deletar este review?',
    // Payments
    'payments.title': 'Pagamentos',
    'payments.subtitle': 'Gerenciamento de transações e reembolsos',
    'payments.total_transactions': 'Total em Transações',
    'payments.pending': 'Pendentes',
    'payments.refunded': 'Reembolsados',
    'payments.success_rate': 'Taxa de Sucesso',
    'payments.completed': 'Concluído',
    'payments.failed': 'Falhou',
    'payments.search_placeholder': 'Buscar por terapeuta, cliente ou transação...',
    'payments.all': 'Todos',
    'payments.transaction': 'Transação',
    'payments.therapist_client': 'Terapeuta / Cliente',
    'payments.amount': 'Valor',
    'payments.status': 'Status',
    'payments.date': 'Data',
    'payments.actions': 'Ações',
    'payments.refund': 'Reembolsar',
    'payments.processing': 'Processando...',
    'payments.no_transactions': 'Nenhuma transação registrada',
    'payments.refund_confirm': 'Tem certeza que deseja reembolsar',
    // Genérico
    'common.search': 'Buscar...',
    'common.filter': 'Filtrar',
    'common.delete': 'Deletar',
    'common.edit': 'Editar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Carregando...',
    'common.error': 'Erro ao carregar dados',
    'common.by': 'Por',
    'common.client': 'Cliente',
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
    'navbar.reports': 'Reports',
    'navbar.reviews': 'Reviews',
    'navbar.payments': 'Payments',
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
    // News
    'news.title': 'News',
    'news.new_article': 'New Article',
    'news.edit_article': 'Edit Article',
    'news.no_articles': 'No articles published',
    'news.create_first': 'Create first article',
    'news.title_field': 'Title',
    'news.slug_field': 'URL Slug',
    'news.description_field': 'Description (Summary)',
    'news.content_field': 'Content',
    'news.thumbnail_field': 'Cover Image URL',
    'news.published': 'Published',
    'news.draft': 'Draft',
    'news.featured': 'Featured',
    'news.mark_featured': 'Mark as featured',
    'news.save_article': 'Save Article',
    'news.saving': 'Saving...',
    'news.delete_confirm': 'Are you sure you want to delete',
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Platform performance overview and statistics',
    'reports.total_users': 'Total Users',
    'reports.clients': 'Clients',
    'reports.therapists': 'Therapists',
    'reports.bookings': 'Bookings',
    'reports.revenue_30d': 'Revenue (30d)',
    'reports.bookings_by_day': 'Bookings by Day (last 30 days)',
    'reports.users_distribution': 'User Distribution by Type',
    'reports.top_therapists': 'Top 5 Therapists by Bookings',
    'reports.no_bookings': 'No bookings recorded',
    // Reviews
    'reviews.title': 'Reviews & Ratings',
    'reviews.subtitle': 'Moderation of client reviews about therapists',
    'reviews.total_reviews': 'Total Reviews',
    'reviews.avg_rating': 'Average Rating',
    'reviews.distribution': 'Vote Distribution',
    'reviews.all': 'All',
    'reviews.flagged': 'Flagged',
    'reviews.approved': 'Approved',
    'reviews.no_reviews': 'No reviews available',
    'reviews.flag': 'Flag as Problematic',
    'reviews.approve': 'Approve',
    'reviews.delete': 'Delete',
    'reviews.delete_confirm': 'Are you sure you want to delete this review?',
    // Payments
    'payments.title': 'Payments',
    'payments.subtitle': 'Transaction and refund management',
    'payments.total_transactions': 'Total Transactions',
    'payments.pending': 'Pending',
    'payments.refunded': 'Refunded',
    'payments.success_rate': 'Success Rate',
    'payments.completed': 'Completed',
    'payments.failed': 'Failed',
    'payments.search_placeholder': 'Search by therapist, client or transaction...',
    'payments.all': 'All',
    'payments.transaction': 'Transaction',
    'payments.therapist_client': 'Therapist / Client',
    'payments.amount': 'Amount',
    'payments.status': 'Status',
    'payments.date': 'Date',
    'payments.actions': 'Actions',
    'payments.refund': 'Refund',
    'payments.processing': 'Processing...',
    'payments.no_transactions': 'No transactions recorded',
    'payments.refund_confirm': 'Are you sure you want to refund',
    // Common
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Error loading data',
    'common.by': 'By',
    'common.client': 'Client',
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
    'navbar.reports': 'Informes',
    'navbar.reviews': 'Reseñas',
    'navbar.payments': 'Pagos',
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
    // News
    'news.title': 'Noticias',
    'news.new_article': 'Nuevo Artículo',
    'news.edit_article': 'Editar Artículo',
    'news.no_articles': 'No hay artículos publicados',
    'news.create_first': 'Crear primer artículo',
    'news.title_field': 'Título',
    'news.slug_field': 'URL Amigable',
    'news.description_field': 'Descripción (Resumen)',
    'news.content_field': 'Contenido',
    'news.thumbnail_field': 'URL de Imagen de Portada',
    'news.published': 'Publicado',
    'news.draft': 'Borrador',
    'news.featured': 'Destacado',
    'news.mark_featured': 'Marcar como destacado',
    'news.save_article': 'Guardar Artículo',
    'news.saving': 'Guardando...',
    'news.delete_confirm': '¿Estás seguro de que deseas eliminar',
    // Reports
    'reports.title': 'Informes y Análisis',
    'reports.subtitle': 'Resumen de rendimiento y estadísticas de la plataforma',
    'reports.total_users': 'Total de Usuarios',
    'reports.clients': 'Clientes',
    'reports.therapists': 'Terapeutas',
    'reports.bookings': 'Reservas',
    'reports.revenue_30d': 'Ingresos (30d)',
    'reports.bookings_by_day': 'Reservas por Día (últimos 30 días)',
    'reports.users_distribution': 'Distribución de Usuarios por Tipo',
    'reports.top_therapists': 'Top 5 Terapeutas por Reservas',
    'reports.no_bookings': 'No hay reservas registradas',
    // Reviews
    'reviews.title': 'Reseñas y Calificaciones',
    'reviews.subtitle': 'Moderación de reseñas de clientes sobre terapeutas',
    'reviews.total_reviews': 'Total de Reseñas',
    'reviews.avg_rating': 'Calificación Promedio',
    'reviews.distribution': 'Distribución de Votos',
    'reviews.all': 'Todas',
    'reviews.flagged': 'Reportadas',
    'reviews.approved': 'Aprobadas',
    'reviews.no_reviews': 'No hay reseñas disponibles',
    'reviews.flag': 'Marcar como Problemática',
    'reviews.approve': 'Aprobar',
    'reviews.delete': 'Eliminar',
    'reviews.delete_confirm': '¿Estás seguro de que deseas eliminar esta reseña?',
    // Payments
    'payments.title': 'Pagos',
    'payments.subtitle': 'Gestión de transacciones y reembolsos',
    'payments.total_transactions': 'Total en Transacciones',
    'payments.pending': 'Pendientes',
    'payments.refunded': 'Reembolsados',
    'payments.success_rate': 'Tasa de Éxito',
    'payments.completed': 'Completado',
    'payments.failed': 'Fallido',
    'payments.search_placeholder': 'Buscar por terapeuta, cliente o transacción...',
    'payments.all': 'Todos',
    'payments.transaction': 'Transacción',
    'payments.therapist_client': 'Terapeuta / Cliente',
    'payments.amount': 'Monto',
    'payments.status': 'Estado',
    'payments.date': 'Fecha',
    'payments.actions': 'Acciones',
    'payments.refund': 'Reembolsar',
    'payments.processing': 'Procesando...',
    'payments.no_transactions': 'No hay transacciones registradas',
    'payments.refund_confirm': '¿Estás seguro de que deseas reembolsar',
    // Common
    'common.search': 'Buscar...',
    'common.filter': 'Filtrar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Cargando...',
    'common.error': 'Error al cargar datos',
    'common.by': 'Por',
    'common.client': 'Cliente',
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
    'navbar.reports': '报告',
    'navbar.reviews': '评论',
    'navbar.payments': '支付',
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
    // News
    'news.title': '新闻',
    'news.new_article': '新文章',
    'news.edit_article': '编辑文章',
    'news.no_articles': '没有已发布的文章',
    'news.create_first': '创建第一篇文章',
    'news.title_field': '标题',
    'news.slug_field': 'URL别名',
    'news.description_field': '描述（摘要）',
    'news.content_field': '内容',
    'news.thumbnail_field': '封面图片网址',
    'news.published': '已发布',
    'news.draft': '草稿',
    'news.featured': '精选',
    'news.mark_featured': '标记为精选',
    'news.save_article': '保存文章',
    'news.saving': '保存中...',
    'news.delete_confirm': '您确定要删除',
    // Reports
    'reports.title': '报告与分析',
    'reports.subtitle': '平台性能概览和统计数据',
    'reports.total_users': '用户总数',
    'reports.clients': '客户',
    'reports.therapists': '治疗师',
    'reports.bookings': '预订',
    'reports.revenue_30d': '收入（30天）',
    'reports.bookings_by_day': '每日预订（最近30天）',
    'reports.users_distribution': '按类型的用户分布',
    'reports.top_therapists': '预订量前5名治疗师',
    'reports.no_bookings': '没有记录的预订',
    // Reviews
    'reviews.title': '评论与评分',
    'reviews.subtitle': '客户对治疗师的评论审核',
    'reviews.total_reviews': '总评论数',
    'reviews.avg_rating': '平均评分',
    'reviews.distribution': '投票分布',
    'reviews.all': '全部',
    'reviews.flagged': '已举报',
    'reviews.approved': '已批准',
    'reviews.no_reviews': '没有可用的评论',
    'reviews.flag': '标记为问题',
    'reviews.approve': '批准',
    'reviews.delete': '删除',
    'reviews.delete_confirm': '您确定要删除此评论吗？',
    // Payments
    'payments.title': '支付',
    'payments.subtitle': '交易和退款管理',
    'payments.total_transactions': '交易总额',
    'payments.pending': '待处理',
    'payments.refunded': '已退款',
    'payments.success_rate': '成功率',
    'payments.completed': '已完成',
    'payments.failed': '失败',
    'payments.search_placeholder': '按治疗师、客户或交易搜索...',
    'payments.all': '全部',
    'payments.transaction': '交易',
    'payments.therapist_client': '治疗师/客户',
    'payments.amount': '金额',
    'payments.status': '状态',
    'payments.date': '日期',
    'payments.actions': '操作',
    'payments.refund': '退款',
    'payments.processing': '处理中...',
    'payments.no_transactions': '没有记录的交易',
    'payments.refund_confirm': '您确定要退款',
    // Common
    'common.search': '搜索...',
    'common.filter': '筛选',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.loading': '加载中...',
    'common.error': '加载数据出错',
    'common.by': '由',
    'common.client': '客户',
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
    // Fallback para português como padrão
    console.warn('LanguageContext não inicializado, usando fallback português')
    return {
      language: 'pt' as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    }
  }
  return context
}

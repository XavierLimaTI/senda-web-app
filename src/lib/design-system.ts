/**
 * 🎨 SENDA DESIGN SYSTEM
 * 
 * Sistema de design consistente para todo o aplicativo.
 * Inspirado em plataformas de bem-estar como Headspace, Calm, BetterHelp e Talkspace.
 */

// ═══════════════════════════════════════════════════════════════
// 🎨 CORES
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  // Cores primárias
  primary: {
    salvia: '#B2B8A3',      // Verde salvia - calmo, natural
    salviaHover: '#9da390', // Hover state
    salviaLight: '#E8EDE7', // Background claro
  },
  
  // Cores de destaque
  accent: {
    dourado: '#C8963E',     // Dourado - premium, confiança
    douradoHover: '#B8863E',
    terracota: '#D99A8B',   // Terracota - acolhedor
    terracotaHover: '#C8876F',
  },
  
  // Backgrounds
  background: {
    areia: '#F0EBE3',       // Fundo principal - suave, caloroso
    cream: '#FFFBF7',       // Cards
    white: '#FFFFFF',
  },
  
  // Textos
  text: {
    primary: '#2C3E2D',     // Texto principal - escuro natural
    secondary: '#6b705c',   // Texto secundário
    muted: '#999999',       // Texto desabilitado
    light: '#CCCCCC',       // Texto muito claro
  },
  
  // Estados
  state: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // Bordas
  border: {
    light: '#E0E0E0',
    default: '#D3D3D3',
    dark: '#999999',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 📏 ESPAÇAMENTOS
// ═══════════════════════════════════════════════════════════════

export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const

// ═══════════════════════════════════════════════════════════════
// 🔤 TIPOGRAFIA
// ═══════════════════════════════════════════════════════════════

export const TYPOGRAPHY = {
  fonts: {
    serif: 'Lora, Georgia, serif',
    sans: 'DM Sans, system-ui, sans-serif',
  },
  
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeights: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 📐 BORDAS E SOMBRAS
// ═══════════════════════════════════════════════════════════════

export const BORDERS = {
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  width: {
    thin: '1px',
    default: '2px',
    thick: '4px',
  }
} as const

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const

// ═══════════════════════════════════════════════════════════════
// 🎬 ANIMAÇÕES
// ═══════════════════════════════════════════════════════════════

export const ANIMATIONS = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 📱 BREAKPOINTS
// ═══════════════════════════════════════════════════════════════

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ═══════════════════════════════════════════════════════════════
// 🧩 COMPONENTES REUTILIZÁVEIS (Classes Tailwind)
// ═══════════════════════════════════════════════════════════════

export const COMPONENT_STYLES = {
  // Buttons
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'bg-salvia text-white hover:bg-[#9da390] focus:ring-salvia',
    secondary: 'bg-dourado text-white hover:bg-[#B8863E] focus:ring-dourado',
    outline: 'border-2 border-salvia text-salvia hover:bg-salvia hover:text-white',
    ghost: 'text-salvia hover:bg-areia',
    destructive: 'bg-terracota text-white hover:bg-[#C8876F] focus:ring-terracota',
    
    sizes: {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-6 py-2.5 text-base rounded-xl',
      lg: 'px-8 py-3.5 text-lg rounded-xl',
      xl: 'px-10 py-4 text-xl rounded-2xl',
    }
  },
  
  // Cards
  card: {
    base: 'bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300',
    hover: 'hover:shadow-xl hover:-translate-y-1',
    bordered: 'border border-gray-200',
  },
  
  // Inputs
  input: {
    base: 'w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-salvia focus:border-salvia transition-all',
    error: 'border-terracota focus:ring-terracota focus:border-terracota',
    disabled: 'bg-gray-100 cursor-not-allowed opacity-60',
  },
  
  // Badges
  badge: {
    base: 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-[#E8EDE7] text-[#2C3E2D]',
  },
  
  // Container
  container: {
    base: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 🎯 Z-INDEX LAYERS
// ═══════════════════════════════════════════════════════════════

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
  max: 9999,
} as const

// ═══════════════════════════════════════════════════════════════
// 🌐 PADRÕES DE UX
// ═══════════════════════════════════════════════════════════════

export const UX_PATTERNS = {
  // Timeouts e delays recomendados
  timeout: {
    toast: 5000,        // 5 segundos para notificações
    debounce: 300,      // 300ms para inputs de busca
    animation: 300,     // 300ms para animações
  },
  
  // Limites de conteúdo
  limits: {
    cardTitleLines: 2,
    cardDescLines: 3,
    itemsPerPage: 12,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  
  // Mensagens padrão
  messages: {
    loading: 'Carregando...',
    error: 'Ops! Algo deu errado. Tente novamente.',
    success: 'Operação realizada com sucesso!',
    noResults: 'Nenhum resultado encontrado.',
    emptyState: 'Nada para mostrar ainda.',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 📸 ASSETS E PLACEHOLDERS
// ═══════════════════════════════════════════════════════════════

export const ASSETS = {
  placeholders: {
    avatar: '/assets/default-avatar.png',
    therapy: '/assets/default-therapy.jpg',
    background: '/assets/default-bg.jpg',
  },
  
  logos: {
    main: '/assets/senda-logo.svg',
    icon: '/assets/senda-icon.svg',
    white: '/assets/senda-logo-white.svg',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 📊 ACESSIBILIDADE
// ═══════════════════════════════════════════════════════════════

export const ACCESSIBILITY = {
  ariaLabels: {
    menu: 'Menu de navegação',
    search: 'Buscar',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    loading: 'Carregando',
  },
  
  focusVisible: 'focus-visible:ring-2 focus-visible:ring-salvia focus-visible:ring-offset-2',
} as const

// ═══════════════════════════════════════════════════════════════
// 🎨 TEMAS (para futuro dark mode)
// ═══════════════════════════════════════════════════════════════

export const THEMES = {
  light: {
    background: COLORS.background.areia,
    surface: COLORS.background.white,
    text: COLORS.text.primary,
    textSecondary: COLORS.text.secondary,
  },
  
  dark: {
    background: '#1A1A1A',
    surface: '#2C2C2C',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
  }
} as const

// ═══════════════════════════════════════════════════════════════
// 🔗 UTILS
// ═══════════════════════════════════════════════════════════════

/**
 * Combina classes CSS com segurança
 */
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Obtém classe de cor com opacidade
 */
export const withOpacity = (color: string, opacity: number) => {
  return `${color}/${Math.round(opacity * 100)}`
}

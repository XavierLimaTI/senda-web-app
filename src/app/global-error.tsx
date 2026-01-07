'use client'

import * as Sentry from '@sentry/nextjs'

// Translation map for global error (context not available at this level)
const errorTranslations = {
  pt: { title: 'Algo deu errado', subtitle: 'Desculpe, ocorreu um erro inesperado.', retry: 'Tentar novamente' },
  en: { title: 'Something went wrong', subtitle: 'Sorry, an unexpected error occurred.', retry: 'Try again' },
  es: { title: 'Algo salió mal', subtitle: 'Lo sentimos, ocurrió un error inesperado.', retry: 'Intentar de nuevo' },
  zh: { title: '出了点问题', subtitle: '抱歉，发生了意外错误。', retry: '重试' },
}

function getLanguage(): 'pt' | 'en' | 'es' | 'zh' {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language')
    if (stored && ['pt', 'en', 'es', 'zh'].includes(stored)) {
      return stored as 'pt' | 'en' | 'es' | 'zh'
    }
  }
  return 'pt'
}

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  Sentry.captureException(error)
  const lang = getLanguage()
  const t = errorTranslations[lang]
  
  return (
    <html>
      <body>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <button
            onClick={reset}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#B2B8A3',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            {t.retry}
          </button>
        </div>
      </body>
    </html>
  )
}

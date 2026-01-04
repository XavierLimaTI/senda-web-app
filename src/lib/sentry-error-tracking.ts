/**
 * Error Tracking and Monitoring Hook
 * Integra com Sentry para capturar exceções em tempo real
 */

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export function useSentryErrorTracking() {
  useEffect(() => {
    // Capturar erros não tratados
    const handleError = (event: ErrorEvent) => {
      Sentry.captureException(event.error)
    }

    // Capturar promise rejections não tratadas
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      Sentry.captureException(event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
}

// Export Sentry functions for use in components
export const captureException = Sentry.captureException
export const captureMessage = Sentry.captureMessage
export const setUser = Sentry.setUser
export const setTag = Sentry.setTag
export const setContext = Sentry.setContext

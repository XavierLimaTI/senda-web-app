/**
 * Sentry Error Tracking Setup
 * 
 * Versão lightweight - apenas logging
 * Para full Sentry: npm install @sentry/nextjs
 */

export interface ErrorContext {
  tags?: Record<string, string>
  extra?: Record<string, any>
  severity?: 'fatal' | 'error' | 'warning' | 'info' | 'debug'
}

class SimpleSentry {
  private dsn: string | null

  constructor(dsn?: string) {
    this.dsn = dsn || process.env.NEXT_PUBLIC_SENTRY_DSN || null
  }

  captureException(error: Error | unknown, context?: ErrorContext) {
    const errorData = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      ...context,
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Sentry:', errorData)
    }

    // Send to Sentry endpoint (quando configurado)
    if (this.dsn) {
      this.sendToSentry(errorData)
    }
  }

  captureMessage(message: string, context?: ErrorContext) {
    const data = {
      message,
      timestamp: new Date().toISOString(),
      ...context,
    }

    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Sentry:', data)
    }

    if (this.dsn) {
      this.sendToSentry(data)
    }
  }

  private async sendToSentry(data: any) {
    try {
      // Este é um placeholder. Para produção, use @sentry/nextjs oficial
      // await fetch(this.dsn, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
    } catch (err) {
      console.error('Failed to send to Sentry:', err)
    }
  }
}

export const Sentry = new SimpleSentry()

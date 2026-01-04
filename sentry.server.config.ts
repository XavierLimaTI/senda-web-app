import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'https://5f4c8b9f1d2e3a4c@o4508029433675776.ingest.us.sentry.io/4508029437821952',
  
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.3 : 1.0,
  
  environment: process.env.NODE_ENV || 'development',
})

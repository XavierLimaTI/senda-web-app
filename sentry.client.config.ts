import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || 'https://5f4c8b9f1d2e3a4c@o4508029433675776.ingest.us.sentry.io/4508029437821952',
  
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.3 : 1.0,
  
  // Capture Replay for 10% of all sessions plus 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  environment: process.env.NODE_ENV || 'development',
  
  // Whitelisting certain errors
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Third party
    /graph\.microsoft\.com/i,
    /connect\.facebook\.net/i,
  ],
})

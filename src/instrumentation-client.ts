import * as Sentry from "@sentry/nextjs";

// Evita init duplicado em dev/hot-reload
declare global {
  // eslint-disable-next-line no-var
  var __SENTRY_INITED__: boolean | undefined
}

if (typeof window !== 'undefined' && !globalThis.__SENTRY_INITED__) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    debug: false,
    enabled: process.env.NODE_ENV === "production",
  })
  globalThis.__SENTRY_INITED__ = true
}

// Necessário para instrumentar navegações no Next.js App Router
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
'use client'

import { useSentryErrorTracking } from '@/lib/sentry-error-tracking'

export function SentryErrorBoundary({ children }: { children: React.ReactNode }) {
  useSentryErrorTracking()
  return <>{children}</>
}

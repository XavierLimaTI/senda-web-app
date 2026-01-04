"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/context/ToastContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { SentryErrorBoundary } from '@/components/SentryErrorBoundary'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <ToastProvider>
          <SentryErrorBoundary>
            {children}
          </SentryErrorBoundary>
        </ToastProvider>
      </LanguageProvider>
    </SessionProvider>
  )
}

"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react'
import Toast from '@/components/Toast'

type ToastOptions = { message: string; type?: 'info' | 'success' | 'error'; duration?: number }
type ToastContextValue = { showToast: (opts: ToastOptions) => void }

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null)

  function showToast(opts: ToastOptions) {
    setToast(opts)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} duration={toast.duration} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastContext

"use client"
import { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  type?: 'info' | 'success' | 'error'
  duration?: number
}

export function Toast({ message, type = 'info', duration = 4000 }: ToastProps) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(t)
  }, [duration])

  if (!visible) return null

  const bg = type === 'success' ? 'bg-green-100 border-green-400 text-green-800' : type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : 'bg-neutral-100 border-neutral-300 text-neutral-800'

  return (
    <div className={`fixed top-6 right-6 z-50 max-w-sm w-full border-l-4 ${bg} shadow-md rounded p-4`} role="status">
      <div className="text-sm">{message}</div>
    </div>
  )
}

export default Toast

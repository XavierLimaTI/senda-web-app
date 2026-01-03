"use client"
import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastProps = {
  message: string
  type?: 'info' | 'success' | 'error' | 'warning'
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = 'info', duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, 300)
  }

  if (!visible) return null

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: AlertCircle
    },
    warning: {
      bg: 'bg-orange-50',
      border: 'border-orange-400',
      text: 'text-orange-800',
      icon: AlertTriangle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: Info
    }
  }

  const style = styles[type]
  const IconComponent = style.icon

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-sm w-full border-l-4 ${style.border} ${style.bg} ${style.text} shadow-lg rounded-lg p-4 transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
      }`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm flex-1 font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast


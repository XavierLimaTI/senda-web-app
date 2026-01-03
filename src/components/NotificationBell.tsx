'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, Calendar, Clock, AlertCircle, X, CheckSquare2 } from 'lucide-react'

interface Notification {
  id: number
  type: string
  title: string
  message: string
  data: string | null
  read: boolean
  createdAt: string
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?unreadOnly=true')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
    }
  }

  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId }),
      })

      if (response.ok) {
        setNotifications(notifications.filter(n => n.id !== notificationId))
        setUnreadCount(Math.max(0, unreadCount - 1))
      }
    } catch (error) {
      console.error('Erro ao marcar como lida:', error)
    }
  }

  const markAllAsRead = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllAsRead: true }),
      })

      if (response.ok) {
        setNotifications([])
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'FAVORITE_AVAILABILITY':
        return <Calendar className="w-5 h-5 text-[#B2B8A3]" />
      case 'BOOKING_REMINDER':
        return <Clock className="w-5 h-5 text-[#C8963E]" />
      default:
        return <AlertCircle className="w-5 h-5 text-[#D99A8B]" />
    }
  }

  return (
    <div className="relative">
      {/* Sino */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Notificações"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        
        {/* Badge de contador */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D99A8B] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20 max-h-96 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-[#F0EBE3]">
              <h3 className="font-semibold text-gray-900">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={isLoading}
                  className="text-xs text-[#B2B8A3] hover:underline flex items-center gap-1"
                >
                  <CheckSquare2 className="w-4 h-4" />
                  Marcar todas
                </button>
              )}
            </div>

            {/* Lista de notificações */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm">Nenhuma notificação nova</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                <Link
                  href="/notifications"
                  className="text-xs text-[#B2B8A3] hover:underline block text-center"
                  onClick={() => setShowDropdown(false)}
                >
                  Ver todas as notificações
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

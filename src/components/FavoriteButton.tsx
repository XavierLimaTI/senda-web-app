'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface FavoriteButtonProps {
  therapistId: number
  initialIsFavorite?: boolean
  onToggle?: (isFavorite: boolean) => void
}

export default function FavoriteButton({ 
  therapistId, 
  initialIsFavorite = false,
  onToggle 
}: FavoriteButtonProps) {
  const { data: session } = useSession()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isLoading, setIsLoading] = useState(false)

  if (!session || session.user.role !== 'CLIENT') {
    return null
  }

  const handleToggle = async () => {
    setIsLoading(true)

    try {
      if (isFavorite) {
        // Remover favorito (precisamos do ID do favorito, então faremos via API)
        const response = await fetch(`/api/favorites/toggle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ therapistId, action: 'remove' }),
        })

        if (!response.ok) {
          throw new Error('Erro ao remover favorito')
        }

        setIsFavorite(false)
        onToggle?.(false)
      } else {
        // Adicionar favorito
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ therapistId }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Erro ao adicionar favorito')
        }

        setIsFavorite(true)
        onToggle?.(true)
      }
    } catch (error: any) {
      console.error('Erro ao alterar favorito:', error)
      alert(error.message || 'Erro ao alterar favorito')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all ${
        isFavorite
          ? 'bg-[#D99A8B] text-white hover:bg-[#c88878]'
          : 'bg-white text-gray-400 hover:text-[#D99A8B] border border-gray-200'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg 
        className="w-5 h-5" 
        fill={isFavorite ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  )
}

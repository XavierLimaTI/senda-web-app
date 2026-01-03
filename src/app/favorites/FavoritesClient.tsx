'use client'

import { useState } from 'react'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'

interface FavoritesClientProps {
  favorites: any[]
}

export default function FavoritesClient({ favorites: initialFavorites }: FavoritesClientProps) {
  const [favorites, setFavorites] = useState(initialFavorites)

  const handleRemoveFavorite = (therapistId: number) => {
    setFavorites(favorites.filter(fav => fav.therapistId !== therapistId))
  }

  const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Meus Favoritos</h1>
          <p className="text-gray-600">Terapeutas que você salvou para agendar depois</p>
        </div>

        {/* Lista de Favoritos */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-serif text-gray-900 mb-2">Nenhum favorito ainda</h2>
            <p className="text-gray-600 mb-6">
              Explore terapeutas e salve seus favoritos clicando no ícone de coração
            </p>
            <Link
              href="/client/gallery"
              className="inline-block px-6 py-3 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
            >
              Explorar Terapeutas
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => {
              const therapist = favorite.therapist
              const user = therapist.user
              const avgRating = calculateAverageRating(therapist.reviews)
              const minPrice = Math.min(...therapist.services.map((s: any) => s.price))

              return (
                <div
                  key={favorite.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Avatar e Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Link href={`/client/therapist/${therapist.id}`} className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#C8963E] to-[#B2B8A3] flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name[0].toUpperCase()
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-gray-900 hover:text-[#B2B8A3] transition-colors">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600">{therapist.specialty}</p>
                        </div>
                      </Link>

                      <FavoriteButton
                        therapistId={therapist.id}
                        initialIsFavorite={true}
                        onToggle={(isFavorite) => {
                          if (!isFavorite) {
                            handleRemoveFavorite(therapist.id)
                          }
                        }}
                      />
                    </div>

                    {/* Rating e Preço */}
                    <div className="flex items-center justify-between mb-4">
                      {therapist.reviews.length > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-5 h-5 text-[#C8963E]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">
                            {avgRating} ({therapist.reviews.length})
                          </span>
                        </div>
                      )}

                      <span className="text-lg font-semibold text-[#C8963E]">
                        A partir de R$ {minPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Serviços */}
                    {therapist.services.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Serviços:</p>
                        <div className="flex flex-wrap gap-2">
                          {therapist.services.slice(0, 2).map((service: any) => (
                            <span
                              key={service.id}
                              className="text-xs px-2 py-1 bg-[#F0EBE3] text-gray-700 rounded-full"
                            >
                              {service.name}
                            </span>
                          ))}
                          {therapist.services.length > 2 && (
                            <span className="text-xs px-2 py-1 text-gray-500">
                              +{therapist.services.length - 2} mais
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Botão Agendar */}
                    <Link
                      href={`/client/therapist/${therapist.id}`}
                      className="block w-full text-center px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
                    >
                      Ver Perfil e Agendar
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import FavoriteButton from '@/components/FavoriteButton'

interface Therapist {
  id: number
  rating: number
  specialty: string | null
  user: {
    name: string
    avatar: string | null
  }
  services: Array<{
    price: number
  }>
}

interface Props {
  therapists: Therapist[]
  userFavorites?: number[]
}

export default function TherapistsGrid({ therapists, userFavorites = [] }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {therapists.map((therapist) => {
        const minPrice = therapist.services[0]?.price || 0

        return (
          <a
            key={therapist.id}
            href={`/therapist/${therapist.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl border border-gray-100
                       transition-all duration-300 transform hover:-translate-y-2 hover:border-[#B2B8A3] group"
          >
            {/* Imagem/Avatar */}
            <div className="relative h-48 bg-gradient-to-br from-[#B2B8A3] to-[#9da390] overflow-hidden">
              {therapist.user.avatar ? (
                <img
                  src={therapist.user.avatar}
                  alt={therapist.user.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl text-white font-serif opacity-60">
                    {therapist.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Overlay rating e favorito */}
              <div className="absolute top-3 left-0 right-0 px-3 flex items-start justify-between">
                <div className="bg-[#C8963E] text-white px-3 py-1.5 rounded-full 
                                flex items-center gap-1 shadow-lg backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-sm">{therapist.rating.toFixed(1)}</span>
                </div>
                
                <div onClick={(e) => e.preventDefault()}>
                  <FavoriteButton 
                    therapistId={therapist.id} 
                    initialIsFavorite={userFavorites.includes(therapist.id)}
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              {/* Nome */}
              <h3 className="text-lg font-serif text-gray-900 font-semibold mb-1 line-clamp-2">
                {therapist.user.name}
              </h3>

              {/* Especialidade */}
              {therapist.specialty && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                  {therapist.specialty.split(',').slice(0, 2).join(', ')}
                </p>
              )}

              {/* Badge de verificado */}
              <div className="mb-3 flex items-center gap-1">
                <svg className="w-4 h-4 text-[#C8963E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-600 font-medium">Verificado</span>
              </div>

              {/* Preço */}
              {minPrice > 0 && (
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">A partir de</p>
                  <p className="text-xl font-serif text-[#B2B8A3] font-semibold">
                    R$ {minPrice.toFixed(2)}
                  </p>
                </div>
              )}

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.location.href = `/therapist/${therapist.id}`
                }}
                className="w-full mt-3 py-2 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                           hover:from-[#9da390] hover:to-[#8a9280] text-white text-sm font-medium rounded-lg
                           transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Ver Perfil
              </button>
            </div>
          </a>
        )
      })}
    </div>
  )
}

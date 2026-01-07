'use client'

import { TherapistProfile, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import FavoriteButton from '@/components/FavoriteButton'

interface Props {
  therapist: TherapistProfile & {
    user: {
      name: string
      avatar: string | null
    }
  }
  therapistId: number
  isFavorite?: boolean
}

export default function TherapistHeader({ therapist, therapistId, isFavorite = false }: Props) {
  const router = useRouter()

  // Galeria de fotos (por enquanto placeholder - será implementado com upload)
  const gallery = therapist.user.avatar ? [therapist.user.avatar] : []

  return (
    <div className="relative bg-gradient-to-br from-[#F0EBE3] to-white border-b-4 border-[#B2B8A3] overflow-hidden">
      {/* Hero com imagem de fundo (se disponível) */}
      {therapist.user.avatar && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src={therapist.user.avatar}
            alt=""
            fill
            sizes="100vw"
            className="object-cover blur-sm"
          />
        </div>
      )}

      <div className="relative max-w-5xl mx-auto px-4 py-12">
        {/* Botão Favorito no canto superior direito */}
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton therapistId={therapistId} initialIsFavorite={isFavorite} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Foto/Avatar */}
          <div className="flex-shrink-0">
            {therapist.user.avatar ? (
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src={therapist.user.avatar}
                  alt={therapist.user.name}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="rounded-full object-cover border-4 border-[#B2B8A3] shadow-lg"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#B2B8A3] to-[#9da390] 
                              flex items-center justify-center border-4 border-[#B2B8A3] shadow-lg">
                <span className="text-4xl text-white font-serif">
                  {therapist.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">
              {therapist.user.name}
            </h1>

            {/* Rating */}
            {therapist.rating > 0 && (
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(therapist.rating)
                          ? 'text-[#C8963E]'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">
                  {therapist.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Especialidades */}
            {therapist.specialty && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {therapist.specialty.split(',').map((spec, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-[#B2B8A3] text-white px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      {spec.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
              <div className="flex items-center gap-2 bg-[#C8963E] bg-opacity-10 px-3 py-2 rounded-lg">
                <svg className="w-5 h-5 text-[#C8963E]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-900">Verificado</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 flex justify-center md:justify-start">
              <button
                onClick={() => router.push(`/booking/${therapistId}`)}
                className="px-8 py-3 bg-gradient-to-r from-[#B2B8A3] to-[#9da390] 
                           hover:from-[#9da390] hover:to-[#8a9280] text-white font-serif text-lg font-semibold
                           rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                           transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Agendar Sessão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

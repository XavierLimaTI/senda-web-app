'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Therapist {
  id: number
  user: {
    name: string
    avatar: string | null
  }
  specialty: string | null
  rating: number
}

export default function FeaturedTherapists() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Buscar terapeutas verificados
    fetch('/api/therapists/featured')
      .then(res => res.json())
      .then(data => {
        setTherapists(data.therapists || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (therapists.length === 0) return
    
    // Rotação automática a cada 3 segundos
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % therapists.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [therapists.length])

  if (loading || therapists.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#B2B8A3] to-[#9da390] shadow-2xl flex items-center justify-center">
        <svg className="w-32 h-32 text-white/20" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
    )
  }

  const current = therapists[currentIndex]

  return (
    <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#B2B8A3] to-[#9da390] shadow-2xl overflow-hidden group">
      {/* Terapeuta em destaque */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
        {/* Avatar */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 mb-4 shadow-xl">
          {current.user.avatar ? (
            <Image
              src={current.user.avatar}
              alt={current.user.name}
              fill
              className="object-cover"
              sizes="160px"
            />
          ) : (
            <div className="w-full h-full bg-white/20 flex items-center justify-center text-6xl font-bold">
              {current.user.name[0]}
            </div>
          )}
          {/* Badge verificado */}
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-[#B2B8A3]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <h4 className="text-2xl font-semibold mb-1 text-center">{current.user.name}</h4>
        {current.specialty && (
          <p className="text-white/80 text-sm mb-2">{current.specialty}</p>
        )}
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(current.rating) ? 'text-yellow-300' : 'text-white/30'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm ml-1">{current.rating.toFixed(1)}</span>
        </div>

        {/* Indicadores */}
        <div className="flex gap-2">
          {therapists.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlay no hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

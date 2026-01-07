'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

interface Therapist {
  id: number
  userId: number
  user: {
    name: string
    avatar: string | null
  }
  specialty: string
  rating: number
  verified: boolean
  services: Array<{
    price: number
  }>
}

interface TherapistsCarouselProps {
  therapists: Therapist[]
}

export default function TherapistsCarousel({ therapists }: TherapistsCarouselProps) {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const itemsPerView = 4

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(therapists.length / itemsPerView))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, therapists.length, itemsPerView])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(therapists.length / itemsPerView)) % Math.ceil(therapists.length / itemsPerView))
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(therapists.length / itemsPerView))
    setIsAutoPlay(false)
  }

  const startIdx = currentIndex * itemsPerView
  const visibleTherapists = therapists.slice(startIdx, startIdx + itemsPerView)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif text-gray-900 dark:text-white">
            {t('carousel.discoverVerified')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t('carousel.subtitle')}
          </p>
        </div>
        <Link
          href="/explore/therapists"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-all duration-300 transform hover:scale-105 dark:bg-[#9da390] dark:hover:bg-[#8a9478]"
        >
          {t('carousel.viewFullGallery')}
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Carrossel */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-800">
        {/* Navegação */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#B2B8A3] text-white hover:bg-[#9da390] transition-all duration-200 transform hover:scale-110 dark:bg-[#9da390] dark:hover:bg-[#8a9478] shadow-lg"
          aria-label={t('carousel.previous')}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#B2B8A3] text-white hover:bg-[#9da390] transition-all duration-200 transform hover:scale-110 dark:bg-[#9da390] dark:hover:bg-[#8a9478] shadow-lg"
          aria-label={t('carousel.next')}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Grid de Terapeutas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {visibleTherapists.map((therapist) => (
            <motion.div
              key={therapist.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/therapist/${therapist.id}`}>
                <div className="bg-gradient-to-br from-[#F0EBE3] to-white dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  {/* Imagem do Terapeuta */}
                  <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-[#B2B8A3] to-[#9da390]">
                    {therapist.user.avatar ? (
                      <Image
                        src={therapist.user.avatar}
                        alt={therapist.user.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-5xl font-serif">
                        {therapist.user.name.charAt(0)}
                      </div>
                    )}

                    {/* Badge Verificado */}
                    {therapist.verified && (
                      <div className="absolute top-3 right-3 bg-[#C8963E] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3 fill-current" />
                        {t('carousel.verified')}
                      </div>
                    )}
                  </div>

                  {/* Informações */}
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-gray-900 dark:text-white group-hover:text-[#B2B8A3] dark:group-hover:text-[#C8963E] transition-colors">
                      {therapist.user.name}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                      {therapist.specialty}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(therapist.rating)
                                ? 'fill-[#C8963E] text-[#C8963E]'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {therapist.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Preço */}
                    {therapist.services.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                        {t('carousel.startingFrom')} <span className="font-medium text-[#B2B8A3]">R$ {(therapist.services[0].price / 100).toFixed(2)}</span>
                      </p>
                    )}

                    {/* CTA Button */}
                    <button className="w-full mt-4 px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-all duration-200 text-sm font-medium dark:bg-[#9da390] dark:hover:bg-[#8a9478]">
                      {t('carousel.viewProfile')}
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Indicadores de Paginação */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(Math.ceil(therapists.length / itemsPerView))].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i)
                setIsAutoPlay(false)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-[#B2B8A3] w-8'
                  : 'bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`${t('carousel.goToPage')} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

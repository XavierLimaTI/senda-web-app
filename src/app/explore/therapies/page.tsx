'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { therapies, categories } from '@/data/therapies'
import { getTherapyImage } from '@/data/therapyImages'
import { ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const ITEMS_PER_PAGE = 9 // 3x3 grid

export default function TherapiesPage() {
  const { language, setLanguage, t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('body')
  const [selectedIndicationTag, setSelectedIndicationTag] = useState<string | null>(null)
  const [expandedTherapy, setExpandedTherapy] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  function TherapyImage({ src, alt }: { src: string; alt: string }) {
    const [currentSrc, setCurrentSrc] = useState(src)
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover hover:scale-105 transition-transform duration-300"
        onError={() => setCurrentSrc('/images/senda/home-client/massage-card.jpg')}
      />
    )
  }

  // Filtrar terapias por categoria e indicação
  const filteredTherapies = useMemo(() => {
    return therapies.filter(therapy => {
      const matchesCategory = therapy.category === selectedCategory
      const matchesIndicationTag = !selectedIndicationTag || therapy.indicationTags.includes(selectedIndicationTag)
      const q = query.trim().toLowerCase()
      const matchesQuery = q.length === 0 || [
        therapy.name[language],
        therapy.description[language],
        ...therapy.indications[language],
        therapy.indicationTags.join(' '),
        therapy.modality,
      ].some(v => v?.toLowerCase().includes(q))
      return matchesCategory && matchesIndicationTag && matchesQuery
    })
  }, [selectedCategory, selectedIndicationTag, query, language])

  // Paginação
  const totalPages = Math.ceil(filteredTherapies.length / ITEMS_PER_PAGE)
  const paginatedTherapies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredTherapies.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredTherapies, currentPage])

  // Reset da página ao mudar filtros
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedIndicationTag, query])

  // Obter tags únicas de indicação da categoria selecionada
  const availableTags = Array.from(
    new Set(
      therapies
        .filter(t => t.category === selectedCategory)
        .flatMap(t => t.indicationTags)
    )
  ).sort()

  const getModalityLabel = (modality: string) => {
    const map = {
      presencial: t('explore.therapies.presencial'),
      online: t('explore.therapies.online'),
      presencial_online: t('explore.therapies.presencial_online')
    }
    return map[modality as keyof typeof map] || modality
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {t('explore.therapies.title')}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t('explore.therapies.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          {/* Unified Search */}
          <div className="mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('explore.therapies.search_placeholder')}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B2B8A3]"
            />
          </div>
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {t('explore.therapies.filter_by_category')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSelectedIndicationTag(null)
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all text-center ${
                    selectedCategory === category.id
                      ? 'bg-[#B2B8A3] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Indication Tag Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {t('explore.therapies.filter_by_indication')}
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedIndicationTag && (
                <button
                  onClick={() => setSelectedIndicationTag(null)}
                  className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  {selectedIndicationTag} ✕
                </button>
              )}
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedIndicationTag(selectedIndicationTag === tag ? null : tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedIndicationTag === tag
                      ? 'bg-[#D99A8B] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count and pagination info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('explore.therapies.showing')} {paginatedTherapies.length} {t('explore.therapies.of')} {filteredTherapies.length} {t('explore.therapies.therapies_count')}
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('explore.therapies.page')} {currentPage} {t('explore.therapies.of')} {totalPages}
            </p>
          )}
        </div>

        {/* Therapies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTherapies.map(therapy => (
            <div
              key={therapy.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <TherapyImage src={getTherapyImage(therapy.id)} alt={therapy.name[language]} />
                <span className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                  {categories.find(c => c.id === therapy.category)?.name[language]}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                  {therapy.name[language]}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {therapy.description[language]}
                </p>

                {/* Modality Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#C8963E] text-white">
                    {getModalityLabel(therapy.modality)}
                  </span>
                </div>

                {/* Expandable Details */}
                <button
                  onClick={() => setExpandedTherapy(expandedTherapy === therapy.id ? null : therapy.id)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg bg-[#F0EBE3] dark:bg-gray-700 hover:bg-[#E5DED5] dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {expandedTherapy === therapy.id ? t('explore.therapies.less_info') : t('explore.therapies.more_info')}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform text-gray-900 dark:text-white ${
                      expandedTherapy === therapy.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedTherapy === therapy.id && (
                  <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Star size={16} className="text-[#D99A8B]" />
                        {t('explore.therapies.indications')}
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {therapy.indications[language].map((indication, idx) => (
                          <li key={idx}>{indication}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {t('explore.therapies.contraindications')}
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {therapy.contraindications[language].map((contra, idx) => (
                          <li key={idx}>{contra}</li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 rounded-lg bg-[#B2B8A3] text-white font-medium hover:bg-[#A0A78F] transition-colors">
                      {t('explore.therapies.find_therapist')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              aria-label={t('explore.therapies.previous_page')}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">{t('explore.therapies.previous')}</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first, last, current, and pages adjacent to current
                  return page === 1 || 
                         page === totalPages || 
                         Math.abs(page - currentPage) <= 1
                })
                .map((page, idx, arr) => {
                  // Add ellipsis if there's a gap
                  const showEllipsisBefore = idx > 0 && arr[idx - 1] !== page - 1

                  return (
                    <div key={page} className="flex items-center">
                      {showEllipsisBefore && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? 'bg-[#B2B8A3] text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
                        }`}
                        aria-label={`${t('explore.therapies.page')} ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    </div>
                  )
                })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              aria-label={t('explore.therapies.next_page')}
            >
              <span className="hidden sm:inline">{t('explore.therapies.next')}</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredTherapies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {t('explore.therapies.no_results')}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('body')
                setSelectedIndicationTag(null)
              }}
              className="px-6 py-2 rounded-lg bg-[#B2B8A3] text-white font-medium hover:bg-[#A0A78F] transition-colors"
            >
              {t('explore.therapies.clear_filters')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useLanguage } from '@/context/LanguageContext'
import TherapistSearchBar from '@/components/TherapistSearchBar'

interface Trail {
  id: number
  title: string
  description: string
  category: string
  duration: number
  coverImage: string | null
  author?: {
    user: {
      name: string
    }
  } | null
}

interface SearchParams {
  q?: string
  specialty?: string
  minRating?: string
  maxPrice?: string
  city?: string
  state?: string
  lat?: string
  lng?: string
  maxDistance?: string
  onlineOnly?: string
}

interface Props {
  featuredTrails: Trail[]
  q?: string
  specialty?: string
  city?: string
  lat?: number
  lng?: number
  maxDistance?: number
  filteredCount: number
  sort: string
  sortOptions: Array<{ value: string; label: string }>
  searchParams: SearchParams
}

export default function TherapistsPageClient({
  featuredTrails,
  q,
  specialty,
  city,
  lat,
  lng,
  maxDistance,
  filteredCount,
  sort,
  sortOptions,
  searchParams
}: Props) {
  const { t } = useLanguage()

  // Build sort URL inside the client component
  const buildSortUrl = (sortOption: string) => {
    const params = new URLSearchParams()
    if (searchParams.q) params.set('q', searchParams.q)
    if (searchParams.specialty) params.set('specialty', searchParams.specialty)
    if (searchParams.minRating) params.set('minRating', searchParams.minRating)
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)
    if (searchParams.city) params.set('city', searchParams.city)
    if (searchParams.state) params.set('state', searchParams.state)
    if (searchParams.lat) params.set('lat', searchParams.lat)
    if (searchParams.lng) params.set('lng', searchParams.lng)
    if (searchParams.maxDistance) params.set('maxDistance', searchParams.maxDistance)
    if (searchParams.onlineOnly) params.set('onlineOnly', searchParams.onlineOnly)
    params.set('sort', sortOption)
    params.set('page', '1')
    return `/explore/therapists?${params.toString()}`
  }

  return (
    <>
      {/* Trilhas de Bem-estar em destaque */}
      {featuredTrails.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{t('explore.therapists.featured_trails')}</h3>
            <a href="/trails" className="text-sm text-[#6b705c] hover:underline">{t('explore.therapists.view_all_trails')}</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTrails.map((trail) => (
              <a key={trail.id} href={`/trails/${trail.id}`} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {trail.coverImage && (
                  <div className="h-36 w-full overflow-hidden bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={trail.coverImage} alt={trail.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 line-clamp-1">{trail.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8EDE7] text-[#6b705c]">{trail.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{trail.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>⏱️ {trail.duration} dias</span>
                    {trail.author?.user?.name && <span>por {trail.author.user.name}</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Barra de Busca Inteligente */}
      <div className="mb-8">
        <TherapistSearchBar />
      </div>

      {/* Info e Contadores */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-gray-900 mb-1">
            {q ? `${t('explore.therapists.results_for')} "${q}"` : t('explore.therapists.verified')}
          </h2>
          <p className="text-gray-600">
            {filteredCount} {t('explore.therapists.found')}
            {specialty && ` ${t('explore.therapists.in')} ${specialty}`}
            {city && ` ${t('explore.therapists.in')} ${city}`}
            {lat && lng && maxDistance && ` ${t('explore.therapists.within')} ${maxDistance}${t('explore.therapists.km')}`}
          </p>
        </div>

        {/* Ordenação rápida */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-gray-600">{t('explore.therapists.sort_label')}</span>
          <div className="flex items-center gap-2">
            {sortOptions.map((option) => (
              <a
                key={option.value}
                href={buildSortUrl(option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                  sort === option.value
                    ? 'bg-[#B2B8A3] border-[#B2B8A3] text-white'
                    : 'border-gray-300 text-gray-700 hover:border-[#B2B8A3] hover:text-[#B2B8A3]'
                }`}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

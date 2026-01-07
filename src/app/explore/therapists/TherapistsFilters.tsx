'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

const SPECIALTIES = [
  'Psicologia',
  'Psicanálise',
  'Terapia Cognitivo-Comportamental',
  'Constelação Familiar',
  'Terapia de Casal',
  'Mindfulness',
  'Meditação',
  'Yoga',
  'Reiki',
  'Acupuntura',
  'Massagem Terapêutica',
  'Fisioterapia',
  'Quiropraxia',
  'Aromaterapia',
  'Homeopatia',
  'Hipnoterapia',
  'Coaching',
  'Reflexologia',
  'Musicoterapia',
  'Arteterapia',
]

const CITY_SUGGESTIONS = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre',
  'Brasília', 'Salvador', 'Fortaleza', 'Recife', 'Florianópolis',
  'Campinas', 'Santos', 'Niterói', 'Vitória', 'Goiânia'
]

export default function TherapistsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  
  const specialty = searchParams.get('specialty') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const minRating = searchParams.get('minRating') || '0'
  const city = searchParams.get('city') || ''
  const sort = searchParams.get('sort') || 'rating'

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset pagination
    router.push(`/explore/therapists?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/explore/therapists')
  }

  const hasFilters = specialty || maxPrice || (minRating !== '0') || city

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
      {/* Especialidades */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">{t('explore.therapists.filter_specialty')}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('specialty', '')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !specialty
                ? 'bg-[#B2B8A3] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('explore.therapists.all')}
          </button>
          {SPECIALTIES.map((spec) => (
            <button
              key={spec}
              onClick={() => updateFilter('specialty', spec)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                specialty === spec
                  ? 'bg-[#B2B8A3] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros Adicionais */}
      <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        {/* Ordenação */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('explore.therapists.sort_label')}
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            value={sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
          >
            <option value="rating">{t('explore.therapists.sort_rating')}</option>
            <option value="price">{t('explore.therapists.sort_price')}</option>
            <option value="recent">{t('explore.therapists.sort_recent')}</option>
          </select>
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('explore.therapists.max_price')}
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
          >
            <option value="">{t('explore.therapists.any_price')}</option>
            <option value="100">{t('explore.therapists.price_100')}</option>
            <option value="150">{t('explore.therapists.price_150')}</option>
            <option value="200">{t('explore.therapists.price_200')}</option>
            <option value="300">{t('explore.therapists.price_300')}</option>
          </select>
        </div>

        {/* Avaliação Mínima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('explore.therapists.min_rating')}
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            value={minRating}
            onChange={(e) => updateFilter('minRating', e.target.value)}
          >
            <option value="0">{t('explore.therapists.rating_all')}</option>
            <option value="3">{t('explore.therapists.rating_3')}</option>
            <option value="4">{t('explore.therapists.rating_4')}</option>
            <option value="4.5">{t('explore.therapists.rating_45')}</option>
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('explore.therapists.city')}
          </label>
          <input
            type="text"
            placeholder={t('explore.therapists.city_placeholder')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            list="city-suggestions"
            defaultValue={city}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateFilter('city', e.currentTarget.value)
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value !== city) {
                updateFilter('city', e.currentTarget.value)
              }
            }}
          />
          <datalist id="city-suggestions">
            {CITY_SUGGESTIONS.map((cityOption) => (
              <option key={cityOption} value={cityOption} />
            ))}
          </datalist>
          <div className="flex flex-wrap gap-2 mt-2">
            {CITY_SUGGESTIONS.slice(0, 8).map((cityOption) => (
              <button
                key={cityOption}
                type="button"
                onClick={() => updateFilter('city', cityOption)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  city === cityOption
                    ? 'bg-[#B2B8A3] text-white border-[#B2B8A3]'
                    : 'border-gray-200 text-gray-700 hover:border-[#B2B8A3] hover:text-[#B2B8A3]'
                }`}
              >
                {cityOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botão Limpar Filtros */}
      {hasFilters && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 text-sm text-[#B2B8A3] hover:text-[#9da390] font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('explore.therapists.clear_filters')}
          </button>
        </div>
      )}
    </div>
  )
}

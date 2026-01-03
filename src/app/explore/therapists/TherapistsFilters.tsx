'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const SPECIALTIES = [
  'Reiki',
  'Acupuntura',
  'Massagem Terapêutica',
  'Psicologia',
  'Coaching',
  'Meditação',
  'Yoga',
  'Reflexologia'
]

export default function TherapistsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
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
        <p className="text-sm font-medium text-gray-700 mb-3">Especialidade:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('specialty', '')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !specialty
                ? 'bg-[#B2B8A3] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas
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
            Ordenar:
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            value={sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
          >
            <option value="rating">Melhor avaliados</option>
            <option value="price">Menor preço</option>
            <option value="recent">Mais recentes</option>
          </select>
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço máximo:
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
          >
            <option value="">Qualquer valor</option>
            <option value="100">Até R$ 100</option>
            <option value="150">Até R$ 150</option>
            <option value="200">Até R$ 200</option>
            <option value="300">Até R$ 300</option>
          </select>
        </div>

        {/* Avaliação Mínima */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avaliação mínima:
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
            value={minRating}
            onChange={(e) => updateFilter('minRating', e.target.value)}
          >
            <option value="0">Todas</option>
            <option value="3">3+ ⭐</option>
            <option value="4">4+ ⭐</option>
            <option value="4.5">4.5+ ⭐</option>
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade:
          </label>
          <input
            type="text"
            placeholder="Ex: São Paulo"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#B2B8A3] focus:ring-1 focus:ring-[#B2B8A3]"
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
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  )
}

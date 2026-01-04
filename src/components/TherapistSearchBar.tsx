'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, X, Loader2, Sparkles } from 'lucide-react'

const SPECIALTIES = [
  'Reiki',
  'Acupuntura',
  'Massagem Terapêutica',
  'Psicologia',
  'Coaching',
  'Meditação',
  'Yoga',
  'Reflexologia',
  'Aromaterapia',
  'Ayurveda',
  'Shiatsu',
  'Quiropraxia'
]

const CITIES = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Brasília',
  'Salvador',
  'Fortaleza',
  'Recife',
  'Florianópolis'
]

export default function TherapistSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || '')
  const [onlineOnly, setOnlineOnly] = useState(searchParams.get('onlineOnly') === 'true')
  const [useLocation, setUseLocation] = useState(false)
  const [gettingLocation, setGettingLocation] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  // Geolocalização
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Seu navegador não suporta geolocalização')
      return
    }

    setGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setUseLocation(true)
        setGettingLocation(false)
      },
      (error) => {
        console.error('Erro ao obter localização:', error)
        alert('Não foi possível obter sua localização. Verifique as permissões.')
        setGettingLocation(false)
      }
    )
  }

  // Executar busca
  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (query) params.set('q', query)
    if (city) params.set('city', city)
    if (specialty) params.set('specialty', specialty)
    if (onlineOnly) params.set('onlineOnly', 'true')
    
    if (useLocation && userLocation) {
      params.set('lat', userLocation.lat.toString())
      params.set('lng', userLocation.lng.toString())
      params.set('maxDistance', '50') // 50km raio padrão
      params.set('sort', 'distance')
    } else {
      params.set('sort', 'rating')
    }

    router.push(`/explore/therapists?${params.toString()}`)
  }

  // Limpar filtros
  const handleClear = () => {
    setQuery('')
    setCity('')
    setSpecialty('')
    setOnlineOnly(false)
    setUseLocation(false)
    setUserLocation(null)
    router.push('/explore/therapists')
  }

  const hasFilters = query || city || specialty || onlineOnly || useLocation

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Hero Search - Destaque */}
      <div className="bg-gradient-to-r from-[#B2B8A3] to-[#9da390] p-8 text-white">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-2xl font-serif">Encontre seu Caminho</h2>
        </div>
        <p className="text-white/90 text-sm mb-6">
          Profissionais verificados prontos para te acompanhar na sua jornada de bem-estar
        </p>

        {/* Busca principal */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Nome do terapeuta, especialidade..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-8 py-3.5 bg-white text-[#B2B8A3] rounded-xl font-medium hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Filtros Avançados */}
      <div className="p-6 space-y-6 bg-[#F0EBE3]/30">
        {/* Localização */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B2B8A3]" />
            Localização
          </p>
          
          <div className="flex gap-3 flex-wrap">
            {/* Seletor de cidade */}
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
                if (e.target.value) {
                  setUseLocation(false)
                }
              }}
              disabled={useLocation}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2B8A3] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Todas as cidades</option>
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Botão de geolocalização */}
            <button
              onClick={handleGetLocation}
              disabled={gettingLocation || useLocation}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                useLocation 
                  ? 'bg-[#B2B8A3] text-white'
                  : 'border border-[#B2B8A3] text-[#B2B8A3] hover:bg-[#B2B8A3] hover:text-white'
              }`}
            >
              {gettingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Obtendo...
                </>
              ) : useLocation ? (
                <>
                  <MapPin className="w-4 h-4" />
                  Perto de mim
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  Usar minha localização
                </>
              )}
            </button>

            {/* Online */}
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={onlineOnly}
                onChange={(e) => setOnlineOnly(e.target.checked)}
                className="w-4 h-4 text-[#B2B8A3] focus:ring-[#B2B8A3] rounded"
              />
              <span className="text-sm font-medium text-gray-700">Apenas online</span>
            </label>
          </div>
        </div>

        {/* Especialidades */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Especialidade:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSpecialty('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !specialty
                  ? 'bg-[#B2B8A3] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Todas
            </button>
            {SPECIALTIES.map(spec => (
              <button
                key={spec}
                onClick={() => setSpecialty(spec)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  specialty === spec
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Botão limpar filtros */}
        {hasFilters && (
          <div className="pt-3 border-t border-gray-200">
            <button
              onClick={handleClear}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
            >
              <X className="w-4 h-4" />
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, X, Loader2, Sparkles } from 'lucide-react'

const SPECIALTIES = [
  'Psicologia',
  'Psicanálise',
  'Terapia Cognitivo-Comportamental',
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
  'Ayurveda',
  'Shiatsu'
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
  'Florianópolis',
  'Campinas',
  'Santos',
  'Niterói',
  'Vitória',
  'Goiânia'
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

  // Live suggestions
  const [openSuggest, setOpenSuggest] = useState(false)
  const [loadingSuggest, setLoadingSuggest] = useState(false)
  const [suggestions, setSuggestions] = useState<{therapists:any[]; therapies:any[]; specialties:string[]; cities:string[]}>({therapists:[], therapies:[], specialties:[], cities:[]})
  const inputRef = useRef<HTMLInputElement | null>(null)

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

  // Debounced suggestions fetch
  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) {
      setSuggestions({therapists:[], therapies:[], specialties:[], cities:[]})
      setLoadingSuggest(false)
      return
    }
    setLoadingSuggest(true)
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setSuggestions(data)
      } catch (e) {
        setSuggestions({therapists:[], therapies:[], specialties:[], cities:[]})
      } finally {
        setLoadingSuggest(false)
      }
    }, 250)
    return () => clearTimeout(id)
  }, [query])

  // Executar busca (com inferência de cidade/especialidade pela query)
  const handleSearch = () => {
    const params = new URLSearchParams()

    // Inferência inteligente
    let inferredCity = city
    let inferredSpecialty = specialty
    const qLower = query.toLowerCase()
    if (!inferredCity) {
      const foundCity = CITIES.find(c => qLower.includes(c.toLowerCase()))
      if (foundCity) inferredCity = foundCity
    }
    if (!inferredSpecialty) {
      const foundSpec = SPECIALTIES.find(s => qLower.includes(s.toLowerCase()))
      if (foundSpec) inferredSpecialty = foundSpec
    }

    if (query) params.set('q', query)
    if (inferredCity) params.set('city', inferredCity)
    if (inferredSpecialty) params.set('specialty', inferredSpecialty)
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
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setOpenSuggest(true)}
              onBlur={() => setTimeout(() => setOpenSuggest(false), 120)}
              placeholder="Busque por local, especialidade, terapeuta..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
            />
            {openSuggest && (
              <div className="absolute mt-2 left-0 right-0 bg-white text-gray-900 rounded-xl shadow-lg border border-gray-200 z-20 max-h-80 overflow-auto">
                {loadingSuggest ? (
                  <div className="p-4 text-sm text-gray-500 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Carregando...</div>
                ) : (
                  <div className="p-2">
                    {/* Therapists */}
                    {suggestions.therapists.length > 0 && (
                      <div className="mb-2">
                        <p className="px-2 py-1 text-xs text-gray-500">Terapeutas</p>
                        {suggestions.therapists.map((t:any) => (
                          <button key={t.id} onMouseDown={() => { setQuery(t.user.name); setSpecialty(t.specialty || ''); setCity(t.city || ''); handleSearch(); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium">{t.user.name}</div>
                            <div className="text-xs text-gray-500">{[t.specialty, t.city].filter(Boolean).join(' • ')}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Therapies */}
                    {suggestions.therapies.length > 0 && (
                      <div className="mb-2">
                        <p className="px-2 py-1 text-xs text-gray-500">Terapias</p>
                        {suggestions.therapies.map((th:any) => (
                          <button key={th.id} onMouseDown={() => { setQuery(th.name.pt); setSpecialty(th.name.pt); handleSearch(); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg">
                            <div className="text-sm">{th.name.pt}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Specialties */}
                    {suggestions.specialties.length > 0 && (
                      <div className="mb-2">
                        <p className="px-2 py-1 text-xs text-gray-500">Especialidades</p>
                        {suggestions.specialties.map((s:string) => (
                          <button key={s} onMouseDown={() => { setQuery(s); setSpecialty(s); handleSearch(); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg">
                            <div className="text-sm">{s}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Cities */}
                    {suggestions.cities.length > 0 && (
                      <div className="mb-1">
                        <p className="px-2 py-1 text-xs text-gray-500">Cidades</p>
                        {suggestions.cities.map((c:string) => (
                          <button key={c} onMouseDown={() => { setQuery(c); setCity(c); handleSearch(); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg">
                            <div className="text-sm">{c}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {suggestions.therapists.length + suggestions.therapies.length + suggestions.specialties.length + suggestions.cities.length === 0 && (
                      <div className="p-3 text-xs text-gray-500">Sem sugestões</div>
                    )}
                  </div>
                )}
              </div>
            )}
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

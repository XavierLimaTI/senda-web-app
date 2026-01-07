import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import TherapistsGrid from './TherapistsGrid'
import TherapistsHeader from './TherapistsHeader'
import TherapistsFilters from './TherapistsFilters'
import TherapistsPageClient from './TherapistsPageClient'
import TherapistsPagination from './TherapistsPagination'
import TherapistsEmptyState from './TherapistsEmptyState'

interface SearchParams {
  q?: string              // Busca textual
  specialty?: string
  minRating?: string
  maxPrice?: string
  city?: string
  state?: string
  lat?: string
  lng?: string
  maxDistance?: string
  onlineOnly?: string
  sort?: 'relevance' | 'rating' | 'price' | 'distance' | 'recent'
  page?: string
}

export default async function TherapistsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const q = searchParams.q || ''
  const specialty = searchParams.specialty || ''
  const minRating = searchParams.minRating ? parseFloat(searchParams.minRating) : 0
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined
  const city = searchParams.city || ''
  const state = searchParams.state || ''
  const lat = searchParams.lat ? parseFloat(searchParams.lat) : undefined
  const lng = searchParams.lng ? parseFloat(searchParams.lng) : undefined
  const maxDistance = searchParams.maxDistance ? parseFloat(searchParams.maxDistance) : undefined
  const onlineOnly = searchParams.onlineOnly === 'true'
  const sort = searchParams.sort || 'rating'
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  // Trilhas em destaque (publicadas)
  const featuredTrails = await prisma.trail.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: {
      author: {
        include: {
          user: { select: { name: true, avatar: true } }
        }
      }
    }
  })

  // Função Haversine para cálculo de distância
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Construir WHERE clause
  const where: any = {
    verified: true,
    rating: { gte: minRating }
  }

  if (city) {
    where.city = { contains: city, mode: 'insensitive' }
  }
  if (state) {
    where.state = { contains: state, mode: 'insensitive' }
  }
  if (onlineOnly) {
    where.onlineAvailable = true
  }

  // Construir orderBy dinâmico
  const orderBy: any = 
    sort === 'rating' ? [{ rating: 'desc' }, { createdAt: 'desc' }] :
    sort === 'price' ? [{ createdAt: 'desc' }] : // Ordenação por preço é client-side
    sort === 'recent' ? [{ createdAt: 'desc' }] :
    sort === 'distance' ? [{ createdAt: 'desc' }] : // Ordenação por distância é client-side
    [{ rating: 'desc' }] // relevance fallback

  // Buscar terapeutas com filtros
  const [therapists, totalCount] = await Promise.all([
    prisma.therapistProfile.findMany({
      where,
      include: {
        user: {
          select: { 
            id: true,
            name: true, 
            avatar: true 
          }
        },
        services: {
          where: { active: true },
          select: { 
            id: true,
            name: true,
            price: true,
            duration: true
          },
          orderBy: { price: 'asc' }
        }
      },
      orderBy,
      take: limit * 3, // Buscar mais para permitir filtros client-side
      skip
    }),
    prisma.therapistProfile.count({ where })
  ])

  // Buscar favoritos do usuário (se logado como cliente)
  const session = await auth()
  let userFavorites: number[] = []
  
  if (session && session.user.role === 'CLIENT') {
    const clientProfile = await prisma.clientProfile.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: {
        favorites: {
          select: { therapistId: true }
        }
      }
    })
    
    if (clientProfile) {
      userFavorites = clientProfile.favorites.map(f => f.therapistId)
    }
  }

  const buildSortUrl = (sortOption: string) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (specialty) params.set('specialty', specialty)
    if (searchParams.minRating) params.set('minRating', searchParams.minRating)
    if (maxPrice) params.set('maxPrice', String(maxPrice))
    if (city) params.set('city', city)
    if (state) params.set('state', state)
    if (lat !== undefined) params.set('lat', String(lat))
    if (lng !== undefined) params.set('lng', String(lng))
    if (maxDistance !== undefined) params.set('maxDistance', String(maxDistance))
    if (onlineOnly) params.set('onlineOnly', 'true')
    params.set('sort', sortOption)
    params.set('page', '1')
    return `/explore/therapists?${params.toString()}`
  }

  const sortOptions = [
    { value: 'rating', label: 'Avaliação' },
    { value: 'price', label: 'Menor preço' },
    ...(lat && lng ? [{ value: 'distance', label: 'Distância' }] : []),
    { value: 'recent', label: 'Mais recentes' },
  ]

  // Processar e filtrar resultados client-side
  let results = therapists.map(t => {
    // Calcular distância
    let distance: number | null = null
    if (lat && lng && t.latitude && t.longitude) {
      distance = calculateDistance(lat, lng, t.latitude, t.longitude)
    }

    // Calcular preço mínimo
    const minPrice = t.services.length > 0 
      ? Math.min(...t.services.map(s => s.price))
      : null

    // Score de relevância para busca textual
    let relevanceScore = 0
    if (q) {
      const query = q.toLowerCase()
      const nameMatch = t.user.name.toLowerCase().includes(query)
      const bioMatch = t.bio?.toLowerCase().includes(query)
      const specialtyMatch = t.specialty?.toLowerCase().includes(query)
      
      relevanceScore = 
        (nameMatch ? 3 : 0) + 
        (specialtyMatch ? 2 : 0) + 
        (bioMatch ? 1 : 0)
    }

    return {
      ...t,
      distance,
      minPrice,
      relevanceScore
    }
  })

  // Filtros client-side
  if (specialty) {
    results = results.filter(t =>
      t.specialty?.toLowerCase().includes(specialty.toLowerCase())
    )
  }

  if (maxPrice) {
    results = results.filter(t =>
      t.minPrice !== null && t.minPrice <= maxPrice
    )
  }

  if (maxDistance && lat && lng) {
    results = results.filter(t =>
      t.distance !== null && t.distance <= maxDistance
    )
  }

  if (q) {
    results = results.filter(t => t.relevanceScore > 0)
  }

  // Ordenação
  if (sort === 'price') {
    results.sort((a, b) => {
      if (a.minPrice === null) return 1
      if (b.minPrice === null) return -1
      return a.minPrice - b.minPrice
    })
  } else if (sort === 'distance' && lat && lng) {
    results.sort((a, b) => {
      if (a.distance === null) return 1
      if (b.distance === null) return -1
      return a.distance - b.distance
    })
  } else if (sort === 'relevance' && q) {
    results.sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  // Paginação client-side
  const filteredTherapists = results.slice(0, limit)
  const totalPages = Math.ceil(results.length / limit)

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <TherapistsHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Client Component with featured trails, search bar, and info */}
        <TherapistsPageClient
          featuredTrails={featuredTrails}
          q={q}
          specialty={specialty}
          city={city}
          lat={lat}
          lng={lng}
          maxDistance={maxDistance}
          filteredCount={filteredTherapists.length}
          sort={sort}
          sortOptions={sortOptions}
          buildSortUrl={buildSortUrl}
        />

        {/* Filtros */}
        <div className="mb-8">
          <TherapistsFilters />
        </div>

        {/* Grid */}
        {filteredTherapists.length > 0 ? (
          <>
            <TherapistsGrid therapists={filteredTherapists} userFavorites={userFavorites} />

            {/* Paginação */}
            <TherapistsPagination 
              page={page} 
              totalPages={totalPages} 
              specialty={specialty} 
            />
          </>
        ) : (
          <TherapistsEmptyState />
        )}
      </div>
    </div>
  )
}


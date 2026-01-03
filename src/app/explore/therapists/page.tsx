import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import TherapistsGrid from './TherapistsGrid'
import TherapistsHeader from './TherapistsHeader'
import TherapistsFilters from './TherapistsFilters'

interface SearchParams {
  specialty?: string
  minRating?: string
  maxPrice?: string
  city?: string
  sort?: 'rating' | 'price' | 'recent'
  page?: string
}

export default async function TherapistsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const specialty = searchParams.specialty || ''
  const minRating = searchParams.minRating ? parseFloat(searchParams.minRating) : 0
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined
  const city = searchParams.city || ''
  const sort = searchParams.sort || 'rating'
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  // Construir orderBy dinâmico
  const orderBy: any = 
    sort === 'rating' ? [{ rating: 'desc' }, { createdAt: 'desc' }] :
    sort === 'recent' ? [{ createdAt: 'desc' }] :
    [{ rating: 'desc' }]

  // Buscar terapeutas com filtros
  const [therapists, totalCount] = await Promise.all([
    prisma.therapistProfile.findMany({
      where: {
        verified: true,
        rating: { gte: minRating },
        ...(city ? { city: { contains: city, mode: 'insensitive' } } : {})
      },
      include: {
        user: {
          select: { name: true, avatar: true }
        },
        services: {
          where: { active: true },
          select: { price: true, name: true },
          orderBy: { price: 'asc' }
        }
      },
      orderBy,
      take: limit,
      skip
    }),
    prisma.therapistProfile.count({
      where: {
        verified: true,
        rating: { gte: minRating },
        ...(city ? { city: { contains: city, mode: 'insensitive' } } : {})
      }
    })
  ])

  // Buscar favoritos do usuário (se logado como cliente)
  const session = await getServerSession(authOptions)
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

  // Filtrar por especialidade e preço client-side
  let filteredTherapists = therapists
  
  if (specialty) {
    filteredTherapists = filteredTherapists.filter((t) =>
      t.specialty?.toLowerCase().includes(specialty.toLowerCase())
    )
  }
  
  if (maxPrice) {
    filteredTherapists = filteredTherapists.filter((t) =>
      t.services.some(s => s.price <= maxPrice)
    )
  }

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <TherapistsHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Info e Contadores */}
        <div className="mb-6">
          <h2 className="text-2xl font-serif text-gray-900 mb-1">
            Encontre seu Terapeuta
          </h2>
          <p className="text-gray-600">
            {filteredTherapists.length} profissionais {specialty ? `de ${specialty}` : 'verificados'}
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <TherapistsFilters />
        </div>

        {/* Grid */}
        {filteredTherapists.length > 0 ? (
          <>
            <TherapistsGrid therapists={filteredTherapists} userFavorites={userFavorites} />

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {page > 1 && (
                  <a
                    href={`/explore/therapists?specialty=${specialty}&page=${page - 1}`}
                    className="px-4 py-2 border border-[#B2B8A3] text-[#B2B8A3] rounded-lg hover:bg-[#B2B8A3] hover:text-white transition-colors"
                  >
                    ← Anterior
                  </a>
                )}

                <div className="text-gray-600">
                  Página {page} de {totalPages}
                </div>

                {page < totalPages && (
                  <a
                    href={`/explore/therapists?specialty=${specialty}&page=${page + 1}`}
                    className="px-4 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
                  >
                    Próxima →
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum terapeuta encontrado</h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou volte em breve
            </p>
            <a
              href="/explore/therapists"
              className="inline-block px-6 py-2 bg-[#B2B8A3] text-white rounded-lg hover:bg-[#9da390] transition-colors"
            >
              Ver Todos
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

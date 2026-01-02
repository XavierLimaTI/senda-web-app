import { prisma } from '@/lib/prisma'
import TherapistsGrid from './TherapistsGrid'
import TherapistsHeader from './TherapistsHeader'

interface SearchParams {
  specialty?: string
  minRating?: string
  page?: string
}

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

export default async function TherapistsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const specialty = searchParams.specialty || ''
  const minRating = searchParams.minRating ? parseFloat(searchParams.minRating) : 0
  const page = parseInt(searchParams.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  // Buscar terapeutas com filtros
  const [therapists, totalCount] = await Promise.all([
    prisma.therapistProfile.findMany({
      where: {
        verified: true,
        rating: { gte: minRating }
      },
      include: {
        user: {
          select: { name: true, avatar: true }
        },
        services: {
          where: { active: true },
          select: { price: true },
          orderBy: { price: 'asc' },
          take: 1
        }
      },
      orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      skip
    }),
    prisma.therapistProfile.count({
      where: {
        verified: true,
        rating: { gte: minRating }
      }
    })
  ])

  // Filtrar por especialidade client-side (case-insensitive)
  let filteredTherapists = therapists
  if (specialty) {
    filteredTherapists = therapists.filter((t) =>
      t.specialty?.toLowerCase().includes(specialty.toLowerCase())
    )
  }

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className="min-h-screen bg-[#F0EBE3]">
      <TherapistsHeader />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filtros e Info */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif text-gray-900 mb-1">
                Encontre seu Terapeuta
              </h2>
              <p className="text-gray-600">
                {totalCount} profissionais verificados disponíveis
              </p>
            </div>
          </div>

          {/* Filtros por especialidade */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Filtrar por especialidade:</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/explore/therapists"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !specialty
                    ? 'bg-[#B2B8A3] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </a>
              {SPECIALTIES.map((spec) => (
                <a
                  key={spec}
                  href={`/explore/therapists?specialty=${encodeURIComponent(spec)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    specialty === spec
                      ? 'bg-[#B2B8A3] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {spec}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredTherapists.length > 0 ? (
          <>
            <TherapistsGrid therapists={filteredTherapists} />

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

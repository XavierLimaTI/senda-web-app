import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SPECIALTIES = [
  'Psicologia','Psicanálise','Terapia Cognitivo-Comportamental','Terapia de Casal','Mindfulness','Meditação','Yoga','Reiki','Acupuntura','Massagem Terapêutica','Fisioterapia','Quiropraxia','Aromaterapia','Homeopatia','Hipnoterapia','Coaching','Reflexologia','Musicoterapia','Arteterapia','Ayurveda','Shiatsu'
]

const CITIES = [
  'São Paulo','Rio de Janeiro','Belo Horizonte','Curitiba','Porto Alegre','Brasília','Salvador','Fortaleza','Recife','Florianópolis','Campinas','Santos','Niterói','Vitória','Goiânia'
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  if (!q) {
    return NextResponse.json({ therapists: [], therapies: [], specialties: [], cities: [] })
  }

  const qIns = q.toLowerCase()

  // Parallel lookups
  const [therapists, therapies] = await Promise.all([
    prisma.therapistProfile.findMany({
      where: {
        verified: true,
        OR: [
          { specialty: { contains: q } },
          { city: { contains: q } },
          { user: { name: { contains: q } } },
        ],
      },
      select: {
        id: true,
        specialty: true,
        city: true,
        state: true,
        user: { select: { name: true, avatar: true } },
      },
      orderBy: [{ rating: 'desc' }],
      take: 5,
    }),
    // NOTE: client-side data source for therapies; keep server list minimal by id+name
    import('@/data/therapies').then(m => m.therapies)
  ])

  const therapyMatches = therapies
    .filter(t =>
      t.name.pt.toLowerCase().includes(qIns) ||
      t.name.en.toLowerCase().includes(qIns) ||
      t.name.es.toLowerCase().includes(qIns) ||
      t.name.zh.includes(q) // zh not lower-cased reliably
    )
    .slice(0, 6)
    .map(t => ({ id: t.id, name: t.name }))

  const specialtyMatches = SPECIALTIES.filter(s => s.toLowerCase().includes(qIns)).slice(0, 6)
  const cityMatches = CITIES.filter(c => c.toLowerCase().includes(qIns)).slice(0, 6)

  return NextResponse.json({ therapists, therapies: therapyMatches, specialties: specialtyMatches, cities: cityMatches })
}

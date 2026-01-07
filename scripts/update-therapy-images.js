const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Mapeamento de terapias para imagens condizentes do Unsplash (gratuitas e sem direitos autorais)
const therapyImages = {
  'Acupuntura': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  'Reiki': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  'Massagem Terapêutica': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop',
  'Yoga': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=600&fit=crop',
  'Meditação': 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&h=600&fit=crop',
  'Mindfulness': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  'Aromaterapia': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
  'Reflexologia': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=600&fit=crop',
  'Psicologia': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop',
  'Psicanálise': 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&h=600&fit=crop',
  'Terapia Cognitivo-Comportamental': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop',
  'Coaching': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  'Hipnoterapia': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
  'Ayurveda': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=600&fit=crop',
  'Quiropraxia': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop',
  'Fisioterapia': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
  'Shiatsu': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=600&fit=crop',
  'Constelação Familiar': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
  'Terapia de Casal': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
  'Homeopatia': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
  'Musicoterapia': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
  'Arteterapia': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
}

async function main() {
  console.log('🎨 Atualizando imagens das terapias...\n')

  // Buscar todas as terapias
  const therapies = await prisma.therapy.findMany()

  let updated = 0
  let notFound = 0

  for (const therapy of therapies) {
    const imageUrl = therapyImages[therapy.name]
    
    if (imageUrl) {
      await prisma.therapy.update({
        where: { id: therapy.id },
        data: { imageUrl }
      })
      console.log(`✅ ${therapy.name} -> ${imageUrl}`)
      updated++
    } else {
      console.log(`⚠️  ${therapy.name} - Imagem não encontrada no mapeamento`)
      notFound++
    }
  }

  console.log(`\n✨ Concluído: ${updated} atualizadas, ${notFound} não encontradas`)
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

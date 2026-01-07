const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Criando trilhas de exemplo...')

  // Buscar um terapeuta existente
  const therapist = await prisma.therapistProfile.findFirst({
    where: { verified: true }
  })

  const trails = [
    {
      title: 'Meditação para Iniciantes',
      description: 'Descubra os fundamentos da meditação mindfulness em 7 dias. Aprenda técnicas simples para reduzir o estresse e aumentar o foco.',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop',
      category: 'Mindfulness',
      duration: 7,
      authorId: therapist?.id || null,
      published: true
    },
    {
      title: 'Yoga Matinal - Energize seu Dia',
      description: 'Sequências de yoga suaves para praticar ao acordar. Ideal para iniciantes e praticantes intermediários.',
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
      category: 'Yoga',
      duration: 14,
      authorId: therapist?.id || null,
      published: true
    },
    {
      title: 'Autocuidado em 21 Dias',
      description: 'Construa hábitos saudáveis de autocuidado físico, mental e emocional através de práticas diárias guiadas.',
      coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&h=400&fit=crop',
      category: 'Bem-estar',
      duration: 21,
      authorId: therapist?.id || null,
      published: true
    },
    {
      title: 'Respiração Consciente',
      description: 'Técnicas de respiração para controle da ansiedade, melhora do sono e regulação emocional.',
      coverImage: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=800&h=400&fit=crop',
      category: 'Mindfulness',
      duration: 10,
      authorId: therapist?.id || null,
      published: true
    },
    {
      title: 'Gratidão e Positividade',
      description: 'Cultive uma mentalidade mais positiva através de exercícios de gratidão e reflexão diária.',
      coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop',
      category: 'Desenvolvimento Pessoal',
      duration: 14,
      authorId: therapist?.id || null,
      published: true
    },
    {
      title: 'Gerenciamento de Estresse',
      description: 'Estratégias práticas para identificar, reduzir e gerenciar o estresse no dia a dia.',
      coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
      category: 'Bem-estar',
      duration: 21,
      authorId: therapist?.id || null,
      published: true
    }
  ]

  for (const trail of trails) {
    const created = await prisma.trail.create({
      data: {
        ...trail,
        lessons: {
          create: [
            {
              title: 'Introdução',
              content: 'Bem-vindo à trilha! Nesta primeira lição, você vai entender os fundamentos e se preparar para a jornada.',
              contentType: 'text',
              order: 1
            },
            {
              title: 'Prática Guiada',
              content: 'Sua primeira prática guiada. Siga as instruções com calma e respeite seu próprio ritmo.',
              contentType: 'text',
              order: 2
            },
            {
              title: 'Reflexão e Próximos Passos',
              content: 'Momento de refletir sobre o aprendizado e se preparar para continuar sua jornada.',
              contentType: 'text',
              order: 3
            }
          ]
        }
      }
    })
    console.log(`✅ Criada: ${created.title}`)
  }

  console.log('✨ Trilhas criadas com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

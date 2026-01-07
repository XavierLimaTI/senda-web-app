const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const sampleTherapists = [
  {
    name: 'Dr. Ana Silva',
    email: 'ana.silva@senda.com',
    specialty: 'Psicologia Clínica',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    name: 'Dr. Carlos Santos',
    email: 'carlos.santos@senda.com',
    specialty: 'Terapia Cognitivo-Comportamental',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    name: 'Dra. Maria Oliveira',
    email: 'maria.oliveira@senda.com',
    specialty: 'Psicanálise',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    name: 'Dr. João Ferreira',
    email: 'joao.ferreira@senda.com',
    specialty: 'Mindfulness e Meditação',
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  {
    name: 'Dra. Beatriz Costa',
    email: 'beatriz.costa@senda.com',
    specialty: 'Terapia Familiar',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
  },
  {
    name: 'Dr. Rafael Lima',
    email: 'rafael.lima@senda.com',
    specialty: 'Psicologia Positiva',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  }
]

async function main() {
  console.log('🌱 Criando terapeutas verificados...')

  const hashedPassword = await bcrypt.hash('Test@123', 10)

  for (const therapist of sampleTherapists) {
    try {
      // Verificar se usuário já existe
      const existing = await prisma.user.findUnique({
        where: { email: therapist.email }
      })

      let user
      if (existing) {
        console.log(`👤 ${therapist.name} já existe, atualizando perfil...`)
        user = existing
      } else {
        // Criar usuário
        user = await prisma.user.create({
        data: {
          name: therapist.name,
          email: therapist.email,
          password: hashedPassword,
          role: 'THERAPIST',
          emailVerified: new Date(),
          avatar: therapist.avatar
        }
        })
        console.log(`✅ Usuário ${therapist.name} criado!`)
      }

      // Verificar se perfil já existe
      const existingProfile = await prisma.therapistProfile.findUnique({
        where: { userId: user.id }
      })

      if (existingProfile) {
        // Atualizar perfil existente
        await prisma.therapistProfile.update({
          where: { userId: user.id },
          data: {
            specialty: therapist.specialty,
            verified: true,
            rating: therapist.rating,
            bio: `Profissional especializado em ${therapist.specialty} com anos de experiência.`,
            license: 'CRP 00/00000',
            experience: 5 + Math.floor(Math.random() * 10),
            onlineAvailable: true
          }
        })
        console.log(`✅ Perfil de ${therapist.name} atualizado!`)
      } else {
        // Criar perfil de terapeuta
        await prisma.therapistProfile.create({
        data: {
          userId: user.id,
          specialty: therapist.specialty,
          verified: true,
          rating: therapist.rating,
          bio: `Profissional especializado em ${therapist.specialty} com anos de experiência.`,
          license: 'CRP 00/00000',
          experience: 5 + Math.floor(Math.random() * 10),
          onlineAvailable: true
        }
        })
        console.log(`✅ Perfil de ${therapist.name} criado!`)
      }
    } catch (error) {
      console.error(`❌ Erro ao criar ${therapist.name}:`, error.message)
    }
  }

  console.log('✨ Finalizado!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

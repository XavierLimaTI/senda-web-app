// Script para criar um terapeuta de teste
// Rode: node scripts/create-test-therapist.js

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌿 Criando terapeuta de teste...')

  // Verificar se já existe
  const existing = await prisma.user.findUnique({
    where: { email: 'terapeuta@test.com' }
  })

  if (existing) {
    console.log('✅ Terapeuta de teste já existe!')
    console.log('Email: terapeuta@test.com')
    console.log('Senha: senha123')
    return
  }

  // Criar hash da senha
  const hashedPassword = await bcrypt.hash('senha123', 10)

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      email: 'terapeuta@test.com',
      password: hashedPassword,
      name: 'Dr. João Silva',
      role: 'THERAPIST',
      phone: '(61) 99999-9999',
      emailVerified: new Date(), // Já verificado para testes
    }
  })

  // Criar perfil de terapeuta
  const therapistProfile = await prisma.therapistProfile.create({
    data: {
      userId: user.id,
      bio: 'Terapeuta holístico com 10 anos de experiência em Reiki e Acupuntura. Formação pelo Instituto de Terapias Integrativas de Brasília.',
      specialty: 'Reiki, Acupuntura, Massagem Terapêutica',
      license: 'CRT-DF 12345',
      experience: 10,
      verified: true, // Já verificado para testes
    }
  })

  console.log('✅ Terapeuta criado com sucesso!')
  console.log('\n📋 Dados de acesso:')
  console.log('Email: terapeuta@test.com')
  console.log('Senha: senha123')
  console.log('\n🔗 Acesse: http://localhost:3000/auth/signin')
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

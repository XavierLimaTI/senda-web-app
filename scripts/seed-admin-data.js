/**
 * Script de Seed para Dados de Teste - Senda Admin Panel
 * 
 * Este script cria dados de teste para:
 * - Reviews (avaliações de clientes)
 * - Payments (transações de pagamento)
 * 
 * Uso: node scripts/seed-admin-data.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de dados para Admin Panel...\n')

  try {
    // 1. Buscar ou criar usuários de teste
    console.log('📝 Verificando usuários...')
    
    // Admin
    const admin = await prisma.user.upsert({
      where: { email: 'admin@senda.app' },
      update: {},
      create: {
        email: 'admin@senda.app',
        name: 'Admin Senda',
        password: '$2a$10$xYz...', // hash de 'Admin123456'
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    })
    console.log('✅ Admin criado/encontrado')

    // Cliente 1
    const client1 = await prisma.user.upsert({
      where: { email: 'cliente1@teste.com' },
      update: {},
      create: {
        email: 'cliente1@teste.com',
        name: 'Maria Silva',
        password: '$2a$10$test123',
        role: 'CLIENT',
        emailVerified: new Date(),
      },
    })

    // Cliente 2
    const client2 = await prisma.user.upsert({
      where: { email: 'cliente2@teste.com' },
      update: {},
      create: {
        email: 'cliente2@teste.com',
        name: 'João Santos',
        password: '$2a$10$test123',
        role: 'CLIENT',
        emailVerified: new Date(),
      },
    })

    // Terapeuta 1
    const therapist1User = await prisma.user.upsert({
      where: { email: 'terapeuta1@teste.com' },
      update: {},
      create: {
        email: 'terapeuta1@teste.com',
        name: 'Dra. Ana Oliveira',
        password: '$2a$10$test123',
        role: 'THERAPIST',
        emailVerified: new Date(),
      },
    })

    // Terapeuta 2
    const therapist2User = await prisma.user.upsert({
      where: { email: 'terapeuta2@teste.com' },
      update: {},
      create: {
        email: 'terapeuta2@teste.com',
        name: 'Dr. Carlos Mendes',
        password: '$2a$10$test123',
        role: 'THERAPIST',
        emailVerified: new Date(),
      },
    })

    console.log('✅ Clientes e terapeutas criados/encontrados\n')

    // 2. Criar perfis de terapeutas
    console.log('📝 Criando perfis de terapeutas...')
    
    const therapist1 = await prisma.therapistProfile.upsert({
      where: { userId: therapist1User.id },
      update: {},
      create: {
        userId: therapist1User.id,
        phone: '(11) 98765-4321',
        bio: 'Especialista em Reiki com 10 anos de experiência. Formação em técnicas japonesas tradicionais.',
        specialty: 'Reiki',
        license: 'CRT-123456',
        experience: 10,
        verified: true,
        rating: 4.8,
      },
    })

    const therapist2 = await prisma.therapistProfile.upsert({
      where: { userId: therapist2User.id },
      update: {},
      create: {
        userId: therapist2User.id,
        phone: '(11) 97654-3210',
        bio: 'Acupunturista certificado com 8 anos de prática. Atendimento personalizado focado em bem-estar integral.',
        specialty: 'Acupuntura',
        license: 'CRT-654321',
        experience: 8,
        verified: true,
        rating: 4.9,
      },
    })

    console.log('✅ Perfis de terapeutas criados\n')

    // 3. Criar perfis de clientes
    console.log('📝 Criando perfis de clientes...')
    
    await prisma.clientProfile.upsert({
      where: { userId: client1.id },
      update: {},
      create: {
        userId: client1.id,
        phone: '(11) 91234-5678',
        preferences: JSON.stringify({
          intentions: ['relaxamento', 'equilíbrio energético'],
          preferredTherapies: ['Reiki', 'Meditação']
        }),
      },
    })

    await prisma.clientProfile.upsert({
      where: { userId: client2.id },
      update: {},
      create: {
        userId: client2.id,
        phone: '(11) 98765-1234',
        preferences: JSON.stringify({
          intentions: ['alívio de dores', 'bem-estar'],
          preferredTherapies: ['Acupuntura', 'Massagem']
        }),
      },
    })

    console.log('✅ Perfis de clientes criados\n')

    // 4. Criar serviços
    console.log('📝 Criando serviços...')
    
    const service1 = await prisma.service.create({
      data: {
        therapistId: therapist1.id,
        name: 'Sessão de Reiki - 60 minutos',
        description: 'Sessão completa de Reiki com harmonização energética e relaxamento profundo.',
        price: 150.00,
        duration: 60,
      },
    })

    const service2 = await prisma.service.create({
      data: {
        therapistId: therapist2.id,
        name: 'Acupuntura Tradicional',
        description: 'Sessão de acupuntura focada em dores crônicas e estresse.',
        price: 200.00,
        duration: 45,
      },
    })

    console.log('✅ Serviços criados\n')

    // 5. Criar agendamentos
    console.log('📝 Criando agendamentos...')
    
    const now = new Date()
    const booking1 = await prisma.booking.create({
      data: {
        clientId: client1.id,
        therapistId: therapist1.id,
        serviceId: service1.id,
        startTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
        endTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
        status: 'COMPLETED',
        notes: 'Primeira sessão - expectativa de relaxamento',
      },
    })

    const booking2 = await prisma.booking.create({
      data: {
        clientId: client2.id,
        therapistId: therapist2.id,
        serviceId: service2.id,
        startTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 dias atrás
        endTime: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
        status: 'COMPLETED',
        notes: 'Tratamento para dor nas costas',
      },
    })

    const booking3 = await prisma.booking.create({
      data: {
        clientId: client1.id,
        therapistId: therapist2.id,
        serviceId: service2.id,
        startTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 dias atrás
        endTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
        status: 'COMPLETED',
        notes: 'Segunda sessão de acupuntura',
      },
    })

    console.log('✅ Agendamentos criados\n')

    // 6. Criar pagamentos
    console.log('📝 Criando pagamentos...')
    
    await prisma.payment.create({
      data: {
        bookingId: booking1.id,
        userId: client1.id,
        amount: 150.00,
        sendaFee: 15.00,
        professionalAmount: 135.00,
        status: 'APPROVED',
        method: 'credit_card',
        transactionId: 'TXN-001-2026',
        stripePaymentIntentId: 'pi_test_123456',
        description: 'Pagamento - Sessão de Reiki com Dra. Ana Oliveira',
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    })

    await prisma.payment.create({
      data: {
        bookingId: booking2.id,
        userId: client2.id,
        amount: 200.00,
        sendaFee: 20.00,
        professionalAmount: 180.00,
        status: 'APPROVED',
        method: 'pix',
        transactionId: 'TXN-002-2026',
        stripePaymentIntentId: 'pi_test_234567',
        description: 'Pagamento - Acupuntura com Dr. Carlos Mendes',
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      },
    })

    await prisma.payment.create({
      data: {
        bookingId: booking3.id,
        userId: client1.id,
        amount: 200.00,
        sendaFee: 20.00,
        professionalAmount: 180.00,
        status: 'PENDING',
        method: 'credit_card',
        transactionId: 'TXN-003-2026',
        description: 'Pagamento Pendente - Acupuntura com Dr. Carlos Mendes',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      },
    })

    console.log('✅ Pagamentos criados\n')

    // 7. Criar reviews
    console.log('📝 Criando reviews...')
    
    await prisma.review.create({
      data: {
        bookingId: booking1.id,
        therapistId: therapist1.id,
        clientId: client1.id,
        rating: 5,
        comment: 'Experiência incrível! Dra. Ana é muito profissional e atenciosa. Saí da sessão completamente relaxada e com uma energia renovada. Super recomendo!',
        flagged: false,
        createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
      },
    })

    await prisma.review.create({
      data: {
        bookingId: booking2.id,
        therapistId: therapist2.id,
        clientId: client2.id,
        rating: 4,
        comment: 'Ótimo atendimento. Dr. Carlos é muito experiente e explicou todo o procedimento. Senti melhora nas dores já na primeira sessão.',
        flagged: false,
        createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
      },
    })

    console.log('✅ Reviews criados\n')

    console.log('🎉 Seed concluído com sucesso!\n')
    console.log('📊 Resumo dos dados criados:')
    console.log('   - 5 usuários (1 admin, 2 clientes, 2 terapeutas)')
    console.log('   - 2 perfis de terapeutas')
    console.log('   - 2 perfis de clientes')
    console.log('   - 2 serviços')
    console.log('   - 3 agendamentos')
    console.log('   - 3 pagamentos (2 aprovados, 1 pendente)')
    console.log('   - 2 reviews')
    console.log('\n✅ Agora você pode testar o painel admin em http://localhost:3000/dashboard/admin\n')

  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

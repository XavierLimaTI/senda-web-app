/**
 * Script para setup de disponibilidade e limpeza de dados para testes
 * 
 * Ações:
 * 1. Limpa todos os bookings do banco
 * 2. Cria disponibilidade 8h-18h todos os dias (seg-dom) para terapeuta ID 2
 * 
 * Uso: node scripts/setup-availability-and-clean.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Iniciando limpeza e setup de dados de teste...\n')

  // 1. Limpar todos os bookings
  console.log('📋 Limpando bookings...')
  const deletedBookings = await prisma.booking.deleteMany({})
  console.log(`✅ ${deletedBookings.count} bookings removidos\n`)

  // 2. Limpar disponibilidades antigas do terapeuta 2
  console.log('🗑️  Limpando disponibilidades antigas do terapeuta ID 2...')
  const deletedAvailability = await prisma.availability.deleteMany({
    where: { therapistId: 2 }
  })
  console.log(`✅ ${deletedAvailability.count} slots de disponibilidade removidos\n`)

  // 3. Criar disponibilidade 8h-18h para todos os dias (0=domingo, 6=sábado)
  console.log('📅 Criando disponibilidade 8h-18h (seg-dom) para terapeuta ID 2...')
  
  const availabilitySlots = []
  for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
    availabilitySlots.push({
      therapistId: 2,
      dayOfWeek,
      startTime: '08:00',
      endTime: '18:00'
    })
  }

  const createdAvailability = await prisma.availability.createMany({
    data: availabilitySlots
  })

  console.log(`✅ ${createdAvailability.count} slots de disponibilidade criados:\n`)
  
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  availabilitySlots.forEach(slot => {
    console.log(`   - ${days[slot.dayOfWeek]}: ${slot.startTime} - ${slot.endTime}`)
  })

  console.log('\n✨ Setup concluído com sucesso!')
  console.log('\n📊 Resumo:')
  console.log(`   - Bookings removidos: ${deletedBookings.count}`)
  console.log(`   - Disponibilidade criada: ${createdAvailability.count} slots`)
  console.log(`   - Horário: 08:00 - 18:00 (todos os dias)`)
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

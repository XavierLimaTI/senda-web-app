const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function setupAvailability() {
  // Limpar disponibilidade antiga (se houver)
  await prisma.availability.deleteMany({
    where: { therapistId: 1 }
  })

  // Criar disponibilidade para terça-feira (dayOfWeek = 2)
  const availability = await prisma.availability.create({
    data: {
      therapistId: 1,
      dayOfWeek: 2, // Terça
      startTime: '09:00',
      endTime: '17:00'
    }
  })

  console.log('✅ Disponibilidade criada:')
  console.log(`   Terça-feira: ${availability.startTime} - ${availability.endTime}`)

  await prisma.$disconnect()
}

setupAvailability().catch(console.error)

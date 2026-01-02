const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkAvailability() {
  const availability = await prisma.availability.findMany({
    where: { therapistId: 1 },
    orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }]
  })

  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  console.log(`\n📋 Disponibilidade configurada:\n`)

  availability.forEach(av => {
    console.log(`${days[av.dayOfWeek].padEnd(10)} | ${av.startTime} - ${av.endTime}`)
  })

  if (availability.length === 0) {
    console.log('Nenhuma disponibilidade configurada!')
  }

  await prisma.$disconnect()
}

checkAvailability().catch(console.error)

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkTerapeuta1Bookings() {
  const bookings = await prisma.booking.findMany({
    where: {
      therapistId: 2, // Terapeuta 1
      status: { in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
    },
    include: {
      service: { select: { name: true } }
    },
    orderBy: { startTime: 'asc' }
  })

  console.log(`\n📅 Agendamentos do Terapeuta 1: ${bookings.length}\n`)

  if (bookings.length === 0) {
    console.log('Nenhum agendamento encontrado.')
  } else {
    bookings.forEach(booking => {
      const start = new Date(booking.startTime)
      const end = new Date(booking.endTime)
      const dayOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][start.getDay()]
      
      console.log(`ID: ${booking.id} | ${booking.status.padEnd(10)} | ${dayOfWeek} ${start.toLocaleDateString('pt-BR')} ${start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} | ${booking.service.name}`)
    })
  }

  await prisma.$disconnect()
}

checkTerapeuta1Bookings().catch(console.error)

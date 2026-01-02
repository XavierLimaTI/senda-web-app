const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkBookings() {
  const bookings = await prisma.booking.findMany({
    where: {
      therapistId: 1, // Gustavo
      status: { in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
    },
    include: {
      service: { select: { name: true } },
      therapist: { include: { user: { select: { name: true } } } }
    },
    orderBy: { startTime: 'asc' }
  })

  console.log(`\n📅 Total de agendamentos: ${bookings.length}\n`)

  bookings.forEach(booking => {
    const start = new Date(booking.startTime)
    const end = new Date(booking.endTime)
    const dayOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][start.getDay()]
    
    console.log(`${booking.status.padEnd(10)} | ${dayOfWeek} ${start.toLocaleDateString('pt-BR')} ${start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} | ${booking.service.name}`)
  })

  if (bookings.length === 0) {
    console.log('Nenhum agendamento encontrado.')
  }

  await prisma.$disconnect()
}

checkBookings().catch(console.error)

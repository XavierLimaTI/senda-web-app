const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function cleanupPendingBookings() {
  // Cancelar todos os bookings PENDING sem pagamento associado
  const result = await prisma.booking.updateMany({
    where: {
      status: 'PENDING',
      payment: null // Sem registro de pagamento
    },
    data: {
      status: 'CANCELLED'
    }
  })

  console.log(`✅ ${result.count} agendamento(s) PENDING cancelado(s)`)

  // Mostrar agendamentos restantes
  const remaining = await prisma.booking.findMany({
    where: {
      therapistId: 2,
      status: { in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
    }
  })

  console.log(`📅 Agendamentos ativos restantes: ${remaining.length}`)

  await prisma.$disconnect()
}

cleanupPendingBookings().catch(console.error)

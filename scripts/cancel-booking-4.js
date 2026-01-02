const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

prisma.booking.update({
  where: { id: 4 },
  data: { status: 'CANCELLED' }
})
  .then(() => {
    console.log('✅ Booking #4 cancelado')
    return prisma.$disconnect()
  })
  .catch(console.error)

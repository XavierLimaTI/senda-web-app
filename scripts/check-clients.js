const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkClients() {
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    select: { id: true, name: true, email: true }
  })

  console.log('\n👥 Clientes cadastrados:', clients.length)
  clients.forEach(c => {
    console.log(`  - ${c.name} (${c.email}) - ID: ${c.id}`)
  })

  if (clients.length === 0) {
    console.log('  ❌ Nenhum cliente encontrado! Você precisa criar uma conta CLIENT.')
  }

  await prisma.$disconnect()
}

checkClients().catch(console.error)

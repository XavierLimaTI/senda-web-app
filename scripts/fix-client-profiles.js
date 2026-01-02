const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Buscar todos os clientes
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    include: { clientProfile: true }
  })

  console.log(`\n📋 Total de clientes: ${clients.length}\n`)

  for (const client of clients) {
    if (!client.clientProfile) {
      console.log(`❌ ${client.name} (ID: ${client.id}) - SEM PERFIL`)
      
      // Criar perfil automaticamente
      await prisma.clientProfile.create({
        data: { userId: client.id }
      })
      
      console.log(`   ✅ Perfil criado!\n`)
    } else {
      console.log(`✅ ${client.name} (ID: ${client.id}) - Perfil OK (ID: ${client.clientProfile.id})\n`)
    }
  }

  console.log('✨ Verificação completa!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

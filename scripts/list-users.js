/**
 * Lista todos os usuários com emails
 * 
 * Uso: node scripts/list-users.js
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    },
    orderBy: { id: 'asc' }
  })

  console.log(`\n📋 Total de usuários: ${users.length}\n`)

  users.forEach(user => {
    console.log(`ID: ${user.id}`)
    console.log(`   Nome: ${user.name}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Role: ${user.role}`)
    console.log(`   Criado: ${user.createdAt.toLocaleString('pt-BR')}\n`)
  })

  console.log('💡 Para atualizar um email:')
  console.log('   node scripts/update-user-email.js --userId=X --email=novo@email.com\n')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

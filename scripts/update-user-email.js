/**
 * Atualiza email de um usuário existente
 * 
 * Uso: node scripts/update-user-email.js --userId=1 --email=novo@email.com
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const userIdArg = process.argv.find(arg => arg.startsWith('--userId='))
  const emailArg = process.argv.find(arg => arg.startsWith('--email='))

  if (!userIdArg || !emailArg) {
    console.error('❌ Uso: node scripts/update-user-email.js --userId=X --email=novo@email.com')
    process.exit(1)
  }

  const userId = parseInt(userIdArg.replace('--userId=', ''))
  const newEmail = emailArg.replace('--email=', '')

  if (isNaN(userId)) {
    console.error('❌ userId deve ser um número')
    process.exit(1)
  }

  // Verificar se usuário existe
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true }
  })

  if (!user) {
    console.error(`❌ Usuário ID ${userId} não encontrado`)
    process.exit(1)
  }

  console.log('📋 Usuário atual:')
  console.log(`   ID: ${user.id}`)
  console.log(`   Nome: ${user.name}`)
  console.log(`   Email antigo: ${user.email}`)
  console.log(`   Role: ${user.role}`)
  console.log(`   Email novo: ${newEmail}\n`)

  // Verificar se o novo email já está em uso
  const existing = await prisma.user.findUnique({
    where: { email: newEmail }
  })

  if (existing && existing.id !== userId) {
    console.error(`❌ Email ${newEmail} já está em uso por outro usuário (ID: ${existing.id})`)
    process.exit(1)
  }

  // Atualizar email
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { email: newEmail }
  })

  console.log('✅ Email atualizado com sucesso!')
  console.log(`   ${user.email} → ${updated.email}\n`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

const { PrismaClient } = require('@prisma/client')
const bcryptjs = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    const email = 'admin@senda.app'
    const password = 'Admin123456'
    const name = 'Administrador Senda'

    // Verificar se já existe
    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      console.log('✓ Admin já existe')
      console.log('Email: ' + email)
      return
    }

    // Hash
    const hashed = bcryptjs.hashSync(password, 10)

    // Criar
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
        role: 'ADMIN',
        emailVerified: new Date(),
        phone: '+55 11 99999-9999',
      },
    })

    console.log('✓ Admin criado!')
    console.log('Email: ' + email)
    console.log('Senha: ' + password)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(console.error)

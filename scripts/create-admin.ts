import bcryptjs from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

async function createAdminUser() {
  try {
    const email = 'admin@senda.app'
    const password = 'Admin123456' // senha segura para teste
    const name = 'Administrador Senda'

    // Verificar se já existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email },
    })

    if (existingAdmin) {
      console.log('✓ Admin já existe:', email)
      return
    }

    // Hash da senha
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
        phone: '+55 11 99999-9999',
      },
    })

    console.log('✓ Admin criado com sucesso!')
    console.log('Email:', email)
    console.log('Senha:', password)
    console.log('')
    console.log('Use estas credenciais para fazer login em /auth/signin')
  } catch (error) {
    console.error('Erro ao criar admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()

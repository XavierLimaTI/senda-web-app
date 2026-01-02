const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkTerapeuta1() {
  const user = await prisma.user.findFirst({
    where: { email: 'terapeuta1@teste.com' },
    include: { 
      therapistProfile: {
        include: {
          services: true,
          availability: true
        }
      }
    }
  })

  if (!user) {
    console.log('❌ Terapeuta1 não encontrado!')
    await prisma.$disconnect()
    return
  }

  console.log('\n👤 Terapeuta 1:')
  console.log('   User ID:', user.id)
  console.log('   Therapist Profile ID:', user.therapistProfile?.id)
  console.log('   Verified:', user.therapistProfile?.verified)

  console.log(`\n📦 Serviços: ${user.therapistProfile?.services.length || 0}`)
  user.therapistProfile?.services.forEach(s => {
    console.log(`   - ${s.name} (R$ ${s.price}) - ${s.duration}min - Ativo: ${s.active}`)
  })

  console.log(`\n📅 Disponibilidades: ${user.therapistProfile?.availability.length || 0}`)
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  user.therapistProfile?.availability.forEach(a => {
    console.log(`   - ${days[a.dayOfWeek]}: ${a.startTime} - ${a.endTime}`)
  })

  await prisma.$disconnect()
}

checkTerapeuta1().catch(console.error)

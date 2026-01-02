const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkGustavoProfile() {
  const user = await prisma.user.findFirst({
    where: { email: 'gustavohenriquex@gmail.com' },
    include: { therapistProfile: true }
  })

  console.log('\n👤 Gustavo:')
  console.log('   User ID:', user?.id)
  console.log('   Therapist Profile ID:', user?.therapistProfile?.id)
  console.log('   Verified:', user?.therapistProfile?.verified)

  // Checar disponibilidades com esse therapistId
  if (user?.therapistProfile?.id) {
    const avail = await prisma.availability.findMany({
      where: { therapistId: user.therapistProfile.id }
    })
    console.log(`\n   Disponibilidades cadastradas: ${avail.length}`)
    avail.forEach(a => {
      const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
      console.log(`   - ${days[a.dayOfWeek]}: ${a.startTime} - ${a.endTime}`)
    })
  }

  await prisma.$disconnect()
}

checkGustavoProfile().catch(console.error)

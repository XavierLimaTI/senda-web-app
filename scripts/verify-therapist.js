const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Buscar todos os terapeutas não verificados
  const therapists = await prisma.therapistProfile.findMany({
    where: { verified: false },
    include: { user: true }
  })

  if (therapists.length === 0) {
    console.log('✅ Nenhum terapeuta pendente de verificação')
    return
  }

  console.log('\n📋 Terapeutas pendentes de verificação:')
  therapists.forEach((t, idx) => {
    console.log(`${idx + 1}. ${t.user.name} (${t.user.email}) - ID: ${t.id}`)
  })

  // Verificar TODOS automaticamente (para facilitar testes)
  console.log('\n🔓 Verificando todos os terapeutas...')
  
  const updated = await prisma.therapistProfile.updateMany({
    where: { verified: false },
    data: { verified: true }
  })

  console.log(`✅ ${updated.count} terapeuta(s) verificado(s) com sucesso!`)
  
  // Mostrar resultado
  const allTherapists = await prisma.therapistProfile.findMany({
    include: { user: true }
  })
  
  console.log('\n✨ Status final:')
  allTherapists.forEach(t => {
    console.log(`${t.user.name} - Verificado: ${t.verified ? '✅' : '❌'}`)
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

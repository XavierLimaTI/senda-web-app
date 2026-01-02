/**
 * Script para testar a API de Slots
 * 
 * Pré-requisitos:
 * 1. Servidor dev rodando (npm run dev)
 * 2. Terapeuta criado com availabilities e services no DB
 * 
 * Uso:
 *   node scripts/test-slots-api.js
 */

const fetch = require('node-fetch').default || require('node-fetch')
const { PrismaClient } = require('@prisma/client')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

async function main() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🧪 Testando API de Slots\n')
    
    // 1. Buscar um terapeuta verificado com serviços
    const therapist = await prisma.therapistProfile.findFirst({
      where: { verified: true },
      include: {
        services: { where: { active: true }, take: 1 },
        availability: true
      }
    })
    
    if (!therapist) {
      console.error('❌ Nenhum terapeuta verificado encontrado no DB')
      console.log('💡 Execute: node scripts/create-test-therapist.js')
      process.exit(1)
    }
    
    if (therapist.services.length === 0) {
      console.error('❌ Terapeuta não tem serviços ativos')
      process.exit(1)
    }
    
    if (therapist.availability.length === 0) {
      console.error('❌ Terapeuta não tem disponibilidade configurada')
      console.log('💡 Crie availability manual no Prisma Studio ou via API')
      process.exit(1)
    }
    
    const service = therapist.services[0]
    const availability = therapist.availability[0]
    
    console.log(`✅ Terapeuta ID: ${therapist.id}`)
    console.log(`✅ Serviço: ${service.name} (${service.duration}min, R$ ${service.price})`)
    console.log(`✅ Disponibilidade: Dia ${availability.dayOfWeek} (${availability.startTime} - ${availability.endTime})\n`)
    
    // 2. Calcular uma data futura com o dia da semana correto
    const today = new Date()
    const targetDayOfWeek = availability.dayOfWeek
    let testDate = new Date(today)
    testDate.setDate(testDate.getDate() + 1) // Amanhã
    
    // Ajustar para o dia da semana correto
    while (testDate.getDay() !== targetDayOfWeek) {
      testDate.setDate(testDate.getDate() + 1)
    }
    
    const dateStr = testDate.toISOString().split('T')[0]
    console.log(`📅 Data de teste: ${dateStr} (${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][testDate.getDay()]})\n`)
    
    // 3. Chamar API de Slots
    const url = `${BASE_URL}/api/slots?therapistId=${therapist.id}&date=${dateStr}&serviceId=${service.id}`
    console.log(`🔗 GET ${url}\n`)
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) {
      console.error('❌ Erro na API:', data)
      process.exit(1)
    }
    
    console.log('✅ Resposta da API:')
    console.log(JSON.stringify(data, null, 2))
    console.log(`\n📊 Total de slots disponíveis: ${data.slots?.length || 0}`)
    
    if (data.slots && data.slots.length > 0) {
      console.log(`\n⏰ Primeiros horários: ${data.slots.slice(0, 5).join(', ')}`)
    }
    
    // 4. Testar com uma data sem disponibilidade
    console.log('\n\n🧪 Testando com dia sem disponibilidade...')
    let wrongDayDate = new Date(today)
    wrongDayDate.setDate(wrongDayDate.getDate() + 1)
    
    // Encontrar um dia diferente da disponibilidade
    while (wrongDayDate.getDay() === targetDayOfWeek) {
      wrongDayDate.setDate(wrongDayDate.getDate() + 1)
    }
    
    const wrongDateStr = wrongDayDate.toISOString().split('T')[0]
    const url2 = `${BASE_URL}/api/slots?therapistId=${therapist.id}&date=${wrongDateStr}&serviceId=${service.id}`
    
    const response2 = await fetch(url2)
    const data2 = await response2.json()
    
    console.log(`📅 Data: ${wrongDateStr} (${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][wrongDayDate.getDay()]})`)
    console.log('Resposta:', data2)
    
    if (data2.slots?.length === 0) {
      console.log('✅ Correto: sem slots para dia sem disponibilidade')
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
  
  console.log('\n✅ Testes concluídos!')
}

main()

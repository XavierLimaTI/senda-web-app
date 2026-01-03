/**
 * Script para testar emails de booking
 * 
 * Uso: node scripts/test-booking-emails.js
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Buscando dados para teste de emails...\n')

  // Buscar um booking recente com todos os dados
  const booking = await prisma.booking.findFirst({
    where: {
      status: { in: ['PENDING', 'CONFIRMED'] }
    },
    include: {
      client: { select: { name: true, email: true } },
      therapist: { include: { user: { select: { name: true, email: true } } } },
      service: { select: { name: true, price: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  if (!booking) {
    console.log('❌ Nenhum booking encontrado para teste')
    return
  }

  console.log('✅ Booking encontrado:')
  console.log(`   ID: ${booking.id}`)
  console.log(`   Cliente: ${booking.client.name} (${booking.client.email})`)
  console.log(`   Terapeuta: ${booking.therapist.user.name} (${booking.therapist.user.email})`)
  console.log(`   Serviço: ${booking.service.name}`)
  console.log(`   Data: ${booking.startTime.toLocaleString('pt-BR')}`)
  console.log(`   Preço: R$ ${booking.service.price.toFixed(2)}`)
  console.log(`   Status: ${booking.status}\n`)

  console.log('📧 Configuração de email:')
  console.log(`   SENDGRID_API_KEY: ${process.env.SENDGRID_API_KEY ? '✅ Configurado' : '❌ Não configurado'}`)
  console.log(`   SMTP_HOST: ${process.env.SMTP_HOST || '❌ Não configurado'}`)
  console.log(`   FROM_EMAIL: ${process.env.FROM_EMAIL || '❌ Não configurado'}`)
  
  console.log('\n💡 Para testar emails reais:')
  console.log('   1. Configure SENDGRID_API_KEY ou SMTP_* no .env.local')
  console.log('   2. Faça um novo booking via interface')
  console.log('   3. Complete o pagamento no checkout simulado')
  console.log('   4. Verifique as caixas de entrada do cliente e terapeuta\n')

  console.log('📝 Formato esperado dos emails:')
  console.log('   ✉️  Cliente: "✨ Agendamento Confirmado — Senda"')
  console.log('   ✉️  Terapeuta: "🔔 Novo Agendamento Recebido — Senda"')
  console.log('   ✉️  Cancelamento: "⚠️ Agendamento Cancelado — Senda"\n')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

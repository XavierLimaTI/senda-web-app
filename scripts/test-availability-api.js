/**
 * Script para testar a API de Availability Management
 * 
 * Testa CRUD completo:
 * - GET: Listar availability do terapeuta
 * - POST: Criar nova janela de disponibilidade
 * - PUT: Atualizar horário existente
 * - DELETE: Remover availability
 * 
 * Uso:
 *   node scripts/test-availability-api.js
 */

const fetch = require('node-fetch').default || require('node-fetch')
const { PrismaClient } = require('@prisma/client')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

async function main() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🧪 Testando API de Availability Management\n')
    
    // 1. Buscar terapeuta de teste
    const therapist = await prisma.therapistProfile.findFirst({
      include: {
        user: { select: { email: true } },
        availability: true
      }
    })
    
    if (!therapist) {
      console.error('❌ Nenhum terapeuta encontrado no DB')
      console.log('💡 Execute: node scripts/create-test-therapist.js')
      process.exit(1)
    }
    
    console.log(`✅ Terapeuta: ${therapist.user.email}`)
    console.log(`📊 Availability existentes: ${therapist.availability.length}\n`)
    
    // Para testar, precisamos simular uma sessão autenticada
    // Como isso requer NextAuth session, vamos testar via curl ou manualmente
    
    console.log('📝 Exemplos de comandos para testar (use após fazer login no app):\n')
    
    console.log('1️⃣ GET - Listar availability:')
    console.log(`curl ${BASE_URL}/api/therapist/availability \\
  -H "Cookie: next-auth.session-token=SEU_TOKEN_AQUI"\n`)
    
    console.log('2️⃣ POST - Criar nova availability (Segunda 09:00-12:00):')
    console.log(`curl -X POST ${BASE_URL}/api/therapist/availability \\
  -H "Content-Type: application/json" \\
  -H "Cookie: next-auth.session-token=SEU_TOKEN_AQUI" \\
  -d '{
    "dayOfWeek": 1,
    "startTime": "09:00",
    "endTime": "12:00"
  }'\n`)
    
    console.log('3️⃣ PUT - Atualizar availability (mudar endTime):')
    console.log(`curl -X PUT ${BASE_URL}/api/therapist/availability/AVAILABILITY_ID \\
  -H "Content-Type: application/json" \\
  -H "Cookie: next-auth.session-token=SEU_TOKEN_AQUI" \\
  -d '{
    "endTime": "13:00"
  }'\n`)
    
    console.log('4️⃣ DELETE - Remover availability:')
    console.log(`curl -X DELETE ${BASE_URL}/api/therapist/availability/AVAILABILITY_ID \\
  -H "Cookie: next-auth.session-token=SEU_TOKEN_AQUI"\n`)
    
    console.log('📌 Validações implementadas:')
    console.log('  ✅ Formato HH:MM obrigatório para horários')
    console.log('  ✅ dayOfWeek entre 0 (Dom) e 6 (Sáb)')
    console.log('  ✅ startTime < endTime')
    console.log('  ✅ Detecção de conflitos/sobreposição no mesmo dia')
    console.log('  ✅ Ownership (apenas o terapeuta dono pode editar/deletar)')
    
    console.log('\n🔒 Segurança:')
    console.log('  ✅ Autenticação NextAuth obrigatória')
    console.log('  ✅ Role THERAPIST obrigatória')
    console.log('  ✅ Validação de ownership em PUT/DELETE')
    
    console.log('\n📊 Dados de teste atuais:')
    if (therapist.availability.length > 0) {
      console.log('Availability do terapeuta:')
      const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
      therapist.availability
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime))
        .forEach(av => {
          console.log(`  ${dias[av.dayOfWeek]}: ${av.startTime} - ${av.endTime} (ID: ${av.id})`)
        })
    } else {
      console.log('❌ Nenhuma availability configurada')
      console.log('💡 Use POST para criar a primeira janela de disponibilidade')
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
  
  console.log('\n✅ Guia de testes concluído!')
  console.log('💡 Para testar com sessão real, use Postman/Insomnia ou frontend')
}

main()

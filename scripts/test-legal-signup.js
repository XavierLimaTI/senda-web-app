/**
 * Script de Teste: Cadastro com Aceite Legal (LGPD)
 * 
 * Objetivo: Testar fluxo completo de signup com consentimento de termos.
 * 
 * Uso:
 * node scripts/test-legal-signup.js --url=http://localhost:3000
 */

const BASE_URL = process.argv.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:3000';

async function testLegalSignup() {
  console.log('🧪 Iniciando teste de signup com aceite legal...\n');

  const testUser = {
    name: 'Teste Legal ' + Date.now(),
    email: `teste.legal.${Date.now()}@example.com`,
    password: 'senha123456',
    role: 'CLIENT',
    legalConsent: {
      acceptedTerms: true,
      acceptedPrivacy: true,
      marketingConsent: false, // Não quer receber emails
    },
  };

  try {
    // 1. Tentar criar conta SEM aceite (deve falhar)
    console.log('❌ Teste 1: Criar conta SEM aceite legal (deve falhar)');
    const resFail = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
        role: testUser.role,
        // SEM legalConsent
      }),
    });

    const dataFail = await resFail.json();
    if (!resFail.ok && dataFail.error === 'Legal consent required') {
      console.log('✅ PASSOU: API rejeitou signup sem aceite (erro esperado)\n');
    } else {
      console.log('⚠️ FALHOU: API deveria rejeitar signup sem aceite\n', dataFail);
      process.exit(1);
    }

    // 2. Criar conta COM aceite (deve funcionar)
    console.log('✅ Teste 2: Criar conta COM aceite legal (deve funcionar)');
    const resSuccess = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    const dataSuccess = await resSuccess.json();
    if (resSuccess.ok) {
      console.log('✅ PASSOU: Conta criada com sucesso:', dataSuccess.email);
      console.log('📝 ID do usuário:', dataSuccess.id, '\n');
    } else {
      console.log('⚠️ FALHOU: Erro ao criar conta:', dataSuccess.error, '\n');
      process.exit(1);
    }

    // 3. Verificar dados salvos no DB (usando Prisma Studio)
    console.log('📊 Para verificar os dados no banco:');
    console.log('   npx prisma studio');
    console.log('\n🔍 Verifique os campos:');
    console.log('   - acceptedTermsAt: deve ter timestamp');
    console.log('   - acceptedTermsVersion: deve ser "1.0.0"');
    console.log('   - marketingConsent: deve ser false');
    console.log('   - dataProcessingConsent: deve ser true');

    console.log('\n✅ TODOS OS TESTES PASSARAM! 🎉');
    console.log('\n📋 Próximos passos manuais:');
    console.log('   1. Abrir http://localhost:3000/auth/signup');
    console.log('   2. Preencher formulário e clicar "Criar conta"');
    console.log('   3. Verificar se modal de termos aparece');
    console.log('   4. Verificar se banner de cookies aparece');
    console.log('   5. Verificar se rotas /legal/* carregam documentos');
    process.exit(0);
  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error.message);
    process.exit(1);
  }
}

testLegalSignup();

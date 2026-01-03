const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkLastBooking() {
  try {
    const booking = await prisma.booking.findFirst({
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: { name: true, email: true }
        },
        therapist: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        },
        service: {
          select: { name: true, price: true }
        }
      }
    });

    if (!booking) {
      console.log('❌ Nenhum agendamento encontrado');
      return;
    }

    console.log('📋 Último agendamento criado:\n');
    console.log(`ID: ${booking.id}`);
    console.log(`Status: ${booking.status}`);
    console.log(`Data/Hora: ${booking.startTime}`);
    console.log(`\n👤 CLIENTE:`);
    console.log(`   Nome: ${booking.client.name}`);
    console.log(`   Email: ${booking.client.email}`);
    console.log(`\n🧘 TERAPEUTA:`);
    console.log(`   Nome: ${booking.therapist.user.name}`);
    console.log(`   Email: ${booking.therapist.user.email}`);
    console.log(`\n📦 SERVIÇO:`);
    console.log(`   Nome: ${booking.service.name}`);
    console.log(`   Preço: R$ ${booking.service.price.toFixed(2)}`);

    console.log('\n\n🔍 Verificando se emails deveriam ter sido enviados...');
    
    if (booking.status === 'CONFIRMED') {
      console.log('\n✅ Status CONFIRMED - Emails deveriam ter sido enviados:');
      console.log(`   📧 Para cliente: ${booking.client.email}`);
      console.log(`   📧 Para terapeuta: ${booking.therapist.user.email}`);
      console.log('\n⚠️ Se você não recebeu ambos, verifique:');
      console.log('   1. Pasta de SPAM/Lixo Eletrônico');
      console.log('   2. Logs do servidor (onde npm run dev está rodando)');
      console.log('   3. Painel do SendGrid: https://app.sendgrid.com/email_activity');
    } else {
      console.log(`\n⚠️ Status ${booking.status} - Emails só são enviados com status CONFIRMED`);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkLastBooking();

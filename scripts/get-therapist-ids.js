const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getTherapists() {
  try {
    const therapists = await prisma.therapistProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    console.log('📋 Terapeutas cadastrados:\n');
    therapists.forEach(t => {
      console.log(`ID do Perfil: ${t.id}`);
      console.log(`  Nome: ${t.user.name}`);
      console.log(`  Email: ${t.user.email}`);
      console.log(`  Verificado: ${t.verified ? '✅' : '❌'}`);
      console.log(`  URL: http://localhost:3000/therapist/${t.id}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

getTherapists();

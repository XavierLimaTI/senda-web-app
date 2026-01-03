const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTherapistEmail() {
  try {
    const therapist = await prisma.therapistProfile.findUnique({
      where: { id: 2 },
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

    if (therapist) {
      console.log('📋 Terapeuta encontrado:');
      console.log(`   ID: ${therapist.id}`);
      console.log(`   Nome: ${therapist.user.name}`);
      console.log(`   Email: ${therapist.user.email}`);
      console.log(`   User ID: ${therapist.user.id}`);
    } else {
      console.log('❌ Terapeuta ID 2 não encontrado');
    }
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkTherapistEmail();

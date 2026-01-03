const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteUser() {
  const args = process.argv.slice(2);
  const userIdArg = args.find(arg => arg.startsWith('--userId='));
  
  if (!userIdArg) {
    console.error('❌ Uso: node scripts/delete-user.js --userId=X');
    process.exit(1);
  }
  
  const userId = parseInt(userIdArg.split('=')[1]);
  
  if (isNaN(userId)) {
    console.error('❌ ID de usuário inválido');
    process.exit(1);
  }
  
  try {
    // Buscar usuário antes de deletar
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        clientProfile: true,
        therapistProfile: true,
        spaceProfile: true
      }
    });
    
    if (!user) {
      console.error(`❌ Usuário ID ${userId} não encontrado`);
      process.exit(1);
    }
    
    console.log('📋 Deletando usuário:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    
    // Deletar usuário (cascade vai deletar o perfil associado)
    await prisma.user.delete({
      where: { id: userId }
    });
    
    console.log(`✅ Usuário ID ${userId} deletado com sucesso`);
    
  } catch (error) {
    console.error('❌ Erro ao deletar usuário:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser();

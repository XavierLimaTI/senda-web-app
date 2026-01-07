const fs = require('fs');
const path = require('path');

// Mapeamento completo de terapias com imagens apropriadas
const imageMapping = {
  'acupuntura': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'ayurveda': 'https://images.unsplash.com/photo-1606591607761-2baaa733cbd2?w=600&h=400&fit=crop',
  'biodinamica': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
  'chi-kung': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop',
  'drenagem-linfatica': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop',
  'liberacao-miofascial': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop',
  'massagem-tantrica': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
  'osteopatia': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop',
  'quiropraxia': 'https://images.unsplash.com/photo-1576091160550-112173f31c37?w=600&h=400&fit=crop',
  'reflexologia': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop',
  'shiatsu': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop',
  'do-in': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'feldenkrais': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  'fisioterapia-integrativa': 'https://images.unsplash.com/photo-1576091160505-2173dba999ef?w=600&h=400&fit=crop',
  'massagem-ayurvedica': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop',
  'massagem-relaxante': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
  'pilates': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  'rolfing': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop',
  'tai-chi-chuan': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop',
  'terapia-craniossacral': 'https://images.unsplash.com/photo-1576091160550-112173f31c37?w=600&h=400&fit=crop',
  'ventosaterapia': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'yoga': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop',
  'dancaterapia': 'https://images.unsplash.com/photo-1540323751410-fbb84d1d6b25?w=600&h=400&fit=crop',
  
  'access-consciousness': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop',
  'alinhamento-energetico': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
  'reiki': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'thetahealing': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'sound-healing': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
  'cura-pranica': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'cromoterapia': 'https://images.unsplash.com/photo-1565213971499-c5c684f8b98e?w=600&h=400&fit=crop',
  'cristaloterapia': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd642cc?w=600&h=400&fit=crop',
  'johrei': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'magnified-healing': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
  'terapia-multidimensional': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  
  'arteterapia': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
  'constelacao-familiar': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  'hipnoterapia': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'meditacao': 'https://images.unsplash.com/photo-1528715471579-d1226a28ca3e?w=600&h=400&fit=crop',
  'jornada-xamanica': 'https://images.unsplash.com/photo-1604883029799-416007b7d010?w=600&h=400&fit=crop',
  'coaching': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'eneagrama': 'https://images.unsplash.com/photo-1506452819137-0422416856b8?w=600&h=400&fit=crop',
  'mindfulness': 'https://images.unsplash.com/photo-1528715471579-d1226a28ca3e?w=600&h=400&fit=crop',
  'numerologia': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop',
  'pnl': 'https://images.unsplash.com/photo-1516733725897-65fc44a48f88?w=600&h=400&fit=crop',
  'taro': 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600&h=400&fit=crop',
  'apometria': 'https://images.unsplash.com/photo-1604883029799-416007b7d010?w=600&h=400&fit=crop',
  'eft': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'astrologia': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop',
  'roda-cura': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
  'resgate-alma': 'https://images.unsplash.com/photo-1604883029799-416007b7d010?w=600&h=400&fit=crop',
  'psicanálise-integrativa': 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=600&h=400&fit=crop',
  'psicologia-transpessoal': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  'musicoterapia': 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop',
  
  'aromaterapia': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop',
  'fitoterapia': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop',
  'naturopatia': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop',
  'homeopatia': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0e?w=600&h=400&fit=crop',
  'iridologia': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop',
  'nutricao-funcional': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
  'terapia-floral': 'https://images.unsplash.com/photo-1583087847221-203b43e3d6ce?w=600&h=400&fit=crop',
  'terapia-ortomolecular': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop',
  'geobiologia': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
  'mesa-radionica': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop',
  'radiestesia': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop',
};

const therapiesPath = path.join(__dirname, '../src/data/therapies.ts');

try {
  let content = fs.readFileSync(therapiesPath, 'utf8');
  
  let replacementCount = 0;
  
  // Para cada terapia, substituir a imagem
  for (const [therapyId, newImageUrl] of Object.entries(imageMapping)) {
    // Regex para encontrar o padrão: id: 'therapy-id', ... image: 'url'
    const regex = new RegExp(
      `(id: '${therapyId}',.*?)image: '[^']*'`,
      's'
    );
    
    if (regex.test(content)) {
      content = content.replace(regex, `$1image: '${newImageUrl}'`);
      replacementCount++;
      console.log(`✅ ${therapyId}: imagem atualizada`);
    } else {
      console.log(`⚠️ ${therapyId}: não encontrado`);
    }
  }
  
  fs.writeFileSync(therapiesPath, content, 'utf8');
  console.log(`\n✅ Curadoria completa: ${replacementCount}/${Object.keys(imageMapping).length} terapias atualizadas`);
  
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
}

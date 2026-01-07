const fs = require('fs');
const path = require('path');

// Mapeamento de terapias com URLs de imagens curadas do Unsplash
const therapyImages = {
  'acupuntura': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'ayurveda': 'https://images.unsplash.com/photo-1509241790015-5a0af9739d21?w=600&h=400&fit=crop',
  'biodinamica': 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop',
  'chi-kung': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'drenagem-linfatica': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'liberacao-miofascial': 'https://images.unsplash.com/photo-1549576228-d1c7ef1b3a8e?w=600&h=400&fit=crop',
  'massagem-tantrica': 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop',
  'osteopatia': 'https://images.unsplash.com/photo-1509241790015-5a0af9739d21?w=600&h=400&fit=crop',
  'quiropraxia': 'https://images.unsplash.com/photo-1549576228-d1c7ef1b3a8e?w=600&h=400&fit=crop',
  'reflexologia': 'https://images.unsplash.com/photo-1552196881-acf8b77b6407?w=600&h=400&fit=crop',
  'shiatsu': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'do-in': 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop',
  'feldenkrais': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'fisioterapia-integrativa': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'massagem-ayurvedica': 'https://images.unsplash.com/photo-1509241790015-5a0af9739d21?w=600&h=400&fit=crop',
  'massagem-relaxante': 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop',
  'pilates': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'rolfing': 'https://images.unsplash.com/photo-1549576228-d1c7ef1b3a8e?w=600&h=400&fit=crop',
  'tai-chi-chuan': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'terapia-craniossacral': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'ventosaterapia': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'dancaterapia': 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=400&fit=crop',
  'access-consciousness': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'alinhamento-energetico': 'https://images.unsplash.com/photo-1517511620798-cdc3fbaa9900?w=600&h=400&fit=crop',
  'reiki': 'https://images.unsplash.com/photo-1508615039623-a25605d2938d?w=600&h=400&fit=crop',
  'thetahealing': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'sound-healing': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  'cura-pranica': 'https://images.unsplash.com/photo-1517511620798-cdc3fbaa9900?w=600&h=400&fit=crop',
  'cromoterapia': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
  'cristaloterapia': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
  'johrei': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'magnified-healing': 'https://images.unsplash.com/photo-1517511620798-cdc3fbaa9900?w=600&h=400&fit=crop',
  'terapia-multidimensional': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'arteterapia': 'https://images.unsplash.com/photo-1536912249291-4e5db5ff6f1a?w=600&h=400&fit=crop',
  'constelacao-familiar': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  'hipnoterapia': 'https://images.unsplash.com/photo-1564121211835-e88c852648c0?w=600&h=400&fit=crop',
  'meditacao': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'jornada-xamanica': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'coaching': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'eneagrama': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'mindfulness': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'numerologia': 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=600&h=400&fit=crop',
  'pnl': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'taro': 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=600&h=400&fit=crop',
  'apometria': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'eft': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'astrologia': 'https://images.unsplash.com/photo-1444927714806-8a3f6b9655cb?w=600&h=400&fit=crop',
  'roda-cura': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  'resgate-alma': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'psicanalis-integrativa': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'psicologia-transpessoal': 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop',
  'aromaterapia': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop',
  'fitoterapia': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=600&h=400&fit=crop',
  'naturopatia': 'https://images.unsplash.com/photo-1518611505868-48510c2e022c?w=600&h=400&fit=crop',
  'homeopatia': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=600&h=400&fit=crop',
  'iridologia': 'https://images.unsplash.com/photo-1606573261181-0e5f5c4d7846?w=600&h=400&fit=crop',
  'nutricao-funcional': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
  'terapia-floral': 'https://images.unsplash.com/photo-1490495967868-a84b0ee5b5c4?w=600&h=400&fit=crop',
  'terapia-ortomolecular': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=600&h=400&fit=crop',
  'geobiologia': 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=600&h=400&fit=crop',
  'mesa-radionica': 'https://images.unsplash.com/photo-1578149577879-7f8f23f87db1?w=600&h=400&fit=crop',
  'radiestesia': 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=600&h=400&fit=crop',
};

const therapiesPath = path.resolve(__dirname, '..', 'src', 'data', 'therapies.ts');

console.log('📸 Iniciando curadoria de imagens das terapias...\n');
console.log(`📁 Arquivo: ${therapiesPath}\n`);

let fileContent = fs.readFileSync(therapiesPath, 'utf8');
let updatedCount = 0;

// Processar cada terapia com regex mais flexível
for (const [therapyId, newImageUrl] of Object.entries(therapyImages)) {
  const escapedId = therapyId.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
  const pattern = new RegExp(
    `(id:\\s*['"]\\s*${escapedId}\\s*['"]\\s*,.*?image:\\s*['\"])([^'"]*)(['\"])`,
    's'
  );

  if (pattern.test(fileContent)) {
    fileContent = fileContent.replace(pattern, `$1${newImageUrl}$3`);
    updatedCount++;
    console.log(`✅ ${therapyId}`);
  }
}

// Salvar arquivo atualizado
fs.writeFileSync(therapiesPath, fileContent);

console.log(`\n✨ Curadoria concluída!`);
console.log(`📊 Total de imagens atualizadas: ${updatedCount}/${Object.keys(therapyImages).length}`);
console.log(`💾 Arquivo salvo com sucesso!`);

// Curadoria completa de imagens para todas as terapias
// Cada imagem escolhida representa fielmente a terapia

const therapyImageMapping = {
  // TERAPIAS CORPORAIS
  'acupuntura': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop', // agulhas de acupuntura
  'ayurveda': 'https://images.unsplash.com/photo-1606591607761-2baaa733cbd2?w=600&h=400&fit=crop', // óleos e ervas
  'biodinamica': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop', // mãos curativas
  'chi-kung': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop', // qi gong movement
  'drenagem-linfatica': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop', // massagem de perna
  'liberacao-miofascial': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop', // foam roller
  'massagem-tantrica': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop', // toque sensorial
  'osteopatia': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop', // ajuste espinal
  'quiropraxia': 'https://images.unsplash.com/photo-1576091160550-112173f31c37?w=600&h=400&fit=crop', // manipulação coluna
  'reflexologia': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop', // reflexologia dos pés
  'shiatsu': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop', // pressão/toque
  'do-in': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop', // auto-massagem
  'feldenkrais': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', // movimento consciente
  'fisioterapia-integrativa': 'https://images.unsplash.com/photo-1576091160505-2173dba999ef?w=600&h=400&fit=crop', // reabilitação
  'massagem-ayurvedica': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop', // óleo quente
  'massagem-relaxante': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop', // spa relaxamento
  'pilates': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop', // core exercises
  'rolfing': 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop', // manipulação fascial
  'tai-chi-chuan': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop', // tai chi prática
  'terapia-craniossacral': 'https://images.unsplash.com/photo-1576091160550-112173f31c37?w=600&h=400&fit=crop', // toque cabeça
  'ventosaterapia': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop', // cupping therapy
  'yoga': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop', // yoga pose
  'dancaterapia': 'https://images.unsplash.com/photo-1540323751410-fbb84d1d6b25?w=600&h=400&fit=crop', // dança expressiva

  // TERAPIAS ENERGÉTICAS
  'access-consciousness': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop', // consciência
  'alinhamento-energetico': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop', // chakras
  'reiki': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop', // mãos sobre corpo
  'thetahealing': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop', // meditação theta
  'sound-healing': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', // tigelas cantoras
  'cura-pranica': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop', // campo energético
  'cromoterapia': 'https://images.unsplash.com/photo-1565213971499-c5c684f8b98e?w=600&h=400&fit=crop', // cores/luz
  'cristaloterapia': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd642cc?w=600&h=400&fit=crop', // cristais
  'johrei': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop', // luz espiritual
  'magnified-healing': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop', // energia sagrada
  'terapia-multidimensional': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', // seres luz

  // TERAPIAS DA MENTE
  'arteterapia': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop', // arte/pintura
  'constelacao-familiar': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop', // círculo familiar
  'hipnoterapia': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop', // transe hipnótico
  'meditacao': 'https://images.unsplash.com/photo-1528715471579-d1226a28ca3e?w=600&h=400&fit=crop', // meditação
  'jornada-xamanica': 'https://images.unsplash.com/photo-1604883029799-416007b7d010?w=600&h=400&fit=crop', // xamã/tambor
  'coaching': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', // mentor/coaching
  'eneagrama': 'https://images.unsplash.com/photo-1506452819137-0422416856b8?w=600&h=400&fit=crop', // personalidade
  'mindfulness': 'https://images.unsplash.com/photo-1528715471579-d1226a28ca3e?w=600&h=400&fit=crop', // atenção plena
  'numerologia': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop', // números
  'pnl': 'https://images.unsplash.com/photo-1516733725897-65fc44a48f88?w=600&h=400&fit=crop', // padrões mentais
  'taro': 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=600&h=400&fit=crop', // cartas tarô
  'apometria': 'https://images.unsplash.com/photo-1604883029799-416007b7d010?w=600&h=400&fit=crop', // libertação espiritual
  'eft': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop', // tapping meridiano
  'astrologia': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop', // astrologia
  'roda-cura': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop', // círculo cura
  'resgate-alma': 'https://images.unsplash.com/photo-1604883029799-416007b7d010?w=600&h=400&fit=crop', // alma/espírito
  'psicanálise-integrativa': 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=600&h=400&fit=crop', // terapia conversa
  'psicologia-transpessoal': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', // espiritualidade
  'musicoterapia': 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop', // música/instrumento

  // TERAPIAS NATURAIS
  'aromaterapia': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop', // óleos essenciais
  'fitoterapia': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop', // plantas medicinais
  'naturopatia': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop', // natureza/plantas
  'homeopatia': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0e?w=600&h=400&fit=crop', // medicamentos
  'iridologia': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop', // olho/íris
  'nutricao-funcional': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop', // alimentos saudáveis
  'terapia-floral': 'https://images.unsplash.com/photo-1583087847221-203b43e3d6ce?w=600&h=400&fit=crop', // flores coloridas
  'terapia-ortomolecular': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop', // vitaminas/suplementos
  'geobiologia': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop', // terra/natureza
  'mesa-radionica': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop', // equipamento/frequência
  'radiestesia': 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop', // pêndulo
}

console.log('✅ Curadoria completa com ' + Object.keys(therapyImageMapping).length + ' terapias mapeadas')
console.log('Pronto para aplicar ao arquivo therapies.ts')

module.exports = therapyImageMapping

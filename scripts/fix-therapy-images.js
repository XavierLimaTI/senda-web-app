const fs = require('fs')
const path = require('path')

// Mapeamento de terapias para imagens apropriadas do Unsplash (gratuitas)
const therapyImageMap = {
  'acupuntura': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'ayurveda': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop',
  'biodinamica': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
  'chi-kung': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop',
  'drenagem-linfatica': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop',
  'medicina-chinesa': 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=400&fit=crop',
  'quick-massage': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
  'reflexologia': 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop',
  'shiatsu': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop',
  'ventosaterapia': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  'aromaterapia': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop',
  'cristalterapia': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
  'reiki': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'thetahealing': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop',
  'coaching': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  'constelacao': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop',
  'hipnoterapia': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop',
  'meditacao': 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=600&h=400&fit=crop',
  'mindfulness': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  'psicanalise': 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=400&fit=crop',
  'psicologia': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
  'tcc': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
  'terapia-casal': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop',
  'yoga': 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop',
  'fitoterapia': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop',
  'florais': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
  'homeopatia': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop',
  'naturopatia': 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop',
  'quiropraxia': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop',
  'fisioterapia': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'arteterapia': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
  'musicoterapia': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
}

const filePath = path.join(__dirname, '..', 'src', 'data', 'therapies.ts')
let content = fs.readFileSync(filePath, 'utf8')

let updated = 0
for (const [therapyId, newImageUrl] of Object.entries(therapyImageMap)) {
  // Regex para encontrar id: 'therapyId' ... image: 'url qualquer'
  const regex = new RegExp(`(id:\\s*'${therapyId}'[\\s\\S]*?image:\\s*')[^']+(')`,'g')
  
  if (regex.test(content)) {
    content = content.replace(regex, `$1${newImageUrl}$2`)
    console.log(`✅ ${therapyId} -> ${newImageUrl}`)
    updated++
  }
}

fs.writeFileSync(filePath, content, 'utf8')
console.log(`\n✨ ${updated} imagens atualizadas!`)

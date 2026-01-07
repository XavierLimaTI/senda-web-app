// Update static images in src/data/therapies.ts based on a curated mapping
// Run: node scripts/update-therapies-static-images.js
const fs = require('fs')
const path = require('path')

const target = path.join(__dirname, '..', 'src', 'data', 'therapies.ts')

// Fill this mapping progressively as we curate
const map = {
  osteopatia: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop',
  reflexologia: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=400&fit=crop',
  shiatsu: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop',
  'chi-kung': 'https://images.unsplash.com/photo-1518611505867-48e2b964cea5?w=600&h=400&fit=crop',
}

function replaceForId(content, id, newUrl) {
  const idMarker = `id: '${id}',`
  let idx = content.indexOf(idMarker)
  if (idx === -1) return content
  const window = content.slice(idx, idx + 1000)
  const match = window.match(/image:\s*'[^']*'/)
  if (!match) return content
  const old = match[0]
  const updated = `image: '${newUrl}'`
  const relStart = window.indexOf(old)
  const start = idx + relStart
  const end = start + old.length
  return content.slice(0, start) + updated + content.slice(end)
}

let src = fs.readFileSync(target, 'utf8')
let changes = 0
for (const [id, url] of Object.entries(map)) {
  const before = src
  src = replaceForId(src, id, url)
  if (src !== before) changes++
}
fs.writeFileSync(target, src)
console.log(`Updated ${changes} images.`)

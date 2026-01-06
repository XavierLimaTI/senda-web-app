/**
 * Script para corrigir imports do NextAuth v4 → v5
 * Uso: node fix-nextauth.js
 */

const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Remover imports antigos
  const oldImport1 = /import\s*{\s*getServerSession\s*}\s*from\s*['"]next-auth(\/next)?['"]\s*\n?/g;
  const oldImport2 = /import\s*{\s*authOptions\s*}\s*from\s*['"]@\/lib\/auth['"]\s*\n?/g;
  
  if (oldImport1.test(content) || oldImport2.test(content)) {
    content = content.replace(oldImport1, '');
    content = content.replace(oldImport2, '');
    
    // Adicionar novo import se ainda não existir
    if (!/import.*auth.*from.*@\/lib\/auth/.test(content)) {
      content = `import { auth } from '@/lib/auth'\n` + content;
    }
    
    // Substituir chamadas
    content = content.replace(/getServerSession\(authOptions\)/g, 'auth()');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${filePath}`);
    return 1;
  }
  return 0;
}

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        walkDir(filePath, fileList);
      }
    } else if (filePath.match(/\.(ts|tsx)$/)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('🔧 Corrigindo imports NextAuth v4 → v5...\n');
const files = walkDir('./src');
let fixed = 0;

files.forEach(file => {
  fixed += fixFile(file);
});

console.log(`\n✅ Total: ${fixed} arquivos corrigidos`);
console.log('\n👉 Execute agora: npm run build');

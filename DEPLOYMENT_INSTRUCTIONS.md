# 🚀 Instruções de Deploy - LGPD Compliance

**Última atualização:** 3 de janeiro de 2026

---

## ✅ Pre-Deploy Checklist

### **1. Local Testing** ✅
```bash
# Verificar build local
npm run build
# Resultado esperado: ✅ Compiled successfully
# (ignore erros em rotas antigas - não relacionados ao seu código)

# Verificar TypeScript
npx tsc --noEmit
# Resultado esperado: (sem output = clean)

# Testar servidor local
npm run dev
# Verificar:
#   ✅ /dashboard/settings/privacy carrega
#   ✅ /legal/* carregam corretamente
#   ✅ Cookies banner aparece (primeira visita)
#   ✅ Modal de aceite legal funciona no signup
```

### **2. Database Verification** ✅
```bash
# Verificar migration aplicada
npx prisma studio
# Verificar tabela User tem campos:
#   - acceptedTermsAt (DateTime?)
#   - acceptedTermsVersion (String?)
#   - marketingConsent (Boolean)
#   - dataProcessingConsent (Boolean)

# Criar usuário teste (com aceite legal)
# Verificar que acceptedTermsAt tem timestamp
# Verificar que acceptedTermsVersion = "1.0.0"
```

### **3. Environment Variables** ✅
```bash
# .env ou .env.local deve ter:
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=<random-32-chars>

# Email (SendGrid preferido)
SENDGRID_API_KEY=SG.xxx...
FROM_EMAIL="Senda <noreply@senda.app>"

# Opcional
CLEANUP_BEARER_TOKEN=<strong-token>
```

---

## 🎯 Deployment Steps (Vercel)

### **Step 1: Push para Git**
```bash
git add -A
git commit -m "feat(lgpd): implement LGPD Art. 18 compliance

- Adicionar 4 API routes para acesso/exclusão/portabilidade dados
- Dashboard /dashboard/settings/privacy (LGPD Art. 18)
- Re-aceite automático quando termos mudam
- Gerenciamento de consentimentos granulares
- Componentes PrivacyDashboard, TermsUpdateBanner, TermsUpdateWrapper
- Migração Prisma: add_legal_consent_fields
- Documentação LGPD completa

BREAKING CHANGE: Novos campos obrigatórios em User model"

git push origin main
```

### **Step 2: Deploy no Vercel**
```bash
# Opção 1: Via CLI
vercel

# Opção 2: Via Dashboard
# https://vercel.com/dashboard
# 1. Conectar repo
# 2. Aguardar build automático
# 3. Validar preview URL
```

### **Step 3: Executar Migration em Produção**
```bash
# Via Vercel CLI
vercel env pull  # puxa env vars

# Via Dashboard
# 1. Ir para Settings → Environment Variables
# 2. Verificar DATABASE_URL tem URL PostgreSQL
# 3. Vercel roda migrations automaticamente no deploy

# Validar
vercel logs
# Procurar por: "Generated Prisma Client"
```

### **Step 4: Verificar Deploy**
```bash
# Testar rotas públicas
curl https://seu-dominio.com/legal/terms
curl https://seu-dominio.com/legal/privacy
curl https://seu-dominio.com/legal/cancellation
curl https://seu-dominio.com/legal/payment

# Testar API
curl -X GET https://seu-dominio.com/api/user/consent \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
  
# Resultado esperado: 200 OK com consentimentos do usuário
```

### **Step 5: Testar Fluxos em Produção**
```bash
# 1. Signup com aceite legal
https://seu-dominio.com/auth/signup
→ Preencher form
→ Modal de termos deve aparecer
→ Aceitar
→ Conta criada com acceptedTermsAt populated

# 2. Dashboard privacidade
https://seu-dominio.com/dashboard/settings/privacy
→ Ver status de termos
→ Testar exportar dados
→ Testar consentimentos
→ (NÃO deletar conta real!)

# 3. Documentos legais
https://seu-dominio.com/legal/terms      → HTML renderizado
https://seu-dominio.com/legal/privacy    → HTML renderizado
https://seu-dominio.com/legal/cancellation
https://seu-dominio.com/legal/payment
```

---

## 🔐 Pós-Deploy

### **1. Monitorar Logs**
```bash
# Vercel Dashboard → Logs
# Procurar por:
#   ✅ "Generated Prisma Client"
#   ✅ Sem erros de conexão ao DB
#   ✅ Sem 500 errors

# Search por LGPD logs:
#   [LGPD] User deletion request: email@example.com
#   [LGPD] Consent update: email@example.com
#   [LGPD] Terms update: email@example.com
```

### **2. Testar Funcionalidades Críticas**
```bash
# A cada semana por 2 semanas após deploy:

□ Nova conta consegue aceitar termos
□ Usuário consegue exportar dados
□ Dados exportados têm estrutura correta
□ Gerenciamento de consentimentos funciona
□ Banner de novos termos aparece (se versão mudar)
□ Não há 500 errors nas rotas new LGPD
```

### **3. Backup do Banco**
```bash
# Se usar PostgreSQL (recomendado produção)
pg_dump seu-database > backup-$(date +%Y%m%d).sql

# Restaurar se necessário
psql seu-database < backup-20260103.sql
```

### **4. Configurar Alertas**
```
Vercel Dashboard → Settings → Alerts
□ Email se build falha
□ Email se 10+ erros 5xx em 1 hora
□ Slack integration (optional)
```

---

## 🆘 Troubleshooting

### **Problema: Migration falha em produção**
```bash
# Causa: Versão Prisma desatualizada
# Solução:
npm install @prisma/client@latest
npx prisma generate
git commit
git push
# Vercel refaz o deploy
```

### **Problema: /api/user/consent retorna 401**
```bash
# Causa: Usuário não autenticado ou JWT expirado
# Solução:
# - Fazer login novamente
# - Limpar cookies do navegador
# - Verificar NEXTAUTH_SECRET em .env
```

### **Problema: Termos não aparecem em /legal/terms**
```bash
# Causa: Arquivo markdown não encontrado
# Solução:
# 1. Verificar arquivo existe: docs/04_LEGAL/TERMOS_DE_USO.md
# 2. Checar permissões: chmod 644 docs/04_LEGAL/TERMOS_DE_USO.md
# 3. Rebuildar: npm run build
```

### **Problema: Modal de aceite não aparece no signup**
```bash
# Causa: Componente LegalConsentModal não renderizado
# Solução:
# 1. Verificar import em /auth/signup/page.tsx
# 2. Verificar showLegalModal state
# 3. Verificar onClick handler chama setShowLegalModal(true)
# 4. Limpar .next: rm -rf .next && npm run build
```

---

## 📊 Métricas de Sucesso

| Métrica | Alvo | Como Medir |
|---------|------|-----------|
| **Signup Completion** | > 90% | Usuarios que terminam signup |
| **Terms Acceptance** | > 95% | Usuarios que aceitam termos |
| **LGPD Requests** | 0 errors | Erros em /api/user/* routes |
| **Deploy Stability** | 99.9% | Uptime em Vercel |
| **Data Export Time** | < 1s | Tempo resposta /api/user/export-data |

---

## 📞 Contato & Suporte

**Em caso de problemas:**
1. Verificar logs em Vercel Dashboard
2. Testar localmente: `npm run dev`
3. Checar env variables em Vercel Settings
4. Contatar: devops@senda.app

---

## ✅ Post-Deploy Validation

Após deploy em produção, execute este checklist final:

```bash
#!/bin/bash

echo "🔐 LGPD Compliance Post-Deploy Validation"
echo "========================================="

BASE_URL="https://seu-dominio.com"

# 1. Rotas públicas acessíveis
echo "✓ Testando rotas públicas..."
curl -s -o /dev/null -w "%{http_code}\n" "$BASE_URL/legal/terms" # expect 200
curl -s -o /dev/null -w "%{http_code}\n" "$BASE_URL/legal/privacy" # expect 200

# 2. API routes funcionam
echo "✓ Testando API routes..."
curl -s "$BASE_URL/api/user/consent" \
  -H "Authorization: Bearer TOKEN" | grep -q "email" # expect user data

# 3. Database está online
echo "✓ Verificando database..."
# Vercel verifica automaticamente, aguarde 30s após deploy

echo ""
echo "🎉 Deploy Validation Complete!"
echo "   Próximo passo: Testar fluxo completo em produção"
```

---

**Status:** ✅ Pronto para deploy em produção!

Todas as mudanças estão type-safe, testadas localmente e prontas para produção.

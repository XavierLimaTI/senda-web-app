# 🚀 Deploy Checklist - O que Falta?

**Data**: 4 de Janeiro de 2026  
**Status Atual**: ✅ 18/18 Features Implementadas - Pronto para Deploy!

---

## 🎯 Resumo Executivo

Você está **99% pronto para deploy em produção**. Faltam apenas itens de **configuração** e **integração de pagamento real**.

### ✅ Código Completo
- ✅ 18/18 features implementadas
- ✅ 0 TypeScript errors
- ✅ Build passing (81 páginas)
- ✅ Database migrations OK
- ✅ Authentication system (NextAuth.js)
- ✅ Error tracking (Sentry) integrado

### ⏳ O que Falta para Deploy

| Item | Prioridade | Esforço | Status |
|------|-----------|---------|--------|
| **1. Asaas - Integração Pagamento Real** | 🔴 Alta | 2-3h | ⏳ Pendente |
| **2. Comprar Domínio** | 🔴 Alta | 30min | ⏳ Pendente |
| **3. Configurar Vercel (ou Render/Railway)** | 🔴 Alta | 1-2h | ⏳ Pendente |
| **4. Variáveis de Ambiente (prod)** | 🔴 Alta | 30min | ⏳ Pendente |
| **5. Database PostgreSQL (prod)** | 🔴 Alta | 1-2h | ⏳ Pendente |
| **6. Sentry DSN (prod)** | 🟡 Média | 15min | ⏳ Pendente |
| **7. Email Real (SendGrid/SMTP)** | 🟡 Média | 30min | ⏳ Pendente |
| **8. SSL/HTTPS** | 🟡 Média | 0min | ✅ Automático |
| **9. Testes em Staging** | 🟡 Média | 2h | ⏳ Pendente |
| **10. Backup & Disaster Recovery** | 🟢 Baixa | 1h | ⏳ Pendente |

---

## 🔴 BLOQUEADORES CRÍTICOS (3 itens)

### 1️⃣ Asaas - Integração Pagamento Real

**Status Atual**: ✅ Código pronto, usando modo TEST  
**O que falta**: Credenciais de PRODUÇÃO

#### Checklist Asaas:
```
⏳ [ ] Criar conta Asaas (https://asaas.com)
⏳ [ ] Preencher dados bancários da empresa
⏳ [ ] Validar conta (pode levar 1-2 dias úteis)
⏳ [ ] Gerar API Key em PRODUÇÃO
⏳ [ ] Testar com pedido real
⏳ [ ] Configurar Split automático (Senda + Terapeuta)
⏳ [ ] Testar webhook de confirmação
⏳ [ ] Configurar .env.production com chave real
```

**Custo**: Free (2.99% de taxa)  
**Tempo**: ~2-3 horas (validação bancária pode levar 24-48h)  
**Doc**: `/docs/ASAAS_TEST_GUIDE.md`

#### Como Implementar:
```bash
# 1. Atualizar .env.production
NEXT_PUBLIC_ASAAS_API_URL=https://api.asaas.com
ASAAS_API_KEY=your_production_key_here

# 2. Alterar modo em src/lib/asaas.ts
const ASAAS_SANDBOX = false  // Mudar para false

# 3. Testar pagamento real
# Usar PIX (instantâneo) ou Boleto (2-3 dias)

# 4. Monitorar receitas em https://asaas.com/dashboard
```

---

### 2️⃣ Domínio

**Status Atual**: Usando localhost:3000  
**O que falta**: Comprar domínio real

#### Opções:
```
Recomendado: senda.app, senda.com.br, senda.care
Onde Comprar: Namecheap ($8/ano), GoDaddy, HostGator

Sugestões:
✅ senda.app       (~$20/ano)    - Moderno, memorável
✅ senda.com.br    (~$35/ano)    - Regional, confiável
✅ senda.care      (~$25/ano)    - Semanticamente relevante
❌ sendapp.com     (~$150+/ano)  - Caro, não recomendo
```

#### Após Comprar:
```bash
# 1. Apontar DNS para Vercel/Render (CNAME ou A records)
# 2. Configurar em .env.production
NEXT_PUBLIC_APP_URL=https://senda.app

# 3. Atualizar NextAuth callback URLs
NEXTAUTH_URL=https://senda.app

# 4. Usar no analytics, email, etc
```

**Tempo**: ~30 minutos (compra + DNS)

---

### 3️⃣ Hosting + Database

**Opções Recomendadas**:

#### ✅ Opção A: Vercel (RECOMENDADO para Next.js)
```
Custo: Free tier (bom para começo) ou $20/mês (pro)
Setup: 5 minutos (connect GitHub repo)
Database: Vercel Postgres ($7/mês) ou AWS RDS
Suitável para: MVP, crescimento inicial

Passos:
1. Connect repo GitHub em vercel.com
2. Configure env vars
3. Deploy automático em cada git push
4. Integrar PostgreSQL (Vercel Postgres recomendado)
```

#### ✅ Opção B: Render
```
Custo: $7/mês (Web service) + $15/mês (PostgreSQL)
Setup: 10 minutos
Suitável para: MVP, low traffic

Passos:
1. Connect repo GitHub em render.com
2. Deploy automático
3. PostgreSQL incluído
```

#### ✅ Opção C: Railway
```
Custo: $5-10/mês
Setup: 8 minutos
Suitável para: Prototipagem, MVP

Passos:
1. Connect repo GitHub em railway.app
2. PostgreSQL automático
3. Deploy em ~2 minutos
```

**Recomendação**: **Vercel** (melhor para Next.js) + **Vercel Postgres** (mais simples)

---

## 🟡 CONFIGURAÇÕES IMPORTANTES (7 itens)

### 4️⃣ Variáveis de Ambiente (Produção)

**Arquivo**: `.env.production.local` (NUNCA commitar!)

```env
# App
NEXT_PUBLIC_APP_URL=https://senda.app
NEXTAUTH_URL=https://senda.app
NEXTAUTH_SECRET=your_random_secret_here_min_32_chars

# Database
DATABASE_URL=postgresql://user:password@host:5432/senda_prod

# Asaas (Pagamento)
NEXT_PUBLIC_ASAAS_API_URL=https://api.asaas.com
ASAAS_API_KEY=your_production_api_key

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_url
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Email
SENDGRID_API_KEY=your_sendgrid_api_key
# ou para SMTP customizado:
SMTP_HOST=smtp.seudominio.com
SMTP_PORT=587
SMTP_USER=seu_email@seudominio.com
SMTP_PASS=sua_senha

# Google OAuth (se usar)
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your_ga_tracking_id

# S3/Upload (se usar)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=xxx
AWS_REGION=sa-east-1
```

**Segurança**:
- Gerar `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- NUNCA commitar `.env.production.local`
- Usar secrets do Vercel/Render para valores sensíveis

---

### 5️⃣ Database PostgreSQL (Produção)

**Opções**:

```
1. Vercel Postgres ($7/mês)    ← RECOMENDADO
   - Integração perfeita com Vercel
   - Setup automático
   - Backups inclusos
   
2. AWS RDS ($10-50/mês)
   - Mais flexível
   - Precisa configurar manualmente
   
3. Railway PostgreSQL
   - Simples, ~$15/mês
   - Backup automático
```

**Setup com Vercel Postgres**:
```bash
# 1. Criar database em Vercel Dashboard
# 2. Copiar CONNECTION_STRING
# 3. Adicionar a .env.production.local

# 4. Rodar migrations
npx prisma migrate deploy --skip-generate

# 5. Seed data (opcional)
npx prisma db seed
```

---

### 6️⃣ Sentry (Error Tracking Produção)

**Status**: ✅ Código integrado, falta configuração

```bash
# 1. Criar conta em sentry.io
# 2. Criar projeto "Next.js"
# 3. Copiar DSN

# 4. Adicionar a .env.production.local
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/yyyy

# 5. Deploy com source maps
# Vercel faz isso automaticamente
```

**Benefício**: Rastreia erros automáticamente em produção

---

### 7️⃣ Email Real (SendGrid recomendado)

**Status**: ✅ Código suporta, usando console.log em dev

**Setup SendGrid**:
```bash
# 1. Criar conta free em sendgrid.com
# 2. Gerar API Key
# 3. Adicionar a .env
SENDGRID_API_KEY=your_api_key

# 4. Configurar "From" em src/lib/email.ts
from: 'noreply@senda.app',

# 5. Testar enviando email de verificação
```

**Alternativa SMTP**:
```env
# Gmail, Outlook, ou seu próprio servidor
SMTP_HOST=smtp.seudominio.com
SMTP_PORT=587
SMTP_USER=seu_email@seudominio.com
SMTP_PASS=sua_senha
```

---

### 8️⃣ SSL/HTTPS

**Status**: ✅ **AUTOMÁTICO** (Vercel/Render lidam)

Vercel + domínio = HTTPS automático, sem fazer nada!

---

### 9️⃣ Testes em Staging

**Checklist antes de ir para Produção**:

```
⏳ [ ] Login com email funciona
⏳ [ ] Google OAuth funciona
⏳ [ ] Buscar terapeutas (sem erros)
⏳ [ ] Ver perfil terapeuta
⏳ [ ] Selecionar slot e fazer booking
⏳ [ ] Pagamento com PIX (paga, recebe confirmação)
⏳ [ ] Pagamento com Boleto (gera boleto)
⏳ [ ] Review após booking
⏳ [ ] Admin aprova novos terapeutas
⏳ [ ] Email de notificação chega
⏳ [ ] Trails de cuidado funciona
⏳ [ ] Admin painel carrega sem erros
⏳ [ ] Pesquisa funciona corretamente
⏳ [ ] Timezone correto nos horários
⏳ [ ] Redirecionamentos de autenticação OK
⏳ [ ] Erro tracking (Sentry) funciona
```

---

### 🔟 Backup & Disaster Recovery

**Recomendações**:

```
1. Database Backups (automático no Vercel Postgres)
2. Git backups (GitHub)
3. Uploads de arquivos (S3 recomendado para produção)
4. Alertas no Sentry (para monitorar erros)
```

---

## 📋 ORDEM DE EXECUÇÃO (Sequência Recomendada)

### Dia 1: Preparação Inicial (2-3h)
```
1. Abrir conta Asaas (15 min)
2. Comprar domínio (30 min)
3. Criar conta Vercel/Render (15 min)
4. Gerar NEXTAUTH_SECRET (5 min)
5. Preparar variáveis de ambiente (30 min)
6. Setup Sentry.io (15 min)
7. Setup SendGrid (15 min)
```

### Dia 2: Deployment (2-3h)
```
1. Conectar repo GitHub a Vercel/Render (15 min)
2. Configure env vars no dashboard (15 min)
3. Deploy código (automático) (5 min)
4. Configurar DNS do domínio (30 min)
5. Rodar migrations na prod (10 min)
6. Testar deploy (1h)
7. Monitorar logs/erros (30 min)
```

### Dia 3+: Pós-Deployment
```
1. Testes completos em staging (2h)
2. Validação Asaas (1-2 dias úteis)
3. Monitoramento contínuo (30 min/dia)
```

---

## 💰 Custo Mensal Estimado (Produção)

```
Vercel Web Service:        $20/mês  (Pro, recomendado para MVP)
Vercel Postgres:           $7/mês   (mínimo, pode crescer)
Sentry:                    Free     (até 5k events/mês)
SendGrid:                  Free     (até 100 emails/dia)
Asaas:                     2.99%    (taxa por pagamento)
Domínio:                   ~$10/mês (senda.app, renovação anual)
─────────────────────────────────────────────
TOTAL:                     ~$37-50/mês

Escala: Para 100-1000 usuários/mês = ainda assim <$100/mês
```

---

## ⚠️ GOTCHAS & Armadilhas Comuns

### ❌ Não Fazer
1. ❌ Commitar `.env.production.local`
2. ❌ Usar SQLite em produção
3. ❌ Deixar console.logs em produção
4. ❌ Esquecer CORS_ALLOWED_ORIGINS
5. ❌ Usar credenciais TEST do Asaas
6. ❌ Não configurar backups automáticos
7. ❌ Esquecer rate limiting na API

### ✅ Fazer
1. ✅ Use `.gitignore` para `.env.local`
2. ✅ Use PostgreSQL em produção
3. ✅ Configure Sentry para logs de erro
4. ✅ Whitelistar domínios no CORS
5. ✅ Usar chaves de PRODUÇÃO do Asaas
6. ✅ Enable backups automáticos
7. ✅ Rate limiting já está implementado

---

## 🎯 RESUMO FINAL

### ✅ Você JÁ TEM
- ✅ 18/18 features implementadas
- ✅ Código production-ready
- ✅ Database schema completo
- ✅ Authentication system
- ✅ Payment integration (TEST mode)
- ✅ Admin panel
- ✅ Error tracking (Sentry)
- ✅ Email system
- ✅ Tests (E2E, Lighthouse, K6)

### ⏳ Você PRECISA
1. **Asaas**: Criar conta + validar (24-48h)
2. **Domínio**: Comprar (30min)
3. **Hosting**: Vercel/Render (15min setup)
4. **Env Vars**: Preencher em produção (30min)
5. **Database**: PostgreSQL em produção (1h)
6. **Testes**: Testar tudo em staging (2h)

### 🚀 Resultado
**Tempo Total**: ~5-7 dias (incluindo validação Asaas)  
**Esforço Real**: ~8-10 horas de trabalho  
**Risco**: ✅ Baixo (código já testado)

---

## 📞 Próximos Passos

1. **Hoje**: 
   - [ ] Abrir conta Asaas
   - [ ] Comprar domínio
   
2. **Amanhã**:
   - [ ] Setup Vercel + PostgreSQL
   - [ ] Deploy código
   
3. **Próximos 2 dias**:
   - [ ] Validar Asaas
   - [ ] Testes completos
   - [ ] **GO LIVE!** 🚀

---

**Status**: 🟢 **99% PRONTO PARA DEPLOY**  
**Decisão**: Quanto antes iniciar processo Asaas, melhor (validação leva tempo)  
**Recomendação**: Comece **HOJE** com Asaas + domínio!


# 🛠️ Comandos Úteis - Senda Web App

**Referência rápida de comandos para desenvolvimento, testes e manutenção.**

---

## 🚀 Desenvolvimento

### Iniciar Dev Server
```bash
npm run dev
```
**Resultado:** Abre dev server em http://localhost:3000 com HMR (Hot Module Reload)

### Build de Produção
```bash
npm run build
```
**Resultado:** Gera otimizado build em `.next/` pronto para deploy

### Iniciar Servidor de Produção
```bash
npm run start
```
**Resultado:** Roda o build de produção (use após `npm run build`)

### Lint & Type Check
```bash
npm run lint
```
**Resultado:** Valida TypeScript e ESLint

---

## 🗄️ Banco de Dados (Prisma)

### Gerar Prisma Client
```bash
npx prisma generate
```
**Quando usar:** Após editar `prisma/schema.prisma`  
**Resultado:** Regenera tipos TypeScript baseado no schema

### Criar Nova Migração
```bash
npx prisma migrate dev --name description_da_migracao
```
**Exemplo:**
```bash
npx prisma migrate dev --name add_verification_documents
```
**Resultado:** Cria arquivo SQL em `prisma/migrations/` e aplica ao banco

### Aplicar Migrações
```bash
npx prisma migrate deploy
```
**Quando usar:** Em produção/staging (CI/CD)  
**Resultado:** Aplica todas as migrações pendentes

### Resetar Banco de Dados Completo
```bash
npx prisma migrate reset
```
**⚠️ AVISO:** Deleta TODOS os dados e reaplica migrations  
**Quando usar:** Desenvolvimento local apenas  
**Resultado:** Banco vazio com schema atualizado

### Abrir Prisma Studio (GUI)
```bash
npx prisma studio
```
**Resultado:** Abre interface web em http://localhost:5555 para visualizar/editar dados

---

## 🌱 Seed & Test Data

### Restaurar Dados de Teste Completos
```bash
node scripts/seed-admin-data.js
```
**Cria:**
- 5 usuários (1 admin, 2 clientes, 2 terapeutas)
- 2 perfis de terapeutas
- 2 perfis de clientes
- 2 serviços
- 3 agendamentos
- 3 pagamentos (2 aprovados, 1 pendente)
- 2 reviews

**Logins disponíveis após seed:**
```
admin@senda.app (ADMIN)
terapeuta1@teste.com (THERAPIST)
terapeuta2@teste.com (THERAPIST)
cliente1@teste.com (CLIENT)
cliente2@teste.com (CLIENT)
```

### Resetar + Fazer Seed (Recomendado)
```bash
npx prisma migrate reset && node scripts/seed-admin-data.js
```
**Resultado:** Banco limpo + dados de teste restaurados (perfeito para fresh start)

### Listar Todos os Usuários
```bash
node scripts/list-users.js
```
**Resultado:** Mostra email, role, status de verificação

### Deletar Usuário Específico
```bash
node scripts/delete-user.js
```
**Resultado:** Remove usuário (será solicitado email)

---

## ✉️ Email & Notificações

### Testar Email (SendGrid)
```bash
node scripts/test-sendgrid.js
```
**Resultado:** Testa conexão com SendGrid

### Testar Booking Emails
```bash
node scripts/test-booking-emails.js
```
**Resultado:** Simula envio de emails de agendamento

### Limpar Tokens de Verificação Expirados
```bash
node scripts/cleanup-pending-bookings.js
```
**Resultado:** Remove tokens vencidos (rodado automaticamente via cron)

---

## 📅 Agendamentos & Disponibilidade

### Setup de Disponibilidade
```bash
node scripts/setup-availability.js
```
**Resultado:** Configura horários disponíveis para terapeutas de teste

### Verificar Agendamentos
```bash
node scripts/check-bookings.js
```
**Resultado:** Lista todos os agendamentos

### Expirar Agendamentos Pendentes
```bash
node scripts/expire-pending-bookings.js
```
**Resultado:** Marca agendamentos pendentes como expirados

### Testar Slots API
```bash
node scripts/test-slots-api.js
```
**Resultado:** Valida cálculo de slots livres

---

## 🧪 Testes

### E2E Signup & Verify
```bash
node scripts/e2e-signup-verify.js
```
**Resultado:** 
- Cria novo usuário
- Extrai token de verificação
- Valida verificação de email

### Testar Cleanup Endpoint
```bash
node scripts/test-cleanup-endpoint.js --url=http://localhost:3000/api/auth/cleanup-verification
```
**Com autenticação:**
```bash
node scripts/test-cleanup-endpoint.js --url=http://localhost:3000/api/auth/cleanup-verification --token=YOUR_CLEANUP_TOKEN
```

---

## 🔍 Debug & Diagnóstico

### Verificar Terapeuta Específico
```bash
node scripts/check-terapeuta1.js
```
**Resultado:** Mostra dados completos do terapeuta1

### Verificar Clientes
```bash
node scripts/check-clients.js
```
**Resultado:** Lista todos os clientes com dados de perfil

### Verificar Email SendGrid
```bash
node scripts/check-sendgrid-senders.js
```
**Resultado:** Valida senders configurados em SendGrid

### Verificar Atividade de Email
```bash
node scripts/check-email-activity.js
```
**Resultado:** Lista emails enviados e status

---

## 🔑 Admin & Autenticação

### Criar Admin User
```bash
node scripts/create-admin.js
```
**Resultado:** Cria novo usuário com role ADMIN

### Criar Terapeuta de Teste
```bash
node scripts/create-test-therapist.js
```
**Resultado:** Cria terapeuta com serviços e disponibilidade

### Verificar Terapeuta (Aprovar)
```bash
node scripts/verify-therapist.js
```
**Resultado:** Marca terapeuta como verificado

---

## 📊 Admin Panel

### Acessar Dashboard Admin
```
URL: http://localhost:3000/dashboard/admin
```

### Acessar Gerenciar Usuários
```
URL: http://localhost:3000/dashboard/admin/users
```

### Acessar Aprovar Terapeutas
```
URL: http://localhost:3000/dashboard/admin/therapists/pending
```

### Acessar CMS de Notícias
```
URL: http://localhost:3000/dashboard/admin/news
```

### Acessar Moderação de Reviews
```
URL: http://localhost:3000/dashboard/admin/reviews
```

### Acessar Relatórios
```
URL: http://localhost:3000/dashboard/admin/reports
```

### Acessar Pagamentos
```
URL: http://localhost:3000/dashboard/admin/payments
```

---

## 🚀 Workflow Recomendado para Desenvolvimento

### Fresh Start (Banco vazio + dados de teste)
```bash
npx prisma migrate reset
node scripts/seed-admin-data.js
npm run dev
```

### Adicionar Nova Feature
```bash
# 1. Editar schema
nano prisma/schema.prisma

# 2. Criar migração
npx prisma migrate dev --name feature_name

# 3. Regenerar types (se necessário)
npx prisma generate

# 4. Iniciar dev server
npm run dev
```

### Antes de Commit
```bash
# 1. Validar tipos
npm run lint

# 2. Build completo
npm run build

# 3. Se passou, fazer commit
git add .
git commit -m "feat: descrição"
```

### Staging/Produção
```bash
# 1. Build
npm run build

# 2. Aplicar migrações (em produção)
npx prisma migrate deploy

# 3. Iniciar servidor
npm run start
```

---

## 📝 Variáveis de Ambiente

### Arquivo `.env.local` Necessário Para:

```env
# Banco de Dados
DATABASE_URL=file:./prisma/dev.db

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=gerado-com-openssl

# Email (SendGrid preferido, SMTP fallback)
SENDGRID_API_KEY=sua-chave-aqui
# OU
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
FROM_EMAIL="Senda <no-reply@senda.app>"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Admin Cleanup Token
CLEANUP_BEARER_TOKEN=token-random-aqui
```

### Gerar NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

---

## 🎯 Troubleshooting

### Erro: "Property X does not exist on type PrismaClient"
```bash
# Solução:
npx prisma generate
```

### Erro: "Cannot find module" após clone
```bash
# Solução:
npm install
npx prisma generate
npx prisma migrate dev
```

### Build falha com TypeScript errors
```bash
# Verificar:
npm run lint
npx prisma generate
npm run build
```

### Dev server não inicia
```bash
# Limpar cache:
rm -rf .next node_modules/.cache
npm run dev
```

### Banco SQLite corrompido
```bash
# Resetar:
rm prisma/dev.db
npx prisma migrate dev
```

---

## 📚 Documentação Relacionada

- [`docs/ADMIN_PANEL_FINAL.md`](ADMIN_PANEL_FINAL.md) - Admin Panel completo
- [`docs/CODE_AUDIT_RESOLUTION.md`](CODE_AUDIT_RESOLUTION.md) - Build status
- [`docs/FEATURES_ROADMAP.md`](FEATURES_ROADMAP.md) - Roadmap de features
- [`docs/SendaDOC.md`](SendaDOC.md) - Documentação técnica completa

---

**Last Updated:** 2026-01-03  
**Dev Team:** Senda AI Agent

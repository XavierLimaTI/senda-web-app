# SendaDOC — Guia Operacional do Projeto Senda

Este documento reúne instruções operacionais, dicas de desenvolvimento, funcionalidades implementadas e próximos passos para o projeto Senda. Mantenha este arquivo atualizado conforme desenvolvemos.

## 📋 Status Atual do Projeto

**Fase:** Sprint 1 Concluída ✅ | Sprint 2 em Andamento 🚧

**Stack Tecnológica:**
- Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS
- Backend: Next.js API Routes + NextAuth.js
- Database: Prisma ORM + SQLite (dev) → PostgreSQL (prod)
- Email: SendGrid (preferido) ou SMTP via Nodemailer
- Pagamentos: Pagar.me ou Stripe Connect (a implementar)

**Stack Tecnológica:**
- Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS
- Backend: Next.js API Routes + NextAuth.js
- Database: Prisma ORM + SQLite (dev) → PostgreSQL (prod)
- Email: SendGrid (preferido) ou SMTP via Nodemailer
- Pagamentos: Pagar.me ou Stripe Connect (a implementar)

## 🎯 Roadmap de Desenvolvimento

### ✅ Sprint 1: Fundação (CONCLUÍDO)
- [x] Setup Next.js + Tailwind com cores Senda (Areia, Sálvia, Terracota, Dourado)
- [x] Prisma schema completo (User, Profiles, Services, Bookings, Trails, etc.)
- [x] Sistema de autenticação NextAuth (email/password + Google OAuth)
- [x] Verificação de email com tokens (24h expiry)
- [x] Onboarding multi-role (CLIENT, THERAPIST, SPACE, ADMIN)
- [x] Criação automática de profiles baseado em role
- [x] Scripts de teste E2E para signup/verify

### 🚧 Sprint 2: Motor B2C - Marketplace de Agendamentos (EM ANDAMENTO)

#### Tarefas Prioritárias:

**1. CRUD de Serviços (Terapeuta)**
```typescript
// Endpoint: POST /api/therapist/services
// Permite terapeuta criar/editar seus serviços
interface Service {
  name: string;          // "Massagem Relaxante"
  description: string;
  duration: number;      // Minutos (ex: 60)
  price: number;         // Reais (ex: 150.00)
  active: boolean;
}
```

**2. Sistema de Disponibilidade (Terapeuta)**
```typescript
// Endpoint: POST /api/therapist/availability
// Terapeuta define blocos de horário semanais
interface Availability {
  dayOfWeek: number;     // 0-6 (Domingo-Sábado)
  startTime: string;     // "09:00"
  endTime: string;       // "18:00"
}

// Funcionalidade futura: Sincronização bidirecional com Google Calendar
```

**3. API de Slots Disponíveis (Crítico para Agendamento)**
```typescript
// Endpoint: GET /api/slots?therapistId=X&date=2025-12-30
// Algoritmo:
// 1. Buscar Availability do terapeuta para aquele dayOfWeek
// 2. Gerar slots de X minutos (baseado na duração do serviço)
// 3. Remover slots já ocupados (Bookings existentes)
// 4. Retornar array de horários livres: ["09:00", "10:00", "11:00", ...]
```

**4. Perfil Público do Terapeuta (SEO)**
```typescript
// Página: /therapist/[id] (Server-Side Rendering)
// Deve exibir:
// - Foto profissional, nome, bio
// - Especialidades (tags visual)
// - Galeria de fotos do espaço
// - Avaliações (stars + comentários) - futuro
// - Lista de Services (cards com preço e duração)
// - Botão CTA: "Ver horários disponíveis" (cor Sálvia)
```

**5. Fluxo de Agendamento Completo**
```
Cliente → Perfil Terapeuta → Seleciona Serviço → 
Escolhe Data (Calendário) → Escolhe Horário (Pills de slots) →
Tela de Checkout → Pagamento → Confirmação
```

**6. Integração Gateway de Pagamento** ⚠️ CRÍTICO
```bash
# Escolher entre:
# 1. Pagar.me (Brasil, suporta split nativo)
# 2. Stripe Connect (global, split via Connected Accounts)

# Fluxo de pagamento:
# - Cliente insere dados do cartão no COMPONENTE SEGURO do gateway
# - NUNCA salvar dados de cartão no nosso DB
# - Backend chama API do gateway para criar transação
# - Split automático: Taxa Senda (ex: 15%) + Valor líquido terapeuta (85%)
# - Webhook: Gateway notifica quando pagamento aprovado
# - Só então criar Booking definitivo no DB
# - Repasse ao terapeuta: D+1 após sessão (anti-fraude)
```

**7. Dashboard do Cliente**
```typescript
// Página: /dashboard/client
// Exibe:
// - Próximos agendamentos (ordenados por data)
// - Histórico de sessões passadas
// - Botão para avaliar terapeuta (após sessão)
// - Botão "Agendar novamente" (quick rebooking)
```

**8. Dashboard do Terapeuta**
```typescript
// Página: /dashboard/therapist
// Exibe:
// - Visão do dia (lista cronológica de sessões hoje)
// - Resumo financeiro do mês
// - Calendário semanal com sessões agendadas
// - Gestão de disponibilidade (bloqueios manuais)
```

### 📦 Sprint 3: Motor B2B - Espaços Terapêuticos (PLANEJADO)
- [ ] CRUD de Rooms (espaço cadastra salas com fotos, tipo, preço/hora)
- [ ] Marketplace de salas (terapeuta busca por localização, vê disponibilidade)
- [ ] Reserva de sala por hora (B2B) com split automático
- [ ] Dashboard do espaço (visão multi-salas, ocupação)
- [ ] Gestão de equipe interna (espaço vincula terapeutas da casa)

### 🎨 Sprint 4: Trilhas + Polimento (PLANEJADO)
- [ ] CRUD de Trails e Lessons (terapeutas criam, admin aprova)
- [ ] Player de Trilhas (suporte a texto, áudio embed, vídeo YouTube/Vimeo)
- [ ] Sistema de progresso (TrailProgress, marcar lições concluídas)
- [ ] Política de cancelamento humanizada (botão de emergência)
- [ ] Micro-interações (motion design - partículas, pulsação)
- [ ] Responsive mobile (PWA ready)

---

## 🔒 Segurança e Operações

### 1. Proteção do Endpoint de Cleanup

Proteger e operar o endpoint `POST /api/auth/cleanup-verification` que remove tokens de verificação de e‑mail expirados.

---

## 🔒 Segurança e Operações

### 1. Proteção do Endpoint de Cleanup

**Objetivo:** Proteger o endpoint `POST /api/auth/cleanup-verification` que remove tokens de verificação de e‑mail expirados.

**Objetivo:** Proteger o endpoint `POST /api/auth/cleanup-verification` que remove tokens de verificação de e‑mail expirados.

**Proteção:** Token Bearer (variável `CLEANUP_BEARER_TOKEN`) definido no ambiente do servidor. A rota já valida essa variável se estiver configurada.

Trecho de verificação (Next.js App Router):

```ts
const required = process.env.CLEANUP_BEARER_TOKEN
if (required) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token || token !== required) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
}
```

### 2. Como definir `CLEANUP_BEARER_TOKEN` em provedores comuns

- Vercel
  1. Abra o projeto no dashboard Vercel.
  2. Settings → Environment Variables → Add.
  3. Key = `CLEANUP_BEARER_TOKEN`, Value = (token forte), Environment = `Production` (ou `Preview`/`Development` conforme necessidade).

- Render
  1. Project → Environment → Environment Secrets.
  2. Add `CLEANUP_BEARER_TOKEN` com o valor do token.

- Netlify
  1. Site settings → Build & deploy → Environment → Environment variables.
  2. Add `CLEANUP_BEARER_TOKEN`.

- Railway / Heroku / DigitalOcean / Railway UI: normalmente há seção Environment / Variables. Adicione `CLEANUP_BEARER_TOKEN` lá.

### 3. Como configurar o workflow (GitHub Actions)

O workflow `.github/workflows/cleanup-verification.yml` usa o segredo `CLEANUP_URL` (obrigatório) e `CLEANUP_BEARER_TOKEN` (opcional). No repositório: Settings → Secrets and variables → Actions → New repository secret.

Crie:
- `CLEANUP_URL` = `https://<your-domain>/api/auth/cleanup-verification`
- `CLEANUP_BEARER_TOKEN` = <token> (se usar proteção)

### 4. Testes locais / scripts

Incluímos um script de teste `scripts/test-cleanup-endpoint.js` que faz duas chamadas: sem header e (se informado) com `Authorization: Bearer <token>`.

Uso local:

```bash
# chamada sem token
node scripts/test-cleanup-endpoint.js --url=http://localhost:3000/api/auth/cleanup-verification

# chamada autenticada (passando token)
node scripts/test-cleanup-endpoint.js --url=https://your-deploy-url.com/api/auth/cleanup-verification --token=SEU_TOKEN_AQUI
```

Também é possível usar variáveis de ambiente:

```bash
export CLEANUP_URL='https://your-deploy-url.com/api/auth/cleanup-verification'
export CLEANUP_BEARER_TOKEN='seu_token'
node scripts/test-cleanup-endpoint.js
```

---

## 💻 Comandos Úteis de Desenvolvimento

### 5. Comandos úteis e sequência de verificação (local)

Execute estes comandos em ambiente de desenvolvimento para validar a integração completa de verificação de e‑mail:

1. Instalar dependências (se ainda não):

```bash
npm install
```

2. Gerar Prisma Client e aplicar migrações (garante que `emailVerificationToken` exista):

```bash
npx prisma generate
npx prisma migrate dev
```

3. Iniciar servidor de desenvolvimento:

```bash
npm run dev
```

4. Executar e2e local (faz signup, busca token no DB e chama a rota `verify`):

```bash
node scripts/e2e-signup-verify.js
```

5. Testar endpoint de cleanup localmente:

```bash
node scripts/test-cleanup-endpoint.js --url=http://localhost:3000/api/auth/cleanup-verification
```

6. (Opcional) Se você tiver `SENDGRID_API_KEY` configurado, verifique envio de e‑mail.

7. Variáveis de ambiente mínimas para testes locais:

```bash
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="algum-segredo-local"
FROM_EMAIL="seu@exemplo.com"
# SENDGRID_API_KEY ou SMTP_* se desejar enviar e-mails
CLEANUP_BEARER_TOKEN="token-para-testes"
```

## 6. Exemplos de chamada (curl / PowerShell)

Unix/macOS (bash):

```bash
curl -H "Authorization: Bearer $CLEANUP_BEARER_TOKEN" -X POST https://your-deploy-url.com/api/auth/cleanup-verification
```

PowerShell (Invoke-RestMethod):

```powershell
$headers = @{ Authorization = "Bearer $env:CLEANUP_BEARER_TOKEN" }
Invoke-RestMethod -Uri "https://your-deploy-url.com/api/auth/cleanup-verification" -Method Post -Headers $headers
```

PowerShell (se tiver `curl.exe` instalado):

```powershell
curl.exe -H "Authorization: Bearer $env:CLEANUP_BEARER_TOKEN" -X POST https://your-deploy-url.com/api/auth/cleanup-verification
```

## 7. Observações operacionais

- Rotina de execução: uma vez por dia é suficiente na maioria dos casos.
- Auditoria: registre quantos tokens foram apagados (o endpoint retorna `{ deleted: N }`) e envie os logs para o sistema de observabilidade.
- Segurança: rotate o token periodicamente e use secrets do provedor (não commit no repo).

## 8. Histórico e referências

- Workflow: `.github/workflows/cleanup-verification.yml`
- Endpoint: `src/app/api/auth/cleanup-verification/route.ts`
- Test script: `scripts/test-cleanup-endpoint.js`

## Regras de Colaboração Agente ↔ Analista

- **Papel:** O agente atua como dev expert; o analista toma decisões de negócio quando solicitado.
- **Autonomia:** O agente pode criar código e arquivos autonomamente e pede confirmação apenas quando uma decisão de domínio/sensível é necessária (ex.: `auth`, `pagamentos`, `migrations`).
- **Execução e Análise de Terminal:** Antes e depois de rodar comandos relevantes (builds, migrations, testes, scripts), o agente sempre executa os comandos, copia a saída do terminal, analisa erros/warnings e resume os resultados para o analista.
- **Planejamento e Rastreio:** O agente usa `manage_todo_list` para planejar e registrar progresso em cada tarefa — uma lista de tarefas atualizada por operação.
- **DB Schema & Migrations:** Ao alterar `prisma/schema.prisma`, o agente executa `npx prisma generate` e `npx prisma migrate dev --name description` (localmente), e reporta a saída do terminal; pede confirmação antes de aplicar migrations em produção.
- **Edição de Auth/Email/Pagamentos:** Alterações nessas áreas exigem uma confirmação explícita do analista antes de merge/deploy.
- **Comandos em Comunicação:** Sempre incluir comandos de terminal em blocos de código (bash/powershell) e instruções copy-paste.
- **Commits/PRs:** Ao finalizar uma tarefa, o agente sugere uma mensagem de commit e resumo do PR com arquivos alterados e motivos das mudanças.
- **Idioma:** Comunicação técnica preferencialmente em Português (pt-BR) a menos que o analista solicite outro idioma.

### Verificação pós-confirmação

Sempre que o agente solicitar que o analista execute uma ação e o analista confirmar a conclusão, o agente deve verificar que a ação foi realmente realizada — por exemplo: rodando comandos de validação, inspecionando arquivos/diffs, conferindo a saída do terminal, ou validando que o PR/branch foi criado — e reportar evidências (saída do terminal, hashes de arquivo, link do PR, etc.) ao analista.

Essas regras ajudam a manter autonomia do agente com transparência e controle pelo analista.

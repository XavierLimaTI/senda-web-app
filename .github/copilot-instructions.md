# Senda — AI Coding Agent Instructions

Goal: get an AI coding agent productive quickly in the Senda Web App repository.

Quick context
- Tech: Next.js 14 (App Router), TypeScript, Prisma (SQLite in dev → PostgreSQL in prod), NextAuth, Tailwind
- Roles: `CLIENT`, `THERAPIST`, `SPACE`, `ADMIN` (role propagation via NextAuth JWT callbacks)

Immediate priorities for an agent
- Preserve: Prisma singleton at `src/lib/prisma.ts` — always use it for DB access to avoid HMR issues.
- Auth: `src/lib/auth.ts` holds NextAuth config; `src/app/api/auth/signup/route.ts` implements signup + profile creation.
- Email: `src/lib/email.ts` abstracts SendGrid (preferred) and SMTP fallback — check env vars before attempting sends.

Where to look first
- Database model: `prisma/schema.prisma` (migrations in `prisma/migrations/`). Run `npx prisma generate` after edits.
- API routes: `src/app/api/**` (App Router route handlers). Example: signup `src/app/api/auth/signup/route.ts`.
- Services and server code: `server/api/**` and `src/services/**` for business logic and background utilities.
- Frontend entry points: `src/app/*/page.tsx`, client components end with `*Client.tsx`.

Important developer workflows (explicit)
- Local dev: `npm install`, `npx prisma generate`, `npx prisma migrate dev`, `npm run dev`.
- Inspect DB: `npx prisma studio` (dev SQLite at `prisma/dev.db`).
- Run e2e helper: `node scripts/e2e-signup-verify.js` (creates test user + verifies token).
- Test cleanup endpoint: `node scripts/test-cleanup-endpoint.js --url=http://localhost:3000/api/auth/cleanup-verification --token=...`

Project-specific conventions (do not assume defaults)
- API errors: always return structured JSON: `NextResponse.json({ error: 'msg' }, { status: 400 })`.
- Passwords: min 8 chars, hashed with `bcryptjs` (10 rounds) — enforced in signup route.
- Time handling: bookings stored as UTC DateTimes; availability saved as `"HH:MM"` + `dayOfWeek`.
- Role-specific profiles: `ClientProfile`, `TherapistProfile`, `SpaceProfile` — create or query profiles alongside `User`.

Safe agent behaviors
- Do not change database connection pattern (`src/lib/prisma.ts`); update migrations, then run `npx prisma generate`.
- When changing auth, update `authOptions` in `src/lib/auth.ts` and ensure JWT callbacks preserve `role`.
- For email/template changes, modify `src/lib/email.ts` and Portuguese templates used by verification flows.

Examples of useful edits
- Small bugfix: update an API route in `src/app/api/.../route.ts` and add a focused unit/integration test if present.
- Add migration: edit `prisma/schema.prisma` → `npx prisma migrate dev --name desc` → `npx prisma generate`.

Key files to reference quickly
- `src/lib/prisma.ts` — Prisma client singleton
- `src/lib/auth.ts` — NextAuth config
- `src/lib/email.ts` — Email sending abstraction
- `src/app/api/auth/signup/route.ts` — Signup + profile creation pattern
- `prisma/schema.prisma` — DB models + relationships
- `scripts/e2e-signup-verify.js` — example automated verification flow

If uncertain, ask the maintainer: prefer confirmation before modifying auth, payment split logic, or verification cleanup cron.

Request feedback: If any section above is unclear or you want more examples (code snippets, common PR patterns), tell me which area to expand.
# Senda Web App - AI Coding Agent Instructions

## 🌿 Sobre o Senda

**Visão:** Ser a principal referência em bem-estar e terapias integrativas, construindo um ecossistema onde clientes encontram seu caminho, e profissionais/espaços terapêticos prosperam.

**Conceito:** "Senda" significa caminho/trilha. O bem-estar não é um destino, mas uma jornada contínua. Não somos apenas um app de agendamentos - somos **curadores de jornadas de autocuidado**.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Prisma (SQLite → PostgreSQL), NextAuth.js, TailwindCSS, bcryptjs, nodemailer/SendGrid

## 🎯 Modelo de Negócio (Tri-Face B2B2C)

1. **Clientes (B2C):** Descobrir, agendar e vivenciar "Trilhas de Cuidado" com profissionais verificados
2. **Terapeutas (B2B):** Gestão de agenda, vitrine profissional, co-criação de Trilhas
3. **Espaços Terapêuticos (B2B2C):** Clínicas/spas que vendem pacotes para clientes E alugam salas por hora para terapeutas autônomos

**Monetização:** Taxa de serviço (split automático) sobre transações B2C (sessões/pacotes) e B2B (locação de salas)

## 🎨 Brand Identity (Design System)

### Paleta de Cores
**SEMPRE use estas cores exatas nas classes Tailwind:**
- **Areia** `#F0EBE3` - Fundos, áreas de respiro (use como bg padrão, não branco)
- **Verde Sálvia** `#B2B8A3` - CTAs primários, botões de ação, crescimento
- **Terracota Suave** `#D99A8B` - Ícones de favoritos, alertas suaves, calor humano
- **Dourado Queimado** `#C8963E` - Selos de verificação, detalhes premium

### Tipografia
- **Títulos:** Serif moderna (Playfair Display ou Lora) - sofisticação editorial
- **UI/Corpo:** Sans-serif geométrica (Satoshi ou DM Sans) - leitura rápida

### Tom de Voz (UX Writing)
- **Acolhedora mas Profissional:** Empatia sem perder seriedade da saúde
- **Inspiradora mas Pé no Chão:** Motiva progresso possível, sem promessas mágicas
- **Clara e Serena:** Evitar jargões técnicos ou místicos excessivos
- **Exemplo:** "Bom dia, Ana. Como você quer se sentir hoje?" (não "Bem-vindo ao sistema")

### Motion Design
- **Transições:** Suaves (ease-in-out), orgânicas como natureza
- **Micro-interações:** Botões pulsam como respiração, liberam partículas sutis de luz/folhas
- **NUNCA:** Aparecer/desaparecer abruptamente, beeps eletrônicos estridentes

## 🏗️ Architecture & Key Patterns

### 1. Multi-Role User System (Tri-Face)
The app supports **4 distinct user roles**: `CLIENT`, `THERAPIST`, `SPACE`, `ADMIN`. Each role has:
- A base `User` record (auth credentials, email verification)
- A specialized profile table: `ClientProfile`, `TherapistProfile`, or `SpaceProfile`
- Role-specific functionality and UI flows

**Pattern:** When creating users via [src/app/api/auth/signup/route.ts](src/app/api/auth/signup/route.ts):
1. Create the `User` with role
2. Generate email verification token
3. Auto-create the corresponding profile (e.g., `ClientProfile` for CLIENT role)

**Critical Business Rules:**
- **Therapist Verification:** Profile stays `verified: false` until admin approves (documents: CRP/certificates, photos)
- **Space Verification:** Requires CNPJ, commercial address proof, high-quality photos of each room type

### 2. Trilhas de Cuidado (Care Trails) - O MOTOR DE CONTEÚDO
**Conceito:** Jornadas guiadas de bem-estar (não tarefas isoladas). O coração diferenciador do Senda.

**Estrutura no DB:**
- `Trail`: Capa (foto cinematográfica, título serif, autor, duração em dias)
- `Lesson`: Passos conectados por linha orgânica visual
  - Tipos: Texto Rico + Imagem, Áudio (meditações), Vídeo (embed YouTube/Vimeo), "Ação de Agendamento"
- `TrailProgress`: Salva automaticamente onde o cliente parou

**Pattern de Co-criação:**
- Terapeutas aprovados podem criar Trilhas
- Submetem para curadoria Senda (`published: false`)
- Admin aprova → `published: true`

### 3. Sistema de Agendamento (Marketplace Core)
- **Schema:** [prisma/schema.prisma](prisma/schema.prisma) defines all models
- **Client instance:** Import from `@/lib/prisma` (singleton pattern with HMR support)
- **Migrations:** Run `npx prisma migrate dev` after schema changes
- **Regenerate client:** Run `npx prisma generate` to update TypeScript types

**Critical:** The project uses **SQLite** in development (`file:./prisma/dev.db`). All Prisma queries log to console for debugging.

**Fluxo B2C (Cliente agenda Terapeuta):**
1. Cliente busca terapeuta → Vê perfil vitrine (foto, bio, avaliações, serviços)
2. Seleciona Serviço → API `/api/slots` calcula horários livres (lógica: disponibilidade - agendamentos existentes)
3. Escolhe data/hora → Checkout com gateway de pagamento
4. **Split automático:** Taxa Senda + Valor líquido do terapeuta
5. Repasse ao terapeuta **após sessão realizada** (D+1, segurança anti-fraude)

**Fluxo B2B (Terapeuta aluga Sala de Espaço):**
1. Terapeuta busca espaços próximos → Vê fotos das salas, preço/hora
2. Reserva slot → Pagamento processado imediatamente
3. **Split B2B:** Espaço recebe valor - Taxa Senda

**Política de Cancelamento Humanizada (Feature Diferencial):**
```typescript
// Regra Padrão
if (cancelamentoAntes24h) {
  reembolso = 100%; // Grátis
} else {
  taxa = 50%; // Terapeuta recebe compensação
  
  // BOTÃO DE EMERGÊNCIA (humanização)
  if (clienteSinalizaEmergencia) {
    // Notifica terapeuta que pode decidir:
    // 1. Abonar taxa (reembolso 100% ao cliente)
    // 2. Manter regra (cobra 50%)
  }
}
```

### 4. Database Layer (Prisma)
- **Config:** [src/lib/auth.ts](src/lib/auth.ts) exports `authOptions`
- **Providers:** Credentials (email/password) + Google OAuth
- **Session strategy:** JWT-based (not database sessions)
- **Role propagation:** User's `role` is injected into JWT token and session via callbacks
- **Pages:** Custom sign-in at `/auth/signin`, role selection at `/auth/role-selection`

**Email Verification:** 
- Tokens stored in `EmailVerificationToken` table (24h expiry)
- Verified via GET `/api/auth/verify?token=...`
- Cleanup endpoint: POST `/api/auth/cleanup-verification` (protected with `CLEANUP_BEARER_TOKEN`)
- See [docs/SendaDOC.md](docs/SendaDOC.md) for full verification workflow details

### 4. API Route Patterns (Next.js App Router)
All API routes live in `src/app/api/` and use Next.js 14 route handlers:
```typescript
export async function POST(req: Request) {
  const body = await req.json()
  // ... handle request
  return NextResponse.json({ data }, { status: 200 })
}
```

**Current endpoints:**
- `POST /api/auth/signup` - User registration with email verification
- `GET /api/auth/verify?token=...` - Email verification redirect
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/cleanup-verification` - Remove expired tokens (cron job)
- NextAuth routes at `/api/auth/[...nextauth]`

### 5. Email System
Email sending abstracted in [src/lib/email.ts](src/lib/email.ts):
- **Preferred:** SendGrid (via `SENDGRID_API_KEY` env var + fetch API)
- **Fallback:** SMTP (via nodemailer using `SMTP_HOST/PORT/USER/PASS`)
- **Pattern:** Gracefully skips email sending if neither provider configured (logs warning)

All verification emails use Portuguese templates with links to `/api/auth/verify?token=...`

### 6. Path Aliases
TypeScript configured with `@/*` mapping to `src/*`:
```typescript
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
```

## Development Workflows

### Initial Setup
```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev  # Starts on http://localhost:3000
```

### Database Operations
- **View data:** `npx prisma studio` (opens GUI at http://localhost:5555)
- **Reset DB:** `npx prisma migrate reset` (drops all data)
- **New migration:** Edit schema → `npx prisma migrate dev --name description`

### Testing Email Verification (E2E)
Run [scripts/e2e-signup-verify.js](scripts/e2e-signup-verify.js):
```bash
node scripts/e2e-signup-verify.js
```
This creates a user, extracts the token from DB, and calls the verify endpoint.

### Testing Cleanup Endpoint
```bash
node scripts/test-cleanup-endpoint.js --url=http://localhost:3000/api/auth/cleanup-verification
# With auth:
node scripts/test-cleanup-endpoint.js --url=https://production.com/api/auth/cleanup-verification --token=YOUR_TOKEN
```

## Project-Specific Conventions

### 1. Error Handling in API Routes
Always return structured JSON errors:
```typescript
return NextResponse.json({ error: 'Descriptive message' }, { status: 400 })
```

### 2. Password Requirements
- Minimum 8 characters (enforced in signup route)
- Hashed with bcryptjs (10 rounds)

### 3. Role-Based Profiles
When adding new user functionality:
- Check if it's role-specific → add fields to the profile table (e.g., `TherapistProfile.specialty`)
- Shared fields → add to base `User` table
- Always cascade delete profiles when user is deleted (`onDelete: Cascade`)

### 4. Frontend Structure
- **App Router pages:** `src/app/[route]/page.tsx`
- **Client components:** Separate into `*Client.tsx` files (e.g., `SignInClient.tsx`)
- **Shared components:** `src/components/` (e.g., `Toast.tsx`, `SignOutButton.tsx`)
- **Layouts:** `src/app/layouts/` for reusable page layouts

### 5. Date/Time Handling
- **Bookings:** Store as `DateTime` in UTC
- **Availability:** Store as strings like `"09:00"` with `dayOfWeek` (0-6)
- **Token expiry:** Use `new Date(Date.now() + milliseconds)`

## External Dependencies & Integration

### Environment Variables (Required)
```bash
DATABASE_URL=file:./prisma/dev.db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# Email (at least one):
SENDGRID_API_KEY=<sendgrid-key>
# OR
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=password
FROM_EMAIL="Senda <no-reply@senda.app>"

# Optional:
GOOGLE_CLIENT_ID=<google-oauth-id>
GOOGLE_CLIENT_SECRET=<google-oauth-secret>
CLEANUP_BEARER_TOKEN=<strong-random-token>  # Protect cleanup endpoint
```

### Deployment Considerations
- See [docs/SendaDOC.md](docs/SendaDOC.md) for production email configuration on Vercel/Render/Netlify
- Set `CLEANUP_BEARER_TOKEN` in production environment variables
- Configure GitHub Actions secrets for automated cleanup cron job

## Common Pitfalls

1. **Forgot to run `prisma generate`** after schema changes → TypeScript errors about missing Prisma types
2. **Using `User.role` without checking profile exists** → Always query the specific profile when needed
3. **Email verification not working locally** → Check that SENDGRID_API_KEY or SMTP_* vars are set
4. **Session doesn't include `role`** → Make sure JWT/session callbacks in [src/lib/auth.ts](src/lib/auth.ts) are propagating it
5. **Prisma query logs overwhelming console** → This is intentional for debugging; remove `log: ['query']` in production

## Key Files to Reference

- [src/lib/auth.ts](src/lib/auth.ts) - NextAuth configuration
- [src/lib/prisma.ts](src/lib/prisma.ts) - Database client singleton
- [src/lib/email.ts](src/lib/email.ts) - Email sending abstraction
- [prisma/schema.prisma](prisma/schema.prisma) - Complete data model
- [src/app/api/auth/signup/route.ts](src/app/api/auth/signup/route.ts) - User creation pattern
- [docs/SendaDOC.md](docs/SendaDOC.md) - Operational docs (Portuguese)
- [README.md](README.md) - Project structure overview

## Regras de Colaboração Agente ↔ Analista

- **Papel:** O agente atua como dev expert; o analista (você) toma decisões de negócio quando solicitado.
- **Autonomia:** O agente cria código e arquivos autonomamente e pede confirmação apenas quando uma decisão de domínio/sensível é necessária (ex.: `auth`, `pagamentos`, `migrations`).
- **Execução e Análise de Terminal:** Antes e depois de rodar comandos relevantes (builds, migrations, testes, scripts), o agente sempre executa os comandos, copia a saída do terminal, analisa erros/warnings e resume os resultados para o analista.
- **Planejamento e Rastreio:** O agente usa `manage_todo_list` para planejar e registrar progresso em cada tarefa — uma lista de tarefas atualizada por operação.
- **DB Schema & Migrations:** Ao alterar `prisma/schema.prisma`, o agente executa `npx prisma generate` e `npx prisma migrate dev --name description` (localmente), e reporta a saída do terminal; pede confirmação antes de aplicar migrations em produção.
- **Edição de Auth/Email/Pagamentos:** Alterações nessas áreas exigem uma confirmação explícita do analista antes de merge/deploy.
- **Comandos em Comunicação:** Sempre incluir comandos de terminal em blocos de código (bash/powershell) e instruções copy-paste.
- **Commits/PRs:** Ao finalizar uma tarefa, o agente sugere uma mensagem de commit e resumo do PR com arquivos alterados e motivos das mudanças.
- **Idioma:** Comunicação técnica preferencialmente em Português (pt-BR) a menos que o analista solicite outro idioma.

 - **Verificação pós-confirmação:** Sempre que o agente solicitar uma ação ao analista (por exemplo: executar um comando, aplicar uma migração, criar um PR) e o analista confirmar que concluiu a ação, o agente deve verificar que a ação foi realmente realizada (ex.: rodando comandos de validação, checando arquivos/ diffs, conferindo saída do terminal, ou conferindo o PR/branch) e reportar evidências ao analista.

Essas regras ajudam o agente a agir com autonomia mantendo transparência e controle do analista.

- **Escolha de próximo passo (preferência):** Quando o agente oferecer opções de próximo passo, ele deve automaticamente seguir com a opção mais recomendada para o projeto (i.e., a ação que maximiza progresso e minimiza risco), salvo instrução contrária do analista. Sempre documente brevemente por que a opção foi escolhida.

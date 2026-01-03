# � Senda — Documentação Completa do Projeto

> **Guia de referência para desenvolvimento, navegação e operação do sistema**

---

## 📑 Índice

1. [Ambiente de Desenvolvimento](#-ambiente-de-desenvolvimento)
2. [Configuração Inicial](#-configuração-inicial)
3. [Comandos de Execução](#-comandos-de-execução)
4. [Navegação Web (URLs)](#-navegação-web-urls)
5. [API REST Endpoints](#-api-rest-endpoints)
6. [Scripts Utilitários](#-scripts-utilitários)
7. [Banco de Dados](#-banco-de-dados)
8. [Fluxos de Teste E2E](#-fluxos-de-teste-e2e)
9. [Credenciais de Teste](#-credenciais-de-teste)
10. [Troubleshooting](#-troubleshooting)

---

## 🛠️ Ambiente de Desenvolvimento

### Tecnologias
- **Framework:** Next.js 14.2.35 (App Router)
- **Linguagem:** TypeScript
- **ORM:** Prisma (SQLite dev → PostgreSQL prod)
- **Autenticação:** NextAuth.js
- **Estilo:** TailwindCSS
- **Email:** SendGrid (primário) / SMTP (fallback)
- **Runtime:** Node.js v24.12.0

### Estrutura de Pastas
```
senda-web-app/
├── prisma/                   # Schema + Migrations
├── public/                   # Assets estáticos
├── scripts/                  # Utilitários Node.js
├── src/
│   ├── app/                  # Rotas (App Router)
│   │   ├── api/              # API Routes
│   │   ├── auth/             # Páginas de autenticação
│   │   ├── client/           # Dashboard Cliente
│   │   ├── dashboard/        # Dashboard Geral + Terapeuta
│   │   ├── booking/          # Fluxo de agendamento
│   │   ├── checkout/         # Checkout de pagamento
│   │   ├── explore/          # Exploração de terapeutas
│   │   └── therapist/        # Perfis públicos
│   ├── components/           # Componentes reutilizáveis
│   ├── lib/                  # Prisma, Auth, Email
│   └── types/                # TypeScript definitions
├── docs/                     # Documentação
└── .env.local                # Variáveis de ambiente
```

---

## ⚙️ Configuração Inicial

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Variáveis de Ambiente
Crie `.env.local` na raiz do projeto:

```env
# Database (SQLite em dev)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"

# Email (SendGrid - Preferencial)
SENDGRID_API_KEY="SG.xxxxxxxxxxxxx"
FROM_EMAIL="Senda <no-reply@senda.app>"

# Email (SMTP - Fallback)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="user@example.com"
SMTP_PASS="password"

# OAuth (Opcional)
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"

# Segurança
CLEANUP_BEARER_TOKEN="token-forte-aleatorio"
```

### 3. Inicializar Banco de Dados
```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev

# (Opcional) Popular dados de teste
node scripts/create-test-therapist.js
```

---

## 🚀 Comandos de Execução

### Desenvolvimento

#### Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
- **URL:** http://localhost:3000
- **Hot Reload:** Ativado
- **Logs:** Prisma queries visíveis no console

#### Parar Servidor
- **Ctrl + C** no terminal ativo
- ⚠️ **NUNCA** feche o terminal sem parar o servidor (pode travar porta 3000)

#### Liberar Porta 3000 Travada
```powershell
# 1. Encontrar processo
netstat -ano | findstr :3000

# 2. Encerrar processo (substituir PID)
Stop-Process -Id [PID] -Force
```

### Build & Produção

#### Build Otimizado
```bash
npm run build
```
- Compila TypeScript
- Valida tipos
- Gera páginas estáticas
- Output: `.next/`

#### Executar Build de Produção
```bash
npm start
```
- Requer build prévia (`npm run build`)
- Serve em modo produção

### Linting & Validação

#### Verificar Código
```bash
npm run lint
```

---

## 🗺️ Navegação Web (URLs)

**Base URL:** http://localhost:3000

### 🔐 Autenticação (Público)
| Página | URL | Descrição |
|--------|-----|-----------|
| Login | `/auth/signin` | Formulário de login |
| Cadastro | `/auth/signup` | Criação de conta (3 roles) |
| Seleção de Perfil | `/auth/role-selection` | Escolher CLIENT/THERAPIST/SPACE |
| Logout | Botão "Sair" | Disponível em todos dashboards |

### 👤 Cliente (gustavohenriquex@gmail.com)
| Funcionalidade | URL | Descrição |
|----------------|-----|-----------|
| Dashboard | `/dashboard` | Visão geral do cliente |
| Meus Agendamentos | `/client/bookings` | Lista com filtros/ações |
| Explorar Terapeutas | `/explore/therapists` | Catálogo de terapeutas |
| Perfil Terapeuta | `/therapist/2` | Página pública (substitua ID) |
| Agendar Sessão | `/booking/2` | Fluxo completo de agendamento |
| Checkout | `/checkout/[paymentId]` | Pagamento (ID gerado após booking) |
| Confirmação | `/checkout/success` | Tela de sucesso pós-pagamento |

### 🧘 Terapeuta (nejusloko@gmail.com)
| Funcionalidade | URL | Descrição |
|----------------|-----|-----------|
| Dashboard | `/dashboard` | Visão geral do terapeuta |
| Meus Agendamentos | `/dashboard/therapist/bookings` | Gerenciar sessões |
| Meus Serviços | `/dashboard/therapist/services` | CRUD de serviços |
| Disponibilidade | `/dashboard/therapist/availability` | Configurar horários |
| Perfil Público | `/therapist/2` | Sua vitrine para clientes |

### 🏢 Espaço (sendaterapias.suporte@gmail.com)
| Funcionalidade | URL | Status |
|----------------|-----|--------|
| Dashboard | `/dashboard` | ⏳ Não implementado |

---

## 🔌 API REST Endpoints

**Base URL:** http://localhost:3000/api

### Autenticação (`/api/auth`)
| Método | Endpoint | Body | Resposta |
|--------|----------|------|----------|
| POST | `/signup` | `{ name, email, password, role }` | `{ user, message }` |
| GET | `/verify?token=...` | - | Redirect p/ signin |
| POST | `/resend-verification` | `{ email }` | `{ message }` |
| POST | `/cleanup-verification` | Header: `Authorization: Bearer TOKEN` | `{ deleted }` |

### Agendamentos (`/api/bookings`)
| Método | Endpoint | Auth | Descrição |
|--------|----------|------|-----------|
| GET | `/bookings` | Cliente | Lista agendamentos paginados |
| POST | `/bookings` | Cliente | Cria novo agendamento |
| PATCH | `/bookings/[id]` | Terapeuta | Atualiza status (CONFIRMED/COMPLETED) |
| DELETE | `/bookings/[id]` | Cliente/Terapeuta | Cancela agendamento |
| POST | `/bookings/expire` | Bearer Token | Expira PENDING após 10min |

**Exemplo POST /bookings:**
```json
{
  "therapistId": 2,
  "serviceId": 1,
  "startTime": "2026-01-05T10:00:00Z",
  "notes": "Primeira sessão"
}
```

### Disponibilidade & Slots
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/slots?therapistId=2&date=2026-01-05&serviceId=1` | Horários livres |
| GET | `/therapist/availability` | Lista disponibilidade (terapeuta logado) |
| POST | `/therapist/availability` | Criar bloco de horário |
| DELETE | `/therapist/availability/[id]` | Remover horário |

**Exemplo POST /therapist/availability:**
```json
{
  "dayOfWeek": 1,
  "startTime": "09:00",
  "endTime": "17:00"
}
```

### Serviços (`/api/therapist/services`)
| Método | Endpoint | Body | Descrição |
|--------|----------|------|-----------|
| GET | `/therapist/services` | - | Lista serviços do terapeuta |
| POST | `/therapist/services` | `{ name, description, duration, price }` | Criar serviço |
| PATCH | `/therapist/services` | `{ id, ...campos }` | Atualizar serviço |
| DELETE | `/therapist/services` | `{ id }` | Desativar serviço |

### Pagamentos (`/api/payments`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/create-order` | Cria Payment + Booking (retorna transactionId) |
| POST | `/simulate-confirm` | **DEV ONLY:** Simula aprovação de pagamento |
| POST | `/webhook` | Webhook Asaas (produção) |

### Avaliações (`/api/reviews`)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/reviews` | Criar avaliação (cliente, booking COMPLETED) |
| GET | `/reviews?therapistId=2` | Listar avaliações do terapeuta |

**Exemplo POST /reviews:**
```json
{
  "bookingId": 5,
  "rating": 5,
  "comment": "Excelente profissional!"
}
```

---

## 📊 Scripts Utilitários

**Localização:** `scripts/`

### Gerenciamento de Usuários

#### Listar Todos os Usuários
```bash
node scripts/list-users.js
```
**Output:** ID, Nome, Email, Role, Data de Criação

#### Atualizar Email
```bash
node scripts/update-user-email.js --userId=9 --email=novo@email.com
```
- Valida unicidade do email
- Exibe confirmação antes de salvar

#### Deletar Usuário
```bash
node scripts/delete-user.js --userId=1
```
- Cascade delete (remove perfil associado)
- Solicita confirmação

#### Ver IDs dos Terapeutas
```bash
node scripts/get-therapist-ids.js
```
**Output:** ID do Perfil, Nome, Email, Status de Verificação, URL

### Testes & Desenvolvimento

#### Criar Terapeuta de Teste
```bash
node scripts/create-test-therapist.js
```
- Cria usuário + TherapistProfile
- Define como verificado

#### Teste E2E Signup + Verificação
```bash
node scripts/e2e-signup-verify.js
```
- Cria usuário via API
- Busca token no banco
- Simula clique no email

#### Expirar Agendamentos Pendentes (Manual)
```bash
node scripts/expire-pending-bookings.js \
  --url=http://localhost:3000/api/bookings/expire \
  --token=SEU_CLEANUP_BEARER_TOKEN
```

### Automação (Cron Jobs)

#### GitHub Actions (Produção)
**Arquivo:** `.github/workflows/expire-bookings.yml`
- **Schedule:** A cada 5 minutos (`*/5 * * * *`)
- **Secrets necessários:** `CLEANUP_BEARER_TOKEN`, `API_URL`

#### Windows Task Scheduler (Local)
```powershell
# Executar script de setup (requer admin)
powershell -ExecutionPolicy Bypass -File scripts/setup-cron-windows.ps1
```
- Cria tarefa "Senda-ExpireBookings"
- Gera `run-expire-bookings.ps1` com logging
- Logs salvos em `scripts/logs/`

---

## 💾 Banco de Dados

### Prisma Commands

#### Visualizar Dados (GUI)
```bash
npx prisma studio
```
**URL:** http://localhost:5555

#### Gerar Prisma Client (Após Mudanças no Schema)
```bash
npx prisma generate
```

#### Criar Nova Migration
```bash
npx prisma migrate dev --name descricao_da_mudanca
```

#### Aplicar Migrations em Produção
```bash
npx prisma migrate deploy
```

#### Resetar Banco (⚠️ Apaga Tudo)
```bash
npx prisma migrate reset
```

### Schema Atual
**Arquivo:** `prisma/schema.prisma`

**Modelos principais:**
- `User` (base de autenticação)
- `ClientProfile`, `TherapistProfile`, `SpaceProfile` (perfis por role)
- `Service` (serviços oferecidos por terapeutas)
- `Availability` (horários disponíveis)
- `Booking` (agendamentos)
- `Payment` (transações)
- `Review` (avaliações)
- `EmailVerificationToken` (tokens de 24h)

---

## 🎯 Fluxos de Teste E2E

### 1️⃣ Setup Inicial do Terapeuta

**Login:** nejusloko@gmail.com

1. **Criar Serviço:**
   - Ir para http://localhost:3000/dashboard/therapist/services
   - Clicar "Criar Novo Serviço"
   - Preencher: Nome, Descrição, Duração (múltiplo de 15min), Preço
   - Salvar

2. **Definir Disponibilidade:**
   - Ir para http://localhost:3000/dashboard/therapist/availability
   - Selecionar dia da semana
   - Definir horário início e fim (ex: 09:00 - 17:00)
   - Adicionar

3. **Verificar Perfil Público:**
   - http://localhost:3000/therapist/2
   - Confirmar que serviços e horários aparecem

---

### 2️⃣ Cliente Agenda Sessão

**Login:** gustavohenriquex@gmail.com

1. **Explorar Terapeutas:**
   - http://localhost:3000/explore/therapists
   - Clicar no card do Terapeuta 1

2. **Agendar:**
   - http://localhost:3000/booking/2
   - Escolher serviço
   - Selecionar data no calendário
   - Escolher horário disponível
   - Adicionar observações (opcional)
   - Criar agendamento

3. **Checkout:**
   - Redirecionado para `/checkout/[transactionId]`
   - Escolher método: Cartão/PIX/Boleto
   - Clicar "Finalizar Pagamento"
   - Aguardar 2 segundos (simulação)

4. **Confirmação:**
   - Redirecionado para `/checkout/success`
   - ✅ Agendamento criado
   - 📧 **Emails enviados:**
     - Cliente: "✨ Agendamento Confirmado"
     - Terapeuta: "🔔 Novo Agendamento Recebido"

---

### 3️⃣ Terapeuta Gerencia Agendamento

**Login:** nejusloko@gmail.com

1. **Ver Agendamentos:**
   - http://localhost:3000/dashboard/therapist/bookings
   - Agendamento aparece em "Próximos"

2. **Após Sessão:**
   - Clicar "Marcar como Completado"
   - Status muda para COMPLETED

---

### 4️⃣ Cliente Avalia Sessão

**Login:** gustavohenriquex@gmail.com

1. **Acessar Histórico:**
   - http://localhost:3000/client/bookings
   - Agendamento completado aparece em "Histórico"

2. **Deixar Avaliação:**
   - Clicar "Deixar Avaliação"
   - Escolher 1-5 estrelas
   - Escrever comentário (opcional)
   - Enviar

3. **Verificar:**
   - http://localhost:3000/therapist/2
   - Avaliação aparece na seção "Avaliações"
   - Rating médio atualizado

---

### 5️⃣ Cliente Cancela Agendamento

**Login:** gustavohenriquex@gmail.com

1. **Cancelar:**
   - http://localhost:3000/client/bookings
   - Clicar "Cancelar Agendamento"
   - Confirmar

2. **Resultado:**
   - Status muda para CANCELLED
   - 📧 **Emails enviados:**
     - Cliente: "⚠️ Agendamento Cancelado"
     - Terapeuta: "⚠️ Agendamento Cancelado"

---

## 🔑 Credenciais de Teste

| Usuário | Email | Role | Verificado | ID Perfil |
|---------|-------|------|-----------|-----------|
| Cliente1 | gustavohenriquex@gmail.com | CLIENT | ✅ | 9 |
| Terapeuta 1 | nejusloko@gmail.com | THERAPIST | ✅ | 2 |
| Senda Terapias | sendaterapias.suporte@gmail.com | SPACE | ✅ | 1 |
| Henrique | henriquexae@gmail.com | CLIENT | ✅ | 1 |

**⚠️ Senhas:** Definidas durante cadastro manual (não versionadas por segurança)

---

## 🆘 Troubleshooting

### Servidor não inicia

#### Porta 3000 ocupada
**Sintoma:** `Port 3000 is in use, trying 3001 instead.`

**Solução:**
```powershell
# 1. Identificar processo
netstat -ano | findstr :3000

# 2. Matar processo (substituir PID)
Stop-Process -Id [PID] -Force

# 3. Reiniciar servidor
npm run dev
```

#### Erro de módulos
**Sintoma:** `Cannot find module 'next'`

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Build falha

#### Erros TypeScript
**Solução:**
```bash
# Regenerar Prisma Client
npx prisma generate

# Limpar cache Next.js
rm -rf .next

# Rebuild
npm run build
```

---

### Problemas de Agendamento

#### "Nenhum horário disponível"
**Causas:**
1. Terapeuta não configurou disponibilidade
   - **Solução:** http://localhost:3000/dashboard/therapist/availability
2. Data escolhida sem disponibilidade
   - **Solução:** Escolher outro dia da semana

#### "Serviço não encontrado"
**Causas:**
1. Terapeuta não tem serviços ativos
   - **Solução:** http://localhost:3000/dashboard/therapist/services
2. Serviço foi desativado
   - **Solução:** Reativar serviço no dashboard

---

### Emails não chegam

#### Verificar Configuração
```bash
# Ver variáveis de ambiente
cat .env.local | grep -E "(SENDGRID|SMTP|FROM_EMAIL)"
```

**Checklist:**
- [ ] `SENDGRID_API_KEY` ou credenciais SMTP configuradas
- [ ] `FROM_EMAIL` válido
- [ ] Single Sender verificado no painel SendGrid
- [ ] Checar pasta spam/lixo eletrônico
- [ ] Confirmar que emails de teste são reais (não `@example.com`)

#### Logs do Servidor
```bash
# Observar console onde `npm run dev` está rodando
# Deve exibir: "✅ Booking confirmation email sent to ..."
```

---

### Banco de Dados

#### Ver dados diretamente
```bash
npx prisma studio
```
- Navegar até http://localhost:5555
- Inspecionar tabelas manualmente

#### Reset completo (⚠️ Apaga tudo)
```bash
npx prisma migrate reset
node scripts/create-test-therapist.js
```

---

### Autenticação

#### Sessão expirada
**Sintoma:** Redirecionado para `/auth/signin` repetidamente

**Solução:**
1. Fazer logout completo
2. Limpar cookies do navegador (localhost)
3. Fazer login novamente

#### Token de verificação expirado
**Sintoma:** Link do email dá erro

**Solução:**
```bash
# Reenviar email de verificação
curl -X POST http://localhost:3000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com"}'
```

---

## 📋 Checklist de Funcionalidades

### ✅ Implementado (Sprint 2)
- [x] Autenticação multi-role (CLIENT, THERAPIST, SPACE)
- [x] Perfis públicos de terapeutas
- [x] CRUD de serviços
- [x] Gerenciamento de disponibilidade
- [x] Cálculo de slots disponíveis
- [x] Fluxo completo de agendamento
- [x] Checkout de pagamento (simulador)
- [x] Notificações por email (confirmação, cancelamento)
- [x] Sistema de avaliações/reviews
- [x] Auto-expiração de agendamentos pendentes
- [x] Dashboards para cliente e terapeuta

### ⏳ Planejado (Próximos Sprints)
- [ ] Dashboard de receitas para terapeutas
- [ ] Reagendamento de sessões
- [ ] Funcionalidades de espaços terapêuticos (B2B2C)
- [ ] Integração real com gateway Asaas
- [ ] Trilhas de Cuidado (conteúdo guiado)
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] App mobile (React Native)

---

## 📚 Recursos Adicionais

### Documentação Relacionada
- [SendaDOC.md](SendaDOC.md) - Documentação operacional em Português
- [SPRINT2_PLAN.md](SPRINT2_PLAN.md) - Plano técnico do Sprint 2
- [SPRINT2_STATUS.md](SPRINT2_STATUS.md) - Status de implementação
- [README.md](../README.md) - Visão geral do projeto

### Links Externos
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [SendGrid API Docs](https://docs.sendgrid.com)

---

**Última Atualização:** 2 de Janeiro de 2026  
**Versão:** Sprint 2 — B2C Marketplace + Reviews + Auto-Expiration  
**Mantenedor:** Equipe Senda

# SendaDOC — Guia Operacional do Projeto Senda

Este documento reúne instruções operacionais, dicas de desenvolvimento, funcionalidades implementadas e próximos passos para o projeto Senda. Mantenha este arquivo atualizado conforme desenvolvemos.

## 📋 Status Atual do Projeto

**Fase:** Sprint 1 Concluída ✅ | Sprint 2 Concluída ✅ | Sprint 3+ Planejadas 📋

**Stack Tecnológica:**
- Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS
- Backend: Next.js API Routes + NextAuth.js
- Database: Prisma ORM + SQLite (dev) → PostgreSQL (prod)
- Email: SendGrid (preferido) ou SMTP via Nodemailer
- Pagamentos: Asaas (integrado) + Stripe (planned)

**📄 Documentos de Referência:**
- [SPRINT2_PLAN.md](SPRINT2_PLAN.md) - Plano original da Sprint 2 (completed)
- ⭐ **[FEATURES_ROADMAP.md](FEATURES_ROADMAP.md)** - Roadmap completo das 9 features + Sprint 3-6+ detalhes (LEIA PRIMEIRO)
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Análise técnica aprofundada de cada feature
- [FEATURES_EXTRAS_SUMMARY.md](FEATURES_EXTRAS_SUMMARY.md) - Quick reference: timeline visual, bloqueadores
- [STRATEGIC_RECOMMENDATIONS.md](STRATEGIC_RECOMMENDATIONS.md) - Recomendações de priorização e ROI
- [ROADMAP_VISUAL.md](ROADMAP_VISUAL.md) - Overview gráfico 2026+
- [NOTIFICATIONS_SYSTEM.md](NOTIFICATIONS_SYSTEM.md) - Documentação do sistema de notificações (Sprint 2)

## 🎯 Roadmap de Desenvolvimento

### ✅ Sprint 1: Fundação (CONCLUÍDO)
- [x] Setup Next.js + Tailwind com cores Senda (Areia, Sálvia, Terracota, Dourado)
- [x] Prisma schema completo (User, Profiles, Services, Bookings, Trails, etc.)
- [x] Sistema de autenticação NextAuth (email/password + Google OAuth)
- [x] Verificação de email com tokens (24h expiry)
- [x] Onboarding multi-role (CLIENT, THERAPIST, SPACE, ADMIN)
- [x] Criação automática de profiles baseado em role
- [x] Scripts de teste E2E para signup/verify

### ✅ Sprint 2: Motor B2C - Marketplace de Agendamentos (CONCLUÍDO)
- [x] CRUD de Serviços (Terapeuta)
- [x] Sistema de Disponibilidade (Terapeuta)
- [x] API de Slots Disponíveis (cálculo dinâmico de horários)
- [x] Perfil Público do Terapeuta (SEO-friendly)
- [x] Fluxo de Agendamento (4 passos: serviço → data → hora → confirmação)
- [x] Integração de Pagamento (Asaas: cartão, PIX, boleto)
- [x] Dashboard do Cliente (próximas sessões, histórico)
- [x] Dashboard do Terapeuta (agenda do dia, métricas, ganhos)
- [x] Sistema de Favoritos (FavoriteButton, Favorites page)
- [x] Sistema de Notificações (NotificationBell, API, dropdown)

### 📋 Sprint 3: Segurança + Admin + Compliance (PLANEJADO)
- [ ] Admin Panel (gerenciar terapeutas, notícias, configurações)
- [ ] Sistema de Upload de Documentos (verificação, certificados)
- [ ] Termos & Condições + Políticas (versionamento, aceite)
- [ ] Solicitar Adição de Terapia (workflow de request → approval)

### 📋 Sprint 4+: Operações, Monetização, Expansão
**Referência completa:** ⭐ **[FEATURES_ROADMAP.md](FEATURES_ROADMAP.md)** (leia para detalhes de todas as sprints 3-6+)

---

## 🔒 Segurança e Operações

### 1. Proteção do Endpoint de Cleanup

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


### Verificação pós-confirmação

Sempre que o agente solicitar que o analista execute uma ação e o analista confirmar a conclusão, o agente deve verificar que a ação foi realmente realizada — por exemplo: rodando comandos de validação, inspecionando arquivos/diffs, conferindo a saída do terminal, ou validando que o PR/branch foi criado — e reportar evidências (saída do terminal, hashes de arquivo, link do PR, etc.) ao analista.

### Escolha de próximo passo (preferência)

Quando o agente oferecer opções de próximo passo, ele deve automaticamente seguir com a opção mais recomendada para o projeto (ou seja, a ação que maximiza progresso e minimiza risco), salvo instrução contrária do analista. O agente deve registrar brevemente por que escolheu essa opção ao reportar progresso.

Essas regras ajudam a manter autonomia do agente com transparência e controle pelo analista.

---

## 9. Sistema de Internacionalização (i18n)

### Configuração Atual (next-intl)

O projeto agora utiliza **next-intl** para traduções, com arquivos JSON organizados:

```
messages/
├── pt.json  (Português - idioma padrão)
├── en.json  (Inglês)
├── es.json  (Espanhol)
└── zh.json  (Chinês)
```

### Como Usar

```tsx
// Em componentes client:
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('bookings');
  return <button>{t('cancel_booking')}</button>;
}
```

### Relatório de Migração

Consulte [I18N_REPORT.md](I18N_REPORT.md) para lista completa de arquivos que ainda precisam de tradução (~200+ strings).

---

## 10. Galeria de Terapias

### Categorias Principais
- **Corporais (body):** 25 terapias - massagens, medicina tradicional, movimento
- **Mente (mind):** 17 terapias - psicoterapia, técnicas cognitivas, meditação
- **Energéticas (energy):** 14 terapias - reiki, cristaloterapia, sound healing
- **Naturais (natural):** 8 terapias - fitoterapia, nutrição, homeopatia

### Subcategorias (novo)
Cada categoria principal agora tem subcategorias para navegação mais precisa:
- Body: Massagem & Toque, Medicina Tradicional, Manipulação Estrutural, Movimento
- Mind: Psicoterapia, Técnicas Cognitivas, Expressão Criativa, Meditação, Autoconhecimento
- Energy: Imposição de Mãos, Frequência & Vibração, Reprogramação Energética
- Natural: Fitoterapia, Nutrição, Diagnóstico Natural

### Arquivos Relacionados
- `src/data/therapies.ts` - Definição de terapias, categorias e subcategorias
- `src/data/therapyImages.ts` - Mapeamento de imagens do Unsplash
- `src/app/explore/therapies/page.tsx` - Galeria com filtros

---

## 11. Pesquisa e Inspiração

Ao implementar novas funcionalidades, consultar:

### Casos de Sucesso no Mercado
- **Calm / Headspace** - UX de meditação e bem-estar
- **ClassPass** - Marketplace de fitness e wellness
- **Doctolib** - Agendamento médico europeu
- **ZenBusiness** - Onboarding simplificado

### Padrões de Design
- **Calendly** - UX de seleção de horários
- **Airbnb** - Vitrine de profissionais e avaliações
- **Fiverr** - Marketplace de serviços


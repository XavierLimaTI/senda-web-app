# 📋 Features Extras - Roadmap Completo (Sprint 3-6+)

## 🚀 Visão Geral das 9 Features Aprovadas

Todas as features foram analisadas e alocadas em sprints. Para detalhes técnicos completos, consulte [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md).

---

## ⚠️ **BLOQUEADORES DE PRODUÇÃO - SPRINT 3 (CRÍTICO)**

Sem estes 3 items, **não podemos lançar em produção**:

### 1. 🔐 **Admin Panel**
- **Objetivo:** Gerenciar usuários, aprovar terapeutas, moderar conteúdo
- **Componentes principais:**
  - Dashboard com KPIs (usuários ativos, receita, terapeutas pendentes)
  - Tabela de usuários com filtros (nome, role, status, data de criação)
  - Fila de aprovação de terapeutas (visualizar documentos, aprovar/rejeitar)
  - CMS de notícias (CRUD)
  - Configurações do app (comissão, termos, política de cancelamento)
  - Audit logs (rastrear mudanças)
- **Prisma Models:** Adicionar `isAdmin` à User; criar `AdminLog` para rastreamento
- **API Routes:**
  - `GET /api/admin/users` - Listar com filtros
  - `PATCH /api/admin/users/[id]/verify` - Aprovar terapeuta
  - `GET /api/admin/news` - Listar notícias
  - `POST /api/admin/news` - Criar notícia
  - `PATCH /api/admin/settings` - Atualizar configurações
- **Auth:** Restrito a `role === 'ADMIN'` (via NextAuth middleware)
- **Tempo:** 2-3 semanas (1-2 devs)
- **Depende de:** NextAuth já está pronto
- **Habilita:** Todos os outros features (sem admin não há operação)

### 2. 📄 **Document Verification System**
- **Objetivo:** Validar credenciais de terapeutas (CRP, CREFITO, certificados)
- **Tipos de documentos:**
  - CRP (Conselho Regional de Psicologia) - Psicólogos
  - CREFITO (Conselho Regional de Fisioterapia) - Fisioterapeutas
  - Certificados de especialização
  - Diploma de formação
  - ID/CPF (verificação de identidade)
- **Fluxo:**
  1. Terapeuta faz upload na página de perfil
  2. Documento armazenado em S3 ou local (`/public/documents/`)
  3. Admin vê fila de revisão com imagem preview
  4. Admin aprova/rejeita com feedback opcional
  5. Terapeuta notificado via email
- **Prisma Models:**
  - `VerificationDocument`: id, therapistId, type, url, status (PENDING/APPROVED/REJECTED), createdAt
- **API Routes:**
  - `POST /api/therapist/upload-document` - Upload + validação de tipo
  - `GET /api/admin/verification-queue` - Fila de revisão
  - `PATCH /api/admin/document/[id]/approve` - Aprovar
  - `PATCH /api/admin/document/[id]/reject` - Rejeitar com feedback
- **Storage:** S3 (recomendado) ou `/public/documents/` com UUID filenames
- **Tempo:** 2-3 semanas (1-2 devs) + 1-2 dias setup S3
- **Depende de:** Admin Panel para aprovação
- **Habilita:** Terapeuta verificado (badge no perfil), confiança de cliente

### 3. ⚖️ **Terms & Conditions + Privacy Policy**
- **Objetivo:** Compliance legal antes de produção
- **Documentos:**
  - Termos & Condições (uso da plataforma)
  - Política de Privacidade (LGPD compliance)
  - Política de Cancelamento (reembolsos)
  - Termos de Pagamento (split, taxa Senda)
- **Funcionalidades:**
  - Versioning (v1.0, v1.1, etc.) com data de efetividade
  - Modal de aceite ao fazer signup
  - Página de visualização dos termos (legal)
  - Tracking de aceites (user + timestamp)
  - Admin poder criar nova versão (old = obsolete, new = current)
- **Prisma Models:**
  - `TermsVersion`: id, type (TERMS/PRIVACY/CANCELLATION), version, content, effectiveDate, createdAt
  - `UserAcceptance`: id, userId, termsVersionId, acceptedAt
- **API Routes:**
  - `GET /api/public/terms` - Retorna versão atual
  - `POST /api/auth/signup` - Modificar para validar aceite
  - `GET /api/admin/terms` - Versão history
  - `POST /api/admin/terms` - Criar nova versão
- **Design:** Página simples com scroll, aceite checkbox
- **Tempo:** 2-3 semanas dev + **1-2 semanas legal review** ⏰
- **Blockers:** Precisa de lawyer para revisar antes de publicar
- **Depende de:** Nada
- **Habilita:** Produção segura (legal compliance)

### 4. ✨ **Solicitar Terapia Nova** (Quick Win - 5-7 dias)
- **Objetivo:** Terapeuta pode sugerir terapia não existente
- **Fluxo:**
  1. Terapeuta clica "Solicitar Nova Terapia" no dashboard
  2. Abre modal com nome, descrição, duração esperada
  3. Envía request para admin
  4. Admin revisa, aprova, e adiciona à lista de terapias
  5. Terapeuta notificado que terapia foi aprovada
- **Prisma Models:**
  - `TherapyRequest`: id, therapistId, name, description, status (PENDING/APPROVED), createdAt
- **API:**
  - `POST /api/therapist/request-therapy` - Criar request
  - `GET /api/admin/therapy-requests` - Fila
  - `PATCH /api/admin/therapy-requests/[id]/approve` - Aprovar
- **UI:** Modal simples no dashboard do terapeuta
- **Tempo:** 5-7 dias (1 dev)
- **Depende de:** Admin Panel para aprovação

### 5. 📖 **About Page + Landing Content** (Quick Win - 5-7 dias)
- **Objetivo:** Página institucional, história, missão, visão, team
- **Páginas:**
  - `/about` - Sobre Senda (história, missão, visão, valores)
  - `/team` - Time (cards com fotos, nomes, roles, sociais)
  - `/contact` - Formulário de contato (email → inbox)
- **Conteúdo:** Storytelling acolhedor (veja brand tone no [copilot-instructions.md])
- **SEO:** Meta tags, Open Graph, canonical URLs
- **Design:** Full hero, sections com imagens, footer com links
- **Tempo:** 5-7 dias (1 dev + 1-2 dias copywriting)
- **Depende de:** Nada (paralelo com Admin/Docs)

---

## 📋 **SPRINT 4: Operações & Engajamento** (2-3 meses após Sprint 3)

### 📧 **Bulk Invitation System**
- **Objetivo:** Convidar muitos clientes via email/WhatsApp/SMS/sociais
- **Features:**
  - Upload de CSV com emails/telefones
  - Template customizável (merge tags: {name}, {link}, etc.)
  - Rastreamento de aberturas (pixel tracking no email)
  - Rate limiting (não enviar spam)
  - Histórico de campanhas
- **Prisma Models:**
  - `InvitationCampaign`: id, createdBy, name, templateId, status, sentAt, openCount
  - `Invitation`: id, campaignId, email/phone, token, openedAt, clickedAt
- **API Routes:**
  - `POST /api/campaigns/create` - Upload CSV + template
  - `GET /api/campaigns` - Listar campanhas
  - `GET /api/public/invite/[token]` - Open tracking
  - `POST /api/public/invite/[token]/signup` - Redirect to signup
- **Integrações:** SendGrid (email), Twilio (SMS), WhatsApp Business API (opcional)
- **Tempo:** 2 semanas (1-2 devs)
- **Depende de:** Email system (✅ pronto)
- **ROI:** Crescimento de usuários, reduz CAC

---

## 💰 **SPRINT 5: Monetização Secundária** (3-4 meses após Sprint 4)

### Pré-requisitos
- ✅ 100+ terapeutas ativos
- ✅ 5k+ clientes cadastrados
- ✅ Reputação estabelecida

### 💳 **Subscription Plans (Freemium Model)**
- **Objetivo:** Receita recorrente via assinatura de terapeutas/clientes
- **Tiers:**
  - **Free:** Terapeutas com até 5 serviços, básico analytics
  - **Pro (R$ 29/mês):** Até 20 serviços, analytics avançado, bulk invites
  - **Premium (R$ 99/mês):** Unlimited serviços, marketplace, branded page, prioridade support
- **Implementação:**
  - Feature flags por tier (ex: `isPro` → acesso a analytics)
  - Recurring billing via Asaas/Stripe
  - Webhook para confirmar/cancelar assinatura
  - Dashboard de faturamento
- **Prisma Models:**
  - `Subscription`: id, therapistId, tier (FREE/PRO/PREMIUM), status (ACTIVE/CANCELLED), renewalDate
  - `SubscriptionBilling`: id, subscriptionId, amount, status (PENDING/PAID/FAILED), date
- **API Routes:**
  - `POST /api/subscription/create` - Criar assinatura
  - `POST /api/subscription/webhook` - Handle Asaas/Stripe events
  - `GET /api/therapist/subscription` - Status atual
  - `PATCH /api/subscription/cancel` - Cancelar
- **Tempo:** 3-4 semanas (1-2 devs)
- **ROI:** R$ 29 × 100 terapeutas × 12 meses = R$ 34.8k/ano (conservador)

### 📢 **Advertisement System**
- **Objetivo:** Receita via publicidade (terapeutas featured, anúncios de marcas)
- **Pacotes:**
  - **Bronze (R$ 500/mês):** Featured no homepage por 30 dias (1 slot)
  - **Silver (R$ 1.000/mês):** Featured + search boost
  - **Gold (R$ 2.500/mês):** Featured + search boost + email blast para 10k clientes
- **Placements:**
  - Homepage hero (carousel top)
  - Category pages (featured cards)
  - Search results (ads banner)
  - Email newsletter
- **Implementação:**
  - Admin CMS para criar pacotes
  - Terapeuta compra via checkout
  - Impressions tracking (analytics)
  - Scheduler (início/fim de promoção)
- **Prisma Models:**
  - `Advertisement`: id, therapistId/productId, package (BRONZE/SILVER/GOLD), placementId, startDate, endDate, impressions, clicks
  - `AdPlacement`: id, slug (HERO/CATEGORY/SEARCH), position, maxSlots
- **Tempo:** 3-4 semanas (1-2 devs + designer)
- **ROI:** R$ 500 × 20 anúncios × 12 meses = R$ 120k/ano (realista)

---

## 🛍️ **SPRINT 6+: Marketplace de Produtos** (6+ meses após Sprint 4)

### Pré-requisitos
- ✅ 10k+ clientes ativos
- ✅ 200+ terapeutas com reputação sólida
- ✅ Infrastructure robusta (analytics, CDN, etc.)

### **Product Marketplace**
- **Objetivo:** Terapeutas vendem produtos/cursos/digitais (amplia receita)
- **Features:**
  - Terapeutas criam loja virtual
  - Upload de produtos (foto, descrição, preço)
  - Carrinho de compras
  - Checkout integrado (mesmo gateway de pagamentos)
  - Shipping automático (Melhor Envio API)
  - Fulfillment dashboard (pedidos, rastreamento)
  - Analytics de vendas por produto
- **Prisma Models:**
  - `Product`: id, therapistId, name, description, price, costPrice, stock, imageUrl, category
  - `Order`: id, buyerId, sellerId (therapistId), orderNumber, totalAmount, status, shippingAddress
  - `OrderItem`: id, orderId, productId, quantity, pricePerUnit
  - `Shipment`: id, orderId, trackingCode, status (PENDING/IN_TRANSIT/DELIVERED)
- **API Routes:**
  - Padrão e-commerce (products CRUD, orders, shipments, etc.)
- **Integrações:** Melhor Envio (shipping), Asaas (pagamentos)
- **Tempo:** 4-5 semanas (2 devs)
- **ROI:** Marketplace fee 10% em todas as vendas

---

## 📊 **Matriz de Dependências**

```
Sprint 3 (Bloqueadores):
├── ✅ Admin Panel
│   ├── → Necessário para aprovar terapeutas (Document Verification)
│   ├── → Necessário para aprovar T&Cs versions
│   └── → Necessário para moderar content (News, Therapy Requests)
│
├── ✅ Document Verification
│   ├── Depende de: Admin Panel (para aprovação)
│   └── Habilita: Verified badge, confiança de cliente
│
├── ✅ T&Cs + Privacy Policy
│   ├── Depende de: Lawyer review (EXTERNAL, não de código)
│   └── Habilita: Legal compliance para produção
│
├── ✨ Solicitar Terapia + About Page (paralelo, quick wins)
│   └── Depende de: Admin Panel (para Solicitar Terapia)

Sprint 4:
└── 📧 Bulk Invitations
    ├── Depende de: Email system (✅ pronto)
    └── Habilita: Customer acquisition campaigns

Sprint 5:
├── 💳 Subscription Plans
│   └── Depende de: Accurate earnings tracking (✅ pronto)
└── 📢 Advertisement System
    └── Depende de: Homepage redesign + analytics

Sprint 6+:
└── 🛍️ Product Marketplace
    └── Depende de: Solid platform reputation + scale (10k+ clientes)
```

---

## 💰 **Estimativa de Custo Total**

### Desenvolvimento
- **Sprint 3:** Admin + Docs + T&Cs + Quick Wins = ~R$ 40k (2-3 devs × 3 semanas)
- **Sprint 4:** Bulk Invites = ~R$ 15k (1-2 devs × 2 semanas)
- **Sprint 5:** Subscription + Ads = ~R$ 35k (1-2 devs × 4 semanas cada)
- **Sprint 6:** Marketplace = ~R$ 32k (2 devs × 4 semanas)
- **Total Dev:** ~R$ 122k

### Externo
- **Lawyer (T&Cs review):** R$ 5-10k
- **Designer (UI refinement):** R$ 10-20k (opcional)
- **Total Externo:** R$ 15-30k

### **Total Geral:** R$ 137-152k (20-25 semanas)

---

## 🎯 **Action Items Imediatos**

### ⏰ Hoje (0-7 dias)
- [ ] Contratar lawyer para revisar T&Cs (CRÍTICO - leva 2-4 semanas)
- [ ] Design system finalization (cores, typography, components)
- [ ] Preparar briefing de Admin Panel (wireframes, flows)

### 📋 Sprint 3 (Semana 1-3)
- [ ] Admin Panel (2-3 semanas)
- [ ] Document Verification (2-3 semanas)
- [ ] T&Cs + Privacy (2-3 semanas dev + lawyer review em paralelo)
- [ ] Solicitar Terapia + About (5-7 dias cada)

### ✅ QA + Staging (Semana 4)
- [ ] Testes completos (E2E, segurança, performance)
- [ ] Legal review de T&Cs
- [ ] Staging deploy
- [ ] Beta testers feedback

### 🚀 Produção (Semana 5)
- [ ] Go-live com Sprint 3 features
- [ ] Monitoring 24/7
- [ ] Ready for Sprint 4 planning

---

## 📚 **Documentação Relacionada**

- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Análise técnica detalhada de cada feature
- [STRATEGIC_RECOMMENDATIONS.md](STRATEGIC_RECOMMENDATIONS.md) - Recomendações de priorização e ROI
- [ROADMAP_VISUAL.md](ROADMAP_VISUAL.md) - Visão gráfica do roadmap
- [copilot-instructions.md](../.github/copilot-instructions.md) - Instruções do projeto (colors, auth, patterns)

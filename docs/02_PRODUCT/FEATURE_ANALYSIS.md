# Análise de Funcionalidades Extras - Senda

## 📋 Resumo dos Itens Propostos

Foram sugeridos **9 novos itens** para o roadmap do Senda. Abaixo está a análise de cada um, indicando:
- **Descrição detalhada**
- **Complexidade estimada**
- **Sprint recomendada**
- **Dependências**
- **Prioridade**

---

## 1️⃣ **Sistema de Anúncios / Espaço Publicitário**

### 📝 Descrição
Criador de conteúdo (terapeuta, espaço, vendedor) escolhe um pacote de publicidade, paga X reais por X tempo de exibição com Y visualizações/dia.

### 🔧 Escopo Técnico
**Models Prisma a criar:**
```prisma
model Advertisement {
  id          Int      @id @default(autoincrement())
  creator     User     @relation(...)  // Terapeuta, Espaço ou Vendedor
  title       String
  description String
  imageUrl    String
  linkUrl     String?
  
  // Pacote selecionado
  adPackageId Int
  adPackage   AdPackage @relation(...)
  
  // Período de exibição
  startDate   DateTime
  endDate     DateTime
  
  // Localização (onde será exibido)
  placement   String   // "homepage-banner", "sidebar", "feed"
  
  // Métricas
  impressions Int      @default(0)
  clicks      Int      @default(0)
  ctr         Float?   // Click-through rate (calcula automático)
  
  status      String   @default("active") // active, paused, expired
  createdAt   DateTime @default(now())
}

model AdPackage {
  id            Int      @id @default(autoincrement())
  name          String   // "Básico - 30 dias", "Premium - 90 dias"
  description   String
  price         Decimal
  durationDays  Int
  dailyViews    Int      // "2000 visualizações/dia"
  maxAds        Int      // Quantos anúncios simultâneos
  placement     String[] // Quais posições disponíveis
  featured      Boolean  @default(false)
  
  advertisements Advertisement[]
}

model AdPayment {
  id              Int      @id @default(autoincrement())
  advertisementId Int
  advertisement   Advertisement @relation(...)
  
  amount          Decimal
  paymentMethod   String  // "credit_card", "pix", "boleto"
  status          String  // "pending", "approved", "failed"
  
  externalId      String? // ID do gateway (Asaas, Stripe, etc)
  invoiceUrl      String?
  
  createdAt       DateTime @default(now())
}
```

**APIs a implementar:**
- `GET /api/ad-packages` - Listar pacotes disponíveis
- `POST /api/advertisements` - Criar novo anúncio
- `GET /api/advertisements?creatorId=X` - Anúncios do criador
- `PUT /api/advertisements/[id]` - Editar anúncio
- `DELETE /api/advertisements/[id]` - Pausar/cancelar anúncio
- `POST /api/advertisements/[id]/pay` - Processar pagamento

**UI a criar:**
- Página `/ads/packages` - Mostrar pacotes disponíveis
- Modal de criação de anúncio (upload image, enter title, link)
- Dashboard em `/dashboard/creator/ads` - Ver anúncios ativos, métricas
- Widget de homepage - Exibir anúncios com rotação

**Componentes de exibição:**
- Banner no topo da homepage
- Sidebar com anúncios em grid
- Feed de anúncios entre listings de terapeutas

### ⏱️ Complexidade
- **Estimado:** 3-4 semanas
- **Pontos:** ~34 story points
- **Equipe:** 1 dev full-stack + 1 design

### 🎯 Sprint Recomendada
**Sprint 5 (após Trilhas)** - Não bloqueia MVP, revenue feature

### 🔗 Dependências
- Sistema de pagamento já implementado (Sprint 2)
- Perfis de usuário funcionando (Sprint 1)

### 📊 Prioridade
**Média-Alta** (gerador de revenue, mas não urgente para MVP)

---

## 2️⃣ **Painel Admin - Gerenciamento Geral**

### 📝 Descrição
Interface para admin gerenciar todo o app: verificar terapeutas, editar notícias, aprovar Trilhas, bloquear usuários, ver métricas.

### 🔧 Escopo Técnico

**Models Prisma a criar/atualizar:**
```prisma
model AdminLog {
  id        Int      @id @default(autoincrement())
  admin     User     @relation(...)
  action    String   // "approved_therapist", "created_news", "blocked_user"
  target    String?  // ID do recurso afetado
  details   String?  // JSON com detalhes
  createdAt DateTime @default(now())
}

model NewsArticle {
  id          Int      @id @default(autoincrement())
  author      User     @relation(...)  // Admin que criou
  title       String
  slug        String   @unique
  content     String   // Rich text (Markdown ou HTML)
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AppSettings {
  id            Int     @id @default(autoincrement())
  key           String  @unique // "commission_rate", "max_service_price"
  value         String
  description   String?
  type          String  // "percentage", "currency", "boolean"
  updatedBy     Int     // Admin user ID
  updatedAt     DateTime @updatedAt
}
```

**APIs a implementar:**
- `GET /api/admin/dashboard` - Métricas gerais (users, revenue, bookings)
- `GET /api/admin/therapists` - Listar todos com status de verificação
- `PUT /api/admin/therapists/[id]/approve` - Aprovar terapeuta
- `PUT /api/admin/therapists/[id]/reject` - Rejeitar com motivo
- `GET /api/admin/news` - Listar notícias
- `POST /api/admin/news` - Criar notícia
- `PUT /api/admin/news/[id]` - Editar
- `DELETE /api/admin/news/[id]` - Deletar
- `GET /api/admin/users` - Buscar/filtrar usuários
- `PUT /api/admin/users/[id]/block` - Bloquear usuário
- `GET /api/admin/settings` - Buscar configurações do app
- `PUT /api/admin/settings/[key]` - Atualizar setting
- `GET /api/admin/logs` - Auditoria de ações admin

**UI a criar:**
- `/admin/dashboard` - Home com KPIs (total revenue, active users, pending verifications)
- `/admin/therapists` - Tabela de terapeutas com filtros, status, ações
- `/admin/news` - Editor de notícias (CMS simples)
- `/admin/users` - Gerenciamento de usuários (search, block, view profile)
- `/admin/settings` - Painel de configurações (comissão, limites, etc)
- `/admin/logs` - Log de auditoria

### ⏱️ Complexidade
- **Estimado:** 2-3 semanas
- **Pontos:** ~21 story points
- **Equipe:** 1 dev full-stack

### 🎯 Sprint Recomendada
**Sprint 3 ou 4** - Necessário antes de ir para produção com usuários reais

### 🔗 Dependências
- Sistema de autenticação (Sprint 1)
- User role ADMIN já existe no schema

### 📊 Prioridade
**Alta** (essencial para operações)

---

## 3️⃣ **Sistema de Convites em Massa para Terapeutas/Espaços**

### 📝 Descrição
Admin consegue:
- Enviar convites personalizados (email, WhatsApp, redes sociais)
- Upload em massa (Excel/CSV com nomes e contatos)
- Template customizável de mensagem
- Rastreamento de convites abertos

### 🔧 Escopo Técnico

**Models Prisma a criar:**
```prisma
model Invitation {
  id            Int      @id @default(autoincrement())
  email         String?
  phone         String?
  // ou referência direta:
  userId        Int?
  user          User?    @relation(...)
  
  inviteCode    String   @unique
  role          String   // "THERAPIST", "SPACE", "VENDOR"
  message       String?  // Mensagem customizada
  
  // Canal de envio
  channel       String   // "email", "whatsapp", "facebook", "instagram"
  
  // Status
  status        String   @default("pending") // pending, sent, opened, accepted, rejected
  sentAt        DateTime?
  openedAt      DateTime?
  acceptedAt    DateTime?
  
  expiresAt     DateTime? // 30 dias por padrão
  createdBy     Int      // Admin ID
  
  createdAt     DateTime @default(now())
}

model InvitationTemplate {
  id      Int     @id @default(autoincrement())
  name    String
  subject String?
  body    String
  isDefault Boolean @default(false)
}

model InvitationBatch {
  id        Int    @id @default(autoincrement())
  admin     User   @relation(...)
  name      String
  role      String
  
  csvFile   String // URL do arquivo armazenado
  totalRows Int
  
  sentCount    Int @default(0)
  successCount Int @default(0)
  failCount    Int @default(0)
  
  status    String @default("pending") // pending, processing, completed, failed
  
  invitations Invitation[]
  
  createdAt DateTime @default(now())
}
```

**APIs a implementar:**
- `POST /api/admin/invitations/send-single` - Enviar convite único
- `POST /api/admin/invitations/send-bulk` - Upload CSV e disparar em massa
- `GET /api/admin/invitations?batchId=X` - Ver convites de um lote
- `PUT /api/admin/invitations/[id]` - Editar/resend convite
- `GET /api/admin/invitations/templates` - Listar templates
- `POST /api/admin/invitations/templates` - Criar template
- `GET /api/invitations/[inviteCode]` - Link público para aceitar convite

**UI a criar:**
- `/admin/invitations` - Hub de convites
- Modal de "Enviar Convite Único" (email/phone, role, message)
- Modal de "Upload em Massa" (CSV upload, preview, confirmar)
- Template editor (wysiwyg simples)
- Dashboard de tracking (taxa de abertura, aceitação)

**Integrações externas:**
- Email (SendGrid - já integrado)
- WhatsApp (Twilio, Zenvia ou similar)
- Social media (Graph API do Facebook, etc) - MVP pode começar sem isto

### ⏱️ Complexidade
- **Estimado:** 2-3 semanas
- **Pontos:** ~21 story points
- **Equipe:** 1 dev full-stack + suporte para integrações

### 🎯 Sprint Recomendada
**Sprint 4 ou 5** - Útil após lançamento inicial

### 🔗 Dependências
- Email já configurado (Sprint 1)
- Admin panel (item #2 acima)

### 📊 Prioridade
**Média** (importante para crescimento, mas não bloqueia MVP)

---

## 4️⃣ **Sistema de Upload de Documentos para Verificação**

### 📝 Descrição
Terapeutas e espaços fazem upload de:
- Diplomas e certificados
- Documentos de identidade (RG, CPF)
- Comprovante de endereço
- Fotos do ambiente (para espaços)

Admin revisa e aprova/rejeita com feedback.

### 🔧 Escopo Técnico

**Models Prisma a criar:**
```prisma
model VerificationDocument {
  id            Int      @id @default(autoincrement())
  userId        Int
  user          User     @relation(...)
  
  type          String   // "diploma", "identity", "address_proof", "environment_photos"
  documentUrl   String   // URL no storage (S3, local, etc)
  uploadedAt    DateTime
  
  // Revisão do admin
  status        String   @default("pending") // pending, approved, rejected
  reviewedBy    Int?     // Admin ID
  reviewNotes   String?
  reviewedAt    DateTime?
  
  expiresAt     DateTime? // Alguns docs podem expirar
}

model UserVerification {
  id                    Int       @id @default(autoincrement())
  userId                Int       @unique
  user                  User      @relation(...)
  
  // Flags de verificação
  identityVerified      Boolean   @default(false)
  documentsVerified     Boolean   @default(false)
  backgroundCheckPass   Boolean?  // null = pending, true = passed, false = failed
  
  // Para terapeutas
  professionalVerified  Boolean   @default(false)
  
  // Para espaços
  businessVerified      Boolean   @default(false)
  
  // Status geral
  status                String    @default("pending") // pending, approved, rejected, needs_review
  
  lastVerificationAt    DateTime?
  nextVerificationDue   DateTime? // Alguns docs expiram anualmente
}
```

**APIs a implementar:**
- `POST /api/user/verification/upload` - Upload documentos
- `GET /api/user/verification/status` - Ver status de verificação
- `GET /api/admin/verifications?status=pending` - Admin ver pendências
- `PUT /api/admin/verifications/[userId]/approve` - Admin aprovar
- `PUT /api/admin/verifications/[userId]/reject` - Admin rejeitar com feedback
- `GET /api/admin/verifications/[userId]/documents` - Ver docs de um usuário

**UI a criar:**
- `/verification` - Página pós-signup com checklist de docs
- Upload zone para cada tipo de documento
- Preview e redeliver se rejeitado
- `/admin/verifications` - Fila de aprovações com preview de docs

**Armazenamento:**
- Usar S3 (AWS), Azure Blob, ou local `/public/verifications`
- Implementar antivírus scan (ClamAV) antes de processar?
- Criptografia em repouso para dados sensíveis

### ⏱️ Complexidade
- **Estimado:** 2-3 semanas
- **Pontos:** ~21 story points
- **Equipe:** 1 dev full-stack + 1 DevOps (para S3/armazenamento)

### 🎯 Sprint Recomendada
**Sprint 3** - Importante para lançamento, terapeutas precisam ser verificados

### 🔗 Dependências
- Admin panel (item #2)
- Sistema de upload de arquivo (parcialmente existe via perfil)

### 📊 Prioridade
**Alta** (essencial para compliance e segurança)

---

## 5️⃣ **Sistema de Assinatura para Prestadores**

### 📝 Descrição
Terapeutas, espaços e vendedores pagam assinatura mensal/anual para ter "vitrine" premium, acesso a recursos avançados (analytics, chat com cliente, etc).

**Planos sugeridos:**
- Grátis: Perfil básico, 1 serviço, sem análises
- Profissional: R$ 49/mês - Perfil premium, ilimitado de serviços, analytics básico
- Enterprise: R$ 149/mês - Tudo + integração API, suporte prioritário

### 🔧 Escopo Técnico

**Models Prisma a criar:**
```prisma
model SubscriptionPlan {
  id          Int      @id @default(autoincrement())
  name        String   // "Grátis", "Profissional", "Enterprise"
  slug        String   @unique
  price       Decimal
  billingCycle String  // "monthly", "annual", "lifetime"
  
  // Features
  maxServices Int      // null = unlimited
  maxRooms    Int?     // Para espaços
  analytics   Boolean
  apiAccess   Boolean
  supportTier String   // "community", "email", "priority"
  
  features    String[] // Array de feature keys
  description String
}

model UserSubscription {
  id          Int      @id @default(autoincrement())
  userId      Int
  user        User     @relation(...)
  
  planId      Int
  plan        SubscriptionPlan @relation(...)
  
  status      String   @default("active") // active, cancelled, expired, paused
  
  startDate   DateTime
  renewalDate DateTime
  endDate     DateTime?
  
  autoRenew   Boolean  @default(true)
  
  // Pagamentos recorrentes
  paymentMethodId String? // Token do gateway
  
  // Admin pode dar trial
  isTrial     Boolean  @default(false)
  trialEndsAt DateTime?
}

model SubscriptionPayment {
  id                  Int      @id @default(autoincrement())
  userSubscriptionId  Int
  subscription        UserSubscription @relation(...)
  
  amount              Decimal
  status              String   // "pending", "approved", "failed", "refunded"
  
  externalId          String?  // ID do gateway
  invoiceUrl          String?
  
  paidAt              DateTime?
  failedAt            DateTime?
  
  createdAt           DateTime @default(now())
}
```

**APIs a implementar:**
- `GET /api/subscriptions/plans` - Listar planos
- `POST /api/subscriptions/checkout` - Iniciar assinatura
- `GET /api/user/subscription` - Ver plano atual
- `PUT /api/user/subscription/upgrade` - Upgrade de plano
- `PUT /api/user/subscription/cancel` - Cancelar assinatura
- `POST /api/user/subscription/payment-method` - Salvar método de pagamento
- `GET /api/admin/subscriptions` - Ver todas as assinaturas (admin)

**UI a criar:**
- `/subscription/plans` - Página de pricing com cards
- Modal de checkout com opção de trial
- `/subscription/manage` - Gerenciar assinatura atual
- Cancel flow com razão e oferta de retention

**Webhooks:**
- Assinatura próxima de expirar (7, 3, 1 dias antes)
- Falha de renovação → retry automático
- Upgrade/downgrade imediato

### ⏱️ Complexidade
- **Estimado:** 3-4 semanas
- **Pontos:** ~34 story points
- **Equipe:** 1 dev full-stack + 1 product manager

### 🎯 Sprint Recomendada
**Sprint 5 ou 6** - Modelo de receita, mas após MVP estar estável

### 🔗 Dependências
- Sistema de pagamento (Sprint 2)
- Perfis de usuário (Sprint 1)
- Email/notificações (Sprint 1-2)

### 📊 Prioridade
**Média-Alta** (revenue model, mas MVP pode começar com "todos grátis")

---

## 6️⃣ **Marketplace de Produtos**

### 📝 Descrição
Terapeutas/espaços/vendedores vendem produtos (óleos, cristais, livros, etc). Integrado com carrinho de compras, checkout e avaliações.

### 🔧 Escopo Técnico

**Models Prisma a criar:**
```prisma
model Product {
  id            Int      @id @default(autoincrement())
  vendorId      Int      // Quem vende (terapeuta, espaço, ou usuário VENDOR)
  vendor        User     @relation(...)
  
  name          String
  slug          String   @unique
  description   String
  category      String   // "oils", "crystals", "books", "supplements"
  
  price         Decimal
  stock         Int
  
  images        String[] // Array de URLs
  
  published     Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model ProductReview {
  id        Int      @id @default(autoincrement())
  productId Int
  product   Product  @relation(...)
  
  buyerId   Int
  buyer     User     @relation(...)
  
  rating    Int      // 1-5
  comment   String?
  
  createdAt DateTime @default(now())
}

model CartItem {
  id        Int      @id @default(autoincrement())
  userId    Int
  user      User     @relation(...)
  
  productId Int
  product   Product  @relation(...)
  
  quantity  Int
  createdAt DateTime @default(now())
}

model Order {
  id          Int      @id @default(autoincrement())
  buyerId     Int
  buyer       User     @relation(...)
  
  items       OrderItem[]
  
  totalPrice  Decimal
  status      String   // "pending", "paid", "shipped", "delivered", "cancelled"
  
  shippingAddress String
  trackingNumber  String?
  
  createdAt   DateTime @default(now())
  deliveredAt DateTime?
}

model OrderItem {
  id        Int      @id @default(autoincrement())
  orderId   Int
  order     Order    @relation(...)
  
  productId Int
  product   Product  @relation(...)
  
  quantity  Int
  price     Decimal  // Preço no momento da compra
}
```

**APIs a implementar:**
- `GET /api/products` - Listar com filtros
- `POST /api/products` - Vendedor criar produto
- `PUT /api/products/[id]` - Editar
- `DELETE /api/products/[id]` - Deletar/arquivar
- `GET /api/cart` - Ver carrinho
- `POST /api/cart` - Adicionar item
- `DELETE /api/cart/[itemId]` - Remover item
- `POST /api/orders/checkout` - Criar pedido e pagar
- `GET /api/orders` - Ver pedidos do usuário
- `GET /api/admin/orders` - Admin ver todos

**UI a criar:**
- `/shop` ou `/marketplace` - Browse de produtos
- `/shop/[slug]` - Detalhe do produto com reviews
- `/cart` - Carrinho com cálculo de envio
- `/checkout` - Pagamento + endereço
- `/orders` - Histórico de compras
- `/dashboard/vendor/products` - Dashboard do vendedor

**Armazenamento de imagens:**
- S3 ou similar para fotos de produtos

**Envios:**
- Integração com Melhor Envio, Movida ou similar (cálculo de frete)
- Rastreamento automático

### ⏱️ Complexidade
- **Estimado:** 4-5 semanas
- **Pontos:** ~45 story points
- **Equipe:** 1-2 devs full-stack + 1 design

### 🎯 Sprint Recomendada
**Sprint 6 ou 7** - Feature nice-to-have, não essencial para MVP

### 🔗 Dependências
- Sistema de pagamento (Sprint 2)
- User roles (Sprint 1)
- Armazenamento de files

### 📊 Prioridade
**Média** (amplifica ecosystem, mas não urgente)

---

## 7️⃣ **Opção para Solicitar Adição de Terapia**

### 📝 Descrição
Se um terapeuta não acha sua especialidade na lista pré-definida, consegue solicitar criação de uma nova. Admin revisa e aprova.

### 🔧 Escopo Técnico

**Models Prisma a criar:**
```prisma
model TherapyRequest {
  id            Int      @id @default(autoincrement())
  requestorId   Int
  requestor     User     @relation(...)
  
  therapyName   String
  description   String
  rationale     String?  // Por que quer adicionar essa terapia
  
  status        String   @default("pending") // pending, approved, rejected
  reviewedBy    Int?     // Admin ID
  reviewNotes   String?
  
  createdAt     DateTime @default(now())
  reviewedAt    DateTime?
}

// Atualizar schema existente:
model Therapy {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  description String?
  
  isCustom    Boolean  @default(false) // True se criado via request
  createdBy   Int?     // User ID que solicitou
  
  services    Service[]
}
```

**APIs a implementar:**
- `POST /api/therapies/request` - Terapeuta solicitar nova terapia
- `GET /api/therapies/requests` - Admin ver pendências
- `PUT /api/therapies/requests/[id]/approve` - Aprovar
- `PUT /api/therapies/requests/[id]/reject` - Rejeitar
- `GET /api/therapies` - Listar todas as terapias (com filtro "custom")

**UI a criar:**
- Modal em `/dashboard/therapist/services` - "Solicitar nova terapia"
- Form simples com nome, descrição, rationale
- `/admin/therapy-requests` - Fila de solicitações

### ⏱️ Complexidade
- **Estimado:** 5-7 dias
- **Pontos:** ~8 story points
- **Equipe:** 1 dev (simples)

### 🎯 Sprint Recomendada
**Sprint 3 ou 4** - Pode ser add-on rápido

### 🔗 Dependências
- Admin panel (item #2)
- Schema de Therapy (já deve existir)

### 📊 Prioridade
**Baixa** (melhor ter depois de lançar com terapias pré-definidas)

---

## 8️⃣ **Página Sobre o Senda**

### 📝 Descrição
Landing page com visão do projeto, missão, valores, time, contato. Deve contar a história de forma inspiradora.

### 🔧 Escopo Técnico

**Models Prisma (opcional):**
```prisma
model PageContent {
  id      Int     @id @default(autoincrement())
  slug    String  @unique // "about", "values", "team"
  title   String
  content String  // HTML ou Markdown
  images  String[]
}
```

**Páginas a criar:**
- `/about` - História, missão, valores
- `/about/team` - Quem faz o Senda
- `/about/contact` - Formulário de contato
- `/about/faq` - Perguntas frequentes

**UI:**
- Layout clean, tipografia serif para títulos
- Imagens cinematográficas (natureza, bem-estar)
- CTA buttons para explorar ou entrar em contato

### ⏱️ Complexidade
- **Estimado:** 3-5 dias
- **Pontos:** ~8 story points
- **Equipe:** 1 dev + 1 design + copy

### 🎯 Sprint Recomendada
**Sprint 4 ou 5** - Depois de outras features

### 🔗 Dependências
- Landing page base (já deve existir)

### 📊 Prioridade
**Baixa** (conteúdo, não funcionalidade crítica)

---

## 9️⃣ **Aceite de Termos e Condições / Políticas**

### 📝 Descrição
Todos os usuários devem aceitar T&Cs ao cadastrar. Admin consegue:
- Editar T&Cs
- Versionar mudanças
- Notificar usuários de atualizações
- Rastrear aceite por usuário

### 🔧 Escopo Técnico

**Models Prisma a criar:**
```prisma
model TermsAndConditions {
  id        Int      @id @default(autoincrement())
  version   Int      @default(1)
  title     String
  content   String   // Markdown ou HTML
  
  // Quando entra em vigor
  effectiveDate DateTime
  
  requiresRejectionReason Boolean @default(false)
  
  createdAt DateTime @default(now())
  createdBy Int      // Admin
}

model PrivacyPolicy {
  id        Int      @id @default(autoincrement())
  version   Int      @default(1)
  content   String
  effectiveDate DateTime
  createdAt DateTime @default(now())
  createdBy Int
}

model CancellationPolicy {
  id        Int      @id @default(autoincrement())
  version   Int      @default(1)
  content   String
  effectiveDate DateTime
  createdAt DateTime @default(now())
  createdBy Int
}

model UserTermsAcceptance {
  id              Int      @id @default(autoincrement())
  userId          Int
  user            User     @relation(...)
  
  termsVersion    Int
  acceptedAt      DateTime
  ipAddress       String?
  userAgent       String?
  
  // Em caso de rejeição
  rejectedAt      DateTime?
  rejectionReason String?
}
```

**APIs a implementar:**
- `GET /api/terms/latest` - Obter versão atual
- `POST /api/terms/accept` - Registrar aceite
- `POST /api/admin/terms` - Criar nova versão (admin)
- `PUT /api/admin/terms/[version]` - Editar (não permitido após publicado)
- `GET /api/admin/terms/acceptances` - Relatório de aceites

**UI a criar:**
- Modal de aceite no signup (checkbox com link para ler)
- `/terms`, `/privacy`, `/cancellation-policy` - Páginas legíveis
- `/admin/terms` - Editor de T&Cs com versionamento
- Notificação para usuários quando T&Cs mudam

**Legal (template inicial):**
- Responsabilidades da plataforma (desclinação de liability)
- Regras de uso (o que é proibido)
- LGPD compliance (Brasil)
- Direitos autorais e DMCA
- Resolução de disputas
- Política de cancelamento (já foi definida)

### ⏱️ Complexidade
- **Estimado:** 2-3 semanas
- **Pontos:** ~16 story points
- **Equipe:** 1 dev + 1 legal consultant (copywriting)

### 🎯 Sprint Recomendada
**Sprint 3 ou 4** - ANTES de ir para produção com usuários reais

### 🔗 Dependências
- Admin panel (item #2)
- Notificação sistema (existente)

### 📊 Prioridade
**Alta** (compliance, necessário antes de lançar)

---

---

## 📊 Resumo Executivo

| Item | Feature | Estimado | Sprint | Prioridade | Bloqueador? |
|------|---------|----------|--------|-----------|------------|
| 1 | Anúncios / Publicidade | 3-4 semanas | 5 | Média-Alta | Não |
| 2 | Admin Panel | 2-3 semanas | 3-4 | **Alta** | **Sim** |
| 3 | Convites em Massa | 2-3 semanas | 4-5 | Média | Não |
| 4 | Documentos de Verificação | 2-3 semanas | 3 | **Alta** | **Sim** |
| 5 | Assinatura para Prestadores | 3-4 semanas | 5-6 | Média-Alta | Não |
| 6 | Marketplace de Produtos | 4-5 semanas | 6-7 | Média | Não |
| 7 | Solicitar Terapia Nova | 5-7 dias | 3-4 | Baixa | Não |
| 8 | Página Sobre o Senda | 3-5 dias | 4-5 | Baixa | Não |
| 9 | T&Cs e Políticas | 2-3 semanas | 3-4 | **Alta** | **Sim** |

---

## 🚀 Roadmap Completo Recomendado

### ✅ Sprint 1: Fundação (CONCLUÍDO)
- Autenticação, profiles, schema base

### ✅ Sprint 2: B2C Marketplace (CONCLUÍDO)
- Serviços, disponibilidade, slots, agendamentos, pagamento

### 🆕 Sprint 3: Segurança + Admin
- ✅ Admin panel (item #2)
- ✅ Documentos de verificação (item #4)
- ✅ T&Cs e políticas (item #9)
- ✅ Solicitar terapia nova (item #7) - add-on

### 🆕 Sprint 4: Polimento + Operações
- ✅ Espaços (B2B) - do plano original
- ✅ Convites em massa (item #3)
- ✅ Página About (item #8)
- ✅ Notícias do admin

### 🆕 Sprint 5: Trilhas + Monetização
- ✅ Trilhas de cuidado (do plano original)
- ✅ Sistema de anúncios (item #1)
- ✅ Assinatura para prestadores (item #5)

### 🆕 Sprint 6+: Expansão
- ✅ Marketplace de produtos (item #6)
- ✅ Analytics avançado
- ✅ API pública
- ✅ Mobile app (React Native)

---

## 💡 Próximos Passos

1. **Confirmar prioridades** com o time de product
2. **Estimar velocidade** (pontos/semana do seu time)
3. **Alocar recursos** para sprints
4. **Começar Sprint 3** com admin + documentos + T&Cs (são bloqueadores)
5. **Revisar legalmente** o escopo do item #9 com especialista

---

**Documento gerado em:** 03/01/2026  
**Versão:** 1.0

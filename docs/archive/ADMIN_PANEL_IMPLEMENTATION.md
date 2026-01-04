# 🔐 Admin Panel - Plano de Implementação

**Data Início:** 2026-01-03  
**Status:** ⏳ Em Desenvolvimento  
**Prioridade:** P0 - Bloqueador de Produção  
**Tempo Estimado:** 2-3 semanas  
**Desenvolvedor:** Agent

---

## 📋 Componentes Necessários

### 1. Dashboard Principal
- [x] **Page:** `/dashboard/admin/page.tsx`
- [x] **Client Component:** `AdminDashboardClient.tsx`
- [x] **Métricas:** Total users, therapists, clients, spaces, pending therapists, bookings, revenue
- [ ] **Refresh automático** de dados a cada 5 min
- [ ] **Gráficos** de trending (Chart.js ou Recharts)

### 2. Gerenciar Usuários
- [x] **Page:** `/dashboard/admin/users/page.tsx`
- [x] **Client Component:** `AdminUsersClient.tsx`
- [x] **Features:**
  - [x] Listagem com paginação
  - [x] Filtros (nome, email, role, status)
  - [ ] Busca em tempo real
  - [ ] Visualizar perfil completo do usuário
  - [ ] Deactivate/Reactivate usuário
  - [ ] Banir usuário permanentemente
  - [ ] Editar dados do usuário (admin override)
  
- [ ] **API Endpoints:**
  - [x] `GET /api/admin/users` - Listar com filtros
  - [ ] `GET /api/admin/users/[id]` - Detalhes
  - [ ] `PATCH /api/admin/users/[id]` - Editar
  - [ ] `PATCH /api/admin/users/[id]/deactivate` - Desativar
  - [ ] `PATCH /api/admin/users/[id]/ban` - Banir permanentemente

### 3. Aprovar Terapeutas
- [x] **Page:** `/dashboard/admin/therapists/pending/page.tsx`
- [x] **Client Component:** `PendingTherapistsClient.tsx`
- [x] **Features:**
  - [x] Fila de terapeutas não verificados
  - [ ] Visualizar documentos (CRP, certificados)
  - [ ] Histórico de tentativas de verificação
  - [ ] Aprovar com notas (opcional)
  - [ ] Rejeitar com motivo obrigatório
  - [ ] Notificar terapeuta via email
  
- [ ] **API Endpoints:**
  - [x] `GET /api/admin/therapists/pending` - Fila
  - [ ] `PATCH /api/admin/therapists/[id]/approve` - Aprovar
  - [ ] `PATCH /api/admin/therapists/[id]/reject` - Rejeitar

### 4. Gerenciar Notícias (CMS)
- [x] **Page:** `/dashboard/admin/news/page.tsx`
- [x] **Client Component:** `AdminNewsClient.tsx` (implementar)
- [x] **Features:**
  - [ ] Listar artigos com paginação
  - [ ] Criar novo artigo
  - [ ] Editar artigo
  - [ ] Publicar/Unpublish
  - [ ] Marcar como destaque
  - [ ] Deletar artigo
  - [ ] Preview antes de publicar
  - [ ] Markdown editor com preview
  
- [ ] **API Endpoints:**
  - [ ] `GET /api/admin/news` - Listar
  - [ ] `GET /api/admin/news/[id]` - Detalhes
  - [ ] `POST /api/admin/news` - Criar
  - [ ] `PATCH /api/admin/news/[id]` - Editar
  - [ ] `DELETE /api/admin/news/[id]` - Deletar
  - [ ] `PATCH /api/admin/news/[id]/publish` - Publicar

### 5. Relatórios & Analytics
- [x] **Page:** `/dashboard/admin/reports/page.tsx`
- [x] **Client Component:** `ReportsClient.tsx` (implementar)
- [ ] **Gráficos:**
  - [ ] Usuários por tipo (pie chart)
  - [ ] Bookings por dia (line chart)
  - [ ] Receita por mês (bar chart)
  - [ ] Taxa de conversão (funnel)
  - [ ] Terapeutas mais avaliados (top 10)
  
- [ ] **Filtros:**
  - [ ] Por período (30d, 90d, 1y, custom)
  - [ ] Por tipo de usuário
  - [ ] Por terapia/serviço

### 6. Pagamentos & Receita
- [x] **Page:** `/dashboard/admin/payments/page.tsx`
- [x] **Client Component:** `PaymentsClient.tsx` (implementar)
- [ ] **Features:**
  - [ ] Listar todas as transações
  - [ ] Filtros (status, data, terapeuta, cliente)
  - [ ] Detalhes da transação (split, taxa, líquido)
  - [ ] Processar reembolsos
  - [ ] Gerar relatório de receita
  
- [ ] **API Endpoints:**
  - [ ] `GET /api/admin/payments` - Listar
  - [ ] `GET /api/admin/payments/[id]` - Detalhes
  - [ ] `POST /api/admin/payments/[id]/refund` - Reembolsar

### 7. Moderar Avaliações (Reviews)
- [x] **Page:** `/dashboard/admin/reviews/page.tsx`
- [x] **Client Component:** `ReviewsClient.tsx` (implementar)
- [ ] **Features:**
  - [ ] Listar reviews com status (approved, flagged, pending)
  - [ ] Visualizar review (texto + rating)
  - [ ] Approve/Reject/Flag
  - [ ] Deletar review abusivo
  - [ ] Notificar usuário do motivo
  
- [ ] **API Endpoints:**
  - [ ] `GET /api/admin/reviews` - Listar
  - [ ] `PATCH /api/admin/reviews/[id]/approve` - Aprovar
  - [ ] `PATCH /api/admin/reviews/[id]/flag` - Marcar como problemático
  - [ ] `DELETE /api/admin/reviews/[id]` - Deletar

### 8. Configurações do App
- [ ] **Page:** `/dashboard/admin/settings/page.tsx` (criar)
- [ ] **Features:**
  - [ ] Taxa de comissão Senda (percentual)
  - [ ] Política de cancelamento (template)
  - [ ] Termos & Condições (versioning)
  - [ ] Email templates (booking confirmation, reminder, etc)
  - [ ] Ativar/desativar features
  
- [ ] **API Endpoints:**
  - [ ] `GET /api/admin/settings` - Obter configurações
  - [ ] `PATCH /api/admin/settings` - Atualizar

### 9. Audit Logs
- [ ] **Page:** `/dashboard/admin/logs/page.tsx` (criar)
- [ ] **Features:**
  - [ ] Listar todas as ações de admin (aprovações, deletions, edições)
  - [ ] Filtrar por admin, tipo de ação, data
  - [ ] Ver detalhes (before/after)
  
- [ ] **API Endpoints:**
  - [ ] `GET /api/admin/logs` - Listar logs

---

## 🗄️ Schema Prisma - Atualizações Necessárias

### Models a Criar/Atualizar

```prisma
// Adicionar ao User model
isAdmin   Boolean  @default(false)

// AdminLog model
model AdminLog {
  id        Int      @id @default(autoincrement())
  adminId   Int
  admin     User     @relation(fields: [adminId], references: [id])
  action    String   // "VERIFY_THERAPIST", "REJECT_THERAPIST", "CREATE_NEWS", etc
  targetId  Int?     // ID do objeto modificado (therapist, review, etc)
  targetType String? // "THERAPIST", "REVIEW", "NEWS", "USER"
  changes   String?  // JSON com {before, after}
  createdAt DateTime @default(now())
}

// VerificationDocument model
model VerificationDocument {
  id          Int      @id @default(autoincrement())
  therapistId Int
  therapist   TherapistProfile @relation(fields: [therapistId], references: [id], onDelete: Cascade)
  type        String   // "CRP", "CREFITO", "CERTIFICATE", "CPF", "DIPLOMA"
  url         String   // URL S3 ou /public/documents/
  status      String   @default("PENDING") // PENDING, APPROVED, REJECTED
  notes       String?  // Motivo da rejeição ou notas de aprovação
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([therapistId, status])
}
```

---

## 📊 Prioridade de Implementação

### Fase 1 (Semana 1) - Core Admin
1. ✅ Dashboard principal com métricas
2. ✅ Gerenciar usuários (CRUD)
3. ✅ Aprovar terapeutas (verify/reject)
4. [ ] **API:** Endpoints de usuarios e terapeutas

### Fase 2 (Semana 2) - Content & Reporting
5. [ ] CMS Notícias (CRUD)
6. [ ] Relatórios & Analytics
7. [ ] Moderar Reviews
8. [ ] **API:** Endpoints de news, reports, reviews

### Fase 3 (Semana 3) - Operações
9. [ ] Pagamentos & Reembolsos
10. [ ] Configurações do App
11. [ ] Audit Logs
12. [ ] Document Verification System
13. [ ] **API:** Endpoints finais

---

## 🔐 Segurança & Validação

- [ ] Role-based access control (ADMIN only)
- [ ] Rate limiting em endpoints sensíveis
- [ ] Audit logging de todas as ações
- [ ] CSRF protection em forms
- [ ] Validação de entrada em todos os endpoints
- [ ] Soft delete (não deletar dados, marcar como deleted)

---

## 📝 Testes Recomendados

- [ ] E2E: Fluxo completo de aprovação de terapeuta
- [ ] E2E: Criar, editar, publicar notícia
- [ ] Unit: Cálculo de receita com split
- [ ] Integration: Notificações enviadas ao rejeitar/aprovar
- [ ] Security: Tentar acessar admin como não-admin

---

## 📚 Dependências

- ✅ NextAuth (autenticação)
- ✅ Prisma (banco dados)
- ✅ Next.js 14 App Router
- ✅ TailwindCSS
- [ ] Chart.js ou Recharts (gráficos) - a implementar
- [ ] react-markdown (para editor de notícias) - a implementar
- [ ] date-fns (manipulação de datas)

---

## 🎯 Checklist Final

- [ ] Todos os endpoints testados
- [ ] Documentação OpenAPI/Swagger
- [ ] Tratamento de erros robusto
- [ ] Performance otimizada (indexação DB)
- [ ] UI responsiva (mobile-friendly)
- [ ] Acessibilidade (WCAG 2.1)
- [ ] Deploy pronto para staging

---

**Próximo Passo:** Implementar Fase 1 (Dashboard + Gerenciar Usuários + Aprovar Terapeutas)

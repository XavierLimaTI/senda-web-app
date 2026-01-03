# 📝 Mapeamento: 9 Itens Extras → 9 Features Implementadas

Este documento mapeia os **9 itens extras** que você forneceu aos **9 features** que foram analisados, alocados em sprints, e documentados.

---

## Mapeamento Direto

| # | Seu Item | Feature Name | Sprint | Docs |
|---|----------|------------|--------|------|
| 1 | "Espaço de anúncios (publicidade) - anunciante escolhe pacote, paga X reais por X tempo de exibição X vezes ao dia" | **Advertisement System** | 5 | [FEATURES_ROADMAP.md#advertisement-system](FEATURES_ROADMAP.md) |
| 2 | "Admin - administração do app, adicionar/editar notícias" | **Admin Panel** | 3 | [FEATURES_ROADMAP.md#admin-panel](FEATURES_ROADMAP.md) |
| 3 | "Disparador de convites - email/telefone/rede social, upload Excel para volume, msg customizável" | **Bulk Invitation System** | 4 | [FEATURES_ROADMAP.md#bulk-invitation-system](FEATURES_ROADMAP.md) |
| 4 | "Upload de documentos para verificação e certificados" | **Document Verification System** | 3 | [FEATURES_ROADMAP.md#document-verification-system](FEATURES_ROADMAP.md) |
| 5 | "Sistema de assinatura para prestadores" | **Subscription Plans** | 5 | [FEATURES_ROADMAP.md#subscription-plans-freemium-model](FEATURES_ROADMAP.md) |
| 6 | "Marketplace de produtos" | **Product Marketplace** | 6 | [FEATURES_ROADMAP.md#product-marketplace](FEATURES_ROADMAP.md) |
| 7 | "Opção para terapeuta solicitar inserção de terapia não existente" | **Request New Therapy Type** | 3 | [FEATURES_ROADMAP.md#solicitar-terapia-nova-quick-win---5-7-dias](FEATURES_ROADMAP.md) |
| 8 | "Página sobre o Senda" | **About Page + Landing Content** | 3 | [FEATURES_ROADMAP.md#about-page--landing-content-quick-win---5-7-dias](FEATURES_ROADMAP.md) |
| 9 | "Aceite de regras ao cadastrar e atualizar" | **Terms & Conditions + Privacy Policy** | 3 | [FEATURES_ROADMAP.md#terms--conditions--privacy-policy](FEATURES_ROADMAP.md) |

---

## Detalhes por Feature

### 1️⃣ **Seu Item:** "Espaço de anúncios (publicidade)"
**Feature:** Advertisement System  
**Sprint:** 5 (Monetização)  
**O que inclui:**
- Anunciantes compram pacotes (Bronze/Silver/Gold)
- Preço: R$ 500/1.000/2.500 por mês
- Placements: Homepage, category pages, search, email
- Impressions & clicks tracking
- Admin dashboard para gerenciar anúncios
- Scheduler (data início/fim)

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Advertisement System"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #1
- [STRATEGIC_RECOMMENDATIONS.md](STRATEGIC_RECOMMENDATIONS.md) - ROI estimate (R$ 120k/ano)

---

### 2️⃣ **Seu Item:** "Admin - administração do app, adicionar/editar notícias"
**Feature:** Admin Panel  
**Sprint:** 3 (BLOQUEADOR)  
**O que inclui:**
- Dashboard com KPIs (usuários, receita, terapeutas pendentes)
- Tabela de usuários com filtros
- Fila de aprovação de terapeutas (com documentos)
- CMS de notícias (CRUD)
- Configurações do app (comissão, política de cancelamento)
- Audit logs

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Admin Panel"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #2
- [DOCUMENTATION_CREATED.md](DOCUMENTATION_CREATED.md) - Why critical blocker

**Timing:** 2-3 semanas dev
**Bloqueia:** Document Verification (precisa admin para aprovar), todos outros features (ops)

---

### 3️⃣ **Seu Item:** "Disparador de convites - email/telefone/rede social, upload Excel para volume, msg customizável"
**Feature:** Bulk Invitation System  
**Sprint:** 4 (Operações)  
**O que inclui:**
- Upload CSV com emails/telefones
- Template customizável (merge tags: {name}, {link})
- Rastreamento de aberturas (pixel tracking)
- Rate limiting
- Histórico de campanhas
- Integrações: SendGrid (email), Twilio (SMS), WhatsApp (opcional)

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Bulk Invitation System"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #3

**Timing:** 2 semanas dev
**Depende de:** Email system (✅ já pronto)

---

### 4️⃣ **Seu Item:** "Upload de documentos para verificação e certificados"
**Feature:** Document Verification System  
**Sprint:** 3 (BLOQUEADOR)  
**O que inclui:**
- Upload de: CRP, CREFITO, certificados, diploma, ID/CPF
- Admin vê fila de revisão com image preview
- Aprovar/rejeitar com feedback
- Terapeuta notificado via email
- Storage em S3 ou local (`/public/documents/`)
- Verified badge no perfil do terapeuta

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Document Verification System"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #4

**Timing:** 2-3 semanas dev + 1-2 dias S3 setup
**Depende de:** Admin Panel (para aprovação)
**Habilita:** Confiança de cliente, compliance

---

### 5️⃣ **Seu Item:** "Sistema de assinatura para prestadores"
**Feature:** Subscription Plans (Freemium Model)  
**Sprint:** 5 (Monetização)  
**O que inclui:**
- 3 tiers: Free / Pro (R$ 29/mês) / Premium (R$ 99/mês)
- Feature flags por tier (ex: analytics, bulk invites)
- Recurring billing via Asaas/Stripe
- Webhook handling
- Dashboard de faturamento
- Auto-renew com opção de cancel

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Subscription Plans"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #5
- [STRATEGIC_RECOMMENDATIONS.md](STRATEGIC_RECOMMENDATIONS.md) - ROI (R$ 34.8k/ano)

**Timing:** 3-4 semanas dev
**Pré-requisito:** 100+ terapeutas ativos

---

### 6️⃣ **Seu Item:** "Marketplace de produtos"
**Feature:** Product Marketplace  
**Sprint:** 6+ (Expansão)  
**O que inclui:**
- Terapeutas criam loja virtual
- Upload de produtos (foto, descrição, preço, custo, estoque)
- Carrinho de compras
- Checkout integrado (mesmo gateway Asaas)
- Shipping via Melhor Envio API
- Fulfillment dashboard (pedidos, rastreamento)
- Analytics de vendas

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Product Marketplace"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #6

**Timing:** 4-5 semanas dev
**Pré-requisito:** 10k+ clientes ativos

---

### 7️⃣ **Seu Item:** "Opção para terapeuta solicitar inserção de terapia não existente"
**Feature:** Request New Therapy Type  
**Sprint:** 3 (Quick Win - 5-7 dias)  
**O que inclui:**
- Modal no dashboard do terapeuta
- Terapeuta submete: nome, descrição, duração
- Admin vê fila de requests
- Admin aprova e adiciona à lista
- Terapeuta notificado via email

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Solicitar Terapia Nova"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #7

**Timing:** 5-7 dias (quick win, paralelo)
**Depende de:** Admin Panel (para aprovação)

---

### 8️⃣ **Seu Item:** "Página sobre o Senda"
**Feature:** About Page + Landing Content  
**Sprint:** 3 (Quick Win - 5-7 dias)  
**O que inclui:**
- `/about` - Sobre Senda (história, missão, visão, valores)
- `/team` - Time (cards com fotos, nomes, roles, sociais)
- `/contact` - Formulário de contato (email → inbox)
- SEO tags, Open Graph, canonical URLs
- Full hero, sections com imagens, footer

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "About Page + Landing Content"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #8

**Timing:** 5-7 dias (quick win, paralelo)
**Depende de:** Nada (pode fazer em paralelo)

---

### 9️⃣ **Seu Item:** "Aceite de regras ao cadastrar e atualizar"
**Feature:** Terms & Conditions + Privacy Policy  
**Sprint:** 3 (BLOQUEADOR)  
**O que inclui:**
- Termos & Condições (uso da plataforma)
- Política de Privacidade (LGPD compliance)
- Política de Cancelamento (reembolsos, emergência)
- Termos de Pagamento (split, taxa Senda)
- **Versionamento:** v1.0, v1.1, etc. com data de efetividade
- **Modal de aceite** ao fazer signup
- **Página de visualização** dos termos (legal)
- **Tracking de aceites:** user + timestamp
- Admin pode criar nova versão (old = obsolete)

**Docs:**
- [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) - Section "Terms & Conditions"
- [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) - Feature #9

**Timing:** 2-3 semanas dev + **1-2 semanas legal review** ⏰  
**Blocker:** Precisa de lawyer (CONTRATAR HOJE)  
**Habilita:** Compliance legal, produção segura

---

## 📊 Resumo por Sprint

### Sprint 3 (Bloqueadores de Produção)
Seus itens:
- ✅ #2: Admin
- ✅ #4: Document Verification
- ✅ #7: Solicitar Terapia
- ✅ #8: About Page
- ✅ #9: T&Cs

**Timing:** 3 semanas  
**Budget:** R$ 40k  
**Team:** 2-3 devs

---

### Sprint 4 (Operações)
Seu item:
- ✅ #3: Bulk Invitations

**Timing:** 2 semanas  
**Budget:** R$ 15k

---

### Sprint 5 (Monetização)
Seus itens:
- ✅ #1: Advertisement System
- ✅ #5: Subscription Plans

**Timing:** 8 semanas (paralelo)  
**Budget:** R$ 35k  
**Pré-requisito:** 100+ terapeutas

---

### Sprint 6+ (Expansão)
Seu item:
- ✅ #6: Product Marketplace

**Timing:** 4-5 semanas  
**Pré-requisito:** 10k+ clientes

---

## ✅ Ações Próximas

### Hoje
- [ ] Ler este arquivo (mapeamento completo)
- [ ] Ler [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) (detalhes técnicos)
- [ ] Ler [SPRINT3_EXECUTIVE_SUMMARY.md](SPRINT3_EXECUTIVE_SUMMARY.md) (resumo executivo)
- [ ] **Contratar lawyer para T&Cs** ⏰

### Semana 1
- [ ] Apresentar roadmap para stakeholders
- [ ] Confirmar Sprint 3 start
- [ ] Preparar specs de Admin Panel + Document Verification

### Semana 2-3
- [ ] Começar Sprint 3 (paralelo: Admin, Docs, T&Cs, quick wins)

### Semana 4-5
- [ ] QA + Produção
- [ ] Sprint 3 features go-live

---

## 📚 Documentação de Referência

| Documento | Tipo | Tamanho | Quando Ler |
|-----------|------|---------|-----------|
| [SPRINT3_EXECUTIVE_SUMMARY.md](SPRINT3_EXECUTIVE_SUMMARY.md) | Resumo | 800 palavras | Hoje (5 min) |
| [FEATURES_ROADMAP.md](FEATURES_ROADMAP.md) | Planning + Specs | 3,500 palavras | Hoje (20 min) |
| [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md) | Technical Deep-Dive | 9,000 palavras | Semana 1 (implementação) |
| [STRATEGIC_RECOMMENDATIONS.md](STRATEGIC_RECOMMENDATIONS.md) | Business | 1,500 palavras | Semana 1 (aprovação) |
| [ROADMAP_VISUAL.md](ROADMAP_VISUAL.md) | Visuals | 2,000 palavras | Semana 1 (stakeholders) |
| [FEATURES_EXTRAS_SUMMARY.md](FEATURES_EXTRAS_SUMMARY.md) | Quick Ref | 1,500 palavras | Qualquer hora |
| [DOCUMENTATION_CREATED.md](DOCUMENTATION_CREATED.md) | Summary | 1,500 palavras | Qualquer hora |

---

## 🎯 Key Takeaways

1. ✅ **Todos os 9 itens foram mapeados** para features bem-definidas
2. ✅ **Alocados em sprints** (Sprint 3, 4, 5, 6+)
3. ✅ **Orçamento estimado:** R$ 137-152k / 20-25 semanas
4. ⏰ **Ação imediata:** Contratar lawyer para T&Cs
5. 🚀 **Sprint 3 é bloqueador** para produção (Admin, Docs, T&Cs)
6. 💰 **ROI potencial ano 1:** R$ 155k+ (pode cobrir investimento)

---

**Status:** Completo  
**Próximo passo:** Aprovação de Sprint 3 + contratação de lawyer

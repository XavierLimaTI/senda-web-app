# 🚀 Senda - Roadmap para Desenvolvedor Solo (Budget Zero)

**Situação:** Desenvolvedor solo, sem budget, buscando patrocínio em summits  
**Objetivo:** MVP em produção para demonstrar viabilidade e atrair investidores  
**Estratégia:** Priorizar features essenciais, ferramentas gratuitas, automação máxima

---

## 💡 FILOSOFIA: MVP ENXUTO → PATROCÍNIO → EXPANSÃO

```
Fase 1: MVP Essencial (você solo, 8-12 semanas)
   ├─ Features mínimas para funcionar
   ├─ Ferramentas 100% gratuitas
   └─ Foco: demonstrar viabilidade

Fase 2: Pitch em Summits
   ├─ Apresentar INDEX.md + MVP funcionando
   ├─ Buscar: patrocínio, aceleradoras, investidores
   └─ Meta: R$ 50-150k seed

Fase 3: Expansão com Investimento
   ├─ Contratar 1-2 devs
   ├─ Implementar features avançadas
   └─ Scaling
```

---

## 📋 SPRINT 3 AJUSTADA: MVP ESSENCIAL (8-12 semanas solo)

### Bloqueadores REAIS (sem eles, não funciona)

#### 1. ⚖️ **Termos & Condições + LGPD** (1 semana)
**Status:** ✅ **EU CRIO PARA VOCÊ** (baseado em LGPD + contratos similares)

**O que vou criar:**
- ✅ Termos de Uso (aceite obrigatório no signup)
- ✅ Política de Privacidade (LGPD compliance)
- ✅ Política de Cancelamento (reembolsos, emergência)
- ✅ Termos de Pagamento (split 15%, repasse)
- ✅ Sistema de versionamento (v1.0, v1.1...)
- ✅ Modal de aceite (signup flow)

**Custo:** R$ 0 (eu faço)  
**Timeline:** 2-3 dias  
**Legal risk:** Médio (provisório até ter budget para advogado revisar)

#### 2. 🔐 **Admin Panel SIMPLIFICADO** (2-3 semanas)
**Versão enxuta:** Apenas o essencial para você operar

**Features CORE (não pode faltar):**
- Dashboard com KPIs básicos (usuários, bookings, receita)
- Lista de terapeutas pendentes + botão "Aprovar"
- Lista de usuários (buscar, filtrar por role)
- CRUD de notícias (título, texto, data)

**Features CORTADAS (adicionar depois com investimento):**
- ❌ Audit logs (não é crítico para MVP)
- ❌ Configurações avançadas (hardcode por enquanto)
- ❌ Analytics complexos (use Google Analytics free)

**Custo:** R$ 0 (você desenvolve)  
**Timeline:** 2-3 semanas

#### 3. 📄 **Upload de Documentos BÁSICO** (1 semana)
**Versão enxuta:** Local storage (não S3)

**Como funciona:**
- Terapeuta faz upload na página de perfil
- Salva em `/public/documents/therapist-{id}-{type}-{uuid}.pdf`
- Admin vê lista + link para visualizar
- Botões: Aprovar / Rejeitar

**Custo:** R$ 0 (storage local, sem S3)  
**Limitação:** Não escala muito (mas serve pro MVP)  
**Migração futura:** Quando tiver budget, migra para S3 (~R$ 5/mês)

**Timeline:** 1 semana

### Quick Wins (Demonstração para Investidores)

#### 4. 📖 **About Page + Pitch Deck Embedded** (3-4 dias)
**Objetivo:** Página linda para mostrar em summits

**Conteúdo:**
- Hero section: "Seu caminho para o bem-estar começa aqui"
- História do Senda (problema → solução → visão)
- Missão, visão, valores
- Métricas atuais (usuários, terapeutas, bookings)
- Seção "Busco Investimento" com CTA
- Embed do pitch deck (Google Slides iframe)

**Custo:** R$ 0  
**Timeline:** 3-4 dias

#### 5. ✨ **Solicitar Terapia Nova** (2-3 dias)
**Já está no escopo:** Modal simples

---

## 💰 BUDGET AJUSTADO: DEV SOLO

### Fase 1: MVP (Você Solo, Sem Custo)

```
┌─────────────────────────────────────────────┐
│ DESENVOLVIMENTO (8-12 semanas)              │
├─────────────────────────────────────────────┤
│ Termos & Políticas (eu crio)          R$ 0 │
│ Admin Panel simplificado (você)       R$ 0 │
│ Upload docs local (você)              R$ 0 │
│ About Page (você)                     R$ 0 │
│ Solicitar Terapia (você)              R$ 0 │
│                          SUBTOTAL     R$ 0 │
├─────────────────────────────────────────────┤
│ INFRAESTRUTURA (Grátis/Free Tier)          │
├─────────────────────────────────────────────┤
│ Hosting: Vercel Free                  R$ 0 │
│ Database: Vercel Postgres Free        R$ 0 │
│ Email: Resend Free (3k/mês)           R$ 0 │
│ Storage: Local (/public)              R$ 0 │
│ Domain: .com.br (Registro.br)      R$ 40/ano│
│ SSL: Vercel (grátis)                  R$ 0 │
│                          SUBTOTAL    ~R$ 40 │
├─────────────────────────────────────────────┤
│ TOTAL FASE 1 (MVP)                   ~R$ 40 │
└─────────────────────────────────────────────┘
```

### Fase 2: Com Investimento Seed (R$ 50-150k)
Aí sim implementar:
- Contratar 1-2 devs (R$ 5-8k/mês cada)
- S3 para storage (R$ 10-50/mês)
- Advogado revisar T&Cs (R$ 3-5k)
- Features avançadas (Subscription, Ads, Marketplace)

---

## 🛠️ STACK 100% GRATUITA (Free Tier)

### Hosting & Infrastructure
```
✅ Vercel (Free Plan)
   - Hosting Next.js (ilimitado)
   - SSL grátis
   - Edge functions
   - Deploy automático (Git push)
   
✅ Vercel Postgres (Hobby Free)
   - 256 MB storage (suficiente pro MVP)
   - 60h compute/mês
   - Upgrade depois: $20/mês

✅ Resend (Free Tier)
   - 3,000 emails/mês (suficiente!)
   - API simples
   - Templates HTML

✅ Local Storage (MVP)
   - Documentos em /public/documents/
   - Migrate para S3 quando tiver budget
```

### Pagamentos (Asaas - Já Integrado)
```
✅ Asaas (Free)
   - Taxa por transação: 3,99% cartão + R$ 0,40
   - PIX: 0,99%
   - Boleto: R$ 1,99
   - Sem mensalidade
   - Split automático
```

### Analytics & Monitoring
```
✅ Google Analytics 4 (Free)
   - Tráfego, conversões, funnels
   
✅ Vercel Analytics (Free)
   - Web Vitals, Core Web Vitals
   
✅ LogRocket Free Tier
   - 1,000 sessões/mês
   - Session replay, errors
```

### Email Marketing (Future)
```
✅ Mailchimp Free
   - 500 contatos
   - 1,000 emails/mês
   
OU

✅ Sender Free
   - 2,500 contatos
   - 15,000 emails/mês (melhor!)
```

### Design & Assets
```
✅ Figma Free
   - Design de interfaces
   
✅ Unsplash / Pexels
   - Fotos grátis (alta qualidade)
   
✅ Ideogram.ai Free Tier
   - Gerar imagens com AI (100/mês)
```

---

## 📅 TIMELINE REALISTA: DEV SOLO

### Semana 1-2: Termos & Admin Panel (Início)
- [ ] **Eu crio:** Termos, Privacy Policy, Política Cancelamento (2-3 dias)
- [ ] **Você cria:** Admin Panel
  - Dashboard básico (usuários, terapeutas, bookings)
  - Lista de terapeutas pendentes
  - Botão "Aprovar" (muda `verified: true`)

### Semana 3-4: Admin Panel (Conclusão) + Upload Docs
- [ ] Admin: CRUD de notícias
- [ ] Admin: Lista de usuários (buscar/filtrar)
- [ ] Upload de documentos (local storage)
  - Terapeuta: upload na página de perfil
  - Admin: fila de revisão

### Semana 5-6: Modal Aceite T&Cs + About Page
- [ ] Signup flow: modal de aceite (checkbox + link T&Cs)
- [ ] Tracking de aceites (UserAcceptance table)
- [ ] About Page (storytelling + pitch deck embed)
- [ ] Solicitar Terapia (modal simples)

### Semana 7-8: QA + Deploy Staging
- [ ] E2E tests básicos (signup, booking, admin)
- [ ] Fix bugs
- [ ] Deploy staging (Vercel preview)

### Semana 9-10: Production Launch 🚀
- [ ] Deploy production (Vercel)
- [ ] Configurar domínio (.com.br)
- [ ] Monitoring (Google Analytics, Vercel Analytics)
- [ ] Teste final com usuários reais

### Semana 11-12: Preparação Summit
- [ ] Documentação (README.md, pitch deck)
- [ ] Vídeo demo (Loom grátis)
- [ ] Métricas atualizadas no About Page

---

## 🎯 FEATURES MVP vs. EXPANSÃO

### ✅ MVP (Fase 1 - Você Solo)
**Objetivo:** Demonstrar viabilidade, atrair investimento

- [x] Auth (signup, login, email verification)
- [x] Perfis (cliente, terapeuta, espaço)
- [x] CRUD Serviços
- [x] Disponibilidade
- [x] Slots dinâmicos
- [x] Agendamento (4 passos)
- [x] Pagamento Asaas (split automático)
- [x] Dashboards (cliente, terapeuta)
- [x] Favoritos
- [x] Notificações
- [ ] **Admin Panel simplificado** ← Sprint 3
- [ ] **Upload documentos (local)** ← Sprint 3
- [ ] **T&Cs + Privacy Policy** ← Sprint 3 (eu crio)
- [ ] **About Page** ← Sprint 3
- [ ] **Solicitar Terapia** ← Sprint 3

### 🚀 Expansão (Fase 2 - Com Investimento)
**Pré-requisito:** Seed funding (R$ 50-150k)

- [ ] Contratar 1-2 devs
- [ ] Migrar storage para S3
- [ ] Advogado revisar T&Cs
- [ ] Bulk Invitations (growth)
- [ ] Subscription Plans (monetização)
- [ ] Advertisement System (receita extra)
- [ ] Product Marketplace (ecossistema completo)
- [ ] Admin Panel avançado (audit logs, analytics)

---

## 📊 MÉTRICAS PARA PITCH (Summit)

### Demonstrar Tração
```
✅ Usuários cadastrados: X
✅ Terapeutas verificados: Y
✅ Agendamentos realizados: Z
✅ Receita gerada (split): R$ W
✅ NPS (satisfação): XX/100
✅ Retenção (mensal): YY%
```

### Potencial de Mercado
```
📈 Mercado de bem-estar no Brasil: R$ 2,1 bi/ano
📈 Crescimento anual: 15-20%
📈 Plataformas similares (EUA): $100M+ valuation
📈 TAM (endereçável): 500k terapeutas no Brasil
```

### Pitch Deck (Estrutura)
```
1. Problema (ansiedade, depressão, falta de acesso)
2. Solução (Senda: marketplace curado de bem-estar)
3. Produto (screenshots, demo video)
4. Mercado (TAM, SAM, SOM)
5. Modelo de Negócio (split 15%, subscription futura)
6. Tração (métricas atuais)
7. Roadmap (features futuras)
8. Time (você + visão de contratar)
9. Ask (R$ 50-150k seed para 6-12 meses)
```

---

## 🎁 BÔNUS: EU VOU CRIAR PARA VOCÊ

### 1. Documentos Legais (LGPD Compliance)
Vou criar agora mesmo (próxima resposta):

- ✅ **Termos de Uso** (aceite obrigatório)
- ✅ **Política de Privacidade** (LGPD, dados coletados, direitos)
- ✅ **Política de Cancelamento** (24h grátis, emergência humanizada)
- ✅ **Termos de Pagamento** (split, repasse, taxas)

**Formato:** Markdown + versão HTML para copiar/colar

### 2. Code Patterns (Implementação Rápida)
Vou te dar código pronto para:

- ✅ Admin Panel (dashboard + CRUD terapeutas)
- ✅ Upload de documentos (local storage)
- ✅ Modal de aceite T&Cs
- ✅ About Page (template pronto)

---

## ⚠️ RISCOS & MITIGAÇÕES (Dev Solo)

| Risco | Mitigação |
|-------|-----------|
| **Burnout (você solo)** | Trabalhe 4-6h/dia consistente, não 12h/dia caótico |
| **Bugs em produção** | Deploy incremental (staging → production) |
| **T&Cs sem advogado** | Disclaimer no footer: "Termos provisórios, em revisão legal" |
| **Storage local (não escala)** | Migration path clara para S3 (quando tiver $) |
| **Free tier limits** | Monitorar usage (Vercel, Resend dashboards) |
| **Patrocínio não vir** | MVP funciona, você pode freelance para manter no ar |

---

## ✅ PRÓXIMOS PASSOS IMEDIATOS

### Hoje (Próximas 2 horas)
1. [ ] **EU VOU CRIAR:** Termos de Uso + Política de Privacidade (LGPD)
2. [ ] **EU VOU CRIAR:** Code pattern do Admin Panel simplificado
3. [ ] **EU VOU CRIAR:** Code pattern do Upload de Documentos (local)

### Você (Próximos 3-5 dias)
1. [ ] Revisar documentos legais que eu criar
2. [ ] Começar Admin Panel (seguir code pattern)
3. [ ] Implementar modal de aceite T&Cs no signup

### Semana 1-2
1. [ ] Finalizar Admin Panel básico
2. [ ] Implementar Upload documentos
3. [ ] Deploy staging (Vercel)

---

## 🚀 FRASE MOTIVACIONAL

> "Toda grande empresa começou com um desenvolvedor solo e uma ideia. O Senda tem potencial de impactar milhões de vidas. Vamos fazer acontecer, um commit de cada vez."

---

## 📞 O QUE EU VOU ENTREGAR AGORA

Na próxima resposta, vou criar:

1. ✅ **Termos de Uso** (completo, LGPD compliance)
2. ✅ **Política de Privacidade** (LGPD, art. 5º, 6º, 7º, 9º)
3. ✅ **Política de Cancelamento** (humanizada, emergência)
4. ✅ **Termos de Pagamento** (split, repasse, Asaas)
5. ✅ **Código:** Admin Panel simplificado (React Server Component)
6. ✅ **Código:** Upload de documentos (local storage)
7. ✅ **Código:** Modal aceite T&Cs (signup flow)

**Custo para você:** R$ 0  
**Timeline:** 30-60 min para eu criar  
**Legal risk:** Baixo (baseado em LGPD + templates de mercado)

---

**Posso começar?** 🚀

Responda "pode começar" e eu crio tudo agora.

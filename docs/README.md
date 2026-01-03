# 📚 Documentação Senda - Índice Master

**Última atualização:** 3 de janeiro de 2026  
**Versão:** 2.0.0

---

## 🎯 Navegação Rápida

### Para Desenvolvedores
- [Arquitetura Técnica](#-03-technical---arquitetura-e-implementação)
- [Guia de Contribuição](../README.md)
- [Padrões de Documentação](DOCUMENTATION_STANDARDS.md)

### Para Stakeholders/Investidores
- [Pitch para Investidores](01_BUSINESS/INVESTOR_PITCH.md)
- [Modelo de Precificação](01_BUSINESS/PRICING_MODEL.md)
- [Visão de Escalabilidade](01_BUSINESS/SCALABILITY_VISION.md)

### Para Usuários (Terapeutas/Espaços)
- [FAQ - Taxas e Cobranças](05_SUPPORT/FAQ_TAXAS_COBRANCAS.md)
- [Termos de Uso](04_LEGAL/TERMOS_DE_USO.md) *(em breve)*
- [Política de Cancelamento](04_LEGAL/POLITICA_CANCELAMENTO.md) *(em breve)*

---

## 📂 Estrutura Completa da Documentação

### 📘 Meta-Documentação
- [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md) - Padrões e convenções

---

### 💼 01_BUSINESS/ - Estratégia e Modelo de Negócio

#### Documentos Principais
- **[BUSINESS_MODEL.md](01_BUSINESS/BUSINESS_MODEL.md)** *(em breve)*
  - Modelo tri-face (B2B2C)
  - Canvas do negócio
  - Proposta de valor por perfil

- **[PRICING_MODEL.md](01_BUSINESS/PRICING_MODEL.md)** ✅
  - Planos de assinatura (THERAPIST, SPACE, CLIENT)
  - Comparação vs. modelo percentual
  - Perfis de vendedores
  - Política de upgrade/downgrade
  
- **[SCALABILITY_VISION.md](01_BUSINESS/SCALABILITY_VISION.md)** ✅
  - Escalabilidade física (centros de bem-estar)
  - Escalabilidade digital (atendimento virtual, cursos)
  - Projeção 2026-2030
  - Modelo de franquias

- **[INVESTOR_PITCH.md](01_BUSINESS/INVESTOR_PITCH.md)** ✅
  - Pitch deck textual completo
  - Projeções financeiras (3 anos)
  - Ask: R$ 500k-1M SEED
  - **Ativo estratégico:** Lista 10k terapeutas
  - Tração e milestones

---

### 🎨 02_PRODUCT/ - Produto e Features

#### Roadmaps
- **[FEATURE_ROADMAP.md](FEATURE_ROADMAP.md)** *(legado - ver SPRINT_PLANS/)*
  - Roadmap original (R$ 137-152k budget)
  - **Status:** Obsoleto (substituído por SOLO_DEV_ROADMAP)

- **[SOLO_DEV_ROADMAP.md](SOLO_DEV_ROADMAP.md)** ✅
  - Estratégia budget-zero (R$ 40 total)
  - Timeline 8-12 semanas
  - Free tier infrastructure (Vercel, Resend)
  - Pitch para summit

#### Planejamento de Sprints
- **[SPRINT_PLANS/SPRINT2_PLAN.md](SPRINT2_PLAN.md)** ✅
  - Sprint 2: CONCLUÍDA (100%)
  - Features: CRUD services, availability, slots, booking, Asaas, dashboards

- **[SPRINT_PLANS/SPRINT3_PLAN.md](SPRINT3_PLAN.md)** *(em breve)*
  - Admin Panel simplificado
  - Upload de documentos (local storage)
  - Sistema de assinaturas (Prisma models)
  - Legal docs modal

#### Análises de Features
- **[FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md)** ✅
  - 9 features solicitadas (análise técnica)
  - Complexidade, dependências, riscos
  
- **[STRATEGIC_RECOMMENDATIONS.md](STRATEGIC_RECOMMENDATIONS.md)** ✅
  - Priorização estratégica
  - Trade-offs MVP vs. features avançadas

#### User Stories
- **[USER_STORIES/CLIENT_STORIES.md](02_PRODUCT/USER_STORIES/CLIENT_STORIES.md)** *(em breve)*
- **[USER_STORIES/THERAPIST_STORIES.md](02_PRODUCT/USER_STORIES/THERAPIST_STORIES.md)** *(em breve)*
- **[USER_STORIES/SPACE_STORIES.md](02_PRODUCT/USER_STORIES/SPACE_STORIES.md)** *(em breve)*

---

### 🏗️ 03_TECHNICAL/ - Arquitetura e Implementação

- **[ARCHITECTURE.md](03_TECHNICAL/ARCHITECTURE.md)** *(em breve)*
  - Next.js 14 App Router
  - Prisma ORM (SQLite → PostgreSQL)
  - NextAuth multi-role
  - Asaas payment gateway

- **[DATABASE_SCHEMA.md](03_TECHNICAL/DATABASE_SCHEMA.md)** *(em breve)*
  - Explicação detalhada dos modelos Prisma
  - Relacionamentos (User, Booking, Payment, etc.)
  - Migrations importantes

- **[API_REFERENCE.md](03_TECHNICAL/API_REFERENCE.md)** *(em breve)*
  - Todos os endpoints `/api/**`
  - Contratos (request/response)
  - Autenticação e autorização

- **[DEPLOYMENT.md](03_TECHNICAL/DEPLOYMENT.md)** *(em breve)*
  - Deploy Vercel (free tier)
  - Variáveis de ambiente
  - CI/CD (GitHub Actions)
  - Cron jobs (cleanup, notifications)

---

### ⚖️ 04_LEGAL/ - Documentos Legais (LGPD)

**Status:** Todos em desenvolvimento (necessário para MVP)

- **[TERMOS_DE_USO.md](04_LEGAL/TERMOS_DE_USO.md)** *(em breve)*
  - Marketplace usage terms
  - Responsabilidades (plataforma vs. terapeutas)
  - Verificação e aprovação de profissionais

- **[POLITICA_PRIVACIDADE.md](04_LEGAL/POLITICA_PRIVACIDADE.md)** *(em breve)*
  - LGPD Lei 13.709/2018 compliance
  - Dados coletados (cliente, terapeuta, espaço)
  - Direitos do titular (acesso, exclusão, portabilidade)

- **[POLITICA_CANCELAMENTO.md](04_LEGAL/POLITICA_CANCELAMENTO.md)** *(em breve)*
  - Regra 24h (100% reembolso)
  - Regra < 24h (50% taxa)
  - Botão de Emergência Humanizada

- **[TERMOS_PAGAMENTO.md](04_LEGAL/TERMOS_PAGAMENTO.md)** *(em breve)*
  - Modelo de assinatura + taxa fixa
  - Cliente paga gateway (Asaas) separadamente
  - Política de repasse (D+1 após sessão)
  - Split automático

---

### 🆘 05_SUPPORT/ - Suporte e FAQs

- **[FAQ_GERAL.md](05_SUPPORT/FAQ_GERAL.md)** *(em breve)*
  - "Como funciona o Senda?"
  - "É seguro?"
  - "Quem pode ser terapeuta?"

- **[FAQ_TAXAS_COBRANCAS.md](05_SUPPORT/FAQ_TAXAS_COBRANCAS.md)** ✅
  - **Modelo de assinatura explicado**
  - Comparação vs. concorrentes (15-30% comissão)
  - Por que cliente paga gateway?
  - Quando fazer upgrade?
  - **10 perguntas mais comuns**

- **[FAQ_TERAPEUTAS.md](05_SUPPORT/FAQ_TERAPEUTAS.md)** *(em breve)*
  - Processo de verificação
  - Como configurar serviços/disponibilidade
  - Analytics e dashboard

- **[FAQ_ESPACOS.md](05_SUPPORT/FAQ_ESPACOS.md)** *(em breve)*
  - Como cadastrar salas
  - Gestão de vendedores
  - Dashboard de ocupação

- **[TROUBLESHOOTING.md](05_SUPPORT/TROUBLESHOOTING.md)** *(em breve)*
  - Problemas comuns (pagamento, login, etc.)
  - Contato suporte

---

### 🎨 06_BRAND/ - Identidade de Marca

- **[BRAND_IDENTITY.md](06_BRAND/BRAND_IDENTITY.md)** *(em breve)*
  - Paleta de cores (Areia, Verde Sálvia, Terracota, Dourado)
  - Tipografia (Playfair Display + Satoshi)
  - Logos e usos

- **[UX_WRITING_GUIDE.md](06_BRAND/UX_WRITING_GUIDE.md)** *(em breve)*
  - Tom de voz: Acolhedor + Profissional
  - Exemplos de microcopy
  - Glossário (evitar jargões)

- **[DESIGN_SYSTEM.md](06_BRAND/DESIGN_SYSTEM.md)** *(em breve)*
  - Componentes UI (botões, cards, modals)
  - Spacing, grid, responsividade
  - Motion design (transições orgânicas)

---

## 🗂️ Documentos Antigos (Arquivados)

Estes documentos foram criados antes da profissionalização da documentação. **Manter para referência histórica, mas priorizar os novos.**

- [SendaDOC.md](SendaDOC.md) - Documentação operacional original (português)
- [ROADMAP_VISUAL.md](ROADMAP_VISUAL.md) - Timeline visual (pré-pivot)
- [ITEMS_TO_FEATURES_MAPPING.md](ITEMS_TO_FEATURES_MAPPING.md) - Mapeamento 9 features
- [SPRINT3_EXECUTIVE_SUMMARY.md](SPRINT3_EXECUTIVE_SUMMARY.md) - Resumo Sprint 3 (draft)
- [DELIVERABLES.md](DELIVERABLES.md) - Lista de entregáveis (obsoleto)
- [README_DELIVERABLES.md](README_DELIVERABLES.md) - Meta sobre deliverables
- [CONCLUSAO.md](CONCLUSAO.md) - Conclusões antigas

**Ação recomendada:** Migrar conteúdo relevante para nova estrutura e deprecar.

---

## 🚀 Roadmap de Documentação

### ✅ Concluído
- [x] Padrões de documentação
- [x] FAQ Taxas e Cobranças
- [x] Modelo de Precificação (completo)
- [x] Visão de Escalabilidade
- [x] Pitch para Investidores

### 🔄 Em Progresso
- [ ] Legal docs (Termos de Uso, Privacidade, Cancelamento, Pagamento)
- [ ] Arquitetura técnica detalhada
- [ ] API Reference

### 📅 Planejado (Q1 2026)
- [ ] User Stories completas
- [ ] Guia de contribuição para devs externos
- [ ] Design System documentado
- [ ] Brand Guidelines

---

## 📖 Como Usar Este Índice

### 1. **Encontrar Documento**
Use Ctrl+F (ou Cmd+F) para buscar palavra-chave. Exemplo: "assinatura", "pitch", "LGPD".

### 2. **Entender Status**
- ✅ **Documento completo e aprovado**
- 🔄 **Em desenvolvimento**
- *(em breve)* **Planejado, não iniciado**

### 3. **Navegar por Seções**
Clique nos links internos para ir diretamente ao arquivo.

### 4. **Contribuir**
Ao criar novo documento:
1. Siga [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md)
2. Adicione entrada neste índice (categoria correta)
3. Commit com mensagem clara: `docs: add [NOME_DOCUMENTO]`

---

## 🔍 Busca Semântica (Por Caso de Uso)

### "Quero entender o modelo de negócio"
1. [INVESTOR_PITCH.md](01_BUSINESS/INVESTOR_PITCH.md) (visão geral)
2. [PRICING_MODEL.md](01_BUSINESS/PRICING_MODEL.md) (detalhes precificação)
3. [SCALABILITY_VISION.md](01_BUSINESS/SCALABILITY_VISION.md) (longo prazo)

### "Sou terapeuta, tenho dúvidas sobre taxas"
1. [FAQ_TAXAS_COBRANCAS.md](05_SUPPORT/FAQ_TAXAS_COBRANCAS.md) (começo aqui)
2. [PRICING_MODEL.md](01_BUSINESS/PRICING_MODEL.md) (detalhes completos)

### "Sou desenvolvedor, quero contribuir"
1. [README.md](../README.md) (setup inicial)
2. [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md) (padrões)
3. [ARCHITECTURE.md](03_TECHNICAL/ARCHITECTURE.md) *(em breve)*

### "Quero investir no Senda"
1. [INVESTOR_PITCH.md](01_BUSINESS/INVESTOR_PITCH.md) (começo aqui)
2. [SCALABILITY_VISION.md](01_BUSINESS/SCALABILITY_VISION.md) (visão 2030)
3. Contato: investidores@senda.app

---

## 📞 Contato para Documentação

**Dúvidas sobre onde encontrar informação?**
- 📧 Email: docs@senda.app
- 💬 Issue no GitHub: [Abrir issue](https://github.com/senda/senda-web-app/issues/new?labels=documentation)

---

## 📝 Histórico de Versões do Índice

| Versão | Data       | Autor       | Mudanças                                      |
|--------|------------|-------------|-----------------------------------------------|
| 2.0.0  | 2026-01-03 | Equipe      | Reestruturação completa (profissionalização)  |
| 1.0.0  | 2025-12-22 | Equipe      | Versão inicial (INDEX.md original)            |

---

**Última revisão por:** Equipe Senda em 3 de janeiro de 2026

---

**💡 Sugestão:** Marque este arquivo nos favoritos do seu navegador para acesso rápido!

# 📚 Senda Documentation Hub

**Última atualização:** 3 de janeiro de 2026  
**Versão:** 3.0.0 - Reorganizado (Princípios Anti-Redundância)  
**⭐ Start Here:** [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

## 🎯 Quick Navigation

### ⭐ **MUST READ FIRST**
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Project status, features, roadmap, next steps
- **[PROGRESS_TRACKING_RULE.md](./PROGRESS_TRACKING_RULE.md)** - How to keep docs clean (anti-redundancy)

### 📖 For Developers
- [Technical Guides](#-guias-técnicos) - Setup, migrations, testing
- [Code Patterns](./SendaDOC.md) - Auth, email, database
- [Useful Commands](./USEFUL_COMMANDS.md) - npm, prisma, dev tools

### 💼 For Business/Investors
- [Investor Pitch](./01_BUSINESS/INVESTOR_PITCH.md) - Problem, solution, traction
- [Pricing Model](./01_BUSINESS/PRICING_MODEL.md) - Subscription + transaction fees
- [Scalability Vision](./01_BUSINESS/SCALABILITY_VISION.md) - Growth roadmap

### 👥 For Users (Therapists/Spaces)
- [FAQ - Taxas e Cobranças](./05_SUPPORT/FAQ_TAXAS_COBRANCAS.md) - Customer-facing pricing
- [Termos de Condições](./legal/TERMOS_CONDICOES.md) - Terms of Service (LGPD-compliant)
- [Política de Privacidade](./legal/POLITICA_PRIVACIDADE.md) - Privacy Policy (LGPD Art. 14, 18)
- [Política de Cancelamento](./legal/POLITICA_CANCELAMENTO.md) - Cancellation & Refund Policy

---

## 📂 Folder Structure

```
docs/
├── 📊 PROJECT_STATUS.md ⭐ (LEIA PRIMEIRO)
├── 📋 PROGRESS_TRACKING_RULE.md (como manter docs limpos)
├── ⚖️ legal/ (Termos, Privacidade, Cancelamento - LGPD compliant)
├── 💼 01_BUSINESS/ (Estratégia: Pitch, Pricing, Scalability)
├── 🛍️ 02_PRODUCT/ (Strategic Recommendations)
├── 💬 05_SUPPORT/ (FAQ - Taxas e Cobranças)
├── 🖼️ images/ (Assets)
├── 📦 archive/ (Histórico - docs obsoletos)
└── 🔧 Outros (SendaDOC, padrões, comandos úteis)
```

---

## 📘 Core Documentation (Essencial)

### 📊 Project Management
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** ⭐ - **Status único. Leia isto PRIMEIRO!**
  - Features completas (16/18 = 89%)
  - Próximos passos e blockers
  - Build status, dev server status
  
- **[PROGRESS_TRACKING_RULE.md](./PROGRESS_TRACKING_RULE.md)** - Regras obrigatórias
  - Anti-redundancy rule (check before creating)
  - Legal docs folder structure (única source of truth)
  - Como atualizar PROJECT_STATUS.md

### 💼 01_BUSINESS/ - Estratégia e Modelo de Negócio

- **[INVESTOR_PITCH.md](./01_BUSINESS/INVESTOR_PITCH.md)** - Pitch deck para investidores
  - Problema: 86M brasileiros com ansiedade
  - Solução: Marketplace + Trilhas de Cuidado
  - Modelo tri-face (B2B2C)
  - Tração e milestones

- **[PRICING_MODEL.md](./01_BUSINESS/PRICING_MODEL.md)** - Modelo de precificação
  - Planos: FREE, PRO, PREMIUM (Terapeutas)
  - Taxa fixa por transação (não percentual)
  - Comparação vs. concorrentes

- **[SCALABILITY_VISION.md](./01_BUSINESS/SCALABILITY_VISION.md)** - Visão de crescimento
  - Escalabilidade física (centros de bem-estar)
  - Modelo de franquias
  - Projeção 2026-2030

### 🛍️ 02_PRODUCT/ - Produto & Roadmap

- **[STRATEGIC_RECOMMENDATIONS.md](./02_PRODUCT/STRATEGIC_RECOMMENDATIONS.md)** - Priorização de features
  - Bloqueadores críticos (Admin Panel, Documentos, T&Cs)
  - Nice-to-have features (Anúncios, Espaços, Trilhas)
  - Timeline recomendada

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
---

## 🛠️ Guias Técnicos & Referência

### Development Setup
- **[SendaDOC.md](./SendaDOC.md)** - Documentação operacional (português)
- **[USEFUL_COMMANDS.md](./USEFUL_COMMANDS.md)** - Comandos npm, prisma, etc.
- **[SEED_DATA_GUIDE.md](./SEED_DATA_GUIDE.md)** - Como popular DB para testes
- **[ASAAS_TEST_GUIDE.md](./ASAAS_TEST_GUIDE.md)** - Integração Asaas (pagamentos)
- **[DOCUMENTATION_STANDARDS.md](./DOCUMENTATION_STANDARDS.md)** - Padrões de escrita

---

## 💬 Customer-Facing Documentation

### 05_SUPPORT/ - Suporte e FAQ
- **[FAQ_TAXAS_COBRANCAS.md](./05_SUPPORT/FAQ_TAXAS_COBRANCAS.md)** - Perguntas frequentes
  - Modelos de cobrança
  - Planos de terapeutas e espaços
  - Comparação vs. concorrentes

---

## ⚖️ Legal Documentation (LGPD Compliant)

### legal/ - Documentos Legais Oficiais

**Estrutura:** `/docs/legal/` é a ÚNICA source of truth para docs legais.

- **[TERMOS_CONDICOES.md](./legal/TERMOS_CONDICOES.md)** ✅
  - Terms of Service (obrigatório na signup)
  - Elegibilidade, responsabilidades, limitações
  - Compliance: LGPD, Lei 14.181/2021, CDC 8.078/1990

- **[POLITICA_PRIVACIDADE.md](./legal/POLITICA_PRIVACIDADE.md)** ✅
  - Privacy Policy (LGPD Art. 14, 18)
  - Dados coletados, legal basis, retenção
  - Direitos do titular (acesso, exclusão, portabilidade)

- **[POLITICA_CANCELAMENTO.md](./legal/POLITICA_CANCELAMENTO.md)** ✅
  - Cancellation & Refund Policy
  - 100% refund se 24h+ de antecedência
  - "Button of Humanity" - terapeuta pode abrir mão de taxa

- **[legal/README.md](./legal/README.md)** - Índice de compliance
  - Checklist antes de go-live
  - Mapeamento de LGPD compliance
  - Versioning strategy

### 4. **Contribuir**
Ao criar novo documento:
1. Siga [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md)
2. Adicione entrada neste índice (categoria correta)
3. Commit com mensagem clara: `docs: add [NOME_DOCUMENTO]`

---

## 🔍 Busca Semântica (Por Caso de Uso)

### "Quero entender o modelo de negócio"
---

## 🗂️ Archived Documentation

**Documentos obsoletos foram movidos para `/archive/` para preservar histórico:**

| Documento | Razão |
|-----------|-------|
| `FEATURE_ANALYSIS.md` | Sprint 3 completo (análise desatualizada) |
| `SOLO_DEV_ROADMAP.md` | Substituído por PROJECT_STATUS.md |
| `SPRINT_PLANS/` | Sprints 2-3 completados |
| `04_LEGAL/` | Consolidado em `legal/` |
| `CLEANUP_RESULT.md` | Propósito cumprido (consolidação feita) |

**Acesse `/archive/` se precisar referência histórica.**

---

## ✅ Quick Checklist

**Mantendo docs limpos (Anti-Redundancy):**

- [ ] Antes de criar novo doc, verifiquei se já existe?
- [ ] Se existe similar, vou ATUALIZAR (não duplicar)?
- [ ] Novo doc tem propósito ÚNICO e diferente?
- [ ] Registrei mudança em PROJECT_STATUS.md?
- [ ] Removi/arquivei docs redundantes?

**Depois de completar feature:**

- [ ] Atualizei PROJECT_STATUS.md?
- [ ] Atualizei alguma doc relacionada?
- [ ] Nenhum link quebrado em README?

---

## 📚 Navigation Tips

**Buscar rápido:** Use Ctrl+F (Cmd+F) para keywords como "LGPD", "assinatura", "Asaas"

**Links de volta:** Cada documento tem link de volta a README.md no início

**Versions:** Procure por "Versão X.Y.Z" e "Última atualização" em cada doc

---

## 🎯 Key Takeaways

1. **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** é o único lugar para status
2. **[PROGRESS_TRACKING_RULE.md](./PROGRESS_TRACKING_RULE.md)** explica como manter tudo limpo
3. **[legal/](./legal/)** é fonte única de docs legais (LGPD compliant)
4. **Arquive, não delete** - `/archive/` preserva histórico
5. **Sem duplicação** - Check first, update if exists, document unique purpose if creating

---

**Versionado:** 3.0.0 | Reorganizado 2026-01-03 | Princípios: Anti-Redundância + Source of Truth

# Progress Tracking Rule - MANDATORY

## 📌 Single Source of Truth

**`docs/PROGRESS_DASHBOARD.md`** é o documento oficial para acompanhar o progresso do projeto.

## 🔄 Quando Atualizar

**OBRIGATÓRIO** atualizar PROGRESS_DASHBOARD.md quando:

### 1. Feature/Task Completa ✅
- Mude status de `[ ]` para `[x]`
- Atualize a % de progresso
- Adicione timestamp da conclusão se aplicável

### 2. Nova Fase Inicia 🏗️
- Atualize o header "Current Work" 
- Adicione nova seção com features/tasks
- Mude status anterior para ✅ ou 🏗️

### 3. Build Status Muda
- Atualiza se build está ❌ FAILING ou ✅ PASSING
- Registre breve reason se falhou

### 4. Dev Server Status Muda
- ✅ Se iniciou/parou
- 🔴 Se teve erro
- Inclua porta e status

### 5. Bloqueador Crítico Aparecer 🚨
- Adicione na seção "Blocked"
- Descreva impacto
- Registre quem está investigando

### 6. Session Ends 📝
- Adicione "Session Summary" com data
- Resuma o que foi feito (bullets)
- Aponte próximas ações
- Atualize linha de "Last Updated"

## ⚠️ Regra Anti-Redundância

**ANTES DE CRIAR QUALQUER NOVO DOCUMENTO:**

1. ✅ Liste arquivos existentes em `/docs` (usar `ls` ou `list_dir`)
2. ✅ Procure por docs com nome semelhante (busca por keywords)
3. ✅ Se já existir:
   - **NÃO** crie um novo
   - **SIM** atualize o existente
   - **REGISTRE** em PROJECT_STATUS.md qual foi atualizado

## 📂 Estrutura de Pastas Legais (Source of Truth)

**Regra:** `/docs/legal/` é a única pasta com documentos legais oficiais.

| Pasta | Status | Ação |
|-------|--------|------|
| `/docs/legal/` | ✅ **OFICIAL** | Manter atualizado |
| `/docs/0X_*/` | ❌ OBSOLETO | Mover para `/archive/` |
| `/docs/archive/` | 📦 HISTÓRICO | Preservar para referência |

**Documentos Legais Oficiais:**
- `TERMOS_CONDICOES.md` (Terms of Service)
- `POLITICA_PRIVACIDADE.md` (Privacy Policy)
- `POLITICA_CANCELAMENTO.md` (Cancellation Policy)
- `README.md` (Legal docs index)

**Se encontrar pasta duplicada com "LEGAL":**
1. Verifique versão (data de "Última atualização")
2. Mantenha versão mais recente em `/docs/legal/`
3. Mova versão antiga para `/docs/archive/XX_LEGAL/`
4. Delete pasta original
4. ✅ Se criar novo documento:
   - Adicione ao README.md da pasta correspondente
   - Linke de PROJECT_STATUS.md ou outro doc relevante
   - Documente seu propósito único (não-redundante)

## 📋 Template para Session Summary

```markdown
### Session Summary: YYYY-MM-DD

**Completed:**
- ✅ Feature 1 - Brief description
- ✅ Feature 2 - Brief description

**In Progress:**
- 🏗️ Feature 3 - Next step

**Blocked:**
- 🚨 Issue - Reason

**Next Actions:**
- [ ] Action 1
- [ ] Action 2
```

## 🎯 Goal

Manter **transparência total** sobre progresso do projeto:
- Qualquer pessoa pode abrir o arquivo e saber exatamente qual é o status
- Não precisa de meetings para sincronizar progresso
- Histórico de mudanças registra evolução do projeto
- Serve como base para post-mortems e retrospectivas

## ⚠️ Anti-patterns

❌ **NÃO faça:**
- Atualizar apenas em memória (sem commit)
- Deixar features "em progresso" por semanas sem atualizar
- Adicionar features sem descrição
- Registrar status vago ("doing stuff", "working on it")
- Esquecer de atualizar % de progresso

## 📊 Progress Formula

```
Completed = count([x])
Total = count(all items)
Progress % = (Completed / Total) * 100

Current: 10/18 = 56%
Target: 18/18 = 100%
```

---

**Last Updated:** 2026-01-03  
**Maintained by:** AI Agent + Team

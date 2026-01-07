# 📋 Relatório de Internacionalização (i18n) - Senda Web App

**Data:** 07/01/2026  
**Status:** Inventário Completo  

## 📊 Resumo Executivo

| Métrica | Quantidade |
|---------|------------|
| **Strings hardcoded (PT)** | ~200+ |
| **Arquivos afetados** | ~50+ |
| **Prioridade Alta** | 15 arquivos |
| **Prioridade Média** | 25 arquivos |
| **Prioridade Baixa** | 10+ arquivos |

---

## 🔴 PRIORIDADE ALTA (Interface Principal do Usuário)

### 1. Páginas de Agendamento (Client-facing)

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/client/bookings/BookingCard.tsx` | ~15 | Pendente |
| `src/app/client/bookings/RescheduleModal.tsx` | ~12 | Pendente |
| `src/app/booking/[therapistId]/page.tsx` | ~10 | Pendente |
| `src/app/booking/[therapistId]/BookingForm.tsx` | ~8 | Pendente |
| `src/app/checkout/page.tsx` | ~10 | Pendente |
| `src/app/checkout/CheckoutClient.tsx` | ~8 | Pendente |
| `src/app/checkout/success/page.tsx` | ~6 | Pendente |

**Strings encontradas:**
- "Cancelar", "Reagendar", "Confirmar"
- "Você pode cancelar com até 24 horas..."
- "Erro ao cancelar agendamento"
- "Agendamento confirmado com sucesso"
- Status: "Pendente", "Confirmado", "Concluído", "Cancelado"

### 2. Dashboard do Terapeuta

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/home/therapist/page.tsx` | ~20 | Pendente |
| `src/app/dashboard/therapist/services/ServicesManager.tsx` | ~12 | Pendente |
| `src/app/dashboard/therapist/services/ServiceFormModal.tsx` | ~10 | Pendente |
| `src/app/dashboard/therapist/availability/AvailabilityManager.tsx` | ~10 | Pendente |
| `src/app/dashboard/therapist/availability/AvailabilityCard.tsx` | ~6 | Pendente |

**Strings encontradas:**
- "Sessões Hoje", "Agenda de Hoje"
- "Novo Serviço", "Editar Serviço"
- "Nenhum serviço cadastrado"
- "Erro ao salvar serviço"
- Dias da semana

### 3. Reviews e Avaliações

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/review/[bookingId]/page.tsx` | ~8 | Pendente |
| `src/app/review/[bookingId]/ReviewForm.tsx` | ~6 | Pendente |
| `src/components/therapist/ReviewsClient.tsx` | ~10 | Pendente |

---

## 🟡 PRIORIDADE MÉDIA (Painéis Admin/Terapeuta)

### 4. Dashboard Admin

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/admin/dashboard/AdminDashboardClient.tsx` | ~15 | Pendente |
| `src/app/admin/users/AdminUsersClient.tsx` | ~20 | Pendente |
| `src/app/admin/pending/PendingTherapistsClient.tsx` | ~12 | Pendente |
| `src/app/admin/documents/AdminDocumentsClient.tsx` | ~15 | Pendente |
| `src/app/admin/bookings/AdminBookingsClient.tsx` | ~15 | Pendente |
| `src/app/admin/news/AdminNewsClient.tsx` | ~10 | Pendente |
| `src/app/admin/reviews/ReviewsClient.tsx` | ~10 | Pendente |
| `src/app/admin/transactions/TransactionsClient.tsx` | ~10 | Pendente |

**Strings encontradas:**
- "Aprovações Pendentes", "Terapeutas aguardando"
- "Tem certeza que deseja APROVAR..."
- "Buscar por nome ou email..."
- Status: "Aprovado", "Rejeitado", "Pendente"

### 5. Documentos do Terapeuta

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/dashboard/therapist/documents/TherapistDocumentsClient.tsx` | ~15 | Pendente |

**Strings encontradas:**
- "Nenhum documento enviado ainda"
- "Selecione um tipo de documento"
- "Enviando...", "Enviar Documento"
- Status de documentos

### 6. Trilhas de Cuidado

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/dashboard/therapist/trails/TherapistTrailsClient.tsx` | ~12 | Pendente |
| `src/app/trails/[id]/page.tsx` | ~8 | Pendente |

### 7. Notícias

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/news/page.tsx` | ~6 | Pendente |
| `src/app/news/[slug]/page.tsx` | ~6 | Pendente |
| `src/app/admin/news/editor/ArticleEditorClient.tsx` | ~10 | Pendente |

---

## 🟢 PRIORIDADE BAIXA (Páginas Menos Frequentes)

### 8. Páginas de Erro/Empty States

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/not-found.tsx` | ~3 | Pendente |
| `src/app/error.tsx` | ~3 | Pendente |
| Múltiplos empty states | ~20 | Pendente |

### 9. Perfil/Configurações

| Arquivo | Strings Hardcoded | Status |
|---------|-------------------|--------|
| `src/app/profile/page.tsx` | ~8 | Pendente |
| `src/app/settings/page.tsx` | ~6 | Pendente |

---

## 📝 Categorias de Strings para Traduzir

### Botões de Ação (~30 strings)
```
Cancelar, Confirmar, Salvar, Enviar, Editar, Deletar, Remover, Voltar
Salvando..., Enviando..., Carregando..., Cancelando...
```

### Status (~15 strings)
```
Pendente, Confirmado, Concluído, Cancelado
Aprovado, Rejeitado, Ativo, Inativo
```

### Mensagens de Erro (~20 strings)
```
Erro ao salvar, Erro ao carregar, Erro ao enviar
Erro ao processar pagamento, Erro ao criar agendamento
```

### Mensagens de Sucesso (~15 strings)
```
...com sucesso!, Sucesso!, Confirmado!
```

### Confirmações (~10 strings)
```
Tem certeza que deseja...?
Esta ação não pode ser desfeita
```

### Empty States (~20 strings)
```
Nenhum(a) X encontrado(a)
Nenhum(a) X cadastrado(a)
Comece criando...
```

### Dias da Semana (~7 strings)
```
Domingo, Segunda-feira, Terça-feira, Quarta-feira
Quinta-feira, Sexta-feira, Sábado
```

---

## 🛠️ Plano de Migração

### Fase 1: Setup (✅ Concluído)
- [x] Instalar next-intl
- [x] Criar arquivos de mensagens (pt.json, en.json, es.json, zh.json)
- [x] Configurar i18n.ts
- [x] Criar hooks de compatibilidade

### Fase 2: Páginas Críticas (Cliente)
- [ ] Migrar BookingCard.tsx
- [ ] Migrar RescheduleModal.tsx
- [ ] Migrar checkout pages
- [ ] Migrar review pages

### Fase 3: Dashboard Terapeuta
- [ ] Migrar ServicesManager
- [ ] Migrar AvailabilityManager
- [ ] Migrar TherapistDocumentsClient

### Fase 4: Admin e Extras
- [ ] Migrar painéis admin
- [ ] Migrar páginas de erro
- [ ] Migrar empty states

---

## 📚 Como Usar (Guia para Desenvolvedores)

### Novo Sistema (next-intl)

```tsx
// Para componentes novos:
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('bookings');
  
  return (
    <button>{t('cancel_booking')}</button>
  );
}
```

### Hook Unificado (Migração)

```tsx
// Para migração gradual:
import { useUnifiedTranslation } from '@/hooks/useUnifiedTranslation';

export function MyComponent() {
  const { t } = useUnifiedTranslation('bookings');
  
  // Tenta next-intl primeiro, fallback para LanguageContext
  return (
    <button>{t('cancel_booking')}</button>
  );
}
```

### Arquivos de Tradução

```
messages/
├── pt.json  (Português - 350+ chaves)
├── en.json  (Inglês - 350+ chaves)
├── es.json  (Espanhol - 350+ chaves)
└── zh.json  (Chinês - 350+ chaves)
```

---

## ⚡ Quick Wins (Impacto Alto, Esforço Baixo)

1. **Botões comuns** - Usar `t('common.cancel')`, `t('common.save')`, etc.
2. **Status** - Usar `t('status.pending')`, `t('status.confirmed')`, etc.
3. **Dias da semana** - Usar `t('availability.days.monday')`, etc.
4. **Mensagens de erro** - Usar `t('errors.generic')`, `t('errors.save_failed')`, etc.

---

*Documento gerado automaticamente em 07/01/2026*

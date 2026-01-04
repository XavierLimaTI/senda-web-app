# Senda Web App - Sprint de Desenvolvimento Completo

**Data:** 3 de Janeiro de 2026  
**Objetivo:** Construir todas as funcionalidades principais do app com qualidade de produção

---

## 1. ✅ FLUXO DE AGENDAMENTO CLIENTE

### Fase 1.1: Busca e Descoberta de Terapeutas ✅
**Status:** COMPLETO

#### Mudanças Implementadas:
- ✅ **Migrations**: Adicionados campos de localização ao `TherapistProfile`
  - `city`, `state`, `address`, `latitude`, `longitude`, `zipCode`, `neighborhood`, `onlineAvailable`
  
- ✅ **Componente de Busca Inteligente** (`TherapistSearchBar.tsx`)
  - Barra de busca com query textual
  - Filtro por cidade (dropdown com 10 cidades principais)
  - Filtro por especialidade (12 opções)
  - Geolocalização com navegador (50km raio padrão)
  - Toggle "Apenas online"
  - Função limpar filtros
  
- ✅ **Página Melhorada** (`/explore/therapists`)
  - Nova barra de busca no topo (integrada)
  - Exibição dinâmica de filtros aplicados
  - Seletor rápido de ordenação (Relevância, Avaliação, Preço, Distância, Recentes)
  - Contadores atualizados com os filtros

- ✅ **Grid de Terapeutas Melhorado** (`TherapistsGrid.tsx`)
  - Badge "Online" para terapeutas com atendimento online
  - Exibição de localização com distância (se usou geolocalização) ou cidade/bairro
  - Ícone de localização (lucide-react MapPin)
  - Preço mínimo destacado

#### Funcionalidades de Busca:
- Busca por texto (nome do terapeuta, especialidade, bio)
- Filtro por localização (cidade ou proximidade geográfica)
- Filtro por especialidade
- Filtro por modalidade (presencial, online, híbrido)
- Ordenação por: relevância, avaliação, preço, distância, recente
- Paginação client-side

---

### Fase 1.2: Página de Perfil do Terapeuta (Vitrine) ✅
**Status:** COMPLETO

#### Mudanças Implementadas:
- ✅ **Seção de Agendamento** (`TherapistBookingSection.tsx`)
  - Cards interativas de serviços (seleção visual)
  - Exibição de preço, duração, modalidade
  - Sidebar "Sticky" com CTA "Escolher Horário"
  - Modal de agendamento integrado
  - Informações de localização (se presencial) ou status online

- ✅ **Seção de Avaliações Redesenhada** (`TherapistReviewsSection.tsx`)
  - Avaliação média grande e legível
  - Distribuição de ratings em gráfico de barras
  - Cards de avaliações com:
    - Avatar do cliente
    - Nome do cliente
    - Serviço utilizado
    - Data formatada em pt-BR
    - Texto da avaliação (3 linhas máx)
    - Rating com stars (lucide-react)
  - Link para ver todas as avaliações
  
- ✅ **Melhorias na Página Principal** (`/therapist/[id]/page.tsx`)
  - Reorganização lógica (Agendamento → Bio → Avaliações)
  - Componentes refatorados para melhor UX
  - Integração de novos componentes

#### Dados Exibidos:
- Nome, avatar, bio, especialidades, experiência
- Serviços com preço, duração, descrição
- Avaliações (média, distribuição, comentários)
- Localização (com ícone de mapa)
- Status de verificação
- CTA para agendamento flutuante

---

### Fase 1.3: Seletor de Horários Disponíveis (TODO)
**Status:** PRÓXIMO

- Calendário visual com dias disponíveis
- Seletor de horário por dia
- Cálculo automático de duração da sessão
- Verificação de conflitos de agendamento
- Exibição de preço final

---

### Fase 1.4: Checkout e Confirmação (TODO)
**Status:** PRÓXIMO (integração com Asaas)

---

## 2. ✅ DASHBOARD TERAPEUTA

### Fase 2.1: Visualização de Agendamentos ✅
**Status:** COMPLETO

#### Mudanças Implementadas:
- ✅ **Dashboard Principal** (`/dashboard/therapist/bookings/page.tsx`)
  - Header com foto e nome do terapeuta
  - Cards de estatísticas (4 KPIs):
    - Total de agendamentos
    - Próximos agendamentos
    - Sessões completadas
    - Receita total
  - Cores Senda (Verde Sálvia #B2B8A3 para principal, Dourado #C8963E para receita)
  - Busca de agendamentos próximos (30 dias)
  - Passagem de dados para cliente component
  
#### Estatísticas Calculadas:
- Total de agendamentos (todos os tempos)
- Agendamentos confirmados
- Agendamentos completados
- Receita bruta (profissional apenas)
- Agendamentos próximos (5 próximos)

---

### Fase 2.2: Gestão de Disponibilidade (TODO)
**Status:** PRÓXIMO

---

## 3. SISTEMA DE AVALIAÇÕES (TODO)

### Fase 3.1: Formulário Pós-Sessão (TODO)
**Status:** PRÓXIMO

---

### Fase 3.2: Exibição em Perfis ✅ (Parcial)
**Status:** IMPLEMENTADO (Leitura completa)

---

## 4. TRILHAS DE CUIDADO (TODO)

### Fase 4.1: Modelo e CRUD de Trails/Lessons (TODO)
**Status:** PRÓXIMO

---

## 5. PERFIS DE USUÁRIO (TODO)

### Fase 5.1: Edição de TherapistProfile (TODO)
**Status:** PRÓXIMO

---

## 6. NOTIFICAÇÕES (TODO)

### Fase 6.1: Sistema de Emails Transacionais (TODO)
**Status:** PRÓXIMO

---

## 7. PAINEL ADMIN (TODO)

### Fase 7.1: Aprovação de Terapeutas/KYC (TODO)
**Status:** PRÓXIMO

---

## Resumo Técnico

### Tecnologias:
- **Frontend:** Next.js 14 (App Router), TypeScript, React, TailwindCSS
- **Backend:** Next.js API Routes, Prisma ORM
- **DB:** SQLite (dev) → PostgreSQL (prod)
- **UI:** Lucide React Icons (sem emojis), Design System Senda
- **Auth:** NextAuth.js

### Design System Senda:
- **Areia:** `#F0EBE3` (backgrounds)
- **Verde Sálvia:** `#B2B8A3` (primário/CTAs)
- **Terracota:** `#D99A8B` (favoritos/alertas)
- **Dourado:** `#C8963E` (premium/ratings)

### Ícones:
- Todas as importações via `lucide-react`
- Tamanhos padrão: `w-4 h-4` (nav), `w-5 h-5` (botões), `w-6 h-6` (destacados)

### Próximas Prioridades (Ordem Recomendada):
1. **Seletor de Horários** (complementa agendamento)
2. **Gestão de Disponibilidade** (terapeutas precisam controlar agenda)
3. **Sistema de Avaliações** (feedback pós-sessão)
4. **Trilhas de Cuidado** (diferencial Senda)
5. **Edição de Perfis** (terapeutas precisam atualizar dados)
6. **Notificações** (avisos de agendamento)
7. **Painel Admin** (moderação e aprovações)

---

## Mercado-Alvo Atualizado:
- ✅ Clientes podem buscar e descobrir terapeutas
- ✅ Clientes veem vitrine profissional completa
- ✅ Terapeutas veem todos seus agendamentos e métricas
- 🔜 Clientes podem agendar (faltam horários)
- 🔜 Terapeutas controlam disponibilidade
- 🔜 Clientes avaliam sessões
- 🔜 Terapeutas criam Trilhas (diferencial)

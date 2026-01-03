# Sistema de Notificações - Favoritos e Disponibilidade

## 📌 Visão Geral

Sistema de notificações push para alertar clientes quando terapeutas favoritos abrem novos horários.

## 🏗️ Arquitetura

### 1. Modelo de Dados

```prisma
model Notification {
  id        Int      @id
  userId    Int      // Cliente que receberá a notificação
  type      String   // Tipo da notificação
  title     String   // Título curto
  message   String   // Mensagem descritiva
  data      String?  // JSON com contexto extra
  read      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

**Tipos de Notificação:**
- `FAVORITE_AVAILABILITY` - Terapeuta favorito abriu horários
- `BOOKING_REMINDER` - Lembrete de sessão agendada
- `REVIEW_REQUEST` - Pedido de avaliação pós-sessão

### 2. API Endpoints

#### GET /api/notifications
Busca notificações do usuário logado.

**Query Params:**
- `unreadOnly=true` - Apenas não lidas

**Response:**
```json
{
  "notifications": [...],
  "unreadCount": 3
}
```

#### POST /api/notifications
Marca notificações como lidas.

**Body:**
```json
{
  "notificationId": 123  // Marca uma específica
  // OU
  "markAllAsRead": true  // Marca todas
}
```

### 3. Componente UI

**NotificationBell** (Navbar)
- Sino com badge de contador
- Dropdown com últimas 5 notificações
- Click marca como lida
- Link para página completa

## 🔔 Fluxo de Notificação de Favoritos

### Quando Terapeuta Abre Horários:

```typescript
// Exemplo: Após terapeuta salvar disponibilidade
async function notifyFavoriteClients(therapistId: number) {
  // 1. Buscar clientes que favoritaram o terapeuta
  const favorites = await prisma.therapistFavorite.findMany({
    where: { therapistId },
    include: {
      client: { include: { user: true } },
      therapist: { include: { user: true } }
    }
  })

  // 2. Criar notificação para cada cliente
  const notifications = favorites.map(fav => ({
    userId: fav.client.userId,
    type: 'FAVORITE_AVAILABILITY',
    title: `${fav.therapist.user.name} abriu novos horários`,
    message: `Seu terapeuta favorito está com agenda disponível. Agende agora!`,
    data: JSON.stringify({ therapistId })
  }))

  await prisma.notification.createMany({ data: notifications })
}
```

### Quando Chamar:

- `POST /api/therapist/availability` - Após salvar disponibilidade ✅
- `POST /api/therapist/services` - Após criar novo serviço ✅
- Cron job diário - Verificar terapeutas com horários vagos 🔄

## 🚀 Próximos Passos (Roadmap)

### Fase 1: Infraestrutura Básica ✅
- [x] Modelo de Notification
- [x] API de busca/marcação
- [x] Componente NotificationBell
- [x] Integração no Navbar

### Fase 2: Trigger Automático (Próximo Sprint)
- [ ] Hook `afterCreate` em Availability → notifyFavoriteClients()
- [ ] Webhook quando terapeuta aceita agendamento
- [ ] Batch job noturno (23h) - resumo de favoritos com horários

### Fase 3: Canais Adicionais
- [ ] Email transacional (SendGrid)
- [ ] Push notifications (web push API)
- [ ] SMS para urgências (Twilio)

### Fase 4: Personalização
- [ ] Preferências de notificação por tipo
- [ ] Frequência (imediata, diária, semanal)
- [ ] Horário preferido de recebimento

## 💡 UX Patterns

### Tom de Voz
- ✅ "Ana, seu terapeuta favorito abriu horários para esta semana"
- ❌ "Nova disponibilidade cadastrada no sistema"

### Timing
- **Imediato:** Booking confirmado, cancelamento
- **Batch (1x/dia):** Novos horários de favoritos
- **Reminder (D-1):** Lembrete de sessão agendada

### Cores & Ícones
- `FAVORITE_AVAILABILITY`: Verde `#B2B8A3` + ícone calendário
- `BOOKING_REMINDER`: Dourado `#C8963E` + ícone relógio  
- `REVIEW_REQUEST`: Terracota `#D99A8B` + ícone estrela

## 🔧 Configuração

### Environment Variables
```env
# Futuro: para push notifications web
VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:no-reply@senda.app
```

### Cron Job (Vercel)
```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/daily-notifications",
    "schedule": "0 23 * * *"
  }]
}
```

## 📊 Métricas (Futuras)

- Taxa de abertura de notificações
- Conversão notificação → agendamento
- Preferências de canal mais eficaz
- Churn por excesso de notificações (opt-out)

---

**Documentação criada:** 2026-01-03  
**Última atualização:** 2026-01-03

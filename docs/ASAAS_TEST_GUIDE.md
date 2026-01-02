# 🚀 Guia de Teste - Integração Asaas

## Setup Inicial

### 1. Obter credenciais Asaas
- Acesse https://sandbox.asaas.com (ambiente de teste)
- Crie uma conta
- Vá para "Configurações" → "Integração" → "API"
- Copie a `API_KEY`

### 2. Configurar .env.local

```bash
# Copie o arquivo exemplo
cp .env.local.example .env.local

# Edite .env.local e configure:
ASAAS_API_KEY=sua_chave_aqui
ASAAS_API_URL=https://sandbox.asaas.com/api/v3
NEXTAUTH_SECRET=qualquer_coisa_aqui_para_teste
```

### 3. Iniciar servidor

```bash
npm install  # se ainda não feito
npx prisma generate
npx prisma migrate dev
npm run dev
```

Acesse http://localhost:3000

---

## 🧪 Fluxo de Teste E2E

### A. Criar Terapeuta (e verificar)
1. Vá para `/auth/signup`
2. Escolha role `THERAPIST`
3. Crie conta e verifique email
4. **IMPORTANTE:** Você precisa ser admin ou terapeuta já verificado para ver opções

**Para pular verificação em teste:**
```sql
UPDATE TherapistProfile SET verified = true WHERE id = 1;
```

### B. Criar Serviços (como terapeuta)
1. Acesse `/dashboard/therapist/services`
2. Crie 2-3 serviços (ex: Reiki 60min R$150, Yoga 90min R$120)

### C. Configurar Disponibilidade (como terapeuta)
1. Acesse `/dashboard/therapist/availability`
2. Configure horários: ex 09:00-18:00 para toda semana

### D. Criar Cliente
1. Logout (ou nova aba incógnito)
2. Signup com role `CLIENT`
3. Verifique email

### E. Agendamento + Pagamento (fluxo principal)
1. Cliente acessa `/explore/therapists`
2. Clica no card do terapeuta → `/therapist/[id]`
3. Clica "Agendar Sessão" → `/booking/[id]`
4. **Step 1:** Seleciona serviço
5. **Step 2:** Seleciona data/hora (API /api/slots calcula disponíveis)
6. **Step 3:** Revisa resumo
7. **Step 4:** Clica "Ir para Pagamento"
   - Redireciona para Asaas Sandbox Checkout
   - **Teste com cartão:** `4111 1111 1111 1111` (qualquer data futura, qualquer CVV)

### F. Verificar Status do Pagamento
- No Asaas Sandbox, você verá a cobrança em "Cobranças"
- Webhook automaticamente atualiza:
  - `Payment.status` → `APPROVED`
  - `Booking.status` → `CONFIRMED`

### G. Verificar Agendamentos
- **Cliente:** `/client/bookings` (vê agendamento confirmado)
- **Terapeuta:** `/dashboard/therapist/bookings` (vê novo agendamento)

---

## 💳 Cartões de Teste Asaas

| Tipo | Número | Status |
|------|--------|--------|
| Visa | 4111 1111 1111 1111 | ✅ Aprovado |
| Mastercard | 5555 5555 5555 4444 | ✅ Aprovado |
| Amex | 378282246310005 | ✅ Aprovado |
| Recusado | 4000 0000 0000 0002 | ❌ Negado |

Sempre use data futura e qualquer CVV (ex: 123)

---

## 🔍 Verificar Pagamentos no BD

```sql
-- Ver pagamentos criados
SELECT * FROM Payment;

-- Ver bookings atualizados
SELECT id, status, startTime FROM Booking;

-- Ver histórico de pagamentos por cliente
SELECT p.*, b.startTime 
FROM Payment p
JOIN Booking b ON p.bookingId = b.id
WHERE b.clientId = 1;
```

---

## 📧 Emails (TODO)

Atualmente **não envia emails** em teste. Para ativar:

1. Configurar `SENDGRID_API_KEY` ou `SMTP_*` em `.env.local`
2. Templates estarão em breve em `src/lib/email.ts`

---

## 🐛 Troubleshooting

### "ASAAS_API_KEY não configurado"
✅ Normal em teste - usa modo mockado
- Criar pagamento retorna ID fake
- Webhook não recebe confirmação automática
- Pra testar real: configure `ASAAS_API_KEY`

### "Terapeuta não está verificado"
→ Execute SQL de verificação (vide seção A)

### "Horário não disponível"
→ Volte e configure `Availability` no dashboard do terapeuta

### Webhook não confirma pagamento
→ Em sandbox, confirme pagamento manualmente no painel Asaas:
1. Acesse "Cobranças"
2. Clique na cobrança
3. Confirme pagamento

---

## 📊 Estrutura de Dados

```
Booking (PENDING)
  ├─ Client (autenticado)
  ├─ Therapist (verificado)
  ├─ Service (ativo)
  └─ Payment (criado com status PENDING)
       ├─ amount (preço total)
       ├─ sendaFee (10%)
       └─ professionalAmount (90%)

Após pagamento confirmado:
  ├─ Payment.status → APPROVED
  ├─ Booking.status → CONFIRMED
  └─ Terapeuta vê em /dashboard/therapist/bookings
```

---

## ✅ Checklist de Teste Completo

- [ ] Terapeuta cadastrado e verificado
- [ ] Serviços criados
- [ ] Disponibilidade configurada
- [ ] Cliente cadastrado
- [ ] Exploração funciona (/explore/therapists)
- [ ] Perfil público exibe corretamente
- [ ] Booking flow: Service selector funciona
- [ ] Booking flow: Data/hora carrega slots corretamente
- [ ] Booking flow: Summary mostra info correta
- [ ] Booking flow: Redireciona para Asaas Checkout
- [ ] Pagamento confirmado no Asaas
- [ ] Cliente vê booking em /client/bookings
- [ ] Terapeuta vê booking em /dashboard/therapist/bookings

---

## 🎯 Próximas Features

Após validar fluxo de pagamento:
1. **Email de confirmação** - Enviar após pagamento aprovado
2. **Sistema de reviews** - Cliente avalia após sessão
3. **Rescheduling/Cancelamento** - Com lógica de reembolso
4. **Dashboard de receitas** - Para terapeuta ver ganhos

---

Qualquer dúvida durante os testes, me avise! 🚀

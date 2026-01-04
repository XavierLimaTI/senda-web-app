# Seed Data Documentation - Senda Admin Panel

## 📌 Visão Geral

Este documento descreve os dados de teste (seed) criados para facilitar o desenvolvimento e testes do painel administrativo do Senda.

**Script:** `scripts/seed-admin-data.js`

**Comando:** `node scripts/seed-admin-data.js`

---

## 👥 Usuários Criados

### 1. Admin
- **Email:** admin@senda.app
- **Senha:** Admin123456 *(hashed)*
- **Role:** ADMIN
- **Status:** Email verificado

### 2. Cliente 1 - Maria Silva
- **Email:** cliente1@teste.com
- **Senha:** teste123 *(hashed)*
- **Telefone:** (11) 91234-5678
- **Role:** CLIENT
- **Preferências:**
  - Intenções: relaxamento, equilíbrio energético
  - Terapias preferidas: Reiki, Meditação

### 3. Cliente 2 - João Santos
- **Email:** cliente2@teste.com
- **Senha:** teste123 *(hashed)*
- **Telefone:** (11) 98765-1234
- **Role:** CLIENT
- **Preferências:**
  - Intenções: alívio de dores, bem-estar
  - Terapias preferidas: Acupuntura, Massagem

### 4. Terapeuta 1 - Dra. Ana Oliveira
- **Email:** terapeuta1@teste.com
- **Senha:** teste123 *(hashed)*
- **Telefone:** (11) 98765-4321
- **Role:** THERAPIST
- **Especialidade:** Reiki
- **Licença:** CRT-123456
- **Experiência:** 10 anos
- **Rating:** 4.8/5
- **Status:** Verificado ✅
- **Bio:** Especialista em Reiki com 10 anos de experiência. Formação em técnicas japonesas tradicionais.

### 5. Terapeuta 2 - Dr. Carlos Mendes
- **Email:** terapeuta2@teste.com
- **Senha:** teste123 *(hashed)*
- **Telefone:** (11) 97654-3210
- **Role:** THERAPIST
- **Especialidade:** Acupuntura
- **Licença:** CRT-654321
- **Experiência:** 8 anos
- **Rating:** 4.9/5
- **Status:** Verificado ✅
- **Bio:** Acupunturista certificado com 8 anos de prática. Atendimento personalizado focado em bem-estar integral.

---

## 🧘 Serviços Cadastrados

### Serviço 1: Sessão de Reiki - 60 minutos
- **Terapeuta:** Dra. Ana Oliveira
- **Preço:** R$ 150,00
- **Duração:** 60 minutos
- **Descrição:** Sessão completa de Reiki com harmonização energética e relaxamento profundo.
- **Status:** Ativo

### Serviço 2: Acupuntura Tradicional
- **Terapeuta:** Dr. Carlos Mendes
- **Preço:** R$ 200,00
- **Duração:** 45 minutos
- **Descrição:** Sessão de acupuntura focada em dores crônicas e estresse.
- **Status:** Ativo

---

## 📅 Agendamentos (Bookings)

### Booking 1
- **Cliente:** Maria Silva
- **Terapeuta:** Dra. Ana Oliveira
- **Serviço:** Sessão de Reiki - 60 minutos
- **Data:** 7 dias atrás
- **Duração:** 60 minutos
- **Status:** COMPLETED ✅
- **Notas:** Primeira sessão - expectativa de relaxamento

### Booking 2
- **Cliente:** João Santos
- **Terapeuta:** Dr. Carlos Mendes
- **Serviço:** Acupuntura Tradicional
- **Data:** 5 dias atrás
- **Duração:** 45 minutos
- **Status:** COMPLETED ✅
- **Notas:** Tratamento para dor nas costas

### Booking 3
- **Cliente:** Maria Silva
- **Terapeuta:** Dr. Carlos Mendes
- **Serviço:** Acupuntura Tradicional
- **Data:** 3 dias atrás
- **Duração:** 45 minutos
- **Status:** COMPLETED ✅
- **Notas:** Segunda sessão de acupuntura

---

## 💰 Pagamentos (Payments)

### Payment 1
- **Agendamento:** Booking 1 (Maria Silva → Dra. Ana Oliveira)
- **Cliente:** Maria Silva
- **Valor Total:** R$ 150,00
- **Taxa Senda (10%):** R$ 15,00
- **Valor Profissional:** R$ 135,00
- **Status:** APPROVED ✅
- **Método:** Cartão de Crédito
- **Transaction ID:** TXN-001-2026
- **Stripe Payment Intent:** pi_test_123456
- **Descrição:** Pagamento - Sessão de Reiki com Dra. Ana Oliveira
- **Data:** 7 dias atrás

### Payment 2
- **Agendamento:** Booking 2 (João Santos → Dr. Carlos Mendes)
- **Cliente:** João Santos
- **Valor Total:** R$ 200,00
- **Taxa Senda (10%):** R$ 20,00
- **Valor Profissional:** R$ 180,00
- **Status:** APPROVED ✅
- **Método:** PIX
- **Transaction ID:** TXN-002-2026
- **Stripe Payment Intent:** pi_test_234567
- **Descrição:** Pagamento - Acupuntura com Dr. Carlos Mendes
- **Data:** 5 dias atrás

### Payment 3
- **Agendamento:** Booking 3 (Maria Silva → Dr. Carlos Mendes)
- **Cliente:** Maria Silva
- **Valor Total:** R$ 200,00
- **Taxa Senda (10%):** R$ 20,00
- **Valor Profissional:** R$ 180,00
- **Status:** PENDING ⏳
- **Método:** Cartão de Crédito
- **Transaction ID:** TXN-003-2026
- **Stripe Payment Intent:** *(não gerado ainda)*
- **Descrição:** Pagamento Pendente - Acupuntura com Dr. Carlos Mendes
- **Data:** 3 dias atrás

---

## ⭐ Reviews (Avaliações)

### Review 1
- **Agendamento:** Booking 1
- **Terapeuta:** Dra. Ana Oliveira
- **Cliente:** Maria Silva
- **Rating:** 5/5 ⭐⭐⭐⭐⭐
- **Comentário:** "Experiência incrível! Dra. Ana é muito profissional e atenciosa. Saí da sessão completamente relaxada e com uma energia renovada. Super recomendo!"
- **Status:** Não marcado como problemático
- **Data:** 6 dias atrás

### Review 2
- **Agendamento:** Booking 2
- **Terapeuta:** Dr. Carlos Mendes
- **Cliente:** João Santos
- **Rating:** 4/5 ⭐⭐⭐⭐
- **Comentário:** "Ótimo atendimento. Dr. Carlos é muito experiente e explicou todo o procedimento. Senti melhora nas dores já na primeira sessão."
- **Status:** Não marcado como problemático
- **Data:** 4 dias atrás

---

## 📊 Estatísticas dos Dados

| Categoria | Quantidade |
|-----------|-----------|
| Usuários Totais | 5 |
| - Admins | 1 |
| - Clientes | 2 |
| - Terapeutas | 2 |
| Perfis de Cliente | 2 |
| Perfis de Terapeuta | 2 |
| Serviços Ativos | 2 |
| Agendamentos | 3 |
| - Completados | 3 |
| Pagamentos | 3 |
| - Aprovados | 2 |
| - Pendentes | 1 |
| Reviews | 2 |
| Rating Médio | 4.5/5 |

---

## 🧪 Como Testar com os Dados de Seed

### 1. Testar Painel de Pagamentos (`/dashboard/admin/payments`)

```bash
# 1. Rodar o seed
node scripts/seed-admin-data.js

# 2. Iniciar o dev server
npm run dev

# 3. Logar como admin
# Email: admin@senda.app
# Senha: Admin123456

# 4. Navegar para /dashboard/admin/payments
```

**O que você deve ver:**
- Total de Transações: 3
- Receita Total: R$ 550,00
- Taxa Total Senda: R$ 55,00
- Lista com 3 pagamentos:
  - 2 aprovados (verde)
  - 1 pendente (amarelo)
- Botões de ação:
  - Refund (para pagamentos aprovados)
  - Ver Detalhes

**Teste de Refund:**
1. Clique em "Refund" no Payment 1 (R$ 150,00)
2. Confirme o modal
3. *(Atualmente retorna erro TODO - será implementado com Stripe real no passo 4)*

---

### 2. Testar Painel de Reviews (`/dashboard/admin/reviews`)

**O que você deve ver:**
- Total de Reviews: 2
- Rating Médio: 4.5/5
- Lista com 2 reviews:
  - Review de Maria Silva (5 estrelas)
  - Review de João Santos (4 estrelas)
- Filtros funcionando:
  - Rating mínimo (1-5)
  - Reviews marcados como problemáticos

**Teste de Moderação:**
1. Clique em "Flag" no review de Maria Silva
2. Atualizar página → Review aparece como "Flagged"
3. Filtrar por "Only Flagged" → Mostrar apenas esse review
4. Clicar em "Approve" → Remove flag
5. Clicar em "Delete" → Remove review (com confirmação)

---

### 3. Testar Relatórios (`/dashboard/admin/reports`)

**O que você deve ver:**
- Total Bookings: 3
- Taxa de Conclusão: 100% (3/3 completados)
- Receita Total: R$ 550,00
- Gráfico de Agendamentos por Dia (últimos 30 dias)
- Ranking de Top Terapeutas:
  - Dr. Carlos Mendes: 2 agendamentos
  - Dra. Ana Oliveira: 1 agendamento

---

### 4. Verificar Dados no Prisma Studio

```bash
npx prisma studio
```

**URLs para abrir:**
- http://localhost:5555
- Navegar pelas tabelas:
  - User (5 registros)
  - ClientProfile (2 registros)
  - TherapistProfile (2 registros)
  - Service (2 registros)
  - Booking (3 registros)
  - Payment (3 registros)
  - Review (2 registros)

---

## 🔄 Resetar/Recriar Dados

### Limpar Database Completo
```bash
npx prisma migrate reset
```
*(ATENÇÃO: Remove TODOS os dados)*

### Re-rodar Seed
```bash
node scripts/seed-admin-data.js
```

### Adicionar Mais Dados
Edite o arquivo `scripts/seed-admin-data.js` e:
1. Adicione novos usuários
2. Crie mais agendamentos
3. Adicione mais reviews/pagamentos
4. Execute novamente o script

---

## ✅ Checklist de Validação

Após rodar o seed, confirme que:

- [ ] 5 usuários criados (verificar em Prisma Studio)
- [ ] 2 terapeutas verificados com ratings
- [ ] 2 serviços ativos (R$ 150 e R$ 200)
- [ ] 3 agendamentos completados
- [ ] 3 pagamentos (2 aprovados, 1 pendente)
- [ ] 2 reviews com comentários reais
- [ ] Admin pode acessar `/dashboard/admin`
- [ ] Painel de Payments mostra 3 transações
- [ ] Painel de Reviews mostra 2 avaliações
- [ ] Relatórios mostram gráficos com dados
- [ ] Nenhum erro no console do browser

---

## 🐛 Troubleshooting

### Erro: "User already exists"
O seed usa `upsert()` então pode rodar múltiplas vezes sem erro. Se houver erro, delete manualmente no Prisma Studio.

### Erro: "Foreign key constraint failed"
Execute `npx prisma generate` e tente novamente.

### Pagamentos não aparecem no painel
Verifique:
1. API `/api/admin/payments` retorna dados (abrir DevTools → Network)
2. Query SQL no console do server
3. Status dos pagamentos no Prisma Studio

### Reviews não aparecem
Verifique:
1. API `/api/admin/reviews` retorna dados
2. JOIN entre Review, User, TherapistProfile está correto
3. Campo `flagged` existe na tabela Review

---

**Última atualização:** 03 de Janeiro de 2026

# 📧 Guia: Evitar Emails no Spam

## Problema Atual
Emails enviados pelo SendGrid estão caindo na pasta SPAM porque estamos usando **Single Sender Verification** sem autenticação de domínio.

## Soluções

### 🚀 Solução 1: Domain Authentication (RECOMENDADO)

**Pré-requisito:** Ter um domínio próprio (ex: senda.com.br)

**Passos:**

1. **Login no SendGrid:**
   - https://app.sendgrid.com/

2. **Configurar Domain Authentication:**
   - Settings → Sender Authentication
   - Authenticate Your Domain
   - Escolher provedor de DNS (Registro.br, Cloudflare, etc.)

3. **Adicionar registros DNS:**
   - SendGrid fornecerá 3 registros:
     - **CNAME** para DKIM
     - **CNAME** para domain verification
     - **TXT** para SPF
   
4. **Aguardar verificação:**
   - Pode levar 24-48h para DNS propagar
   - SendGrid validará automaticamente

5. **Atualizar FROM_EMAIL:**
   ```env
   FROM_EMAIL="suporte@senda.com.br"
   ```

**Resultado:** Emails não vão mais para spam, reputação melhora drasticamente.

---

### 🛡️ Solução 2: Melhorar Conteúdo dos Emails

Mesmo em Single Sender, podemos reduzir chance de spam:

#### ❌ Evitar:
- Palavras suspeitas: "grátis", "promoção", "clique aqui", "urgente"
- TEXTO TODO EM MAIÚSCULAS
- Muitos links
- Imagens sem texto alternativo
- Anexos não solicitados

#### ✅ Boas Práticas:
- Assunto claro e profissional
- Texto personalizado com nome do destinatário
- Proporção texto/imagens equilibrada
- Links válidos e HTTPS
- Botão de unsuscribe (não obrigatório em transacionais)

---

### 📊 Solução 3: Monitorar Reputação

**SendGrid Reputation Dashboard:**
- https://app.sendgrid.com/reputation_management

**Métricas importantes:**
- **Bounce Rate:** < 5%
- **Spam Reports:** < 0.1%
- **Engagement:** > 20% (aberturas)

**Se métricas ruins:**
- Limpar lista de emails
- Remover emails inválidos
- Implementar double opt-in

---

### 🔍 Solução 4: Whitelist Manual (Temporário)

**Para cada email de teste (gustavohenriquex, nejusloko):**

1. Abrir email na pasta Spam
2. Clicar **"Não é spam"**
3. **Adicionar remetente aos contatos:**
   - Clique nos 3 pontos
   - "Adicionar [email] aos contatos"

4. **Criar filtro (opcional):**
   ```
   De: sendaterapias.suporte@gmail.com
   Ação: Nunca enviar para spam
   ```

---

## 🎯 Plano de Ação SENDA

### Fase 1: Desenvolvimento (AGORA)
- ✅ Usar Single Sender Verification
- ✅ Marcar emails como "não spam" manualmente
- ✅ Adicionar remetente aos contatos
- ⏳ Melhorar templates (verificar se não têm palavras suspeitas)

### Fase 2: Staging/Pré-Produção
- [ ] Registrar domínio (senda.com.br)
- [ ] Configurar Domain Authentication no SendGrid
- [ ] Testar deliverability com múltiplos provedores (Gmail, Outlook, etc.)

### Fase 3: Produção
- [ ] Migrar FROM_EMAIL para domínio próprio
- [ ] Monitorar métricas de reputação
- [ ] Implementar feedback loops
- [ ] Configurar DMARC policy

---

## 🧪 Teste de Deliverability

Execute este script para testar vários provedores:

```bash
# Editar emails de teste no script
node scripts/test-deliverability.js
```

**Provedores para testar:**
- Gmail (pessoal)
- Outlook/Hotmail
- Yahoo Mail
- ProtonMail
- Email corporativo (se houver)

**Resultado esperado:**
- ✅ **Caixa de entrada:** 80%+ (com domain auth)
- ⚠️ **Spam:** < 20% (sem domain auth)
- ❌ **Bounce:** 0%

---

## 📞 Suporte SendGrid

Se problemas persistirem:
- **Docs:** https://docs.sendgrid.com/ui/account-and-settings/troubleshooting-delays-and-latency
- **Support:** https://support.sendgrid.com/
- **Status:** https://status.sendgrid.com/

---

## ⚡ Ação Imediata

**Execute agora:**

1. **Verifique se email de agendamento foi para spam:**
   - Busque "Senda" ou "Agendamento" na pasta Spam de nejusloko@gmail.com

2. **Marque como não spam:**
   - Abra o email
   - Clique "Não é spam"

3. **Adicione aos contatos:**
   - Isso ajudará futuros emails

4. **Teste novamente:**
   - Faça outro agendamento
   - Verifique se vai para Caixa de Entrada

---

**Última atualização:** 2 de Janeiro de 2026

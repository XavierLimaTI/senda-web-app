# 📋 Documentação Legal - Senda

**Status:** ✅ COMPLETE (Versão 1.0.0)  
**Última Atualização:** 3 de janeiro de 2026  
**Entrada em Vigor:** 10 de janeiro de 2026

---

## 📚 Documentos Disponíveis

### 1. **TERMOS_CONDICOES.md** ⚖️
**Propósito:** Definir direitos e obrigações de usuários, Terapeutas, Espaços e Senda

**Cobre:**
- Aceitação dos termos
- Definições (Usuário, Cliente, Terapeuta, Espaço, Serviço, Trilha)
- Elegibilidade e conta de usuário
- Descrição dos serviços
- Responsabilidades de cada parte
- Limitações de responsabilidade
- Indenizações
- Rescisão de conta
- Modificações aos termos
- Lei aplicável e jurisdição (Brasil)

**Leis Aplicáveis:**
- Lei 14.181/2021 (Lei dos Consumidores)
- Lei 13.709/2018 (LGPD)
- Código de Defesa do Consumidor (Lei 8.078/1990)

---

### 2. **POLITICA_PRIVACIDADE.md** 🔒
**Propósito:** Explicar coleta, uso, compartilhamento e proteção de dados pessoais (Art. 14 LGPD)

**Cobre:**
- Dados coletados (perfil, transação, comportamento)
- Base legal para coleta (consentimento, contrato, interesse legítimo)
- Uso dos dados (provisão de serviço, marketing, análise)
- Compartilhamento com terceiros (processadores, parceiros)
- Retenção de dados
- Direitos do titular (acesso, correção, exclusão, portabilidade)
- Segurança e criptografia
- Cookies e tracking
- Contato DPO (Data Protection Officer)
- Modificações e versioning

**Conformidade:**
- ✅ LGPD Art. 14 (Política de Privacidade obrigatória)
- ✅ Direitos do titular (Art. 18)
- ✅ Transparência sobre processamento
- ✅ Opção de consentimento

---

### 3. **POLITICA_CANCELAMENTO.md** ↩️
**Propósito:** Definir regras claras e humanizadas para cancelamento e reembolso

**Cobre:**
- Princípios fundamentais (justiça, transparência, humanização)
- Política para Clientes (cancelamento com 24h+ de antecedência = 100% reembolso)
- Política para Terapeutas (compensação por cancelamento em últimos 24h)
- Botão de Emergência (terapeuta pode abonar taxa humanitariamente)
- Cancelamentos por Senda (reembolso total + voucher)
- Casos especiais (doença, morte, força maior)
- Processamento de reembolsos (5 dias úteis)
- Histórico de mudanças

**Diferenciais Senda:**
- 🎯 Reembolso 100% se cancelar com 24h de antecedência (humanizado)
- 💚 Terapeuta pode desculpar taxa por emergência (compaixão)
- 📊 Transparência total sobre taxas e processamento

---

## 📋 Conformidade Legal

### LGPD (Lei 13.709/2018)
- ✅ Art. 14: Política de Privacidade (POLITICA_PRIVACIDADE.md)
- ✅ Art. 18: Direitos do titular (acesso, correção, exclusão)
- ✅ Art. 9: Consentimento para dados sensíveis (documentos, CPF)
- ✅ Criptografia de dados sensíveis em trânsito e repouso

### Lei dos Consumidores (14.181/2021)
- ✅ Transparência sobre taxas e comissões (TERMOS_CONDICOES.md)
- ✅ Direito de arrependimento em 7 dias para alguns serviços
- ✅ Proibição de práticas abusivas

### Código de Defesa do Consumidor (8.078/1990)
- ✅ Proteção do consumidor (Cliente)
- ✅ Responsabilidade por intermediação (TERMOS_CONDICOES.md)
- ✅ Transparência de preços (POLITICA_CANCELAMENTO.md)

---

## 🔄 Versioning & Atualizações

**Versão Atual:** 1.0.0  
**Próximas Mudanças:** Será rastreado em cada documento

**Quando Atualizar:**
- Mudanças em leis aplicáveis
- Mudanças no modelo de negócio
- Feedback de usuários
- Solicitações de conformidade

**Processo de Atualização:**
1. Crie nova versão em markdown (ex: 1.0.1)
2. Atualize "Última atualização" e "Entrada em vigor"
3. Registre mudanças em "Histórico de Versões" (fim do documento)
4. Notifique usuários existentes
5. Solicite re-aceitação dos novos termos

---

## ⚙️ Integração com Plataforma

### Em `/app/legal/`
- `/app/legal/terms` → Renderiza TERMOS_CONDICOES.md
- `/app/legal/privacy` → Renderiza POLITICA_PRIVACIDADE.md
- `/app/legal/cancellation` → Renderiza POLITICA_CANCELAMENTO.md

### No Signup
- Checkbox: "Aceito os Termos de Serviço"
- Checkbox: "Li a Política de Privacidade"
- Checkbox: "Entendo a Política de Cancelamento"
- Campo `acceptedTermsAt`, `acceptedTermsVersion` na DB

### Email de Boas-vindas
Incluir links para:
- Termos Completos
- Política de Privacidade
- Central de Ajuda

---

## 📞 Contato Legal

**Controlador de Dados (LGPD):**
- Email: privacy@senda.app
- Endereço: [Será preenchido com dados reais]

**DPO (Data Protection Officer):**
- Responsável por conformidade LGPD
- Email: dpo@senda.app

---

## ✅ Checklist: Antes de Go-Live

- [ ] Revisar TERMOS_CONDICOES.md com advogado
- [ ] Revisar POLITICA_PRIVACIDADE.md com advogado
- [ ] Revisar POLITICA_CANCELAMENTO.md com advogado
- [ ] Testar fluxo de aceitação de termos no signup
- [ ] Configurar email privacidade@senda.app
- [ ] Configurar DPO para LGPD compliance
- [ ] Publicar links em `/app/legal/*`
- [ ] Testar links de termos em emails
- [ ] Backup de versões anteriores (histórico)
- [ ] Plano de comunicação para mudanças futuras

---

**Nota:** Estes documentos foram criados conforme leis brasileiras (LGPD, Lei dos Consumidores, CDC). Recomenda-se revisão por advogado especializado antes de lançamento em produção.

**Última Revisão Técnica:** 3 de janeiro de 2026

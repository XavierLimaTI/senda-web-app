# 💳 Termos de Pagamento - Plataforma Senda

**Última atualização:** 3 de janeiro de 2026  
**Versão:** 1.0.0  
**Status:** Approved

---

## 📋 Resumo Executivo

Este documento estabelece as condições comerciais e financeiras da Plataforma Senda, incluindo:
- Modelo de assinatura (planos FREE/PRO/PREMIUM)
- Taxas de transação por sessão/locação
- Split automático de pagamentos
- Processamento via gateway Asaas
- Política de repasse aos profissionais

**Princípio:** Transparência total - você sabe exatamente quanto paga e recebe.

---

## 1. Modelo de Precificação

### 1.1. Filosofia do Modelo

**1.1.1.** A Senda utiliza modelo **subscription-based** (assinatura mensal) combinado com **taxa fixa por transação**.

**1.1.2. Por que NÃO cobramos percentual?**
- ❌ Dupla cobrança (assinatura + %) é injusta
- ❌ Modelo percentual cria desincentivo ("quanto mais trabalho, mais pago")
- ✅ Taxa fixa é previsível e transparente
- ✅ Quanto mais você trabalha, menor sua taxa efetiva

**1.1.3. Comparação com concorrentes:**

| Plataforma         | Modelo                  | Terapeuta recebe (sessão R$ 150)* |
|--------------------|-------------------------|-----------------------------------|
| Concorrente A      | 15% comissão            | R$ 127,50 (-R$ 22,50)             |
| Concorrente B      | 20% comissão            | R$ 120,00 (-R$ 30,00)             |
| **Senda PRO**      | R$ 29/mês + R$ 2/sessão | R$ 148,00 (-R$ 2,00)              |
| **Senda PREMIUM**  | R$ 79/mês + R$ 0/sessão | R$ 150,00 (zero taxa!)            |

*Considerando gateway pago pelo cliente

---

## 2. Planos de Assinatura

### 2.1. Planos para Terapeutas (THERAPIST)

| Plano        | Mensalidade | Taxa/Sessão | Limite Sessões | Analytics | Prioridade Busca | Destaque Homepage |
|--------------|-------------|-------------|----------------|-----------|------------------|-------------------|
| **FREE**     | R$ 0        | R$ 5,00     | 5/mês          | ❌        | ❌               | ❌                |
| **PRO**      | R$ 29       | R$ 2,00     | Ilimitadas     | ✅        | ✅               | ❌                |
| **PREMIUM**  | R$ 79       | R$ 0,00     | Ilimitadas     | ✅✅      | ✅✅             | ✅                |

**Detalhes completos:** Ver [Modelo de Precificação](../01_BUSINESS/PRICING_MODEL.md)

### 2.2. Planos para Espaços Terapêuticos (SPACE)

| Plano           | Mensalidade | Taxa/Locação | Salas        | Vendedores  |
|-----------------|-------------|--------------|--------------|-------------|
| **SPACE FREE**  | R$ 0        | R$ 10,00     | 1 sala       | 1 vendedor  |
| **SPACE PRO**   | R$ 99       | R$ 5,00      | 5 salas      | 3 vendedores|
| **SPACE PREMIUM**| R$ 249     | R$ 0,00      | Ilimitadas   | Ilimitados  |

### 2.3. Planos para Clientes (CLIENT)

| Plano               | Mensalidade | Benefícios                                    |
|---------------------|-------------|-----------------------------------------------|
| **Cliente FREE**    | R$ 0        | Busca, agendamento, pagamento                 |
| **Cliente PREMIUM** | R$ 29       | Gateway grátis + Trilhas ilimitadas + Descontos|

---

## 3. Cobrança de Assinaturas

### 3.1. Ciclo de Cobrança

**3.1.1. Data de vencimento:**
- Dia do mês em que você ativou o plano (ex: ativou dia 15 → todo dia 15)
- Renovação automática mensal

**3.1.2. Método de pagamento:**
- Cartão de crédito (preferencial - renovação automática)
- PIX (manual - você recebe cobrança todo mês)
- Boleto (manual - vencimento em 3 dias úteis)

**3.1.3. Falha no pagamento:**
- 1ª tentativa (dia do vencimento): Se falhar, nova tentativa em 3 dias
- 2ª tentativa: Nova tentativa em 7 dias
- Se 2ª falhar: Plano downgrade automático para FREE (sem exclusão de dados)
- Notificação por email em cada tentativa

### 3.2. Cobrança Proporcional (Pro-rata)

**3.2.1. Upgrade durante o mês:**
- Ex: Você tem PRO (R$ 29), faz upgrade para PREMIUM (R$ 79) no dia 15
- Dias restantes: 15 de 30 = 50% do mês
- Cobrança adicional: (R$ 79 - R$ 29) × 50% = R$ 25
- Próximo vencimento: R$ 79 integral

**3.2.2. Downgrade durante o mês:**
- Efeito no **próximo ciclo** (você continua usando plano atual até vencimento)
- Não há cobrança adicional ou reembolso parcial

### 3.3. Cancelamento de Assinatura

**3.3.1. Pode cancelar a qualquer momento:**
- Acesse: Configurações > Planos e Assinaturas > Cancelar
- Confirmação: "Tem certeza? Você perderá [lista de benefícios]"

**3.3.2. Efeito:**
- Acesso mantido até fim do período pago (não há reembolso proporcional)
- Ex: Cancela dia 10, vencimento dia 15 → usa até dia 15

**3.3.3. Dados preservados:**
- Perfil, histórico, avaliações **arquivados por 90 dias**
- Pode reativar assinatura a qualquer momento (sem perda de dados)
- Após 90 dias: Dados anonimizados (LGPD)

**3.3.4. Sem multa rescisória:**
- Não cobramos taxa de cancelamento (CDC Art. 51, XI)

---

## 4. Gateway de Pagamento (Asaas)

### 4.1. Processador de Pagamentos

**4.1.1.** Utilizamos **Asaas** (https://www.asaas.com) como gateway de pagamento.

**4.1.2. Por que Asaas?**
- ✅ Regulamentado pelo Banco Central
- ✅ Certificação PCI-DSS (segurança de dados de cartão)
- ✅ Split automático (repasse para múltiplos destinatários)
- ✅ Taxas competitivas

**4.1.3. Responsabilidade:**
- Senda **não armazena** dados de cartão (armazenados criptografados pelo Asaas)
- Problemas com cobrança: Contate Asaas (suporte@asaas.com) ou nosso suporte

### 4.2. Taxas do Gateway (Pagas pelo Cliente)

**4.2.1. Cliente paga separadamente:**

| Método          | Taxa Asaas                | Exemplo (sessão R$ 150) |
|-----------------|---------------------------|-------------------------|
| **Cartão**      | 3,99% + R$ 0,40          | R$ 150 + R$ 4,39 = R$ 154,39 |
| **PIX**         | R$ 0,99 (fixo)            | R$ 150 + R$ 0,99 = R$ 150,99 |
| **Boleto**      | R$ 1,99 (fixo)            | R$ 150 + R$ 1,99 = R$ 151,99 |

**4.2.2. Transparência no Checkout:**
```
Sessão de Massagem Terapêutica - 60min    R$ 150,00
Taxa de processamento Asaas (cartão)      R$   4,39
────────────────────────────────────────────────────
TOTAL A PAGAR                             R$ 154,39
```

**4.2.3. Cliente PREMIUM:**
- **Gateway grátis:** Senda absorve as taxas Asaas (economia de R$ 4-5/sessão)
- Checkout simplificado: "Total: R$ 150,00 (processamento gratuito)"

### 4.3. Segurança de Dados

**4.3.1. Tokenização:**
- Dados de cartão são convertidos em token único (não reversível)
- Asaas armazena criptografado (AES-256)
- Senda só vê: últimos 4 dígitos + bandeira (ex: "•••• 1234 Visa")

**4.3.2. 3D Secure (quando aplicável):**
- Autenticação adicional para cartões internacionais
- SMS/app do banco para confirmar compra

---

## 5. Taxas de Transação (por Sessão/Locação)

### 5.1. Como Funciona

**5.1.1.** Toda vez que uma sessão/locação é processada:
- Cliente paga: Valor da sessão + Taxa gateway
- **Sistema faz split automático:**
  - Profissional/Espaço recebe: Valor da sessão - Taxa Senda
  - Senda recebe: Taxa conforme plano (R$ 0-5 para terapeutas, R$ 0-10 para espaços)

**5.1.2. Exemplo (Terapeuta PRO - sessão R$ 150):**
```
Cliente paga no cartão:
  Sessão: R$ 150,00
  Gateway (Asaas): R$ 4,39
  TOTAL: R$ 154,39

Split automático:
  → Asaas: R$ 4,39 (processamento)
  → Senda: R$ 2,00 (taxa plano PRO)
  → Terapeuta: R$ 148,00

Terapeuta recebe líquido: R$ 148,00 (em D+1 após sessão)
```

**5.1.3. Exemplo (Terapeuta PREMIUM - sessão R$ 150):**
```
Cliente paga no cartão:
  Sessão: R$ 150,00
  Gateway (Asaas): R$ 4,39
  TOTAL: R$ 154,39

Split automático:
  → Asaas: R$ 4,39 (processamento)
  → Senda: R$ 0,00 (plano PREMIUM = taxa ZERO)
  → Terapeuta: R$ 150,00

Terapeuta recebe líquido: R$ 150,00 (100% do valor da sessão!)
```

### 5.2. Taxas por Plano

**Terapeutas:**
- FREE: R$ 5,00/sessão
- PRO: R$ 2,00/sessão
- PREMIUM: R$ 0,00/sessão (zero!)

**Espaços:**
- SPACE FREE: R$ 10,00/locação
- SPACE PRO: R$ 5,00/locação
- SPACE PREMIUM: R$ 0,00/locação

---

## 6. Repasse aos Profissionais

### 6.1. Quando Ocorre o Repasse

**6.1.1. Regra de segurança (anti-fraude):**
- Pagamento liberado em **D+1** (dia útil seguinte) após **confirmação da sessão realizada**

**6.1.2. Confirmação de realização:**
- **Opção A:** Cliente marca "Sessão realizada" no app (imediatamente após)
- **Opção B:** Sistema confirma automaticamente 2h após horário agendado (se cliente não contestar)
- **Opção C:** Terapeuta marca manualmente "Sessão realizada"

**6.1.3. Timeline exemplo:**
```
Segunda 10h: Sessão realizada
Segunda 12h: Cliente confirma no app "Sessão realizada"
Terça 10h: Pagamento disponível na sua conta Asaas
Quarta: Transferência para sua conta bancária (se configurou saque automático)
```

**6.1.4. Locação de salas (Espaços):**
- **Pagamento imediato** (espaço físico já disponibilizado = serviço prestado)
- Sem período de espera D+1

### 6.2. Conta de Recebimento (Asaas)

**6.2.1. Obrigatório:**
- Terapeuta/Espaço deve criar conta no Asaas (gratuito)
- Vincular conta bancária (Banco, Agência, Conta, CPF/CNPJ)
- Validação: Asaas faz depósito de R$ 0,01 para confirmar

**6.2.2. Saque:**
- **Automático:** Configure transferência automática (todo valor > R$ 50 vai para banco em D+1)
- **Manual:** Solicite saque quando quiser (mínimo R$ 10)
- **Taxa de saque:** ZERO (Asaas não cobra para contas correntes)

**6.2.3. Taxas Asaas (para profissionais):**
- Transferência DOC/TED: R$ 0 (grátis)
- Transferência PIX: R$ 0 (grátis)

---

## 7. Nota Fiscal e Impostos

### 7.1. Emissão de Nota Fiscal

**7.1.1. Quem emite:**
- **Terapeuta/Espaço** deve emitir nota fiscal para o **cliente** (obrigação legal)
- Valores: Corresponde ao valor da sessão/locação (NÃO inclui taxa Senda)

**7.1.2. Senda emite:**
- Nota fiscal da **assinatura mensal** (para terapeuta/espaço)
- Nota fiscal da **taxa de transação** (separada, mensal consolidada)

**7.1.3. Facilitação (futuro):**
- Integração com emissores de NF-e (ex: Focus NFe, Nota Fiscal Carioca)
- Emissão automática via Plataforma (em desenvolvimento)

### 7.2. Responsabilidade Tributária

**7.2.1. Terapeutas/Espaços são profissionais autônomos:**
- **Não há vínculo empregatício** com a Senda (CLT Art. 3º)
- Você é responsável por:
  - ✅ Imposto de Renda (Carnê-Leão ou MEI/Simples Nacional)
  - ✅ ISS (Imposto Sobre Serviços) - alíquota varia por município (2-5%)
  - ✅ INSS (contribuição previdenciária)

**7.2.2. Modelos de tributação recomendados:**
- **MEI (Microempreendedor Individual):** Até R$ 81k/ano (R$ 67/mês fixo)
- **Simples Nacional:** Acima de R$ 81k/ano (alíquota ~6-15% dependendo faturamento)
- **Autônomo (Carnê-Leão):** Se não quiser abrir MEI (desconta 15-27,5% IR mensal)

**7.2.3. Recomendação:**
- Consulte contador especializado em profissionais liberais
- Senda **não fornece consultoria tributária** (apenas informamos valores pagos anualmente para IR)

### 7.3. Informe de Rendimentos (Anual)

**7.3.1.** Todo janeiro, disponibilizamos:
- **Informe de Rendimentos Senda:** Total pago a você no ano anterior
- **Detalhamento mensal:** Sessões, valores brutos, taxas, líquido
- **Download:** PDF (Configurações > Fiscal > Informe de Rendimentos 2025)

**7.3.2. Uso:**
- Declarar IR (campo "Rendimentos de Pessoa Jurídica" ou "Carnê-Leão")
- Entregar para contador

---

## 8. Estornos e Contestações

### 8.1. Estorno por Cancelamento

**Ver:** [Política de Cancelamento](POLITICA_CANCELAMENTO.md)

**Resumo:**
- Cancelamento ≥ 24h: Estorno 100%
- Cancelamento < 24h: Estorno 50% (profissional recebe 50%)
- No-show cliente: Estorno 0% (profissional recebe 100%)

### 8.2. Chargeback (Contestação de Cartão)

**8.2.1. O que é:**
- Cliente contesta cobrança diretamente com operadora do cartão
- Banco/operadora estorna valor automaticamente (antes de investigar)

**8.2.2. Processo:**
- Asaas notifica Senda sobre chargeback
- Senda notifica profissional: "Cliente contestou pagamento de sessão [data]"
- **Prazo para defesa:** 7 dias (enviar provas: confirmação de presença, mensagens, etc.)
- Senda envia defesa para Asaas → Operadora analisa (15-45 dias)

**8.2.3. Resultado:**
- **Defesa aceita:** Valor devolvido ao profissional
- **Defesa negada:** Profissional perde o valor (prejuízo)

**8.2.4. Proteção:**
- Sistema de confirmação de presença reduz chargebacks
- Avaliações mútuas desencorajam fraude

### 8.3. Taxa de Chargeback

**8.3.1.** Se profissional tiver > 1% de chargeback (taxa alta):
- Investigação de fraude (pode ser cliente mal-intencionado)
- Possível suspensão temporária até regularização

---

## 9. Promoções e Descontos

### 9.1. Cupons de Desconto (Clientes)

**9.1.1. Tipos:**
- Cupom fixo: "R$ 20 de desconto na primeira sessão"
- Cupom percentual: "10% off em qualquer terapeuta"
- Cupom frete grátis: "Gateway Asaas grátis nesta compra"

**9.1.2. Como usar:**
- No checkout: Campo "Cupom de desconto"
- Desconto aplicado sobre valor da sessão (NÃO sobre taxa gateway)

**9.1.3. Quem paga o desconto:**
- **Senda absorve:** Cupons de boas-vindas, marketing
- **Terapeuta oferece:** Pode criar cupons próprios (desconto sai do seu valor)

### 9.2. Promoções de Profissionais

**9.2.1.** Terapeutas/Espaços podem criar promoções:
- "Happy Hour: 30% off terças e quintas 14h-16h"
- "Pacote 5 sessões: R$ 600 (em vez de R$ 750)"
- "Primeira sessão grátis" (você não recebe, mas ganha cliente)

**9.2.2. Configuração:**
- Dashboard > Promoções > Nova Promoção
- Define: Desconto, dias/horários, duração da campanha

### 9.3. Programa de Indicação (Futuro)

**Planejado para Q2 2026:**
- Cliente indica amigo → Ambos ganham R$ 20 crédito
- Terapeuta indica terapeuta → Ambos ganham 1 mês 50% off assinatura

---

## 10. Pagamentos Internacionais

### 10.1. Clientes Estrangeiros

**10.1.1. Aceitamos:**
- Cartões internacionais (Visa, Mastercard, Amex)
- **Não aceitamos:** PayPal, transferências internacionais

**10.1.2. Conversão cambial:**
- Cobrado em **Reais (BRL)** - conversão feita pela operadora do cartão
- IOF adicional: 6,38% (imposto federal brasileiro sobre transações internacionais)

### 10.2. Profissionais no Exterior

**10.2.1. Atualmente:**
- Plataforma opera apenas no Brasil
- Profissionais devem ter CPF/CNPJ brasileiro + conta bancária no Brasil

**10.2.2. Expansão futura:**
- América Latina prevista para 2027 (Argentina, Chile, Colômbia)

---

## 11. Limite de Transações e Segurança

### 11.1. Limites de Pagamento

**Cliente:**
- Máximo por transação: R$ 1.000 (sessão individual)
- Máximo por mês: R$ 10.000 (soma de todas as sessões)
- Acima: Contate suporte para liberar

**Profissional:**
- Máximo saque por dia: R$ 10.000
- Sem limite mensal (desde que valores legítimos)

### 11.2. Detecção de Fraude

**11.2.1. Monitoramos:**
- Múltiplos cartões falhando (possível teste de cartão roubado)
- Agendamentos em massa + cancelamentos (abuso)
- Padrão suspeito de chargeback

**11.2.2. Medidas:**
- Suspensão temporária de conta suspeita (análise em 24h)
- Notificação ao titular (email + SMS)
- Possível solicitação de documentos adicionais

---

## 12. Alterações de Preço

### 12.1. Reajuste de Planos

**12.1.1.** Podemos alterar valores de assinaturas mensais mediante:
- Notificação prévia de **30 dias** por email
- Justificativa (inflação, custos operacionais)

**12.1.2. Seu direito:**
- **Cancelar assinatura** se não concordar com novo preço (sem multa)
- **Manter preço antigo por 6 meses** (carência para clientes fiéis)

**12.1.3. Reajuste de taxas de transação:**
- Mesmo processo (30 dias de antecedência)

### 12.2. Grandfathering (Clientes Antigos)

**12.2.1.** Usuários que assinaram **antes de aumento de preço** mantêm valor antigo por:
- Mínimo 6 meses
- Ou até cancelarem/mudarem de plano

**Exemplo:**
```
Plano PRO: R$ 29/mês (preço atual)
Aumento: R$ 29 → R$ 39 (anunciado em março 2026)
Você assinou em janeiro 2026 (antes do aumento):
  → Paga R$ 29 até setembro 2026 (6 meses de proteção)
  → A partir de outubro: R$ 39 (novo preço)
```

---

## 13. Questões Fiscais Específicas

### 13.1. ISS (Imposto Sobre Serviços)

**13.1.1. Quem paga:**
- **Terapeuta/Espaço:** ISS sobre valor da sessão/locação
- **Senda:** ISS sobre assinatura + taxa de transação

**13.1.2. Alíquota:**
- Varia por município (2% a 5%)
- Consulte prefeitura da sua cidade

**13.1.3. Local de recolhimento:**
- **Regra geral:** Município onde o serviço foi prestado (local da sessão)
- **Exceção:** Sessões virtuais = município do prestador

### 13.2. Retenção de Impostos (IRRF, PIS, COFINS)

**13.2.1. Não aplicável:**
- Senda **não retém** impostos de terapeutas/espaços
- Você recebe valor bruto (menos apenas taxa Senda)

**13.2.2. Você é responsável por:**
- Calcular e pagar seus tributos (MEI, Simples, Carnê-Leão)

---

## 14. Transparência de Custos (Exemplo Completo)

### 14.1. Cenário: Terapeuta PRO - 20 Sessões/Mês

**Receita bruta (20 × R$ 150):** R$ 3.000

**Custos:**
- Assinatura PRO: R$ 29
- Taxa Senda (20 × R$ 2): R$ 40
- Gateway Asaas: R$ 0 (cliente pagou)
- **Total custos:** R$ 69

**Receita líquida:** R$ 2.931 (97,7% da receita bruta)

**Comparação:**
- Concorrente 15%: Receita líquida = R$ 2.422 (80,7%)
- **Diferença:** + R$ 509/mês = **+ R$ 6.108/ano** 💰

---

## 15. Resolução de Disputas Financeiras

### 15.1. Discrepâncias de Pagamento

**15.1.1. Casos comuns:**
- Valor recebido menor que esperado
- Sessão não creditada
- Estorno indevido

**15.1.2. Como reportar:**
- Email: financeiro@senda.app
- Assunto: "Disputa Pagamento - Sessão [código]"
- Inclua: Prints, comprovantes, detalhes

**15.1.3. Prazo de análise:** 5 dias úteis

### 15.2. Mediação

**15.2.1.** Conflitos sobre valores (cliente vs. profissional):
- Senda pode mediar (acesso aos logs de transação)
- Decisão baseada em evidências técnicas

---

## 16. Contato Financeiro

**Dúvidas sobre pagamentos, repasse ou nota fiscal:**

📧 **Email:** financeiro@senda.app  
💬 **Chat:** Disponível no dashboard (9h-18h, seg-sex)  
📞 **Telefone:** [Número de suporte financeiro]

**Prazo de resposta:** Até 24 horas (dias úteis)

---

## 17. Aceitação

Ao ativar um plano de assinatura ou processar transações através da Plataforma Senda, você declara ter:

- ✅ Lido e compreendido estes Termos de Pagamento
- ✅ Concordado com o modelo de assinatura + taxa fixa
- ✅ Reconhecido que cliente paga gateway separadamente
- ✅ Entendido as regras de repasse (D+1 após confirmação)
- ✅ Assumido responsabilidade tributária (IR, ISS, INSS)

---

## 📝 Histórico de Versões

| Versão | Data       | Mudanças                                      |
|--------|------------|-----------------------------------------------|
| 1.0.0  | 2026-01-03 | Versão inicial - modelo assinatura + split   |

---

**Última revisão por:** Equipe Financeira Senda em 3 de janeiro de 2026

---

**Senda - Transparência financeira é nosso compromisso. Você merece saber exatamente quanto ganha. 💰🌿**

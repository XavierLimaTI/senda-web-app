# 📘 Padrões de Documentação Senda

**Última atualização:** 3 de janeiro de 2026  
**Versão:** 1.0.0

---

## 🎯 Objetivo

Estabelecer padrões consistentes para toda documentação técnica, estratégica e operacional do projeto Senda, garantindo clareza, profissionalismo e fácil navegação.

---

## 📂 Estrutura de Diretórios

```
docs/
├── README.md                        # Índice master (navigation hub)
├── DOCUMENTATION_STANDARDS.md       # Este arquivo (meta-documentação)
│
├── 01_BUSINESS/                     # Estratégia e modelo de negócio
│   ├── BUSINESS_MODEL.md           # Modelo tri-face (B2B2C)
│   ├── PRICING_MODEL.md            # Assinatura + taxas fixas
│   ├── SCALABILITY_VISION.md       # Escalabilidade física + digital
│   └── INVESTOR_PITCH.md           # Pitch deck textual
│
├── 02_PRODUCT/                      # Produto e features
│   ├── FEATURE_ROADMAP.md          # Roadmap de funcionalidades
│   ├── SPRINT_PLANS/               # Planejamento de sprints
│   │   ├── SPRINT2_PLAN.md
│   │   ├── SPRINT3_PLAN.md
│   │   └── ...
│   └── USER_STORIES/               # Stories por perfil
│       ├── CLIENT_STORIES.md
│       ├── THERAPIST_STORIES.md
│       └── SPACE_STORIES.md
│
├── 03_TECHNICAL/                    # Arquitetura e implementação
│   ├── ARCHITECTURE.md             # Visão geral da arquitetura
│   ├── DATABASE_SCHEMA.md          # Modelos Prisma explicados
│   ├── API_REFERENCE.md            # Endpoints e contratos
│   └── DEPLOYMENT.md               # Deploy e infra
│
├── 04_LEGAL/                        # Documentos legais (LGPD)
│   ├── TERMOS_DE_USO.md
│   ├── POLITICA_PRIVACIDADE.md
│   ├── POLITICA_CANCELAMENTO.md
│   └── TERMOS_PAGAMENTO.md
│
├── 05_SUPPORT/                      # Suporte e FAQs
│   ├── FAQ_GERAL.md
│   ├── FAQ_TAXAS_COBRANCAS.md
│   ├── FAQ_TERAPEUTAS.md
│   ├── FAQ_ESPACOS.md
│   └── TROUBLESHOOTING.md
│
└── 06_BRAND/                        # Identidade de marca
    ├── BRAND_IDENTITY.md           # Cores, tipografia, tom de voz
    ├── UX_WRITING_GUIDE.md         # Guia de redação UX
    └── DESIGN_SYSTEM.md            # Componentes e padrões UI
```

---

## ✍️ Padrões de Escrita

### Estrutura de Documento

Todo documento deve começar com:

```markdown
# 🔖 [Título do Documento]

**Última atualização:** [Data]  
**Versão:** [Semver: 1.0.0]  
**Autor(es):** [Nome(s)]  
**Status:** [Draft | Review | Approved | Deprecated]

---

## 📋 Resumo Executivo

[2-3 parágrafos descrevendo o propósito e conteúdo principal]

---

## 🎯 Objetivos

- [Lista clara dos objetivos do documento]

---

## 📖 Conteúdo

[Corpo principal organizado em seções numeradas]

---

## 📊 Anexos / Referências

[Links para documentos relacionados, fontes externas, etc.]

---

**Última revisão por:** [Nome] em [Data]
```

### Convenções de Formatação

1. **Emojis:** Use 1 emoji por título principal para facilitar scan visual
   - 🎯 Objetivos, metas
   - 📊 Dados, métricas, análises
   - 🚀 Lançamentos, features novas
   - ⚠️ Avisos, cuidados
   - ✅ Aprovado, concluído
   - 🔄 Em progresso
   - 📘 Documentação, referência
   - 💡 Ideias, sugestões
   - 🏗️ Arquitetura, estrutura

2. **Títulos:**
   - H1 (`#`) - Título do documento (apenas 1 por arquivo)
   - H2 (`##`) - Seções principais
   - H3 (`###`) - Subseções
   - H4 (`####`) - Detalhes (evitar H5/H6)

3. **Listas:**
   - Use `*` ou `-` para listas não ordenadas
   - Use `1.`, `2.` para listas ordenadas
   - Indente sublistas com 2 espaços

4. **Código:**
   - Inline: \`código\`
   - Blocos: \`\`\`typescript (especifique linguagem)

5. **Tabelas:**
   - Use Markdown tables para comparações
   - Alinhe colunas numéricas à direita
   - Máximo 5 colunas (legibilidade)

6. **Links:**
   - Internos: `[Texto](../02_PRODUCT/FEATURE_ROADMAP.md)`
   - Externos: `[Texto](https://url) 🔗`

---

## 🎨 Tom de Voz

### Para Documentos Técnicos
- **Clara e direta:** Evite ambiguidades
- **Imperativa:** "Execute o comando..." (não "Você pode executar...")
- **Exemplos concretos:** Sempre que possível, mostre código/comandos reais

### Para Documentos de Negócio
- **Acolhedora mas profissional:** Mesma voz da marca Senda
- **Data-driven:** Sempre respalde afirmações com dados
- **Ação-orientada:** Termine seções com "Próximos Passos"

### Para FAQs e Suporte
- **Empática:** Reconheça a dúvida/problema do usuário
- **Solução-focada:** Resposta direta antes de explicação
- **Formato:** Pergunta em H3, resposta em parágrafo seguido de exemplo/código

---

## 🔄 Versionamento

- **Major (1.0.0 → 2.0.0):** Mudanças estruturais, remoção de seções
- **Minor (1.0.0 → 1.1.0):** Adição de novas seções, expansões significativas
- **Patch (1.0.0 → 1.0.1):** Correções, clarificações, typos

Adicione entrada no topo do documento:
```markdown
## 📝 Histórico de Versões

| Versão | Data       | Autor | Mudanças                          |
|--------|------------|-------|-----------------------------------|
| 1.0.1  | 2026-01-03 | Time  | Correção de typos na seção 3      |
| 1.0.0  | 2026-01-02 | Time  | Versão inicial aprovada           |
```

---

## ✅ Checklist de Qualidade

Antes de marcar documento como "Approved":

- [ ] Metadados preenchidos (data, versão, autor)
- [ ] Resumo executivo presente
- [ ] Objetivos claramente listados
- [ ] Seções numeradas logicamente
- [ ] Links internos funcionando
- [ ] Código/comandos testados
- [ ] Revisão ortográfica (pt-BR)
- [ ] Formatação consistente (emojis, títulos)
- [ ] Referências cruzadas corretas

---

## 🚫 Anti-Padrões (Evitar)

❌ **Documentos monolíticos:** > 3000 palavras → divida em seções  
❌ **Jargão excessivo:** Prefira termos simples  
❌ **Informação desatualizada:** Marque status "Deprecated" se obsoleto  
❌ **Links quebrados:** Sempre teste links antes de commit  
❌ **Comandos sem contexto:** Sempre explique O QUE e POR QUE do comando

---

## 📞 Contato

Dúvidas sobre os padrões? Abra issue no repositório ou contate o time de documentação.

---

**Última revisão por:** Sistema em 3 de janeiro de 2026

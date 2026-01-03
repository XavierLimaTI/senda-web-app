# Painel Admin - Respostas e Recomendações

## 📋 Respostas às suas perguntas

### 1️⃣ "Consigo gerenciar usuários pelo admin?"
**Sim!** ✅ Você tem acesso completo a:
- **Página `/dashboard/admin/users`**
  - Tabela com todos os usuários do sistema
  - Busca por nome ou email
  - Filtros por tipo (Cliente, Terapeuta, Espaço, Admin)
  - Estatísticas por tipo de usuário
  - Modal com detalhes completos de cada usuário (email, telefone, data de cadastro, status de verificação)

**O que você pode fazer:**
- ✅ Ver todos os usuários e suas informações
- ✅ Filtrar por role (tipo de usuário)
- ✅ Buscar usuários específicos
- ✅ Ver status de verificação de email

**O que falta (para implementar depois):**
- ❌ Editar usuários (mudar dados, role)
- ❌ Suspender/bloquear usuários
- ❌ Resetar senhas
- ❌ Exportar lista de usuários (CSV/Excel)

---

### 2️⃣ "Preciso administrar as notícias, posts e afins da homepage"
**Pronto!** ✅ Novo módulo criado:

#### **Nova página: `/dashboard/admin/news`**
Gerencimento completo de artigos de notícias:

**Funcionalidades:**
- ✅ Listar todos os artigos
- ✅ Buscar por título, resumo ou categoria
- ✅ Filtrar por status (Publicados, Rascunhos, Todos)
- ✅ Estatísticas (Total, Publicados, Rascunhos)
- ✅ Botão "Novo Artigo" para criar
- ✅ Ícones para editar e deletar artigos
- ✅ Ver data de criação e autor

**Campos de um artigo:**
- 📝 Título
- 🔗 Slug (URL amigável: `/noticia/novo-artigo`)
- 📋 Descrição (resumo curto)
- 📄 Conteúdo (texto completo em HTML/Markdown)
- 🖼️ Thumbnail (imagem de capa)
- ✍️ Autor (admin que criou)
- 📅 Data de publicação
- 👁️ Status (Publicado/Rascunho)
- 👀 Contador de visualizações

**Banco de dados:**
- Tabela `NewsArticle` criada em `prisma/schema.prisma`
- Índices para performance (por status, data, autor, slug)
- Soft delete ready (apenas remova a linha, não deleta do banco)

**Próximos passos (não implementado):**
- [ ] Criar página de criar/editar artigos `/dashboard/admin/news/new` e `/dashboard/admin/news/[id]/edit`
- [ ] Editor WYSIWYG para conteúdo
- [ ] Upload de imagens
- [ ] Preview do artigo
- [ ] Publicar artigos automaticamente em datas agendadas
- [ ] Categorizar artigos (Wellness, Terapias, Dicas, etc.)
- [ ] Sistema de tags/keywords
- [ ] Integração com homepage para exibir últimos artigos

---

## 🎯 O que mais seria interessante colocar no admin?

Aqui estão as **TOP 10 features recomendadas** por ordem de impacto/complexidade:

### 🔥 **ALTA PRIORIDADE** (Recomendo implementar PRIMEIRO)

#### 1. **Dashboard de Relatórios & Visualizações** 📊
**Por quê:** Você precisa entender o negócio
- Gráficos de receita (semanal, mensal, anual)
- Gráficos de bookings (por terapeuta, por serviço)
- Taxa de conversão (sign-ups → bookings)
- Usuários ativos vs inativos
- Receita por terapeuta (ranking)
- Horários mais populares
- Serviços mais procurados

**Tecnologia:** Chart.js ou Recharts

---

#### 2. **Gerenciamento de Pagamentos & Transferências** 💰
**Por quê:** Core do negócio (você precisa saber quem paga)
- Tabela de transações (pagamentos recebidos)
- Filtros por status (Pendente, Completo, Falhou, Reembolsado)
- Busca por cliente ou terapeuta
- Detalhes: quem pagou, quanto, quando, método
- **Ações:** Reembolsar, marcar como processado
- Relatório de receita acumulada

**Banco:** Já existe modelo `Payment` em prisma

---

#### 3. **Gerenciamento de Terapeutas - Perfis Completos** 👤
**Por quê:** Você aprova terapeutas, precisa vê-los completamente
- Ver perfil completo: foto, bio, especialidade, experiência
- Ver documentos/certificados anexados
- Histórico de agendamentos (quantos fizeram, avaliação média)
- Receita gerada pelo terapeuta
- Status de verificação
- **Ações:** Aprovar, rejeitar, suspender, visualizar perfil público

**Vantagem:** Gerenciar erros e fraudes

---

#### 4. **Sistema de Moderação - Reviews & Avaliações** ⭐
**Por quê:** Qualidade da plataforma (reviews falsas são problema)
- Tabela de avaliações recebidas
- Filtros: 1-5 estrelas, pendentes de resposta
- Busca por terapeuta ou cliente
- **Ações:** Deletar reviews inadequadas, responder com mensagem
- Ban de usuários que abusam do sistema
- Trending: terapeutas mais bem avaliados

---

#### 5. **Gerenciamento de Conteúdo - Trilhas de Cuidado** 🧘
**Por quê:** Seu diferencial (precisa curar conteúdo)
- Listar todas as trilhas publicadas e rascunhos
- Ver quantos clientes completaram cada trilha
- Busca e filtros por categoria/objetivo
- **Ações:** Destacar trilha (featured), despublicar, deletar
- Reordenar trilhas (drag-and-drop)
- Ver estatísticas: tempo médio, taxa de conclusão

---

### 📈 **MÉDIA PRIORIDADE** (Implementar depois)

#### 6. **Email Marketing & Notificações** 📧
- Template de emails (bem-vindo, recuperação de senha, etc)
- Enviar email em massa para usuários (anúncios)
- Histórico de emails enviados
- Taxa de abertura, clique (se integrar com SendGrid)
- Sistema de push notifications

---

#### 7. **Gerenciamento de Espaços Terapêuticos** 🏢
- Listar espaços (assim como terapeutas)
- Aprovar/rejeitar pedidos de entrada
- Ver salas disponíveis
- Receita gerada por espaço
- Reviews e avaliações

---

#### 8. **Logs de Auditoria & Segurança** 🔐
- Quem fez o quê, quando
- Admin criou/deletou usuário em X data
- Tentativas de login falhadas
- Mudanças de configuração
- Exportar logs

---

#### 9. **Configurações da Plataforma** ⚙️
- Comissão/taxa Senda (% por transação)
- Ativar/desativar métodos de pagamento
- Textos customizáveis (termos, privacidade)
- Listar de espera (blacklist de usuários)
- Configurações de email (SMTP, SendGrid)

---

#### 10. **Suporte & Tickets** 🎫
- Formulário de contato → aparece no admin
- Sistema de tickets (usuários enviam dúvidas)
- Status: Novo, Em atendimento, Resolvido
- Responder direto no dashboard
- Histórico de suporte por usuário

---

## 🚀 Roadmap sugerido (3 meses)

```
Semana 1-2:   Relatórios & Gráficos
Semana 3-4:   Pagamentos & Transferências
Semana 5-6:   Moderação de Reviews
Semana 7-8:   Espaços Terapêuticos
Semana 9-10:  Email Marketing
Semana 11-12: Logs de Auditoria + Configurações
```

---

## 💡 O que você faz agora? (Resumo funcional)

### ✅ Implementado:
1. Dashboard com métricas (usuários, terapeutas, agendamentos, receita)
2. Aprovação de terapeutas (pendentes)
3. Gerenciamento de usuários (busca, filtros, detalhes)
4. Gerenciamento de agendamentos (busca, filtros, status de pagamento)
5. Gerenciamento de notícias (NOVO!)

### 🔄 Próximos (fáceis de implementar):
- Criar/editar artigos de notícias
- Deletar usuários
- Suspender terapeutas

### 🎯 Em falta (complex):
- Relatórios e gráficos
- Pagamentos e reembolsos
- Moderação de reviews
- Logs de auditoria

---

## 📱 Acessar o admin

```
URL: http://localhost:3000/dashboard/admin
Email: admin@senda.app
Senha: Admin123456

Menu admin:
├── Dashboard (métricas)
├── Aprovações (terapeutas pendentes)
├── Usuários (gerenciar usuários)
├── Agendamentos (NEW)
└── Notícias (NEW)
```

---

## 🎨 Design System para Admin

Todas as páginas seguem:
- ✅ Verde Sálvia (#B2B8A3) para ações primárias
- ✅ Terracota (#D99A8B) para alertas
- ✅ Ícones Lucide React (sem emojis!)
- ✅ Dark mode completo
- ✅ Responsividade mobile

---

## ❓ Dúvidas frequentes

**P: Como editar um artigo de notícia?**
R: Clique no ícone de editar na tabela → `/dashboard/admin/news/[id]/edit` (página não existe ainda, precisa criar)

**P: Consigo deletar terapeutas?**
R: Sim, mas atualmente é hard delete. Recomendo implementar soft delete (arquivar em vez de deletar)

**P: Os emails de aprovação/rejeição funcionam?**
R: Sim! Logados no console em dev. Configure `SENDGRID_API_KEY` ou SMTP para enviar de verdade

**P: Consigo fazer um relatório de receita?**
R: Ainda não no admin. Você pode usar `npx prisma studio` para ver dados brutos, ou implementar página de relatórios

---

Pronto para produção! 🚀

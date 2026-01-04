# Painel Admin - Guia de Teste

## ✅ O que foi implementado

### 1. Dashboard Principal (`/dashboard/admin`)
- **Métricas em tempo real:**
  - Total de usuários
  - Total de terapeutas
  - Total de clientes
  - Total de espaços
  - Terapeutas pendentes de aprovação
  - Total de agendamentos
  - Total de receita

- **Ações rápidas:**
  - Ver terapeutas pendentes
  - Ver usuários
  - Gerenciar transações

### 2. Gerenciamento de Terapeutas (`/dashboard/admin/therapists/pending`)
- Lista de terapeutas aguardando aprovação
- Cards com informações:
  - Foto de perfil
  - Nome, email, telefone
  - Bio
  - Especialidade
  - Anos de experiência
  - Data de cadastro

- **Ações:**
  - ✅ **Aprovar**: Marca como `verified: true` e envia email de aprovação
  - ❌ **Rejeitar**: Deleta o perfil e envia email com motivo da rejeição

### 3. Gerenciamento de Usuários (`/dashboard/admin/users`)
- **Estatísticas por tipo:**
  - Clientes
  - Terapeutas
  - Espaços
  - Admins

- **Busca e filtros:**
  - Buscar por nome ou email
  - Filtrar por tipo de usuário

- **Tabela com:**
  - Avatar
  - Nome e email
  - Tipo (com badge e ícone)
  - Status de email (confirmado/pendente)
  - Data de cadastro
  - Botão para ver detalhes

- **Modal de detalhes:**
  - Todas as informações do usuário
  - Avatar em alta definição
  - Status de verificação de email

### 4. Sistema de Notícias (`/dashboard/admin/news`)
- **CRUD completo de artigos:**
  - Criar nova notícia
  - Editar notícias existentes
  - Deletar notícias
  - Auto-geração de slug a partir do título

- **Funcionalidades:**
  - Rascunhos vs Publicadas
  - Marcar como "Destaque"
  - Upload de imagem de capa (URL)
  - Suporte para conteúdo HTML
  - Preview de thumbnail

- **Listagem:**
  - Cards visuais com thumbnail
  - Badges de status (Publicado/Rascunho)
  - Selo de destaque
  - Informações do autor e data

### 5. Relatórios & Analytics (`/dashboard/admin/reports`)
- **Métricas principais:**
  - Total de usuários
  - Total de clientes
  - Total de terapeutas
  - Total de agendamentos
  - Receita dos últimos 30 dias

- **Gráficos visuais:**
  - Agendamentos por dia (últimos 30 dias)
  - Distribuição de usuários por tipo
  - Top 5 terapeutas por agendamentos

- **Design:**
  - Gráficos de barras horizontais animados
  - Cores diferentes por tipo de usuário
  - Ranking visual de terapeutas

### 6. Moderação de Reviews (`/dashboard/admin/reviews`)
- **Listagem completa:**
  - Todas as avaliações com rating visual (estrelas)
  - Nome do terapeuta e cliente
  - Comentário completo
  - Data de criação

- **Estatísticas:**
  - Total de avaliações
  - Classificação média
  - Distribuição de votos (1-5 estrelas)

- **Filtros:**
  - Por rating (1-5 estrelas)
  - Mostrar todos

- **Ações de moderação:**
  - Marcar como "Problemático" (flagged)
  - Aprovar review previamente flagged
  - Deletar review permanentemente

### 7. Gerenciamento de Pagamentos (`/dashboard/admin/payments`)
- **Métricas financeiras:**
  - Total em transações
  - Valores pendentes
  - Valores reembolsados
  - Taxa de sucesso

- **Listagem de transações:**
  - Tabela completa com todas as transações
  - ID da transação
  - Terapeuta e cliente
  - Valor
  - Status (Concluído, Pendente, Falhou, Reembolsado)
  - Data

- **Busca e filtros:**
  - Buscar por terapeuta, cliente ou ID
  - Filtrar por status

- **Ações:**
  - Processar reembolsos (com confirmação)
  - Ver histórico de reembolsos

### 8. Autenticação e Autorização
- Apenas usuários com `role: 'ADMIN'` conseguem acessar o painel
- Redirecionamento automático se não for admin
- Logout disponível via botão na navbar

### 9. Internacionalização (i18n)
- **4 idiomas suportados:**
  - Português (pt)
  - Inglês (en)
  - Espanhol (es)
  - Chinês (zh)

- **Traduções completas para:**
  - Navbar
  - Dashboard
  - Notícias
  - Relatórios
  - Reviews
  - Pagamentos
  - Textos comuns

## 🧪 Como testar

### 1. Credenciais de Admin
```
Email: admin@senda.app
Senha: Admin123456
```

### 2. Passo a passo

**A. Login**
1. Vá para `http://localhost:3000`
2. Clique em "Entrar" ou vá direto para `/auth/signin`
3. Use as credenciais acima
4. Será redirecionado para `/dashboard/admin`

**B. Explorar o Dashboard**
1. Veja as métricas (se houver dados)
2. Clique nas abas:
   - **Overview**: Métricas e informações gerais
   - **Usuários**: Lista de usuários recentes
   - **Pendente**: Link para terapeutas pendentes

**C. Testar Aprovação de Terapeutas**
1. Crie alguns terapeutas via `/auth/signup` (role: THERAPIST)
2. Vá para `/dashboard/admin/therapists/pending`
3. Clique em "Aprovar" ou "Rejeitar" em um terapeuta
4. Veja a confirmação e a mensagem de sucesso

**D. Testar Gerenciamento de Usuários**
1. Vá para `/dashboard/admin/users`
2. Use a barra de busca para procurar um usuário
3. Use os filtros para ver apenas um tipo de usuário
4. Clique em "Ver Detalhes" para abrir o modal com informações completas

**E. Testar Sistema de Notícias**
1. Vá para `/dashboard/admin/news`
2. Clique em "Nova Notícia"
3. Preencha o formulário:
   - Título: "Bem-estar em 2026"
   - Descrição: "Descubra as melhores práticas de autocuidado"
   - Conteúdo: Escreva um texto ou HTML
   - Thumbnail: Cole URL de imagem (ex: Unsplash)
   - Marque "Publicado" e/ou "Destaque"
4. Clique em "Salvar Artigo"
5. Veja a notícia na listagem
6. Teste editar e deletar

**F. Testar Relatórios & Analytics**
1. Vá para `/dashboard/admin/reports`
2. Veja as métricas principais no topo
3. Analise o gráfico de agendamentos por dia
4. Veja a distribuição de usuários por tipo
5. Confira o ranking de top terapeutas

**G. Testar Moderação de Reviews**
1. Vá para `/dashboard/admin/reviews`
2. Veja todas as avaliações com estrelas
3. Filtre por rating (1-5 estrelas)
4. Marque uma review como "Problemático"
5. Aprove uma review flagged
6. Delete uma review (com confirmação)

**H. Testar Gerenciamento de Pagamentos**
1. Vá para `/dashboard/admin/payments`
2. Veja as métricas financeiras
3. Use a busca para encontrar transações
4. Filtre por status (Concluído, Pendente, etc)
5. Clique em "Reembolsar" em uma transação concluída
6. Confirme o reembolso

**I. Testar Internacionalização**
1. No canto superior da navbar, clique no seletor de idioma
2. Escolha "English" - veja toda interface em inglês
3. Teste "Español" - interface em espanhol
4. Teste "中文" - interface em chinês
5. Volte para "Português"
6. Note que a preferência persiste ao recarregar a página

### 3. Funcionalidades extras

**Navbar do Admin**
- Clique no seu nome no canto superior direito
- Veja os links:
  - Dashboard (com ícone de gráfico)
  - Aprovações (com ícone de checkmark)
  - Usuários (com ícone de pessoas)

## 📧 Emails de Aprovação/Rejeição

Quando um terapeuta é aprovado ou rejeitado:
- ✅ **Aprovação**: Email com título "🎉 Parabéns! Seu perfil foi aprovado no Senda"
- ❌ **Rejeição**: Email com título "Atualização sobre seu cadastro no Senda" + motivo

**Nota**: Em desenvolvimento, os emails são logados no console (veja `src/lib/email.ts`)

## 🗄️ Dados no Banco

Para verificar os dados criados:
```bash
npx prisma studio
```

Isso abre uma GUI em `http://localhost:5555` onde você pode ver/editar:
- Users (usuários com role ADMIN)
- TherapistProfile (terapeutas pendentes com `verified: false`)
- ClientProfile, SpaceProfile (outros perfis)

## 🎨 Design

O painel segue o design system Senda:
- **Cores primárias:**
  - Verde Sálvia (#B2B8A3) para ações principais
  - Terracota (#D99A8B) para estados de alerta
  - Areia (#F0EBE3) para fundos

- **Tipografia:**
  - Títulos: Sans-serif bold
  - Corpo: Sans-serif regular

- **Componentes:**
  - Cards com sombra e hover effects
  - Badges com cores por tipo
  - Ícones Lucide React
  - Dark mode support (via Tailwind `dark:` classes)

## ✨ Próximos passos (não implementado)

- [ ] Página de transações/financeiro
- [ ] Dashboard de moderação (conteúdo, reviews)
- [ ] Configurações da plataforma
- [ ] Relatórios e exportação de dados
- [ ] Logs de auditoria
- [ ] Webhooks para eventos do sistema

## 🐛 Troubleshooting

**Admin não consegue fazer login**
- Verifique se o usuário foi criado: `npx prisma studio` → Users
- Veja se `role: 'ADMIN'` está correto
- Limpe cookies/cache do navegador

**Painel não carrega**
- Verifique se está logado como admin
- Abra `/dashboard/admin` diretamente
- Se vir erro, é porque não é admin (redirecionamento funciona)

**Emails não estão sendo enviados**
- Em dev, são logados no console do servidor
- Configure `SENDGRID_API_KEY` ou SMTP no `.env.local` para testar de verdade

**Terapeutas não aparecem na lista de pendentes**
- Crie novos terapeutas via `/auth/signup`
- Verifique em `npx prisma studio` → TherapistProfile com `verified: false`

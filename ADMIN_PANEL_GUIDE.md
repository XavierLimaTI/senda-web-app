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

### 4. Autenticação e Autorização
- Apenas usuários com `role: 'ADMIN'` conseguem acessar o painel
- Redirecionamento automático se não for admin
- Logout disponível via botão na navbar

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

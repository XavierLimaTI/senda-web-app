# Senda - Ambiente de Desenvolvimento com Docker

Este guia explica como configurar o ambiente de desenvolvimento do Senda usando Docker.

## 📋 Pré-requisitos

- Docker Desktop instalado
- PostgreSQL (opcional, se quiser rodar localmente sem Docker)
- Node.js 18+

## 🚀 Quick Start

### 1. Iniciar os containers

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso irá iniciar:
- **PostgreSQL** na porta `5432`
- **Adminer** na porta `8080` (interface web para gerenciar o banco)

### 2. Configurar o .env

Copie o `.env.example` ou edite seu `.env`:

```env
# Database - PostgreSQL (Docker)
DATABASE_URL="postgresql://senda:senda_dev_2026@localhost:5432/senda_db?schema=public"
```

### 3. Aplicar as migrations

```bash
# Gerar o Prisma Client
npx prisma generate

# Aplicar migrations no PostgreSQL
npx prisma migrate dev --name init
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

## 🔧 Comandos Úteis

### Docker

```bash
# Iniciar containers em background
docker-compose up -d

# Ver logs do PostgreSQL
docker-compose logs -f postgres

# Parar containers
docker-compose down

# Parar e remover volumes (⚠️ apaga dados)
docker-compose down -v

# Reiniciar containers
docker-compose restart
```

### Prisma

```bash
# Visualizar banco no Prisma Studio
npx prisma studio

# Resetar banco (⚠️ apaga dados)
npx prisma migrate reset

# Aplicar schema sem migrations (desenvolvimento)
npx prisma db push
```

## 🌐 Acessos

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| App Senda | http://localhost:3000 | - |
| Adminer | http://localhost:8080 | postgres / senda / senda_dev_2026 |
| PostgreSQL | localhost:5432 | senda / senda_dev_2026 |

## 🔄 Migração de SQLite para PostgreSQL

Se você já tem dados no SQLite e quer migrar:

1. Exporte os dados do SQLite
2. Importe no PostgreSQL

```bash
# Opção 1: Resetar e começar limpo
npx prisma migrate reset

# Opção 2: Manter dados existentes
# (requer script de migração)
```

## 📦 Produção

Para produção, use variáveis de ambiente seguras:

```env
DATABASE_URL="postgresql://user:password@host:5432/senda_prod?schema=public&sslmode=require"
```

Recomendamos:
- **Supabase** - PostgreSQL gerenciado + Auth + Storage
- **Railway** - Deploy fácil com PostgreSQL incluído
- **Neon** - PostgreSQL serverless

# 🚨 Setup Sentry - Error Tracking

**Status:** ✅ Configuração criada  
**Tempo Estimado de Setup:** 15-20 min  
**Custo:** Free tier disponível

---

## 📋 Passos de Instalação

### 1. Criar conta Sentry.io
```bash
# Ir em https://sentry.io/signup/
# Criar conta com email
# Escolher plano "Free" (50k eventos/mês é suficiente para MVP)
```

### 2. Criar Projeto Next.js
```
Org → Projects → Create Project
- Platform: Next.js
- Alert frequency: Set alerts to how often you want to be notified
- Copiar DSN da página
```

### 3. Instalar dependência
```bash
npm install @sentry/nextjs
```

### 4. Configurar Environment Variables
Adicionar em `.env.local`:
```env
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_AUTH_TOKEN=seu_auth_token_aqui
SENTRY_ORG=seu_org_name
SENTRY_PROJECT=seu_project_name
```

**Para obter SENTRY_AUTH_TOKEN:**
- Sentry Dashboard → Settings → API tokens
- Copiar token (ou criar novo)

### 5. Atualizar `src/app/layout.tsx` ou `src/app/Providers.tsx`
```typescript
import { initSentry } from '@/lib/sentry'

export default function RootLayout({ children }) {
  // Initialize Sentry on client
  if (typeof window !== 'undefined') {
    initSentry()
  }

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### 6. Capturar Exceções Manualmente
```typescript
import { Sentry } from '@/lib/sentry'

try {
  // code
} catch (error) {
  Sentry.captureException(error)
  console.error(error)
}
```

---

## 🎯 Recursos do Sentry (Free Tier)

✅ Error tracking  
✅ Release tracking  
✅ Performance monitoring  
✅ Session replay (até 50k/mês)  
✅ Source maps  
✅ Email alerts  
✅ Slack integration  
✅ GitHub integration  

---

## 🔧 Configuração Avançada

### Setup no Production Build
Sentry captura automaticamente:
- Exceções não capturadas
- Erros de API
- Erros de compilação
- Performance issues

### Integrar com GitHub
```
Sentry Dashboard → Integrations → GitHub
- Conectar repo
- Resolve issues automaticamente ao fazer commit
```

### Integrar com Slack
```
Sentry Dashboard → Integrations → Slack
- Conectar workspace
- Receber alertas no Slack #senda-alerts
```

---

## 📊 Dashboard Sentry

Depois de configurado, você terá acesso a:

1. **Issues Dashboard**
   - Erros recentes
   - Stack traces
   - Ocorrências
   - Usuários afetados

2. **Performance Monitoring**
   - Transações lentas
   - API response times
   - Database query times

3. **Release Tracking**
   - Qual versão introduziu erro
   - Rollback automático (com GitHub)

4. **Alerting**
   - Email quando novo erro
   - Slack notifications
   - Escalation policies

---

## 💾 Exemplo: Capturar Erro em API

```typescript
// src/app/api/auth/signup/route.ts
import { Sentry } from '@/lib/sentry'

export async function POST(req: Request) {
  try {
    // seu código aqui
  } catch (error) {
    // Log para Sentry
    Sentry.captureException(error, {
      tags: {
        endpoint: '/api/auth/signup',
        severity: 'high',
      },
    })
    
    // Log local também
    console.error('Signup error:', error)
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
```

---

## 🚀 Deploy em Produção

Quando fazer deploy (ex. Vercel):

1. Configurar Environment Variables em Vercel:
   ```
   NEXT_PUBLIC_SENTRY_DSN = https://xxxxx...
   SENTRY_AUTH_TOKEN = xxxxx
   SENTRY_ORG = seu_org
   SENTRY_PROJECT = seu_projeto
   ```

2. Fazer push para main/prod
3. Sentry capturará automaticamente erros
4. Receber alertas em tempo real

---

## 🧪 Testar Sentry

Para verificar se está funcionando:

```typescript
// Adicionar em alguma página temporária
throw new Error('Test Sentry Error')
```

Depois remover após verificar que o erro apareceu no Sentry Dashboard.

---

## 💰 Pricing

- **Free:** 50k eventos/mês + session replays
- **Team:** $29/mês
- **Business:** Custom pricing

Para MVP, **Free tier é suficiente**.

---

## 📚 Referências

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry SDK Setup](https://docs.sentry.io/product/integrations/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)

---

**Status:** ✅ Pronto para usar  
**Arquivo config:** `src/lib/sentry.ts`  
**Docs do projeto:** Ver arquivo acima para exemplos

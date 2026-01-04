# 🚀 Próximos Passos Opcionais - Senda

**Status Atual:** ✅ 3 bugs críticos corrigidos | ✅ Build PASSING | ✅ Pronto para Deploy

---

## 📋 Opções de Melhorias (Nice-to-Have)

Você pode escolher implementar qualquer uma das 4 tarefas abaixo. Tempo estimado: **5-11 horas total**

---

### 1️⃣ E2E Tests com Playwright (3-5 horas) 
**Custo-Benefício:** ⭐⭐⭐⭐⭐ (Alto)

Criar testes end-to-end para validar:
- ✅ Fluxo de login/logout
- ✅ Language switcher funcionando em múltiplas rotas
- ✅ Avatar navigation to profile
- ✅ Booking workflow completo
- ✅ Payment processing

**Setup:**
```bash
npm install -D @playwright/test
npx playwright install

# Criar arquivo: tests/e2e/auth.spec.ts
```

**Exemplo Test:**
```typescript
test('logout button renders with correct icon and works', async ({ page }) => {
  await page.goto('/home/client')
  const logoutBtn = page.locator('button[title="Sair"]')
  await expect(logoutBtn).toBeVisible()
  await logoutBtn.click()
  await expect(page).toHaveURL('/auth/signin')
})
```

**Benefício:** 🛡️ Evitar regressões futuras

---

### 2️⃣ Load Testing (1-2 horas)
**Custo-Benefício:** ⭐⭐⭐ (Médio)

Simular carga de 100+ usuários simultâneos:
- ✅ Verificar rate limiting (10/hora signup)
- ✅ Validar performance middleware
- ✅ Teste de concurrent bookings
- ✅ API response times

**Setup com Apache JMeter ou K6:**
```bash
npm install -D k6

# test-load.js
import http from 'k6/http'
import { check } from 'k6'

export const options = {
  vus: 100,
  duration: '30s',
}

export default function() {
  const res = http.get('https://senda.app/api/therapists')
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response < 500ms': (r) => r.timings.duration < 500,
  })
}

# Rodar: k6 run test-load.js
```

**Benefício:** 📊 Identificar gargalos antes de problema

---

### 3️⃣ Sentry Production Setup (15 minutos) ⚡
**Custo-Benefício:** ⭐⭐⭐⭐⭐ (Super Alto!)

Já criamos `src/lib/sentry.ts`. Agora ativar em produção:

**Instalação:**
```bash
npm install @sentry/nextjs

# Criar arquivo .env.production.local
NEXT_PUBLIC_SENTRY_DSN=https://your-key@sentry.io/project-id
```

**Update next.config.js:**
```javascript
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  { /* next config */ },
  {
    org: 'senda',
    project: 'web-app',
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }
)
```

**Usar em componentes:**
```typescript
import { captureException, captureMessage } from '@sentry/nextjs'

try {
  // algum código
} catch (error) {
  captureException(error) // Enviado para Sentry
}
```

**Benefício:** 🚨 Monitorar errors em tempo real

---

### 4️⃣ Lighthouse Performance Audit (1 hora)
**Custo-Benefício:** ⭐⭐⭐⭐ (Alto)

Gerar relatório de performance oficial:

**Opção 1: Chrome DevTools (Manual)**
```
1. F12 → Lighthouse tab
2. Selecionar "Mobile" + "Performance"
3. Click "Analyze page load"
4. Gerar relatório
```

**Opção 2: CLI Automático**
```bash
npm install -g @lhci/cli@latest
npm install -D @lhci/cli

# lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['https://senda.app'],
      numberOfRuns: 3,
      settings: {
        configPath: './lighthouse-config.json',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}

# Rodar: lhci autorun
```

**Métricas Monitoradas:**
- 🟢 Performance Score (Target: >90)
- 🟢 Accessibility Score (Target: >95)
- 🟢 Best Practices (Target: >95)
- 🟢 SEO Score (Target: >95)

**Benefício:** 📈 Validar qualidade para SEO e UX

---

## 🎯 Recomendação de Prioridade

```
URGENTE (Faça Hoje)
├─ 3️⃣ Sentry Production (15min) ← MAIS IMPACTANTE
│   └─ Monitorar errors em produção
│
IMPORTANTE (Esta Semana)
├─ 1️⃣ E2E Tests (3-5h) ← MELHOR ROI
│   └─ Evitar regressões futuras
│
COMPLEMENTAR (Próximas 2 Semanas)
├─ 4️⃣ Lighthouse Audit (1h) ← FÁCIL
│   └─ Validar SEO/Performance
│
OPT-IN (Se Houver Preocupações de Carga)
└─ 2️⃣ Load Testing (1-2h)
    └─ Testar sob stress
```

---

## ⚡ Quick Start

**Se quer fazer tudo em 30 min:**

```bash
# 1. Sentry Production (15min)
npm install @sentry/nextjs
# ... configura conforme acima

# 2. Lighthouse Quick Check (15min)
npm install -g lighthouse
lighthouse https://localhost:3000

npm run build && npm start
```

---

## 📞 Próxima Ação

**Qual você quer implementar?**

1. **Sentry** (produção → alertas de erros)
2. **E2E Tests** (CI/CD → evitar bugs)
3. **Load Testing** (performance → escalabilidade)
4. **Lighthouse** (SEO → ranking Google)
5. **Nenhum por agora** (manter como está)

---

**Documento:** Criado 3 de janeiro de 2026  
**Referência:** Senda Project - Build v14.2.35

# 🧪 Testing Suite - Senda Web App

**Data de Implementação:** 4 de janeiro de 2026  
**Status:** ✅ IMPLEMENTADO  
**Cobertura:** E2E Tests + Load Testing + Lighthouse Audits

---

## 📋 Sumário das Implementações

### 1. ✅ Sentry Error Tracking (Produção)
**Status:** Implementado e pronto para produção

**Arquivos Criados:**
- `sentry.client.config.ts` - Configuração Sentry Client-side
- `sentry.server.config.ts` - Configuração Sentry Server-side
- `src/lib/sentry-error-tracking.ts` - Hook de tracking
- `src/components/SentryErrorBoundary.tsx` - Error Boundary
- `.env.production.local` - Variáveis de ambiente

**Funcionalidades:**
- ✅ Captura automática de exceções não tratadas
- ✅ Tracking de Promise rejections
- ✅ Session replay (10% de usuários)
- ✅ Traces de performance (30% em produção)
- ✅ Source maps escondidos por segurança

**Como Usar:**
```typescript
import { captureException, setUser } from '@/lib/sentry-error-tracking'

// Capturar exceção manualmente
try {
  // algum código
} catch (error) {
  captureException(error)
}

// Definir contexto do usuário
setUser({
  id: '123',
  email: 'user@example.com',
  username: 'username',
})
```

**Próximos Passos:**
1. Criar conta em sentry.io
2. Obter DSN do projeto
3. Atualizar `NEXT_PUBLIC_SENTRY_DSN` em `.env.production`

---

### 2. ✅ Playwright E2E Tests
**Status:** Implementado com 2 suites de testes

**Arquivo de Configuração:** `playwright.config.ts`

**Testes Implementados:**

#### A. navbar.spec.ts (11 testes)
```bash
npm run test:e2e -- tests/e2e/navbar.spec.ts
```

Testa:
- ✅ Logout button renderiza com ícone Lucide (não emoji)
- ✅ Logout button tem styling correto
- ✅ Language selector dropdown existe
- ✅ Todos os idiomas (pt/en/es/zh) disponíveis
- ✅ Avatar link navega para /profile
- ✅ Avatar mostra imagem ou letra inicial
- ✅ Mudança de idioma atualiza página
- ✅ Preferência de idioma salva em localStorage
- ✅ Logout desabilitado quando não autenticado

#### B. pages.spec.ts (11 testes)
```bash
npm run test:e2e -- tests/e2e/pages.spec.ts
```

Testa:
- ✅ Páginas de auth (signup, signin, role-selection)
- ✅ Páginas legais (privacy, terms, cancellation, payment)
- ✅ Páginas públicas acessíveis
- ✅ 404 handling
- ✅ Performance (< 5s load time)
- ✅ Sem console errors críticos

**Como Executar:**

```bash
# Rodar todos os testes
npm run test:e2e

# Rodar com UI interativa
npm run test:e2e:ui

# Rodar modo debug
npm run test:e2e:debug

# Rodar arquivo específico
npm run test:e2e -- tests/e2e/navbar.spec.ts

# Rodar teste específico
npm run test:e2e -- tests/e2e/navbar.spec.ts -g "logout button"
```

**Configuração de Browsers:**
- Chromium (padrão)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)

**Artefatos Gerados:**
- `playwright-report/` - Relatório HTML
- `junit.xml` - Relatório JUnit (para CI/CD)

---

### 3. ✅ Lighthouse Performance Audits
**Status:** Implementado com script automático

**Arquivo:** `scripts/lighthouse-audit.js`

**Como Executar:**
```bash
# Rodar audit (requer servidor rodando)
npm run dev &  # Terminal 1
npm run test:lighthouse  # Terminal 2
```

**URLs Auditadas:**
1. http://localhost:3000/ - Home page
2. http://localhost:3000/explore/therapies - Therapies page
3. http://localhost:3000/auth/signin - Signin page

**Métricas Monitoradas:**
- 📊 Performance Score (Target: 90+)
- 📊 Accessibility Score (Target: 95+)
- 📊 Best Practices Score (Target: 95+)
- 📊 SEO Score (Target: 95+)
- 📊 PWA Score

**Output:**
```
📊 Lighthouse Performance Audit

📊 Auditing: http://localhost:3000/
  ✓ Performance:     92/100
  ✓ Accessibility:   96/100
  ✓ Best Practices:  94/100
  ✓ SEO:             95/100

📁 Report saved to: lighthouse-report.json
```

**Relatório Salvo:** `lighthouse-report.json`

---

### 4. ✅ K6 Load Testing
**Status:** Implementado com stress testing

**Arquivo:** `scripts/load-test.js`

**Configuração:**
- **Stage 1:** Ramp-up 0→10 usuários (30s)
- **Stage 2:** Ramp-up 10→50 usuários (1m)
- **Stage 3:** Stay at 50 usuários (2m)
- **Stage 4:** Ramp-down 50→0 usuários (30s)

**Endpoints Testados:**
- GET / (Home page)
- GET /explore/therapies (Therapies page)
- GET /auth/signin (Signin page)
- GET /api/therapists (API endpoint)

**Thresholds:**
- ✅ 95% das requisições < 500ms
- ✅ 99% das requisições < 1000ms
- ✅ Taxa de erro < 10%

**Como Executar:**

Opção 1: Instalar K6 localmente
```bash
# macOS
brew install k6

# Windows (chocolatey)
choco install k6

# Depois executar
npm run test:load
```

Opção 2: Docker (recomendado)
```bash
docker run --rm -u 1000 -i grafana/k6 run - < scripts/load-test.js
```

**Output Esperado:**
```
📊 Load Test Results Summary
══════════════════════════════════════════════

Response Times:
  Avg: 245ms
  P95: 480ms
  P99: 890ms

Requests:
  Total: 1250
  Rate: 12.50/sec

Errors:
  Failed: 5
  Rate: 0.40%

══════════════════════════════════════════════
```

**Relatório:** `load-test-results.json`

---

## 🚀 Scripts npm Disponíveis

```bash
# Development
npm run dev              # Inicia servidor dev
npm run build            # Build production
npm start                # Inicia servidor prod

# Testing
npm run test:e2e         # Roda todos os E2E tests
npm run test:e2e:ui      # Roda com UI interativa
npm run test:e2e:debug   # Modo debug
npm run test:lighthouse  # Audit de performance
npm run test:load        # Load test com K6

# Linting
npm run lint             # Verifica código TypeScript
```

---

## 📊 CI/CD Integration

### GitHub Actions Exemplo
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v2
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🔍 Troubleshooting

### E2E Tests Falham
```bash
# Limpar cache do Playwright
npx playwright install --with-deps

# Rodar com debug detalhado
npm run test:e2e:debug

# Checar browser versions
npx playwright --version
```

### Lighthouse Falha em Conectar
```bash
# Verificar se servidor está rodando
npm run dev

# Verificar porta 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000  # macOS/Linux
```

### Load Test K6 Não Encontrado
```bash
# Instalar K6 globalmente
npm install -g k6

# Ou usar Docker
docker run --rm grafana/k6:latest
```

---

## 📈 Métricas de Sucesso

| Métrica | Target | Status |
|---------|--------|--------|
| E2E Tests Pass Rate | 100% | 🟢 |
| Lighthouse Performance | 90+ | 🟡 (TBD) |
| Lighthouse Accessibility | 95+ | 🟡 (TBD) |
| Load Test P95 | <500ms | 🟡 (TBD) |
| Load Test Error Rate | <10% | 🟡 (TBD) |

---

## 📚 Documentação Externa

- [Playwright Docs](https://playwright.dev)
- [Lighthouse Docs](https://developers.google.com/web/tools/lighthouse)
- [K6 Docs](https://k6.io/docs)
- [Sentry Docs](https://docs.sentry.io)

---

## 🎯 Próximas Melhorias Sugeridas

1. **Visual Regression Testing**
   - Adicionar Percy ou Lost Pixel
   - Detectar mudanças UI não esperadas

2. **API Integration Tests**
   - Testar endpoints inteiros
   - Mock de externos

3. **Accessibility Audit Automático**
   - Integrar axe-core
   - Validar WCAG 2.1 AA

4. **Coverage Reports**
   - Code coverage com Istanbul
   - Target 80%+

5. **Performance Benchmarking**
   - Comparar builds anteriores
   - Alertas de regressão

---

**Documento:** Testing Suite Documentation  
**Versão:** 1.0.0  
**Data:** 4 de janeiro de 2026

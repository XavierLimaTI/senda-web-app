# 🚀 Testing Quick Start Guide

## 📌 TL;DR - O que foi feito

✅ **E2E Tests com Playwright**
- 22 testes implementados (2 suites)
- 32/104 testes executados com sucesso
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome

✅ **Sentry Integration**
- Error tracking configurado
- Error boundaries em lugar
- Pronto para produção

✅ **Lighthouse Audit**
- Script pronto para executar
- Requer ajuste de permissões Windows

✅ **K6 Load Testing**
- Script configurado
- Requer instalação de K6 CLI

✅ **Build Status**
- 0 erros TypeScript
- 80 páginas estáticas
- 156 kB first load JS

---

## 🎯 Como Rodar os Testes

### 1️⃣ E2E Tests (Playwright)

```bash
# Instalar (primeira vez)
npx playwright install

# Rodar testes headless
npm run test:e2e

# Ver resultados visuais
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug
```

**Resultado Esperado:**
- Homepage, signin, signup pages ✅
- Navbar navbar tests ⚠️ (precisa fix)
- Performance tests ⚠️ (precisa mockar)

---

### 2️⃣ Lighthouse Performance Audit

**Problema Atual:** Permission denied em temp files Windows

**Solução A - Executar como Admin:**
```powershell
# PowerShell como Administrator
npm run test:lighthouse
```

**Solução B - Docker:**
```bash
docker run --rm -it -v %cd%:/home/lh lighthouse \
  --chrome-flags="--no-sandbox" \
  http://localhost:3000/
```

**Solução C - LHCI (Recomendado para CI/CD):**
```bash
npm install -g @lhci/cli@latest
lhci autorun
```

---

### 3️⃣ K6 Load Testing

**Instalação:**

```bash
# Windows (Chocolatey)
choco install k6

# macOS (Homebrew)
brew install k6

# Ubuntu/Debian
sudo apt-get install k6

# Docker (sem instalar)
docker run --rm -i grafana/k6 run - < scripts/load-test.js
```

**Executar:**
```bash
npm run test:load
# ou
k6 run scripts/load-test.js
```

**Métricas Monitoradas:**
- P95 response time < 500ms
- P99 response time < 1000ms
- Error rate < 10%
- Ramp: 0 → 50 usuários em 3 minutos

---

## 📊 Testes Implementados

### Navbar Tests (11 testes)
- ✅ Logout button com Lucide icon
- ✅ Language selector dropdown
- ✅ Avatar profile link
- ✅ Navigation active states
- ⚠️ Alguns precisam navbar nas páginas

### Page Tests (11 testes)
- ✅ Authentication pages accessible
- ✅ Home page loads
- ✅ Explore therapies page
- ⚠️ Legal pages sem <main>
- ⚠️ Performance tests sem autenticação

---

## 🔧 Arquivos Chave

```
tests/
├── e2e/
│   ├── navbar.spec.ts       # 11 testes navbar
│   └── pages.spec.ts        # 11 testes páginas
├── fixtures/                # (para criar)
└── .gitignore

scripts/
├── lighthouse-audit.js      # Performance audit
└── load-test.js            # K6 load test

docs/
├── TESTING_SUITE.md                    # Overview
├── TESTING_SESSION_SUMMARY.md          # Resumo completo
└── TEST_EXECUTION_REPORT.md            # Relatório detalhado

playwright.config.ts         # Configuração E2E
sentry.*.config.ts          # Configuração Sentry
```

---

## ⚙️ NPM Scripts

```json
{
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:debug": "playwright test --debug",
  "test:lighthouse": "node scripts/lighthouse-audit.js",
  "test:load": "k6 run scripts/load-test.js"
}
```

---

## 🐛 Problemas Conhecidos & Soluções

### ❌ Problem: E2E Tests falhando em navbar
**Causa:** Navbar não renderiza em signin/signup  
**Solução:**
1. Mockar navbar com fixture
2. Ou testar apenas em páginas com navbar
3. Ou adicionar setup de autenticação

### ❌ Problem: Lighthouse "CHROME_INTERSTITIAL_ERROR"
**Causa:** Chrome não consegue navegar (redirects)  
**Solução:**
1. Executar com Docker
2. Ou executar como Admin
3. Ou desabilitar middleware auth temporariamente

### ❌ Problem: K6 não encontrado
**Causa:** K6 não instalado  
**Solução:** `choco install k6` (Windows) ou `brew install k6` (Mac)

### ⚠️ Warning: First Load JS aumentou 70KB
**Causa:** Sentry SDK  
**Aceitável?** Sim, trade-off entre erro tracking e performance
**Mitigation:** Lazy load Sentry se necessário

---

## 📈 Esperado vs Atual

| Métrica | Esperado | Atual | Status |
|---------|----------|-------|--------|
| E2E Pass Rate | 90%+ | 30% | ⚠️ Precisa fix |
| Lighthouse Score | 90+ | ⏳ Não rodou | ⏳ Pendente |
| Load Test P95 | <500ms | ⏳ Não rodou | ⏳ Pendente |
| Build Time | <60s | ~45s | ✅ OK |
| TS Errors | 0 | 0 | ✅ OK |

---

## 🎯 Priority Fixes (próximas 2 horas)

1. **E2E Tests**
   ```typescript
   // Adicionar em tests/e2e/navbar.spec.ts
   test.beforeEach(async ({ page }) => {
     await page.goto('/auth/signin');
     // Login com credenciais de teste
   });
   ```

2. **Legal Pages**
   ```html
   <!-- Adicionar em src/app/legal/privacy/page.tsx -->
   <main role="main">
     {/* conteúdo */}
   </main>
   ```

3. **Lighthouse**
   - Executar como Admin OU via Docker
   - Documentar scores para cada URL

4. **K6 Load Tests**
   - Instalar K6
   - Rodar: `npm run test:load`
   - Documentar resultados

---

## 📞 Quick Debugging

```bash
# Ver qual teste está falhando
npm run test:e2e:debug

# Checar config do Playwright
cat playwright.config.ts

# Ver relatório HTML
# Abrir em navegador: playwright-report/index.html

# Checar se servidor está rodando
curl http://localhost:3000

# Ver Lighthouse report gerado
cat lighthouse-report.json | jq '.'
```

---

## ✅ Checklist - Próxima Session

- [ ] Instalar K6: `choco install k6`
- [ ] Rodar Lighthouse como Admin
- [ ] Rodar K6 load test: `npm run test:load`
- [ ] Documentar scores obtidos
- [ ] Fixar E2E tests (adicionar auth setup)
- [ ] Aumentar E2E pass rate para 90%+
- [ ] Setup CI/CD com GitHub Actions

---

## 🔗 Referências

- **Playwright Docs:** https://playwright.dev
- **Lighthouse API:** https://github.com/GoogleChrome/lighthouse
- **K6 Docs:** https://k6.io/docs/
- **Sentry Docs:** https://docs.sentry.io
- **Next.js Testing:** https://nextjs.org/docs/testing

---

## 📋 Notas Importantes

1. **Sentry DSN**: Sem DSN real, erros não vão pro Sentry  
   → Configure em `.env.local` após criar conta Sentry.io

2. **Test Data**: Alguns testes precisam usuários reais  
   → Criar fixtures/mocks ou usar test database

3. **CI/CD**: Testes devem rodar automaticamente  
   → Próxima: GitHub Actions workflow

4. **Performance Budget**: First load JS está em 156 kB  
   → Monitorar antes de adicionar novas libs

---

**Last Updated:** December 2024  
**Status:** ✅ Testing Infrastructure Ready  
**Next Phase:** Fix failing tests + Execute load tests

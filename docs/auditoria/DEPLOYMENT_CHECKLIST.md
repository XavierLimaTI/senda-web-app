# 🚀 Checklist de Deployment - Senda MVP

**Status:** 18/18 Features Complete  
**Data Preparação:** 2026-01-03

---

## ✅ PRÉ-DEPLOYMENT (CRÍTICO)

### Security (Bloqueador #1)
- [ ] Implementar `src/middleware.ts` com security headers
  - [ ] X-Frame-Options: DENY
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-XSS-Protection: 1; mode=block
  - [ ] Referrer-Policy: strict-origin-when-cross-origin
  - [ ] Permissions-Policy configurada
  - [ ] CORS headers (se necessário)

- [ ] Implementar rate limiting global
  - [ ] @upstash/ratelimit instalado
  - [ ] Redis configurado
  - [ ] Endpoints críticos protegidos (signup, login, API)
  - [ ] Limites: 10 req/min auth, 30 req/min geral

- [ ] Validação de environment variables
  - [ ] Criar `src/lib/env.ts` com Zod
  - [ ] Validar em startup
  - [ ] Falhar fast se faltarem vars críticas

### Application (Bloqueador #2)
- [ ] Completar design system refactor
  - [ ] TherapistTimeSlotSelector.tsx (15 instances)
  - [ ] button.tsx (2 instances)
  - [ ] card.tsx (2 instances)
  - [ ] Toast.tsx (1 instance)
  - [ ] Substituir gray colors por Senda palette
  - [ ] Build deve passar sem errors

- [ ] Logging system implementado
  - [ ] Winston ou Pino configurado
  - [ ] Logs escrevem em arquivo + stdout
  - [ ] Rotating logs configurado
  - [ ] Log levels: info, warn, error

- [ ] Error tracking
  - [ ] Sentry configurado
  - [ ] Environment = "production"
  - [ ] Release version identificado
  - [ ] Source maps carregados

### Database (Bloqueador #3)
- [ ] PostgreSQL configurado (produção)
  - [ ] DATABASE_URL válida
  - [ ] Backup automático ativado
  - [ ] Connection pooling (pgBouncer ou similar)
  - [ ] Índices adicionados:
    - [ ] users(email) - para auth
    - [ ] bookings(therapistId, clientId)
    - [ ] trails(authorId)
    - [ ] therapistProfiles(userId)

- [ ] Migrations rodadas
  - [ ] `npx prisma migrate deploy` executado
  - [ ] Schema validado
  - [ ] Seed data (se necessário) rodado

- [ ] Backup strategy
  - [ ] Full backup diário
  - [ ] Point-in-time recovery configurado
  - [ ] Restauração testada

---

## 🟡 PRÉ-DEPLOYMENT (IMPORTANTE)

### Configuração
- [ ] `.env.production` criado e validado
  - [ ] NEXTAUTH_URL configurada
  - [ ] NEXTAUTH_SECRET ≥ 32 chars
  - [ ] Database credentials seguros
  - [ ] API keys (SendGrid, Google, etc) configuradas
  - [ ] Sem secrets commitados

- [ ] DNS/CNAME
  - [ ] Domínio apontando para Vercel/servidor
  - [ ] HTTPS/TLS ativado
  - [ ] Certificate válido

- [ ] Environment variables secrets
  - [ ] Usar Vercel Secrets ou AWS Secrets Manager
  - [ ] Nunca em arquivos versionados
  - [ ] Rotação de secrets planejada

### Monitoring & Alerting
- [ ] Uptime monitoring
  - [ ] Pingdom ou similar configurado
  - [ ] Alertas de downtime
  - [ ] Teste de status page

- [ ] Performance monitoring
  - [ ] New Relic ou Datadog (opcional)
  - [ ] Database query monitoring
  - [ ] API response times

- [ ] Error alerting
  - [ ] Sentry alerts configurados
  - [ ] Slack notifications (se aplicável)
  - [ ] Email para críticos

### Compliance
- [ ] LGPD compliance
  - [ ] Termos & Privacidade publicados
  - [ ] Data deletion working
  - [ ] GDPR request handlers (se EU)

- [ ] Email compliance
  - [ ] Unsubscribe links em emails
  - [ ] DKIM/SPF/DMARC configurado
  - [ ] CAN-SPAM compliance

---

## 🟢 POST-DEPLOYMENT (RECOMENDADO)

### Testing
- [ ] E2E tests criados (Playwright)
  - [ ] Auth flow (signup, email verify, signin)
  - [ ] Booking flow (search, create, pay, cancel)
  - [ ] Trails flow (create, enroll, complete)
  - [ ] Admin flow (approve therapist, user management)

- [ ] Load testing (k6 ou Artillery)
  - [ ] Testar 1000+ concurrent users
  - [ ] Verificar database bottlenecks
  - [ ] Cache strategy

### Performance
- [ ] Performance audit (Lighthouse)
  - [ ] FCP < 2.5s
  - [ ] LCP < 2.5s
  - [ ] CLS < 0.1
  - [ ] TTL < 1.5s

- [ ] Bundle analysis
  - [ ] Verificar tamanho do JS
  - [ ] Lazy loading configurado
  - [ ] Code splitting otimizado

- [ ] Database optimization
  - [ ] Slow query log revisar
  - [ ] Índices estar funcionando
  - [ ] N+1 queries eliminadas

### Security
- [ ] OWASP Top 10 review
  - [ ] SQL Injection (Prisma: ✅)
  - [ ] Broken Authentication (NextAuth: ✅)
  - [ ] Sensitive data exposure (TLS: 🔄)
  - [ ] Broken access control (Auth checks: ✅)
  - [ ] Security misconfiguration (Headers: 🔄)
  - [ ] XXE, Broken auth, XXE, Insecure deserial, etc

- [ ] Penetration testing (futuro)
  - [ ] Contratar security firm
  - [ ] Focus: Auth, payment, admin
  - [ ] Remediate findings

---

## 📋 Deployment Checklist

### Pré-Deploy
```bash
# 1. Cleanup
git clean -fd
npm ci --only=production

# 2. Lint & Type Check
npm run lint
npx tsc --noEmit

# 3. Build
npm run build
# Verificar: "Compiled successfully"

# 4. Migrate
npx prisma migrate deploy

# 5. Seed (se necessário)
npx prisma db seed
```

### During Deploy
- [ ] Zero-downtime deployment
- [ ] Blue-green se possível
- [ ] Health checks ligado
- [ ] Rollback plan ready

### Post-Deploy
- [ ] Smoke tests (verificar principais endpoints)
- [ ] User signup test
- [ ] Email verification test
- [ ] Booking creation test
- [ ] Monitor logs por 1h
- [ ] Notify stakeholders

---

## 🔄 Deployment Strategy (Recomendado)

### Opção 1: Vercel (Recomendado)
- Automático ao fazer push em `main`
- Staging em pull requests
- Preview deployments
- Edge functions para rate limiting

```bash
# Setup
npm install -g vercel
vercel login
vercel link

# Deploy
vercel --prod
```

### Opção 2: Docker + AWS/GCP
- Container: `Dockerfile`
- Registry: ECR/Artifact Registry
- Orquestração: ECS/Cloud Run
- Load balancing: ALB/Cloud Load Balancer

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📊 Métricas de Sucesso

### Availability
- [ ] Uptime ≥ 99.5%
- [ ] Response time < 500ms (p95)
- [ ] Error rate < 0.1%

### Performance
- [ ] FCP < 2.5s
- [ ] LCP < 2.5s
- [ ] Database query < 100ms (p95)

### Security
- [ ] Zero security incidents 1º mês
- [ ] All headers presentes
- [ ] Rate limiting funcionando
- [ ] Zero SQL injections

### User Experience
- [ ] Email delivery > 99%
- [ ] Auth success rate > 99%
- [ ] Booking completion > 80%

---

## 📞 Suporte & Escalation

### Contacts
- [ ] Devops engineer on-call
- [ ] Database admin contact
- [ ] Security officer contact
- [ ] Product manager escalation

### Runbooks
- [ ] Database backup recovery
- [ ] Service restart procedure
- [ ] Secrets rotation
- [ ] Incident response

### Communication
- [ ] Status page (status.senda.app)
- [ ] Slack channel for alerts
- [ ] Incident post-mortems
- [ ] Weekly metrics review

---

**Última Atualização:** 2026-01-03  
**Status:** 🟡 Aguardando Implementação das Ações Críticas  
**Tempo Estimado:** 5-7 horas adicionais

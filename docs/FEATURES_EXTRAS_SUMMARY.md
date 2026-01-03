# Sprint Planning - Features Extras

## 🎯 Quick Reference

### Items Propostos + Sprint Recomendada

```
1. Espaço de Anúncios             → Sprint 5
2. Admin Panel                     → Sprint 3 ⚠️ BLOQUEADOR
3. Convites em Massa              → Sprint 4
4. Documentos de Verificação      → Sprint 3 ⚠️ BLOQUEADOR
5. Assinatura para Prestadores    → Sprint 5
6. Marketplace de Produtos        → Sprint 6
7. Solicitar Terapia Nova         → Sprint 3 (add-on)
8. Página About                   → Sprint 4
9. Termos & Condições             → Sprint 3 ⚠️ BLOQUEADOR (legal)
```

---

## 📊 Timeline Recomendada

```
┌─────────────────────────────────────────────────────────────┐
│ SPRINT 3 (3-4 semanas) - SEGURANÇA + COMPLIANCE             │
├─────────────────────────────────────────────────────────────┤
│ ✅ Admin Panel                    (2-3 sem)                 │
│ ✅ Documentos de Verificação      (2-3 sem)                 │
│ ✅ Termos & Condições             (2-3 sem)                 │
│ ✅ Solicitar Terapia Nova         (5-7 dias) - ADD-ON       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SPRINT 4 (3-4 semanas) - POLIMENTO + OPS                    │
├─────────────────────────────────────────────────────────────┤
│ ✅ Espaços B2B (original roadmap)  (3-4 sem)                │
│ ✅ Convites em Massa              (2-3 sem)                 │
│ ✅ Página About                   (3-5 dias)                │
│ ✅ Sistema de Notícias (admin)    (1-2 sem) - ADD-ON        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SPRINT 5 (3-4 semanas) - TRILHAS + MONETIZAÇÃO              │
├─────────────────────────────────────────────────────────────┤
│ ✅ Trilhas de Cuidado (original)   (3-4 sem)                │
│ ✅ Sistema de Anúncios            (3-4 sem)                 │
│ ✅ Assinatura para Prestadores    (3-4 sem)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ SPRINT 6 (4-5 semanas) - EXPANSÃO                           │
├─────────────────────────────────────────────────────────────┤
│ ✅ Marketplace de Produtos        (4-5 sem)                 │
│ ✅ Analytics avançado             (2-3 sem)                 │
│ ✅ API pública                    (2-3 sem)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚨 Bloqueadores (deve fazer antes de produção)

| Item | Razão | Timeline |
|------|-------|----------|
| Admin Panel | Gerenciar terapeutas, usuários, configurações | Sprint 3 |
| Documentos de Verificação | Compliance, segurança dos usuários | Sprint 3 |
| Termos & Condições | Proteção legal, LGPD | Sprint 3 |

---

## 💰 Potencial de Receita

| Feature | Model | Potencial |
|---------|-------|-----------|
| Assinatura | SaaS (R$49-149/mês) | Alto |
| Anúncios | Pay-per-placement | Médio |
| Marketplace | Commission (5-10%) | Alto |
| Produtos | Commission (5-15%) | Médio |

**Total anual potencial:** R$ 150k - R$ 500k+ (escala)

---

## 📋 Dependências Entre Items

```
Sprint 1 (done)
    ↓
Sprint 2 (done) ← Necessário para tudo abaixo
    ↓
Sprint 3
├─ Admin Panel (precisa de User roles)
├─ Doc Verification (precisa de upload, admin)
├─ T&Cs (standalone, mas preferível com admin)
└─ Solicitar Terapia (precisa de admin approval)
    ↓
Sprint 4
├─ Espaços B2B (precisa de pagamento, agendamentos)
├─ Convites em Massa (precisa de admin + email)
└─ About Page (standalone)
    ↓
Sprint 5
├─ Anúncios (precisa de pagamento + admin)
├─ Assinatura (precisa de pagamento)
└─ Trilhas (features separadas, standalone)
    ↓
Sprint 6
└─ Marketplace (precisa de pagamento)
```

---

## ✨ Wins Rápidos (Sprint 3 extras)

Se tiver tempo após os bloqueadores:
- **About Page** (5-7 dias) - Marketing
- **Solicitar Terapia** (5-7 dias) - UX improvement
- **Notícias do Admin** (5-7 dias) - Engagement

---

## 📞 Contatos + Necessidades Externas

Para implementar tudo, você vai precisar de:

1. **Legal Consultant** - Termos & Condições (item #9)
2. **DevOps/Cloud** - S3, armazenamento seguro (item #4)
3. **Designer** - UI para novos painéis (items #2, #3)
4. **QA** - Testes de compliance (item #4, #9)

---

## 🔄 Próximos Passos

1. ✅ Revisar esta análise
2. 📋 Confirmar prioridades com time
3. 🎯 Estimar velocidade do time
4. 📅 Alocar sprints e recursos
5. ▶️ **Começar Sprint 3** com admin + verificação

---

**Análise completa:** Veja [FEATURE_ANALYSIS.md](FEATURE_ANALYSIS.md)

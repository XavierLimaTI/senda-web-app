# 📋 Roadmap Visual - Senda 2026

## Sprint Status Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SENDA DEVELOPMENT ROADMAP                           │
│                              January 2026 →                                  │
└─────────────────────────────────────────────────────────────────────────────┘

COMPLETED ✅
═══════════════════════════════════════════════════════════════════════════════

Sprint 1: Foundation
├─ ✅ Setup Next.js + Tailwind (Design System: Areia, Sálvia, Terracota, Dourado)
├─ ✅ Prisma ORM + Database Schema
├─ ✅ NextAuth Integration (Email/Password + Google OAuth)
├─ ✅ Email Verification System (24h tokens)
├─ ✅ Multi-role Onboarding (CLIENT, THERAPIST, SPACE, ADMIN)
├─ ✅ Automatic Profile Creation
└─ ✅ E2E Test Scripts

Sprint 2: B2C Marketplace
├─ ✅ Service Management (Create/Edit/Delete)
├─ ✅ Availability Calendar (Weekly blocks)
├─ ✅ Slot Calculation API (Dynamic schedule)
├─ ✅ Therapist Public Profile
├─ ✅ Booking Flow (4-step wizard)
├─ ✅ Payment Integration (Asaas: Card, PIX, Boleto)
├─ ✅ Client Dashboard (Upcoming, History)
├─ ✅ Therapist Dashboard (Today, Earnings, Metrics)
├─ ✅ Favorites System (Button, Page, API)
└─ ✅ Notifications System (Bell, Dropdown, API)

IN PROGRESS 🚧
═══════════════════════════════════════════════════════════════════════════════
(None - Waiting for Sprint 3 kickoff)

PLANNED 📋
═══════════════════════════════════════════════════════════════════════════════

Sprint 3: Security + Admin + Legal  [Est. 3-4 weeks]
├─ 🔲 Admin Dashboard
│  ├─ User Management
│  ├─ Therapist Approval Workflow
│  ├─ News Management
│  └─ Settings Panel
├─ 🔲 Document Verification System
│  ├─ Upload Zone
│  ├─ Document Types (Diploma, ID, Address, Photos)
│  ├─ Admin Review Queue
│  └─ Approval/Rejection with Feedback
├─ 🔲 Terms & Conditions + Policies
│  ├─ T&Cs Editor (Versioning)
│  ├─ Privacy Policy
│  ├─ Cancellation Policy
│  ├─ Acceptance Tracking
│  └─ LGPD Compliance
├─ 🔲 Request New Therapy Type
│  ├─ Therapist Request Form
│  └─ Admin Approval Queue
└─ ⏱️ Estimated Points: ~55

Sprint 4: B2B + Operations  [Est. 3-4 weeks]
├─ 🔲 Therapeutic Spaces (B2B)
│  ├─ Room Management
│  ├─ Space Marketplace
│  ├─ Hourly Reservation
│  ├─ Auto Split System
│  └─ Space Dashboard
├─ 🔲 Bulk Invitation System
│  ├─ Email/WhatsApp/Social Invites
│  ├─ CSV Upload
│  ├─ Template Editor
│  └─ Tracking Dashboard
├─ 🔲 About Page
│  ├─ Story & Mission
│  ├─ Team Page
│  ├─ Contact Form
│  └─ FAQ
├─ 🔲 News System (from Admin)
└─ ⏱️ Estimated Points: ~45

Sprint 5: Trails + Monetization  [Est. 3-4 weeks]
├─ 🔲 Care Trails (Trilhas de Cuidado)
│  ├─ Trail CRUD
│  ├─ Lesson Editor (Text, Audio, Video)
│  ├─ Progress Tracking
│  ├─ Admin Approval
│  └─ Player UI
├─ 🔲 Advertisement System
│  ├─ Package Selection
│  ├─ Ad Creation
│  ├─ Placement Management
│  ├─ Analytics (Impressions, CTR)
│  └─ Homepage Banner Widget
├─ 🔲 Provider Subscription Plans
│  ├─ Freemium Model
│  ├─ Recurring Billing
│  ├─ Feature Flags by Plan
│  ├─ Upgrade/Downgrade Flow
│  └─ Subscription Dashboard
└─ ⏱️ Estimated Points: ~65

Sprint 6+: Expansion  [Est. 4-5 weeks each]
├─ 🔲 Marketplace de Produtos
│  ├─ Product Listing
│  ├─ Shopping Cart
│  ├─ Checkout
│  ├─ Shipping Integration
│  └─ Vendor Dashboard
├─ 🔲 Advanced Analytics
├─ 🔲 Public API
└─ 🔲 Mobile App (React Native/Flutter)

BACKLOG 📚
═══════════════════════════════════════════════════════════════════════════════
├─ Google Calendar Sync
├─ SMS Notifications
├─ In-app Chat (Client ↔ Therapist)
├─ Reviews & Ratings
├─ Affiliate Program
├─ White-label Platform
└─ Multi-language Support
```

---

## 🎯 Critical Path

```
┌─────────────────────────────────────────────────────────────────┐
│ FOR PRODUCTION LAUNCH (Before inviting real therapists)         │
├─────────────────────────────────────────────────────────────────┤
│ 1. ✅ Payment System Working                                    │
│ 2. ✅ Booking Flow Complete                                     │
│ 3. 🔲 Admin Panel (to verify therapists)                       │
│ 4. 🔲 Document Verification (compliance)                        │
│ 5. 🔲 Terms & Conditions (legal protection)                    │
└─────────────────────────────────────────────────────────────────┘

Timeline to Production: ~2-3 weeks (Sprint 3 critical items)
```

---

## 📊 Team Allocation Suggestion

```
CURRENT SETUP (1 Full-Stack Dev):
└─ Continue with focused sprints (1-2 weeks each)
   └─ Prioritize admin + verification (blocker for production)

RECOMMENDED TEAM (2-3 devs):
├─ Dev 1: Backend APIs (Admin, Verification, Billing)
├─ Dev 2: Frontend (UI for new features)
└─ Dev 3 (part-time): DevOps (S3, deployments, monitoring)

+ External Help Needed:
├─ Legal: T&Cs, Privacy Policy, LGPD compliance
└─ Designer: UI/UX for admin panels, new features
```

---

## 🚀 Metrics to Track

```
Development Velocity:
├─ Story Points/Week (Target: 15-20 for 1 dev)
├─ Bugs Fixed/Week (Target: < 2)
└─ Code Coverage (Target: > 70%)

Product Metrics:
├─ Therapists Verified (Target: 100+ before launch)
├─ Bookings/Week (Target: exponential growth)
├─ Payment Success Rate (Target: > 98%)
└─ Customer Support Tickets (Target: < 5/week)
```

---

## 📅 Key Dates

- **Sprint 3 Start:** Immediately (Week of Jan 6, 2026)
- **Admin + Verification Done:** ~Jan 27, 2026
- **T&Cs + Legal Review:** ~Feb 3, 2026
- **Production Launch:** ~Feb 10, 2026 (After Sprint 3)
- **Beta Therapists Onboarding:** Feb 10-20, 2026
- **Public Launch:** March 2026 (After Sprint 4)

---

## 📞 Decision Points

### 1. Document Storage
- **Option A:** AWS S3 (AWS account needed, ~$10-50/month)
- **Option B:** Local `/public` folder (free, limited scalability)
- **Decision:** S3 for security (documents are sensitive)

### 2. Legal Review
- **Need:** Specialist lawyer for LGPD compliance (T&Cs)
- **Cost:** ~R$2,000-5,000
- **Timeline:** 1-2 weeks
- **Action:** Hire before Sprint 3

### 3. Asaas vs Stripe
- **Current:** Asaas working well for Brazil
- **Future:** Add Stripe for international (Sprint 6)
- **Decision:** Keep Asaas for now, add Stripe later

### 4. Admin Authentication
- **Recommendation:** Use existing ADMIN role in User model
- **Action:** Add role check middleware for `/admin/*` routes

---

## ✅ Pre-Production Checklist

- [ ] Admin panel fully functional
- [ ] Therapist verification working
- [ ] All T&Cs reviewed by lawyer
- [ ] Security audit (SQL injection, CSRF, XSS)
- [ ] Database backup strategy
- [ ] Monitoring & alerting setup
- [ ] Support email/chat ready
- [ ] Documentation for therapists/clients
- [ ] Testable by 5-10 beta users
- [ ] Payment system tested end-to-end

---

## 🎉 Success Metrics (6 months)

```
Users:
├─ 200+ registered therapists
├─ 500+ active clients
└─ 50+ sessions/week

Revenue:
├─ R$ 50k MRR (monthly recurring)
├─ Therapist satisfaction > 4.5/5
└─ Client NPS > 40

Technical:
├─ 99.5% uptime
├─ < 2s average response time
└─ Zero data breaches
```

---

**Last Updated:** January 3, 2026  
**Next Review:** January 13, 2026 (Sprint 3 kickoff)

---

**Quick Links:**
- [Full Feature Analysis](FEATURE_ANALYSIS.md)
- [Sprint Summary](FEATURES_EXTRAS_SUMMARY.md)
- [SendaDOC (Operations Guide)](SendaDOC.md)
- [Sprint 2 Plan](SPRINT2_PLAN.md)

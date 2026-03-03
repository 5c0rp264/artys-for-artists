# Artys Music — Homepage

## 🎯 Vue d'ensemble

Homepage de la première plateforme de streaming équitable. Reproduit fidèlement le design HTML source avec la stack technique Next.js 15, GSAP, Lenis et next-intl.

## 🌐 URLs

- **Dev Preview**: https://3000-iavfnjcp6funppdkdh8no-a402f90a.sandbox.novita.ai/fr
- **FR**: `/fr` | **EN**: `/en` | **ES**: `/es`
- **API Waitlist**: `POST /api/waitlist`

## ✅ Fonctionnalités implémentées

### Design System Artys
- **Fonts** : Jost (Futura fallback) — BLACK (900) pour titres, EXTRA BOLD (800) sous-titres, Inter pour corps
- **Couleurs** : `#000000` bg · `#00e5b0` accent vert · `#D9D9D9` secondaire · `#ff4d4d` urgence
- **Bordures** : `#1f1f1f` · Cards : `#111111`

### Animations & Effets
- ✅ **Grain texture** SVG animé (overlay cinématographique)
- ✅ **Cursor glow** vert suivant la souris
- ✅ **Smooth scroll** Lenis premium
- ✅ **Word Split Hero** (H1 GSAP stagger 0.08s)
- ✅ **Text reveal au scroll** (gris → blanc progressif GSAP)
- ✅ **Count-up Stats** (ScrollTrigger, easing power2.out)
- ✅ **Fade-in sections** (GSAP ScrollTrigger)
- ✅ **Urgence pulse** (section CTA, animation fond)
- ✅ **Ring rotation** (Gouvernance, 40s linear)
- ✅ **Mock phone** (perspective 3D, slide-in)

### Sections (7)
1. **Hero** — H1 split word, kicker badge, waveform, stats bar
2. **Problème** — Cards rouge, bloc IA, texte muted
3. **Comparaison** — Table full responsive, callout cards count-up
4. **Backstage Guilds** — Features + Mock UI (missions, revenus)
5. **Gouvernance** — Federation ring, college nodes, membership cards
6. **CTA** — Formulaire email, pulse background urgence
7. **Footer** — 4 colonnes, socials, liens légaux

### Internationalisation
- ✅ **FR / EN / ES** — 100% traduit (messages/*.json)
- ✅ **next-intl** avec routing `/[locale]`
- ✅ **LangSwitcher** discret top-right nav
- ✅ **Détection automatique** via Accept-Language

### Formulaire & API
- ✅ **React Hook Form** + Zod validation
- ✅ **API route** `POST /api/waitlist`
- ⏳ **Supabase** (à brancher — structure prête)
- ⏳ **Resend** (à brancher — structure prête)

## 🏗️ Architecture

```
artys-for-artists/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx       # Layout SSR par locale (Jost + Inter)
│   │   └── page.tsx         # Page principale
│   ├── api/waitlist/        # API capture emails
│   ├── globals.css          # Design system complet
│   └── layout.tsx           # Root layout
├── components/
│   ├── effects/
│   │   ├── CursorGlow.tsx   # Cursor glow vert
│   │   └── SmoothScroll.tsx # Lenis smooth scroll
│   ├── sections/
│   │   ├── Navbar.tsx       # Nav fixe + mobile
│   │   ├── HeroSection.tsx  # Hero complet
│   │   ├── ProblemSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── BackstageSection.tsx
│   │   ├── GovernanceSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── StatCard.tsx     # Chiffre + count-up
│       ├── NarrativeBlock.tsx # Text reveal GSAP
│       └── LangSwitcher.tsx
├── i18n/
│   ├── request.ts
│   └── routing.ts
├── messages/
│   ├── fr.json
│   ├── en.json
│   └── es.json
└── proxy.ts                 # next-intl routing
```

## 🚀 Stack Technique

| Outil | Version | Rôle |
|-------|---------|------|
| Next.js | 16.x | SSR/SSG, App Router, React 19 |
| Tailwind CSS | v4 | Styling utilitaire |
| GSAP + ScrollTrigger | 3.x | Animations premium |
| @gsap/react | latest | Hook useGSAP |
| Lenis | latest | Smooth scroll |
| next-intl | latest | i18n FR/EN/ES |
| React Hook Form | 7.x | Formulaire email |
| Zod | 3.x | Validation |

## 📊 Data & Stockage

- **Waitlist emails** → API route (prête pour Supabase)
- **Aucune donnée persistée** en local — tout est statique

## 🧑‍💻 Guide développeur

```bash
# Développement
npm run dev          # Vite dev server port 3000

# Production build
npm run build
npm start

# PM2 (sandbox)
pm2 start ecosystem.config.cjs
pm2 logs artys --nostream
```

## 🎨 Prochaines étapes recommandées

1. **Brancher Supabase** — table `waitlist(id, email, locale, created_at)`
2. **Brancher Resend** — email de confirmation à l'inscription
3. **Déployer sur Vercel** — `vercel deploy`
4. **OG Images** — `@vercel/og` par locale
5. **Analytics** — Vercel Analytics ou Plausible
6. **A/B testing** — 2 variants du Hero

## 📅 Statut

- **Build** : ✅ Zéro erreur, zéro warning
- **Routes i18n** : ✅ 200 OK sur FR/EN/ES
- **Console JS** : ✅ Propre
- **Dernière mise à jour** : Mars 2026

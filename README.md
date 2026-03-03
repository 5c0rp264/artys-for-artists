# Artys Music — Homepage

## Overview

Landing page for the first fair streaming platform. Built with React 19, Vite, GSAP, Lenis smooth scroll, and a custom lightweight i18n system (FR/EN/ES). Produces a static HTML/JS/CSS build — no backend required.

## URLs

- **FR**: default | **EN**: switch via lang selector | **ES**: switch via lang selector

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | 19 | UI framework |
| Vite | 6.x | Build tool & dev server |
| Tailwind CSS | v4 | Utility styling |
| GSAP + ScrollTrigger | 3.x | Premium animations |
| @gsap/react | latest | useGSAP hook |
| Lenis | latest | Smooth scroll |
| React Hook Form | 7.x | Waitlist form |
| Zod | 3.x | Validation |

## Architecture

```
artys-for-artists/
├── src/
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # App shell with providers
│   ├── globals.css             # Design system
│   ├── vite-env.d.ts           # Vite type declarations
│   ├── i18n/
│   │   ├── I18nProvider.tsx    # React context i18n
│   │   └── useTranslations.ts  # Drop-in useTranslations hook
│   ├── messages/
│   │   ├── fr.json
│   │   ├── en.json
│   │   └── es.json
│   └── components/
│       ├── effects/
│       │   ├── CursorGlow.tsx
│       │   └── SmoothScroll.tsx
│       ├── sections/
│       │   ├── Navbar.tsx
│       │   ├── HeroSection.tsx
│       │   ├── ProblemSection.tsx
│       │   ├── ComparisonSection.tsx
│       │   ├── BackstageSection.tsx
│       │   ├── GovernanceSection.tsx
│       │   ├── CTASection.tsx
│       │   └── Footer.tsx
│       └── ui/
│           ├── StatCard.tsx
│           ├── NarrativeBlock.tsx
│           └── LangSwitcher.tsx
├── public/                     # Static assets (logos, GIF)
├── index.html                  # Vite entry HTML
├── vite.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── .github/workflows/ci-cd.yml
```

## Development

```bash
npm install
npm run dev          # Vite dev server on port 5173

npm run build        # Type-check + production build → dist/
npm run preview      # Preview production build locally

npm run lint         # ESLint
npm run typecheck    # TypeScript check
```

## CI/CD

GitHub Actions pipeline (`.github/workflows/ci-cd.yml`):

1. **lint** — ESLint + TypeScript type-check
2. **build** — `npm run build` produces `dist/`
3. **deploy** — FTP deploys `dist/` to production server (main branch only, FTPS)
4. **notify** — SMS notifications via Free Mobile API on success/failure

### Required Secrets

| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | FTP host |
| `FTP_USERNAME` | FTP user |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | Target directory on server |
| `FREE_MOBILE_USER` | Free Mobile SMS API user (optional) |
| `FREE_MOBILE_PASS` | Free Mobile SMS API password (optional) |

GitHub environment: `dev`

## i18n

Locale detection: `navigator.language` → `localStorage` persistence. No URL-based routing — language switch is instant via React state. Supported: FR (default), EN, ES.

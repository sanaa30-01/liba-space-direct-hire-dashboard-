# JobNova Landing Page — Design Challenge UI Update

This repository contains the **JobNova** direct-hire dashboard. The work documented here is a **UI-only redesign** of the marketing landing page, completed as part of a **design challenge**. No backend APIs, auth flows, or job-matching logic were changed—only layout, styling, motion, and front-end presentation.

**Primary commit:** `5d447ed` — `feat(landing): redesign testimonials, FAQ, CTA, and feature previews`

---

## Purpose

The goal was to align key homepage sections with provided high-fidelity mockups: interactive feature previews, refreshed “Why” stats, tabbed testimonials, a searchable FAQ, and a bold closing CTA. All changes use the existing **JobNova design tokens** (`src/tokens.css`)—lime accent, Plus Jakarta Sans / Inter typography, and neutral surfaces—so the page stays on-brand rather than introducing a separate visual system.

---

## What Changed (Summary)

| Area | Before | After |
|------|--------|--------|
| **Features** | Static / Lottie-only previews for some tabs | Scroll-pinned section with three custom **animated workstation** UIs (AI Agent, Resume, Auto Apply) |
| **Why** | Generic stat cards | Lime icon tiles, fourth stat **`∞`**, updated card styling |
| **Testimonials** | Three static quote cards in a grid | Interactive **Zoom / Canva / Microsoft** tabs, quote + dark metrics column, logo marquee, global stats row |
| **FAQ** | Basic list | Badge header, highlighted title, **search**, category chips, accordion + “Still curious?” sidebar |
| **CTA** | Simple card: “Stop applying. Start getting hired.” | Full-bleed section: dot grid, glow, **rotating headline** words, floating activity badges, pill CTA with arrow |
| **Global styles** | Partial section styles | Large `style.css` expansion for new BEM-style class names |

**Unchanged in this pass:** Hero, Nav, Pricing, Footer, and all `/jobs` app routes (dashboard, auto-apply modals, etc.).

---

## Section-by-Section Detail

### 1. Features — Animated product previews

The Features section still uses **scroll position** to advance through four feature stories (Instant Notification keeps the existing Lottie animation). Three tabs now mount dedicated React “workstation” graphics instead of placeholder content:

1. **AI Agent Support** — “A career advocate that never clocks out”  
   - Carousel-style advocate UI with scripted cursor movement  
   - ~18s loop; `CareerAgentGraphic.tsx` + `advocateAnimation.ts` + `agent-workstation.css`

2. **AI Resume Customizer** — “100% ATS-optimized, 0% effort”  
   - JD scan → keyword highlights → tailor → ATS score flow  
   - ~20s loop; smooth scan beam; `ResumeCustomizerGraphic.tsx` + `resumeAnimation.ts` + `resume-workstation.css`

3. **AI Auto Apply** — “300+ jobs applied while you live your life”  
   - Criteria → scan → apply → submitted sequence  
   - ~19.5s loop; `AutoApplyGraphic.tsx` + `autoApplyAnimation.ts` + `auto-apply-workstation.css`

**Performance choices**

- Only the **active** feature preview is mounted (avoids three simultaneous animation loops).
- Shared **`FeatureCursor`** with **`useSmoothedCursor`** for fluid pointer motion without layout thrashing.
- Shared timing hooks: `useFeatureClock.ts`, `useAdvocateClock.ts`.

**Files:** `src/components/Features.tsx`, `src/components/features/*`, workstation CSS files, `src/app/layout.tsx` (imports workstation stylesheets).

---

### 2. Why — Stat cards

Four benefit cards with:

- Lime-tinted **icon boxes** (replacing prior indigo accent treatment).
- Bold metrics: **90%**, **3x**, **300+**, and **∞** for “insider-only opportunities.”
- Updated spacing, borders, and scroll fade-in classes.

**Files:** `src/components/Why.tsx`, `.why-*` rules in `src/style.css`.

---

### 3. Testimonials — Tabbed success stories

Rebuilt from a 3-column static grid to match the challenge mockups:

- Centered header: **TESTIMONIALS** badge, “Trusted by **Talent** Worldwide” with lime highlight, subtitle.
- **Company tabs:** Zoom, Canva, Microsoft — switching updates quote card and stats.
- **Left:** Quote card (large quote mark, 5 stars, “Verified hire”, headline, body, avatar, **Read story ↗**).
- **Right:** Dark “Hired at” hero stat + three mini metrics (time to offer, applications / match / interviews, etc.).
- **Footer strip:** Infinite **marquee** of company names (Canva, Microsoft, Stripe, Figma, …).
- **Global stats:** 12,400+ successful hires · 94% land an interview · 4.9★ avg. rating.

**Files:** `src/components/Testimonials.tsx` (client component), `.testimonials-*` in `src/style.css`.  
**Assets:** `public/img/testimonials/zoom.svg`, `microsoft.svg`; Canva uses an inline brand mark.

---

### 4. FAQ — Searchable help center

Full layout redesign:

- Lime **FAQ** badge and title with highlighted “**questions?**”
- **Search** input filtering questions in real time
- **Category filters:** All, Getting started, Matching & jobs, Billing, Alerts, Support
- Numbered **accordion** with “Popular” badges; one item open at a time
- Dark **“Still curious?”** sidebar with support CTA

**Files:** `src/components/Faq.tsx` (client component), `.faq-*` in `src/style.css`.  
**Dependency:** `lucide-react` icons (already in project).

---

### 5. CTA — “Stop … Start getting hired”

Replaced the gray rounded card with a full-width marketing block:

- **Dot-grid** background and soft **lime radial glow**
- **Rotating first line:** stressing → refreshing → applying → waiting (lime highlight behind the active word)
- **Italic serif “getting”** on line two; **HIRED.** on line three
- **Live pill:** application count that ticks upward
- **Floating badges** (e.g. Senior PM @ Stripe, Applied · 2s ago, Interview booked, Scanning roles) — hidden on narrow viewports
- Black pill button **“Let AI Apply for Me”** with lime circle + arrow
- Trust line: ✦ No credit card · Setup in 60 seconds · Cancel anytime

**Files:** `src/components/Cta.tsx` (client component), `.cta-*` in `src/style.css`.  
Hero still uses the separate `.cta-btn` class for “Start for Free.”

---

## New & Modified Files

```
src/
├── agent-workstation.css          # AI Agent graphic styles
├── auto-apply-workstation.css     # Auto Apply graphic styles
├── resume-workstation.css         # Resume graphic styles
├── app/layout.tsx                 # Imports workstation CSS globally
├── components/
│   ├── Cta.tsx                    # Redesigned (client)
│   ├── Faq.tsx                    # Redesigned (client)
│   ├── Features.tsx               # Wires in new graphics + durations
│   ├── Testimonials.tsx           # Redesigned (client)
│   ├── Why.tsx                    # Stat copy + structure tweaks
│   └── features/
│       ├── AutoApplyGraphic.tsx
│       ├── CareerAgentGraphic.tsx
│       ├── ResumeCustomizerGraphic.tsx
│       ├── FeatureCursor.tsx
│       ├── advocateAnimation.ts
│       ├── autoApplyAnimation.ts
│       ├── resumeAnimation.ts
│       ├── useAdvocateClock.ts
│       ├── useFeatureClock.ts
│       └── useSmoothedCursor.ts
└── style.css                      # Testimonials, FAQ, CTA, Why, Features layout
```

**Dependency note:** `lucide-react` is used for FAQ, Testimonials, and CTA icons. `@lottiefiles/react-lottie-player` remains for the Instant Notification feature.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port Next.js prints). Scroll through **Features**, **Testimonials**, **FAQ**, and the bottom **CTA** to see the challenge UI.

```bash
npm run build   # production build
npm start       # run production server
```

---

## Design Challenge Scope (Explicit Non-Goals)

To keep the submission focused on visual and interaction design:

- No new REST endpoints or database changes
- No changes to subscription billing logic or `/jobs` workflows
- Placeholder links (`href="#"`) on marketing CTAs where the prod app would deep-link
- Testimonial avatars may use external image URLs from the original templates

---

## Fork & Upstream

If this repo is a **fork** of `Liba-Space/direct-hire-dashboard`, pushing to your fork’s `main` does not update the upstream org repo. Open a **pull request** from your fork → `Liba-Space/direct-hire-dashboard:main` when you want the design challenge work reviewed and merged upstream.

---

## Author Notes

This README describes the landing-page UI pass for design-challenge review. For product behavior inside the jobs dashboard (auto-apply modal, subscriptions, etc.), refer to existing app code under `src/app/jobs/` and prior commits on `main`.

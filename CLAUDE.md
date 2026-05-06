@AGENTS.md

---

# Project Overview

This is **hikaustav.design** — a portfolio site for a creative director & photographer based in Chicago. It is a production site. Be careful, precise, and minimal with every change.

---

# Stack Rules

## Next.js
- Use **App Router only** (`src/app/`). Never use Pages Router patterns.
- Server components are the default. Only add `"use client"` when the component needs browser APIs, event listeners, or GSAP.
- Never use `getServerSideProps`, `getStaticProps`, or `getInitialProps` — these are Pages Router patterns.

## TypeScript
- All files must be `.tsx` or `.ts`. Never write plain `.js` or `.jsx`.
- Always type props explicitly. No `any`.

---

# Styling Rules

- **Tailwind CSS v4 only.** Do not install or use any other CSS-in-JS or animation library for styling.
- Use the brand design tokens defined in `src/app/globals.css`:
  - `--color-brand-bg: #fafafa`
  - `--color-brand-text: #1f1f1f`
  - `--color-brand-tint: #f3f3f3`
- Never hardcode colors that conflict with these tokens.

## Fonts
Only these three fonts are loaded. Do not add new ones.
- **Inter** — body text, UI (`var(--font-inter)`)
- **Playfair Display** — display/headlines, italic only (`var(--font-display)`)
- **Geist Mono** — monospace accents (`var(--font-mono-alt)`)

---

# Animation Rules

- **GSAP only** for all motion. Do not install Framer Motion, React Spring, or any other animation library.
- Components that use GSAP must be client components (`"use client"`).
- Follow the patterns already established in `HeroParallax.tsx`, `FullWidthReveal.tsx`, and `MagneticButton.tsx`.

---

# Component Rules

- All shared UI components live in `src/app/components/`.
- Follow the existing naming convention: `PascalCase.tsx`.
- Do not create deeply nested component folders — keep it flat.
- Existing components:
  - `Navbar`, `Footer`, `MobileMenu`
  - `HomePreloader`
  - `HeroParallax`, `FullWidthReveal`
  - `MagneticButton`
  - `ServicesHover`
  - `TestimonialsParallax`, `TestimonialsSlider`

---

# Sanity & Content Rules

- All content comes from **Sanity**. Never hardcode content that belongs in the CMS.
- GROQ queries live in `src/sanity/queries.ts`. Add new queries there, never inline them in components.
- The Sanity client lives in `src/sanity/lib/client.ts`. Always import from there.
- Images from Sanity must use `@sanity/image-url` for URL building.
- The Sanity Studio is embedded at `/studio` — do not move or rename this route.

## Content Types (Sanity Schemas)
Do not create duplicate schemas. Existing types:
| Schema | Purpose |
|---|---|
| `siteSettings` | Contact email, socials, availability |
| `work` | Portfolio projects |
| `service` | Services offered |
| `newsPost` | News / journal posts |
| `testimonial` | Client testimonials |
| `milestone` | Career journey timeline |
| `discipline` | Areas of expertise |
| `contactSubmission` | Inbound contact form entries |

---

# Pages

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/projects` | `src/app/projects/page.tsx` |
| `/services` | `src/app/services/page.tsx` |
| `/news` | `src/app/news/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| `/studio` | Sanity Studio (do not touch) |

---

# General Guidelines

- This is a live portfolio site. Keep changes minimal and scoped — no refactoring beyond what the task requires.
- Do not add dependencies without asking first.
- Do not add comments unless the reason is genuinely non-obvious.
- Test scroll animations mentally against mobile viewports — GSAP ScrollTrigger behaves differently on touch devices.

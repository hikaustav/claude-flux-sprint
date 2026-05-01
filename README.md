# H.Studio — Portfolio Website

A modern, responsive portfolio website for **H.Studio** (hikaustav), built during an AI-accelerated design sprint. The site showcases brand identity work, web design, marketing, and photography services with a clean typographic aesthetic.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Design System](#design-system)
- [Sections](#sections)
- [Deployment](#deployment)

---

## Overview

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and developed in a rapid sprint using Claude AI and Figma MCP tooling. Designs were implemented pixel-accurately from Figma, adapting a 1440px desktop canvas to fully responsive layouts across mobile and desktop breakpoints.

**Live site:** [hikaustav.design](https://hikaustav.design) *(replace with actual URL)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Font | Inter (via `next/font`) |
| Design source | Figma (via Figma MCP) |
| Deployment | [Vercel](https://vercel.com) |

---

## Project Structure

```
claude-flux-sprint/
├── src/
│   └── app/
│       ├── page.tsx        # Main homepage (all sections)
│       ├── layout.tsx      # Root layout, font config
│       └── globals.css     # Base styles, Tailwind import
├── public/                 # Static assets
├── CLAUDE.md               # AI agent instructions
├── AGENTS.md               # Next.js version-specific agent rules
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/hikaustav/claude-flux-sprint.git
cd claude-flux-sprint
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Design System

- **Primary color:** `#1f1f1f` (near-black)
- **Background:** `#fafafa`
- **Accent:** `#f3f3f3` (section backgrounds)
- **Typography:** Inter, fluid `vw`-based sizing for headings
- **Breakpoints:** Mobile-first; `md:` (768px) separates mobile and desktop layouts
- **Spacing:** 16px horizontal padding mobile / 32px desktop (`px-4 md:px-8`)

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Full-viewport image with progressive blur overlay and navigation |
| **About** | Split layout with portrait and bio text |
| **Services** | Accordion-style list with hover image reveal (4 services) |
| **Works** | Project grid with tags — 4 featured projects |
| **Testimonials** | Scattered card layout (desktop) / horizontal peek slider (mobile) with brand logos |
| **News** | Horizontal scroll card slider (mobile) / right-anchored column (desktop) |
| **Footer** | Full-bleed H.Studio wordmark, legal links, and credits |

---

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers a production deployment.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

For environment variables or custom domains, configure them in the [Vercel dashboard](https://vercel.com/dashboard).

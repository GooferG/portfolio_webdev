# Luiz Meneghim — Portfolio Site Design Spec

**Date:** 2026-04-09  
**Status:** Approved

---

## Overview

A multi-page personal portfolio and services site for Luiz Meneghim — a web developer and AI engineer. The site serves two goals: showcase work/projects and convert visitors into clients for freelance services.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Blog | MDX files in `/content/blog/` |
| Contact form | Formspree (third-party, no custom API route, works with static export) |
| Deployment | Vercel (static export via `output: 'export'` in `next.config.js`) |
| Language | TypeScript |

---

## Color System

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#0A0F1E` | Page backgrounds |
| `bg-card` | `#0d1f2e` | Card / section backgrounds |
| `border` | `#1e3a4a` | Card borders, dividers |
| `accent` | `#00D4AA` | Primary accent — CTAs, highlights, icons |
| `accent-dim` | `#00D4AA18` | Accent fills (icon backgrounds) |
| `text-primary` | `#ffffff` | Headings |
| `text-secondary` | `#94a3b8` | Body copy |
| `text-muted` | `#64748b` | Labels, supporting text |

All colors defined as Tailwind custom tokens in `tailwind.config.ts`.

---

## Animation System

Level: **Medium**

- Smooth page transitions (Framer Motion `AnimatePresence`)
- Fade-in + slight upward slide on scroll (Intersection Observer via a `useInView` hook)
- Hover effects on cards (border color lift, subtle scale)
- Typing/cursor blink effect on hero tagline (`useEffect` character loop, no library)
- No animated number counters
- No parallax or particle backgrounds

---

## Site Structure

```
app/
  layout.tsx           ← shared Nav + Footer
  page.tsx             ← /  (Home)
  about/page.tsx       ← /about
  services/page.tsx    ← /services
  projects/page.tsx    ← /projects
  blog/
    page.tsx           ← /blog (post list)
    [slug]/page.tsx    ← /blog/[slug] (individual post)
  contact/page.tsx     ← /contact

content/
  blog/                ← MDX post files

public/
  images/
    luiz.jpg           ← hero photo
```

---

## Shared Components

### `<Nav />`
- Left: `LM.` logo in accent color, links to `/`
- Center: `Home · About · Services · Projects · Blog · Contact`
- Right: `Hire Me` pill button → `/contact`
- Sticky on scroll, backdrop blur on scroll past hero
- Collapses to hamburger on mobile

### `<Footer />`
- Left: `© 2026 Luiz Meneghim`
- Center: Social icon links (GitHub, LinkedIn, Twitter/X)
- Right: `Built with Next.js + Tailwind`
- Background: `#060b12`

---

## Pages

### `/` — Home

**Hero section**
- Full-viewport height
- Layout: text left, large photo right
- Photo occupies ~50% of viewport width, right-aligned
- Photo fades left into `#0A0F1E` via CSS `mask-image` linear gradient
- Subtle teal radial glow in top-left corner (`#00D4AA`, ~15% opacity)
- Text content (left column):
  - Small pill: `● HELLO, I AM` in accent color
  - Name: `Luiz Meneghim` — large, bold, white
  - Tagline with typing animation: `I build things for the web — and teach machines to think.` with blinking cursor
  - Two CTAs: `Hire Me` (accent filled pill) + `My Work` (ghost pill → `/projects`)
  - Row of 3 social icon buttons below CTAs
- **Service strip** anchored to bottom edge of hero:
  - Frosted glass bar (`bg-black/60 backdrop-blur`)
  - Scrolls: `I offer · Web Development · AI Consulting · LLM Engineering · Server Admin · Tech Assistance`
  - Auto-scrolls horizontally on mobile

**Below hero (on home page)**
- Brief "Featured Projects" section — 3 project cards pulled from projects data
- CTA strip: `Available for freelance work` → `/contact`

---

### `/about` — About Me

- Two-column layout: photo left, text right (stacked on mobile)
- Photo: same hero photo, styled with teal border accent
- Bio: 2–3 paragraphs about background, interests, approach
- **Skills grid**: icon + label chips for tech stack (React, Next.js, TypeScript, Python, LLMs, Docker, Linux, etc.)
- **"Available for freelance"** badge — teal pill, visible
- **Download CV** ghost button (links to `/luiz-cv.pdf` — file placed in `/public/luiz-cv.pdf`)

---

### `/services` — Services

- Page title + subtitle centered at top
- **5 service cards** in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile):
  1. **Web Development** — custom websites & web apps
  2. **Server & Hosting** — VPS, deployment, monitoring
  3. **AI Consulting & Implementation** — strategy + integration (marked "Popular")
  4. **LLM Engineering** — fine-tuning, RAG, prompt engineering, deployment
  5. **Tech Assistance** — smart home, AV/movie room, PC builds, general tech help
- Each card: teal icon box, title, 1–2 line description
- CTA below grid: `Get in Touch` → `/contact`

---

### `/projects` — Projects

- **Filter tabs**: `All · Web · AI / LLM · Apps` — client-side filter, no page reload
- **Project cards** in a 3-col grid (2-col tablet, 1-col mobile):
  - Screenshot/image area (top)
  - Title, tech stack tags
  - `GitHub` ghost button + `Live →` teal link
- **Placeholder cards** to start (3 cards):
  1. Small Business Website — Next.js, Tailwind, Vercel — category: Web
  2. LLM Fine-tune Pipeline — Python, HuggingFace, AWS — category: AI/LLM
  3. React Dashboard App — React, TypeScript, shadcn/ui — category: Apps
- Projects data lives in `/lib/projects.ts` as a typed array — easy to add real projects later

---

### `/blog` — Blog

- Post list: title, date, tag chips, excerpt, `Read More →` link
- Posts sourced from MDX files in `/content/blog/`
- Each post statically generated at build via `generateStaticParams`
- Individual post page (`/blog/[slug]`):
  - Title, date, reading time estimate
  - MDX rendered content with styled typography (Tailwind `prose`)
  - Back to Blog link

---

### `/contact` — Contact

- Two-column layout: form left, info right
- **Form fields**: Name, Email, Subject, Message — submits to Formspree
- **Info panel** (right):
  - Email address
  - Social links
  - `🟢 Available for work` status indicator
  - Location / timezone (optional)
- Success / error state on form submission (no page reload)

---

## Data Architecture

```
lib/
  projects.ts      ← typed Project[] array (title, description, tags, category, github, live, image)

content/
  blog/
    *.mdx          ← frontmatter: title, date, tags, excerpt
```

No database. No CMS. All data is file-based and statically exported.

---

## Responsive Breakpoints

Using Tailwind defaults:
- `sm` 640px — stack hero columns
- `md` 768px — 2-col grids
- `lg` 1024px — 3-col grids, full nav
- Mobile nav collapses to hamburger drawer

---

## File Conventions

- Components in `/components/` (e.g. `Nav.tsx`, `ServiceCard.tsx`, `ProjectCard.tsx`)
- Page-specific sections as sub-components co-located in `/components/sections/`
- All images in `/public/images/`
- Fonts: `next/font` with Inter (primary) + optionally a monospace for code snippets

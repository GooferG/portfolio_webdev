# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Luiz Meneghim's multi-page portfolio site with 6 routes, dark/teal color scheme, Framer Motion animations, MDX blog, and Formspree contact form — deployed as a Next.js static export to Vercel.

**Architecture:** Next.js 15 App Router with `output: 'export'` for fully static generation. Server components handle data reading (MDX, project list); client components handle interactivity (nav hamburger, typing effect, project filter, contact form). All data is file-based — no database or CMS.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, Framer Motion, next-mdx-remote, gray-matter, lucide-react, @tailwindcss/typography

---

## File Map

Files created or modified by this plan:

```
portfolioOne/
  next.config.ts                        ← add output: 'export', images unoptimized
  tailwind.config.ts                    ← add custom color tokens
  app/
    globals.css                         ← base styles, font vars, scrollbar
    layout.tsx                          ← root layout: fonts, metadata, Nav, Footer
    page.tsx                            ← Home: Hero + FeaturedProjects + FreelanceCTA
    about/page.tsx                      ← About page
    services/page.tsx                   ← Services page
    projects/page.tsx                   ← Projects page (client — has filter state)
    blog/
      page.tsx                          ← Blog list page
      [slug]/page.tsx                   ← Individual blog post
    contact/page.tsx                    ← Contact page
  components/
    Nav.tsx                             ← sticky nav, hamburger menu ('use client')
    Footer.tsx                          ← footer with social links
    sections/
      Hero.tsx                          ← hero section ('use client' — typing effect)
      FeaturedProjects.tsx              ← 3 featured project cards
      FreelanceCTA.tsx                  ← "available for freelance" strip
    ui/
      FadeIn.tsx                        ← scroll-triggered fade-in wrapper ('use client')
      ServiceCard.tsx                   ← single service card
      ProjectCard.tsx                   ← single project card
      BlogCard.tsx                      ← single blog post card
  hooks/
    useInView.ts                        ← IntersectionObserver hook
    useTypingEffect.ts                  ← character-by-character typing hook
  lib/
    projects.ts                         ← typed Project[] data array
    blog.ts                             ← MDX file reading utilities
  content/
    blog/
      hello-world.mdx                   ← sample blog post
  public/
    images/
      luiz.jpg                          ← hero photo (user provides)
      placeholder-project.jpg           ← 600x400 dark placeholder image
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: all base files via `create-next-app`

- [ ] **Step 1: Scaffold the project**

Run from the **parent directory** (`C:\Users\luizm\Desktop\Software_Engineer\luizmeneghim\`):

```bash
npx create-next-app@latest portfolioOne \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-git
```

Accept all defaults when prompted.

- [ ] **Step 2: Install additional dependencies**

```bash
cd portfolioOne
npm install framer-motion next-mdx-remote gray-matter lucide-react @tailwindcss/typography
npm install -D @types/node
```

- [ ] **Step 3: Verify install**

```bash
npm run dev
```

Expected: Next.js dev server starts on `http://localhost:3000` with no errors. Stop it with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 portfolio project"
```

---

## Task 2: Configure Static Export + next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Replace next.config.ts content**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

Note: `images: { unoptimized: true }` is required for static export — Next.js Image Optimization requires a server.

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds, `out/` directory is created.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore: configure static export for Vercel deployment"
```

---

## Task 3: Configure Tailwind Color Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0F1E',
        'bg-card': '#0d1f2e',
        'border-subtle': '#1e3a4a',
        accent: '#00D4AA',
        'accent-dim': 'rgba(0,212,170,0.09)',
      },
    },
    fontFamily: {
      sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-mono)', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg-primary text-slate-300 antialiased;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-bg-primary;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-border-subtle rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-accent;
  }
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "chore: add custom Tailwind color tokens and base styles"
```

---

## Task 4: Root Layout — Fonts, Metadata, Structure

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luiz Meneghim — Web Developer & AI Engineer',
    template: '%s | Luiz Meneghim',
  },
  description:
    'I build things for the web — and teach machines to think. Web development, AI consulting, LLM engineering, and freelance tech services.',
  openGraph: {
    title: 'Luiz Meneghim — Web Developer & AI Engineer',
    description: 'Web development, AI consulting, LLM engineering, and freelance tech services.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
```

Note: Nav and Footer are added in Task 5 and 6 after those components are built.

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Inter font and site metadata"
```

---

## Task 5: Nav Component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create components/Nav.tsx**

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-accent font-extrabold text-xl tracking-tight">
            LM<span className="text-white">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === href
                    ? 'text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Hire Me CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-5 py-2 bg-accent text-bg-primary text-sm font-bold rounded-full hover:bg-accent/90 transition-colors"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 lg:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-2xl font-semibold transition-colors ${
                pathname === href ? 'text-accent' : 'text-white hover:text-accent'
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 px-8 py-3 bg-accent text-bg-primary font-bold rounded-full text-lg"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </Link>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Add Nav to root layout**

Edit `app/layout.tsx` — import Nav and add it above `{children}`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luiz Meneghim — Web Developer & AI Engineer',
    template: '%s | Luiz Meneghim',
  },
  description:
    'I build things for the web — and teach machines to think. Web development, AI consulting, LLM engineering, and freelance tech services.',
  openGraph: {
    title: 'Luiz Meneghim — Web Developer & AI Engineer',
    description: 'Web development, AI consulting, LLM engineering, and freelance tech services.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/layout.tsx
git commit -m "feat: add sticky Nav with mobile hamburger drawer"
```

---

## Task 6: Footer Component

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

const socials = [
  { href: 'https://github.com/luizmeneghim', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/luizmeneghim', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/luizmeneghim', icon: Twitter, label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-[#060b12] py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <span>© 2026 Luiz Meneghim</span>

        <div className="flex items-center gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-slate-500 hover:text-accent transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <span>Built with Next.js + Tailwind</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add Footer to root layout**

In `app/layout.tsx`, import Footer and add it after `<main>`:

```tsx
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
// ... rest of imports unchanged

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer with social links"
```

---

## Task 7: Animation Utilities — useInView + FadeIn

**Files:**
- Create: `hooks/useInView.ts`
- Create: `components/ui/FadeIn.tsx`

- [ ] **Step 1: Create hooks/useInView.ts**

```ts
'use client'

import { useRef, useState, useEffect } from 'react'

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
```

- [ ] **Step 2: Create components/ui/FadeIn.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const { ref, inView } = useInView()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add hooks/useInView.ts components/ui/FadeIn.tsx
git commit -m "feat: add useInView hook and FadeIn scroll animation component"
```

---

## Task 8: useTypingEffect Hook

**Files:**
- Create: `hooks/useTypingEffect.ts`

- [ ] **Step 1: Create hooks/useTypingEffect.ts**

```ts
'use client'

import { useState, useEffect } from 'react'

export function useTypingEffect(text: string, speed = 45, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return displayed
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/useTypingEffect.ts
git commit -m "feat: add useTypingEffect hook for hero tagline animation"
```

---

## Task 9: Projects Data

**Files:**
- Create: `lib/projects.ts`

- [ ] **Step 1: Create lib/projects.ts**

```ts
export type ProjectCategory = 'Web' | 'AI/LLM' | 'Apps'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  github: string
  live: string
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'small-biz-website',
    title: 'Small Business Website',
    description:
      'A fast, responsive website built for a local business using Next.js and Tailwind CSS, with SEO optimization and Vercel deployment.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    category: 'Web',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/placeholder-project.jpg',
    featured: true,
  },
  {
    id: 'llm-finetune-pipeline',
    title: 'LLM Fine-tune Pipeline',
    description:
      'End-to-end pipeline for fine-tuning open-source LLMs with custom datasets, evaluation, and deployment on AWS infrastructure.',
    tags: ['Python', 'HuggingFace', 'AWS'],
    category: 'AI/LLM',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/placeholder-project.jpg',
    featured: true,
  },
  {
    id: 'react-dashboard',
    title: 'React Dashboard App',
    description:
      'A data dashboard with filterable tables, real-time charts, and a clean component library built with React and shadcn/ui.',
    tags: ['React', 'TypeScript', 'shadcn/ui'],
    category: 'Apps',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/placeholder-project.jpg',
    featured: true,
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectsByCategory(category: ProjectCategory | 'All'): Project[] {
  if (category === 'All') return projects
  return projects.filter(p => p.category === category)
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add typed projects data with category filtering utilities"
```

---

## Task 10: Blog MDX Utilities

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/hello-world.mdx`

- [ ] **Step 1: Create lib/blog.ts**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: number
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const wordCount = content.split(/\s+/).filter(Boolean).length

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        excerpt: data.excerpt as string,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostContent(slug: string): { frontmatter: BlogPost; source: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordCount = content.split(/\s+/).filter(Boolean).length

  return {
    frontmatter: {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      excerpt: data.excerpt as string,
      readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    },
    source: content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}
```

- [ ] **Step 2: Create content/blog/hello-world.mdx**

```mdx
---
title: "Hello World — Building My Portfolio with Next.js and AI"
date: "2026-04-09"
tags: ["Next.js", "Tailwind", "AI"]
excerpt: "A quick look at how I built this portfolio site using Next.js App Router, Tailwind CSS, and a little help from AI tools."
---

# Hello World

Welcome to my blog. This is the first post on my new portfolio site — built with **Next.js 15**, **Tailwind CSS**, and deployed as a static export on Vercel.

## Why I built this

I wanted a place to showcase my projects, document what I learn, and make it easy for potential clients to reach me. Most portfolio templates felt generic, so I designed this one from scratch.

## The stack

- **Next.js 15 App Router** — file-based routing, server components, static export
- **Tailwind CSS** — utility-first styling with a custom dark/teal color system
- **Framer Motion** — smooth page transitions and scroll animations
- **MDX** — this very blog post is written in Markdown with JSX support

## What's next

I'll be writing more here about web development, AI engineering, LLM fine-tuning, and the occasional build log. Stay tuned.
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add lib/blog.ts content/blog/hello-world.mdx
git commit -m "feat: add MDX blog utilities and sample blog post"
```

---

## Task 11: Hero Section Component

**Files:**
- Create: `components/sections/Hero.tsx`
- Add: `public/images/placeholder-project.jpg` (see step 1)

- [ ] **Step 1: Add placeholder project image**

Create a simple dark placeholder. Run:

```bash
# Download a dark placeholder (600x400)
curl -o public/images/placeholder-project.jpg \
  "https://placehold.co/600x400/0d1f2e/1e3a4a.jpg"
```

Also place your photo at `public/images/luiz.jpg` (copy the file there manually).

- [ ] **Step 2: Create components/sections/Hero.tsx**

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { useTypingEffect } from '@/hooks/useTypingEffect'

const TAGLINE = "I build things for the web — and teach machines to think."

const socials = [
  { href: 'https://github.com/luizmeneghim', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/luizmeneghim', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/luizmeneghim', icon: Twitter, label: 'Twitter' },
]

const services = [
  'Web Development',
  'AI Consulting',
  'LLM Engineering',
  'Server Admin',
  'Tech Assistance',
]

export default function Hero() {
  const displayedTagline = useTypingEffect(TAGLINE)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Teal ambient glow — top left */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-32 flex items-center gap-12">
        {/* Left: text content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Hello pill */}
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent block" />
            <span className="text-accent text-xs font-semibold tracking-[3px] uppercase">
              Hello, I am
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            Luiz<br />Meneghim
          </h1>

          {/* Typing tagline */}
          <p className="text-slate-400 text-lg max-w-md leading-relaxed min-h-[56px]">
            {displayedTagline}
            <span className="inline-block w-[2px] h-5 bg-accent ml-1 align-middle animate-pulse" />
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="px-7 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors text-sm"
            >
              Hire Me
            </Link>
            <Link
              href="/projects"
              className="px-7 py-3 border border-border-subtle text-slate-400 rounded-full hover:border-accent hover:text-white transition-colors text-sm"
            >
              My Work
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-card border border-border-subtle text-slate-500 hover:text-accent hover:border-accent transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo with fade */}
        <div className="hidden md:block relative flex-shrink-0 w-[420px] h-[560px]">
          <Image
            src="/images/luiz.jpg"
            alt="Luiz Meneghim"
            fill
            priority
            className="object-cover object-top rounded-2xl"
            style={{
              maskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
            }}
          />
          {/* Additional left-side fade into page bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, #0A0F1E 0%, transparent 35%)',
            }}
          />
        </div>
      </div>

      {/* Service strip — bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md border-t border-border-subtle py-3 px-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-6 text-sm whitespace-nowrap">
          <span className="text-slate-600 uppercase tracking-widest text-[10px] font-semibold shrink-0">
            I offer
          </span>
          {services.map((s, i) => (
            <span key={s} className="flex items-center gap-6 text-slate-400">
              {i > 0 && <span className="text-border-subtle">·</span>}
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx public/images/
git commit -m "feat: add Hero section with photo fade, typing animation, and service strip"
```

---

## Task 12: ProjectCard + FeaturedProjects + Home Page

**Files:**
- Create: `components/ui/ProjectCard.tsx`
- Create: `components/sections/FeaturedProjects.tsx`
- Create: `components/sections/FreelanceCTA.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create components/ui/ProjectCard.tsx**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/lib/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/50 transition-colors duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-base mb-2">{project.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-bg-primary border border-border-subtle rounded text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-border-subtle rounded-lg px-3 py-1.5 transition-colors"
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-3 py-1.5 transition-colors"
            >
              <ExternalLink size={13} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create components/sections/FeaturedProjects.tsx**

```tsx
import { getFeaturedProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeIn } from '@/components/ui/FadeIn'
import Link from 'next/link'

export function FeaturedProjects() {
  const featured = getFeaturedProjects()

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
              Selected Work
            </p>
            <h2 className="text-white text-3xl font-extrabold">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:block"
          >
            View all →
          </Link>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.1}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/projects" className="text-slate-400 hover:text-white text-sm transition-colors">
          View all projects →
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create components/sections/FreelanceCTA.tsx**

```tsx
import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

export function FreelanceCTA() {
  return (
    <section className="border-t border-border-subtle">
      <FadeIn>
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-semibold tracking-[2px] uppercase">
                Available for work
              </span>
            </div>
            <p className="text-white text-xl font-bold">
              Looking for a developer or AI engineer?
            </p>
            <p className="text-slate-400 text-sm mt-1">
              I take on freelance and contract work — let's build something together.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-7 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
```

- [ ] **Step 4: Replace app/page.tsx**

```tsx
import Hero from '@/components/sections/Hero'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { FreelanceCTA } from '@/components/sections/FreelanceCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <FreelanceCTA />
    </>
  )
}
```

- [ ] **Step 5: Type-check and dev preview**

```bash
npx tsc --noEmit
npm run dev
```

Open `http://localhost:3000`. Verify: hero renders with photo, tagline types out, service strip at bottom, featured projects section below. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add components/ui/ProjectCard.tsx components/sections/FeaturedProjects.tsx \
  components/sections/FreelanceCTA.tsx app/page.tsx
git commit -m "feat: build Home page — Hero, FeaturedProjects, FreelanceCTA"
```

---

## Task 13: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Luiz Meneghim — web developer and AI engineer.',
}

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Python', 'LLMs / RAG', 'HuggingFace', 'OpenAI API',
  'Docker', 'Linux', 'PostgreSQL', 'Vercel',
  'Tailwind CSS', 'Framer Motion', 'Git', 'AWS',
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Who I Am
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-16">About Me</h1>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Photo */}
        <FadeIn>
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm">
              <Image
                src="/images/luiz.jpg"
                alt="Luiz Meneghim"
                fill
                className="object-cover object-top"
              />
              {/* Teal border accent */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20" />
            </div>
            {/* Teal glow behind photo */}
            <div
              className="absolute -bottom-4 -right-4 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)' }}
            />
          </div>
        </FadeIn>

        {/* Text content */}
        <div className="flex flex-col gap-8">
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-5 text-slate-400 leading-relaxed">
              <p>
                Hey, I'm Luiz — a web developer and AI engineer based in Brazil. I build modern web
                applications and help businesses integrate AI into their workflows. I care about
                clean code, great user experiences, and shipping things that actually work.
              </p>
              <p>
                On the web side, I focus on React and Next.js applications — from small business
                landing pages to full-stack web apps. On the AI side, I work with LLMs, RAG
                pipelines, fine-tuning, and API integrations to help teams move from "AI curious"
                to "AI productive."
              </p>
              <p>
                When I'm not writing code, I'm setting up home labs, wiring up AV systems, or
                building out smart home setups. I like making technology work for people — whether
                that's a React app or a movie room.
              </p>
            </div>
          </FadeIn>

          {/* Available badge + CV */}
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for freelance
              </span>
              <a
                href="/luiz-cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 border border-border-subtle text-slate-400 hover:text-white hover:border-accent rounded-full text-sm transition-colors"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </FadeIn>

          {/* Skills grid */}
          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-white font-semibold text-base mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-bg-card border border-border-subtle rounded-lg text-slate-400 text-sm hover:border-accent/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Link
              href="/contact"
              className="w-fit px-7 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors text-sm"
            >
              Let's Work Together
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add About page with skills grid and CV download"
```

---

## Task 14: ServiceCard + Services Page

**Files:**
- Create: `components/ui/ServiceCard.tsx`
- Create: `app/services/page.tsx`

- [ ] **Step 1: Create components/ui/ServiceCard.tsx**

```tsx
import { LucideIcon } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  popular?: boolean
  delay?: number
}

export function ServiceCard({ icon: Icon, title, description, popular, delay = 0 }: ServiceCardProps) {
  return (
    <FadeIn delay={delay}>
      <div
        className={`relative bg-bg-card border rounded-xl p-6 h-full hover:border-accent/50 transition-colors duration-300 ${
          popular ? 'border-accent/40 shadow-[0_0_24px_rgba(0,212,170,0.08)]' : 'border-border-subtle'
        }`}
      >
        {popular && (
          <span className="absolute top-4 right-4 text-[10px] px-2.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-accent font-semibold">
            Popular
          </span>
        )}
        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent-dim border border-accent/20 mb-5">
          <Icon size={20} className="text-accent" />
        </div>
        <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </FadeIn>
  )
}
```

- [ ] **Step 2: Create app/services/page.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Server, Brain, Cpu, Wrench } from 'lucide-react'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Web development, AI consulting, LLM engineering, server admin, and tech assistance services.',
}

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom websites and web applications for businesses of all sizes — from landing pages to full-stack Next.js apps. Fast, responsive, SEO-ready.',
    popular: false,
  },
  {
    icon: Server,
    title: 'Server & Hosting',
    description:
      'VPS setup, server administration, deployment pipelines, SSL, monitoring, and ongoing hosting management.',
    popular: false,
  },
  {
    icon: Brain,
    title: 'AI Consulting & Implementation',
    description:
      'Strategy and hands-on implementation of AI features into your product — chatbots, document Q&A, semantic search, and more.',
    popular: true,
  },
  {
    icon: Cpu,
    title: 'LLM Engineering',
    description:
      'Fine-tuning open-source LLMs, building RAG pipelines, prompt engineering, evaluation, and production deployment.',
    popular: false,
  },
  {
    icon: Wrench,
    title: 'Tech Assistance',
    description:
      'Hands-on tech help for individuals — smart home setup, AV/movie room wiring, PC builds, general troubleshooting.',
    popular: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
            What I Do
          </p>
          <h1 className="text-white text-4xl font-extrabold">Services</h1>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            From building fast websites to training AI models — I cover the full stack of modern digital work.
          </p>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            popular={service.popular}
            delay={i * 0.08}
          />
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Have something specific in mind?</p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ServiceCard.tsx app/services/page.tsx
git commit -m "feat: add ServiceCard component and Services page"
```

---

## Task 15: Projects Page with Filter

**Files:**
- Create: `app/projects/page.tsx`

- [ ] **Step 1: Create app/projects/page.tsx**

This is a client component because it has filter state.

```tsx
'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects, type ProjectCategory } from '@/lib/projects'

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Web', 'AI/LLM', 'Apps']

export default function ProjectsPage() {
  const [active, setActive] = useState<'All' | ProjectCategory>('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          My Work
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-10">Projects</h1>
      </FadeIn>

      {/* Filter tabs */}
      <FadeIn delay={0.05}>
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-accent text-bg-primary'
                  : 'border border-border-subtle text-slate-400 hover:border-accent/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Project grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.08}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-slate-500 text-center py-16">No projects in this category yet.</p>
      )}
    </div>
  )
}
```

Note: Because this is a client component but inside the App Router, Next.js will still statically render it. No `generateStaticParams` needed — there are no dynamic segments.

Add page metadata — create a separate `app/projects/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Web development, AI, and app projects by Luiz Meneghim.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/projects/page.tsx app/projects/layout.tsx
git commit -m "feat: add Projects page with client-side category filter"
```

---

## Task 16: Blog List Page

**Files:**
- Create: `components/ui/BlogCard.tsx`
- Create: `app/blog/page.tsx`

- [ ] **Step 1: Create components/ui/BlogCard.tsx**

```tsx
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-bg-card border border-border-subtle rounded-xl p-6 hover:border-accent/40 transition-colors duration-300">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] px-2.5 py-1 bg-bg-primary border border-border-subtle rounded-full text-slate-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-white font-semibold text-lg leading-snug mb-3">
        {post.title}
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <span className="text-slate-600 text-xs">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}{' '}
          · {post.readingTime} min read
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-accent text-sm hover:text-accent/80 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Create app/blog/page.tsx**

```tsx
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/ui/BlogCard'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on web development, AI, LLMs, and tech by Luiz Meneghim.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Writing
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-4">Blog</h1>
        <p className="text-slate-400 mb-16">
          Thoughts on web development, AI engineering, and the occasional build log.
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-slate-500">No posts yet — check back soon.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/BlogCard.tsx app/blog/page.tsx
git commit -m "feat: add Blog list page with MDX post reading"
```

---

## Task 17: Blog Post Page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create app/blog/[slug]/page.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostContent } from '@/lib/blog'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getPostContent(slug)
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { frontmatter, source } = getPostContent(slug)

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-accent text-sm mb-12 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {frontmatter.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 bg-bg-card border border-border-subtle rounded-full text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-slate-500 text-sm">
          {new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {frontmatter.readingTime} min read
        </p>
      </header>

      {/* MDX content */}
      <div className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-accent prose-code:text-accent prose-pre:bg-bg-card prose-pre:border prose-pre:border-border-subtle">
        <MDXRemote source={source} />
      </div>

      {/* Back link (bottom) */}
      <div className="mt-16 pt-8 border-t border-border-subtle">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-accent text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: add blog post page with MDX rendering and static params"
```

---

## Task 18: Contact Page

**Files:**
- Create: `app/contact/page.tsx`

Before this task, sign up at [formspree.io](https://formspree.io), create a new form, and note your **Form ID** (e.g. `xpzgkqrb`). Then create `.env.local` in the project root:

```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id_here
```

- [ ] **Step 1: Create app/contact/page.tsx**

```tsx
'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Github, Linkedin, Twitter, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

// Note: metadata export doesn't work in 'use client' files.
// Add a layout.tsx for this route instead (see step 2).

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? ''

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })

    if (res.ok) {
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Let's Talk
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-16">Contact</h1>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <FadeIn delay={0.05}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-sm" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-sm" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about your project..."
                className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 disabled:opacity-60 transition-colors text-sm w-fit"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-accent text-sm">
                <CheckCircle size={16} />
                Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </FadeIn>

        {/* Info panel */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-8">
            {/* Available badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-accent/10 border border-accent/30 rounded-xl w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">Available for work</span>
            </div>

            <div className="flex flex-col gap-6 text-slate-400 text-sm">
              <p className="leading-relaxed">
                Whether you need a new website, AI integration, server help, or just want to talk
                tech — I'm happy to chat. I respond within 24 hours.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:luiz@meneghim.dev"
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <Mail size={16} />
                  luiz@meneghim.dev
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  Brazil (UTC-3)
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
                <a href="https://github.com/luizmeneghim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Github size={16} />
                  github.com/luizmeneghim
                </a>
                <a href="https://linkedin.com/in/luizmeneghim" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <Linkedin size={16} />
                  linkedin.com/in/luizmeneghim
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create app/contact/layout.tsx for metadata**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Luiz Meneghim for web development, AI consulting, or freelance work.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx app/contact/layout.tsx .env.local
git commit -m "feat: add Contact page with Formspree form and info panel"
```

Note: Add `.env.local` to `.gitignore` if not already there:
```bash
echo ".env.local" >> .gitignore
```

---

## Task 19: Final Build Verification

**Files:**
- Modify: `.gitignore` (if needed)

- [ ] **Step 1: Update .gitignore**

Ensure these are in `.gitignore` (create-next-app usually includes them):

```
.env.local
out/
.next/
node_modules/
.superpowers/
```

- [ ] **Step 2: Final type-check**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: Build completes successfully, `out/` directory created with all static HTML files. Check that these routes appear in the output:
- `out/index.html`
- `out/about/index.html`
- `out/services/index.html`
- `out/projects/index.html`
- `out/blog/index.html`
- `out/blog/hello-world/index.html`
- `out/contact/index.html`

- [ ] **Step 4: Preview the static build**

```bash
npx serve out
```

Open `http://localhost:3000` (or whatever port `serve` reports). Click through every page and verify:
- Nav works and highlights active route
- Hero photo shows with fade effect, tagline types out
- Services page shows 5 cards
- Projects filter tabs work
- Blog post opens and renders MDX
- Contact form shows (won't submit without a real Formspree ID in .env.local)

- [ ] **Step 5: Final commit**

```bash
git add .gitignore
git commit -m "chore: finalize .gitignore and verify static build"
```

---

## Task 20: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

Create a new repo at github.com, then:

```bash
git remote add origin https://github.com/luizmeneghim/portfolioOne.git
git push -u origin main
```

- [ ] **Step 2: Import to Vercel**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `portfolioOne` GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Add environment variable: `NEXT_PUBLIC_FORMSPREE_ID` = your Formspree form ID
5. Click **Deploy**

- [ ] **Step 3: Verify live site**

Once deployed, open the Vercel URL and click through all 6 pages. Test the contact form with a real submission.

- [ ] **Step 4: (Optional) Add custom domain**

In Vercel project settings → Domains → add your domain.

---

## Self-Review Notes

- **Spec coverage:** All 6 pages covered ✓. Nav + Footer ✓. Color tokens ✓. Framer Motion animations ✓. Typing effect ✓. Photo fade ✓. MDX blog ✓. Formspree contact ✓. Static export ✓. Responsive breakpoints applied throughout ✓.
- **No placeholders:** All code blocks are complete and runnable.
- **Type consistency:** `Project` type defined in Task 9, used in Tasks 12, 15. `BlogPost` type defined in Task 10, used in Tasks 16, 17. `ProjectCategory` union used consistently.
- **Client/server boundary:** All components using hooks, state, or Framer Motion are marked `'use client'`. Server-side MDX reading in `lib/blog.ts` uses `fs` (server-only). Pages importing both server data and client components follow App Router patterns correctly.

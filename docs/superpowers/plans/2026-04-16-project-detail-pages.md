# Project Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/projects/[id]` detail page for each project with a two-column layout, interactive screenshot gallery, and prev/next navigation.

**Architecture:** Extend the `Project` type with `screenshots` and `longDescription` fields, wrap `ProjectCard` in a Next.js `Link`, add a server-component route at `app/projects/[id]/page.tsx` that looks up the project, and render a new `ProjectDetailClient` client component that owns gallery state.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, `next/image`, `next/link`, `lucide-react`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `lib/projects.ts` | Add `screenshots?` and `longDescription?` to `Project` type; populate data |
| Modify | `components/ui/ProjectCard.tsx` | Wrap card in `<Link href="/projects/{id}">` |
| Create | `app/projects/[id]/page.tsx` | Server component — param lookup, `notFound()`, metadata, renders `ProjectDetailClient` |
| Create | `components/ui/ProjectDetailClient.tsx` | Client component — gallery state, two-column layout, prev/next nav |

---

## Task 1: Extend Project type and add screenshot data

**Files:**
- Modify: `lib/projects.ts`

- [ ] **Step 1: Add fields to the `Project` interface**

Replace the existing `Project` interface with:

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: ProjectCategory;
  github: string;
  live: string;
  image: string;
  screenshots?: string[];
  featured: boolean;
}
```

- [ ] **Step 2: Add `screenshots` to each project in the `projects` array**

Update each project object. Use the existing `image` as the first screenshot so pages render immediately. Add more paths when you have real screenshots:

```ts
{
  id: 'small-biz-website',
  // ...existing fields unchanged...
  screenshots: [
    'images/universallyus_screenshot.jpg',
  ],
},
{
  id: 'Streamer Fullstack Website',
  // ...existing fields unchanged...
  screenshots: [
    '/images/goofertv.jpg',
  ],
},
{
  id: 'lead-generation-dashboard',
  // ...existing fields unchanged...
  screenshots: [
    '/images/lead_generator.jpg',
  ],
},
```

- [ ] **Step 3: Add a helper to look up a project by id**

Add this function at the bottom of `lib/projects.ts`:

```ts
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd c:/Users/luizm/Desktop/Software_Engineer/luizmeneghim/portfolioOne
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: extend Project type with screenshots and longDescription"
```

---

## Task 2: Make ProjectCard clickable

**Files:**
- Modify: `components/ui/ProjectCard.tsx`

- [ ] **Step 1: Add Link import**

Add at the top of `components/ui/ProjectCard.tsx`:

```ts
import Link from 'next/link'
```

- [ ] **Step 2: Wrap the card div in a Link**

Replace the outer `<div className="bg-bg-card ...">` with a `<Link>` wrapper. The full component becomes:

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/SocialIcons'
import type { Project } from '@/lib/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-accent/50 transition-colors duration-300 flex flex-col h-full">
        <div className="relative h-48 overflow-hidden shrink-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-base mb-2">{project.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

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

          <div className="flex items-center gap-3">
            {project.github && (
              <span className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-border-subtle rounded-lg px-3 py-1.5 transition-colors">
                <GitHubIcon size={13} />
                GitHub
              </span>
            )}
            {project.live && (
              <span className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-3 py-1.5 transition-colors">
                <ExternalLink size={13} />
                Live
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
```

Note: GitHub/Live buttons become `<span>` instead of `<a>` — real links are on the detail page. This avoids nested `<a>` tags (invalid HTML).

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ProjectCard.tsx
git commit -m "feat: make ProjectCard link to detail page"
```

---

## Task 3: Create ProjectDetailClient component

**Files:**
- Create: `components/ui/ProjectDetailClient.tsx`

- [ ] **Step 1: Create the client component**

Create `components/ui/ProjectDetailClient.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/SocialIcons'
import type { Project } from '@/lib/projects'

interface Props {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

export function ProjectDetailClient({ project, prevProject, nextProject }: Props) {
  const screenshots = project.screenshots?.length ? project.screenshots : [project.image]
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-accent text-sm mb-12 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      {/* Badge + Title */}
      <div className="mb-10">
        <span className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3 inline-block">
          {project.category}
        </span>
        <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight">
          {project.title}
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">

        {/* Left: gallery */}
        <div>
          {/* Main image */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border-subtle mb-3">
            <Image
              src={screenshots[activeIndex]}
              alt={`${project.title} screenshot ${activeIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails — only show strip if more than 1 screenshot */}
          {screenshots.length > 1 && (
            <div className="flex gap-3">
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeIndex
                      ? 'border-accent'
                      : 'border-border-subtle hover:border-accent/50'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {project.longDescription ?? project.description}
            </p>
          </div>

          <div>
            <p className="text-slate-500 text-xs font-semibold tracking-[2px] uppercase mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-bg-primary border border-border-subtle rounded text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-border-subtle rounded-lg px-4 py-2 transition-colors"
              >
                <GitHubIcon size={13} />
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 border border-accent/30 rounded-lg px-4 py-2 transition-colors"
              >
                <ExternalLink size={13} />
                Live Site
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      {(prevProject || nextProject) && (
        <div className="flex justify-between mt-16 pt-8 border-t border-border-subtle">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="flex items-center gap-2 text-slate-500 hover:text-accent text-sm transition-colors"
            >
              <ChevronLeft size={14} />
              {prevProject.title}
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="flex items-center gap-2 text-slate-500 hover:text-accent text-sm transition-colors"
            >
              {nextProject.title}
              <ChevronRight size={14} />
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ProjectDetailClient.tsx
git commit -m "feat: add ProjectDetailClient component with gallery and prev/next nav"
```

---

## Task 4: Create the detail page route

**Files:**
- Create: `app/projects/[id]/page.tsx`

- [ ] **Step 1: Create the route directory and file**

Create `app/projects/[id]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectById } from '@/lib/projects'
import { ProjectDetailClient } from '@/components/ui/ProjectDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) return {}
  return {
    title: project.title,
    description: project.longDescription ?? project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const prevProject = index > 0 ? projects[index - 1] : null
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and manually test**

```bash
npm run dev
```

- Open `http://localhost:3000/projects` — all cards should be clickable
- Click any card — should navigate to `/projects/[id]`
- Verify: back link works, title/tags/description render, GitHub/Live buttons work
- Verify: unknown route (e.g. `http://localhost:3000/projects/fake-id`) shows Next.js 404
- Verify: prev/next links navigate between projects

- [ ] **Step 4: Commit**

```bash
git add app/projects/[id]/page.tsx
git commit -m "feat: add project detail page route"
```

---

## Task 5: Test with multiple screenshots

This task validates the gallery interaction works end-to-end with real data.

**Files:**
- Modify: `lib/projects.ts` (add a second screenshot to one project for testing)

- [ ] **Step 1: Temporarily add a second screenshot to one project**

In `lib/projects.ts`, update the first project's `screenshots` array to have 2 entries (duplicate the image path to test without needing a new file):

```ts
{
  id: 'small-biz-website',
  // ...
  screenshots: [
    'images/universallyus_screenshot.jpg',
    'images/universallyus_screenshot.jpg', // duplicate for gallery test
  ],
},
```

- [ ] **Step 2: Verify gallery interaction in dev server**

- Open `http://localhost:3000/projects/small-biz-website`
- Confirm thumbnail strip appears (2 thumbnails)
- Click second thumbnail — main image should stay the same (same path) but active border should move to thumbnail 2
- Click first thumbnail — active border returns to thumbnail 1

- [ ] **Step 3: Revert to single screenshot (or keep real ones)**

Either revert the duplicate, or replace with real screenshot paths if you have them. Remove the duplicate if you don't have a second real image yet:

```ts
screenshots: [
  'images/universallyus_screenshot.jpg',
],
```

- [ ] **Step 4: Final commit**

```bash
git add lib/projects.ts
git commit -m "feat: project detail pages complete"
```

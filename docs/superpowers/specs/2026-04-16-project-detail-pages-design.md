# Project Detail Pages Design

## Overview

Add a detail page for each project at `/projects/[id]`. Clicking a project thumbnail navigates to that page. The page shows a two-column layout with an interactive screenshot gallery on the left and project info on the right.

## Data Model

Extend `Project` type in `lib/projects.ts` with two new optional fields:

```ts
screenshots?: string[]   // up to 3 image paths; first is shown as hero
longDescription?: string // falls back to description if not set
```

The existing `image` field remains — used by `ProjectCard` for the grid thumbnail. `screenshots` is only used on the detail page.

## Routes

- `/projects` — existing grid page, no changes except making cards clickable
- `/projects/[id]` — new static detail page, one per project

`generateStaticParams` in `app/projects/[id]/page.tsx` returns `{ id }` for each project. If an unknown `id` is requested, `notFound()` is called.

## Components

### `ProjectCard` (modified)
Wrap the existing card in `<Link href={/projects/${project.id}}>`. The card itself is unchanged visually.

### `app/projects/[id]/page.tsx` (new, server component)
Looks up the project by `id`, calls `notFound()` if missing. Renders `ProjectDetailClient` with the project data.

### `ProjectDetailClient` (new, client component)
Owns the active screenshot index state. Renders:
- Back link → `/projects`
- Category badge + title
- Two-column grid:
  - **Left:** main image (driven by active index) + thumbnail strip (up to 3)
  - **Right:** `longDescription ?? description`, tech stack tags, GitHub + Live buttons
- Prev/next project navigation (links, not buttons — no JS needed)

Thumbnail click updates active index → main image swaps. Active thumbnail gets accent border.

## File Structure

```
app/
  projects/
    page.tsx              (existing — minor change: cards become links)
    [id]/
      page.tsx            (new server component)
components/
  ui/
    ProjectCard.tsx       (existing — wrap in Link)
    ProjectDetailClient.tsx (new client component)
lib/
  projects.ts             (existing — extend Project type + add screenshots to data)
```

## Navigation

- **Back:** `← Back to Projects` link at top-left
- **Prev/Next:** bottom of page, links to adjacent projects by index in the `projects` array. First project has no Prev; last has no Next.

## Error Handling

- Unknown `id`: `notFound()` → Next.js 404 page
- Missing `screenshots`: fall back to `[project.image]` so existing projects without screenshot arrays still render
- Missing `longDescription`: fall back to `project.description`

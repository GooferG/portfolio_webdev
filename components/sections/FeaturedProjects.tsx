'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { getFeaturedProjects } from '@/lib/projects'
import { FadeIn } from '@/components/ui/FadeIn'
import type { Project } from '@/lib/projects'

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 3)
  const [hero, ...rest] = featured

  return (
    <section
      id="featured"
      className="max-w-6xl mx-auto px-6 pt-24 pb-32"
    >
      <FadeIn>
        <div className="flex items-end justify-between gap-6 mb-16">
          <h2
            className="font-display uppercase text-fg-strong leading-[0.9] tracking-tight"
            style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Featured
            <span className="block text-fg-muted italic font-normal normal-case font-sans text-xl sm:text-2xl mt-3 max-w-md leading-snug">
              a few things I am proud of.
            </span>
          </h2>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-baseline gap-2 text-fg-muted hover:text-accent text-sm transition-colors shrink-0 pb-2"
          >
            View all
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-10">
        {/* Hero project: 7 cols */}
        {hero && (
          <FadeIn className="lg:col-span-7">
            <HeroProjectCard project={hero} index={1} />
          </FadeIn>
        )}

        {/* Secondary stack: 5 cols, 2 cards vertical */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {rest.map((project, i) => (
            <FadeIn key={project.id} delay={(i + 1) * 0.08}>
              <SecondaryProjectCard project={project} index={i + 2} />
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:hidden">
        <Link
          href="/projects"
          className="inline-flex items-baseline gap-2 text-fg-muted hover:text-accent text-sm transition-colors"
        >
          View all projects
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  )
}

function HeroProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const router = useRouter()
  const detailHref = `/projects/${project.id}`

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    router.push(detailHref)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      router.push(detailHref)
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col gap-5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
    >
      {/* Big image, no card chrome */}
      <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border-subtle">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={
            project.imagePosition
              ? { objectPosition: project.imagePosition }
              : undefined
          }
          className="object-cover"
          sizes="(min-width: 1024px) 56vw, 100vw"
        />
        <div className="absolute inset-0 bg-bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-3 text-xs font-mono">
          <span className="text-accent tabular-nums">
            {String(index).padStart(2, '0')}
          </span>
          <span className="text-fg-faint">{project.category}</span>
        </div>

        <h3 className="text-fg-strong text-2xl md:text-3xl font-extrabold leading-tight">
          <Link
            href={detailHref}
            className="hover:text-accent transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        <p className="text-fg-muted text-sm leading-relaxed max-w-prose line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 bg-bg-card border border-border-subtle rounded-full text-fg-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SecondaryProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const router = useRouter()
  const detailHref = `/projects/${project.id}`

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    router.push(detailHref)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      router.push(detailHref)
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group flex flex-col gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border-subtle">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={
            project.imagePosition
              ? { objectPosition: project.imagePosition }
              : undefined
          }
          className="object-cover"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="flex items-baseline gap-3 text-xs font-mono mt-1">
        <span className="text-accent tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
        <span className="text-fg-faint">{project.category}</span>
      </div>

      <h3 className="text-fg-strong text-lg font-semibold leading-snug">
        <Link href={detailHref} className="hover:text-accent transition-colors">
          {project.title}
        </Link>
      </h3>

      <p className="text-fg-subtle text-sm leading-relaxed line-clamp-2">
        {project.description}
      </p>
    </div>
  )
}

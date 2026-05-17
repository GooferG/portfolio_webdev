'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { projects, type Project, type ProjectCategory } from '@/lib/projects'

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Web', 'AI/LLM', 'Apps']

export default function ProjectsPage() {
  const [active, setActive] = useState<'All' | ProjectCategory>('All')

  const filtered =
    active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <h1
          className="font-display uppercase text-fg-strong leading-[0.9] tracking-tight mb-10"
          style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Projects
          <span className="block text-fg-muted italic font-normal normal-case font-sans text-xl sm:text-2xl mt-3 max-w-md leading-snug">
            things I have shipped, and things I am shipping.
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-accent text-bg-primary'
                  : 'border border-border-subtle text-fg-muted hover:border-accent/50 hover:text-fg-strong'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Spec sheet header row (desktop only) */}
      <FadeIn delay={0.1}>
        <div className="hidden md:grid md:grid-cols-[3rem_1fr_4.5rem_5.5rem_minmax(0,1fr)_2rem] gap-6 px-4 py-3 border-b border-border-subtle text-xs font-mono uppercase tracking-wider text-fg-faint">
          <span>Index</span>
          <span>Project</span>
          <span className="tabular-nums">Year</span>
          <span>Category</span>
          <span>Stack</span>
          <span className="text-right">Open</span>
        </div>
      </FadeIn>

      {/* Rows */}
      <ol className="flex flex-col">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={0.12 + i * 0.04}>
            <ProjectRow project={project} index={i + 1} />
          </FadeIn>
        ))}
      </ol>

      {filtered.length === 0 && (
        <p className="text-fg-subtle text-center py-16 font-mono text-sm">
          // no projects in this category yet
        </p>
      )}
    </div>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const router = useRouter()
  const detailHref = `/projects/${project.id}`
  const [hovered, setHovered] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    router.push(detailHref)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      router.push(detailHref)
    }
  }

  const indexLabel = String(index).padStart(2, '0')
  const stackLabel = project.tags.slice(0, 3).join(' · ')

  return (
    <li
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative cursor-pointer border-b border-border-subtle hover:bg-accent/5 focus:outline-none focus:bg-accent/5 transition-colors duration-200"
    >
      {/* Floating thumb on hover (desktop only) */}
      {hovered && (
        <div
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-32 h-20 rounded-md overflow-hidden border border-border-subtle shadow-xl pointer-events-none z-10"
          aria-hidden="true"
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="128px"
            style={
              project.imagePosition
                ? { objectPosition: project.imagePosition }
                : undefined
            }
            className="object-cover"
          />
        </div>
      )}

      {/* Desktop row */}
      <div className="hidden md:grid md:grid-cols-[3rem_1fr_4.5rem_5.5rem_minmax(0,1fr)_2rem] gap-6 px-4 py-5 items-center">
        <span className="font-mono text-sm tabular-nums text-fg-faint group-hover:text-accent transition-colors">
          {indexLabel}
        </span>
        <Link
          href={detailHref}
          className="text-fg-strong text-base font-medium group-hover:text-accent transition-colors truncate"
          onClick={(e) => e.stopPropagation()}
        >
          {project.title}
        </Link>
        <span className="font-mono text-sm tabular-nums text-fg-muted">
          {project.year}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
          {project.category}
        </span>
        <span className="text-sm text-fg-muted truncate">{stackLabel}</span>
        <span className="flex justify-end text-fg-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Mobile row — stacked */}
      <div className="md:hidden flex flex-col gap-2 px-4 py-5">
        <div className="flex items-baseline justify-between gap-3 text-xs font-mono">
          <span className="text-fg-faint tabular-nums">{indexLabel}</span>
          <span className="text-fg-subtle uppercase tracking-wider">
            {project.category} · {project.year}
          </span>
        </div>
        <Link
          href={detailHref}
          className="text-fg-strong text-base font-medium hover:text-accent transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {project.title}
        </Link>
        <span className="text-sm text-fg-muted">{stackLabel}</span>
      </div>
    </li>
  )
}

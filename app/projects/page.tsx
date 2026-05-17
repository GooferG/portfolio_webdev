'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects, type ProjectCategory } from '@/lib/projects'

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Web', 'AI/LLM', 'Apps']

export default function ProjectsPage() {
  const [active, setActive] = useState<'All' | ProjectCategory>('All')

  const filtered =
    active === 'All' ? projects : projects.filter(p => p.category === active)

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
          {CATEGORIES.map(cat => (
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-fg-subtle text-center py-16">No projects in this category yet.</p>
      )}
    </div>
  )
}

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
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          My Work
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-10">Projects</h1>
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
                  : 'border border-border-subtle text-slate-400 hover:border-accent/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

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

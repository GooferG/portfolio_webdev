'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/SocialIcons'
import type { Project } from '@/lib/projects'

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter()
  const detailHref = `/projects/${project.id}`

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore clicks that originated on inner anchors/buttons
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
      className="group bg-bg-card border border-border-subtle rounded-xl overflow-hidden hover:border-accent/50 transition-colors duration-300 flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      <div className="relative h-48 overflow-hidden shrink-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-base mb-2">
          <Link href={detailHref} className="hover:text-accent transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">{project.description}</p>

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
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-border-subtle rounded-lg px-3 py-1.5 transition-colors"
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

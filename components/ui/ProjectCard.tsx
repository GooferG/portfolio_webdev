import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/ui/SocialIcons'
import type { Project } from '@/lib/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-xl overflow-hidden group hover:border-accent/50 transition-colors duration-300 flex flex-col">
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
          {project.github && project.github !== '#' && (
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

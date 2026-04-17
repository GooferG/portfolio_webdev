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

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react'
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
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? screenshots.length - 1 : i - 1))
  }, [screenshots.length])

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === screenshots.length - 1 ? 0 : i + 1))
  }, [screenshots.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, showPrev, showNext])

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
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative w-full aspect-video rounded-xl overflow-hidden border border-border-subtle mb-3 group cursor-zoom-in"
            aria-label="Open image gallery"
          >
            <Image
              src={screenshots[activeIndex]}
              alt={`${project.title} screenshot ${activeIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>

          {/* Thumbnails - only show strip if more than 1 screenshot */}
          {screenshots.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
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

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false) }}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showPrev() }}
                className="absolute left-4 sm:left-8 text-white/70 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); showNext() }}
                className="absolute right-4 sm:right-8 text-white/70 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4 sm:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[activeIndex]}
              alt={`${project.title} screenshot ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {screenshots.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-wider">
              {activeIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

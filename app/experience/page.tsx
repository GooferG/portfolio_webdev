'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, Download } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { experiences, CATEGORY_STYLES } from '@/lib/experience'
import type { Experience } from '@/lib/experience'

export default function ExperiencePage() {
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest')
  const sorted =
    order === 'newest' ? experiences : [...experiences].reverse()

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Curriculum Vitae
        </p>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
          Where I&apos;ve worked,
          <br />
          <span className="text-slate-400 italic font-normal">what I built.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-12">
          Nine-plus years across web development, security analysis, and
          technical support — laid out chronologically. Bilingual English and
          Portuguese, working out of Arizona.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
          <button
            onClick={() => setOrder(order === 'newest' ? 'oldest' : 'newest')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors"
          >
            {order === 'newest' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
            {order === 'newest' ? 'Newest first' : 'Oldest first'}
          </button>

          <a
            href="/luiz-cv.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle text-slate-400 hover:text-white hover:border-accent rounded-full text-sm transition-colors"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>
      </FadeIn>

      <ol
        className="relative timeline-counter"
        style={{ counterReset: 'step' }}
      >
        {/* Center line (md+) / left line (mobile) */}
        <div
          className="absolute top-0 bottom-0 w-px bg-border-subtle left-5 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        {sorted.map((entry, i) => (
          <TimelineItem key={entry.title + entry.date} entry={entry} index={i} />
        ))}
      </ol>

      <style jsx global>{`
        .timeline-counter {
          counter-reset: step;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .timeline-counter > li {
          counter-increment: step;
        }
        .timeline-counter > li .counter-num::before {
          content: counter(step, decimal-leading-zero);
          font-feature-settings: 'tnum';
        }
      `}</style>
    </div>
  )
}

function TimelineItem({ entry, index }: { entry: Experience; index: number }) {
  const cat = CATEGORY_STYLES[entry.category]
  const isLeft = index % 2 === 0

  return (
    <li className="relative pb-16 md:pb-20 last:pb-0">
      <FadeIn delay={index * 0.08}>
        <div
          className={`md:grid md:grid-cols-2 md:gap-12 ${
            isLeft ? '' : 'md:[&>*:first-child]:col-start-2'
          }`}
        >
          {/* Card */}
          <div
            className={`pl-14 md:pl-0 ${
              isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
            }`}
          >
            {/* Meta row */}
            <div
              className={`flex items-center gap-2.5 mb-3 text-xs font-medium ${
                isLeft ? 'md:justify-end' : ''
              }`}
            >
              <span className={`inline-flex items-center gap-1.5 ${cat.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                {entry.category}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">{entry.date}</span>
            </div>

            {/* Title + Company */}
            <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-1">
              {entry.title}
            </h2>
            <p className="text-slate-500 italic text-sm md:text-base mb-5">
              {entry.company} — {entry.location}
            </p>

            {/* Description */}
            <p
              className={`text-slate-400 leading-relaxed text-sm md:text-[15px] mb-5 ${
                isLeft ? 'md:ml-auto' : ''
              }`}
            >
              {entry.description}
            </p>

            {/* Stack */}
            {entry.stack && entry.stack.length > 0 && (
              <div
                className={`flex flex-wrap gap-1.5 ${
                  isLeft ? 'md:justify-end' : ''
                }`}
              >
                {entry.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 text-xs bg-bg-card border border-border-subtle rounded text-slate-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Counter dot — positioned on the line */}
        <span
          className={`counter-num absolute top-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-card border-2 ${cat.dot.replace(
            'bg-',
            'border-'
          )} text-white text-sm md:text-base font-bold ring-4 ring-bg-primary left-0 md:left-1/2 md:-translate-x-1/2`}
          aria-hidden="true"
        />
      </FadeIn>
    </li>
  )
}

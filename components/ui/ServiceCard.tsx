import Link from 'next/link'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

interface ServiceCardProps {
  slug: string
  icon: LucideIcon
  title: string
  description: string
  scope: string
  timeline: string
  popular?: boolean
  delay?: number
}

export function ServiceCard({
  slug,
  icon: Icon,
  title,
  description,
  scope,
  timeline,
  popular,
  delay = 0,
}: ServiceCardProps) {
  return (
    <FadeIn delay={delay}>
      <div
        className={`relative bg-bg-card border rounded-xl p-6 h-full flex flex-col transition-colors duration-300 ${
          popular
            ? 'border-accent/40 shadow-[0_0_24px_rgba(0,212,170,0.08)] hover:border-accent/60'
            : 'border-border-subtle hover:border-accent/50'
        }`}
      >
        {popular && (
          <span className="absolute top-4 right-4 text-[10px] px-2.5 py-1 bg-accent/15 border border-accent/30 rounded-full text-accent font-semibold">
            Popular
          </span>
        )}

        <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-5">
          <Icon size={20} className="text-accent" />
        </div>

        <h3 className="text-fg-strong font-semibold text-base mb-2">{title}</h3>
        <p className="text-fg-muted text-sm leading-relaxed mb-5">
          {description}
        </p>

        {/* Spec rows */}
        <dl className="text-xs space-y-1.5 mb-5 mt-auto pt-5 border-t border-border-subtle">
          <div className="flex gap-3">
            <dt className="text-fg-faint font-mono uppercase tracking-wider shrink-0 w-16">
              Scope
            </dt>
            <dd className="text-fg-default">{scope}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-fg-faint font-mono uppercase tracking-wider shrink-0 w-16">
              Timeline
            </dt>
            <dd className="text-fg-default">{timeline}</dd>
          </div>
        </dl>

        <Link
          href={`/contact?service=${slug}`}
          className="group inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-[gap]"
        >
          Discuss this
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </FadeIn>
  )
}

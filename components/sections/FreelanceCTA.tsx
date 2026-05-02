import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'

export function FreelanceCTA() {
  return (
    <section className="border-t border-border-subtle">
      <FadeIn>
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-semibold tracking-[2px] uppercase">
                Available for work
              </span>
            </div>
            <p className="text-white text-xl font-bold">
              Looking for a developer or AI engineer?
            </p>
            <p className="text-slate-400 text-sm mt-1">
              I take on freelance and contract work - let&apos;s build something together.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-7 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}

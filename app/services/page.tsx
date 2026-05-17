import type { Metadata } from 'next'
import { Globe, Server, Brain, Cpu, Wrench } from 'lucide-react'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, AI consulting, LLM engineering, server admin, and tech assistance services.',
}

const services = [
  {
    slug: 'web-development',
    icon: Globe,
    title: 'Web Development',
    description:
      'I build websites and web apps with React and Next.js. From a one-pager for a local business to a multi-page marketing site with a CMS and contact forms wired up.',
    scope: 'Landing page, marketing site, or small web app',
    timeline: '1 to 4 weeks',
    popular: false,
  },
  {
    slug: 'server-hosting',
    icon: Server,
    title: 'Server & Hosting',
    description:
      'I set up your VPS, deployment pipeline, SSL, monitoring, and backups. Then keep it running. Best for teams without a dedicated ops person.',
    scope: 'VPS setup, deployment, or ongoing managed hosting',
    timeline: '2 to 7 days for setup; monthly retainer optional',
    popular: false,
  },
  {
    slug: 'ai-consulting',
    icon: Brain,
    title: 'AI Consulting & Implementation',
    description:
      'I help you figure out where AI actually helps your product, then build it. Chatbots, document Q&A, semantic search, custom workflows. No buzzword fluff.',
    scope: 'Discovery call, AI feature prototype, or production integration',
    timeline: '1 week prototype; 2 to 6 weeks production',
    popular: true,
  },
  {
    slug: 'llm-engineering',
    icon: Cpu,
    title: 'LLM Engineering',
    description:
      'Deeper LLM work: fine-tuning open-source models, building RAG pipelines, prompt engineering, evals, and shipping it to production reliably.',
    scope: 'RAG pipeline, fine-tune job, or eval harness',
    timeline: '2 to 8 weeks depending on data',
    popular: false,
  },
  {
    slug: 'tech-assistance',
    icon: Wrench,
    title: 'Tech Assistance',
    description:
      'Hands-on tech help for individuals. Smart home setup, AV and home theater wiring, PC builds, debugging the stuff that nobody else wants to touch.',
    scope: 'Phoenix-area only, or remote walkthrough',
    timeline: 'Single session or short project',
    popular: false,
  },
]

const process = [
  {
    step: '01',
    title: 'Scope',
    body: 'Quick call or email. We figure out what you actually need, what success looks like, and whether I am the right fit.',
  },
  {
    step: '02',
    title: 'Build',
    body: 'I send updates as I go, share previews early, and adjust as the work takes shape. No 4-week silence.',
  },
  {
    step: '03',
    title: 'Ship',
    body: 'You get the live thing plus the code, docs, and a handoff. Optional ongoing support after launch.',
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <div className="mb-16">
          <h1
            className="font-display uppercase text-fg-strong leading-[0.9] tracking-tight"
            style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            Services
            <span className="block text-fg-muted italic font-normal normal-case font-sans text-xl sm:text-2xl mt-3 max-w-md leading-snug">
              what I do, and how I can help.
            </span>
          </h1>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard
            key={service.slug}
            slug={service.slug}
            icon={service.icon}
            title={service.title}
            description={service.description}
            scope={service.scope}
            timeline={service.timeline}
            popular={service.popular}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* How I work */}
      <FadeIn delay={0.3}>
        <section className="mt-24 pt-16 border-t border-border-subtle">
          <div className="flex items-baseline justify-between gap-6 mb-10 text-fg-faint text-xs font-mono">
            <span>— How I work</span>
            <span className="hidden sm:inline">3 steps</span>
          </div>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
            {process.map((p) => (
              <div key={p.step} className="flex flex-col gap-3">
                <span className="font-mono text-fg-faint text-sm tabular-nums">
                  {p.step}
                </span>
                <h3 className="font-display uppercase text-fg-strong text-2xl tracking-tight" style={{ fontWeight: 900 }}>
                  {p.title}
                </h3>
                <p className="text-fg-muted text-sm leading-relaxed max-w-xs">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>
    </div>
  )
}

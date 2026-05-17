import type { Metadata } from 'next'
import Link from 'next/link'
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
    icon: Globe,
    title: 'Web Development',
    description:
      'Custom websites and web applications for businesses of all sizes - from landing pages to full-stack Next.js apps. Fast, responsive, SEO-ready.',
    popular: false,
  },
  {
    icon: Server,
    title: 'Server & Hosting',
    description:
      'VPS setup, server administration, deployment pipelines, SSL, monitoring, and ongoing hosting management.',
    popular: false,
  },
  {
    icon: Brain,
    title: 'AI Consulting & Implementation',
    description:
      'Strategy and hands-on implementation of AI features into your product - chatbots, document Q&A, semantic search, and more.',
    popular: true,
  },
  {
    icon: Cpu,
    title: 'LLM Engineering',
    description:
      'Fine-tuning open-source LLMs, building RAG pipelines, prompt engineering, evaluation, and production deployment.',
    popular: false,
  },
  {
    icon: Wrench,
    title: 'Tech Assistance',
    description:
      'Hands-on tech help for individuals - smart home setup, AV/movie room wiring, PC builds, general troubleshooting.',
    popular: false,
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
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            popular={service.popular}
            delay={i * 0.08}
          />
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-16 text-center">
          <p className="text-fg-muted mb-6">Have something specific in mind?</p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}

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
      'Custom websites and web applications for businesses of all sizes — from landing pages to full-stack Next.js apps. Fast, responsive, SEO-ready.',
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
      'Strategy and hands-on implementation of AI features into your product — chatbots, document Q&A, semantic search, and more.',
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
      'Hands-on tech help for individuals — smart home setup, AV/movie room wiring, PC builds, general troubleshooting.',
    popular: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
            What I Do
          </p>
          <h1 className="text-white text-4xl font-extrabold">Services</h1>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            From building fast websites to training AI models — I cover the full stack of modern digital work.
          </p>
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
          <p className="text-slate-400 mb-6">Have something specific in mind?</p>
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

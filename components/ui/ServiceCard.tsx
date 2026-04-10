import { type LucideIcon } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  popular?: boolean
  delay?: number
}

export function ServiceCard({ icon: Icon, title, description, popular, delay = 0 }: ServiceCardProps) {
  return (
    <FadeIn delay={delay}>
      <div
        className={`relative bg-bg-card border rounded-xl p-6 h-full hover:border-accent/50 transition-colors duration-300 ${
          popular
            ? 'border-accent/40 shadow-[0_0_24px_rgba(0,212,170,0.08)]'
            : 'border-border-subtle'
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
        <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </FadeIn>
  )
}

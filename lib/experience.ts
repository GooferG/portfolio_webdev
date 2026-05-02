export type ExperienceCategory =
  | 'Frontend Development'
  | 'Website Security'
  | 'Technical Support'
  | 'Life'

export interface Experience {
  date: string
  category: ExperienceCategory
  title: string
  company: string
  location: string
  description: string
  stack?: string[]
}

export const experiences: Experience[] = [
  {
    date: 'Jan 2026 – Present',
    category: 'Frontend Development',
    title: 'Contributing Frontend Developer',
    company: 'Somnicue',
    location: 'Remote',
    description:
      'Helping build SomniCue, an iOS app that uses Targeted Memory Reactivation (TMR) — a neuroscience-backed technique — to play targeted audio cues during sleep for memory consolidation, learning, and creativity. Contributing front-end work, iOS implementation assistance, and hands-on testing alongside the founding developer.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'iOS', 'Testing'],
  },
  {
    date: 'May 2024 – Jul 2025',
    category: 'Frontend Development',
    title: 'Frontend Developer',
    company: 'JETSET Magazine & Inked Magazine',
    location: 'Scottsdale, AZ',
    description:
      'Built and maintained WordPress sites for two publications and served as the primary technical liaison for 30+ active JETSET clients. Cut downtime ~20% through proactive monitoring, ran custom front-end and back-end fixes across both sites, kept the Inked e-commerce catalog updated, and managed Google Ads campaigns that lifted ROI by 35%. Designed weekly email marketing and implemented tracking + analytics with the marketing team.',
    stack: ['WordPress', 'Elementor', 'JavaScript', 'Google Ads', 'Analytics'],
  },
  {
    date: 'Aug 2019 – May 2024',
    category: 'Website Security',
    title: 'Website Security Analyst',
    company: 'GoDaddy',
    location: 'Tempe, AZ',
    description:
      'Frontline analyst for e-commerce, blog, and enterprise customers facing real attacks. Read server logs, identified threats, and executed mitigation strategies; administered Linux servers, configured firewalls, managed DNS, and maintained backup systems. Cut malware incident resolution time by 30% and wrote the internal documentation and training materials that improved team efficiency.',
    stack: ['Linux', 'DNS', 'Firewalls', 'Log Analysis', 'Malware Remediation'],
  },
  {
    date: 'Sep 2015 – Jul 2019',
    category: 'Technical Support',
    title: 'Advanced Technical Support Representative',
    company: 'GoDaddy',
    location: 'Tempe, AZ',
    description:
      'Frontline support for Brazilian and Portuguese-speaking customers across hosting, domains, and website services. Debugged DNS and domain configurations, hosting issues, and server problems with minimal supervision while maintaining high CSAT through complex technical and billing escalations.',
    stack: ['cPanel', 'DNS', 'Hosting', 'Portuguese Support'],
  },
]

export const CATEGORY_STYLES: Record<
  ExperienceCategory,
  { dot: string; text: string; ring: string }
> = {
  'Frontend Development': {
    dot: 'bg-accent',
    text: 'text-accent',
    ring: 'ring-accent/30',
  },
  'Website Security': {
    dot: 'bg-rose-400',
    text: 'text-rose-400',
    ring: 'ring-rose-400/30',
  },
  'Technical Support': {
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    ring: 'ring-amber-400/30',
  },
  Life: {
    dot: 'bg-sky-400',
    text: 'text-sky-400',
    ring: 'ring-sky-400/30',
  },
}

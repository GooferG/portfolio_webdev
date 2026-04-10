import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Web development, AI, and app projects by Luiz Meneghim.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

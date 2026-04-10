export type ProjectCategory = 'Web' | 'AI/LLM' | 'Apps'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  github: string
  live: string
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'small-biz-website',
    title: 'Small Business Website',
    description:
      'A fast, responsive website built for a local business using Next.js and Tailwind CSS, with SEO optimization and Vercel deployment.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    category: 'Web',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/placeholder-project.jpg',
    featured: true,
  },
  {
    id: 'llm-finetune-pipeline',
    title: 'LLM Fine-tune Pipeline',
    description:
      'End-to-end pipeline for fine-tuning open-source LLMs with custom datasets, evaluation, and deployment on AWS infrastructure.',
    tags: ['Python', 'HuggingFace', 'AWS'],
    category: 'AI/LLM',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/placeholder-project.jpg',
    featured: true,
  },
  {
    id: 'react-dashboard',
    title: 'React Dashboard App',
    description:
      'A data dashboard with filterable tables, real-time charts, and a clean component library built with React and TypeScript.',
    tags: ['React', 'TypeScript', 'shadcn/ui'],
    category: 'Apps',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/placeholder-project.jpg',
    featured: true,
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectsByCategory(category: ProjectCategory | 'All'): Project[] {
  if (category === 'All') return projects
  return projects.filter(p => p.category === category)
}

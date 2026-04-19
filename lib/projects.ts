export type ProjectCategory = 'Web' | 'AI/LLM' | 'Apps';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: ProjectCategory;
  github: string;
  live: string;
  image: string;
  screenshots?: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'small-biz-website',
    title: 'Small Business Website',
    description:
      'A fast, responsive website built for a local business using Next.js and Tailwind CSS, with SEO optimization and Vercel deployment. Site pulls content from a headless CMS and includes a contact form integrated with GoDaddy Shared Hosting & VPS setup for backend processing.',
    tags: [
      'Next.js',
      'Tailwind',
      'Vercel',
      'GoDaddy Shared Hosting & VPS setup',
    ],
    category: 'Web',
    github: 'https://github.com/GooferG/universally-us',
    live: 'https://universallyus.com',
    image: 'images/universallyus_screenshot.jpg',
    screenshots: ['images/universallyus_screenshot.jpg'],
    featured: true,
  },
  {
    id: 'streamer-fullstack-website',
    title: 'Streamer Fullstack Website',
    description:
      'A fullstack website for a streamer, built with Next.js and Tailwind CSS, featuring a modern design and seamless user experience. The site includes Twitch integration via API calls, tools for managing stream schedules and content, and is deployed on Vercel for optimal performance.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    category: 'Web',
    github: 'https://github.com/GooferG/streamsite',
    live: 'https://goofer.tv',
    image: '/images/goofertv.jpg',
    screenshots: ['/images/goofertv.jpg'],
    featured: true,
  },
  {
    id: 'lead-generation-dashboard',
    title: 'Lead Generation Dashboard',
    description:
      'A lead generation dashboard built with Next.js and Tailwind CSS, designed to help businesses track and manage their leads effectively. The dashboard features real-time data visualization, integration with popular CRM systems, and is deployed on Vercel for fast performance.',
    tags: [
      'Next.js',
      'Tailwind',
      'Vercel',
      'Supabase',
      'Google API',
      'Anthropics API',
    ],
    category: 'Apps',
    github: 'https://github.com/GooferG/leadgenerator_ai',
    live: 'https://leadgenerator-ai-9aop.vercel.app/',
    image: '/images/lead_generator.jpg',
    screenshots: ['/images/lead_generator.jpg'],
    featured: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function getProjectsByCategory(
  category: ProjectCategory | 'All'
): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

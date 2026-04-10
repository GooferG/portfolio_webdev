export type ProjectCategory = 'Web' | 'AI/LLM' | 'Apps';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  github: string;
  live: string;
  image: string;
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
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: 'images/universallyus_screenshot.jpg',
    featured: true,
  },
  {
    id: 'Streamer Fullstack Website',
    title: 'Streamer Fullstack Website',
    description:
      'A fullstack website for a streamer, built with Next.js and Tailwind CSS, featuring a modern design and seamless user experience. The site includes Twitch integration via API calls, tools for managing stream schedules and content, and is deployed on Vercel for optimal performance.',
    tags: ['Next.js', 'Tailwind', 'Vercel'],
    category: 'Web',
    github: 'https://github.com/luizmeneghim',
    live: '#',
    image: '/images/goofertv.jpg',
    featured: true,
  },
  // {
  //   id: 'react-dashboard',
  //   title: 'React Dashboard App',
  //   description:
  //     'A data dashboard with filterable tables, real-time charts, and a clean component library built with React and TypeScript.',
  //   tags: ['React', 'TypeScript', 'shadcn/ui'],
  //   category: 'Apps',
  //   github: 'https://github.com/luizmeneghim',
  //   live: '#',
  //   image: '/images/placeholder-project.jpg',
  //   featured: true,
  // },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(
  category: ProjectCategory | 'All'
): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

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
  imagePosition?: string;
  screenshots?: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'applygecko',
    title: 'ApplyGecko',
    description:
      'AI-powered Chrome extension that auto-fills job applications across LinkedIn, Greenhouse, Lever, Workday, and 20+ other boards, plus a dashboard for tracking, tailoring, and analyzing every send.',
    longDescription:
      'ApplyGecko removes the worst part of job hunting: filling out the same form ten times a day. The Chrome extension recognizes 20+ major job boards, parses the posting, and auto-fills the application from your profile in seconds. The web dashboard sits alongside as your command center: track every application by status, tailor your resume per role with Claude, and watch funnel analytics to see which applications convert.',
    tags: ['Next.js', 'Supabase', 'Chrome Extension', 'Anthropic API'],
    category: 'AI/LLM',
    github: 'https://github.com/dweberdev/applygecko',
    live: '',
    image: '/images/projects/applygecko/apply-gecko-hp.jpg',
    imagePosition: 'center top',
    screenshots: [
      '/images/projects/applygecko/apply-gecko-hp.jpg',
      '/images/projects/applygecko/apply-gecko-dash.jpg',
      '/images/projects/applygecko/apply-gecko-apply.jpg',
      '/images/projects/applygecko/apply-gecko-apps.jpg',
      '/images/projects/applygecko/apply-gecko-profile.jpg',
      '/images/projects/applygecko/apply-gecko-login.jpg',
    ],
    featured: true,
  },
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
    image: '/images/projects/universally-us/screenshot.jpg',
    imagePosition: 'center 0%',
    screenshots: ['/images/projects/universally-us/screenshot.jpg'],
    featured: true,
  },
  {
    id: 'tanner-metro-site',
    title: 'Tanner Metro — Voice Actor & Sound Designer',
    description:
      'A portfolio and booking site for a Phoenix-based voice actor and sound designer. Built with Next.js and Tailwind CSS, the site showcases voice demo reels, studio capabilities, and sound design services across trailers, game audio, sonic branding, podcasts, UI/product, and field/foley. Features a custom typographic hero, animated sections, and an embedded contact flow, deployed on Vercel.',
    tags: ['Next.js', 'Tailwind', 'Vercel', 'TypeScript', 'Framer Motion'],
    category: 'Web',
    github: 'https://github.com/GooferG/tannermetrosite',
    live: 'https://tannermetrosite.vercel.app/',
    image: '/images/projects/tannermetro/hero.jpg',
    imagePosition: 'center 0%',
    screenshots: ['/images/projects/tannermetro/hero.jpg'],
    featured: true,
  },
  {
    id: 'streamer-fullstack-website',
    title: 'Streamer Fullstack Website',
    description:
      'A fullstack website for a streamer, built with Next.js and Tailwind CSS, featuring a modern design and seamless user experience. The site includes Twitch integration via API calls, tools for managing stream schedules and content, and is deployed on Vercel for optimal performance.',
    tags: ['Next.js', 'Tailwind', 'Vercel', 'Twitch API', 'Generative AI'],
    category: 'Web',
    github: 'https://github.com/GooferG/streamsite',
    live: 'https://goofer.tv',
    image: '/images/projects/goofertv/hero.jpg',
    imagePosition: 'center 0%',
    screenshots: ['/images/projects/goofertv/hero.jpg'],
    featured: true,
  },
  {
    id: 'Hook',
    title: 'Hook - AI-Powered Lead Generation Dashboard',
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
    live: 'https://leadgenerator-ai.vercel.app/',
    image: '/images/projects/lead-gen/hook-home-dark.png',
    imagePosition: 'center top',
    screenshots: [
      '/images/projects/lead-gen/hook-home-dark.png',
      '/images/projects/lead-gen/hook-home-light.png',
      '/images/projects/lead-gen/hook-dashboard-dark.png',
      '/images/projects/lead-gen/hook-dashboard-light.png',
      '/images/projects/lead-gen/hook-lead-dark.png',
      '/images/projects/lead-gen/hook-lead-light.png',
      '/images/projects/lead-gen/hook-search-dark.png',
      '/images/projects/lead-gen/hook-search-light.png',
    ],
    featured: true,
  },
  {
    id: 'TMR-sleep-app',
    title: 'Somnicue Sleep App',
    description:
      'SomniCue uses Targeted Memory Reactivation (TMR) - a neuroscience-backed technique - to control what your brain consolidates while you sleep. Memories, motor patterns, breakthroughs, all on your terms. The app plays specific sounds during sleep to enhance memory consolidation, improve learning, and boost creativity. It’s like a personal trainer for your brain, optimizing your sleep for better performance.',
    tags: ['Next.js 14', 'Typescript', 'Tailwind CSS 3'],
    category: 'Apps',
    github: 'https://github.com/dweberdev/somnicue',
    live: 'https://somnicue.com',
    image: '/images/projects/somnicue/app.jpg',
    imagePosition: 'center 57%',
    screenshots: ['/images/projects/somnicue/app.jpg'],
    featured: true,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(
  category: ProjectCategory | 'All'
): Project[] {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

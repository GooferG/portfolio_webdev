import { getFeaturedProjects } from '@/lib/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeIn } from '@/components/ui/FadeIn'
import Link from 'next/link'

export function FeaturedProjects() {
  const featured = getFeaturedProjects()

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <FadeIn>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
              Selected Work
            </p>
            <h2 className="text-white text-3xl font-extrabold">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:block"
          >
            View all →
          </Link>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.1} className="h-full">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href="/projects" className="text-slate-400 hover:text-white text-sm transition-colors">
          View all projects →
        </Link>
      </div>
    </section>
  )
}

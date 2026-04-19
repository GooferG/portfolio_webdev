import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProjectById } from '@/lib/projects'
import { ProjectDetailClient } from '@/components/ui/ProjectDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) return {}
  return {
    title: project.title,
    description: project.longDescription ?? project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const prevProject = index > 0 ? projects[index - 1] : null
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  )
}

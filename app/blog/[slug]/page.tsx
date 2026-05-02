import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostContent } from '@/lib/blog'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { frontmatter } = getPostContent(slug)
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { frontmatter, source } = getPostContent(slug)

  return (
    <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-fg-subtle hover:text-accent text-sm mb-12 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {frontmatter.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 bg-bg-card border border-border-subtle rounded-full text-fg-subtle"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-fg-strong text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
          {frontmatter.title}
        </h1>

        <p className="text-fg-subtle text-sm">
          {new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {frontmatter.readingTime} min read
        </p>
      </header>

      <div className="prose prose-invert prose-slate max-w-none prose-headings:text-fg-strong prose-a:text-accent prose-code:text-accent prose-pre:bg-bg-card prose-pre:border prose-pre:border-border-subtle">
        <MDXRemote source={source} />
      </div>

      <div className="mt-16 pt-8 border-t border-border-subtle">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-fg-subtle hover:text-accent text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>
      </div>
    </div>
  )
}

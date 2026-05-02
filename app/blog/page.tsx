import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/ui/BlogCard'
import { FadeIn } from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on web development, AI, LLMs, and tech by Luiz Meneghim.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Writing
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-4">Blog</h1>
        <p className="text-slate-400 mb-16">
          Thoughts on web development, AI engineering, and the occasional build log.
        </p>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-slate-500">No posts yet - check back soon.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  )
}

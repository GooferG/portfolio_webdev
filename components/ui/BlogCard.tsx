import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-bg-card border border-border-subtle rounded-xl p-6 hover:border-accent/40 transition-colors duration-300">
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] px-2.5 py-1 bg-bg-primary border border-border-subtle rounded-full text-fg-subtle"
          >
            {tag}
          </span>
        ))}
      </div>

      <h2 className="text-fg-strong font-semibold text-lg leading-snug mb-3">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
          {post.title}
        </Link>
      </h2>
      <p className="text-fg-subtle text-sm leading-relaxed mb-5">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <span className="text-fg-faint text-xs">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}{' '}
          · {post.readingTime} min read
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-accent text-sm hover:text-accent/80 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
}

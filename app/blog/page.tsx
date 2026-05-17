import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { BlogCard } from '@/components/ui/BlogCard';
import { FadeIn } from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on web development, AI, LLMs, and tech by Luiz Meneghim.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <h1
          className="font-display uppercase text-fg-strong leading-[0.9] tracking-tight mb-16"
          style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Blog
          <span className="block text-fg-muted italic font-normal normal-case font-sans text-xl sm:text-2xl mt-3 max-w-md leading-snug">
            notes on the web, AI, and the occasional build log.
          </span>
        </h1>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-fg-subtle">No posts yet - check back soon.</p>
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
  );
}

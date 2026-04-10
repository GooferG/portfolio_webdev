import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  readingTime: number
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      const wordCount = content.split(/\s+/).filter(Boolean).length

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        excerpt: data.excerpt as string,
        readingTime: Math.max(1, Math.ceil(wordCount / 200)),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostContent(slug: string): { frontmatter: BlogPost; source: string } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordCount = content.split(/\s+/).filter(Boolean).length

  return {
    frontmatter: {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) ?? [],
      excerpt: data.excerpt as string,
      readingTime: Math.max(1, Math.ceil(wordCount / 200)),
    },
    source: content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Luiz Meneghim - web developer and AI engineer.',
};

const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'LLMs / RAG',
  'HuggingFace',
  'OpenAI API',
  'Docker',
  'Linux',
  'PostgreSQL',
  'Vercel',
  'Tailwind CSS',
  'Framer Motion',
  'Git',
  'AWS',
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Who I Am
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-16">About Me</h1>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <FadeIn>
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-sm">
              <Image
                src="/images/luiz-about.jpg"
                alt="Luiz Meneghim"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
              }}
            />
          </div>
        </FadeIn>

        <div className="flex flex-col gap-8">
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-5 text-slate-400 leading-relaxed">
              <p>
                Hey, I&apos;m Luiz - a web developer and AI engineer. I build
                modern web applications and help businesses integrate AI into
                their workflows. I care about clean code, great user
                experiences, and shipping things that actually work.
              </p>
              <p>
                On the web side, I focus on React and Next.js applications -
                from small business landing pages to full-stack web apps. On the
                AI side, I work with LLMs, RAG pipelines, fine-tuning, and API
                integrations to help teams move from &quot;AI curious&quot; to
                &quot;AI productive.&quot;
              </p>
              <p>
                When I&apos;m not writing code, I&apos;m gaming, making music,
                editing videos, or hanging out with friends. I like building
                things that work, whether that&apos;s a React app or a beat that
                actually slaps.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for freelance
              </span>
              <a
                href="/luiz-cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 border border-border-subtle text-slate-400 hover:text-white hover:border-accent rounded-full text-sm transition-colors"
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-white font-semibold text-base mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-bg-card border border-border-subtle rounded-lg text-slate-400 text-sm hover:border-accent/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Link
              href="/contact"
              className="w-fit px-7 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors text-sm"
            >
              Let&apos;s Work Together
            </Link>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

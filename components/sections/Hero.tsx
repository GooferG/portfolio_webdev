'use client';

import Link from 'next/link';
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons';
import { ShaderBackground } from '@/components/ui/ShaderBackground';

const socials = [
  { href: 'https://github.com/goofer_g', icon: GitHubIcon, label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/lmeneghim/',
    icon: LinkedInIcon,
    label: 'LinkedIn',
  },
  { href: 'https://twitter.com/Goofer_G', icon: XIcon, label: 'Twitter' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Shader as background texture — heavily subdued */}
      <ShaderBackground className="opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'var(--overlay-on-bg)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-between">
        {/* Top: small marker row */}
        <div className="flex items-baseline justify-between gap-6 text-fg-faint text-xs font-mono">
          <span className="tabular-nums">— 01 / Web + AI</span>
          <span className="hidden sm:inline">Phoenix, AZ · UTC-7</span>
        </div>

        {/* Middle: asymmetric grid — stacked name + body column */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start py-12">
          {/* LUIZ MENEGHIM as art element */}
          <div className="col-span-12 lg:col-span-7">
            <h1
              className="font-display text-fg-strong leading-[0.82] tracking-tight uppercase"
              style={{
                fontWeight: 900,
                fontSize: 'clamp(4.5rem, 13vw, 11rem)',
              }}
            >
              <span className="block">Luiz</span>
              <span className="block">
                Men<span className="text-accent">e</span>
                ghim
              </span>
            </h1>
          </div>

          {/* Body column right */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-8 lg:pt-4">
            <p className="text-fg-default text-lg leading-relaxed max-w-sm">
              Frontend engineer and AI builder. I ship React + Next.js apps and
              wire LLMs into products that work.
            </p>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                href="/contact"
                className="group inline-flex items-baseline gap-3 text-fg-strong hover:text-accent transition-colors w-fit"
              >
                <span className="text-accent">→</span>
                <span className="border-b border-fg-faint group-hover:border-accent transition-colors">
                  Start a project
                </span>
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-baseline gap-3 text-fg-muted hover:text-fg-strong transition-colors w-fit"
              >
                <span className="text-fg-faint">→</span>
                <span className="border-b border-transparent group-hover:border-fg-faint transition-colors">
                  See recent work
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: status row + socials */}
        <div className="flex flex-wrap items-end justify-between gap-6 text-xs font-mono">
          <div className="flex items-center gap-3 text-fg-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Available for freelance</span>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-fg-faint hover:text-accent transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

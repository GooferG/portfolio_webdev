'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GitHubCalendar } from 'react-github-calendar';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons';
import { ShaderBackground } from '@/components/ui/ShaderBackground';

const TAGLINE = 'I build things for the web — and teach machines to think.';

const socials = [
  {
    href: 'https://github.com/luizmeneghim',
    icon: GitHubIcon,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/luizmeneghim',
    icon: LinkedInIcon,
    label: 'LinkedIn',
  },
  { href: 'https://twitter.com/luizmeneghim', icon: XIcon, label: 'Twitter' },
];

const services = [
  'Web Development',
  'AI Consulting',
  'LLM Engineering',
  'Server Admin',
  'Tech Assistance',
];

export default function Hero() {
  const displayedTagline = useTypingEffect(TAGLINE);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated shader background */}
      <ShaderBackground className="opacity-50" />

      {/* Dark overlay — keeps text readable over shader */}
      <div className="absolute inset-0 bg-bg-primary/50 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-32 flex items-center gap-12">
        {/* Left: text content */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent block" />
            <span className="text-accent text-xs font-semibold tracking-[3px] uppercase">
              Hello, I am
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            Luiz
            <br />
            Meneghim
          </h1>

          <p className="text-slate-400 text-lg max-w-md leading-relaxed min-h-[56px]">
            {displayedTagline}
            <span className="inline-block w-[2px] h-5 bg-accent ml-1 align-middle animate-pulse" />
          </p>

          <div className="flex items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="px-7 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 transition-colors text-sm"
            >
              Hire Me
            </Link>
            <Link
              href="/projects"
              className="px-7 py-3 border border-border-subtle text-slate-400 rounded-full hover:border-accent hover:text-white transition-colors text-sm"
            >
              My Work
            </Link>
          </div>

          <div className="flex items-center gap-3 mt-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-card border border-border-subtle text-slate-500 hover:text-accent hover:border-accent transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo with fade */}
        <div className="hidden md:block relative flex-shrink-0 w-[420px] h-[560px]">
          <Image
            src="/images/luiz-meneghim-hero.jpg"
            alt="Luiz Meneghim"
            fill
            priority
            className="object-cover object-top rounded-2xl"
            style={{
              maskImage:
                'linear-gradient(to left, black 40%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to left, black 40%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                'linear-gradient(to right, #0A0F1E 0%, transparent 35%)',
            }}
          />
        </div>
      </div>

      {/* github integration for hero section */}

      {/* <div className="absolute bottom-14 left-0 right-0 z-20 px-6 pb-15">
        <div className="max-w-6xl mx-auto">
          <div className="bg-bg-card/80 backdrop-blur-md border border-border-subtle rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-500 uppercase tracking-widest">
                GitHub Activity
              </span>
              <span className="text-xs text-slate-600">@GooferG</span>
            </div>

            <GitHubCalendar
              username="GooferG"
              blockSize={12}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </div>
      </div> */}

      {/* Service strip — bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md border-t border-border-subtle py-3 px-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-6 text-sm whitespace-nowrap">
          <span className="text-slate-600 uppercase tracking-widest text-[10px] font-semibold shrink-0">
            I offer
          </span>
          {services.map((s, i) => (
            <span key={s} className="flex items-center gap-6 text-slate-400">
              {i > 0 && (
                <span className="text-border-subtle mr-[-18px]">·</span>
              )}
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

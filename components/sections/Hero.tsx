'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShaderBackground } from '@/components/ui/ShaderBackground';
import { SunRise, useSunIntro } from '@/components/ui/SunRise';
import { SOCIALS } from '@/lib/socials';

type Status = { label: string };

function getStatus(hour: number): Status {
  if (hour >= 6 && hour < 9) return { label: 'Just made coffee' };
  if (hour >= 12 && hour < 13) return { label: 'Out for lunch, back at 1pm' };
  if (hour >= 17 && hour < 22)
    return { label: 'Off the clock, replies tomorrow' };
  if (hour >= 22 || hour < 6)
    return { label: 'Asleep, but the form still works' };
  return { label: 'Available for freelance' };
}

function useLocalStatus(): Status {
  const [status, setStatus] = useState<Status>({
    label: 'Available for freelance',
  });

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date().getHours()));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

export default function Hero() {
  const status = useLocalStatus();
  const introPhase = useSunIntro();

  // Hero content fades in once the sun starts rising. During 'pending' (pre-mount)
  // the content is invisible; once intro starts, it cross-fades in over the sun rise.
  const contentVisible = introPhase !== 'pending';

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <ShaderBackground className="opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'var(--overlay-on-bg)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-between">
        {/* Spacer to preserve vertical centering of the grid */}
        <div aria-hidden="true" />

        {/* Middle: asymmetric grid */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start py-12 relative">
          <div className="col-span-12 lg:col-span-7 relative z-10">
            <h1
              className="font-display text-fg-strong leading-[0.82] tracking-tight uppercase"
              style={{
                fontWeight: 900,
                fontSize: 'clamp(4.5rem, 13vw, 11rem)',
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible
                  ? 'translateY(0)'
                  : 'translateY(12px)',
                transition:
                  'opacity 900ms ease-out 400ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 400ms',
              }}
            >
              <span className="block">Luiz</span>
              <span className="block whitespace-nowrap">
                Men<span className="text-accent">e</span>gh
                <span className="relative inline-block">
                  I
                  {/* Sun anchored to the I letterform. Size scales with letter
                      height via em units, so position stays glued at every
                      viewport size without media queries. */}
                  <SunRise
                    className="
                      z-[-1]
                      w-[1.5em] h-[2.2em]
                      top-[-1.12em] left-[-60%]
                      -translate-x-1/2
                      [clip-path:inset(0_0_50%_0)]
                    "
                  />
                </span>
                m
              </span>
            </h1>
          </div>

          <div
            className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-8 lg:pt-4 relative z-10"
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? 'translateY(0)' : 'translateY(12px)',
              transition:
                'opacity 900ms ease-out 700ms, transform 900ms cubic-bezier(0.22, 1, 0.36, 1) 700ms',
            }}
          >
            <p className="text-fg-default text-lg leading-relaxed max-w-sm">
              Frontend engineer and AI builder. I ship React + Next.js apps and
              wire <span className="text-accent">LLMs</span> into products that
              work.
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
        <div
          className="flex flex-wrap items-end justify-between gap-6 text-xs font-mono"
          style={{
            opacity: contentVisible ? 1 : 0,
            transition: 'opacity 900ms ease-out 1000ms',
          }}
        >
          <div className="flex items-center gap-3 text-fg-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>{status.label}</span>
          </div>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
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

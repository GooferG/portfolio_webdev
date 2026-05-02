'use client';

import { useState } from 'react';
import { Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons';
import { FadeIn } from '@/components/ui/FadeIn';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <p className="text-accent text-xs font-semibold tracking-[3px] uppercase mb-3">
          Let&apos;s Talk
        </p>
        <h1 className="text-white text-4xl font-extrabold mb-16">Contact</h1>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <FadeIn delay={0.05}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-sm" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about your project..."
                className="bg-bg-card border border-border-subtle rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 disabled:opacity-60 transition-colors text-sm w-fit"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-accent text-sm">
                <CheckCircle size={16} />
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </FadeIn>

        {/* Info panel */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-accent/10 border border-accent/30 rounded-xl w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">
                Available for work
              </span>
            </div>

            <div className="flex flex-col gap-6 text-slate-400 text-sm">
              <p className="leading-relaxed">
                Whether you need a new website, AI integration, server help, or
                just want to talk tech - I&apos;m happy to chat. I respond
                within 24 hours.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:luimeneghim@gmail.com"
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <Mail size={16} />
                  luimeneghim@gmail.com
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  Phoenix, AZ (UTC-7)
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
                <a
                  href="https://github.com/gooferg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <GitHubIcon size={16} />
                  github.com/gooferg
                </a>
                <a
                  href="https://www.linkedin.com/in/lmeneghim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <LinkedInIcon size={16} />
                  linkedin.com/in/lmeneghim/
                </a>
                <a
                  href="https://x.com/Goofer_G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <XIcon size={16} />
                  x.com/Goofer_G
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

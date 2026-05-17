'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Download,
} from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';
import { SOCIALS } from '@/lib/socials';

type FormStatus = 'idle' | 'loading' | 'success' | 'error-network' | 'error-server';

type FieldErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? '';
const EMAIL_ADDRESS = 'luimeneghim@gmail.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 100,
  email: 200,
  subject: 200,
  message: 2000,
};

const SERVICE_SUBJECTS: Record<string, string> = {
  'web-development': 'Web development project',
  'server-hosting': 'Server / hosting help',
  'ai-consulting': 'AI consulting',
  'llm-engineering': 'LLM engineering project',
  'tech-assistance': 'Tech assistance',
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get('service') ?? '';
  const defaultSubject = SERVICE_SUBJECTS[serviceSlug] ?? '';

  function validate(formData: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name) next.name = 'Tell me your name.';
    else if (name.length > LIMITS.name) next.name = `Keep it under ${LIMITS.name} characters.`;

    if (!email) next.email = 'I need an email to reply to.';
    else if (!EMAIL_REGEX.test(email)) next.email = 'That email looks off. Try name@example.com.';
    else if (email.length > LIMITS.email) next.email = `Keep it under ${LIMITS.email} characters.`;

    if (!subject) next.subject = 'Add a short subject.';
    else if (subject.length > LIMITS.subject) next.subject = `Keep it under ${LIMITS.subject} characters.`;

    if (!message) next.message = 'Tell me a bit about the project.';
    else if (message.length < 10) next.message = 'A little more detail helps. At least 10 characters.';
    else if (message.length > LIMITS.message) next.message = `Keep it under ${LIMITS.message} characters.`;

    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: if filled, silently "succeed" but don't actually send
    if (String(formData.get('_gotcha') ?? '').length > 0) {
      setStatus('success');
      form.reset();
      setMessageLength(0);
      return;
    }

    const fieldErrors = validate(formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setMessageLength(0);
      } else {
        setStatus('error-server');
      }
    } catch {
      setStatus('error-network');
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API blocked (e.g., insecure context). Fall through.
    }
  }

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  const inputBase =
    'bg-bg-card border rounded-xl px-4 py-3 text-fg-strong text-sm placeholder:text-fg-faint focus:outline-none transition-colors';
  const inputClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? 'border-red-400/60 focus:border-red-400' : 'border-border-subtle focus:border-accent'}`;

  const messageOver = messageLength > LIMITS.message;
  const messageWarn = messageLength > LIMITS.message * 0.9;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <FadeIn>
        <h1
          className="font-display uppercase text-fg-strong leading-[0.9] tracking-tight mb-16"
          style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Contact
          <span className="block text-fg-muted italic font-normal normal-case font-sans text-xl sm:text-2xl mt-3 max-w-md leading-snug">
            tell me about your project. I reply within 24 hours.
          </span>
        </h1>
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <FadeIn delay={0.05}>
          {status === 'success' ? (
            <SuccessPanel onReset={() => setStatus('idle')} />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
              aria-busy={status === 'loading'}
            >
              {/* Honeypot: invisible to humans, bots will fill it */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  id="name"
                  label="Name"
                  error={errors.name}
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    maxLength={LIMITS.name}
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    onChange={() => clearError('name')}
                    className={inputClass(!!errors.name)}
                  />
                </Field>

                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={LIMITS.email}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    onChange={() => clearError('email')}
                    className={inputClass(!!errors.email)}
                  />
                </Field>
              </div>

              <Field id="subject" label="Subject" error={errors.subject}>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  maxLength={LIMITS.subject}
                  defaultValue={defaultSubject}
                  key={defaultSubject}
                  placeholder="What's this about?"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  onChange={() => clearError('subject')}
                  className={inputClass(!!errors.subject)}
                />
              </Field>

              <Field
                id="message"
                label="Message"
                error={errors.message}
                hint={
                  <span
                    className={`tabular-nums font-mono text-xs ${
                      messageOver
                        ? 'text-red-400'
                        : messageWarn
                          ? 'text-accent'
                          : 'text-fg-faint'
                    }`}
                  >
                    {messageLength} / {LIMITS.message}
                  </span>
                }
              >
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={LIMITS.message}
                  placeholder="Tell me about your project. Scope, timeline, budget if you have one, anything that helps."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  onChange={(e) => {
                    setMessageLength(e.target.value.length);
                    clearError('message');
                  }}
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
              </Field>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-3 bg-accent text-bg-primary font-bold rounded-full hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>

                {(status === 'error-server' || status === 'error-network') && (
                  <ErrorPanel kind={status} onCopyEmail={copyEmail} copied={copied} />
                )}
              </div>
            </form>
          )}
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

            <div className="flex flex-col gap-6 text-fg-muted text-sm">
              <p className="leading-relaxed">
                Whether you need a new website, AI integration, server help, or
                just want to talk tech, I am happy to chat. I reply within 24
                hours, usually faster.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-3 hover:text-accent transition-colors"
                >
                  <Mail size={16} />
                  {EMAIL_ADDRESS}
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  Phoenix, AZ (UTC-7)
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
                {SOCIALS.map(({ href, icon: Icon, label, display }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-accent transition-colors"
                  >
                    <Icon size={16} />
                    {display}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-fg-muted text-sm" htmlFor={id}>
          {label}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-red-400 text-xs"
        >
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col gap-6 bg-bg-card border border-accent/40 rounded-xl p-8"
    >
      <div className="flex items-center gap-3 text-accent">
        <CheckCircle size={20} />
        <h2 className="font-semibold text-base">Message sent.</h2>
      </div>

      <p className="text-fg-default text-sm leading-relaxed">
        I will reply within 24 hours, usually faster. Check your spam folder if
        you do not hear back, my replies sometimes land there.
      </p>

      <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
        <p className="text-fg-faint text-xs font-mono uppercase tracking-wider">
          While you wait
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/luiz-cv.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle text-fg-muted hover:text-fg-strong hover:border-accent rounded-full text-sm transition-colors"
          >
            <Download size={14} />
            Download CV
          </a>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border-subtle text-fg-muted hover:text-fg-strong hover:border-accent rounded-full text-sm transition-colors"
          >
            See recent work
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-fg-faint hover:text-fg-strong rounded-full text-sm transition-colors"
          >
            Send another message
          </button>
        </div>
      </div>
    </div>
  );
}

function ErrorPanel({
  kind,
  onCopyEmail,
  copied,
}: {
  kind: 'error-server' | 'error-network';
  onCopyEmail: () => void;
  copied: boolean;
}) {
  const heading =
    kind === 'error-network'
      ? 'Cannot reach the server.'
      : 'Something went wrong on our end.';
  const detail =
    kind === 'error-network'
      ? 'Check your connection and try again, or email me directly.'
      : 'Try again, or email me directly and I will sort it out.';

  return (
    <div
      role="alert"
      className="flex flex-col gap-2 text-sm w-full"
    >
      <div className="flex items-start gap-2 text-red-400">
        <AlertCircle size={14} className="mt-0.5 shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="font-medium">{heading}</span>
          <span className="text-fg-muted">{detail}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-1 ml-6">
        <a
          href={`mailto:${EMAIL_ADDRESS}`}
          className="text-accent hover:text-accent/80 underline underline-offset-4"
        >
          {EMAIL_ADDRESS}
        </a>
        <button
          type="button"
          onClick={onCopyEmail}
          className="inline-flex items-center gap-1.5 text-fg-faint hover:text-fg-strong transition-colors text-xs"
          aria-label="Copy email to clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

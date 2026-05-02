import { GitHubIcon, LinkedInIcon, XIcon } from '@/components/ui/SocialIcons'

const socials = [
  { href: 'https://github.com/luizmeneghim', icon: GitHubIcon, label: 'GitHub' },
  { href: 'https://linkedin.com/in/luizmeneghim', icon: LinkedInIcon, label: 'LinkedIn' },
  { href: 'https://twitter.com/luizmeneghim', icon: XIcon, label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-strong py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-fg-subtle">
        <span>© 2026 Luiz Meneghim</span>

        <div className="flex items-center gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-fg-subtle hover:text-accent transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <span>Built with Next.js + Tailwind</span>
      </div>
    </footer>
  )
}

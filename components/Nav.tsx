'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-accent font-extrabold text-xl tracking-tight">
            LM<span className="text-white">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === href
                    ? 'text-white font-medium'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-5 py-2 bg-accent text-bg-primary text-sm font-bold rounded-full hover:bg-accent/90 transition-colors"
            >
              Hire Me
            </Link>
          </div>

          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 lg:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-2xl font-semibold transition-colors ${
                pathname === href ? 'text-accent' : 'text-white hover:text-accent'
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 px-8 py-3 bg-accent text-bg-primary font-bold rounded-full text-lg"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </Link>
        </div>
      )}
    </>
  )
}

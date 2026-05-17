'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeCtx = {
  theme: Theme
  toggle: (origin?: { x: number; y: number }) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

// View Transitions API is not in lib.dom.d.ts in all TS versions yet.
type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> }
}

function applyTheme(next: Theme) {
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem('theme', next)
  } catch {}
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const initial =
      (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
    setTheme(initial)
  }, [])

  const toggle = (origin?: { x: number; y: number }) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    const doc = document as DocumentWithVT
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Set CSS custom props so the keyframe wipes from the click origin.
    if (origin) {
      document.documentElement.style.setProperty('--theme-x', `${origin.x}px`)
      document.documentElement.style.setProperty('--theme-y', `${origin.y}px`)
    } else {
      document.documentElement.style.setProperty('--theme-x', '50%')
      document.documentElement.style.setProperty('--theme-y', '50%')
    }

    // Use View Transitions if available and motion is allowed.
    if (doc.startViewTransition && !prefersReduced) {
      doc.startViewTransition(() => {
        setTheme(next)
        applyTheme(next)
      })
    } else {
      setTheme(next)
      applyTheme(next)
    }
  }

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

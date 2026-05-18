'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const SUN_COLOR = '#FF6B1F'
const STORAGE_KEY = 'sun-intro-played'

type SunRiseProps = {
  /**
   * Render the sun behind the hero name. Receives `intro` state so the parent
   * can stagger its own reveal against the sun's rise.
   */
  className?: string
}

export function useSunIntro() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<'pending' | 'rising' | 'settled'>('pending')

  useEffect(() => {
    // Skip intro if reduced motion or already played this session.
    if (reduced) {
      setPhase('settled')
      return
    }
    let played = false
    try {
      played = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // sessionStorage blocked (incognito edge cases). Skip intro.
      played = true
    }
    if (played) {
      setPhase('settled')
      return
    }

    // Kick off intro on next frame so initial paint shows the "rising" state.
    const raf = requestAnimationFrame(() => setPhase('rising'))
    const timer = setTimeout(() => {
      setPhase('settled')
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {}
    }, 1500)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [reduced])

  return phase
}

export function SunRise({ className = '' }: SunRiseProps) {
  const phase = useSunIntro()

  // Sun translates from below settled position to settled position.
  // Settled = translateY(0). Pending/rising start = translateY(60%).
  const translateY = phase === 'pending' || phase === 'rising' ? '60%' : '0%'
  const opacity = phase === 'pending' ? 0 : 1
  const rayScale = phase === 'settled' ? 1 : 0.7

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        transform: `translateY(${translateY})`,
        opacity,
        transition:
          phase === 'pending'
            ? 'none'
            : 'transform 1500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
      }}
    >
      <svg
        viewBox="-100 -100 200 200"
        className="w-full h-full overflow-visible"
        style={{
          transition: 'transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)',
          transform: `scale(${rayScale})`,
          transformOrigin: 'center',
        }}
      >
        {/* Outer glow */}
        <defs>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={SUN_COLOR} stopOpacity="0.35" />
            <stop offset="60%" stopColor={SUN_COLOR} stopOpacity="0.08" />
            <stop offset="100%" stopColor={SUN_COLOR} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft halo behind sun */}
        <circle cx="0" cy="0" r="90" fill="url(#sun-glow)" />

        {/* Rays — 12 evenly spaced, tapered */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12
          return (
            <g key={i} transform={`rotate(${angle})`}>
              <path
                d="M 0 -56 L 3 -85 L 0 -90 L -3 -85 Z"
                fill={SUN_COLOR}
                opacity={0.85}
              />
            </g>
          )
        })}

        {/* Core disc */}
        <circle cx="0" cy="0" r="42" fill={SUN_COLOR} />
      </svg>
    </div>
  )
}

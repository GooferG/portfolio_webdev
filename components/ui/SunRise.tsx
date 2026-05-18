'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const SUN_COLOR = '#FF6B1F'
const STORAGE_KEY = 'sun-intro-played'
const INTRO_DURATION_MS = 1800

type SunRiseProps = {
  className?: string
}

export function useSunIntro() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<'pending' | 'rising' | 'settled'>('pending')

  useEffect(() => {
    if (reduced) {
      setPhase('settled')
      return
    }
    let played = false
    try {
      played = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      played = true
    }
    if (played) {
      setPhase('settled')
      return
    }

    const raf = requestAnimationFrame(() => setPhase('rising'))
    const timer = setTimeout(() => {
      setPhase('settled')
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {}
    }, INTRO_DURATION_MS)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [reduced])

  return phase
}

// SSR-safe layout effect.
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function SunRise({ className = '' }: SunRiseProps) {
  const phase = useSunIntro()
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<{
    x: number
    y: number
    scale: number
  } | null>(null)

  // Compute the transform needed to place the sun's center at viewport center,
  // scaled large. Recomputed on resize so the intro stays correct if user resizes
  // mid-rise (rare but cheap).
  useIsoLayoutEffect(() => {
    if (!ref.current) return
    const compute = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Anchor's current center in viewport coordinates.
      const anchorCx = rect.left + rect.width / 2
      const anchorCy = rect.top + rect.height / 2
      // Target = viewport center.
      const targetCx = window.innerWidth / 2
      const targetCy = window.innerHeight / 2
      const dx = targetCx - anchorCx
      const dy = targetCy - anchorCy
      // Scale up so the sun's disc roughly fills the smaller viewport dimension.
      // Aim ~80vmin for the full sun width.
      const vmin = Math.min(window.innerWidth, window.innerHeight)
      const startSize = vmin * 0.8
      const scale = Math.max(startSize / Math.max(rect.width, 1), 3)
      setOffset({ x: dx, y: dy, scale })
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return (
    <SunRiseInner
      ref={ref}
      phase={phase}
      offset={offset}
      className={className}
    />
  )
}

// Separated so we can drive the rising→identity transform across two paints
// without manually orchestrating refs at the top level.
function SunRiseInner({
  ref,
  phase,
  offset,
  className,
}: {
  ref: React.RefObject<HTMLDivElement | null>
  phase: 'pending' | 'rising' | 'settled'
  offset: { x: number; y: number; scale: number } | null
  className: string
}) {
  // Animation tick: when phase flips to 'rising' AND offset exists, we render
  // one frame at the large transform (no transition), then next frame swap to
  // identity transform with transition enabled. Result: the browser animates
  // from large→identity.
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (phase === 'rising' && offset) {
      // Second paint: switch to identity to trigger the transition.
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setTick((t) => t + 1))
      })
      return () => cancelAnimationFrame(id)
    }
  }, [phase, offset])

  let transform = 'translate(0,0) scale(1)'
  let transition = 'none'
  let opacity = 1

  if (phase === 'pending') {
    // Avoid flash of settled state before measurement happens.
    opacity = 0
  } else if (phase === 'rising' && offset) {
    if (tick === 0) {
      // First paint: jump to the large viewport-centered transform.
      transform = `translate(${offset.x}px, ${offset.y}px) scale(${offset.scale})`
      transition = 'none'
    } else {
      // Subsequent paints: animate back to identity.
      transform = 'translate(0,0) scale(1)'
      transition = `transform ${INTRO_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        transform,
        opacity,
        transition,
        willChange: phase === 'rising' ? 'transform' : 'auto',
      }}
    >
      <svg
        viewBox="-100 -100 200 200"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={SUN_COLOR} stopOpacity="0.35" />
            <stop offset="60%" stopColor={SUN_COLOR} stopOpacity="0.08" />
            <stop offset="100%" stopColor={SUN_COLOR} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r="90" fill="url(#sun-glow)" />

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

        <circle cx="0" cy="0" r="42" fill={SUN_COLOR} />
      </svg>
    </div>
  )
}

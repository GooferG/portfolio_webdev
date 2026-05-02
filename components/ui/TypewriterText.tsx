'use client'

import type { TypewriterState } from '@/hooks/useTypingEffect'

type Props = {
  state: TypewriterState
  className?: string
}

export function TypewriterText({ state, className = '' }: Props) {
  const { text, full, phase, eraseMode, eraseProgress } = state
  const isErasing = phase === 'erasing'

  // Highlight: paint accent across chars 0..progress using char-count slicing.
  // Single absolute overlay can't follow line wraps, so split into a highlighted
  // prefix (with bg) and an unstyled suffix.
  if (isErasing && eraseMode === 'highlight' && text.length > 0) {
    const cut = Math.min(full.length, Math.ceil(eraseProgress * full.length))
    const head = full.slice(0, cut)
    const tail = full.slice(cut)
    return (
      <span className={`inline ${className}`}>
        <span
          style={{
            backgroundColor: 'rgba(0, 212, 170, 0.35)',
            color: 'var(--fg-strong)',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
            padding: '0 2px',
            margin: '0 -2px',
            borderRadius: '2px',
          }}
        >
          {head}
        </span>
        {tail}
        <Cursor />
      </span>
    )
  }

  // Wipe: clip-path inset from right
  if (isErasing && eraseMode === 'wipe' && text.length > 0) {
    const clip = Math.min(100, eraseProgress * 100)
    return (
      <span className={`inline ${className}`}>
        <span
          style={{
            clipPath: `inset(0 0 0 ${clip}%)`,
            display: 'inline-block',
            transition: 'clip-path 25ms linear',
          }}
        >
          {full}
        </span>
        <Cursor />
      </span>
    )
  }

  // Default (typing / backspace / cleared): plain text + cursor
  return (
    <span className={className}>
      {text}
      <Cursor />
    </span>
  )
}

function Cursor() {
  return (
    <span className="inline-block w-0.5 h-5 bg-accent ml-1 align-middle animate-pulse" />
  )
}

'use client'

import { useState, useEffect } from 'react'

type Options = {
  typeSpeed?: number
  eraseSpeed?: number
  holdMs?: number
  startDelay?: number
}

export type EraseMode = 'backspace' | 'highlight' | 'wipe'

export type TypewriterState = {
  text: string
  full: string
  phase: 'typing' | 'holding' | 'erasing' | 'idle'
  eraseMode: EraseMode
  eraseProgress: number
}

const ERASE_MODES: EraseMode[] = ['backspace', 'highlight', 'wipe']

function pickEraseMode(prev: EraseMode): EraseMode {
  const choices = ERASE_MODES.filter((m) => m !== prev)
  return choices[Math.floor(Math.random() * choices.length)]
}

export function useTypingEffect(text: string, speed = 45, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return displayed
}

export function useRotatingTypewriter(
  phrases: string[],
  { typeSpeed = 45, eraseSpeed = 25, holdMs = 3500, startDelay = 600 }: Options = {}
): TypewriterState {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<TypewriterState>({
    text: '',
    full: phrases[0] ?? '',
    phase: 'idle',
    eraseMode: 'backspace',
    eraseProgress: 0,
  })

  useEffect(() => {
    if (phrases.length === 0) return
    const phrase = phrases[index % phrases.length]
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    let nextEraseMode: EraseMode = 'backspace'

    const typeChar = (i: number) => {
      if (cancelled) return
      setState((s) => ({
        text: phrase.slice(0, i),
        full: phrase,
        phase: 'typing',
        eraseMode: s.eraseMode,
        eraseProgress: 0,
      }))
      if (i < phrase.length) {
        timer = setTimeout(() => typeChar(i + 1), typeSpeed)
      } else {
        nextEraseMode = pickEraseMode(state.eraseMode)
        setState((s) => ({
          text: phrase,
          full: phrase,
          phase: 'holding',
          eraseMode: nextEraseMode,
          eraseProgress: 0,
        }))
        timer = setTimeout(() => startErase(nextEraseMode), holdMs)
      }
    }

    const startErase = (mode: EraseMode) => {
      if (cancelled) return
      if (mode === 'backspace') {
        eraseBackspace(phrase.length)
      } else if (mode === 'highlight') {
        eraseHighlight()
      } else {
        eraseWipe()
      }
    }

    const eraseBackspace = (i: number) => {
      if (cancelled) return
      setState({
        text: phrase.slice(0, i),
        full: phrase,
        phase: 'erasing',
        eraseMode: 'backspace',
        eraseProgress: 1 - i / phrase.length,
      })
      if (i > 0) {
        timer = setTimeout(() => eraseBackspace(i - 1), eraseSpeed)
      } else {
        setIndex((n) => (n + 1) % phrases.length)
      }
    }

    const eraseHighlight = () => {
      // Phase 1: sweep highlight across (300ms)
      const sweepDuration = 350
      const holdSelected = 200
      const sweepSteps = 16
      let step = 0
      const sweep = () => {
        if (cancelled) return
        step++
        const progress = step / sweepSteps
        setState({
          text: phrase,
          full: phrase,
          phase: 'erasing',
          eraseMode: 'highlight',
          eraseProgress: progress,
        })
        if (step < sweepSteps) {
          timer = setTimeout(sweep, sweepDuration / sweepSteps)
        } else {
          // Phase 2: hold then clear
          timer = setTimeout(() => {
            if (cancelled) return
            setState({
              text: '',
              full: phrase,
              phase: 'erasing',
              eraseMode: 'highlight',
              eraseProgress: 0,
            })
            setIndex((n) => (n + 1) % phrases.length)
          }, holdSelected)
        }
      }
      sweep()
    }

    const eraseWipe = () => {
      const wipeDuration = 500
      const wipeSteps = 20
      let step = 0
      const wipe = () => {
        if (cancelled) return
        step++
        const progress = step / wipeSteps
        setState({
          text: phrase,
          full: phrase,
          phase: 'erasing',
          eraseMode: 'wipe',
          eraseProgress: progress,
        })
        if (step < wipeSteps) {
          timer = setTimeout(wipe, wipeDuration / wipeSteps)
        } else {
          setIndex((n) => (n + 1) % phrases.length)
        }
      }
      wipe()
    }

    timer = setTimeout(() => typeChar(0), index === 0 ? startDelay : 600)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, phrases, typeSpeed, eraseSpeed, holdMs, startDelay])

  return state
}

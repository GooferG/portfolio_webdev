'use client'

import { useState, useEffect } from 'react'

type Options = {
  typeSpeed?: number
  eraseSpeed?: number
  holdMs?: number
  startDelay?: number
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
  { typeSpeed = 45, eraseSpeed = 25, holdMs = 1800, startDelay = 600 }: Options = {}
) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (phrases.length === 0) return
    const phrase = phrases[index % phrases.length]
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    const typeChar = (i: number) => {
      if (cancelled) return
      setDisplayed(phrase.slice(0, i))
      if (i < phrase.length) {
        timer = setTimeout(() => typeChar(i + 1), typeSpeed)
      } else {
        timer = setTimeout(() => eraseChar(phrase.length), holdMs)
      }
    }

    const eraseChar = (i: number) => {
      if (cancelled) return
      setDisplayed(phrase.slice(0, i))
      if (i > 0) {
        timer = setTimeout(() => eraseChar(i - 1), eraseSpeed)
      } else {
        setIndex((n) => (n + 1) % phrases.length)
      }
    }

    timer = setTimeout(() => typeChar(0), index === 0 ? startDelay : 200)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [index, phrases, typeSpeed, eraseSpeed, holdMs, startDelay])

  return displayed
}

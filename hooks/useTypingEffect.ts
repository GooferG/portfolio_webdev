'use client'

import { useState, useEffect } from 'react'

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

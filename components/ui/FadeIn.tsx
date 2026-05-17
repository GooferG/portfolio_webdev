'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const { ref, inView } = useInView()
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

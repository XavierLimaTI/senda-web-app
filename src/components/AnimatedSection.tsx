'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function AnimatedSection({ 
  children, 
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) {
  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 30 }),
      ...(direction === 'left' && { x: -30 }),
      ...(direction === 'right' && { x: 30 }),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

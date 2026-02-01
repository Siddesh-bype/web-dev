import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function RevealOnScroll({ 
  children, 
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    scale: { scale: 0.9, opacity: 0 },
    fade: { opacity: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={isVisible ? { x: 0, y: 0, scale: 1, opacity: 1 } : directionVariants[direction]}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredReveal({ children, staggerDelay = 0.1, className = '' }) {
  return (
    <div className={className}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <RevealOnScroll key={index} delay={index * staggerDelay}>
            {child}
          </RevealOnScroll>
        ))
      ) : (
        <RevealOnScroll>{children}</RevealOnScroll>
      )}
    </div>
  )
}

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = '',
  id 
}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrollPosition = window.scrollY
      const elementTop = rect.top + scrollPosition
      const elementHeight = rect.height
      const viewportHeight = window.innerHeight
      
      const parallaxOffset = (scrollPosition - elementTop + viewportHeight / 2) * speed
      
      setOffset(Math.max(-elementHeight / 2, Math.min(elementHeight / 2, parallaxOffset)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <motion.div
        ref={ref}
        style={{ y: offset }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function ParallaxBackground({ 
  layers = 3,
  colors = ['neon-cyan', 'neon-purple', 'neon-magenta'],
  className = ''
}) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: layers }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
          style={{
            background: `radial-gradient(circle, ${colors[index % colors.length]}20 0%, transparent 70%)`,
            transform: `translateY(${scrollY * (0.1 + index * 0.1)}px)`,
          }}
          className={`absolute rounded-full blur-3xl ${
            index === 0 ? 'top-1/4 left-1/4 w-96 h-96' :
            index === 1 ? 'bottom-1/4 right-1/4 w-80 h-80' :
            'top-1/2 left-1/2 w-72 h-72 transform -translate-x-1/2 -translate-y-1/2'
          }`}
        />
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function RippleEffect({ children, className = '', color = 'rgba(0, 245, 255, 0.3)' }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden ${className}`}
      style={{ '--ripple-color': color }}
    >
      {children}
    </motion.div>
  )
}

export function HoverLift({ children, lift = 8, glow = false, className = '' }) {
  return (
    <motion.div
      whileHover={{ 
        y: -lift,
        boxShadow: glow ? '0 20px 40px rgba(0, 245, 255, 0.3)' : 'none'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`transition-transform duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function MagneticButton({ children, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  )
}

export function GlitchText({ text, className = '' }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute top-0 left-0 text-neon-cyan opacity-30" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        {text}
      </span>
    </span>
  )
}

export function TypewriterText({ text, speed = 50, className = '' }) {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className={`${className} font-mono`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

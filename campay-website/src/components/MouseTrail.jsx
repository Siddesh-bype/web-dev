import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MouseTrail({ enabled = true, trailLength = 10 }) {
  const canvasRef = useRef(null)
  const [, setTrails] = useState([])
  const animationRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let mouseX = 0
    let mouseY = 0
    let currentTrails = []

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      currentTrails.push({
        x: mouseX,
        y: mouseY,
        age: 0,
        opacity: 1
      })

      if (currentTrails.length > trailLength) {
        currentTrails.shift()
      }

      setTrails([...currentTrails])
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      currentTrails.forEach((trail, index) => {
        trail.age += 0.02
        trail.opacity = Math.max(0, 1 - trail.age)

        if (trail.opacity <= 0) {
          currentTrails.splice(index, 1)
          return
        }

        const size = 8 * (1 - trail.age)
        const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, size)
        gradient.addColorStop(0, `rgba(0, 245, 255, ${trail.opacity * 0.3})`)
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${trail.opacity * 0.2})`)
        gradient.addColorStop(1, 'rgba(255, 0, 255, 0)')

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [enabled, trailLength])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export function GlowCursor({ enabled = true }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled])

  return (
    <motion.div
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
      }}
      className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%)',
        filter: 'blur(8px)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

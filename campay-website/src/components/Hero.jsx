import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Code2, Github, Twitter, Linkedin, MessageCircle } from 'lucide-react'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-bg to-neon-purple/20" />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-purple/10 rounded-full blur-2xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-4 py-2 rounded-full glass-card border border-neon-cyan/50"
          >
            <span className="text-neon-cyan text-sm font-medium">✨ Powered by Advanced AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Automate Workflows with
            <span className="gradient-text block">Campay AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto"
          >
            The intelligent automation platform for developers. Build, deploy, and scale
            AI-powered workflows in minutes, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="btn-primary bg-neon-cyan text-black flex items-center space-x-2">
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 animate-float"
          >
            <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto neon-border">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="text-left text-sm md:text-base overflow-x-auto">
                <code>
                  <span className="text-neon-magenta">const</span> <span className="text-neon-cyan">campay</span> = <span className="text-neon-magenta">require</span>(<span className="text-green-400">'campay-ai'</span>);<br /><br />
                  <span className="text-gray-500">// Automate any workflow in seconds</span><br />
                  <span className="text-neon-magenta">const</span> <span className="text-neon-cyan">workflow</span> = <span className="text-neon-magenta">await</span> campay.<span className="text-yellow-400">create</span>(<span>{'{'}</span><br />
                  <span className="text-gray-600">  </span><span className="text-neon-purple">name</span>: <span className="text-green-400">'API Integration'</span>,<br />
                  <span className="text-gray-600">  </span><span className="text-neon-purple">trigger</span>: <span className="text-green-400">'webhook'</span>,<br />
                  <span className="text-gray-600">  </span><span className="text-neon-purple">actions</span>: [<span className="text-green-400">'validate'</span>, <span className="text-green-400">'transform'</span>, <span className="text-green-400">'send'</span>]<br />
                  <span>{'}'}</span>);
                </code>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 flex justify-center space-x-6"
          >
            <a href="https://github.com" className="text-gray-400 hover:text-neon-cyan transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-neon-cyan transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-neon-cyan transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://discord.com" className="text-gray-400 hover:text-neon-cyan transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
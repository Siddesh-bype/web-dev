import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Zap, Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it Works' },
    { href: '#demo', label: 'Demo' },
    { href: '#integrations', label: 'Integrations' },
    { href: '#security', label: 'Security' },
    { href: '#developer-resources', label: 'Developers' },
    { href: '#pricing', label: 'Pricing' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-neon-cyan" />
              <span className="text-2xl font-bold gradient-text">Campay</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-neon-cyan transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-dark-bg border border-dark-border hover:border-neon-cyan transition-colors"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4 text-gray-300" /> : <Sun className="w-4 h-4 text-gray-300" />}
              </button>
              <button className="btn-primary bg-neon-cyan text-black text-sm">
                Get Started
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-neon-cyan">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden glass-card"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-neon-cyan"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="w-full mt-2 px-3 py-2 text-gray-300 hover:text-neon-cyan flex items-center space-x-2"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Toggle Theme</span>
            </button>
            <button className="w-full mt-2 btn-primary bg-neon-cyan text-black">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
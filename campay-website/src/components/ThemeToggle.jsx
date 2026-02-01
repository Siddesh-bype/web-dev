import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { Moon, Sun, Palette, Check, RotateCw, Monitor } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme, setTheme, neonColor, setPrimaryNeonColor, availableThemes } = useTheme()

  const neonColorOptions = [
    { name: 'cyan', color: '#00f5ff', label: 'Cyan' },
    { name: 'magenta', color: '#ff00ff', label: 'Magenta' },
    { name: 'purple', color: '#8b5cf6', label: 'Purple' },
    { name: 'blue', color: '#3b82f6', label: 'Blue' },
    { name: 'green', color: '#10b981', label: 'Green' },
    { name: 'orange', color: '#f59e0b', label: 'Orange' },
  ]

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-xl p-3 neon-border"
      >
        <div className="space-y-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border hover:border-neon-cyan transition-colors flex items-center justify-center"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Moon className="w-5 h-5 text-gray-300" /> : <Sun className="w-5 h-5 text-gray-300" />}
          </button>

          <div className="relative group">
            <button className="w-10 h-10 rounded-lg bg-dark-bg border border-dark-border hover:border-neon-cyan transition-colors flex items-center justify-center">
              <Palette className="w-5 h-5 text-gray-300" />
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl p-4 neon-border"
            >
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                <Monitor className="w-4 h-4 text-neon-cyan" />
                <span>Themes</span>
              </h4>
              
              <div className="space-y-2 mb-4">
                {availableThemes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setTheme(themeName.toLowerCase())}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                      theme === themeName.toLowerCase()
                        ? 'bg-neon-cyan text-black'
                        : 'bg-dark-bg border border-dark-border hover:border-neon-cyan'
                    }`}
                  >
                    <span className="capitalize">{themeName}</span>
                    {theme === themeName.toLowerCase() && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-dark-border pt-3">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                  <RotateCw className="w-4 h-4 text-neon-purple" />
                  <span>Accent Color</span>
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {neonColorOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setPrimaryNeonColor(option.name)}
                      className={`relative w-14 h-14 rounded-lg transition-all ${
                        neonColor === option.name
                          ? 'ring-2 ring-neon-cyan ring-offset-2 ring-offset-dark-bg'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: option.color }}
                      title={option.label}
                    >
                      {neonColor === option.name && (
                        <Check className="absolute top-1 right-1 w-4 h-4 text-black" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

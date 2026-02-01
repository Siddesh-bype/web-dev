import { useState, useCallback, useEffect } from 'react'
import { ThemeContext } from './theme-context'

const themes = {
  dark: {
    name: 'Dark',
    colors: {
      bg: '#0a0a0a',
      card: '#1a1a1a',
      border: '#2a2a2a',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      neon: {
        cyan: '#00f5ff',
        magenta: '#ff00ff',
        purple: '#8b5cf6',
        blue: '#3b82f6',
      }
    }
  },
  light: {
    name: 'Light',
    colors: {
      bg: '#ffffff',
      card: '#f8fafc',
      border: '#e2e8f0',
      text: '#1e293b',
      textSecondary: '#64748b',
      neon: {
        cyan: '#00b4d8',
        magenta: '#d946ef',
        purple: '#7c3aed',
        blue: '#2563eb',
      }
    }
  },
  neon: {
    name: 'Neon',
    colors: {
      bg: '#0a0a0a',
      card: '#1a1a1a',
      border: '#2a2a2a',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      neon: {
        cyan: '#00ffff',
        magenta: '#ff00ff',
        purple: '#ff00ff',
        blue: '#00bfff',
      }
    }
  }
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [neonColor, setNeonColor] = useState('cyan')
  const [customColors, setCustomColors] = useState({})

  const updateThemeVariables = useCallback((colors) => {
    document.documentElement.style.setProperty('--color-dark-bg', colors.bg)
    document.documentElement.style.setProperty('--color-dark-card', colors.card)
    document.documentElement.style.setProperty('--color-dark-border', colors.border)
    document.documentElement.style.setProperty('--color-text-primary', colors.text)
    document.documentElement.style.setProperty('--color-text-secondary', colors.textSecondary)
  }, [])

  const setTheme = useCallback((themeName) => {
    setCurrentTheme(themeName)
    localStorage.setItem('campay-theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    updateThemeVariables(themes[themeName].colors)
  }, [updateThemeVariables])

  const setPrimaryNeonColor = useCallback((colorName) => {
    setNeonColor(colorName)
    localStorage.setItem('campay-neon', colorName)
    const colors = {
      cyan: '#00f5ff',
      magenta: '#ff00ff',
      purple: '#8b5cf6',
      blue: '#3b82f6',
      green: '#10b981',
      orange: '#f59e0b',
    }
    document.documentElement.style.setProperty('--color-neon-cyan', colors[colorName])
    document.documentElement.style.setProperty('--color-neon-primary', colors[colorName])
  }, [])

  

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [currentTheme, setTheme])

  useEffect(() => {
    const savedTheme = localStorage.getItem('campay-theme')
    const savedNeon = localStorage.getItem('campay-neon')
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
      updateThemeVariables(themes[savedTheme].colors)
      setTimeout(() => setCurrentTheme(savedTheme), 0)
    }
    
    if (savedNeon) {
      setTimeout(() => {
        setPrimaryNeonColor(savedNeon)
        setNeonColor(savedNeon)
      }, 0)
    }
  }, [updateThemeVariables, setPrimaryNeonColor])

  const value = {
    theme: currentTheme,
    colors: themes[currentTheme].colors,
    setTheme,
    toggleTheme,
    setPrimaryNeonColor,
    neonColor,
    customColors,
    setCustomColors,
    availableThemes: Object.values(themes).map(t => t.name),
    availableNeonColors: ['cyan', 'magenta', 'purple', 'blue', 'green', 'orange']
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

import { THEME_CONSTANTS } from '../constants/theme'

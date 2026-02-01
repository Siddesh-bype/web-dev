import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}, ref) => {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-300'
  
  const variants = {
    primary: 'btn-primary bg-neon-cyan text-black',
    secondary: 'btn-secondary border border-neon-purple/50',
    ghost: 'text-neon-cyan hover:text-neon-cyan/80',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  return (
    <motion.button
      ref={ref}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${loading ? 'cursor-wait' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 0V0L5.29 5.71a1 1 0 011.42-1.42l-2.3 2.3a1 1 0 01.41-1.42l2.3-2.3a1 1 0 01-1.42 1.42L12 4.16V0z"></path>
        </svg>
      ) : children}
    </motion.button>
  )
})

export const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-3 rounded-lg bg-dark-bg border transition-colors focus:outline-none ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-dark-border focus:border-neon-cyan'
        } ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${props.id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${props.id}-helper`} className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={`glass-card rounded-2xl p-6 neon-border ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm font-medium',
    success: 'px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium',
    warning: 'px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium',
    error: 'px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-sm font-medium',
  }

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

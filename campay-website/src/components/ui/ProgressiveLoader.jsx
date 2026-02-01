import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingSpinner from './LoadingSpinner'
import SkeletonLoader from './SkeletonLoader'

export default function ProgressiveLoader({ 
  children, 
  loading, 
  delay = 200,
  showSpinner = true,
  showSkeleton = true,
  spinnerText,
  skeletonVariant = 'card',
  skeletonCount = 1
}) {
  const [showDelayLoader, setShowDelayLoader] = useState(delay > 0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (showDelayLoader) {
      const timer = setTimeout(() => {
        setShowDelayLoader(false)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [delay, showDelayLoader])

  useEffect(() => {
    if (loading && !showDelayLoader) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [loading, showDelayLoader])

  if (showDelayLoader) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          {showSpinner && (
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <LoadingSpinner size="large" text={spinnerText} />
              {progress > 0 && progress < 100 && (
                <div className="w-64">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Loading</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 bg-dark-card rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {showSkeleton && (
            <div className="space-y-4">
              <SkeletonLoader variant={skeletonVariant} count={skeletonCount} />
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

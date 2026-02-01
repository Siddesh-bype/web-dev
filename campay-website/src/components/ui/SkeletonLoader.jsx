import { motion } from 'framer-motion'

export default function SkeletonLoader({ variant = 'card', count = 1, className = '' }) {
  const variants = {
    card: 'h-48 rounded-2xl',
    text: 'h-4 rounded w-full',
    textShort: 'h-4 rounded w-3/4',
    textLong: 'h-4 rounded w-5/6',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-32 rounded-lg',
    circle: 'h-16 w-16 rounded-full'
  }

  const skeletonItem = (index) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`${variants[variant]} bg-dark-card/50 overflow-hidden relative ${className}`}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent"
      />
    </motion.div>
  )

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{skeletonItem(index)}</div>
      ))}
    </div>
  )
}

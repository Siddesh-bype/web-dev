import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Check, X } from 'lucide-react'

export default function PwaInstaller() {
  const [isInstallable] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)
  const [installProgress, setInstallProgress] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [installError, setInstallError] = useState(null)

  

  const handleInstall = async () => {
    setIsInstalling(true)
    setInstallProgress(0)
    setInstallError(null)
    
    try {
      const progressSteps = [
        { step: 'Downloading...', progress: 20 },
        { step: 'Installing files...', progress: 40 },
        { step: 'Setting up...', progress: 60 },
        { step: 'Configuring...', progress: 80 },
        { step: 'Final installation...', progress: 95 }
      ]
      
      for (const step of progressSteps) {
        setInstallProgress(step.progress)
        await new Promise(resolve => setTimeout(resolve, 800))
      }
      
      setInstallProgress(100)
      setTimeout(() => {
        setIsInstalling(false)
        setShowDialog(false)
      }, 1000)
      
    } catch (error) {
      console.error('Installation failed:', error)
      setInstallError(error.message)
      setIsInstalling(false)
    }
  }

  const features = [
    'Offline access',
    'Push notifications',
    'Faster loading',
    'Native app experience',
    'Background sync',
    'Auto-updates'
  ]

  if (!isInstallable) {
    return null
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Install Campay App</h3>
        <p className="text-gray-400">
          Get native app features with offline access and push notifications
        </p>
      </div>

      <AnimatePresence>
        {isInstallable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card rounded-2xl p-6 neon-border mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Upload className="w-6 h-6 text-neon-cyan" />
                <h4 className="text-lg font-semibold text-white">Install Progress</h4>
              </div>
              <button
                onClick={() => setShowDialog(!showDialog)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isInstalling && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-400">
                  <div className="w-5 h-5" />
                  <span>Installing Campay App...</span>
                </div>
                
                <div className="w-full h-3 bg-dark-bg rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-neon-cyan rounded-full"
                    style={{ width: `${installProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="text-sm text-gray-500">
                  {installProgress}% Complete
                </div>
              </div>
            )}

            {installError && (
              <div className="glass-card rounded-xl p-4 bg-red-500/10 border border-red-500/50">
                <div className="text-red-400">
                  Installation Failed
                </div>
                <p className="text-sm text-gray-300 mt-2">{installError}</p>
                <button
                  onClick={() => setInstallError(null)}
                  className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleInstall}
          disabled={!isInstallable || isInstalling}
          className="flex-1 px-6 py-3 rounded-lg bg-neon-cyan text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
        >
          {isInstalling ? (
            <div className="w-4 h-4 mr-2 animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8 0V0L5.29 5.71a1 1 0 011.42-1.42l-2.3 2.3a1 1 0 01.41-1.42l2.3-2.3a1 1 0 01-1.42 1.42L12 4.16V0z"></path>
              </svg>
            </div>
          ) : isInstallable ? (
            <>
              <div className="w-5 h-5 mr-2" />
              Install App
            </>
          ) : (
            <>
              <Check className="w-5 h-5 mr-2" />
              Installed
            </>
          )}
        </button>
      </div>
    </div>
  )
}
import { useState } from 'react'

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const getMetrics = async () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0]
      const resources = performance.getEntriesByType('resource')
      
      const performanceMetrics = {
        // Navigation metrics
        loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 0,
        domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : 0,
        firstContentfulPaint: navigation ? Math.round(navigation.firstContentfulPaint - navigation.fetchStart) : 0,
        largestContentfulPaint: navigation ? Math.round(navigation.largestContentfulPaint - navigation.fetchStart) : 0,
        
        // Resource metrics
        resourceCount: resources.length,
        imageCount: resources.filter(r => r.initiatorType === 'img').length,
        scriptCount: resources.filter(r => r.initiatorType === 'script').length,
        
        // Compression metrics
        totalSize: resources.reduce((total, r) => total + (r.transferSize || 0), 0),
        compressedSize: resources.reduce((total, r) => total + (r.encodedBodySize || 0), 0),
        
        // Cache metrics
        cacheHits: resources.filter(r => r.transferSize === 0 && r.encodedBodySize > 0).length,
        
        // Memory metrics
        memoryUsed: performance.memory ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(performance.memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576), // MB
        } : null,
      }
      
      // Performance scores
      performanceMetrics.scores = {
        performance: calculatePerformanceScore(performanceMetrics),
        memory: calculateMemoryScore(performanceMetrics.memoryUsed),
        network: calculateNetworkScore(performanceMetrics),
        seo: calculateSEOScore(performanceMetrics),
      }
      
      setMetrics(performanceMetrics)
      setIsVisible(true)
    }
  }

  const calculatePerformanceScore = (metrics) => {
    let score = 100
    
    // Deduct points for slow load times
    if (metrics.loadTime > 3000) score -= 30
    else if (metrics.loadTime > 2000) score -= 20
    else if (metrics.loadTime > 1000) score -= 10
    
    // Deduct points for large DOM content time
    if (metrics.domContentLoaded > 2000) score -= 20
    else if (metrics.domContentLoaded > 1500) score -= 10
    else if (metrics.domContentLoaded > 1000) score -= 5
    
    // Deduct points for slow first contentful paint
    if (metrics.firstContentfulPaint > 2000) score -= 20
    else if (metrics.firstContentfulPaint > 1500) score -= 10
    else if (metrics.firstContentfulPaint > 800) score -= 5
    
    return Math.max(0, Math.min(100, score))
  }

  const calculateMemoryScore = (memoryUsed) => {
    if (!memoryUsed) return 100
    if (memoryUsed > 80) return 20
    if (memoryUsed > 60) return 50
    if (memoryUsed > 40) return 80
    return 95
  }

  const calculateNetworkScore = (metrics) => {
    const compressionRatio = metrics.compressedSize > 0 ? metrics.compressedSize / metrics.totalSize : 1
    const score = compressionRatio > 0.8 ? 90 : 70
    return score
  }

  const calculateSEOScore = (metrics) => {
    let score = 100
    
    // Deduct for large page size
    if (metrics.totalSize > 1000000) score -= 20 // > 1MB
    else if (metrics.totalSize > 500000) score -= 10 // > 500KB
    
    // Deduct for many resources
    if (metrics.resourceCount > 100) score -= 20
    else if (metrics.resourceCount > 50) score -= 10
    
    return score
  }

  const getColor = (score) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (!metrics) {
    return (
      <div className="p-6">
        <button
          onClick={getMetrics}
          className="px-6 py-3 rounded-lg bg-neon-cyan text-black font-semibold hover:scale-105 transition-transform"
        >
          Analyze Performance
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isVisible ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold gradient-text mb-2">
            {Math.round(metrics.scores.performance || 0)}
          </div>
          <div className="text-gray-400 text-sm">Performance Score</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold gradient-text mb-2">
            {metrics.loadTime ? `${Math.round(metrics.loadTime)}ms` : '-'}
          </div>
          <div className="text-gray-400 text-sm">Load Time</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold gradient-text mb-2">
            {metrics.firstContentfulPaint ? `${Math.round(metrics.firstContentfulPaint)}ms` : '-'}
          </div>
          <div className="text-gray-400 text-sm">First Paint</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold mb-2 ${getColor(metrics.scores.memory)}`}>
            {Math.round(metrics.memoryUsed?.used || 0)}%
          </div>
          <div className="text-gray-400 text-sm">Memory Usage</div>
        </div>
      </div>

      {isVisible && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold text-white mb-4">Navigation Metrics</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Load Time:</span>
                <span className={getColor(metrics.scores.performance)}>
                  {metrics.loadTime ? `${Math.round(metrics.loadTime)}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DOM Content:</span>
                <span className={getColor(metrics.scores.performance)}>
                  {metrics.domContentLoaded ? `${Math.round(metrics.domContentLoaded)}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">First Paint:</span>
                <span className={getColor(metrics.scores.performance)}>
                  {metrics.firstContentfulPaint ? `${Math.round(metrics.firstContentfulPaint)}ms` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Largest Paint:</span>
                <span className={getColor(metrics.scores.performance)}>
                  {metrics.largestContentfulPaint ? `${Math.round(metrics.largestContentfulPaint)}ms` : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h4 className="font-semibold text-white mb-4">Resource Metrics</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Resources:</span>
                <span className="text-white">{metrics.resourceCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Images:</span>
                <span className="text-white">{metrics.imageCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Scripts:</span>
                <span className="text-white">{metrics.scriptCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Size:</span>
                <span className="text-white">{Math.round(metrics.totalSize / 1024)}KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Compressed:</span>
                <span className="text-white">{Math.round(metrics.compressedSize / 1024)}KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cache Hits:</span>
                <span className="text-green-400">{metrics.cacheHits}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card rounded-xl p-6">
        <h4 className="font-semibold text-white mb-4">Optimization Suggestions</h4>
        <div className="space-y-3 text-sm">
          {metrics.scores.performance < 80 && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <AlertCircle className="w-4 h-4" />
              <span>Consider optimizing images and scripts for faster loading</span>
            </div>
          )}
          {metrics.memoryUsed && metrics.memoryUsed.used > 70 && (
            <div className="flex items-center space-x-2 text-orange-400">
              <AlertCircle className="w-4 h-4" />
              <span>High memory usage detected</span>
            </div>
          )}
          {metrics.totalSize > 500000 && (
            <div className="flex items-center space-x-2 text-orange-400">
              <AlertCircle className="w-4 h-4" />
              <span>Consider lazy loading resources</span>
            </div>
          )}
          {metrics.scores.performance >= 90 && (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Excellent performance! Your site is well optimized.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
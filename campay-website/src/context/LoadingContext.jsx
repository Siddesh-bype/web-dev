import { useState, useCallback } from 'react'
import { LoadingContext } from './loading-context'

export function LoadingProvider({ children }) {
  const [loadingStates, setLoadingStates] = useState({})
  const [globalLoading, setGlobalLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const startLoading = useCallback((key = 'global', text = null) => {
    if (key === 'global') {
      setGlobalLoading(true)
    } else {
      setLoadingStates(prev => ({ ...prev, [key]: { loading: true, text } }))
    }
  }, [])

  const stopLoading = useCallback((key = 'global') => {
    if (key === 'global') {
      setGlobalLoading(false)
      setLoadingProgress(0)
    } else {
      setLoadingStates(prev => {
        const newState = { ...prev }
        delete newState[key]
        return newState
      })
    }
  }, [])

  const isLoading = useCallback((key = 'global') => {
    if (key === 'global') {
      return globalLoading
    }
    return loadingStates[key]?.loading || false
  }, [globalLoading, loadingStates])

  const setLoadingText = useCallback((key = 'global', text) => {
    if (key === 'global') {
      setGlobalLoading(true)
    } else {
      setLoadingStates(prev => ({
        ...prev,
        [key]: { ...prev[key], text }
      }))
    }
  }, [])

  const updateProgress = useCallback((value) => {
    setLoadingProgress(value)
  }, [])

  const value = {
    startLoading,
    stopLoading,
    isLoading,
    setLoadingText,
    updateProgress,
    globalLoading,
    loadingProgress,
    loadingStates
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}

import { LOADING_CONSTANTS } from '../constants/loading'

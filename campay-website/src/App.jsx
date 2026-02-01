import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LoadingProvider } from './context/LoadingContext'
import { useLoading } from './hooks/useLoading'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Integrations from './components/Integrations'
import Security from './components/Security'
import PwaInstaller from './components/PwaInstaller'
import PerformanceMonitor from './components/PerformanceMonitor'
import { LoadingProvider as GlobalLoadingProvider } from './context/LoadingContext'
import ProgressiveLoader from './components/ui/ProgressiveLoader'
import MouseTrail, { GlowCursor } from './components/MouseTrail'
import ThemeToggle from './components/ThemeToggle'

const LiveDemo = lazy(() => import('./components/LiveDemo'))
const Pricing = lazy(() => import('./components/Pricing'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const DeveloperResources = lazy(() => import('./components/DeveloperResources'))
const Footer = lazy(() => import('./components/Footer'))

function LoadingWrapper({ children }) {
  const { globalLoading, loadingProgress } = useLoading()

  return (
    <ProgressiveLoader 
      loading={globalLoading}
      progress={loadingProgress}
      delay={0}
      spinnerText="Loading experience..."
    >
      {children}
    </ProgressiveLoader>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GlobalLoadingProvider>
          <div className="min-h-screen relative">
            <MouseTrail enabled={true} trailLength={8} />
            <GlowCursor enabled={true} />
            <ThemeToggle />
            <Navbar />
            <main>
              <Hero />
              <Features />
              <HowItWorks />
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading demo...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <LiveDemo />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading integrations...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <Integrations />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading security...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <Security />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading tools...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <PerformanceMonitor />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading pricing...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <Pricing />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading testimonials...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <Testimonials />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[600px] flex items-center justify-center"><div className="text-neon-cyan">Loading resources...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <DeveloperResources />
                </LoadingWrapper>
              </Suspense>
              <Suspense fallback={<LoadingWrapper><div className="min-h-[400px] flex items-center justify-center"><div className="text-neon-cyan">Loading installer...</div></div></LoadingWrapper>}>
                <LoadingWrapper>
                  <PwaInstaller />
                </LoadingWrapper>
              </Suspense>
            </main>
            <Suspense fallback={<LoadingWrapper><div className="min-h-[400px] flex items-center justify-center"><div className="text-neon-cyan">Loading footer...</div></div></LoadingWrapper>}>
              <LoadingWrapper>
                <Footer />
              </LoadingWrapper>
            </Suspense>
          </div>
        </GlobalLoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
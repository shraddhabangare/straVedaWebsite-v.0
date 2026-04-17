'use client'

import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Preloader from '@/components/layout/Preloader'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import FloatingCTA from '@/components/shared/FloatingCTA'
import CustomCursor from '@/components/shared/CustomCursor'
import CookieConsent from '@/components/shared/CookieConsent'
import ScrollProgress from '@/components/layout/ScrollProgress'
import SearchOverlay from '@/components/layout/SearchOverlay'
import KeyboardHint from '@/components/shared/KeyboardHint'
import CodeGraph from '@/components/shared/CodeGraph'

const pages = ['home', 'services', 'about', 'insights', 'contact', 'testimonials'] as const
type Page = typeof pages[number]

const pageComponents: Record<Page, React.LazyExoticComponent<React.ComponentType<{ onNavigate: (page: string) => void }>>> = {
  home: lazy(() => import('@/components/sections/pages/HomePage')),
  services: lazy(() => import('@/components/sections/pages/ServicesPage')),
  about: lazy(() => import('@/components/sections/pages/AboutPage')),
  insights: lazy(() => import('@/components/sections/pages/InsightsPage')),
  contact: lazy(() => import('@/components/sections/pages/ContactPage')),
  testimonials: lazy(() => import('@/components/sections/pages/TestimonialsPage')),
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[#FF4800] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [searchOpen, setSearchOpen] = useState(false)
  const [codeGraphOpen, setCodeGraphOpen] = useState(false)

  const handleNavigate = useCallback((page: string) => {
    const validPage = page as Page
    if (pages.includes(validPage)) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      window.dispatchEvent(new CustomEvent('page-change'))
      setTimeout(() => {
        setCurrentPage(validPage)
      }, 50)
    }
  }, [])

  // ── Keyboard navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      // Skip when user is typing in an input or textarea
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      const idx = pages.indexOf(currentPage)

      switch (e.key) {
        case 'ArrowRight': {
          e.preventDefault()
          const next = e.shiftKey
            ? (idx - 1 + pages.length) % pages.length
            : (idx + 1) % pages.length
          handleNavigate(pages[next])
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          const next = e.shiftKey
            ? (idx + 1) % pages.length
            : (idx - 1 + pages.length) % pages.length
          handleNavigate(pages[next])
          break
        }
        case 'Home': {
          e.preventDefault()
          handleNavigate('home')
          break
        }
        case 'End': {
          e.preventDefault()
          handleNavigate('contact')
          break
        }
        case 'Escape': {
          if (codeGraphOpen) {
            e.preventDefault()
            setCodeGraphOpen(false)
          } else {
            // Dispatch custom event to close any open modals/panels
            window.dispatchEvent(new CustomEvent('close-all'))
          }
          break
        }
        case 'g': {
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            setCodeGraphOpen(prev => !prev)
          }
          break
        }
        case '1': case '2': case '3': case '4': case '5': case '6': {
          if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            const pageIdx = parseInt(e.key) - 1
            if (pageIdx >= 0 && pageIdx < pages.length) {
              e.preventDefault()
              handleNavigate(pages[pageIdx])
            }
          }
          break
        }
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, handleNavigate, codeGraphOpen])

  // ── Update document title & announce to screen readers ──
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Straveda — Enterprise IT Consulting & Technology Strategy',
      services: 'Services — Straveda',
      about: 'About — Straveda',
      insights: 'Insights — Straveda',
      contact: 'Contact — Straveda',
      testimonials: 'Testimonials — Straveda',
    }
    document.title = titles[currentPage]
  }, [currentPage])

  const CurrentPageComponent = pageComponents[currentPage]

  return (
    <SmoothScroll>
      <CustomCursor>
        <div className="noise-overlay min-h-screen flex flex-col bg-white text-[#1a1a2e]">
          <Preloader />
          <ScrollProgress />
          <Navbar currentPage={currentPage} onNavigate={handleNavigate} onSearchToggle={() => setSearchOpen(prev => !prev)} />

          {/* Screen reader live region for page navigation announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} page
          </div>

          <main className="flex-1" role="main" tabIndex={0}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Suspense fallback={<PageLoader />}>
                  <CurrentPageComponent onNavigate={handleNavigate} />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer onNavigate={handleNavigate} />
          <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={(page) => { setSearchOpen(false); handleNavigate(page); }} />

          {/* Code Graph Floating Button */}
          <button
            onClick={() => setCodeGraphOpen(prev => !prev)}
            className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-[#2B2358] text-white shadow-lg hover:bg-[#3a3272] hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            title="Code Graph (Ctrl+G)"
            aria-label="Toggle code graph"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5" cy="6" r="3" />
              <circle cx="19" cy="6" r="3" />
              <circle cx="12" cy="18" r="3" />
              <line x1="7.5" y1="7.5" x2="10" y2="16" />
              <line x1="16.5" y1="7.5" x2="14" y2="16" />
              <line x1="8" y1="6" x2="16" y2="6" />
            </svg>
          </button>

          {/* Code Graph Full-Screen Overlay */}
          <AnimatePresence>
            {codeGraphOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="fixed inset-0 z-[100]"
              >
                <CodeGraph />
                {/* Close button overlay */}
                <button
                  onClick={() => setCodeGraphOpen(false)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all flex items-center justify-center"
                  title="Close (Escape)"
                  aria-label="Close code graph"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <BackToTop />
          <FloatingCTA onNavigate={handleNavigate} />
          <CookieConsent />
          <KeyboardHint />
        </div>
      </CustomCursor>
    </SmoothScroll>
  )
}

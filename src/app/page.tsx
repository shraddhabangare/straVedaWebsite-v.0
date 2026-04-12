'use client'

import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SmoothScroll from '@/components/straveda/SmoothScroll'
import Preloader from '@/components/straveda/Preloader'
import Navbar from '@/components/straveda/Navbar'
import Footer from '@/components/straveda/Footer'
import BackToTop from '@/components/straveda/BackToTop'
import FloatingCTA from '@/components/straveda/FloatingCTA'
import CustomCursor from '@/components/straveda/CustomCursor'
import CookieConsent from '@/components/straveda/CookieConsent'
import ScrollProgress from '@/components/straveda/ScrollProgress'

const pages = ['home', 'services', 'about', 'insights', 'contact'] as const
type Page = typeof pages[number]

const pageComponents: Record<Page, React.LazyExoticComponent<React.ComponentType<{ onNavigate: (page: string) => void }>>> = {
  home: lazy(() => import('@/components/straveda/pages/HomePage')),
  services: lazy(() => import('@/components/straveda/pages/ServicesPage')),
  about: lazy(() => import('@/components/straveda/pages/AboutPage')),
  insights: lazy(() => import('@/components/straveda/pages/InsightsPage')),
  contact: lazy(() => import('@/components/straveda/pages/ContactPage')),
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

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Straveda — Enterprise IT Consulting & Technology Strategy',
      services: 'Services — Straveda',
      about: 'About — Straveda',
      insights: 'Insights — Straveda',
      contact: 'Contact — Straveda',
    }
    document.title = titles[currentPage]
  }, [currentPage])

  const CurrentPageComponent = pageComponents[currentPage]

  return (
    <SmoothScroll>
      <div className="noise-overlay min-h-screen flex flex-col bg-black text-white">
        <Preloader />
        <ScrollProgress />
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

        <main className="flex-1">
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
        <BackToTop />
        <FloatingCTA onNavigate={handleNavigate} />
        <CustomCursor />
        <CookieConsent />
      </div>
    </SmoothScroll>
  )
}

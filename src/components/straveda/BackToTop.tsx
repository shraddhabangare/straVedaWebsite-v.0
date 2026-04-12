'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCursorStyle } from '@/lib/cursor-context'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const { setCursorStyle } = useCursorStyle()
  const { resolvedTheme } = useTheme()

  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0

    setVisible(scrollY > 300)
    setScrollProgress(scrollPercent)
  }, [])

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      updateScroll()
    })
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', updateScroll)
    }
  }, [updateScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // SVG circular progress ring specs
  const radius = 18
  const strokeWidth = 2
  const circumference = 2 * Math.PI * radius // ≈ 113.097
  const svgSize = 44
  const center = svgSize / 2
  const displayProgress = isHovered ? 1 : scrollProgress
  const strokeDashoffset = circumference * (1 - displayProgress)

  const isDark = mounted && resolvedTheme === 'dark'
  const trackColor = isDark ? '#374151' : '#e5e7eb'
  const progressColor = '#FF4800'

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          onClick={scrollToTop}
          onMouseEnter={() => { setIsHovered(true); setCursorStyle('link') }}
          onMouseLeave={() => { setIsHovered(false); setCursorStyle('default') }}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center cursor-pointer"
          style={{ background: 'transparent', border: 'none', padding: 0 }}
          aria-label="Back to top"
        >
          {/* SVG progress ring */}
          <motion.svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="absolute"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {/* Track circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={trackColor}
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={progressColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                transition: isHovered
                  ? 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'stroke-dashoffset 0.1s ease-out',
              }}
            />
          </motion.svg>

          {/* Inner button circle */}
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl"
            style={{
              background: '#FF4800',
              boxShadow: isHovered
                ? '0 4px 24px rgba(255, 72, 0, 0.4)'
                : '0 4px 20px rgba(255, 72, 0, 0.3)',
            }}
          >
            <ArrowUp className="h-5 w-5 text-white transition-transform duration-200" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

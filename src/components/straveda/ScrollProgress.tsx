'use client'

import { useScroll, useSpring, useTransform, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [pageKey, setPageKey] = useState(0)

  // Smooth the scroll progress with a spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Map scroll progress to top position: 64px -> 0px
  const topPosition = useTransform(scrollYProgress, [0, 0.02], [64, 0])

  // Map scroll progress to glow intensity (0 -> 0.6)
  const glowOpacity = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  })

  // Reset on page navigation by listening for a custom event or path change
  useEffect(() => {
    const handleReset = () => {
      setPageKey((k) => k + 1)
    }

    // Listen for custom page-change event dispatched by parent
    window.addEventListener('page-change', handleReset)

    return () => {
      window.removeEventListener('page-change', handleReset)
    }
  }, [])

  return (
    <motion.div
      key={pageKey}
      style={{
        scaleX,
        top: topPosition,
        transformOrigin: '0%',
      }}
      className="fixed left-0 right-0 z-[60] h-[3px] pointer-events-none"
    >
      <motion.div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, #FF4800, #FF6B33)',
          boxShadow: '0 0 8px rgba(255, 72, 0, 0.5), 0 0 20px rgba(255, 72, 0, 0.2)',
        }}
      />
      {/* Glow layer beneath the progress bar for ambient light effect */}
      <motion.div
        className="absolute -bottom-[2px] left-0 right-0 h-[7px] rounded-full"
        style={{
          background: 'linear-gradient(90deg, #FF4800, #FF6B33)',
          opacity: glowOpacity,
          filter: 'blur(6px)',
        }}
      />
    </motion.div>
  )
}

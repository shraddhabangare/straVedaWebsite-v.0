'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: true,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll with GSAP ScrollTrigger for perfect scroll-driven animation timing
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP's ticker instead of manual requestAnimationFrame loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Expose scroll values as CSS custom properties for other components to consume
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: {
      scroll: number
      limit: number
      velocity: number
      direction: number
      progress: number
    }) => {
      document.documentElement.style.setProperty('--scroll-y', String(scroll))
      document.documentElement.style.setProperty('--scroll-progress', String(progress))
      document.documentElement.style.setProperty('--scroll-velocity', String(velocity))
      document.documentElement.style.setProperty('--scroll-direction', String(direction))
    })

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}

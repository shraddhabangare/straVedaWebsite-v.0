'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 2.0,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: true,
      infinite: false,
    })

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
    }
  }, [])

  return <>{children}</>
}

'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      // Premium smooth-scroll feel — inspired by mcshannock.design
      // Slightly longer duration for that "buttery" momentum feel
      duration: 1.05,
      // Quart ease-out: fast initial response, graceful slow finish
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      // Standard wheel sensitivity — not too fast, not too slow
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      smoothWheel: true,
      syncTouch: true,
      infinite: false,
    })

    // Sync Lenis scroll position into GSAP ScrollTrigger each tick
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis via GSAP ticker (single unified RAF loop)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    // FIX 3: Re-enable lag smoothing (was 0 — caused scroll snaps on heavy frames).
    // 1000ms tolerance: GSAP catches up gradually instead of snapping.
    gsap.ticker.lagSmoothing(1000, 16)

    // Expose scroll values as CSS custom properties — consumed by other components
    // without adding extra JS scroll listeners or Framer Motion useScroll() hooks.
    lenis.on('scroll', ({
      scroll,
      limit,
      velocity,
      direction,
      progress,
    }: {
      scroll: number
      limit: number
      velocity: number
      direction: number
      progress: number
    }) => {
      const root = document.documentElement
      root.style.setProperty('--scroll-y', String(scroll))
      root.style.setProperty('--scroll-progress', String(progress))
      root.style.setProperty('--scroll-velocity', String(Math.abs(velocity)))
      root.style.setProperty('--scroll-direction', String(direction))
      root.style.setProperty('--scroll-limit', String(limit))
    })

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

'use client'

import { useEffect, useRef, useCallback, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorVariant = 'default' | 'hover' | 'text'

/** Spring config for smooth outer-ring following */
const SPRING_CONFIG = { damping: 25, stiffness: 300, mass: 0.5 }

/** Elements that trigger the "hover" (interactive) cursor variant */
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="pointer"]'

/** Elements that trigger the "text" cursor variant */
const TEXT_SELECTOR =
  'p, span, h1, h2, h3, h4, h5, h6, li, td, th, label, blockquote, figcaption, [data-cursor="text"]'

export default function CustomCursor() {
  // ─── Detect fine-pointer device via external store ────────────────
  const pointerMq = useRef<MediaQueryList | null>(null)

  const subscribeToPointer = useCallback((onStoreChange: () => void) => {
    if (!pointerMq.current) {
      pointerMq.current = window.matchMedia('(pointer: fine)')
    }
    pointerMq.current.addEventListener('change', onStoreChange)
    return () => {
      pointerMq.current?.removeEventListener('change', onStoreChange)
    }
  }, [])

  const getPointerSnapshot = useCallback(() => {
    if (!pointerMq.current) {
      pointerMq.current = window.matchMedia('(pointer: fine)')
    }
    return pointerMq.current.matches
  }, [])

  const getPointerServerSnapshot = useCallback(() => false, [])

  const isDesktop = useSyncExternalStore(
    subscribeToPointer,
    getPointerSnapshot,
    getPointerServerSnapshot,
  )

  // ─── Position motion values ───────────────────────────────────────
  // Inner dot follows the mouse instantly (set on every mousemove).
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Outer ring follows with spring-based lerp for the delayed feel.
  const smoothX = useSpring(mouseX, SPRING_CONFIG)
  const smoothY = useSpring(mouseY, SPRING_CONFIG)

  // ─── Animated visual properties (transform / opacity only) ────────
  const cursorOpacity = useMotionValue(0)
  const outerScaleX = useMotionValue(1)
  const outerScaleY = useMotionValue(1)
  const innerScale = useMotionValue(1)
  const innerOpacity = useMotionValue(1)

  // ─── Mutable state refs (no re-renders) ──────────────────────────
  const variantRef = useRef<CursorVariant>('default')
  const isMouseVisible = useRef(false)
  const isPressedRef = useRef(false)
  const outerRef = useRef<HTMLDivElement>(null)

  // ─── Variant application ──────────────────────────────────────────
  // Updates motion values and outer ring border color (via ref).
  const applyVariant = useCallback(
    (variant: CursorVariant) => {
      if (variantRef.current === variant) return
      variantRef.current = variant

      const outer = outerRef.current

      switch (variant) {
        case 'hover':
          // 40 × 1.5 = 60px diameter
          outerScaleX.set(1.5)
          outerScaleY.set(1.5)
          if (outer) outer.style.borderColor = '#FF4800'
          innerScale.set(0)
          innerOpacity.set(0)
          break
        case 'text':
          // 40 × 0.05 = 2px wide, 40 × 0.75 = 30px tall (rounded ends from border-radius)
          outerScaleX.set(0.05)
          outerScaleY.set(0.75)
          if (outer) outer.style.borderColor = 'rgba(255,255,255,0.5)'
          innerScale.set(0)
          innerOpacity.set(0)
          break
        default:
          outerScaleX.set(1)
          outerScaleY.set(1)
          if (outer) outer.style.borderColor = 'rgba(255,255,255,0.5)'
          innerScale.set(1)
          innerOpacity.set(1)
      }
    },
    [outerScaleX, outerScaleY, innerScale, innerOpacity],
  )

  // ─── Event handlers ───────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Show cursor on first movement inside viewport
      if (!isMouseVisible.current) {
        isMouseVisible.current = true
        cursorOpacity.set(1)
      }

      // Detect what's under the cursor
      const target = e.target as HTMLElement
      const interactiveEl = target.closest(INTERACTIVE_SELECTOR)
      const textEl = !interactiveEl && target.closest(TEXT_SELECTOR)

      if (interactiveEl) {
        applyVariant('hover')
      } else if (textEl) {
        applyVariant('text')
      } else {
        applyVariant('default')
      }
    },
    [mouseX, mouseY, cursorOpacity, applyVariant],
  )

  const handleMouseDown = useCallback(() => {
    isPressedRef.current = true
    // Squish effect: scale down ~15 %
    outerScaleX.set(outerScaleX.get() * 0.85)
    outerScaleY.set(outerScaleY.get() * 0.85)
  }, [outerScaleX, outerScaleY])

  const handleMouseUp = useCallback(() => {
    if (!isPressedRef.current) return
    isPressedRef.current = false

    // Restore the correct scale for the current variant
    const v = variantRef.current
    if (v === 'hover') {
      outerScaleX.set(1.5)
      outerScaleY.set(1.5)
    } else if (v === 'text') {
      outerScaleX.set(0.05)
      outerScaleY.set(0.75)
    } else {
      outerScaleX.set(1)
      outerScaleY.set(1)
    }
  }, [outerScaleX, outerScaleY])

  const handleMouseLeave = useCallback(() => {
    isMouseVisible.current = false
    cursorOpacity.set(0)
  }, [cursorOpacity])

  const handleMouseEnter = useCallback(() => {
    isMouseVisible.current = true
    cursorOpacity.set(1)
  }, [cursorOpacity])

  // ─── Attach / detach global listeners ─────────────────────────────
  useEffect(() => {
    if (!isDesktop) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isDesktop, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter])

  // ─── Render nothing on touch devices ──────────────────────────────
  if (!isDesktop) return null

  return (
    <>
      {/* Outer ring – follows mouse with spring easing (delayed) */}
      <motion.div
        ref={outerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.5)',
          mixBlendMode: 'difference',
          willChange: 'transform',
          pointerEvents: 'none',
          x: smoothX,
          y: smoothY,
          scaleX: outerScaleX,
          scaleY: outerScaleY,
          opacity: cursorOpacity,
          zIndex: 10000,
        }}
      />

      {/* Inner dot – follows mouse instantly */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: '#FF4800',
          willChange: 'transform',
          pointerEvents: 'none',
          x: mouseX,
          y: mouseY,
          scale: innerScale,
          opacity: innerOpacity,
          zIndex: 10001,
        }}
      />
    </>
  )
}

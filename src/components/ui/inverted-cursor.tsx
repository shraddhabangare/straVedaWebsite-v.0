"use client"

import React, { useEffect, useRef } from "react"
import { useCursorStyle, type CursorStyle } from "@/lib/cursor-context"
import { useTheme } from "next-themes"

/* ═══════════════════════════════════════════════════════════════════════
   Ultra-Smooth Premium Cursor Engine
   
   Performance targets:
   - 60fps minimum (120fps capable)
   - 0 visible delay, 0 jitter
   - GPU-accelerated via translate3d
   - Zero React re-renders during animation (all refs)
   
   Architecture:
   - Outer ring: 40px circle with 1.5px border, semi-transparent
   - Inner dot: 8px solid circle, full opacity
   - Both use requestAnimationFrame loop with lerp interpolation
   - Velocity tracking for stretch/skew effects on fast movement
   - Smooth size/opacity transitions via lerp (not CSS transitions)
   ═══════════════════════════════════════════════════════════════════════ */

// ─── Configuration ────────────────────────────────────────────────────
const LERP_POS = 0.12          // Position interpolation (0.08=trail, 0.15=responsive)
const LERP_SIZE = 0.12         // Size interpolation speed
const LERP_OPACITY = 0.1       // Opacity interpolation speed
const LERP_STRETCH = 0.12      // Stretch response speed
const STRETCH_DECAY = 0.12     // Stretch decay back to normal
const VELOCITY_THRESHOLD = 6   // Min velocity to start stretching
const MAX_STRETCH = 1.25       // Maximum stretch factor
const SNAP = 0.05              // Snap threshold to prevent micro-jitter
const VELOCITY_SMOOTH = 0.2    // Velocity smoothing factor

// Size config per cursor style: [outer diameter, inner diameter]
const SIZES: Record<CursorStyle, [number, number]> = {
  default: [40, 8],
  nav:     [28, 5],
  link:    [56, 8],
  text:    [72, 3],
}

// Opacity config per style: [outer, inner]
const OPACITIES: Record<CursorStyle, [number, number]> = {
  default: [0.5, 1],
  nav:     [0.7, 1],
  link:    [0.35, 0.85],
  text:    [0.3, 0.7],
}

// Blend mode per style
const BLENDS: Record<CursorStyle, string> = {
  default: "difference",
  nav:     "normal",
  link:    "difference",
  text:    "normal",
}

// ─── Lerp helper ──────────────────────────────────────────────────────
function lerp(current: number, target: number, factor: number): number {
  const diff = target - current
  if (Math.abs(diff) < SNAP) return target
  return current + diff * factor
}

// ─── Component ────────────────────────────────────────────────────────
export const Cursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // ─── Mutable animation state (never triggers re-render) ─────────
  const state = useRef({
    // Mouse target position
    mouseX: -200,
    mouseY: -200,
    // Interpolated render position
    posX: -200,
    posY: -200,
    // Smoothed velocity
    velX: 0,
    velY: 0,
    // Interpolated sizes
    outerSize: SIZES.default[0],
    innerSize: SIZES.default[1],
    // Interpolated opacities
    outerOp: 0,
    innerOp: 0,
    // Target opacities
    targetOuterOp: OPACITIES.default[0],
    targetInnerOp: OPACITIES.default[1],
    // Stretch
    stretchX: 1,
    stretchY: 1,
    rotation: 0,
    // Visibility
    visible: false,
    // Current cursor style
    style: "default" as CursorStyle,
    // Theme
    isDark: false,
    // Hover pressed state
    pressed: false,
  })

  // ─── Context ──────────────────────────────────────────────────────
  const { cursorStyle } = useCursorStyle()
  const { theme } = useTheme()

  // Sync theme to ref
  useEffect(() => {
    state.current.isDark = theme === "dark"
  }, [theme])

  // ─── Update targets when cursor style changes ─────────────────────
  useEffect(() => {
    const s = state.current
    s.style = cursorStyle
    s.targetOuterOp = OPACITIES[cursorStyle][0]
    s.targetInnerOp = OPACITIES[cursorStyle][1]
  }, [cursorStyle])

  // ─── Main animation loop (runs once, never restarts) ──────────────
  useEffect(() => {
    const tick = () => {
      const s = state.current
      const outer = outerRef.current
      const inner = innerRef.current

      // ── Position lerp ──
      const prevX = s.posX
      const prevY = s.posY
      s.posX = lerp(s.posX, s.mouseX, LERP_POS)
      s.posY = lerp(s.posY, s.mouseY, LERP_POS)

      // ── Velocity tracking ──
      const dx = s.mouseX - s.posX
      const dy = s.mouseY - s.posY
      s.velX = s.velX * (1 - VELOCITY_SMOOTH) + dx * VELOCITY_SMOOTH
      s.velY = s.velY * (1 - VELOCITY_SMOOTH) + dy * VELOCITY_SMOOTH
      const velMag = Math.sqrt(s.velX * s.velX + s.velY * s.velY)

      // ── Stretch / skew ──
      if (velMag > VELOCITY_THRESHOLD) {
        const factor = Math.min(
          1 + (velMag - VELOCITY_THRESHOLD) * 0.006,
          MAX_STRETCH
        )
        const angle = Math.atan2(s.velY, s.velX) * (180 / Math.PI)
        s.stretchX = lerp(s.stretchX, factor, LERP_STRETCH)
        s.stretchY = lerp(s.stretchY, 1 / factor, LERP_STRETCH)
        s.rotation = lerp(s.rotation, angle, 0.15)
      } else {
        s.stretchX = lerp(s.stretchX, 1, STRETCH_DECAY)
        s.stretchY = lerp(s.stretchY, 1, STRETCH_DECAY)
        s.rotation = lerp(s.rotation, 0, STRETCH_DECAY)
      }

      // ── Size targets ──
      const targetOuter = SIZES[s.style][0] * (s.pressed ? 0.85 : 1)
      const targetInner = SIZES[s.style][1] * (s.pressed ? 0.85 : 1)
      s.outerSize = lerp(s.outerSize, targetOuter, LERP_SIZE)
      s.innerSize = lerp(s.innerSize, targetInner, LERP_SIZE * 1.2)

      // ── Opacity ──
      const visOuter = s.visible ? s.targetOuterOp : 0
      const visInner = s.visible ? s.targetInnerOp : 0
      s.outerOp = lerp(s.outerOp, visOuter, LERP_OPACITY)
      s.innerOp = lerp(s.innerOp, visInner, LERP_OPACITY * 1.5)

      // ── Apply to DOM ──
      if (outer) {
        const h = s.outerSize / 2
        outer.style.transform =
          `translate3d(${s.posX - h}px, ${s.posY - h}px, 0) ` +
          `rotate(${s.rotation}deg) ` +
          `scale3d(${s.stretchX}, ${s.stretchY}, 1)`
        outer.style.width = `${s.outerSize}px`
        outer.style.height = `${s.outerSize}px`
        outer.style.opacity = `${s.outerOp}`

        // Style per mode
        const isNav = s.style === "nav"
        const isText = s.style === "text"
        if (isNav || isText) {
          outer.style.mixBlendMode = "normal"
          outer.style.backgroundColor = s.isDark
            ? "rgba(240, 240, 245, 0.06)"
            : "rgba(26, 26, 46, 0.06)"
          outer.style.borderColor = s.isDark
            ? "rgba(240, 240, 245, 0.35)"
            : "rgba(26, 26, 46, 0.35)"
          outer.style.borderWidth = "1.5px"
        } else {
          outer.style.mixBlendMode = BLENDS[s.style]
          outer.style.backgroundColor = "transparent"
          outer.style.borderColor = "#ffffff"
          outer.style.borderWidth = "1.5px"
        }
      }

      if (inner) {
        const h = s.innerSize / 2
        inner.style.transform =
          `translate3d(${s.posX - h}px, ${s.posY - h}px, 0) ` +
          `scale3d(${s.stretchX}, ${s.stretchY}, 1)`
        inner.style.width = `${s.innerSize}px`
        inner.style.height = `${s.innerSize}px`
        inner.style.opacity = `${s.innerOp}`

        const isNav = s.style === "nav"
        const isText = s.style === "text"
        if (isNav || isText) {
          inner.style.mixBlendMode = "normal"
          inner.style.backgroundColor = s.isDark ? "#f0f0f5" : "#1a1a2e"
        } else {
          inner.style.mixBlendMode = BLENDS[s.style]
          inner.style.backgroundColor = "#ffffff"
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, []) // Empty deps — loop runs once, reads all from refs

  // ─── Event listeners (document-level, passive) ────────────────────
  useEffect(() => {
    const s = state.current

    const onMove = (e: MouseEvent) => {
      s.mouseX = e.clientX
      s.mouseY = e.clientY
      if (!s.visible) s.visible = true
    }

    const onLeave = () => {
      s.visible = false
    }

    const onEnter = () => {
      s.visible = true
    }

    const onDown = () => {
      s.pressed = true
    }

    const onUp = () => {
      s.pressed = false
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave, { passive: true })
    document.addEventListener("mouseenter", onEnter, { passive: true })
    document.addEventListener("mousedown", onDown, { passive: true })
    document.addEventListener("mouseup", onUp, { passive: true })

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          border: "1.5px solid #ffffff",
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          width: SIZES.default[0],
          height: SIZES.default[0],
          opacity: 0,
          willChange: "transform, opacity, width, height",
          transition: "none",
        }}
        aria-hidden="true"
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          width: SIZES.default[1],
          height: SIZES.default[1],
          opacity: 0,
          willChange: "transform, opacity, width, height",
          transition: "none",
        }}
        aria-hidden="true"
      />
    </>
  )
}

export default Cursor

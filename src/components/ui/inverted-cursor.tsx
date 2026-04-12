"use client"

import React, { useEffect, useRef, useState } from "react"
import { useCursorStyle, type CursorStyle } from "@/lib/cursor-context"
import { useTheme } from "next-themes"

interface CursorProps {
  defaultSize?: number
}

export const Cursor: React.FC<CursorProps> = ({ defaultSize = 60 }) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)
  const previousPos = useRef({ x: -100, y: -100 })
  const positionRef = useRef({ x: -100, y: -100 })
  const animSizeRef = useRef(defaultSize)

  const [visible, setVisible] = useState(false)
  const [animSize, setAnimSize] = useState(defaultSize)

  const { cursorStyle } = useCursorStyle()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Size config per cursor style
  const SIZE_MAP: Record<CursorStyle, number> = {
    default: 60,
    nav: 36,
    link: 48,
  }

  const targetSize = SIZE_MAP[cursorStyle]

  // Color config: nav cursor is dark on light bg, light on dark bg (for visibility)
  const getNavColor = () => isDark ? '#f0f0f5' : '#1a1a2e'

  const cursorBg = cursorStyle === 'nav'
    ? getNavColor()
    : '#ffffff'

  const blendClass = cursorStyle === 'nav' ? '' : 'mix-blend-difference'

  // Keep animSizeRef in sync with state for the animation loop
  useEffect(() => {
    animSizeRef.current = animSize
  }, [animSize])

  // Smoothly interpolate cursor size via lerp
  useEffect(() => {
    let frame: number
    const lerp = () => {
      setAnimSize((prev) => {
        const next = prev + (targetSize - prev) * 0.15
        return Math.abs(next - targetSize) < 0.5 ? targetSize : next
      })
      frame = requestAnimationFrame(lerp)
    }
    frame = requestAnimationFrame(lerp)
    return () => cancelAnimationFrame(frame)
  }, [targetSize])

  // Animation loop + document-level mouse tracking — runs once, never restarts
  useEffect(() => {
    const animate = () => {
      if (!cursorRef.current) return

      const pos = positionRef.current
      const currentX = previousPos.current.x
      const currentY = previousPos.current.y
      const halfSize = animSizeRef.current / 2
      const targetX = pos.x - halfSize
      const targetY = pos.y - halfSize

      const deltaX = (targetX - currentX) * 0.2
      const deltaY = (targetY - currentY) * 0.2

      const newX = currentX + deltaX
      const newY = currentY + deltaY

      previousPos.current = { x: newX, y: newY }
      cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`

      requestRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      setVisible(true)
      positionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    // Use DOCUMENT-level listeners so cursor tracks over fixed/absolute/z-indexed elements
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, []) // Empty deps — runs once, all mutable state via refs

  return (
    <div ref={containerRef} className="absolute inset-0">
      <div
        ref={cursorRef}
        className={`pointer-events-none absolute z-50 rounded-full ${blendClass}`}
        style={{
          width: animSize,
          height: animSize,
          backgroundColor: cursorBg,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease, background-color 0.2s ease',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export default Cursor

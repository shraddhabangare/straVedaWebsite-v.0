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
  // @ts-ignore
  const requestRef = useRef<number>()
  const previousPos = useRef({ x: -100, y: -100 })

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: -100, y: -100 })
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

  // Color config: nav cursor is black on light, white on dark (for visibility)
  const getNavColor = () => isDark ? '#f0f0f5' : '#1a1a2e'

  const cursorBg = cursorStyle === 'nav'
    ? getNavColor()
    : '#ffffff'

  const blendClass = cursorStyle === 'nav' ? '' : 'mix-blend-difference'

  // Smoothly interpolate cursor size
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

  const animate = () => {
    if (!cursorRef.current) return

    const currentX = previousPos.current.x
    const currentY = previousPos.current.y
    const halfSize = animSize / 2
    const targetX = position.x - halfSize
    const targetY = position.y - halfSize

    const deltaX = (targetX - currentX) * 0.2
    const deltaY = (targetY - currentY) * 0.2

    const newX = currentX + deltaX
    const newY = currentY + deltaY

    previousPos.current = { x: newX, y: newY }
    cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      setVisible(true)
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [position, animSize])

  return (
    <div ref={containerRef} className="absolute inset-0 cursor-none">
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

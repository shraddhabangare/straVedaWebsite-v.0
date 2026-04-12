'use client';

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { GrainGradient } from '@paper-design/shaders-react';
import { cn } from '@/lib/utils';

/**
 * StravedaHeroBackground — Combined gradient animation + grain shader
 *
 * Fuses two premium visual effects into one cohesive hero backdrop:
 *   1. Animated gradient orbs (CSS + SVG goo filter blend)
 *   2. WebGL grain gradient (@paper-design/shaders-react)
 *
 * Theme-aware: Black + White + Orange palette for both light and dark modes.
 *
 * Light mode: White base → soft orange/white/purple orbs → subtle grain
 * Dark mode:  Deep black base → vibrant orange/purple orbs → rich grain
 */
export default function StravedaHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  // SSR-safe client detection via useSyncExternalStore
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  // ── Set CSS custom properties on the container (scoped, not body) ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !mounted) return;

    if (isDark) {
      el.style.setProperty('--gradient-bg-start', 'rgb(5, 5, 15)');
      el.style.setProperty('--gradient-bg-end', 'rgb(18, 14, 35)');
      el.style.setProperty('--c1', '255, 72, 0');          // brand orange
      el.style.setProperty('--c2', '43, 35, 88');           // brand purple
      el.style.setProperty('--c3', '200, 50, 0');           // deep orange
      el.style.setProperty('--c4', '70, 55, 130');          // mid purple
      el.style.setProperty('--c5', '255, 110, 30');         // warm orange
      el.style.setProperty('--c-pointer', '255, 72, 0');
      el.style.setProperty('--c-blend', 'hard-light');
    } else {
      el.style.setProperty('--gradient-bg-start', 'rgb(255, 255, 255)');
      el.style.setProperty('--gradient-bg-end', 'rgb(250, 248, 253)');
      el.style.setProperty('--c1', '255, 72, 0');          // brand orange
      el.style.setProperty('--c2', '255, 140, 90');         // light orange
      el.style.setProperty('--c3', '43, 35, 88');           // brand purple (subtle)
      el.style.setProperty('--c4', '255, 200, 165');        // peach
      el.style.setProperty('--c5', '200, 195, 225');        // lavender
      el.style.setProperty('--c-pointer', '255, 72, 0');
      el.style.setProperty('--c-blend', 'soft-light');
    }
    el.style.setProperty('--orb-size', '80%');
  }, [isDark, mounted]);

  // ── Smooth mouse-following interpolation ──
  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(prev => prev + (tgX - prev) / 20);
      setCurY(prev => prev + (tgY - prev) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  // ── Safari detection for blur fallback (computed once) ──
  const isSafari = useMemo(
    () => typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    []
  );

  // ── SSR fallback ──
  if (!mounted) {
    return <div className="absolute inset-0 bg-white dark:bg-[#0a0a14]" style={{ zIndex: 0 }} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden',
        'bg-[linear-gradient(40deg,var(--gradient-bg-start),var(--gradient-bg-end))]'
      )}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* ── SVG goo filter for blob merging ── */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="heroGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* ── Layer 1: Animated gradient orbs ── */}
      <div
        className={cn(
          'gradients-container h-full w-full blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#heroGoo)_blur(40px)]'
        )}
      >
        {/* Orb 1 — primary brand orange */}
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_var(--c1)_0,_var(--c1)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)] top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:center_center]',
            'animate-hero-first',
            'opacity-100'
          )}
        />

        {/* Orb 2 — secondary */}
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c2),_0.8)_0,_rgba(var(--c2),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)] top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%-400px)]',
            'animate-hero-second',
            'opacity-100'
          )}
        />

        {/* Orb 3 — tertiary */}
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c3),_0.8)_0,_rgba(var(--c3),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)] top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%+400px)]',
            'animate-hero-third',
            'opacity-100'
          )}
        />

        {/* Orb 4 — quaternary (70% opacity) */}
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c4),_0.8)_0,_rgba(var(--c4),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)] top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%-200px)]',
            'animate-hero-fourth',
            'opacity-70'
          )}
        />

        {/* Orb 5 — quinary */}
        <div
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c5),_0.8)_0,_rgba(var(--c5),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-[var(--orb-size)] h-[var(--orb-size)] top-[calc(50%-var(--orb-size)/2)] left-[calc(50%-var(--orb-size)/2)]',
            '[transform-origin:calc(50%-800px)_calc(50%+800px)]',
            'animate-hero-fifth',
            'opacity-100'
          )}
        />

        {/* Interactive pointer-following orb */}
        <div
          ref={interactiveRef}
          onMouseMove={handleMouseMove}
          className={cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--c-pointer),_0.8)_0,_rgba(var(--c-pointer),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--c-blend)] w-full h-full -top-1/2 -left-1/2',
            'opacity-70'
          )}
        />
      </div>

      {/* ── Layer 2: Grain gradient overlay (WebGL) ── */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, opacity: isDark ? 0.35 : 0.12 }}
      >
        <GrainGradient
          style={{ height: '100%', width: '100%' }}
          colorBack={isDark ? 'hsl(240, 30%, 4%)' : 'hsl(270, 20%, 98%)'}
          softness={0.8}
          intensity={0.5}
          noise={0}
          shape="corners"
          offsetX={0.3}
          offsetY={0.2}
          scale={1}
          rotation={15}
          speed={0.8}
          colors={
            isDark
              ? ['hsl(14, 100%, 50%)', 'hsl(248, 43%, 20%)', 'hsl(14, 80%, 25%)']
              : ['hsl(14, 100%, 57%)', 'hsl(40, 100%, 85%)', 'hsl(248, 30%, 88%)']
          }
        />
      </div>

      {/* ── Layer 3: Subtle vignette for depth ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: isDark
            ? 'radial-gradient(ellipse at 30% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)'
            : 'radial-gradient(ellipse at 30% 50%, transparent 50%, rgba(0,0,0,0.03) 100%)',
        }}
      />
    </div>
  );
}

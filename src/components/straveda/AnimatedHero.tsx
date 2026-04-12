'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/straveda/MagneticButton';
import StravedaWebGLHero from '@/components/straveda/StravedaWebGLHero';

const ease = [0.4, 0, 0.2, 1] as const;

interface AnimatedHeroProps {
  onNavigate: (page: string) => void;
}

/**
 * Premium Hero with WebGL Shader Background + Animated Text Rotation
 * Light theme that transitions to dark as user scrolls
 * Enhanced with hero-1 decorative borders, pill badge, and staggered entrance animations
 */
export default function AnimatedHero({ onNavigate }: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ['agility.', 'resilience.', 'innovation.', 'scalability.', 'excellence.'],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles.length]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* WebGL Shader Background */}
      <StravedaWebGLHero />

      {/* Decorative Side Borders — hero-1 style */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-[860px] lg:block"
      >
        <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
        <div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
      </div>

      {/* Content Faded Borders — inner gradient lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] size-full overflow-hidden"
      >
        <div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
        <div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
        <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
        <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto w-full max-w-[860px] px-6 py-24 lg:px-8">

        {/* Enhanced Pill Badge — hero-1 style with hover arrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
        >
          <span
            className={cn(
              'group mx-auto inline-flex w-fit items-center gap-3 rounded-full border px-3 py-1.5 shadow-sm',
              'cursor-default transition-all duration-300 hover:shadow-md'
            )}
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderColor: 'rgba(255,72,0,0.2)',
            }}
          >
            <Building2
              className="size-3 shrink-0"
              style={{ color: '#FF4800' }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: '#1a1a2e' }}
            >
              Enterprise IT Consulting
            </span>
            <span
              className="block h-5 w-px shrink-0"
              style={{ background: 'rgba(0,0,0,0.1)' }}
            />
            <ArrowRight
              className="size-3 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1"
              style={{ color: '#FF4800' }}
            />
          </span>
        </motion.div>

        {/* Animated Headline with rotating words + staggered entrance */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-6 mt-6 font-semibold leading-[0.95] hero-text-transition"
          style={{
            fontSize: 'clamp(48px, 8vw, 110px)',
            fontWeight: 600,
            lineHeight: 0.95,
          }}
        >
          <span className="block text-[#1a1a2e]">
            Less complexity,
          </span>
          <span className="block text-[#1a1a2e]">
            more{' '}
          </span>
          <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-bold"
                style={{ color: '#FF4800' }}
                initial={{ opacity: 0, y: '-100%' }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-[18px] md:text-[20px] font-normal leading-relaxed max-w-[600px]"
          style={{ color: '#4a4a5a' }}
        >
          Enterprise architecture, technology strategy, and management consulting for forward-thinking organizations. Based in Plano, Texas.
        </motion.p>

        {/* CTA Buttons — enhanced with rounded-full */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <motion.button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-xl shadow-lg shadow-orange-500/25"
              style={{ background: '#FF4800' }}
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </MagneticButton>
          <motion.button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] px-7 py-3.5 text-[14px] font-medium transition-all duration-200 hover:scale-[1.02] hover:border-[#FF4800]/50"
            style={{
              borderColor: 'rgba(43,35,88,0.3)',
              color: '#2B2358',
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
            }}
          >
            View our services
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="mt-10"
        >
          <div
            className="mb-5 w-full max-w-[400px]"
            style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
          />
          <div className="flex items-center gap-[10px]">
            <div className="flex items-center gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current"
                  style={{ color: '#FF4800' }}
                />
              ))}
            </div>
            <span className="text-[15px] font-semibold" style={{ color: '#1a1a2e' }}>
              5.0
            </span>
            <span className="text-[14px]" style={{ color: '#6b7280' }}>
              Google Reviews
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-widest" style={{ color: '#6b7280' }}>
            Scroll
          </span>
          <div
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '2px solid rgba(43,35,88,0.3)' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full"
              style={{ background: '#FF4800' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

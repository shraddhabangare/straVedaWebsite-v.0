'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Logo {
  src: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

interface MarqueeLogoScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  logos: Logo[];
  speed?: 'normal' | 'slow' | 'fast';
}

const MarqueeLogoScroller = React.forwardRef<HTMLDivElement, MarqueeLogoScrollerProps>(
  ({ title, description, logos, speed = 'normal', className, ...props }, ref) => {
    const durationMap = { normal: '40s', slow: '80s', fast: '5s' };
    const animationDuration = durationMap[speed];

    return (
      <>
        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn('w-full overflow-hidden', className)}
          {...props}
        >
          {/* ── Header ─────────────────────────────────── */}
          {/* Spacing: 40px bottom per 8px scale (mb-10) */}
          <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <h2
              className="font-normal text-[#1a1a2e] dark:text-[#f0f0f5]"
              style={{
                fontSize: 'clamp(24px, 3vw, 32px)', /* sub-heading scale */
                lineHeight: 1.15,
                letterSpacing: '-0.5px',
                fontWeight: 400,
              }}
            >
              {title}
            </h2>
            <p
              className="self-start text-[16px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af] lg:text-right"
              style={{ fontWeight: 400 }}
            >
              {description}
            </p>
          </div>

          {/* Divider */}
          <div
            className="mb-8"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(255,72,0,0.3), rgba(255,72,0,0.05) 60%, transparent)',
            }}
          />

          {/* ── Marquee Track ──────────────────────────── */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div
              className="flex w-max items-center gap-4 py-2 pr-4"
              style={{
                animation: `marquee-scroll ${animationDuration} linear infinite`,
                willChange: 'transform',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')
              }
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="group relative shrink-0 overflow-hidden"
                  style={{
                    width: '160px',
                    height: '80px',
                    borderRadius: '8px', /* 8px base unit */
                    background: 'rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Gradient hover reveal */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      transform: 'scale(1.5)',
                      background: `linear-gradient(135deg, ${logo.gradient.from}, ${logo.gradient.via}, ${logo.gradient.to})`,
                    }}
                    className="group-hover:opacity-100 group-hover:scale-100"
                  />
                  {/* Logo via next/image */}
                  <div
                    className="relative"
                    style={{ width: '100px', height: '40px' }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      style={{ objectFit: 'contain', opacity: 0.55, transition: 'opacity 0.3s' }}
                      className="group-hover:opacity-100"
                      sizes="100px"
                      unoptimized /* external SVG URLs */
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
);

MarqueeLogoScroller.displayName = 'MarqueeLogoScroller';
export { MarqueeLogoScroller };

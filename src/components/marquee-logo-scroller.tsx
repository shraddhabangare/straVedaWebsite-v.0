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
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          .logo-card {
            position: relative;
            overflow: hidden;
            border-radius: 16px;
            background: rgba(255,255,255,0.85);
            border: 1px solid rgba(0,0,0,0.07);
            box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
            transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
            backdrop-filter: blur(8px);
          }
          .dark .logo-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 2px 16px rgba(0,0,0,0.3);
          }
          .logo-card:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06);
          }
          .logo-card .gradient-bg {
            position: absolute;
            inset: 0;
            opacity: 0;
            transition: opacity 0.4s ease;
          }
          .logo-card:hover .gradient-bg {
            opacity: 0.12;
          }
          .dark .logo-card:hover .gradient-bg {
            opacity: 0.22;
          }
          .logo-card .glow-border {
            position: absolute;
            inset: 0;
            border-radius: 16px;
            opacity: 0;
            transition: opacity 0.4s ease;
            padding: 1px;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }
          .logo-card:hover .glow-border {
            opacity: 1;
          }
          .logo-card .logo-name {
            opacity: 0;
            transform: translateY(4px);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .logo-card:hover .logo-name {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>

        <section
          ref={ref}
          aria-label={title}
          className={cn('w-full overflow-hidden', className)}
          {...props}
        >
          {/* Header */}
          <div className="mb-10 md:mb-14 flex flex-col items-center text-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest"
              style={{
                color: '#FF4800',
                background: 'rgba(255,72,0,0.08)',
                border: '1px solid rgba(255,72,0,0.18)',
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#FF4800',
                  display: 'inline-block',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              />
              Partners
            </span>
            <h2
              className="font-normal heading-gradient"
              style={{
                fontSize: 'clamp(1.75rem, 7vw, 3.5rem)',
                lineHeight: 1.0,
                letterSpacing: 'clamp(-1px, -0.04em, -2.05px)',
                fontWeight: 400,
              }}
            >
              {title}
            </h2>
            <p
              className="max-w-xl text-[15px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]"
              style={{ fontWeight: 400 }}
            >
              {description}
            </p>
          </div>

          {/* Divider */}
          <div
            className="mb-12 mx-auto"
            style={{
              height: '1px',
              maxWidth: '120px',
              background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.5), transparent)',
            }}
          />

          {/* Marquee Track */}
          <div
            className="w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            }}
          >
            <div
              className="flex w-max items-center gap-5 py-3 pr-5"
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
                  className="logo-card group shrink-0 flex flex-col items-center justify-center gap-2"
                  style={{
                    width: 'clamp(130px, 16vw, 175px)',
                    height: 'clamp(80px, 12vw, 105px)',
                    padding: '14px 16px 10px',
                  }}
                >
                  {/* Gradient background fill */}
                  <div
                    className="gradient-bg"
                    style={{
                      background: `linear-gradient(135deg, ${logo.gradient.from}, ${logo.gradient.via}, ${logo.gradient.to})`,
                    }}
                  />

                  {/* Glowing border */}
                  <div
                    className="glow-border"
                    style={{
                      background: `linear-gradient(135deg, ${logo.gradient.from}, ${logo.gradient.via}, ${logo.gradient.to})`,
                    }}
                  />

                  {/* Logo image */}
                  <div className="relative z-10" style={{ width: '90px', height: '42px' }}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      style={{ objectFit: 'contain', transition: 'filter 0.3s ease' }}
                      className="group-hover:brightness-110"
                      sizes="90px"
                      unoptimized
                    />
                  </div>

                  {/* Logo name */}
                  <span
                    className="logo-name relative z-10 text-[10px] font-semibold tracking-wide uppercase text-[#6b7280] dark:text-[#9ca3af]"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {logo.alt}
                  </span>
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

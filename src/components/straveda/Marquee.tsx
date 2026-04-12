'use client'

import { useMemo } from 'react'

interface MarqueeProps {
  items?: string[]
  speed?: number
  direction?: 'left' | 'right'
}

export default function Marquee({
  items = [
    'Enterprise Architecture',
    'Red Hat Middleware',
    'Cloud Strategy',
    'Digital Transformation',
    'Program Management',
    'Agile Delivery',
    'Virtualization',
    'Open Standards',
    'Microservices',
    'API Architecture',
  ],
  speed = 25,
  direction = 'left',
}: MarqueeProps) {
  // Build the inner content: items separated by dots
  const content = useMemo(
    () =>
      items.map((item) => (
        <span key={item} className="inline-flex items-center gap-4 whitespace-nowrap">
          <span
            className="text-[14px] font-semibold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.15)' }}
          >
            {item}
          </span>
          <span
            className="text-[14px]"
            style={{ color: 'rgba(255,255,255,0.08)' }}
          >
            &middot;
          </span>
        </span>
      )),
    [items],
  )

  const keyframeName = direction === 'left' ? 'marqueeScrollLeft' : 'marqueeScrollRight'

  return (
    <section
      className="w-full overflow-hidden py-6"
      style={{
        background: '#2B2358',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <style>{`
        @keyframes marqueeScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div
        className="inline-flex w-max"
        style={{
          animation: `${keyframeName} ${speed}s linear infinite`,
        }}
      >
        {/* First copy */}
        {content}
        {/* Duplicate for seamless loop */}
        {content}
      </div>
    </section>
  )
}

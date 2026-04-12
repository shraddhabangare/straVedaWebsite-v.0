'use client';

import { useRef, useEffect, useState, useMemo, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedRingProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  duration?: number;
  label: string;
  suffix?: string;
  decimals?: number;
  icon?: ReactNode;
}

export default function AnimatedRingProgress({
  value,
  maxValue = 100,
  size = 140,
  strokeWidth = 8,
  duration = 2,
  label,
  suffix = '',
  decimals = 0,
  icon,
}: AnimatedRingProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / maxValue, 1);

  // Counter animation
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const elapsedProgress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - elapsedProgress, 3);
      const currentValue = eased * value;
      setCount(decimals > 0 ? parseFloat(currentValue.toFixed(decimals)) : Math.round(currentValue));
      if (elapsedProgress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, value, duration, decimals]);

  // Unique gradient IDs to avoid SVG conflicts
  const gradientId = useMemo(() => `ring-gradient-${Math.random().toString(36).slice(2, 9)}`, []);
  const glowId = useMemo(() => `ring-glow-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* SVG Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow filter */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4800" />
              <stop offset="100%" stopColor="#ff6a33" />
            </linearGradient>
          </defs>

          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Progress ring with glow */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference * (1 - progress) } : {}}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
            style={{ filter: `url(#${glowId})` }}
          />
        </svg>

        {/* Center content — counter + icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && (
            <div className="mb-1">
              {icon}
            </div>
          )}
          <span
            className="counter-display font-bold"
            style={{
              fontSize: size >= 140 ? '28px' : size >= 120 ? '24px' : '20px',
              lineHeight: 1,
              color: '#1a1a2e',
            }}
          >
            {count}{suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      <span
        className="mt-4 block text-center text-[13px] md:text-[14px] font-medium"
        style={{ color: '#6b7280' }}
      >
        {label}
      </span>
    </div>
  );
}

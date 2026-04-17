'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, Compass, ClipboardCheck, Server, ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Service Data                                                       */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  title: string;
  short: string;
  extended: string;
  capabilities: string[];
  icon: React.ElementType;
}

const serviceData: ServiceItem[] = [
  {
    title: 'Enterprise Architecture',
    short: 'Modernize your application portfolio with adaptive architecture.',
    extended:
      'We evolve your application portfolio using adaptive, open-standards architecture. Our solutions increase reliability, maintainability and interoperability.',
    capabilities: [
      'Portfolio modernization',
      'Open standards integration',
      'Scalable microservices',
      'API architecture',
    ],
    icon: Braces,
  },
  {
    title: 'Technology Strategy',
    short: 'Align IT investments with business goals for sustainable growth.',
    extended:
      'We align your IT investments with business goals, creating clear roadmaps that accelerate time to market and position you for sustainable growth.',
    capabilities: [
      'Digital transformation roadmaps',
      'IT investment frameworks',
      'Cloud strategy',
      'Vendor assessment',
    ],
    icon: Compass,
  },
  {
    title: 'Management Consulting',
    short: 'Expert program and project management through meticulous execution.',
    extended:
      'Expert Product, Program & Project management delivered through meticulous planning and execution. We eliminate bottlenecks and drive enterprise delivery.',
    capabilities: [
      'Product & program management',
      'Agile delivery frameworks',
      'Stakeholder alignment',
      'Governance',
    ],
    icon: ClipboardCheck,
  },
  {
    title: 'Software Solutions',
    short: 'Red Hat middleware and virtualization at enterprise scale.',
    extended:
      'We deploy Red Hat Enterprise Middleware and virtualization solutions that lower total cost of ownership and maximize application performance.',
    capabilities: [
      'RHEL deployment',
      'Containerization',
      'Enterprise integration',
      'ESB platforms',
    ],
    icon: Server,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Easing                                                   */
/* ------------------------------------------------------------------ */

const ease = [0.4, 0, 0.2, 1] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ServicesHoverModalProps {
  onNavigate: (page: string) => void;
}

export default function ServicesHoverModal({ onNavigate }: ServicesHoverModalProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [panelOffset, setPanelOffset] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Cleanup timeout on unmount */
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  /* ---- Handlers ---- */

  const handleCardMouseEnter = useCallback((index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    /* Measure card position relative to grid (synced in same render batch) */
    const card = cardRefs.current[index];
    const grid = gridRef.current;
    if (card && grid) {
      const gridRect = grid.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      setPanelOffset(cardRect.left - gridRect.left);
    }

    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 200);
  }, []);

  const handlePanelMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  /* ---- Derived state ---- */

  const activeService = hoveredIndex !== null ? serviceData[hoveredIndex] : null;
  const ActiveIcon = activeService?.icon;

  /* ---- Render ---- */

  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* ---- Section Header ---- */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            OUR EXPERTISE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium text-[#1a1a2e]"
          >
            Explore our service capabilities
          </motion.h2>
        </div>

        {/* ---- Service Cards Grid ---- */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceData.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease }}
                whileHover={{ y: -4 }}
                className={`card-premium group relative flex flex-col items-start gap-4 rounded-xl bg-white p-6 border cursor-pointer transition-all duration-300 ${
                  isHovered
                    ? 'border-[#FF4800]/30 shadow-[0_8px_30px_rgba(255,72,0,0.08)]'
                    : 'border-[#e5e7eb] hover:border-[#FF4800]/20 hover:shadow-sm'
                }`}
              >
                {/* Icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255,72,0,0.1), rgba(255,72,0,0.04))',
                  }}
                >
                  <Icon
                    size={28}
                    className="text-[#FF4800]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#1a1a2e]">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="text-sm leading-relaxed text-[#6b7280] line-clamp-2">
                  {service.short}
                </p>

                {/* Learn more link */}
                <div className="mt-auto pt-2">
                  <span
                    className={`text-sm font-medium flex items-center gap-1 transition-colors duration-200 ${
                      isHovered
                        ? 'text-[#FF4800]'
                        : 'text-[#6b7280] group-hover:text-[#FF4800]'
                    }`}
                  >
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ---- Expanded Detail Panel (appears below the grid) ---- */}
        <AnimatePresence mode="wait">
          {hoveredIndex !== null && activeService && ActiveIcon && (
            <motion.div
              key={`panel-${hoveredIndex}`}
              onMouseEnter={handlePanelMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <div className="bg-[#f8f8fc] rounded-xl border border-[#e5e7eb] mt-4 overflow-hidden relative">
                {/* Column alignment accent line (desktop only) */}
                <div
                  className="absolute top-0 bottom-0 w-[3px] bg-[#FF4800] hidden md:block transition-all duration-300 ease-out"
                  style={{ left: `${panelOffset}px` }}
                />
                {/* Subtle horizontal connector from left edge to accent line */}
                <div
                  className="absolute top-0 h-[3px] bg-gradient-to-r from-[#FF4800]/10 to-[#FF4800] hidden md:block transition-all duration-300 ease-out"
                  style={{ left: 0, width: `${panelOffset + 3}px` }}
                />

                {/* Panel content */}
                <div className="p-6 lg:p-8 border-l-[3px] border-l-[#FF4800] md:border-l-0">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Large icon */}
                    <div className="flex-shrink-0">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            'linear-gradient(145deg, rgba(255,72,0,0.12), rgba(255,72,0,0.04))',
                        }}
                      >
                        <ActiveIcon
                          size={32}
                          className="text-[#FF4800]"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl lg:text-2xl font-semibold text-[#1a1a2e] mb-3">
                        {activeService.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#6b7280] mb-6 max-w-2xl">
                        {activeService.extended}
                      </p>

                      {/* Capabilities list */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {activeService.capabilities.map((cap, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5"
                          >
                            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FF4800]/10">
                              <ArrowRight
                                size={10}
                                className="text-[#FF4800]"
                              />
                            </div>
                            <span className="text-sm text-[#6b7280]">
                              {cap}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => onNavigate('contact')}
                          className="rounded-lg bg-[#FF4800] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e03e00] btn-shine"
                        >
                          Start a project
                        </button>
                        <button className="rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-sm font-medium text-[#1a1a2e] transition-colors hover:border-[#FF4800]/30 hover:text-[#FF4800]">
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

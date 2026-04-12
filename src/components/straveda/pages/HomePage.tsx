'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useScrollGradient } from '@/hooks/useScrollGradient';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Braces,
  Compass,
  ClipboardCheck,
  Server,
  MapPin,
  Star,
  ArrowRight,
  Search,
  Target,
  Zap,
  TrendingUp,
  Building2,
  Shield,
  CircleDollarSign,
  Activity,
  Cloud,
  Brain,
  Globe,
  GitBranch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Marquee from '@/components/straveda/Marquee';
import TiltCard from '@/components/straveda/TiltCard';
import MagneticButton from '@/components/straveda/MagneticButton';
import ParticleField from '@/components/straveda/ParticleField';
import TextReveal from '@/components/straveda/TextReveal';
import ParallaxShowcase from '@/components/straveda/ParallaxShowcase';
import AnimatedRingProgress from '@/components/straveda/AnimatedRingProgress';
import AnimatedHero from '@/components/straveda/AnimatedHero';
import SubscribeSection from '@/components/straveda/SubscribeSection';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const ease = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const bentoItems: { title: string; description: string; size: 'large' | 'normal'; icon: LucideIcon }[] = [
  { title: "Real-Time Monitoring", description: "24/7 infrastructure monitoring with instant alerts and automated remediation.", size: "large", icon: Activity },
  { title: "Cloud Native", description: "Built for Kubernetes, Docker, and serverless from day one.", size: "normal", icon: Cloud },
  { title: "Security First", description: "Zero-trust architecture with compliance automation.", size: "normal", icon: Shield },
  { title: "AI-Powered Insights", description: "Machine learning analytics that predict issues before they impact your business.", size: "normal", icon: Brain },
  { title: "Global Scale", description: "Multi-region deployment with 99.99% SLA guarantee.", size: "normal", icon: Globe },
  { title: "DevOps Automation", description: "CI/CD pipelines, IaC, and GitOps workflows that ship faster.", size: "normal", icon: GitBranch },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-[#1a1a2e]" style={{ fontSize: '96px', fontWeight: 600, lineHeight: 1 }}>
      {count}
      {suffix}
    </span>
  );
}

function MetricCounter({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      setCount(decimals > 0 ? parseFloat(value.toFixed(decimals)) : Math.round(value));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, target, decimals]);

  return (
    <span ref={ref} className="counter-display text-[#1a1a2e]" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
      {count}{suffix}
    </span>
  );
}

const testimonials = [
  {
    name: 'James R.',
    role: 'Senior VP · Accenture',
    quote: 'Straveda transformed our legacy infrastructure in record time. Their enterprise architecture expertise is unmatched.',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    role: 'Director of Engineering · Deloitte',
    quote: (
      <>
        The technology strategy they delivered gave us a clear roadmap.
        We shipped{' '}
        <span className="text-gradient-orange" style={{ fontWeight: 500 }}>3x faster</span>{' '}within the first quarter.
      </>
    ),
    stars: 5,
  },
  {
    name: 'David K.',
    role: 'CTO · IBM Global Services',
    quote: (
      <>
        Their management consulting approach eliminated bottlenecks
        we&apos;d struggled with for years.{' '}
        <span className="text-gradient-orange" style={{ fontWeight: 500 }}>True enterprise partners.</span>
      </>
    ),
    stars: 5,
  },
  {
    name: 'Emily T.',
    role: 'VP of Technology · Northrop Grumman',
    quote: 'Straveda\'s technology strategy roadmap transformed our IT investment approach. We now have a clear 3-year vision aligned with business outcomes.',
    stars: 5,
  },
  {
    name: 'Michael B.',
    role: 'CIO · State of Texas',
    quote: 'The enterprise architecture modernization eliminated our legacy debt. We\'re now running 99.99% uptime across all critical systems.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    role: 'Director of Operations · Deloitte',
    quote: 'Their management consulting team embedded seamlessly with our staff. Knowledge transfer was exceptional — we\'re now self-sufficient.',
    stars: 5,
  },
];

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Single auto-play timer that resets on manual navigation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const t = testimonials[currentIndex];

  return (
    <div className="relative flex flex-col items-center">
      {/* Carousel container */}
      <div className="relative flex w-full items-center justify-center">
        {/* Previous button */}
        <button
          onClick={goPrev}
          className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5"
          style={{ background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.2)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.2)')}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Card */}
        <div className="mx-12 w-full" style={{ maxWidth: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease }}
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: '#f8f8fc',
                borderLeft: '3px solid #FF4800',
              }}
            >
              {/* Large quote mark */}
              <span
                className="mb-4 block leading-none"
                style={{ fontSize: '56px', color: '#FF4800' }}
              >
                &#x275D;
              </span>

              {/* Gold stars */}
              <div className="mb-5 flex items-center gap-[2px]">
                {[...Array(t.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    style={{ color: '#FBBF24' }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p
                className="mb-6 text-[20px] italic leading-[1.8] text-[#1a1a2e]"
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
              />

              {/* Author */}
              <p className="text-[16px] font-semibold text-[#1a1a2e]">
                {t.name}
              </p>
              <p className="text-[14px]" style={{ color: '#6b7280' }}>
                {t.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-black/5"
          style={{ background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.2)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(0,0,0,0.2)')}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="mt-8 flex items-center justify-center gap-3">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full"
            style={{
              width: '8px',
              height: '8px',
              background: i === currentIndex ? '#FF4800' : '#d1d5db',
            }}
            whileHover={{ scale: 1.3 }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const heroScrolled = useScrollGradient(100);


  return (
    <div>
      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1A — ANIMATED WEBGL HERO (light theme) */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatedHero onNavigate={onNavigate} />

      {/* ═══════════════════════════════════════════════ */}
      {/* MARQUEE TICKER                                   */}
      {/* ═══════════════════════════════════════════════ */}
      <Marquee />

      {/* ═══════════════════════════════════════════════ */}
      {/* TECHNOLOGY PARTNERS                             */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-8 bg-white border-y border-[rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-6 text-center text-[12px] font-medium uppercase tracking-widest text-[#9ca3af]">
            Technology Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {['Red Hat', 'AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Linux Foundation'].map(name => (
              <span key={name} className="text-[15px] md:text-[16px] font-medium text-[#d1d5db] hover:text-[#FF4800] transition-colors duration-300 select-none tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* TRUSTED BY INDUSTRY LEADERS                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-12"
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid rgba(0,0,0,0.04)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Heading */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 text-center text-[14px] font-medium uppercase tracking-widest"
            style={{ color: '#9ca3af' }}
          >
            Trusted by industry leaders
          </motion.p>

          {/* Logo Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-3 gap-8 md:grid-cols-6"
          >
            {[
              { name: 'Accenture', className: 'font-bold tracking-wider' },
              { name: 'Deloitte', className: 'font-semibold tracking-wide' },
              { name: 'IBM', className: 'font-bold tracking-[0.2em]' },
              { name: 'JPMorgan', className: 'font-semibold tracking-wide' },
              { name: 'McKinsey', className: 'font-medium tracking-wider' },
              { name: 'Goldman Sachs', className: 'font-semibold tracking-wide' },
            ].map((logo) => (
              <motion.div
                key={logo.name}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.5, ease },
                  },
                }}
                className="flex items-center justify-center"
              >
                <span
                  className={`text-[18px] md:text-[22px] transition-all duration-300 hover:text-[#6b7280] select-none ${logo.className}`}
                  style={{ color: '#9ca3af' }}
                >
                  {logo.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1B — SERVICES TEASER                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24 section-glow-top"
        style={{ background: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-14"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              OUR SERVICES
            </p>
            <h2
              className="text-[42px] font-medium text-[#1a1a2e]"
              style={{ maxWidth: '580px', fontWeight: 500 }}
            >
              Enterprise solutions that modernize, scale, and deliver.
            </h2>
          </motion.div>

          {/* Card Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4"
          >
            {/* Card 1 — Enterprise Architecture */}
            <TiltCard className="rounded-xl">
            <motion.div
              variants={cardVariants}
              className="card-hover glow-border rounded-xl p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <Braces className="mb-5 h-7 w-7 text-[#FF4800]" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                ARCHITECTURE
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-[#1a1a2e]"
                style={{ fontWeight: 500 }}
              >
                Enterprise Architecture
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                Modernize your application portfolio with adaptive,
                open-standards architecture that scales.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#6b7280' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#6b7280')
                }
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
            </TiltCard>

            <TiltCard className="rounded-xl">
            <motion.div
              variants={cardVariants}
              className="card-hover glow-border rounded-xl p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <Compass className="mb-5 h-7 w-7 text-[#FF4800]" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                STRATEGY
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-[#1a1a2e]"
                style={{ fontWeight: 500 }}
              >
                Technology Strategy
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                Align IT investments with business goals to accelerate time to
                market and increase product innovation.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#6b7280' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#6b7280')
                }
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
            </TiltCard>

            <TiltCard className="rounded-xl">
            <motion.div
              variants={cardVariants}
              className="card-hover glow-border rounded-xl p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <ClipboardCheck className="mb-5 h-7 w-7 text-[#FF4800]" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                MANAGEMENT
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-[#1a1a2e]"
                style={{ fontWeight: 500 }}
              >
                Management Consulting
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                Expert Product, Program &amp; Project management through
                meticulous planning and execution.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#6b7280' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#6b7280')
                }
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
            </TiltCard>

            <TiltCard className="rounded-xl">
            <motion.div
              variants={cardVariants}
              className="card-hover glow-border rounded-xl p-8"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <Server className="mb-5 h-7 w-7 text-[#FF4800]" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                SOFTWARE
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-[#1a1a2e]"
                style={{ fontWeight: 500 }}
              >
                Software Solutions
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                Red Hat Enterprise Middleware and virtualization to lower total
                cost of ownership at enterprise scale.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#6b7280' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#6b7280')
                }
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* WHAT SETS US APART — BENTO GRID                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: '#f8f8fc' }}>
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-14"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              WHAT SETS US APART
            </p>
            <h2
              className="text-[42px] font-medium text-[#1a1a2e]"
              style={{ fontWeight: 500 }}
            >
              Enterprise-grade capabilities.
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {bentoItems.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease },
                  },
                }}
                className={`rounded-xl p-6 transition-all duration-300 ${item.size === 'large' ? 'md:col-span-2 lg:col-span-2 p-8' : ''}`}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,72,0,0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,72,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(255,72,0,0.08)' }}
                >
                  <item.icon className="h-6 w-6" style={{ color: '#FF4800' }} />
                </div>
                <h3
                  className="mb-2 text-[20px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1C — ABOUT / STATS                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: '#f8f8fc' }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:px-8">
          {/* LEFT — 40% */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col justify-center lg:w-[40%]"
          >
            <Counter target={14} suffix="+" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mt-3 h-[3px] w-8 rounded-full"
              style={{ background: '#FF4800', transformOrigin: 'left' }}
            />
            <p className="mt-3 text-[16px]" style={{ color: '#6b7280' }}>
              Years of Enterprise Excellence
            </p>
            <p
              className="mt-2 text-[12px] font-medium uppercase tracking-wider"
              style={{ color: '#9ca3af' }}
            >
              Est. 2010
            </p>
            <div className="mt-6 flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: '#FF4800' }} />
              <span className="text-[15px]" style={{ color: '#6b7280' }}>
                Plano, Texas
              </span>
            </div>
          </motion.div>

          {/* RIGHT — 60% */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col justify-center lg:w-[60%]"
          >
            <p
              className="mb-6 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              ABOUT US
            </p>
            <p
              className="text-[20px] leading-[1.7] text-[#1a1a2e]"
              style={{ maxWidth: '560px' }}
            >
              Since our inception, Straveda has focused on the intersection of
              enterprise technology and digital agility. We build the foundations
              of tomorrow&apos;s enterprise through standards-driven architecture and
              meticulous execution.
            </p>

            {/* Stats row */}
            <div className="mt-10 flex w-full max-w-md items-stretch">
              {/* Stat 1 */}
              <div className="flex flex-1 flex-col">
                <span className="text-[28px] font-bold text-[#1a1a2e]">
                  7
                </span>
                <span
                  className="mt-1 text-[13px]"
                  style={{ color: '#6b7280' }}
                >
                  Experts
                </span>
              </div>

              {/* Divider */}
              <div
                className="mx-6"
                style={{ borderLeft: '1px solid #FF4800' }}
              />

              {/* Stat 2 */}
              <div className="flex flex-1 flex-col">
                <span className="text-[28px] font-bold text-[#1a1a2e]">
                  100%
                </span>
                <span
                  className="mt-1 text-[13px]"
                  style={{ color: '#6b7280' }}
                >
                  Satisfaction
                </span>
              </div>

              {/* Divider */}
              <div
                className="mx-6"
                style={{ borderLeft: '1px solid #FF4800' }}
              />

              {/* Stat 3 */}
              <div className="flex flex-1 flex-col">
                <span className="text-[28px] font-bold text-[#1a1a2e]">
                  Cost-Effective
                </span>
                <span
                  className="mt-1 text-[13px]"
                  style={{ color: '#6b7280' }}
                >
                  Solutions
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1D — HOW WE WORK                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative py-24"
        style={{ background: '#FFFFFF' }}
      >
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,72,0,0.04) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-16"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              HOW WE WORK
            </p>
            <div className="line-decoration mb-4" />
            <h2
              className="text-[42px] font-medium text-[#1a1a2e]"
              style={{ fontWeight: 500, maxWidth: '640px' }}
            >
              A proven process for enterprise transformation.
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-4"
          >
            {/* Desktop connecting line (horizontal) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="pointer-events-none absolute top-[40px] right-0 hidden h-px w-[calc(100%-120px)] xl:block"
              style={{
                background: 'linear-gradient(90deg, #FF4800, rgba(255,72,0,0.15))',
                transformOrigin: 'left',
              }}
            />

            {/* Step 1 — Discovery */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="relative border-l-2 border-[#FF4800] pl-8 pb-12 last:pb-0 xl:pl-0"
            >
              <span
                className="mb-2 block"
                style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
              >
                01
              </span>
              <div className="mt-2 flex items-center gap-3">
                <Search className="h-5 w-5" style={{ color: '#FF4800' }} />
                <h3
                  className="text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Discovery
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                We assess your current landscape, identify pain points, and define success metrics.
              </p>
            </motion.div>

            {/* Mobile connecting line 1→2 */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="pointer-events-none absolute bottom-0 left-[39px] hidden h-[calc(100%-120px)] w-px md:block xl:hidden"
              style={{
                background: 'linear-gradient(180deg, #FF4800, rgba(255,72,0,0.15))',
                transformOrigin: 'top',
              }}
            />

            {/* Step 2 — Strategy */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="relative border-l-2 border-[#FF4800] pl-8 pb-12 xl:border-l-0 xl:pl-8 xl:pb-0"
            >
              <span
                className="mb-2 block"
                style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
              >
                02
              </span>
              <div className="mt-2 flex items-center gap-3">
                <Target className="h-5 w-5" style={{ color: '#FF4800' }} />
                <h3
                  className="text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Strategy
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                We craft a tailored roadmap aligned with your business goals and budget.
              </p>
            </motion.div>

            {/* Mobile connecting line 2→3 */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="pointer-events-none absolute top-[40px] left-[calc(50%-1px)] hidden h-[calc(100%-120px)] w-px md:block xl:hidden"
              style={{
                background: 'linear-gradient(180deg, #FF4800, rgba(255,72,0,0.15))',
                transformOrigin: 'top',
              }}
            />

            {/* Step 3 — Execution */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="relative border-l-2 border-[#FF4800] pl-8 pb-12 last:pb-0 xl:border-l-0 xl:pl-8 xl:pb-0"
            >
              <span
                className="mb-2 block"
                style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
              >
                03
              </span>
              <div className="mt-2 flex items-center gap-3">
                <Zap className="h-5 w-5" style={{ color: '#FF4800' }} />
                <h3
                  className="text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Execution
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                Our experts implement solutions using proven frameworks and agile delivery.
              </p>
            </motion.div>

            {/* Step 4 — Optimize */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="relative border-l-2 border-[#FF4800] pl-8 xl:border-l-0 xl:pl-8"
            >
              <span
                className="mb-2 block"
                style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
              >
                04
              </span>
              <div className="mt-2 flex items-center gap-3">
                <TrendingUp className="h-5 w-5" style={{ color: '#FF4800' }} />
                <h3
                  className="text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Optimize
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#6b7280' }}>
                We measure results, refine approaches, and ensure long-term sustainability.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* RESULTS THAT SPEAK — METRICS BANNER               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 gradient-mesh-indigo">
        {/* Subtle decorative gradient glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,72,0,0.06) 0%, rgba(43,35,88,0.08) 40%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-14 text-center"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              RESULTS THAT SPEAK
            </p>
            <h2
              className="text-[36px] font-medium text-[#1a1a2e]"
              style={{ fontWeight: 500 }}
            >
              Numbers that define our impact.
            </h2>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4"
          >
            {/* Metric 1 — 200+ Projects Delivered */}
            <motion.div
              variants={cardVariants}
              className="frosted-card relative flex flex-col items-center rounded-xl px-4 py-8 md:px-6 md:py-10"
            >
              <AnimatedRingProgress
                value={200}
                maxValue={200}
                suffix="+"
                label="Projects Delivered"
                icon={<TrendingUp className="h-4 w-4" style={{ color: '#FF4800' }} />}
              />
            </motion.div>

            {/* Metric 2 — 99.9% Uptime Achieved */}
            <motion.div
              variants={cardVariants}
              className="frosted-card relative flex flex-col items-center rounded-xl px-4 py-8 md:px-6 md:py-10"
            >
              <AnimatedRingProgress
                value={99.9}
                maxValue={100}
                suffix="%"
                decimals={1}
                label="Uptime Achieved"
                icon={<Shield className="h-4 w-4" style={{ color: '#FF4800' }} />}
              />
            </motion.div>

            {/* Metric 3 — 40% Cost Reduction */}
            <motion.div
              variants={cardVariants}
              className="frosted-card relative flex flex-col items-center rounded-xl px-4 py-8 md:px-6 md:py-10"
            >
              <AnimatedRingProgress
                value={40}
                maxValue={100}
                suffix="%"
                label="Cost Reduction"
                icon={<CircleDollarSign className="h-4 w-4" style={{ color: '#FF4800' }} />}
              />
            </motion.div>

            {/* Metric 4 — 3x Faster Delivery */}
            <motion.div
              variants={cardVariants}
              className="frosted-card relative flex flex-col items-center rounded-xl px-4 py-8 md:px-6 md:py-10"
            >
              <AnimatedRingProgress
                value={3}
                maxValue={10}
                suffix="x"
                label="Faster Delivery"
                icon={<Zap className="h-4 w-4" style={{ color: '#FF4800' }} />}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Decorative gradient divider ── */}
      <div className="relative h-px w-full overflow-hidden" style={{ background: '#FFFFFF' }}>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent, #FF4800, transparent)', transformOrigin: 'center' }}
        />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* TESTIMONIALS — CLIENT FEEDBACK                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: '#f8f8fc' }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-14"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              CLIENT FEEDBACK
            </p>
            <h2
              className="text-[40px] font-medium text-[#1a1a2e]"
              style={{ fontWeight: 500 }}
            >
              What our clients say.
            </h2>
          </motion.div>

          {/* Testimonials Carousel */}
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── Decorative gradient divider ── */}
      <div className="relative h-px w-full overflow-hidden" style={{ background: '#f8f8fc' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, transparent, #FF4800, transparent)', transformOrigin: 'center' }}
        />
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* WHY CHOOSE STRAVEDA — PARALLAX SHOWCASE           */}
      {/* ═══════════════════════════════════════════════ */}
      <ParallaxShowcase onNavigate={onNavigate} />

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1F — CASE STUDIES                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: '#f8f8fc' }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-16"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              CASE STUDIES
            </p>
            <div className="line-decoration mb-4" />
            <h2
              className="text-[42px] font-medium text-[#1a1a2e]"
              style={{ fontWeight: 500, maxWidth: '580px' }}
            >
              Real results for real enterprises.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed" style={{ color: '#6b7280', maxWidth: '520px' }}>
              From financial services to government agencies, we deliver measurable outcomes that transform enterprise operations.
            </p>
          </motion.div>

          {/* Case Study Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {/* Card 1 — Fortune 500 Financial Services */}
            <motion.div
              variants={cardVariants}
              className="card-glow hover-lift rounded-xl transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(0,0,0,0.06)';
              }}
            >
              <div className="p-8">
                {/* Card number */}
                <span
                  className="mb-2 block"
                  style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
                >
                  01
                </span>
                {/* Industry badge */}
                <span
                  className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
                  style={{ background: '#FF4800' }}
                >
                  <Building2 className="h-3 w-3" />
                  Financial Services
                </span>
                {/* Company name */}
                <h3
                  className="mb-6 text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Fortune 500 Financial Services
                </h3>
                {/* Challenge */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Challenge</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Legacy middleware causing 60% downtime during peak hours
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Enterprise Architecture modernization with Red Hat middleware
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    99.9% uptime, 40% cost reduction, 3x faster deployments
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    99.9% uptime
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    -40% cost
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    3x deployments
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Global Healthcare Provider */}
            <motion.div
              variants={cardVariants}
              className="card-glow hover-lift rounded-xl transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(0,0,0,0.06)';
              }}
            >
              <div className="p-8">
                {/* Card number */}
                <span
                  className="mb-2 block"
                  style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
                >
                  02
                </span>
                {/* Industry badge */}
                <span
                  className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
                  style={{ background: '#FF4800' }}
                >
                  <Building2 className="h-3 w-3" />
                  Healthcare
                </span>
                {/* Company name */}
                <h3
                  className="mb-6 text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Global Healthcare Provider
                </h3>
                {/* Challenge */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Challenge</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Fragmented IT systems across 12 regional offices
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Technology Strategy roadmap + API integration platform
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Unified platform, 65% faster data sharing, $2.1M annual savings
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    Unified platform
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    65% faster
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    $2.1M saved
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Government Agency */}
            <motion.div
              variants={cardVariants}
              className="card-glow hover-lift rounded-xl transition-all duration-300"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(0,0,0,0.06)';
              }}
            >
              <div className="p-8">
                {/* Card number */}
                <span
                  className="mb-2 block"
                  style={{ fontSize: '64px', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
                >
                  03
                </span>
                {/* Industry badge */}
                <span
                  className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
                  style={{ background: '#FF4800' }}
                >
                  <Building2 className="h-3 w-3" />
                  Government
                </span>
                {/* Company name */}
                <h3
                  className="mb-6 text-[22px] font-medium text-[#1a1a2e]"
                  style={{ fontWeight: 500 }}
                >
                  Government Agency
                </h3>
                {/* Challenge */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Challenge</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Aging infrastructure with critical security vulnerabilities
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Management Consulting + Agile PMO delivery framework
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#6b7280' }}>
                    Zero security incidents, 50% faster delivery cycles, 100% compliance
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    Zero incidents
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    50% faster
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    100% compliant
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION — CLIENT SUCCESS STORIES                */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-20 gradient-mesh">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-14 text-center"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              CLIENT STORIES
            </p>
            <h2
              className="text-[36px] font-medium text-[#1a1a2e]"
              style={{ fontWeight: 500 }}
            >
              Real results from real partnerships.
            </h2>
          </motion.div>

          {/* Success Story Cards Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {/* Story 1 — Financial Services */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="card-glow relative rounded-xl p-8 transition-all duration-300"
              style={{
                background: '#f8f8fc',
                border: '1px solid rgba(0,0,0,0.06)',
                borderLeft: '2px solid #FF4800',
              }}
            >
              {/* Industry Badge */}
              <span
                className="mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
                style={{ background: 'rgba(255,72,0,0.15)', color: '#FF4800' }}
              >
                Financial Services
              </span>

              {/* Challenge Quote */}
              <p className="mb-4 text-[15px] italic leading-relaxed" style={{ color: '#6b7280' }}>
                &ldquo;Our legacy systems were failing under peak load. We needed a partner who understood enterprise-grade reliability.&rdquo;
              </p>

              {/* Solution Summary */}
              <p className="mb-6 text-[14px] leading-relaxed" style={{ color: '#6b7280' }}>
                Straveda designed a cloud-native architecture with automated failover, reducing deployment times from weeks to hours.
              </p>

              {/* Metric Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  <MetricCounter target={98} suffix="%" decimals={0} /> faster deployment
                </span>
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  60% cost reduction
                </span>
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  <MetricCounter target={15} suffix="M+" decimals={0} /> users served
                </span>
              </div>

              {/* Client Quote */}
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              />
              <p className="mb-2 text-[15px] italic leading-relaxed text-[#1a1a2e]">
                &ldquo;Straveda didn&apos;t just fix our problems — they future-proofed our entire platform.&rdquo;
              </p>
              <p className="text-[14px] font-semibold text-[#1a1a2e]">
                Robert Chen
              </p>
              <p className="text-[13px]" style={{ color: '#6b7280' }}>
                CTO · National Financial Group
              </p>

              {/* View Case Study Link */}
              <button
                onClick={() => onNavigate('services')}
                className="group mt-4 flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#FF4800' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a2e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FF4800')}
              >
                View case study
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Story 2 — Healthcare */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="card-glow relative rounded-xl p-8 transition-all duration-300"
              style={{
                background: '#f8f8fc',
                border: '1px solid rgba(0,0,0,0.06)',
                borderLeft: '2px solid #FF4800',
              }}
            >
              {/* Industry Badge */}
              <span
                className="mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
                style={{ background: 'rgba(255,72,0,0.15)', color: '#FF4800' }}
              >
                Healthcare
              </span>

              {/* Challenge Quote */}
              <p className="mb-4 text-[15px] italic leading-relaxed" style={{ color: '#6b7280' }}>
                &ldquo;Patient data was siloed across 12 regional offices. Critical information wasn&apos;t reaching doctors in time.&rdquo;
              </p>

              {/* Solution Summary */}
              <p className="mb-6 text-[14px] leading-relaxed" style={{ color: '#6b7280' }}>
                Built a unified integration platform connecting all regional systems with real-time data synchronization and HIPAA-compliant APIs.
              </p>

              {/* Metric Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  99.99% uptime
                </span>
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  $<MetricCounter target={4} suffix=".2M" decimals={1} /> savings
                </span>
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  <MetricCounter target={200} suffix="+" decimals={0} /> integrations
                </span>
              </div>

              {/* Client Quote */}
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              />
              <p className="mb-2 text-[15px] italic leading-relaxed text-[#1a1a2e]">
                &ldquo;The integration platform saved lives. Doctors now have instant access to patient histories.&rdquo;
              </p>
              <p className="text-[14px] font-semibold text-[#1a1a2e]">
                Dr. Sarah Mitchell
              </p>
              <p className="text-[13px]" style={{ color: '#6b7280' }}>
                VP of Technology · MedCare Health Systems
              </p>

              {/* View Case Study Link */}
              <button
                onClick={() => onNavigate('services')}
                className="group mt-4 flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#FF4800' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a2e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FF4800')}
              >
                View case study
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Story 3 — Government */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              className="card-glow relative rounded-xl p-8 transition-all duration-300"
              style={{
                background: '#f8f8fc',
                border: '1px solid rgba(0,0,0,0.06)',
                borderLeft: '2px solid #FF4800',
              }}
            >
              {/* Industry Badge */}
              <span
                className="mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white"
                style={{ background: 'rgba(255,72,0,0.15)', color: '#FF4800' }}
              >
                Government
              </span>

              {/* Challenge Quote */}
              <p className="mb-4 text-[15px] italic leading-relaxed" style={{ color: '#6b7280' }}>
                &ldquo;We had critical security vulnerabilities and zero modernization roadmap. Compliance deadlines were looming.&rdquo;
              </p>

              {/* Solution Summary */}
              <p className="mb-6 text-[14px] leading-relaxed" style={{ color: '#6b7280' }}>
                Delivered an Agile PMO framework with security-first architecture, enabling continuous compliance and rapid feature delivery.
              </p>

              {/* Metric Badges */}
              <div className="mb-6 flex flex-wrap gap-2">
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  3x faster delivery
                </span>
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  Zero downtime migration
                </span>
                <span
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#1a1a2e]"
                  style={{ background: 'rgba(255,72,0,0.12)' }}
                >
                  <MetricCounter target={500} suffix="+" decimals={0} /> team trained
                </span>
              </div>

              {/* Client Quote */}
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
              />
              <p className="mb-2 text-[15px] italic leading-relaxed text-[#1a1a2e]">
                &ldquo;They turned a failing program into a model for modern government IT. Truly exceptional partners.&rdquo;
              </p>
              <p className="text-[14px] font-semibold text-[#1a1a2e]">
                James Patterson
              </p>
              <p className="text-[13px]" style={{ color: '#6b7280' }}>
                Director of IT · Federal Agency
              </p>

              {/* View Case Study Link */}
              <button
                onClick={() => onNavigate('services')}
                className="group mt-4 flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#FF4800' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a2e')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FF4800')}
              >
                View case study
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SUBSCRIBE SECTION                                */}
      {/* ═══════════════════════════════════════════════ */}
      <SubscribeSection onNavigate={onNavigate} />

      {/* ═══════════════════════════════════════════════ */}
      {/* FINAL CTA BANNER                                 */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#f8f8fc' }}
      >
        {/* Subtle decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 72, 0, 0.06) 0%, transparent 60%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center lg:px-8"
        >
          <h2
            className="text-[56px] font-semibold text-[#1a1a2e] glow-text"
            style={{ fontWeight: 600 }}
          >
            Ready to modernize your enterprise?
          </h2>
          <p className="mt-4 text-[18px]" style={{ color: '#6b7280' }}>
            Let Straveda architect your path forward.
          </p>
          <MagneticButton>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-10 inline-flex items-center justify-center rounded-lg px-9 py-4 text-base font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cta-pulse btn-shine"
              style={{ background: '#FF4800' }}
            >
              Start a project
            </button>
          </MagneticButton>
          <p className="mt-5 text-[14px]" style={{ color: '#9ca3af' }}>
            Or email us at{' '}
            <a
              href="mailto:info@straveda.com"
              className="underline transition-colors duration-200 hover:opacity-80"
              style={{ color: '#FF4800' }}
            >
              info@straveda.com
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
}

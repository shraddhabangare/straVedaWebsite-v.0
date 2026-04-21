'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useScrollGradient } from '@/hooks/useScrollGradient';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Braces,
  Compass,

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
  Plus,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ParallaxShowcase from '@/components/straveda/ParallaxShowcase';
import AnimatedRingProgress from '@/components/straveda/AnimatedRingProgress';
import AnimatedHero from '@/components/straveda/AnimatedHero';
import SubscribeSection from '@/components/straveda/SubscribeSection';
import WaveDivider from '@/components/straveda/WaveDivider';

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
  {
    title: "Weekly Shipping, Not Quarterly Roadmaps",
    description: "One week sprints with public progress logs. You see builds every Friday, approve Monday, ship Tuesday. No black-box discovery phases that last three months.",
    size: "large", icon: Activity,
  },
  {
    title: "Automation-First, Always",
    description: "Before we build feature one, we audit what can be removed, integrated, or automated. Most agencies pad scope. We prune it then automate what's left.",
    size: "normal", icon: Brain,
  },
  {
    title: "You Own Everything",
    description: "Full code ownership. Complete documentation. Zero vendor lock in. If we disappear tomorrow, you can run and maintain every system we built. That's non-negotiable.",
    size: "normal", icon: Shield,
  },
  {
    title: "Priced to ROI in 60 Days",
    description: "Every proposal includes projected time savings, cost reduction, or revenue lift. If a system doesn't pay for itself in one quarter, we don't recommend building it.",
    size: "normal", icon: Globe,
  },
  {
    title: "One Team, End to End",
    description: "Strategy, AI engineering, design, and deployment under one roof. One Slack channel. One point of accountability. No vendor chains. No handoff loss.",
    size: "normal", icon: Cloud,
  },
  {
    title: "Senior Execution",
    description: "We cap engagements each quarter so we can ship fast and stay accountable. You get senior attention on every build not a deck from partners and delivery from juniors.",
    size: "normal", icon: Users,
  },
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
    <span ref={ref} className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 600, lineHeight: 1 }}>
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
    <span ref={ref} className="counter-display text-[#1a1a2e]" style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 700, lineHeight: 1 }}>
      {count}{suffix}
    </span>
  );
}

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
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
    <span ref={ref} className="counter-hover-gradient text-[clamp(18px,4vw,28px)] font-bold text-[#1a1a2e] dark:text-[#f0f0f5]">
      {count}{suffix}
    </span>
  );
}

const testimonials = [
  {
    name: 'Straveda Team',
    role: '2024',
    company: '',
    quote: 'We\'re early. Our first clients are live on Straveda systems. Case studies publish in Q2 2026 with their permission. Want to talk to a current client? Ask on the intro call we\'ll connect you.',
    stars: 5,
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase();
}

function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

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
          className="testimonial-chevron absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Card */}
        <div className="mx-4 sm:mx-12 w-full" style={{ maxWidth: '640px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              whileHover={{ scale: 1.01, boxShadow: isDark ? '0 0 50px rgba(255,72,0,0.08), 0 8px 32px rgba(0,0,0,0.3)' : '0 0 50px rgba(255,72,0,0.05), 0 8px 32px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.5, ease }}
              className="testimonial-card rounded-2xl p-8 md:p-10 cursor-default"
              style={{
                background: isDark
                  ? 'linear-gradient(145deg, #12121e 0%, #1a1a2e 50%, #12121e 100%)'
                  : 'linear-gradient(145deg, #FFFFFF 0%, #f8f8fc 50%, #FFFFFF 100%)',
                borderLeft: '3px solid #FF4800',
                boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Large quote mark */}
              <span
                className="mb-4 block leading-none"
                style={{ fontSize: 'clamp(36px, 8vw, 56px)', color: '#FF4800' }}
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
                className="testimonial-quote-text mb-8 text-[16px] sm:text-[20px] italic leading-[1.8]"
                style={{ color: isDark ? '#d1d5db' : '#1a1a2e' }}
              >
                {t.quote}
              </p>

              {/* Divider */}
              <div
                className="testimonial-divider mb-5 w-full"
                style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}
              />

              {/* Author row with avatar, name, role, and company */}
              <div className="flex items-center gap-4">
                {/* Avatar circle with initials */}
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #FF4800 0%, #2B2358 100%)',
                  }}
                >
                  <span className="text-[16px] font-bold" style={{ color: '#FFFFFF' }}>
                    {getInitials(t.name)}
                  </span>
                </div>

                {/* Name, role, and company */}
                <div className="flex flex-col">
                  <p className="testimonial-author-name text-[16px] font-semibold" style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}>
                    {t.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-[14px]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      {t.role}
                    </p>
                    <span className="testimonial-separator" style={{ color: isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db' }}>·</span>
                    {/* Company logo placeholder badge */}
                    <span
                      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider"
                      style={{
                        background: 'rgba(255,72,0,0.08)',
                        color: '#FF4800',
                      }}
                    >
                      {t.company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          className="testimonial-chevron absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
          style={{
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)')}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots indicator with active scale animation */}
      <div className="mt-8 flex items-center justify-center gap-3">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            className="flex items-center justify-center"
            style={{ width: '44px', height: '44px' }}
            aria-label={`Go to testimonial ${i + 1}`}
          >
            <motion.span
              className="rounded-full block"
              animate={{
                scale: i === currentIndex ? 1.4 : 1,
                background: i === currentIndex ? '#FF4800' : (isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db'),
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.5 }}
              style={{ width: '8px', height: '8px' }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

const faqs = [
  {
    question: 'What does a typical engagement cost?',
    answer: 'Engagements are designed for high-impact results, starting with focused automation builds like WhatsApp flows and email sequences. Comprehensive custom software and AI integrations are scaled to your specific operational needs. We provide fixed-price quotes after a discovery call eliminating hourly billing and preventing scope creep.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Most projects ship their first working deployment in 4–6 weeks.\n\n1. Discovery: 1 week.\n2. Build sprints: 2–4 weeks.\n3. Automation layering: 1–2 weeks.\n\nThen monthly optimization retainers if needed. We don\'t do 6-month black-box builds.',
  },
  {
    question: 'Do you work with our existing team?',
    answer: 'Yes. We integrate with your in-house developers, ops team, or IT partner. If you don\'t have technical capacity, we handle everything end-to-end. Either way, we document ruthlessly so knowledge doesn\'t live in our heads.',
  },
  {
    question: 'What makes Straveda different from other agencies?',
    answer: 'Three things: (1) We\'re priced for mid-market, not enterprise. (2) We ship weekly, not quarterly. (3) We automate before we build — most firms do the opposite. We also give you full code ownership and zero vendor lock-in.',
  },
  {
    question: 'Can you handle enterprise-scale deployments?',
    answer: 'We build for scale-ready architecture from day one — but we\'re sized for mid-market execution. If you\'re a 5,000+ person org with compliance/security layers that require multi-month audits, we\'ll refer you to a larger firm. If you\'re 50–500 people and need to move fast, we\'re the right call.',
  },
  {
    question: 'How do we get started?',
    answer: 'Book a 30 minute strategy call. We\'ll ask about your operations, biggest bottlenecks, and current stack. You\'ll walk away with a working hypothesis for what to automate first whether or not you hire us. If it\'s a fit, we send a proposal within 48 hours.',
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="section-faq"
      className="glow-hover py-24 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 text-center"
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>
            FREQUENTLY ASKED QUESTIONS
          </p>
          <div className="flex items-start gap-5 justify-center">
            <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
            <h2
                className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]"
                style={{ lineHeight: 1.0, letterSpacing: '-2.05px' }}
              >
                Questions? Here's what teams ask first.
              </h2>
          </div>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="overflow-hidden"
              style={{
                borderLeft: openIndex === index ? '3px solid #FF4800' : '3px solid transparent',
                transition: 'border-color 0.3s ease',
              }}
            >
              {/* Question */}
              <button
                data-magnetic
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-5 py-5 text-left transition-colors duration-200 border-b border-black/[0.06] dark:border-white/[0.06] hover:bg-[rgba(255,72,0,0.02)] dark:hover:bg-white/[0.03]"
                aria-expanded={openIndex === index}
              >
                <span
                  className="pr-4 text-[16px] font-medium text-[#1a1a2e] dark:text-[#e5e7eb]"
                  style={{ fontWeight: 500 }}
                >
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#FF4800] text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#6b7280] dark:text-[#9ca3af]'}`}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="px-5 pb-5 text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]"
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const heroScrolled = useScrollGradient(100);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const capScrollRef = useRef<HTMLDivElement>(null);
  const [capActiveIdx, setCapActiveIdx] = useState(0);

  const handleCapScroll = () => {
    const el = capScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / bentoItems.length;
    setCapActiveIdx(Math.round(el.scrollLeft / cardWidth));
  };

  const scrollCapTo = (i: number) => {
    const el = capScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / bentoItems.length;
    el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
  };


  return (
    <div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1A — ANIMATED WEBGL HERO (light theme) */}
      {/* ═══════════════════════════════════════════════ */}
      <div id="section-hero">
        <AnimatedHero onNavigate={onNavigate} />
      </div>


      {/* ═══════════════════════════════════════════════ */}
      {/* HONEST EARLY-STAGE PROOF STRIP                  */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.section
        id="section-partners"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        className="py-16 md:py-24 bg-white dark:bg-[#0a0a14] relative border-t border-black/[0.06] dark:border-white/[0.06]"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>
            Where we stand
          </p>
          <div className="flex items-start gap-5 justify-center">
            <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
           <h2
  className="font-normal heading-gradient"
  style={{ 
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
    lineHeight: 1.05, 
    letterSpacing: '-2px',
    whiteSpace: 'nowrap' // This forces the text onto one line
  }}
>
  A Strong Foundation for Scalable Growth.
</h2>
          </div>
          <p className="mt-4 text-[16px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto">
            Straveda launched in 2024. We take on a limited number of engagements each quarter so we can ship fast and stay accountable. Our current clients are in D2C, B2B SaaS, and professional services.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Fixed-price after discovery', icon: '✓' },
              { label: 'Weekly progress updates', icon: '✓' },
              { label: 'Full code ownership', icon: '✓' },
              { label: 'No long-term lock-in', icon: '✓' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: 'rgba(255,72,0,0.06)', border: '1px solid rgba(255,72,0,0.12)' }}
              >
                <span className="text-[13px] font-semibold" style={{ color: '#FF4800' }}>{item.icon}</span>
                <span className="text-[13px] font-medium text-[#6b7280] dark:text-[#9ca3af]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════ */}
      {/* TECHNOLOGY PARTNERS                              */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
        className="py-14 md:py-20 bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.06]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-start gap-5 mb-3">
              <div
                className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full"
                style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }}
              />
              <h2
                className="font-normal heading-gradient"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0, letterSpacing: '-2px' }}
              >
                Built on enterprise-grade infrastructure
              </h2>
            </div>
            <p className="text-[15px] leading-[1.65] text-[#6b7280] dark:text-[#9ca3af] max-w-lg lg:ml-6">
              We use proven, scalable technologies — not experimental tools. Your systems will be maintainable and upgradeable for years.
            </p>
            {/* Orange accent divider */}
            <div
              className="mt-6 h-px"
              style={{ width: 'min(340px, 50%)', background: 'linear-gradient(to right, #FF4800, rgba(255,72,0,0.15))' }}
            />
          </div>

          {/* Logo cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4"
          >
            {[
              { name: 'AWS',            brandColor: '#FF9900', src: '/logos/aws.png',        w: 80,  h: 40 },
              { name: 'Google Cloud',   brandColor: '#4285F4', src: '/logos/gcp.png',        w: 100, h: 40 },
              { name: 'Docker',         brandColor: '#2496ED', src: '/logos/docker.png',     w: 90,  h: 40 },
              { name: 'Microsoft Azure',brandColor: '#0078D4', src: '/logos/azure.png',      w: 90,  h: 40 },
              { name: 'Vercel',         brandColor: '#000000', src: '/logos/vercel.png',     w: 90,  h: 40 },
              { name: 'PostgreSQL',     brandColor: '#336791', src: '/logos/postgresql.jpg', w: 90,  h: 40 },
              { name: 'Next.js',        brandColor: '#000000', src: '/logos/nextjs.svg',     w: 90,  h: 40 },
            ].map((partner) => (
              <motion.div
                key={partner.name}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease }}
                className="group relative flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-6 overflow-hidden cursor-default"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#f4f4f8',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'}`,
                  transition: 'border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${partner.brandColor}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
                }}
              >
                {/* Brand-color glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"
                  style={{ backgroundColor: partner.brandColor }}
                />
                {/* Logo — grayscale by default, full color on hover */}
                <div className="relative flex items-center justify-center h-10 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image src={partner.src} alt={partner.name} width={partner.w} height={partner.h} className="object-contain max-h-10 w-auto" />
                </div>
                <span className="relative text-[11px] font-medium tracking-wide text-[#9ca3af] dark:text-[#6b7280]">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1B — SERVICES TEASER                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="section-services"
        className="py-12 md:py-24 section-glow-top relative bg-white dark:bg-[#0a0a14] border-t border-black/[0.06] dark:border-white/[0.08]"
      >
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 md:mb-16"
          >
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: '#FF4800' }}
            >
              WHAT WE BUILD
            </p>
            <div className="flex items-center gap-5">
              <div
                className="hidden lg:block flex-shrink-0 w-1 rounded-full"
                style={{ height: '36px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }}
              />
              <h2
                className="font-normal heading-gradient whitespace-nowrap"
                style={{ fontSize: 'clamp(1.2rem, 2.6vw, 2.5rem)', lineHeight: 1.0, letterSpacing: '-1.5px' }}
              >
                One Goal: Systems That Run Without You.
              </h2>
            </div>
          </motion.div>

          {/* Card Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-5"
          >
            {[
              
              {
                //icon: Braces,
                badge: 'AUTOMATION',
                title: 'AI & Business Automation',
                body: 'WhatsApp flows that qualify leads and close sales. Email sequences triggered by user behavior. AI agents that handle tier-1 support. Workflow automation that removes 30–60% of manual operations in the first quarter.',
                outcome: '30–60% of manual ops eliminated in 90 days.',
                cta: 'See automation services',
              },
              {
                //icon: Compass,
                badge: 'SOFTWARE',
                title: 'Custom Software & Systems',
                body: 'AI powered CRMs your team will actually use. Real time dashboards that replace five tab monitoring. Internal tools built around your workflow not rented from SaaS that bends your process.',
                outcome: 'One source of truth, 3–5 SaaS subscriptions cancelled.',
                cta: 'Explore custom builds',
              },
              {
                icon: Brain,
                badge: 'STRATEGY',
                title: 'AI Strategy & Integration',
                body: 'Deploy GPT-class models, vision APIs, and custom LLMs directly into your operations. We architect the integration, train the models, and wire them into your stack  so AI runs your workflows instead of sitting in a demo environment.',
                outcome: 'AI embedded in operations, not stuck in a demo.',
                cta: 'Talk AI strategy',
              },
              {
                //icon: Globe,
                badge: 'DIGITAL',
                title: 'Web Development & 3D Experiences',
                body: 'High Performance websites built on Next.js. 3D interactive experiences that separate premium brands from commodity players. Landing pages optimized for conversion, not just aesthetics. Sub-second loads, SEO Ready architecture, deployed to edge.',
                outcome: '2–4x lift on landing page conversion vs. template sites.',
                cta: 'View web capabilities',
              },
              {
                badge: 'DIGITAL & DESIGN',
                title: 'Brand & Experience Layer',
                body: 'UI/UX design that converts leads into clients. Engaging web design and product interfaces that connect with your audience. Cohesive digital and design strategy for high Performance systems.',
                outcome: 'Strategic digital and design layers. Integrated within 90 days.',
                cta: 'See design services',
              },
            ].map((card) => (
              <motion.div
                key={card.badge}
                variants={cardVariants}
                className="card-hover glow-border card-premium glass-card flex flex-col rounded-xl p-9 border-black/[0.06] dark:border-white/[0.08]"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
              >
                {/* Badge */}
                <span
                  className="mb-3 inline-block self-start rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest text-white whitespace-nowrap"
                  style={{ background: '#FF4800', letterSpacing: '0.08em' }}
                >
                  {card.badge}
                </span>

                {/* Title — wrapper enforces equal height across all cards */}
                <div className="mb-4" style={{ minHeight: '8rem' }}>
                  <h3
                    className="font-bold text-[#1a1a2e] dark:text-white"
                    style={{ fontSize: 'clamp(1.35rem, 2.8vw, 1.65rem)', lineHeight: 1.2, letterSpacing: '-0.5px' }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Divider 1 — calc width avoids overflow:hidden clipping from .card-premium */}
                <div className="mb-5 h-px bg-black/[0.07] dark:bg-white/[0.07]" style={{ width: 'calc(100% + 4.5rem)', marginLeft: '-2.25rem' }} />

                {/* Body — flex-1 fills available space so divider 2 always aligns */}
                <p className="flex-1 text-[14.5px] leading-[1.7]" style={{ color: '#6b7280' }}>
                  {card.body}
                </p>

                {/* Divider 2 */}
                <div className="mt-5 mb-5 h-px bg-black/[0.07] dark:bg-white/[0.07]" style={{ width: 'calc(100% + 4.5rem)', marginLeft: '-2.25rem' }} />

                {/* Outcome */}
                <p
                  className="mb-4 text-[12.5px] font-semibold leading-snug"
                  style={{ color: '#FF4800', letterSpacing: '0.01em' }}
                >
                  → {card.outcome}
                </p>

                {/* CTA */}
                <button
                  onClick={() => onNavigate('services')}
                  className="group flex w-full items-center gap-2.5 transition-colors duration-200"
                  onMouseEnter={(e) => {
                    const label = e.currentTarget.querySelector('.cta-label') as HTMLElement;
                    if (label) label.style.color = '#FF4800';
                  }}
                  onMouseLeave={(e) => {
                    const label = e.currentTarget.querySelector('.cta-label') as HTMLElement;
                    if (label) label.style.color = '#6b7280';
                  }}
                >
                  <span
                    className="cta-label flex-1 min-w-0 truncate text-[13px] font-medium tracking-wide transition-colors duration-200"
                    style={{ color: '#6b7280' }}
                  >
                    {card.cta}
                  </span>
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110"
                    style={{ background: '#FF4800' }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Wave divider — Services Teaser to Bento Grid */}
      <WaveDivider color={isDark ? '#12121e' : '#f8f8fc'} flip />

      {/* ═══════════════════════════════════════════════ */}
      {/* WHAT SETS US APART — CAPABILITY GRID             */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="section-capabilities" className="py-12 md:py-24 section-glow-top relative" style={{ background: isDark ? '#12121e' : '#f8f8fc' }}>
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 md:mb-16"
          >
            <p
              className="mb-5 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: '#FF4800' }}
            >
              WHY STRAVEDA
            </p>
            <div className="flex items-start gap-5">
              <div
                className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full"
                style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }}
              />
              <h2
                className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]"
                style={{ lineHeight: 1.0, letterSpacing: '-2.05px' }}
              >
                Enterprise-Grade Execution, Without the Complexity.
              </h2>
            </div>
          </motion.div>

          {/* Horizontal Scroll Track */}
          <div
            className="relative -mx-6 lg:-mx-8 overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            <motion.div
              ref={capScrollRef}
              onScroll={handleCapScroll}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex gap-5 overflow-x-auto pb-6 px-6 lg:px-8 no-scrollbar snap-x snap-mandatory"
            >
              {bentoItems.map((item) => (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  className="group relative flex-shrink-0 snap-center overflow-hidden rounded-2xl transition-all duration-300 cursor-default flex flex-col"
                  style={{
                    width: 'clamp(260px, 78vw, 440px)',
                    minHeight: '300px',
                    padding: 'clamp(24px, 5vw, 40px) clamp(20px, 4vw, 36px)',
                    background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                    boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,72,0,0.35)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,72,0,0.12), 0 2px 8px rgba(0,0,0,0.06)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    const iconWrap = e.currentTarget.querySelector('.cap-icon-wrap');
                    if (iconWrap) (iconWrap as HTMLElement).style.background = isDark ? 'rgba(255,72,0,0.2)' : 'rgba(255,72,0,0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
                    e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    const iconWrap = e.currentTarget.querySelector('.cap-icon-wrap');
                    if (iconWrap) (iconWrap as HTMLElement).style.background = isDark ? 'rgba(255,72,0,0.12)' : 'rgba(255,72,0,0.08)';
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(135deg, rgba(255,72,0,0.04) 0%, transparent 55%)' }}
                  />
                  <div
                    className="cap-icon-wrap mb-8 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300"
                    style={{ background: isDark ? 'rgba(255,72,0,0.12)' : 'rgba(255,72,0,0.08)' }}
                  >
                    <item.icon className="h-7 w-7" style={{ color: '#FF4800' }} />
                  </div>
                  <h3
                    className="mb-4 font-normal"
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', lineHeight: 1.15, letterSpacing: '-0.4px', color: isDark ? '#f0f0f5' : '#1a1a2e' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] flex-grow" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    {item.description}
                  </p>
                  <div
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                    style={{ background: 'linear-gradient(90deg, #FF4800, rgba(255,72,0,0.15))' }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {bentoItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollCapTo(i)}
                aria-label={`Go to card ${i + 1}`}
                className="transition-all duration-300 flex items-center justify-center"
                style={{
                  width: capActiveIdx === i ? '36px' : '8px',
                  height: capActiveIdx === i ? '36px' : '8px',
                  borderRadius: '50%',
                  border: capActiveIdx === i ? `1.5px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}` : 'none',
                  background: capActiveIdx === i ? 'transparent' : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.18)'),
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                {capActiveIdx === i && (
                  <div className="w-2 h-2 rounded-full" style={{ background: isDark ? '#f0f0f5' : '#1a1a2e' }} />
                )}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1C — ABOUT / STATS                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="section-about" className="relative py-12 md:py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]" >
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:gap-16 px-6 lg:flex-row lg:px-8 relative">
          {/* LEFT — 40% */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="flex w-full flex-col justify-center lg:w-[40%]" >
            <div
              className="flex flex-col gap-4 pl-5"
              style={{ borderLeft: '4px solid #FF4800' }}
            >
              <div>
                <div className="counter-hover-gradient inline-block"><Counter target={2024} suffix="" /></div>
                <p className="mt-1 text-[14px] text-[#6b7280] dark:text-[#9ca3af]">Year Founded</p>
              </div>
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(26px, 4.5vw, 45px)', fontWeight: 600, lineHeight: 1 }}>40%+</p>
                <p className="mt-1 text-[14px] text-[#6b7280] dark:text-[#9ca3af]">Manual Work Reduced</p>
              </div>
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(26px, 4.5vw, 45px)', fontWeight: 600, lineHeight: 1 }}>3–5x</p>
                <p className="mt-1 text-[14px] text-[#6b7280] dark:text-[#9ca3af]">Operational Efficiency</p>
              </div>
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(26px, 4.5vw, 45px)', fontWeight: 600, lineHeight: 1 }}>End-to-End</p>
                <p className="mt-1 text-[14px] text-[#6b7280] dark:text-[#9ca3af]">Strategy → Build → Deploy</p>
              </div>
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(26px, 4.5vw, 45px)', fontWeight: 600, lineHeight: 1 }}>4–6 Weeks</p>
                <p className="mt-1 text-[14px] text-[#6b7280] dark:text-[#9ca3af]">First System Live</p>
              </div>
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: 'clamp(26px, 4.5vw, 45px)', fontWeight: 600, lineHeight: 1 }}>100%</p>
                <p className="mt-1 text-[14px] text-[#6b7280] dark:text-[#9ca3af]">Code Ownership</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2"> <MapPin className="h-4 w-4" style={{ color: '#FF4800' }} /> <span className="text-[15px] text-[#6b7280] dark:text-[#9ca3af]">Pune, Maharashtra</span> </div>
          </motion.div>
          {/* RIGHT — 60% */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="flex w-full flex-col justify-center lg:w-[60%]" >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>WHO WE ARE</p>
            <div className="flex items-start gap-5 mb-6">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-1px' }}>We Get It. Because We've Lived It.</h2>
            </div>
            <p className="text-[18px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] text-justify hyphens-auto">
              Every growing company hits the same wall. Too many tools. Spreadsheets that don't sync. Your best people spending Friday afternoons doing work that 
              shouldn't exist. You don't need another vendor; you need someone who 
              actually understands the problem. We do. We've built companies. We've 
              watched smart founders lose momentum to operational drag. We've felt the 
              frustration of paying for five tools when you really need one well-designed 
              system that your team understands. That's why Straveda is different. 
              We're focused on one thing: building AI-powered systems that replace chaos 
              with structure. Not another platform. Not enterprise bloat. Just technology 
              that actually reduces complexity. We move fast. We're completely transparent. 
              And we measure success the only way that matters—by what changes in your 
              business: hours reclaimed, decisions accelerated, operations that scale 
              without proportional headcount growth.
            </p>
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />
      <FAQSection />

      {/* ═══════════════════════════════════════════════ */}
      {/* PROBLEM SECTION                                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-28 bg-[#f8f8fc] dark:bg-[#0a0a14] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>THE REAL PROBLEM</p>
            <div className="flex items-start gap-5 justify-center">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.05, letterSpacing: '-2px' }}>
                You&apos;re not short on software.<br />You&apos;re drowning in it.
              </h2>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { num: '01', heading: 'The Tool Tax', body: 'You\'re paying 6–14 SaaS subscriptions. Half overlap. None talk to each other. Your team spends 2 hours a day moving data between them manually.' },
              { num: '02', heading: 'The Integration Debt', body: 'Every new tool requires a Zapier hack. Every Zapier hack breaks monthly. IT says a "proper integration" is a 6-month project. So nothing gets built.' },
              { num: '03', heading: 'The Visibility Gap', body: 'Leadership can\'t see pipeline health, ops can\'t see inventory, and finance finds out about problems when it\'s already too late to course-correct.' },
            ].map((item) => (
              <div
                key={item.num}
                className="glass-card rounded-xl p-8"
                style={{ backdropFilter: 'blur(18px) saturate(1.6)', WebkitBackdropFilter: 'blur(18px) saturate(1.6)' }}
              >
                <p className="text-[40px] font-light mb-4" style={{ color: 'rgba(255,72,0,0.25)', lineHeight: 1 }}>{item.num}</p>
                <h3 className="text-[18px] font-medium mb-3 text-[#1a1a2e] dark:text-[#f0f0f5]">{item.heading}</h3>
                <p className="text-[15px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{item.body}</p>
              </div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-10 text-center text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-2xl mx-auto"
          >
            Straveda exists to fix this. We audit first, eliminate what&apos;s redundant, automate what remains, and build only what genuinely can&apos;t be bought off the shelf.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* PROCESS SECTION                                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-28" style={{ background: isDark ? '#12121e' : '#ffffff' }}>
        <div className="pointer-events-none absolute inset-0 dot-grid-dense" />
        <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="mb-12 md:mb-16"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>HOW WE WORK</p>
            <div className="flex items-start gap-5">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.05, letterSpacing: '-4px' }}>
                From Strategy call to Live System in 4-5 Weeks.
              </h2>
            </div>
          </motion.div>
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-6 left-6 right-6 h-px" style={{ background: 'linear-gradient(to right, #FF4800, rgba(255,72,0,0.1))' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { step: '1', label: 'Discovery', desc: '30-min call. We map your ops, find the biggest time sinks, and identify what to automate first. You leave with a working hypothesis — not a sales pitch.' },
                { step: '2', label: 'Architecture', desc: 'We spec the system, select the stack, and price the build. Fixed-price proposal within 48 hours. No hourly billing, no scope ambiguity.' },
                { step: '3', label: 'Build', desc: 'Weekly sprints. You see progress every Friday, approve Monday, feedback integrated Tuesday. No black-box development phases.' },
                { step: '4', label: 'Automate', desc: 'We wire in the automation layer — triggers, workflows, AI agents. The system starts running without human intervention before we hand over.' },
                { step: '5', label: 'Scale', desc: 'Full handover with documentation. Your team owns it. We\'re available for retainer support if you need us — but you won\'t need us to operate it.' },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: parseInt(item.step) * 0.08, ease }}
                  className="flex flex-col"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white text-[14px] font-semibold flex-shrink-0 relative z-10"
                    style={{ background: '#FF4800' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-[16px] font-semibold mb-2 text-[#1a1a2e] dark:text-[#f0f0f5]">{item.label}</h3>
                  <p className="text-[14px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* PRICING SECTION                                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-28 bg-[#f8f8fc] dark:bg-[#0a0a14] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
        <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>PRICING</p>
            <div className="flex items-start gap-5 justify-center">
              <div className="mt-2 hidden lg:block flex-shrink-0 w-1 rounded-full" style={{ height: '52px', background: 'linear-gradient(180deg, #FF4800 0%, rgba(255,72,0,0.15) 100%)' }} />
              <h2 className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]" style={{ lineHeight: 1.05, letterSpacing: '-2px' }}>
                Flexible Engagement Models
              </h2>
            </div>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af] max-w-xl mx-auto">
              Tailored systems built around your business goals not predefined packages.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'Focused Automation Builds',
                coreValue: 'Streamline specific workflows and significantly reduce manual effort.',
                keyServices: 'WhatsApp automation, lead flows, and process optimization.',
                bestFor: 'Solving high-impact operational bottlenecks with precision.',
                items: ['One custom automation workflow', 'Seamless integration into your existing tech stack', 'Comprehensive documentation and structured handover'],
                timeline: 'First deployment completed within 4 weeks.',
                cta: 'Start here',
                highlight: false,
              },
              {
                tier: 'Custom Software & AI Systems',
                coreValue: 'Build scalable, business-specific digital infrastructure.',
                keyServices: 'AI workflows, internal dashboards, and full-scale platform development.',
                bestFor: 'Long-term performance, high adaptability, and specialized technical needs.',
                items: ['End-to-end custom software architecture', 'Bespoke AI system integration', 'Scalable codebase with full ownership'],
                timeline: 'Custom milestones based on project scope.',
                cta: 'Book a call',
                highlight: true,
              },
              {
                tier: 'Ongoing Optimization & Scale',
                coreValue: 'Continuously improve and expand existing systems to stay ahead.',
                keyServices: 'Feature enhancements, third-party integrations, and performance upgrades.',
                bestFor: 'Supporting businesses in active growth phases that require evolving tech.',
                items: ['Regular system health checks and monitoring', 'Priority deployment of new features', 'Iterative workflow refinements and scaling support'],
                timeline: 'Ongoing monthly partnership.',
                cta: 'Book a call',
                highlight: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease }}
                className={`rounded-xl p-8 border flex flex-col ${plan.highlight ? 'border-[#FF4800]/40' : 'border-black/[0.06] dark:border-white/[0.08]'}`}
                style={{
                  background: plan.highlight
                    ? isDark ? 'rgba(255,72,0,0.08)' : 'rgba(255,72,0,0.04)'
                    : isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.68)',
                  backdropFilter: 'blur(18px) saturate(1.6)',
                  WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
                  boxShadow: plan.highlight ? '0 8px 32px rgba(255,72,0,0.12), inset 0 1px 0 rgba(255,72,0,0.1)' : '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                {plan.highlight && (
                  <span className="inline-block mb-4 self-start rounded-full px-3 py-1 text-[10px] font-medium text-white" style={{ background: '#FF4800' }}>
                    Most Popular
                  </span>
                )}
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 text-[#FF4800]">{plan.tier}</p>
                <p className="text-[15px] font-medium leading-[1.5] mb-5 text-[#1a1a2e] dark:text-[#f0f0f5]">{plan.coreValue}</p>
                <div className="flex flex-col gap-3 mb-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#6b7280] dark:text-[#9ca3af]">Key Services</p>
                    <p className="text-[13px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{plan.keyServices}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mb-1 text-[#6b7280] dark:text-[#9ca3af]">Best For</p>
                    <p className="text-[13px] leading-[1.6] text-[#6b7280] dark:text-[#9ca3af]">{plan.bestFor}</p>
                  </div>
                </div>
                <div className="border-t border-black/[0.06] dark:border-white/[0.08] pt-4 mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider mb-3 text-[#6b7280] dark:text-[#9ca3af]">Deliverables</p>
                  <ul className="flex flex-col gap-2 flex-1">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] text-[#6b7280] dark:text-[#9ca3af]">
                        <span className="mt-1 flex-shrink-0 text-[10px]" style={{ color: '#FF4800' }}>●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9ca3af]">Timeline:</span>
                  <span className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">{plan.timeline}</span>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full rounded-lg py-3 text-[14px] font-medium transition-all duration-200 mt-auto"
                  style={{
                    background: plan.highlight ? '#FF4800' : 'transparent',
                    color: plan.highlight ? '#ffffff' : '#FF4800',
                    border: plan.highlight ? 'none' : '1px solid rgba(255,72,0,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.highlight) {
                      e.currentTarget.style.background = 'rgba(255,72,0,0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlight) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-[13px] text-[#9ca3af]">
            All engagements include full source code ownership and zero vendor lock-in. Fixed-price quote after a 30-min discovery call.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CLOSING CTA                                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: isDark ? '#12121e' : '#1a1a2e' }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,72,0,0.12) 0%, transparent 70%)' }}
        />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}>GET STARTED</p>
            <h2 className="text-white font-normal text-[clamp(2rem,5vw,3.75rem)] mb-6" style={{ lineHeight: 1.05, letterSpacing: '-2px' }}>
              Stop paying a monthly tax on manual work.
            </h2>
            <p className="text-[17px] leading-[1.6] mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Book a 30-minute strategy call. You&apos;ll walk away with a working hypothesis for what to automate first. If it&apos;s a fit, we send a proposal within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('contact')}
                className="glow-hover flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] font-medium text-white shadow-lg shadow-orange-500/20"
                style={{ background: '#FF4800' }}
              >
                Book a 30-min working call
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <button
                onClick={() => onNavigate('services')}
                className="flex items-center gap-2 rounded-lg px-8 py-4 text-[15px] transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                See how we work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <SubscribeSection />
    </div>
  );
}
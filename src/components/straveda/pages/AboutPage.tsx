'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useMotionTemplate, useAnimationFrame } from 'framer-motion';
import { Diamond, Hexagon, ShieldCheck } from 'lucide-react';
import TextReveal from '@/components/straveda/TextReveal';
import { useScrollGradient } from '@/hooks/useScrollGradient';
import TeamShowcase, { type TeamMember } from '@/components/ui/team-showcase';

/* ------------------------------------------------------------------ */
/*  GridBackground — reusable infinite grid helper                     */
/* ------------------------------------------------------------------ */

function GridBackground({ className = '', interactive = false, patternId = 'grid-bg' }: { className?: string; interactive?: boolean; patternId?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} onMouseMove={interactive ? handleMouseMove : undefined}>
      <svg className="w-full h-full">
        <defs>
          <motion.pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse" x={gridOffsetX} y={gridOffsetY}>
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#1a1a2e] dark:text-[#3a3a5e]" />
          </motion.pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      {interactive && (
        <motion.div className="absolute inset-0 opacity-40" style={{ maskImage, WebkitMaskImage: maskImage }}>
          <svg className="w-full h-full">
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ease = [0.4, 0, 0.2, 1] as const;

const expertiseTags = [
  'AI & Automation',
  'Custom Software',
  'WhatsApp Automation',
  'AI-Powered CRMs',
  'LLM Integration',
  'Workflow Automation',
  'Next.js Development',
  'Business Intelligence',
  'API Integrations',
];

const valueCards = [
  {
    icon: <Diamond size={40} className="text-[#FF4800]" />,
    title: 'Automation First',
    body: 'Before we build feature one, we ask: "What can we eliminate?" Most agencies sell scope. We prune it — then automate what\'s left.',
  },
  {
    icon: <Hexagon size={40} className="text-[#FF4800]" />,
    title: 'You Own Everything',
    body: 'Full code ownership. Complete documentation. Zero vendor lock-in. If we disappear tomorrow, your team runs the system independently.',
  },
  {
    icon: <ShieldCheck size={40} className="text-[#FF4800]" />,
    title: 'Priced for ROI',
    body: 'Every system we build includes a projected ROI. If a project doesn\'t pay for itself in 90 days, we don\'t recommend building it.',
  },
];

const stats = [
  { value: 2024, suffix: '', label: 'Founded' },
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 88, suffix: '%', label: 'Client Retention' },
  { value: 5, suffix: 'L+', label: 'Starting Price' },
];

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const heroScrolled = useScrollGradient(100);
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-white dark:bg-[#0a0a14] px-6 text-center overflow-hidden">
      <GridBackground className="opacity-[0.03]" patternId="grid-hero" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-4 flex flex-col items-center"
      >
        <span className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]">
          Our Story
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease }}
          style={{ transformOrigin: 'left center' }}
          className="mt-2 h-[3px] w-12 bg-[#FF4800]"
        />
      </motion.div>

      <h1 className={`mt-4 max-w-5xl text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.0] tracking-tight transition-all ${heroScrolled ? 'text-gradient-brand' : 'text-[#1a1a2e] dark:text-[#f0f0f5]'}`}
        style={{ transitionDuration: '0.6s' }}
      >
        <TextReveal delay={0.3} stagger={0.04}>We Get It. Because We&apos;ve Lived It.</TextReveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-6 max-w-2xl text-lg text-[#6b7280] dark:text-[#d1d5db] sm:text-[20px]"
      >
        A small team of operators and builders who&apos;ve been through the chaos of scaling. We build systems that eliminate it.
      </motion.p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Mission Section                                                    */
/* ------------------------------------------------------------------ */

function MissionSection() {
  return (
    <section className="bg-[#f8f8fc] dark:bg-[#0a0a14] px-6 py-24 lg:py-28 relative section-glow-bottom">
      {/* Subtle decorative accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255, 72, 0, 0.03) 0%, transparent 70%)' }} />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-20 relative z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start gap-3 lg:w-2/5"
        >
          <span className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-tight text-[#1a1a2e]/80 dark:text-[#f0f0f5]/80">
            2024
          </span>
          <span className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Founded in Nashik, Maharashtra</span>
          <div className="mt-1 h-[3px] w-8 bg-[#FF4800]" />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col gap-5 lg:w-3/5"
        >
          <span className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]">
            Our Mission
          </span>
          <p className="text-[clamp(1rem,2vw,1.375rem)] leading-[1.5] text-[#1a1a2e] dark:text-[#d1d5db]" style={{ lineHeight: 1.7 }}>
            To build AI-powered systems and custom software that replace operational chaos with structure — for growing mid-market companies in India who need to move fast.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Values Section                                                     */
/* ------------------------------------------------------------------ */

function ValuesSection() {
  return (
    <section className="relative bg-white dark:bg-[#0a0a14] px-6 py-24 section-glow-top overflow-hidden">
      <GridBackground className="opacity-[0.03]" patternId="grid-values" />
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}
          >
            What We Stand For
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-normal heading-gradient"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-2.05px' }}
          >
            Our core values.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-[#6b7280] dark:text-[#d1d5db]"
          >
            The principles that guide every engagement and every decision.
          </motion.p>
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {valueCards.map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease },
                },
              }}
              whileHover={{ y: -4 }}
              className="card-premium flex flex-col items-start gap-5 rounded-2xl bg-white dark:bg-white/[0.03] p-6 md:p-8"
            >
              {/* Icon with gradient background container */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,72,0,0.12), rgba(255,72,0,0.04))',
                }}
              >
                {card.icon}
              </div>
              <h4 className="text-lg font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">{card.title}</h4>
              <p className="text-sm leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Team Section — TeamShowcase                                        */
/* ------------------------------------------------------------------ */

const stravedaTeam: TeamMember[] = [
  { id: '1', name: 'Dhiraj Harshe', role: 'Founder & CEO', image: '', social: { linkedin: 'https://linkedin.com/company/straveda' } },
];

function TeamSection() {
  return (
    <section className="relative bg-white dark:bg-[#0a0a14] px-6 py-24">
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,72,0,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}
          >
            THE TEAM
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-normal heading-gradient"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-2.05px' }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-[16px] text-[#6b7280] dark:text-[#d1d5db]"
          >
            Decades of combined enterprise experience. One shared commitment to excellence.
          </motion.p>
        </div>

        {/* TeamShowcase Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          <TeamShowcase members={stravedaTeam} />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Strip                                                        */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
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
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

function StatsStrip() {
  return (
    <section className="bg-[#f8f8fc] dark:bg-[#0a0a14] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center sm:flex-1 rounded-xl px-4 py-3">
            <div className="flex w-full items-center justify-center sm:flex-col">
              <div className="flex flex-col items-center px-4 sm:px-2">
                <span className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none text-[#1a1a2e] dark:text-[#f0f0f5]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-[13px] text-[#6b7280] dark:text-[#9ca3af]">{stat.label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden h-16 w-[2px] bg-[#FF4800] sm:block" />
              )}
            </div>
            {i < stats.length - 1 && (
              <div className="h-[1px] w-16 bg-[#FF4800] sm:hidden" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Expertise Tags Section                                             */
/* ------------------------------------------------------------------ */

function ExpertiseSection() {
  return (
    <section className="bg-white dark:bg-[#0a0a14] px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}
        >
          Our Expertise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-4 font-normal heading-gradient"
          style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-2.05px' }}
        >
          Deep knowledge across every enterprise layer.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mb-12 max-w-2xl text-base text-[#6b7280] dark:text-[#d1d5db]"
        >
          Our team brings decades of combined experience across the enterprise technology stack.
        </motion.p>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {expertiseTags.map((tag, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="cursor-default rounded-full border border-[#e5e7eb] dark:border-white/[0.06] px-4 py-2 text-sm text-[#6b7280] dark:text-[#9ca3af] transition-colors duration-200 hover:border-[#FF4800] hover:text-[#FF4800]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Core Competencies — Animated Skill Bars Section                    */
/* ------------------------------------------------------------------ */

const coreCompetencies = [
  { label: 'AI & Workflow Automation', percentage: 95 },
  { label: 'Custom Software Development', percentage: 92 },
  { label: 'WhatsApp & Email Automation', percentage: 90 },
  { label: 'AI Strategy & LLM Integration', percentage: 88 },
  { label: 'Next.js & Web Development', percentage: 93 },
  { label: 'System Architecture & APIs', percentage: 91 },
];

function AnimatedPercentage({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
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

  return <span ref={ref}>{count}%</span>;
}

function CoreCompetenciesSection() {
  return (
    <section className="relative px-6 py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}
          >
            Core Competencies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-normal heading-gradient"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-2.05px' }}
          >
            Measurable expertise across the stack.
          </motion.h2>
        </div>

        {/* Skill Bars */}
        <div className="space-y-8">
          {coreCompetencies.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              {/* Label Row */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[16px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">{skill.label}</span>
                <span className="text-[16px] font-semibold" style={{ color: '#FF4800' }}>
                  <AnimatedPercentage target={skill.percentage} />
                </span>
              </div>

              {/* Track */}
              <div
                className="skill-bar-track h-2 w-full rounded-full"
                style={{ background: 'rgba(0,0,0,0.06)' }}
              >
                {/* Fill Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease }}
                  className="h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #FF4800, #ff6b33)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Our Journey — Timeline Section                                     */
/* ------------------------------------------------------------------ */

const milestones = [
  { year: '2024', title: 'Founded', description: 'Straveda Tech founded in Nashik, Maharashtra. First clients onboarded in D2C, B2B SaaS, and professional services.' },
  { year: '2025', title: 'First Deployments Live', description: 'WhatsApp automation, custom CRMs, and AI workflows shipped to first cohort of mid-market clients.' },
  { year: '2025', title: 'Case Studies', description: 'Client case studies and measurable outcomes to be published Q2 2026 with client permission.' },
  { year: '2026', title: 'Expanding Reach', description: 'Growing presence across India and Southeast Asia. Taking on a limited number of engagements per quarter.' },
];

function TimelineSection() {
  return (
    <section className="relative bg-[#f8f8fc] dark:bg-[#0a0a14] px-6 py-24">
      <div className="relative mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 text-[11px] font-medium uppercase tracking-widest" style={{ color: '#FF4800' }}
          >
            OUR JOURNEY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-normal heading-gradient"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-2.05px' }}
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-[#6b7280] dark:text-[#d1d5db]"
          >
            Key milestones that have defined our growth and commitment to excellence.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease }}
            className="absolute top-0 bottom-0 left-[24px] w-[3px] origin-top"
            style={{ background: 'linear-gradient(180deg, #FF4800, #ff6b33)' }}
          />

          {/* Milestones */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-10 lg:space-y-14"
          >
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease },
                  },
                }}
                className="relative flex gap-6 lg:gap-8"
              >
                {/* Year Badge — orange circle on timeline */}
                <div className="relative z-10 flex flex-shrink-0 items-start pt-1">
                  <div
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-full text-[15px] font-bold text-white shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #FF4800, #d93d00)',
                      boxShadow: '0 4px 12px rgba(255, 72, 0, 0.3)',
                    }}
                  >
                    {milestone.year.slice(-2)}
                  </div>
                </div>

                {/* Content Card */}
                <div className="card-premium flex-1 rounded-2xl bg-white dark:bg-white/[0.03] p-6 lg:p-8">
                  <span className="text-[20px] font-bold text-[#FF4800]">{milestone.year}</span>
                  <h3 className="mt-1 text-[18px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Partners & Certifications Section                                  */
/* ------------------------------------------------------------------ */

const partners = [
  {
    name: 'Amazon Web Services',
    level: 'Cloud Infrastructure',
    bg: 'from-[#FF9900]/10 to-[#FF9900]/5',
    border: '#FF9900',
    svg: (
      <svg viewBox="0 0 304 182" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-auto">
        <path d="M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4-1.4-1.5-2.6-3.1-3.6-4.7-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5 4.9-1.3 10.1-1.9 15.6-1.9 11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4zm-40.6 15.2c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4.9-5.3.9-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.6 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.9 11.1c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l18.1 71.4 16.8-71.4c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l17 72.4L203 9.5c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-23.5 75.6c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L159 18.2l-16.8 69.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm119.1 2.5c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2l-14.5-4.5c-7.3-2.3-12.7-5.7-16.1-10.2-3.4-4.4-5.1-9.3-5.1-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2 1-13.4 2.9-3.2 1.9-4.8 4.8-4.8 8.8 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.4 8.8-3.2 2.5-7 4.3-11.4 5.6-4.6 1.4-9.5 2.1-14.7 2.1z" fill="#FF9900"/>
        <path d="M273.5 142.6c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z" fill="#FF9900"/>
        <path d="M287.2 127c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.1 8.7-37.5z" fill="#FF9900"/>
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    level: 'AI Partner',
    bg: 'from-[#10a37f]/10 to-[#10a37f]/5',
    border: '#10a37f',
    svg: (
      <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        <path d="M297.5 133.6a80.2 80.2 0 0 0-6.9-65.8 81.1 81.1 0 0 0-87.2-38.9A80.2 80.2 0 0 0 143 7.8a81.1 81.1 0 0 0-77.3 56.2 80.2 80.2 0 0 0-53.6 38.9 81.1 81.1 0 0 0 10 95.5 80.2 80.2 0 0 0 6.9 65.8 81.1 81.1 0 0 0 87.2 38.9 80.2 80.2 0 0 0 60.4 21.1 81.1 81.1 0 0 0 77.3-56.2 80.2 80.2 0 0 0 53.6-38.9 81.1 81.1 0 0 0-10-95.5zm-120.2 168.4a60.1 60.1 0 0 1-38.6-14c.5-.3 1.3-.7 1.8-1l64-37 3.3-1.9V160l26.5 15.3v74.8a60.3 60.3 0 0 1-57 52zm-128.9-55.5a60.1 60.1 0 0 1-7.2-40.3c.5.3 1.2.7 1.8 1l64 37 3.3 1.9 .1.1 27.5-15.9-.1-30.6L104.7 184l-.1.1A60.3 60.3 0 0 1 48.4 246.5zm-16.9-139.8a60 60 0 0 1 31.4-26.4V158a6 6 0 0 0 3 5.2l63.8 36.8-27.5 15.9-62.7-36.2a60.3 60.3 0 0 1-8-72.9zm221.3 51.6L215 121.5l27.5-15.9 62.8 36.2a60.2 60.2 0 0 1-9.3 108.5V172a6 6 0 0 0-3-5.2l.1-.1zM239 145.1l-27.5-15.9V97.6l.1-62.1a60.2 60.2 0 0 1 39.2 92l-3.2-1.9-64.1-37V89l-27.5 15.9L128.5 89V52.2l.1-.1a60.2 60.2 0 0 1 92.2 51.5v.4l18.2 10.5zm-133.3 35l-27.5-15.9.1-31.8 64.1-37 3.3-1.9V63.4l-27.5-15.9V47l-.2.1A60.2 60.2 0 0 1 81 158.6l27.5-15.9.3.1.1-31.7-3.2-1.8z" fill="#10a37f"/>
      </svg>
    ),
  },
  {
    name: 'Microsoft Azure',
    level: 'Cloud Partner',
    bg: 'from-[#0078D4]/10 to-[#0078D4]/5',
    border: '#0078D4',
    svg: (
      <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        <defs>
          <linearGradient id="az1" x1="-.7" y1="58.4" x2="52.9" y2="-7.9" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#114a8b"/>
            <stop offset="1" stopColor="#0669bc"/>
          </linearGradient>
          <linearGradient id="az2" x1="37.5" y1="44.5" x2="25.3" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopOpacity=".3"/>
            <stop offset=".071" stopOpacity=".2"/>
            <stop offset=".321" stopOpacity=".1"/>
            <stop offset=".623" stopOpacity=".05"/>
            <stop offset="1" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="az3" x1="-.7" y1="44.5" x2="96" y2="44.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3ccbf4"/>
            <stop offset="1" stopColor="#2892df"/>
          </linearGradient>
        </defs>
        <path d="M33.3 6h27.8L30.6 90.1a4.4 4.4 0 0 1-4.2 3H6a4.4 4.4 0 0 1-4.2-5.7L27.1 9A4.4 4.4 0 0 1 33.3 6z" fill="url(#az1)"/>
        <path d="M68.8 61.2H30.3a2 2 0 0 0-1.4 3.5l24.8 23.2a4.4 4.4 0 0 0 3 1.2H80z" fill="url(#az3)"/>
        <path d="M33.3 6a4.4 4.4 0 0 0-4.2 3.1L1.9 87.4A4.4 4.4 0 0 0 6.1 93h20.7a4.7 4.7 0 0 0 3.6-3.1l5-14.8 17.8 16.6a4.5 4.5 0 0 0 2.8 1H80L68.8 61.2l-35.7.1L56.5 6z" fill="url(#az2)"/>
        <path d="M68.9 9a4.4 4.4 0 0 0-4.2-3H33.5a4.4 4.4 0 0 1 4.2 3L62.9 87.4a4.4 4.4 0 0 1-4.2 5.7h31.2A4.4 4.4 0 0 0 94.1 87z" fill="url(#az3)"/>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    level: 'Deployment Platform',
    bg: 'from-[#171717]/10 to-[#171717]/5',
    border: '#525252',
    svg: (
      <svg viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-auto">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" className="text-[#171717] dark:text-white"/>
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    level: 'Cloud Infrastructure',
    bg: 'from-[#4285F4]/10 to-[#34A853]/5',
    border: '#4285F4',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20">
        <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0C1.317 10.383 0 12.755 0 15.13c0 3.808 3.098 6.592 6.781 6.592H17.54c3.087 0 5.907-1.593 6.907-4.7a7.015 7.015 0 0 0-2.437-7.983l-.005.005a9.278 9.278 0 0 0-9.815-6.654z" fill="#4285F4"/>
        <path d="M12.19 2.38a9.344 9.344 0 0 1 9.815 6.654c.005-.004 0 0 .005-.005.67.498 1.255 1.094 1.746 1.764a9.344 9.344 0 0 0-1.746-1.764C20.52 4.33 16.66 2.38 12.19 2.38z" fill="#4285F4"/>
        <path d="M21.937 10.793a7.015 7.015 0 0 1 2.437 7.983c-1 3.107-3.82 4.7-6.907 4.7H6.781C3.098 23.476 0 20.692 0 16.884c0-2.375 1.317-4.747 2.956-5.852-.055.013.053-.02 0 0a9.344 9.344 0 0 1 9.234-6.893c4.47 0 8.33 1.95 10.52 5.849-.49-.67-1.076-1.266-1.746-1.764l-.027.569z" fill="#AECBFA"/>
        <path d="M17.155 8.043C15.625 5.01 12.8 3.43 9.45 3.43c-4.75 0-8.597 3.837-8.597 8.572 0 1.307.3 2.548.833 3.65C2.73 11.47 6.46 8.78 10.956 8.78c2.178 0 4.203.67 5.87 1.82-.21-.867-.45-1.71-.67-2.557z" fill="#669DF6"/>
        <path d="M6.39 19.122l1.553-4.789 3.928 3.926-5.48.863z" fill="#1A73E8"/>
        <path d="M6.781 23.476H17.54c3.087 0 5.907-1.593 6.907-4.7a7.015 7.015 0 0 0-2.437-7.983l-.027.569-4.444 3.79-2.59 1.3-7.19-.458-1.553 4.789-1.28 2.76c.274-.042.552-.067.855-.067z" fill="#4285F4"/>
        <path d="M12.19 6.76c-1.48 0-2.868.386-4.07 1.063L11.949 11.6l4.877-4.154A8.286 8.286 0 0 0 12.19 6.76z" fill="#FBBC04"/>
        <path d="M8.12 7.823A8.23 8.23 0 0 0 3.954 12.9l5.067 4.43 2.928-5.73-3.829-3.777z" fill="#34A853"/>
        <path d="M11.949 11.6L8.12 7.823a8.284 8.284 0 0 0-4.166 5.077l5.067 4.43L11.949 11.6z" fill="#34A853"/>
        <path d="M9.021 17.33l2.928-5.73 4.877 1.792-2.59 1.3-5.215 2.638z" fill="#EA4335"/>
        <path d="M16.826 7.446l-4.877 4.154 1.887 4.922 4.444-3.79c-.455-1.93-1.454-3.7-1.454-5.286z" fill="#1A73E8"/>
      </svg>
    ),
  },
  {
    name: 'Anthropic',
    level: 'AI Research Partner',
    bg: 'from-[#D97757]/10 to-[#D97757]/5',
    border: '#D97757',
    svg: (
      <svg viewBox="0 0 66 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-auto">
        <path d="M37.532 0.941177H42.2174L50.3297 17.0588H45.5173L43.9297 13.6471H35.7891L34.2015 17.0588H29.4915L37.532 0.941177ZM42.4173 10.1765L39.8726 4.64706L37.3279 10.1765H42.4173Z" fill="#D97757"/>
        <path d="M51.0508 0.941177H55.6338V17.0588H51.0508V0.941177Z" fill="#D97757"/>
        <path d="M0 0.941177H4.68314L8.85897 8.76471L13.0348 0.941177H17.7179L11.0507 12.8824V17.0588H6.66721V12.8824L0 0.941177Z" fill="#D97757"/>
        <path d="M17.1484 0.941177H21.8316L25.9559 8.76471L30.0801 0.941177H34.7632L28.096 12.8824V17.0588H23.7124V12.8824L17.1484 0.941177Z" fill="#D97757"/>
        <path d="M57.0234 0.941177H61.6065V17.0588H57.0234V0.941177Z" fill="#D97757"/>
        <path d="M63.0508 0.941177H65.1172V17.0588H63.0508V0.941177Z" fill="#D97757"/>
      </svg>
    ),
  },
];

const certifications = [
  'AI Automation & Workflow Systems',
  'Custom Software Development',
  'Next.js & Edge Deployment',
];

function PartnersSection() {
  const [paused, setPaused] = useState(false);
  const track = [...partners, ...partners]; // duplicate for seamless loop

  return (
    <section className="relative bg-[#f8f8fc] dark:bg-[#0a0a14] py-24 lg:py-28 overflow-hidden">
      <GridBackground interactive className="opacity-[0.05]" patternId="grid-partners" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 72, 0, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: '#FF4800' }}
          >
            PARTNERS &amp; CERTIFICATIONS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-normal heading-gradient"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.0, letterSpacing: '-2.05px' }}
          >
            Technology partners we trust.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-5 max-w-xl text-base text-[#6b7280] dark:text-[#9ca3af]"
          >
            The infrastructure and AI platforms powering every project we ship.
          </motion.p>
        </div>
      </div>

      {/* Infinite scrolling marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#f8f8fc] dark:from-[#0a0a14] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#f8f8fc] dark:from-[#0a0a14] to-transparent" />

        <div
          className="flex gap-6 w-max"
          style={{
            animation: `marquee-scroll 28s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {track.map((partner, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative flex flex-col items-center justify-between rounded-2xl p-7 w-[260px] shrink-0 cursor-default select-none overflow-hidden"
              style={{
                background: `linear-gradient(135deg, white 60%, color-mix(in srgb, ${partner.border} 8%, white))`,
                border: `1.5px solid color-mix(in srgb, ${partner.border} 20%, transparent)`,
                boxShadow: `0 4px 24px -4px color-mix(in srgb, ${partner.border} 15%, transparent), 0 1px 4px rgba(0,0,0,0.06)`,
              }}
            >
              {/* Top glow bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${partner.border}, transparent)` }}
              />

              {/* Logo area */}
              <div className="flex items-center justify-center h-20 w-full mb-4">
                {partner.svg}
              </div>

              {/* Name + level */}
              <div className="text-center">
                <p className="text-[15px] font-semibold text-[#1a1a2e] leading-tight">{partner.name}</p>
                <p
                  className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: partner.border }}
                >
                  {partner.level}
                </p>
              </div>

              {/* Corner glow */}
              <div
                className="pointer-events-none absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-20 blur-2xl"
                style={{ background: partner.border }}
              />
            </motion.div>
          ))}
        </div>

        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </motion.div>

      {/* Certifications row */}
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#FF4800]/30 bg-[#FF4800]/5 px-5 py-2 text-sm text-[#FF4800]"
            >
              <ShieldCheck size={16} className="shrink-0" />
              <span>{cert}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About Page — Main Export                                           */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a14]">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <StatsStrip />
      <ExpertiseSection />
      <CoreCompetenciesSection />
      <TimelineSection />
      <PartnersSection />
    </main>
  );
}

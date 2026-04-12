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
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#1a1a2e]" />
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
  'Enterprise Architecture',
  'Red Hat Middleware',
  'Technology Strategy',
  'Program Management',
  'Agile Delivery',
  'Cloud Strategy',
  'Virtualization',
  'Digital Transformation',
  'Open Standards',
];

const valueCards = [
  {
    icon: <Diamond size={40} className="text-[#FF4800]" />,
    title: 'Exceptional Value',
    body: 'Every engagement is measured by business impact. We deliver results that compound over time.',
  },
  {
    icon: <Hexagon size={40} className="text-[#FF4800]" />,
    title: 'Open Standards',
    body: 'We architect on proven, open technologies that avoid vendor lock-in and reduce long-term total cost of ownership.',
  },
  {
    icon: <ShieldCheck size={40} className="text-[#FF4800]" />,
    title: 'Customer Guarantee',
    body: "We don't walk away until the job is done right. Customer satisfaction is built into every milestone.",
  },
];

const stats = [
  { value: 14, suffix: '+', label: 'Years Active' },
  { value: 7, suffix: '', label: 'Experts' },
  { value: 100, suffix: '%', label: 'Customer Sat.' },
  { value: 2010, suffix: '', label: 'Founded' },
];

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const heroScrolled = useScrollGradient(100);
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 text-center overflow-hidden">
      <GridBackground className="opacity-[0.03]" patternId="grid-hero" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-4 flex flex-col items-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]">
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

      <h1 className={`mt-4 max-w-5xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight transition-all ${heroScrolled ? 'text-gradient-brand' : 'text-[#1a1a2e]'}`}
        style={{ transitionDuration: '0.6s' }}
      >
        <TextReveal delay={0.3} stagger={0.04}>Building tomorrow&apos;s enterprise, one solution at a time.</TextReveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-6 max-w-2xl text-lg text-[#6b7280] sm:text-[20px]"
      >
        Since 2010, Straveda has been at the intersection of technology strategy and enterprise delivery — Plano, TX.
      </motion.p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Mission Section                                                    */
/* ------------------------------------------------------------------ */

function MissionSection() {
  return (
    <section className="bg-[#f8f8fc] px-6 py-20 lg:py-28 relative section-glow-bottom">
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
          <span className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-tight text-[#1a1a2e]/80">
            2010
          </span>
          <span className="text-sm text-[#6b7280]">Founded in Plano, Texas</span>
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]">
            Our Mission
          </span>
          <p className="text-[clamp(1rem,2vw,1.375rem)] leading-relaxed text-[#1a1a2e]" style={{ lineHeight: 1.7 }}>
            To provide exceptional value, deliver cost-effective solutions, and guarantee customer
            satisfaction — through standards-driven enterprise architecture and meticulous project
            execution.
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
    <section className="relative bg-white px-6 py-24 section-glow-top overflow-hidden">
      <GridBackground className="opacity-[0.03]" patternId="grid-values" />
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            What We Stand For
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#1a1a2e]"
          >
            Our core values.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-[#6b7280]"
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
              className="card-premium flex flex-col items-start gap-5 rounded-2xl bg-white p-8"
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
              <h4 className="text-lg font-semibold text-[#1a1a2e]">{card.title}</h4>
              <p className="text-sm leading-relaxed text-[#6b7280]">{card.body}</p>
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
  { id: '1', name: 'Raj Patel', role: 'Founder & CEO', image: 'https://i.pravatar.cc/400?img=59', social: { linkedin: '#' } },
  { id: '2', name: 'Sarah Chen', role: 'VP of Engineering', image: 'https://i.pravatar.cc/400?img=47', social: { linkedin: '#' } },
  { id: '3', name: 'Marcus Johnson', role: 'Director of Strategy', image: 'https://i.pravatar.cc/400?img=52', social: { linkedin: '#' } },
  { id: '4', name: 'Priya Sharma', role: 'Senior Consultant', image: 'https://i.pravatar.cc/400?img=45', social: { linkedin: '#' } },
  { id: '5', name: 'David Kim', role: 'Project Director', image: 'https://i.pravatar.cc/400?img=53', social: { linkedin: '#' } },
  { id: '6', name: 'Emily Torres', role: 'Solutions Architect', image: 'https://i.pravatar.cc/400?img=44', social: { linkedin: '#' } },
];

function TeamSection() {
  return (
    <section className="relative bg-white px-6 py-24">
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,72,0,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            THE TEAM
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,3.5vw,2.625rem)] font-semibold text-[#1a1a2e]"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-[16px] text-[#6b7280]"
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
    <section className="bg-[#f8f8fc] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center sm:flex-1 rounded-xl px-4 py-3">
            <div className="flex w-full items-center justify-center sm:flex-col">
              <div className="flex flex-col items-center px-4 sm:px-2">
                <span className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none text-[#1a1a2e]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-[13px] text-[#6b7280]">{stat.label}</span>
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
    <section className="bg-white px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
        >
          Our Expertise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#1a1a2e]"
        >
          Deep knowledge across every enterprise layer.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mb-12 max-w-2xl text-base text-[#6b7280]"
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
              className="cursor-default rounded-full border border-[#e5e7eb] px-4 py-2 text-sm text-[#6b7280] transition-colors duration-200 hover:border-[#FF4800] hover:text-[#FF4800]"
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
  { label: 'Enterprise Architecture', percentage: 95 },
  { label: 'Cloud & DevOps', percentage: 90 },
  { label: 'Technology Strategy', percentage: 92 },
  { label: 'Project Management', percentage: 88 },
  { label: 'Red Hat Middleware', percentage: 96 },
  { label: 'Agile Delivery', percentage: 93 },
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
    <section className="relative px-6 py-16 bg-[#f8f8fc]">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            Core Competencies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#1a1a2e]"
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
                <span className="text-[16px] font-normal text-[#1a1a2e]">{skill.label}</span>
                <span className="text-[16px] font-semibold" style={{ color: '#FF4800' }}>
                  <AnimatedPercentage target={skill.percentage} />
                </span>
              </div>

              {/* Track */}
              <div
                className="h-2 w-full rounded-full"
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
  { year: '2010', title: 'Founded', description: 'Straveda LLC established in Plano, Texas with a focus on enterprise middleware.' },
  { year: '2014', title: 'Red Hat Partnership', description: 'Became an official Red Hat partner, delivering certified middleware solutions.' },
  { year: '2017', title: 'Cloud Expansion', description: 'Expanded into cloud strategy and container orchestration services.' },
  { year: '2020', title: '100+ Projects', description: 'Surpassed 100 successful enterprise project deliveries.' },
  { year: '2023', title: 'AI Integration', description: 'Launched AI-powered IT assessment and optimization services.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as a top enterprise IT consultancy in the Southwest region.' },
];

function TimelineSection() {
  return (
    <section className="relative bg-[#f8f8fc] px-6 py-24">
      <div className="relative mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            OUR JOURNEY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#1a1a2e]"
          >
            Our Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-[#6b7280]"
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
                <div className="card-premium flex-1 rounded-2xl bg-white p-6 lg:p-8">
                  <span className="text-[20px] font-bold text-[#FF4800]">{milestone.year}</span>
                  <h3 className="mt-1 text-[18px] font-semibold text-[#1a1a2e]">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6b7280]">
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
  { name: 'Red Hat', level: 'Enterprise Partner', color: '#EE0000', logo: 'RH' },
  { name: 'Amazon Web Services', level: 'Advanced Partner', color: '#FF9900', logo: 'AWS' },
  { name: 'Microsoft Azure', level: 'Certified Partner', color: '#0078D4', logo: 'Azure' },
  { name: 'Docker', level: 'Technology Partner', color: '#2496ED', logo: 'Docker' },
  { name: 'Kubernetes', level: 'Certified Provider', color: '#326CE5', logo: 'K8s' },
  { name: 'Linux Foundation', level: 'Member Organization', color: '#FCC624', logo: 'LF' },
];

const certifications = [
  'ITIL v4 Foundation',
  'AWS Solutions Architect',
  'Red Hat Certified Architect',
];

function PartnersSection() {
  return (
    <section className="relative bg-[#f8f8fc] px-6 py-20 lg:py-28 overflow-hidden">
      {/* Interactive grid background with mouse-proximity reveal */}
      <GridBackground interactive className="opacity-[0.05]" patternId="grid-partners" />
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 72, 0, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            PARTNERS &amp; CERTIFICATIONS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#1a1a2e]"
          >
            Technology partners we trust.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-[#6b7280]"
          >
            Our partnerships ensure we deliver the best enterprise solutions.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease },
                },
              }}
              whileHover={{ y: -3 }}
              className="card-glow relative flex flex-col items-center rounded-xl p-8 transition-all duration-300 bg-white border border-[#e5e7eb] shadow-sm hover:shadow-md"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255, 72, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  '#e5e7eb';
              }}
            >
              {/* Decorative top accent line */}
              <div className="absolute left-1/2 top-0 h-[3px] w-10 -translate-x-1/2 rounded-b bg-[#FF4800]" />

              {/* Logo Text */}
              <span
                className="mt-4 text-[26px] font-bold tracking-tight"
                style={{ color: partner.color }}
              >
                {partner.logo}
              </span>

              {/* Partner Name */}
              <h4 className="mt-2 text-[24px] font-bold text-[#1a1a2e]">{partner.name}</h4>

              {/* Certification Level */}
              <span className="mt-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FF4800]">
                {partner.level}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Row */}
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
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#FF4800]/30 px-5 py-2 text-sm text-[#FF4800]"
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
    <main className="min-h-screen bg-white">
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

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
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
} from 'lucide-react';
import Marquee from '@/components/straveda/Marquee';
import TiltCard from '@/components/straveda/TiltCard';
import MagneticButton from '@/components/straveda/MagneticButton';
import ParticleField from '@/components/straveda/ParticleField';
import TextReveal from '@/components/straveda/TextReveal';

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

const testimonialCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

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
    <span ref={ref} className="text-white" style={{ fontSize: '96px', fontWeight: 600, lineHeight: 1 }}>
      {count}
      {suffix}
    </span>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {


  return (
    <div>
      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1A — HERO (100vh, black background)     */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-screen items-center bg-black"
        style={{ background: '#000000' }}
      >
        <ParticleField />
        <div className="relative z-10 mx-auto w-full max-w-[860px] px-6 py-24 lg:px-8">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: '#A1A1A1' }}
          >
            <span style={{ color: '#FF4800' }}>—</span> ENTERPRISE IT
            CONSULTING
          </motion.p>

          {/* Headline — word-by-word reveal */}
          <h1
            className="mb-6 font-semibold leading-[0.92] text-white"
            style={{
              fontSize: 'clamp(64px, 9vw, 128px)',
              fontWeight: 600,
              lineHeight: 0.92,
            }}
          >
            <TextReveal delay={0.3} stagger={0.08}>We architect solutions to build and deploy IT assets efficiently</TextReveal>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.1, ease }}
              style={{ color: '#FF4800', display: 'inline-block', marginLeft: '-0.15em' }}
            >
              .
            </motion.span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="text-[20px] font-normal"
            style={{ color: '#A1A1A1' }}
          >
            Less complexity, more{" "}
            <span className="text-gradient-orange" style={{ fontWeight: 500 }}>agility.</span>
          </motion.p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3, ease }}
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cta-pulse btn-shine"
                style={{ background: '#FF4800' }}
              >
                Start a project
              </motion.button>
            </MagneticButton>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.42, ease }}
              onClick={() => onNavigate('services')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-white bg-transparent px-7 py-3.5 text-[14px] font-medium text-white transition-all duration-200 hover:border-[#FF4800]/60 hover:bg-white/5 btn-shine"
            >
              View our services
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.55, ease }}
            className="mt-8"
          >
            <div
              className="mb-6 w-full"
              style={{ borderTop: '1px solid #27272A' }}
            />
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    style={{ color: '#FBBF24' }}
                  />
                ))}
              </div>
              <span className="text-[15px] font-semibold text-white">
                5.0
              </span>
              <span className="text-[14px]" style={{ color: '#A1A1A1' }}>
                Google Reviews
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown
            className="bounce-slow h-5 w-5"
            style={{ color: '#A1A1A1' }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MARQUEE TICKER                                   */}
      {/* ═══════════════════════════════════════════════ */}
      <Marquee />

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1B — SERVICES TEASER                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24 section-glow-top"
        style={{ background: '#000000', borderTop: '1px solid #27272A' }}
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
              className="text-[42px] font-medium text-white"
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
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Braces className="mb-5 h-7 w-7 text-white" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                ARCHITECTURE
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-white"
                style={{ fontWeight: 500 }}
              >
                Enterprise Architecture
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                Modernize your application portfolio with adaptive,
                open-standards architecture that scales.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#A1A1A1' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#A1A1A1')
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
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Compass className="mb-5 h-7 w-7 text-white" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                STRATEGY
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-white"
                style={{ fontWeight: 500 }}
              >
                Technology Strategy
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                Align IT investments with business goals to accelerate time to
                market and increase product innovation.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#A1A1A1' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#A1A1A1')
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
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <ClipboardCheck className="mb-5 h-7 w-7 text-white" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                MANAGEMENT
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-white"
                style={{ fontWeight: 500 }}
              >
                Management Consulting
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                Expert Product, Program &amp; Project management through
                meticulous planning and execution.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#A1A1A1' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#A1A1A1')
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
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Server className="mb-5 h-7 w-7 text-white" />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                SOFTWARE
              </span>
              <h3
                className="mb-3 text-[22px] font-medium text-white"
                style={{ fontWeight: 500 }}
              >
                Software Solutions
              </h3>
              <p className="mb-5 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                Red Hat Enterprise Middleware and virtualization to lower total
                cost of ownership at enterprise scale.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group flex items-center gap-1 text-[14px] transition-colors duration-200"
                style={{ color: '#A1A1A1' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#FF4800')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#A1A1A1')
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
      {/* SECTION 1C — ABOUT / STATS                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: '#000000' }}
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
            <p className="mt-3 text-[16px]" style={{ color: '#A1A1A1' }}>
              Years of Enterprise Excellence
            </p>
            <p
              className="mt-2 text-[12px] font-medium uppercase tracking-wider"
              style={{ color: '#52525B' }}
            >
              Est. 2010
            </p>
            <div className="mt-6 flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: '#FF4800' }} />
              <span className="text-[15px]" style={{ color: '#A1A1A1' }}>
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
              className="text-[20px] leading-[1.7] text-white"
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
                <span className="text-[28px] font-bold text-white">
                  7
                </span>
                <span
                  className="mt-1 text-[13px]"
                  style={{ color: '#A1A1A1' }}
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
                <span className="text-[28px] font-bold text-white">
                  100%
                </span>
                <span
                  className="mt-1 text-[13px]"
                  style={{ color: '#A1A1A1' }}
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
                <span className="text-[28px] font-bold text-white">
                  Cost-Effective
                </span>
                <span
                  className="mt-1 text-[13px]"
                  style={{ color: '#A1A1A1' }}
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
        style={{ background: '#000000' }}
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
            <h2
              className="text-[42px] font-medium text-white"
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
                  className="text-[22px] font-medium text-white"
                  style={{ fontWeight: 500 }}
                >
                  Discovery
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
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
                  className="text-[22px] font-medium text-white"
                  style={{ fontWeight: 500 }}
                >
                  Strategy
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
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
                  className="text-[22px] font-medium text-white"
                  style={{ fontWeight: 500 }}
                >
                  Execution
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
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
                  className="text-[22px] font-medium text-white"
                  style={{ fontWeight: 500 }}
                >
                  Optimize
                </h3>
              </div>
              <p className="mt-3 text-[16px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                We measure results, refine approaches, and ensure long-term sustainability.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Decorative gradient divider ── */}
      <div className="relative h-px w-full overflow-hidden" style={{ background: '#000000' }}>
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
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: '#2B2358' }}
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
              className="text-[40px] font-medium text-white"
              style={{ fontWeight: 500 }}
            >
              What our clients say.
            </h2>
          </motion.div>

          {/* Testimonial Cards Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {/* Card 1 */}
            <TiltCard className="rounded-xl">
            <motion.div
              variants={testimonialCardVariants}
              className="rounded-xl p-8 transition-all duration-300 hover:shadow-lg"
              style={{ background: '#1e1a3f' }}
            >
              <span
                className="mb-4 block text-[52px] leading-none"
                style={{ color: '#FF4800' }}
              >
                &#x275D;
              </span>
              <div className="mb-4 flex items-center gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    style={{ color: '#FBBF24' }}
                  />
                ))}
              </div>
              <p
                className="mb-6 text-[17px] italic leading-[1.7] text-white"
              >
                Straveda transformed our legacy infrastructure in record time.
                Their enterprise architecture expertise is unmatched.
              </p>
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              />
              <p className="text-[15px] font-semibold text-white">
                James R.
              </p>
              <p className="text-[14px]" style={{ color: '#A1A1A1' }}>
                Senior VP &middot; Accenture
              </p>
            </motion.div>
            </TiltCard>

            {/* Card 2 */}
            <TiltCard className="rounded-xl">
            <motion.div
              variants={testimonialCardVariants}
              className="rounded-xl p-8 transition-all duration-300 hover:shadow-lg"
              style={{ background: '#1e1a3f' }}
            >
              <span
                className="mb-4 block text-[52px] leading-none"
                style={{ color: '#FF4800' }}
              >
                &#x275D;
              </span>
              <div className="mb-4 flex items-center gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    style={{ color: '#FBBF24' }}
                  />
                ))}
              </div>
              <p
                className="mb-6 text-[17px] italic leading-[1.7] text-white"
              >
                The technology strategy they delivered gave us a clear roadmap.
                We shipped{" "}
                <span className="text-gradient-orange" style={{ fontWeight: 500 }}>3x faster</span>{" "}within the first quarter.
              </p>
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              />
              <p className="text-[15px] font-semibold text-white">
                Sarah M.
              </p>
              <p className="text-[14px]" style={{ color: '#A1A1A1' }}>
                Director of Engineering &middot; Deloitte
              </p>
            </motion.div>
            </TiltCard>

            {/* Card 3 */}
            <TiltCard className="rounded-xl">
            <motion.div
              variants={testimonialCardVariants}
              className="rounded-xl p-8 transition-all duration-300 hover:shadow-lg"
              style={{ background: '#1e1a3f' }}
            >
              <span
                className="mb-4 block text-[52px] leading-none"
                style={{ color: '#FF4800' }}
              >
                &#x275D;
              </span>
              <div className="mb-4 flex items-center gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    style={{ color: '#FBBF24' }}
                  />
                ))}
              </div>
              <p
                className="mb-6 text-[17px] italic leading-[1.7] text-white"
              >
                Their management consulting approach eliminated bottlenecks
                we&apos;d struggled with for years.{" "}
                <span className="text-gradient-orange" style={{ fontWeight: 500 }}>True enterprise partners.</span>
              </p>
              <div
                className="mb-4 w-full"
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              />
              <p className="text-[15px] font-semibold text-white">
                David K.
              </p>
              <p className="text-[14px]" style={{ color: '#A1A1A1' }}>
                CTO &middot; IBM Global Services
              </p>
            </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── Decorative gradient divider ── */}
      <div className="relative h-px w-full overflow-hidden" style={{ background: '#2B2358' }}>
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
      {/* SECTION 1F — CASE STUDIES                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: '#000000' }}
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
            <h2
              className="text-[42px] font-medium text-white"
              style={{ fontWeight: 500, maxWidth: '580px' }}
            >
              Real results for real enterprises.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed" style={{ color: '#A1A1A1', maxWidth: '520px' }}>
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
              className="card-glow rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,72,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
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
                  className="mb-6 text-[22px] font-medium text-white"
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
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Legacy middleware causing 60% downtime during peak hours
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Enterprise Architecture modernization with Red Hat middleware
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    99.9% uptime, 40% cost reduction, 3x faster deployments
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    99.9% uptime
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    -40% cost
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
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
              className="card-glow rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,72,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
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
                  className="mb-6 text-[22px] font-medium text-white"
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
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Fragmented IT systems across 12 regional offices
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Technology Strategy roadmap + API integration platform
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Unified platform, 65% faster data sharing, $2.1M annual savings
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    Unified platform
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    65% faster
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
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
              className="card-glow rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: '#2B2358',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,72,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
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
                  className="mb-6 text-[22px] font-medium text-white"
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
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Aging infrastructure with critical security vulnerabilities
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Management Consulting + Agile PMO delivery framework
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#A1A1A1' }}>
                    Zero security incidents, 50% faster delivery cycles, 100% compliance
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    Zero incidents
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
                    style={{ background: 'rgba(255,72,0,0.12)' }}
                  >
                    50% faster
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white"
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
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: '#000000' }}
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
            className="text-[56px] font-semibold text-white"
            style={{ fontWeight: 600 }}
          >
            Ready to modernize your enterprise?
          </h2>
          <p className="mt-4 text-[18px]" style={{ color: '#A1A1A1' }}>
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
          <p className="mt-5 text-[14px]" style={{ color: '#52525B' }}>
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

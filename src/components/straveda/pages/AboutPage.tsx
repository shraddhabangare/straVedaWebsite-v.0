'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Diamond, Hexagon, ShieldCheck } from 'lucide-react';

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
  const headlineText = "Building tomorrow's enterprise, one solution at a time.";

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-black px-6 text-center">
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

      <h1 className="mt-4 max-w-5xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
        {headlineText.split(' ').map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.04, ease }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-6 max-w-2xl text-lg text-[#A1A1A1] sm:text-[20px]"
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
    <section className="bg-black px-6 py-20 lg:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start gap-3 lg:w-2/5"
        >
          <span className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-none tracking-tight text-white/80">
            2010
          </span>
          <span className="text-sm text-[#A1A1A1]">Founded in Plano, Texas</span>
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
          <p className="text-[clamp(1rem,2vw,1.375rem)] leading-relaxed text-white" style={{ lineHeight: 1.7 }}>
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
    <section className="bg-black px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
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
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white"
          >
            Our core values.
          </motion.h2>
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
              className="flex flex-col items-start gap-4 rounded-xl bg-[#2B2358] p-8"
            >
              {card.icon}
              <h4 className="text-lg font-semibold text-white">{card.title}</h4>
              <p className="text-sm leading-relaxed text-[#A1A1A1]">{card.body}</p>
            </motion.div>
          ))}
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
    <section className="bg-[#2B2358] px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center text-center sm:flex-1">
            <div className="flex w-full items-center justify-center sm:flex-col">
              <div className="flex flex-col items-center px-4 sm:px-2">
                <span className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-[13px] text-[#A1A1A1]">{stat.label}</span>
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
    <section className="bg-black px-6 py-20 lg:py-28">
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
          className="mb-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white"
        >
          Deep knowledge across every enterprise layer.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mb-12 max-w-2xl text-base text-[#A1A1A1]"
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
              className="cursor-default rounded-full border border-[#27272A] px-4 py-2 text-sm text-[#D4D4D4] transition-colors duration-200 hover:border-[#FF4800] hover:text-[#FF4800]"
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
/*  About Page — Main Export                                           */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <StatsStrip />
      <ExpertiseSection />
    </main>
  );
}

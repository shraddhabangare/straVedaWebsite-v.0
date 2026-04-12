'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Diamond, Hexagon, ShieldCheck, Linkedin, Award } from 'lucide-react';
import TextReveal from '@/components/straveda/TextReveal';

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
        <TextReveal delay={0.3} stagger={0.04}>Building tomorrow&apos;s enterprise, one solution at a time.</TextReveal>
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
    <section className="bg-black px-6 py-20 lg:py-28 relative">
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
    <section className="bg-black px-6 py-20 lg:py-28 section-glow-top">
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
/*  Team Section                                                       */
/* ------------------------------------------------------------------ */

const teamMembers = [
  { name: 'Raj Patel', role: 'Founder & CEO', specialty: 'Enterprise Architecture & Strategy', initials: 'RP' },
  { name: 'Anika Sharma', role: 'VP of Technology', specialty: 'Red Hat Middleware & Cloud', initials: 'AS' },
  { name: 'Marcus Chen', role: 'Director of Consulting', specialty: 'Digital Transformation', initials: 'MC' },
  { name: 'Elena Vasquez', role: 'Senior Consultant', specialty: 'Program & Project Management', initials: 'EV' },
  { name: 'David Okonkwo', role: 'Solutions Architect', specialty: 'Microservices & API Design', initials: 'DO' },
  { name: 'Sarah Kim', role: 'Agile Coach', specialty: 'PMO & Delivery Frameworks', initials: 'SK' },
  { name: 'James Mitchell', role: 'Technical Lead', specialty: 'Integration & ESB Platforms', initials: 'JM' },
];

function TeamSection() {
  return (
    <section
      className="relative px-6 py-20 lg:py-28 section-glow-top"
      style={{
        background: '#0a0a0a',
      }}
    >
      {/* subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43,35,88,0.25) 0%, transparent 70%)',
        }}
      />
      {/* Line grid pattern */}
      <div className="pointer-events-none absolute inset-0 line-grid opacity-40" />

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
            THE TEAM
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(2rem,4vw,2.625rem)] font-medium text-white"
          >
            Meet the experts behind Straveda.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-[18px] text-[#A1A1A1]"
          >
            Decades of combined enterprise experience. One shared commitment to excellence.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {teamMembers.map((member, i) => (
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
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative p-6 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(43, 35, 88, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 72, 0, 0.3)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(255, 72, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Initials Avatar */}
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-[20px] font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #FF4800, #2B2358)',
                }}
              >
                {member.initials}
              </div>

              {/* Name */}
              <h3 className="text-[18px] font-semibold text-white">{member.name}</h3>

              {/* Role */}
              <p className="mt-1 text-[14px] font-medium uppercase tracking-wide text-[#FF4800]">
                {member.role}
              </p>

              {/* Specialty */}
              <p className="mt-2 text-[14px] text-[#A1A1A1]">{member.specialty}</p>

              {/* LinkedIn Icon */}
              <a
                href="#"
                aria-label={`${member.name} LinkedIn`}
                className="absolute bottom-6 right-6 text-[#52525B] transition-colors duration-200 hover:text-[#FF4800]"
              >
                <Linkedin size={18} />
              </a>
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
    <section className="relative bg-black px-6 py-20 lg:py-28">
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 72, 0, 0.04) 0%, transparent 70%)',
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
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white"
          >
            Technology partners we trust.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mx-auto mt-4 max-w-2xl text-base text-[#A1A1A1]"
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
              className="card-glow relative flex flex-col items-center rounded-xl p-8 transition-all duration-300"
              style={{
                background: 'rgba(43, 35, 88, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255, 72, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255, 255, 255, 0.06)';
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
              <h4 className="mt-2 text-[24px] font-bold text-white">{partner.name}</h4>

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
    <main className="min-h-screen bg-black">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
      <StatsStrip />
      <ExpertiseSection />
      <PartnersSection />
    </main>
  );
}

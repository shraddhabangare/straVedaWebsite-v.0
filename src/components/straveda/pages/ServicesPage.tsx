'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, Compass, ClipboardCheck, Server, Diamond, TrendingDown, ShieldCheck, ArrowRight, ChevronDown, Container, Cloud, Database, Layers, Network, Code, Shield, Globe, TrendingUp, CircleDollarSign, Users } from 'lucide-react';
import MagneticButton from '@/components/straveda/MagneticButton';
import TextReveal from '@/components/straveda/TextReveal';
import ServiceComparison from '@/components/straveda/ServiceComparison';
import ServicesHoverModal from '@/components/straveda/ServicesHoverModal';
import { useScrollGradient } from '@/hooks/useScrollGradient';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceBlockData {
  id: string;
  badge: string;
  title: string;
  body: string;
  capabilities: string[];
  icon: React.ReactNode;
  cta: string[];
  graphicLeft: boolean;
  number: string;
}

const services: ServiceBlockData[] = [
  {
    id: 'enterprise-architecture',
    badge: 'ENTERPRISE ARCHITECTURE',
    title: 'Enterprise Architecture',
    body: 'We evolve your application portfolio using adaptive, open-standards architecture. Our solutions increase reliability, maintainability and interoperability — reducing technical debt while enabling agile practices.',
    capabilities: [
      'Portfolio modernization & rationalization',
      'Open standards & middleware integration',
      'Scalable microservices & API architecture',
    ],
    icon: <Braces size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Start a project', 'Learn more'],
    graphicLeft: true,
    number: '01',
  },
  {
    id: 'technology-strategy',
    badge: 'TECHNOLOGY STRATEGY',
    title: 'Technology Strategy',
    body: 'We align your IT investments with business goals, creating clear roadmaps that accelerate time to market and position you for sustainable growth.',
    capabilities: [
      'Digital transformation roadmaps',
      'IT investment & prioritization frameworks',
      'Cloud strategy & vendor assessment',
    ],
    icon: <Compass size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Start a project'],
    graphicLeft: false,
    number: '02',
  },
  {
    id: 'management-consulting',
    badge: 'MANAGEMENT',
    title: 'Management Consulting',
    body: 'Expert Product, Program & Project management delivered through meticulous planning and execution. We eliminate bottlenecks and drive enterprise delivery.',
    capabilities: [
      'Product & program management',
      'Agile & PMO delivery frameworks',
      'Stakeholder alignment & governance',
    ],
    icon: <ClipboardCheck size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Start a project'],
    graphicLeft: true,
    number: '03',
  },
  {
    id: 'software-solutions',
    badge: 'SOFTWARE SOLUTIONS',
    title: 'Software Solutions',
    body: 'We deploy Red Hat Enterprise Middleware and virtualization solutions that lower total cost of ownership and maximize application performance.',
    capabilities: [
      'Red Hat Enterprise Middleware deployment',
      'Virtualization & containerization',
      'Enterprise integration & ESB platforms',
    ],
    icon: <Server size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Start a project'],
    graphicLeft: false,
    number: '04',
  },
];

const whyCards = [
  {
    icon: <Diamond size={40} className="text-[#FF4800]" />,
    title: 'Exceptional Value',
    body: 'Maximum business impact per dollar invested, with transparent pricing and zero hidden costs.',
  },
  {
    icon: <TrendingDown size={40} className="text-[#FF4800]" />,
    title: 'Cost-Effective Solutions',
    body: 'Solutions architected to lower total cost of ownership from day one through open standards.',
  },
  {
    icon: <ShieldCheck size={40} className="text-[#FF4800]" />,
    title: 'Guaranteed Satisfaction',
    body: 'Customer satisfaction is not a goal — it is our guarantee. We stand behind every engagement.',
  },
];

const benefits = [
  { title: 'Open Standards', description: 'No vendor lock-in. We build on open-source and open-standards technology.', icon: Globe },
  { title: 'Proven Track Record', description: '14+ years delivering enterprise solutions for Fortune 500 companies.', icon: TrendingUp },
  { title: 'Cost Effective', description: 'Exceptional value per dollar invested with zero hidden costs.', icon: CircleDollarSign },
  { title: 'Knowledge Transfer', description: 'We upskill your teams and transfer knowledge for long-term self-sufficiency.', icon: Users },
];

const processSteps = [
  { step: '01', title: 'Assess', description: 'Evaluate your current architecture and identify opportunities' },
  { step: '02', title: 'Plan', description: 'Create a tailored roadmap aligned with your business goals' },
  { step: '03', title: 'Execute', description: 'Implement solutions using proven enterprise frameworks' },
  { step: '04', title: 'Optimize', description: 'Continuously improve performance and reduce technical debt' },
];

const faqItems = [
  {
    question: 'What industries do you serve?',
    answer: 'We work across financial services, healthcare, government, energy, and technology sectors. Our deep enterprise expertise translates across industries.',
  },
  {
    question: 'How long does a typical engagement last?',
    answer: 'Engagements vary from focused 4-week assessments to multi-year transformation programs. We scope each project to deliver measurable results at every milestone.',
  },
  {
    question: 'Do you work with existing IT teams?',
    answer: 'Absolutely. We embed within your teams to upskill, mentor, and transfer knowledge. Our goal is to make your organization self-sufficient.',
  },
  {
    question: 'What makes Straveda different from other consultancies?',
    answer: 'We deliver exceptional value per dollar invested with zero hidden costs. Our open-standards approach avoids vendor lock-in, and we guarantee customer satisfaction.',
  },
  {
    question: 'Can you handle enterprise-scale deployments?',
    answer: 'Yes. We specialize in Red Hat Enterprise Middleware and large-scale architecture. Our team has deployed solutions serving millions of users across Fortune 500 companies.',
  },
  {
    question: 'How do we get started?',
    answer: 'Simple — reach out via our contact form or email us at info@straveda.com. We offer a free initial consultation to assess your needs and propose a tailored approach.',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const ease = [0.4, 0, 0.2, 1] as const;

const itemVariants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction * 40 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease },
  },
};

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const heroScrolled = useScrollGradient(100);
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-4 flex flex-col items-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]">
          What We Do
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
        <TextReveal delay={0.3} stagger={0.04}>Comprehensive enterprise services built to modernize and deliver.</TextReveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-6 max-w-2xl text-lg text-[#6b7280] sm:text-[20px]"
      >
        From architecture to execution — we cover the full stack of enterprise IT transformation.
      </motion.p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Detail Block                                               */
/* ------------------------------------------------------------------ */

function ServiceBlock({ service }: { service: ServiceBlockData; index: number }) {
  const direction = service.graphicLeft ? -1 : 1;

  const Graphic = (
    <motion.div
      custom={direction}
      variants={itemVariants}
      className="relative flex items-center justify-center rounded-xl bg-[#f8f8fc] p-12 lg:min-h-[340px] card-glow card-premium border border-[#e5e7eb] hover:shadow-[0_8px_30px_rgba(255,72,0,0.1)]"
    >
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl bg-gradient-to-r from-[#FF4800] via-[rgba(255,72,0,0.4)] to-transparent" />
      {/* Large semi-transparent number indicator with gradient */}
      <span className="absolute top-6 left-6 text-[80px] font-bold leading-none select-none pointer-events-none text-gradient-orange" style={{ opacity: 0.07 }}>
        {service.number}
      </span>
      {service.icon}
    </motion.div>
  );

  const Content = (
    <motion.div
      custom={-direction}
      variants={itemVariants}
      className="flex flex-col justify-center gap-5 py-4"
    >
      <span className="inline-block w-fit rounded-full bg-[#FF4800]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4800]">
        {service.badge}
      </span>
      <h3 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight text-[#1a1a2e]">
        {service.title}
      </h3>
      <p className="max-w-xl text-base leading-relaxed text-[#6b7280]">{service.body}</p>
      <ul className="mt-1 flex flex-col gap-2">
        {service.capabilities.map((cap, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#6b7280]">
            <span className="mt-0.5 text-[#FF4800]">
              <ArrowRight size={14} />
            </span>
            {cap}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-3">
        {service.cta.map((cta, i) => (
          <MagneticButton key={i}>
            <button
              data-magnetic
              className={
                i === 0
                  ? 'rounded-lg bg-[#FF4800] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e03e00] btn-shine'
                  : 'group flex items-center gap-1 text-sm font-medium text-[#FF4800] transition-colors hover:text-[#ff6b33]'
              }
            >
              {cta}
              {i > 0 && <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </MagneticButton>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`relative flex flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:px-24 bg-[#f8f8fc] ${
        service.graphicLeft ? '' : 'lg:flex-row-reverse'
      }`}
    >
      <div className="w-full lg:w-1/2">{service.graphicLeft ? Graphic : Content}</div>
      <div className="w-full lg:w-1/2">{service.graphicLeft ? Content : Graphic}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Banner Section                                                 */
/* ------------------------------------------------------------------ */

function CTABanner({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="relative px-6 py-20 md:py-28"
        style={{
          background: 'linear-gradient(135deg, #2B2358 0%, #1e1a3f 100%)',
        }}
      >
        {/* Dot grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Decorative subtle circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/[0.03] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FF4800]/[0.04] translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold text-white leading-tight mb-5"
          >
            Ready to transform your enterprise?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="text-white/70 text-lg max-w-2xl mb-10"
          >
            Let&apos;s discuss how our expertise can modernize your IT landscape and accelerate your business outcomes.
          </motion.p>
          <MagneticButton>
            <motion.button
              data-magnetic
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              onClick={() => onNavigate('contact')}
              className="rounded-lg bg-[#FF4800] px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#e03e00] hover:shadow-[0_8px_32px_rgba(255,72,0,0.3)] hover:scale-[1.02]"
            >
              Start a project
              <ArrowRight className="ml-2 inline-block w-4 h-4" />
            </motion.button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Straveda Section                                               */
/* ------------------------------------------------------------------ */

function WhyStravedaSection() {
  return (
    <section className="bg-white px-6 py-24 relative section-glow-bottom">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-30" />
      <div className="mx-auto max-w-6xl text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
        >
          Why Straveda
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-14 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-[#1a1a2e]"
        >
          Why enterprises choose us.
        </motion.h2>

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
          {whyCards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="flex flex-col items-start gap-4 rounded-xl bg-white p-8 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#FF4800]/20"
            >
              {card.icon}
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
/*  FAQ Accordion Section                                              */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-[#f8f8fc] px-6 py-24 section-glow-top relative">
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-medium text-[#1a1a2e]"
          >
            Frequently asked questions.
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col gap-4"
        >
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="rounded-xl border border-[#e5e7eb] bg-white transition-colors hover:border-[#FF4800]/20 shadow-sm"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-medium leading-snug text-[#1a1a2e]">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex-shrink-0 text-[#9ca3af]"
                  >
                    <ChevronDown size={20} strokeWidth={2} />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[16px] leading-relaxed text-[#6b7280]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Technology Stack Section                                            */
/* ------------------------------------------------------------------ */

const techStack = [
  {
    name: 'Red Hat Enterprise Linux',
    description: 'Enterprise-grade Linux platform for mission-critical workloads with military-grade security.',
    icon: <Server size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'JBoss EAP',
    description: 'Enterprise application server for building, deploying, and hosting Java applications.',
    icon: <Layers size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'OpenShift',
    description: 'Enterprise Kubernetes platform for containerized application development and deployment.',
    icon: <Container size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Docker',
    description: 'Containerization platform enabling consistent application environments across any infrastructure.',
    icon: <Code size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Kubernetes',
    description: 'Production-grade container orchestration for automated deployment, scaling, and management.',
    icon: <Network size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'AWS',
    description: 'Amazon Web Services cloud platform providing on-demand computing, storage, and analytics.',
    icon: <Cloud size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Azure',
    description: 'Microsoft Azure cloud platform for building, deploying, and managing enterprise applications.',
    icon: <Shield size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database with powerful querying and extensibility features.',
    icon: <Database size={32} className="text-[#FF4800]" />,
  },
];

const techCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Why Choose Straveda Section (Benefits Grid)                          */
/* ------------------------------------------------------------------ */

function WhyChooseSection() {
  return (
    <section className="bg-[#f8f8fc] px-6 py-24 relative">
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
        >
          WHY STRAVEDA
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-14 text-center text-[36px] font-medium text-[#1a1a2e]"
        >
          Why leading enterprises choose us
        </motion.h2>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {benefits.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="card-premium flex flex-col items-start gap-4 rounded-xl bg-white p-6 border border-[#e5e7eb]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(255,72,0,0.08)' }}>
                <card.icon size={24} className="text-[#FF4800]" />
              </div>
              <h4 className="text-[18px] font-medium text-[#1a1a2e]">{card.title}</h4>
              <p className="text-[15px] leading-relaxed text-[#6b7280]">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Our Approach — Process Timeline                                     */
/* ------------------------------------------------------------------ */

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

function OurApproachSection() {
  return (
    <section className="bg-white px-6 py-24 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF4800]/[0.03] blur-3xl" />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
        >
          OUR APPROACH
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-16 text-center text-[36px] font-medium text-[#1a1a2e]"
        >
          A proven 4-step process
        </motion.h2>

        {/* Desktop: horizontal layout with connecting line */}
        <div className="hidden lg:block relative">
          {/* Connecting gradient line */}
          <div className="absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-[2px] bg-gradient-to-r from-[#FF4800] via-[#FF4800]/30 to-transparent" />

          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-4 gap-8"
          >
            {processSteps.map((item, i) => (
              <motion.div key={i} variants={stepVariants} className="relative flex flex-col items-center text-center">
                {/* Large decorative step number */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[48px] font-bold text-[#FF4800] select-none pointer-events-none" style={{ opacity: 0.12 }}>{item.step}</span>
                {/* Step circle with number */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FF4800]/20 bg-white">
                  <span className="text-[20px] font-bold text-[#FF4800]" style={{ opacity: 0.9 }}>{item.step}</span>
                </div>
                <h3 className="mb-2 text-[20px] font-medium text-[#1a1a2e]">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#6b7280] max-w-[200px]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tablet: 2x2 layout with connecting line */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 relative">
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {processSteps.map((item, i) => (
              <motion.div key={i} variants={stepVariants} className="relative flex items-start gap-5 py-4">
                {/* Connecting vertical line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute top-10 left-[15px] w-[2px] h-[calc(100%)] bg-gradient-to-b from-[#FF4800]/30 to-transparent" />
                )}
                {/* Large decorative step number */}
                <span className="absolute -top-2 left-0 text-[48px] font-bold text-[#FF4800] select-none pointer-events-none" style={{ opacity: 0.12 }}>{item.step}</span>
                {/* Step circle */}
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]/20 bg-white">
                  <span className="text-[12px] font-bold text-[#FF4800]" style={{ opacity: 0.9 }}>{item.step}</span>
                </div>
                <div className="pt-0.5">
                  <h3 className="mb-1 text-[20px] font-medium text-[#1a1a2e]">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#6b7280]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: vertical layout with connecting line */}
        <div className="md:hidden relative">
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex flex-col gap-10"
          >
            {processSteps.map((item, i) => (
              <motion.div key={i} variants={stepVariants} className="relative flex items-start gap-5">
                {/* Connecting vertical line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute top-8 left-[15px] w-[2px] h-[calc(100%+40px)] bg-gradient-to-b from-[#FF4800]/40 to-transparent" />
                )}
                {/* Step circle */}
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]/20 bg-white">
                  <span className="text-[12px] font-bold text-[#FF4800]" style={{ opacity: 0.9 }}>{item.step}</span>
                </div>
                <div className="pt-0.5">
                  <h3 className="mb-1 text-[18px] font-medium text-[#1a1a2e]">{item.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#6b7280]">{item.description}</p>
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
/*  Technology Stack Section                                            */
/* ------------------------------------------------------------------ */

function TechStackSection() {
  return (
    <section className="bg-white py-20 relative">
      {/* Subtle dot-grid-dense pattern background */}
      <div className="absolute inset-0 dot-grid-dense pointer-events-none opacity-20" />
      <div className="container-wide px-6 relative z-10">
        {/* Section header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FF4800]"
          >
            TECHNOLOGY STACK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-medium text-[#1a1a2e]"
          >
            Technologies we master.
          </motion.h2>
        </div>

        {/* Technology cards grid */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              variants={techCardVariants}
              className="card-glow group relative overflow-hidden rounded-xl p-6 bg-white border border-[#e5e7eb] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#FF4800]/20"
            >
              {/* Subtle gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 72, 0, 0.04) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10 flex flex-col gap-4">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF4800]/10 transition-colors group-hover:bg-[#FF4800]/20">
                  {tech.icon}
                </div>
                {/* Name */}
                <h3 className="text-base font-semibold text-[#1a1a2e] leading-tight">
                  {tech.name}
                </h3>
                {/* Description */}
                <p className="text-sm leading-relaxed text-[#6b7280]">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Services Page — Main Export                                        */
/* ------------------------------------------------------------------ */

export default function ServicesPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      {/* Subtle gradient transition between hero and services modal */}
      <div className="flex flex-col items-center gap-4 py-8" aria-hidden="true">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#FF4800]/25 to-transparent" />
      </div>

      <ServicesHoverModal onNavigate={onNavigate} />

      {services.map((service, index) => (
        <div key={service.id}>
          <ServiceBlock service={service} index={index} />
          {/* Subtle horizontal divider between service blocks */}
          {index < services.length - 1 && (
            <div className="max-w-7xl mx-auto h-px bg-[rgba(0,0,0,0.04)]" />
          )}
        </div>
      ))}

      <WhyStravedaSection />
      <OurApproachSection />
      <WhyChooseSection />
      <FAQSection />
      <ServiceComparison />
      <TechStackSection />
      <CTABanner onNavigate={onNavigate} />
    </main>
  );
}

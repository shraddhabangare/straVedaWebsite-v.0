'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, Compass, ClipboardCheck, Server, Diamond, TrendingDown, ShieldCheck, ArrowRight, ChevronDown, Container, Cloud, Database, Layers, Network, Code, Shield, Globe, TrendingUp, CircleDollarSign, Users } from 'lucide-react';
import MagneticButton from '@/components/shared/MagneticButton';
import TextReveal from '@/components/shared/TextReveal';
import ServiceComparison from '@/components/sections/ServiceComparison';
import ServicesHoverModal from '@/components/sections/ServicesHoverModal';
import { Component as AnimatedHoverModal } from '@/components/ui/services-with-animated-hover-modal';
import { useScrollGradient } from '@/hooks/useScrollGradient';

/* ------------------------------------------------------------------ */
/*  Component-level Styles                                             */
/* ------------------------------------------------------------------ */

function ServicesPageStyles() {
  return (
    <style>{`
      @property --gradient-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }

      .service-card-glow {
        position: relative;
        isolation: isolate;
      }
      .service-card-glow::before {
        content: '';
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        background: conic-gradient(
          from var(--gradient-angle, 0deg),
          transparent 50%,
          #FF4800 78%,
          transparent 100%
        );
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: -1;
      }
      .service-card-glow:hover::before {
        opacity: 1;
        animation: rotate-gradient-border 3s linear infinite;
      }
      @keyframes rotate-gradient-border {
        to { --gradient-angle: 360deg; }
      }

      .faq-item-hover {
        transition: box-shadow 0.3s ease;
      }
      .faq-item-hover:hover {
        box-shadow: inset 3px 0 12px -4px rgba(255, 72, 0, 0.15);
      }

      @keyframes float-dot-1 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes float-dot-2 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
      }
      @keyframes float-dot-3 {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceBlockData {
  id: string;
  badge: string;
  title: string;
  body: string;
  capabilities: string[];
  outcomes: string[];
  investment: string;
  icon: React.ReactNode;
  cta: string[];
  graphicLeft: boolean;
  number: string;
}

const services: ServiceBlockData[] = [
  {
    id: 'automation',
    badge: 'AUTOMATION',
    title: 'AI & Business Automation',
    body: 'Manual work is invisible debt. Every process your team repeats by hand is a system that should exist. We audit your workflows, identify the biggest time-wasters, and replace them with AI agents and automation sequences that work 24/7.',
    capabilities: [
      'WhatsApp Business Automation: AI-powered lead qualification & appointment booking',
      'Email Sequence Automation: behavioral triggers that run without touching your CRM',
      'AI Customer Support: tier-1 handled by AI, complex issues auto-escalate with full context',
      'Internal Workflow Automation: approvals, data entry, reporting — all automated',
    ],
    outcomes: ['30–60% reduction in manual work (week 1)', 'Response time drops to minutes (week 2)', 'Cost per qualified lead drops 40–50% (day 30)'],
    investment: '₹5L–₹15L · 4–6 weeks',
    icon: <Braces size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Book strategy call', 'Explore Automation'],
    graphicLeft: true,
    number: '01',
  },
  {
    id: 'custom-software',
    badge: 'SOFTWARE',
    title: 'Custom Software & AI-Powered Systems',
    body: 'Off-the-shelf software is built for average companies doing average things. If your operations are even slightly unique, you\'re forcing your workflow into a vendor\'s mold. We build software tailored to exactly how you operate.',
    capabilities: [
      'AI-Powered CRMs: built around your sales process, not a generic one',
      'Operational Dashboards: real-time visibility into what actually matters',
      'Customer Self-Service Portals: reduce support tickets by 40%',
      'Data Warehousing & Analytics: all your business data unified and queryable',
    ],
    outcomes: ['Team adoption 90%+ (fits your process)', 'Support tickets drop 30–40% (self-service portal)', 'Scalability without proportional headcount growth'],
    investment: '₹15L–₹50L · 8–12 weeks',
    icon: <Compass size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Book strategy call'],
    graphicLeft: false,
    number: '02',
  },
  {
    id: 'ai-strategy',
    badge: 'STRATEGY',
    title: 'AI Strategy & Model Integration',
    body: 'AI is everywhere. But most companies treat it like a shiny new tool instead of infrastructure that should run core operations. We help you architect where AI actually adds value and integrate it into your workflows so AI is doing work, not sitting in a demo.',
    capabilities: [
      'AI Architecture & Strategy: phased roadmap to deploy where it creates real ROI',
      'Custom LLM Fine-Tuning: models trained on your specific data and business context',
      'RAG Systems: AI that answers questions by retrieving from your actual data',
      'Predictive Analytics: churn prediction, sales forecasting, customer lifetime value',
    ],
    outcomes: ['3–5x faster decision-making (predictive insights)', '40–60% automation of analytical work', 'Competitive advantage: AI doing work, not in a demo'],
    investment: '₹12L–₹35L · 6–10 weeks',
    icon: <ClipboardCheck size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Book strategy call'],
    graphicLeft: true,
    number: '03',
  },
  {
    id: 'web-development',
    badge: 'DIGITAL',
    title: 'Web Development & Digital Experiences',
    body: 'Your website is your first impression. It should be fast, memorable, and convert. We build high-performance web experiences on Next.js that move inventory, qualify leads, and build brand credibility that competitors can\'t match.',
    capabilities: [
      'High-Performance Websites: Next.js, sub-second loads, SEO-ready from day one',
      '3D & Interactive Experiences: make your brand unforgettable with immersive builds',
      'Landing Pages & Sales Funnels: conversion-optimized with A/B testing built in',
      'E-Commerce Storefronts: integrated payments, cart recovery, inventory sync',
    ],
    outcomes: ['2–3x higher conversion rates (vs. template sites)', '50%+ faster load times (vs. traditional CMS)', 'SEO rankings improve within 8–12 weeks'],
    investment: '₹8L–₹25L · 6–8 weeks',
    icon: <Server size={120} className="text-[#FF4800]" strokeWidth={1.2} />,
    cta: ['Book strategy call'],
    graphicLeft: false,
    number: '04',
  },
];

const whyCards = [
  {
    icon: <Diamond size={40} className="text-[#FF4800]" />,
    title: 'Automation-First, Always',
    body: 'Before we build feature one, we audit what can be removed or automated. Most agencies pad scope. We prune it — then automate what\'s left.',
  },
  {
    icon: <TrendingDown size={40} className="text-[#FF4800]" />,
    title: 'Weekly Shipping',
    body: 'One-week sprints with visible builds every Friday. You see real working code, approve Monday, we ship Tuesday. No black-box builds.',
  },
  {
    icon: <ShieldCheck size={40} className="text-[#FF4800]" />,
    title: 'Full Code Ownership',
    body: 'Zero vendor lock-in. Complete documentation. If we disappear tomorrow, your team runs and maintains every system we built.',
  },
];

const benefits = [
  { title: 'Weekly Shipping', description: 'One-week sprints with visible builds every Friday. You see real working code, not slide decks.', icon: TrendingUp },
  { title: 'Fixed-Price Quotes', description: 'No hourly billing, no scope creep. Fixed price after discovery — you know your investment upfront.', icon: CircleDollarSign },
  { title: 'Full Code Ownership', description: 'You own 100% of the code. Zero vendor lock-in. If we disappear tomorrow, your team runs it independently.', icon: Globe },
  { title: 'Priced for ROI', description: 'Every engagement includes projected time savings or revenue lift. If it doesn\'t pay for itself in 90 days, we don\'t recommend it.', icon: Users },
];

const processSteps = [
  { step: '01', title: 'Discovery', description: 'Deep audit of operations, bottlenecks, and tech stack. You get a written proposal in week 1.' },
  { step: '02', title: 'Build', description: 'Weekly sprints. Working builds every Friday. Feedback Monday. Ship Tuesday.' },
  { step: '03', title: 'Integrate', description: 'Integration testing with your existing tools. Documentation written as we go, not after.' },
  { step: '04', title: 'Handoff', description: 'Full code ownership transfer, team training, and 30-day go-live support included.' },
];

const faqItems = [
  {
    question: 'What\'s the first step to work with you?',
    answer: 'Book a 30-minute strategy call. We\'ll ask about your operations, biggest bottlenecks, and what you\'ve tried already. You\'ll walk away with a specific recommendation — whether or not you hire us. If it\'s a fit, we send a proposal within 48 hours.',
  },
  {
    question: 'Can you integrate with our existing tools (Salesforce, Shopify, etc.)?',
    answer: 'Yes. We build custom integrations or use platforms like Zapier/Make for standard connectors. During discovery, we audit your stack and design integration architecture. If you\'re worried about data silos, that\'s the first thing we solve.',
  },
  {
    question: 'How involved does our team need to be?',
    answer: 'Minimal. We handle 90% of the build. Your team provides 1–2 hours in week 1 (discovery), 30 minutes every Friday (sprint feedback), and 2 hours in week 6 (training & go-live). That\'s ~4 hours total.',
  },
  {
    question: 'What if scope expands mid-project?',
    answer: 'We freeze scope at the proposal. If your requirements change, we document the change and send an addendum quote. No surprise invoices. You approve before we add work.',
  },
  {
    question: 'Can you handle our enterprise security requirements?',
    answer: 'It depends. If you need ISO 27001, SOC 2, or HIPAA compliance, we can meet that. During discovery, we ask about compliance needs upfront so there are no surprises.',
  },
  {
    question: 'Do you offer ongoing support or just delivery?',
    answer: 'Both. Delivery includes 30–90 days of support. After that, optional monthly retainers for system optimization, feature enhancements, automation tweaks, and emergency support. Most clients do 6–12 month retainers.',
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
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const heroScrolled = useScrollGradient(100);
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-white dark:bg-[#0a0a14] px-6 py-20 md:py-0 text-center overflow-hidden">
      {/* Decorative floating geometric shapes */}
      <div className="pointer-events-none absolute top-[20%] right-[15%] h-[6px] w-[6px] rounded-full bg-[#FF4800]" style={{ opacity: 0.15, animation: 'float-dot-1 4s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute bottom-[25%] left-[10%] h-[8px] w-[8px] rounded-full bg-[#2B2358]" style={{ opacity: 0.1, animation: 'float-dot-2 5s ease-in-out infinite' }} />
      <div className="pointer-events-none absolute top-[60%] right-[8%] h-[4px] w-[4px] rounded-full bg-[#FF4800]" style={{ opacity: 0.2, animation: 'float-dot-3 3.5s ease-in-out infinite' }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="mb-4 flex flex-col items-center"
      >
        <span className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]">
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

      <h1
        className={`mt-4 max-w-5xl text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.0] transition-all ${heroScrolled ? 'text-gradient-brand' : 'text-[#1a1a2e] dark:text-[#f0f0f5]'}`}
        style={{ letterSpacing: '-2.05px', transitionDuration: '0.6s' }}
      >
        <TextReveal delay={0.3} stagger={0.04}>Four practice areas. One goal: Systems that run without you.</TextReveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-6 max-w-2xl text-lg text-[#6b7280] dark:text-[#d1d5db] sm:text-[20px]"
      >
        We design and deploy AI-powered workflows, custom software, and intelligent automation that replaces manual operations with structured systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease }}
        className="mt-8"
      >
        <MagneticButton>
          <button
            data-magnetic
            className="rounded-lg bg-[#FF4800] px-7 py-3.5 text-[13px] font-normal uppercase tracking-wider text-white transition-all hover:bg-[#e03e00] hover:shadow-[0_8px_24px_rgba(255,72,0,0.3)] btn-shine"
          >
            Start a Strategy Call
            <ArrowRight className="ml-2 inline-block w-4 h-4" />
          </button>
        </MagneticButton>
      </motion.div>
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
      className="service-card-glow relative flex items-center justify-center rounded-xl bg-[#f8f8fc] dark:bg-white/[0.04] p-8 md:p-12 lg:min-h-[340px] card-glow card-premium border border-[#e5e7eb] dark:border-white/[0.08] hover:shadow-[0_8px_30px_rgba(255,72,0,0.1)]"
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
      <span className="inline-block w-fit rounded-full bg-[#FF4800]/15 px-3 py-1 text-[11px] font-normal uppercase tracking-[0.2em] text-[#FF4800]">
        {service.badge}
      </span>
      <h3 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ lineHeight: 1.15, letterSpacing: '-1.5px' }}>
        {service.title}
      </h3>
      <p className="max-w-xl text-base leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">{service.body}</p>
      <ul className="mt-1 flex flex-col gap-2">
        {service.capabilities.map((cap, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#6b7280] dark:text-[#9ca3af]">
            <span className="mt-0.5 text-[#FF4800]">
              <ArrowRight size={14} />
            </span>
            {cap}
          </li>
        ))}
      </ul>

      {/* Outcomes */}
      <div className="mt-2 rounded-xl bg-[#FF4800]/[0.04] border border-[#FF4800]/10 px-4 py-3 flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#FF4800] mb-1">Typical Outcomes</p>
        {service.outcomes.map((outcome, i) => (
          <p key={i} className="flex items-center gap-2 text-sm text-[#4b5563] dark:text-[#d1d5db]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4800] flex-shrink-0" />
            {outcome}
          </p>
        ))}
      </div>

      {/* Investment badge */}
      <div className="flex items-center gap-2">
        <span className="inline-block rounded-lg bg-[#1a1a2e]/[0.06] dark:bg-white/[0.06] px-3 py-1.5 text-[12px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5]">
          Investment: {service.investment}
        </span>
      </div>

      <div className="mt-1 flex flex-wrap gap-3">
        {service.cta.map((cta, i) => (
          <MagneticButton key={i}>
            <button
              data-magnetic
              className={
                i === 0
                  ? 'rounded-lg bg-[#FF4800] px-5 py-2.5 text-[13px] font-normal uppercase tracking-wider text-white transition-all hover:bg-[#e03e00] hover:shadow-[0_6px_20px_rgba(255,72,0,0.3)] btn-shine'
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
      className={`relative flex flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:px-24 bg-[#f8f8fc] dark:bg-[#0a0a14] ${
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
        className="relative px-6 py-24 md:py-28"
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
            className="text-balance text-[clamp(1.75rem,4vw,2.75rem)] font-normal text-white mb-5" style={{ lineHeight: 1.0, letterSpacing: "-2.05px" }}
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
              className="rounded-lg bg-[#FF4800] px-8 py-4 text-[14px] font-normal uppercase tracking-widest text-white transition-all duration-200 hover:bg-[#e03e00] hover:shadow-[0_8px_32px_rgba(255,72,0,0.3)] hover:scale-[1.02]"
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
    <section className="bg-white dark:bg-[#0a0a14] px-6 py-24 relative section-glow-bottom">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-30" />
      <div className="mx-auto max-w-6xl text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-4 text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]"
        >
          Why Straveda
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-16 text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyCards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="relative flex flex-col items-start gap-4 rounded-xl bg-white dark:bg-white/[0.03] p-6 md:p-8 border border-[#e5e7eb] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#FF4800]/20 overflow-hidden"
            >
              {/* Decorative step number behind card */}
              <span className="absolute -top-2 -right-2 text-[80px] font-bold leading-none select-none pointer-events-none text-[#FF4800]" style={{ opacity: 0.04 }}>
                0{i + 1}
              </span>
              {card.icon}
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
/*  FAQ Accordion Section                                              */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-[#f8f8fc] dark:bg-[#0a0a14] px-4 sm:px-6 py-24 section-glow-top relative">
      <div className="mx-auto max-w-3xl relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ lineHeight: 0.95, letterSpacing: "-2.05px" }}
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
                className="faq-item-hover rounded-xl border border-[#e5e7eb] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] transition-colors hover:border-[#FF4800]/20 shadow-sm"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-normal leading-[1.5] text-[#1a1a2e] dark:text-[#f0f0f5]">
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
                      <p className="px-6 pb-5 text-[16px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">
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
    name: 'Next.js',
    description: 'High-performance React framework for web applications. Sub-second loads, SEO-ready, deployed to edge.',
    icon: <Code size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'OpenAI GPT-4o',
    description: 'GPT-class models for language understanding, AI agents, and intelligent workflow automation.',
    icon: <Network size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'AWS / GCP / Azure',
    description: 'Cloud infrastructure selected based on your existing setup for reliability and scalability.',
    icon: <Cloud size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Reliable, scalable relational database for structured business data and analytics.',
    icon: <Database size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Docker',
    description: 'Containerization for consistent, reproducible deployments across any environment.',
    icon: <Container size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Vercel',
    description: 'Global edge deployment for web applications with instant rollbacks and preview environments.',
    icon: <Server size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Zapier / Make',
    description: 'No-code integration platforms for connecting legacy tools when custom APIs aren\'t needed.',
    icon: <Layers size={32} className="text-[#FF4800]" />,
  },
  {
    name: 'Custom LLMs',
    description: 'Fine-tuned language models trained on your specific data, contracts, and business context.',
    icon: <Shield size={32} className="text-[#FF4800]" />,
  },
];

const techCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Why Choose Straveda Section (Benefits Grid)                          */
/* ------------------------------------------------------------------ */

function WhyChooseSection() {
  return (
    <section className="bg-[#f8f8fc] dark:bg-[#0a0a14] px-6 py-24 relative">
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-3 text-center text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]"
        >
          WHY STRAVEDA
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-14 text-center text-[#1a1a2e] dark:text-[#f0f0f5] font-normal"
          style={{ fontSize: '56px', lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
              className="card-premium flex flex-col items-start gap-4 rounded-xl bg-white dark:bg-white/[0.03] p-6 border border-[#e5e7eb] dark:border-white/[0.08]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(255,72,0,0.08)' }}>
                <card.icon size={24} className="text-[#FF4800]" />
              </div>
              <h4 className="text-[18px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">{card.title}</h4>
              <p className="text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">{card.description}</p>
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
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

function OurApproachSection() {
  return (
    <section className="bg-white dark:bg-[#0a0a14] px-6 py-24 relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF4800]/[0.03] blur-3xl" />
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-3 text-center text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]"
        >
          OUR APPROACH
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mb-16 text-center font-normal text-[#1a1a2e] dark:text-[#f0f0f5]"
          style={{ fontSize: '56px', lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FF4800]/20 bg-white dark:bg-[#0a0a14]">
                  <span className="text-[20px] font-bold text-[#FF4800]" style={{ opacity: 0.9 }}>{item.step}</span>
                </div>
                <h3 className="mb-2 text-[20px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">{item.title}</h3>
                <p className="text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af] max-w-[200px]">{item.description}</p>
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
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]/20 bg-white dark:bg-[#0a0a14]">
                  <span className="text-[12px] font-bold text-[#FF4800]" style={{ opacity: 0.9 }}>{item.step}</span>
                </div>
                <div className="pt-0.5">
                  <h3 className="mb-1 text-[20px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">{item.title}</h3>
                  <p className="text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">{item.description}</p>
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
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#FF4800]/20 bg-white dark:bg-[#0a0a14]">
                  <span className="text-[12px] font-bold text-[#FF4800]" style={{ opacity: 0.9 }}>{item.step}</span>
                </div>
                <div className="pt-0.5">
                  <h3 className="mb-1 text-[18px] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]">{item.title}</h3>
                  <p className="text-[15px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">{item.description}</p>
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
    <section className="bg-white dark:bg-[#0a0a14] py-24 relative">
      {/* Subtle dot-grid-dense pattern background */}
      <div className="absolute inset-0 dot-grid-dense pointer-events-none opacity-20" />
      <div className="container-wide px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 text-[11px] font-normal uppercase tracking-[0.25em] text-[#FF4800]"
          >
            TECHNOLOGY STACK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ lineHeight: 0.95, letterSpacing: "-2.05px" }}
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
              className="card-glow group relative overflow-hidden rounded-xl p-6 bg-white dark:bg-white/[0.04] border border-[#e5e7eb] dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#FF4800]/20"
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
                <h3 className="text-base font-normal text-[#1a1a2e] dark:text-[#f0f0f5] leading-tight">
                  {tech.name}
                </h3>
                {/* Description */}
                <p className="text-sm leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">
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
    <main className="min-h-screen bg-white dark:bg-[#0a0a14]">
      <ServicesPageStyles />
      <HeroSection />

      {/* Animated Hover Modal — row-based service showcase with GSAP mouse-following */}
      <AnimatedHoverModal />

      {/* Subtle gradient transition between animated modal and services grid */}
      <div className="flex flex-col items-center gap-4 py-8" aria-hidden="true">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#FF4800]/25 to-transparent" />
      </div>

      <ServicesHoverModal onNavigate={onNavigate} />

      <WhyStravedaSection />
      <OurApproachSection />
      <FAQSection />
      <ServiceComparison />
      <TechStackSection />
      <CTABanner onNavigate={onNavigate} />
    </main>
  );
}

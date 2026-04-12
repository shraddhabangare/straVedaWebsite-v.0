'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Braces, Compass, ClipboardCheck, Server, Diamond, TrendingDown, ShieldCheck, ArrowRight, ChevronDown, Container, Cloud, Database, Layers, Network, Code, Shield } from 'lucide-react';
import MagneticButton from '@/components/straveda/MagneticButton';
import TextReveal from '@/components/straveda/TextReveal';
import { useScrollGradient } from '@/hooks/useScrollGradient';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceBlock {
  id: string;
  badge: string;
  title: string;
  body: string;
  capabilities: string[];
  icon: React.ReactNode;
  cta: string[];
  graphicLeft: boolean;
}

const services: ServiceBlock[] = [
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
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center bg-black px-6 text-center">
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

      <h1 className={`mt-4 max-w-5xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight transition-all ${heroScrolled ? 'text-gradient-brand' : 'text-white'}`}
        style={{ transitionDuration: '0.6s' }}
      >
        <TextReveal delay={0.3} stagger={0.04}>Comprehensive enterprise services built to modernize and deliver.</TextReveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="mt-6 max-w-2xl text-lg text-[#A1A1A1] sm:text-[20px]"
      >
        From architecture to execution — we cover the full stack of enterprise IT transformation.
      </motion.p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Detail Block                                               */
/* ------------------------------------------------------------------ */

function ServiceBlock({ service }: { service: ServiceBlock; index: number }) {
  const direction = service.graphicLeft ? -1 : 1;

  const Graphic = (
    <motion.div
      custom={direction}
      variants={itemVariants}
      className="flex items-center justify-center rounded-xl bg-[#2B2358] p-12 lg:min-h-[340px] card-glow bg-noise-subtle"
    >
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
      <h3 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-tight text-white">
        {service.title}
      </h3>
      <p className="max-w-xl text-base leading-relaxed text-[#A1A1A1]">{service.body}</p>
      <ul className="mt-1 flex flex-col gap-2">
        {service.capabilities.map((cap, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[#D4D4D4]">
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
      className={`flex flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:px-24 ${
        service.graphicLeft ? '' : 'lg:flex-row-reverse'
      }`}
    >
      <div className="w-full lg:w-1/2">{service.graphicLeft ? Graphic : Content}</div>
      <div className="w-full lg:w-1/2">{service.graphicLeft ? Content : Graphic}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Straveda Section                                               */
/* ------------------------------------------------------------------ */

function WhyStravedaSection() {
  return (
    <section className="bg-black px-6 py-24 relative section-glow-bottom">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />
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
          className="mb-14 text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-white"
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
              className="flex flex-col items-start gap-4 rounded-xl bg-[#2B2358] p-8 card-glow"
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
/*  FAQ Accordion Section                                              */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-black px-6 py-24 section-glow-top relative bg-noise-subtle">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />
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
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-medium text-white"
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
                className="rounded-xl border border-white/[0.06] bg-[#2B2358] transition-colors hover:border-[#FF4800]/30 card-glow"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-medium leading-snug text-white">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex-shrink-0 text-[#A1A1A1]"
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
                      <p className="px-6 pb-5 text-[16px] leading-relaxed text-[#A1A1A1]">
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

function TechStackSection() {
  return (
    <section className="gradient-mesh-indigo py-20 relative">
      {/* Subtle dot-grid-dense pattern background */}
      <div className="absolute inset-0 dot-grid-dense pointer-events-none" />
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
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-medium text-white"
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
              className="card-glow group relative overflow-hidden rounded-xl p-6"
              style={{
                background: 'rgba(43, 35, 88, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Subtle gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 72, 0, 0.05) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10 flex flex-col gap-4">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF4800]/10 transition-colors group-hover:bg-[#FF4800]/20">
                  {tech.icon}
                </div>
                {/* Name */}
                <h3 className="text-base font-semibold text-white leading-tight">
                  {tech.name}
                </h3>
                {/* Description */}
                <p className="text-sm leading-relaxed text-[#A1A1A1]">
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

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />

      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      <WhyStravedaSection />
      <FAQSection />
      <TechStackSection />
    </main>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTheme } from 'next-themes';
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
  Plus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ParallaxShowcase from '@/components/sections/ParallaxShowcase';
import AnimatedRingProgress from '@/components/shared/AnimatedRingProgress';
import AnimatedHero from '@/components/sections/AnimatedHero';
import SubscribeSection from '@/components/sections/SubscribeSection';
import WaveDivider from '@/components/sections/WaveDivider';
import { MarqueeLogoScroller } from '@/components/sections/MarqueeLogoScroller';

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
    const proxy = { val: 0 };
    const tween = gsap.to(proxy, {
      val: target,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => setCount(Math.round(proxy.val)),
      onComplete: () => setCount(target),
    });
    return () => { tween.kill(); };
  }, [inView, target]);

  return (
    <span ref={ref} className="text-[#1a1a2e] dark:text-[#f0f0f5]" style={{ fontSize: '96px', fontWeight: 600, lineHeight: 1 }}>
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
    const proxy = { val: 0 };
    const tween = gsap.to(proxy, {
      val: target,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        setCount(decimals > 0 ? parseFloat(proxy.val.toFixed(decimals)) : Math.round(proxy.val));
      },
      onComplete: () => setCount(target),
    });
    return () => { tween.kill(); };
  }, [inView, target, decimals]);

  return (
    <span ref={ref} className="counter-display text-[#1a1a2e]" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>
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
    const proxy = { val: 0 };
    const tween = gsap.to(proxy, {
      val: target,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => setCount(Math.round(proxy.val)),
      onComplete: () => setCount(target),
    });
    return () => { tween.kill(); };
  }, [inView, target]);

  return (
    <span ref={ref} className="counter-hover-gradient text-[28px] font-bold text-[#1a1a2e] dark:text-[#f0f0f5]">
      {count}{suffix}
    </span>
  );
}

const testimonials = [
  {
    name: 'James R.',
    role: 'Senior VP',
    company: 'Accenture',
    quote: 'Straveda transformed our legacy infrastructure in record time. Their enterprise architecture expertise is unmatched.',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    role: 'Director of Engineering',
    company: 'Deloitte',
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
    role: 'CTO',
    company: 'IBM Global Services',
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
    role: 'VP of Technology',
    company: 'Northrop Grumman',
    quote: 'Straveda\'s technology strategy roadmap transformed our IT investment approach. We now have a clear 3-year vision aligned with business outcomes.',
    stars: 5,
  },
  {
    name: 'Michael B.',
    role: 'CIO',
    company: 'State of Texas',
    quote: 'The enterprise architecture modernization eliminated our legacy debt. We\'re now running 99.99% uptime across all critical systems.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    role: 'Director of Operations',
    company: 'Deloitte',
    quote: 'Their management consulting team embedded seamlessly with our staff. Knowledge transfer was exceptional — we\'re now self-sufficient.',
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
          className="testimonial-chevron absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
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
        <div className="mx-12 w-full" style={{ maxWidth: '640px' }}>
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
                className="testimonial-quote-text mb-8 text-[20px] italic leading-[1.8]"
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
          className="testimonial-chevron absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
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
            className="rounded-full"
            animate={{
              scale: i === currentIndex ? 1.4 : 1,
              background: i === currentIndex ? '#FF4800' : (isDark ? 'rgba(255,255,255,0.2)' : '#d1d5db'),
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.5 }}
            style={{
              width: '8px',
              height: '8px',
            }}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const faqs = [
  {
    question: 'What services does Straveda Tech offer?',
    answer: 'We provide AI automation, custom software development, cloud & DevOps, cybersecurity, and data analytics solutions built to reduce manual work and scale your operations.',
  },
  {
    question: 'How can AI automation benefit my business?',
    answer: 'AI automation reduces repetitive tasks, lowers costs, and improves decision-making.Common use cases include lead qualification, customer support, and workflow automation.',
  },
  {
    question: 'Do you work with existing IT teams?',
    answer: 'Absolutely. We embed within your teams to upskill, mentor, and transfer knowledge. Our goal is to make your organization self-sufficient.',
  },
  {
    question: 'What makes Straveda different?',
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

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      id="section-faq"
      className="bg-[#f8f8fc] dark:bg-[#0a0a14] px-4 sm:px-6 py-24 section-glow-top relative"
    >
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
            className="text-[clamp(1.75rem,4vw,2.625rem)] font-normal text-[#1a1a2e] dark:text-[#f0f0f5]"
            style={{ lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="rounded-xl border border-[#e5e7eb] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] transition-colors hover:border-[#FF4800]/20 shadow-sm"
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-normal leading-[1.5] text-[#1a1a2e] dark:text-[#f0f0f5]">
                    {faq.question}
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
                      key={`answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[16px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]">
                        {faq.answer}
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

export default function HomePage({ onNavigate }: HomePageProps) {
  const heroScrolled = useScrollGradient(100);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';


  return (
    <div>
      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1A — ANIMATED WEBGL HERO (light theme) */}
      {/* ═══════════════════════════════════════════════ */}
      <div id="section-hero">
        <AnimatedHero onNavigate={onNavigate} />
      </div>


      {/* ═══════════════════════════════════════════════ */}
      {/* TECHNOLOGY PARTNERS — MARQUEE SCROLLER          */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.section
        id="section-partners"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
        className="py-24 bg-white dark:bg-[#0a0a14]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MarqueeLogoScroller
            title="Technology Partners"
            description="Straveda partners with the world's leading enterprise technology providers to deliver modern, open-standards solutions."
            speed="slow"
            logos={[
              { src: 'https://svgl.app/library/microsoft-azure.svg', alt: 'Microsoft Azure', gradient: { from: '#0078D4', via: '#00BCF2', to: '#50E6FF' } },
              { src: 'https://svgl.app/library/aws.svg', alt: 'AWS', gradient: { from: '#FF9900', via: '#FFB84D', to: '#FFD700' } },
              { src: 'https://svgl.app/library/google-cloud.svg', alt: 'Google Cloud', gradient: { from: '#4285F4', via: '#34A853', to: '#FBBC05' } },
              { src: 'https://svgl.app/library/red-hat.svg', alt: 'Red Hat', gradient: { from: '#EE0000', via: '#CC0000', to: '#990000' } },
              { src: 'https://svgl.app/library/docker.svg', alt: 'Docker', gradient: { from: '#2496ED', via: '#0db7ed', to: '#086dd7' } },
              { src: 'https://svgl.app/library/kubernetes.svg', alt: 'Kubernetes', gradient: { from: '#326CE5', via: '#5585E8', to: '#7BA3ED' } },
              { src: 'https://svgl.app/library/linux-foundation.svg', alt: 'Linux', gradient: { from: '#333333', via: '#555555', to: '#111111' } },
              { src: 'https://svgl.app/library/ibm.svg', alt: 'IBM', gradient: { from: '#1F70C1', via: '#0530AD', to: '#054ADA' } },
              { src: 'https://svgl.app/library/salesforce.svg', alt: 'Salesforce', gradient: { from: '#00A1E0', via: '#0176D3', to: '#032D60' } },
              { src: 'https://svgl.app/library/oracle.svg', alt: 'Oracle', gradient: { from: '#F80000', via: '#C74634', to: '#A61108' } },
              { src: 'https://svgl.app/library/sap.svg', alt: 'SAP', gradient: { from: '#0070F2', via: '#0FAAFF', to: '#005FCE' } },
              { src: 'https://svgl.app/library/vmware.svg', alt: 'VMware', gradient: { from: '#607078', via: '#96A2AA', to: '#464F54' } },
              { src: 'https://svgl.app/library/cisco.svg', alt: 'Cisco', gradient: { from: '#1BA0D7', via: '#049FD9', to: '#005073' } },
              { src: 'https://svgl.app/library/intel.svg', alt: 'Intel', gradient: { from: '#0071C5', via: '#0095D9', to: '#00BCFF' } },
              { src: 'https://svgl.app/library/nvidia.svg', alt: 'NVIDIA', gradient: { from: '#76B900', via: '#5F9900', to: '#3D6400' } },
            ]}
            className="border-0 rounded-none bg-transparent"
            style={{ background: 'transparent' }}
          />
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1B — SERVICES TEASER                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="section-services"
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
            className="mb-16"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              OUR SERVICES
            </p>
            <h2
              className="font-normal heading-gradient"
              style={{ fontSize: '56px', lineHeight: 0.95, letterSpacing: '-2.05px', maxWidth: '580px' }}
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
            <motion.div
              variants={cardVariants}
              className="card-hover glow-border card-premium rounded-xl p-8"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, rgba(255,72,0,0.01) 50%, #FFFFFF 100%)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(145deg, rgba(255,72,0,0.08) 0%, rgba(255,72,0,0.04) 100%)' }}>
                <Braces className="h-7 w-7 text-[#FF4800]" />
              </div>
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                ARCHITECTURE
              </span>
              <h3
                className="mb-3 font-normal text-[#1a1a2e]"
                style={{ fontSize: '32px', lineHeight: 1.15 }}
              >
                Enterprise Architecture
              </h3>
              <p className="mb-5 text-[16px] leading-[1.5]" style={{ color: '#6b7280' }}>
                Modernize your application portfolio with adaptive,
                open-standards architecture that scales.
              </p>
              <button
                data-magnetic
                onClick={() => onNavigate('services')}
                className="group link-hover-underline flex items-center gap-1 text-[14px] transition-colors duration-200"
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

            <motion.div
              variants={cardVariants}
              className="card-hover glow-border card-premium rounded-xl p-8"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, rgba(255,72,0,0.01) 50%, #FFFFFF 100%)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(145deg, rgba(255,72,0,0.08) 0%, rgba(255,72,0,0.04) 100%)' }}>
                <Compass className="h-7 w-7 text-[#FF4800]" />
              </div>
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                STRATEGY
              </span>
              <h3
                className="mb-3 font-normal text-[#1a1a2e]"
                style={{ fontSize: '32px', lineHeight: 1.15 }}
              >
                Technology Strategy
              </h3>
              <p className="mb-5 text-[16px] leading-[1.5]" style={{ color: '#6b7280' }}>
                Align IT investments with business goals to accelerate time to
                market and increase product innovation.
              </p>
              <button
                data-magnetic
                onClick={() => onNavigate('services')}
                className="group link-hover-underline flex items-center gap-1 text-[14px] transition-colors duration-200"
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

            <motion.div
              variants={cardVariants}
              className="card-hover glow-border card-premium rounded-xl p-8"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, rgba(255,72,0,0.01) 50%, #FFFFFF 100%)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(145deg, rgba(255,72,0,0.08) 0%, rgba(255,72,0,0.04) 100%)' }}>
                <ClipboardCheck className="h-7 w-7 text-[#FF4800]" />
              </div>
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                MANAGEMENT
              </span>
              <h3
                className="mb-3 font-normal text-[#1a1a2e]"
                style={{ fontSize: '32px', lineHeight: 1.15 }}
              >
                Management Consulting
              </h3>
              <p className="mb-5 text-[16px] leading-[1.5]" style={{ color: '#6b7280' }}>
                Expert Product, Program &amp; Project management through
                meticulous planning and execution.
              </p>
              <button
                onClick={() => onNavigate('services')}
                className="group link-hover-underline flex items-center gap-1 text-[14px] transition-colors duration-200"
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

            <motion.div
              variants={cardVariants}
              className="card-hover glow-border card-premium rounded-xl p-8"
              style={{
                background: 'linear-gradient(145deg, #FFFFFF 0%, rgba(255,72,0,0.01) 50%, #FFFFFF 100%)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(145deg, rgba(255,72,0,0.08) 0%, rgba(255,72,0,0.04) 100%)' }}>
                <Server className="h-7 w-7 text-[#FF4800]" />
              </div>
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-medium text-white"
                style={{ background: '#FF4800' }}
              >
                SOFTWARE
              </span>
              <h3
                className="mb-3 font-normal text-[#1a1a2e]"
                style={{ fontSize: '32px', lineHeight: 1.15 }}
              >
                Software Solutions
              </h3>
              <p className="mb-5 text-[16px] leading-[1.5]" style={{ color: '#6b7280' }}>
                Red Hat Enterprise Middleware and virtualization to lower total
                cost of ownership at enterprise scale.
              </p>
              <button
                data-magnetic
                onClick={() => onNavigate('services')}
                className="group link-hover-underline flex items-center gap-1 text-[14px] transition-colors duration-200"
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
          </motion.div>
        </div>
      </section>

      {/* Wave divider — Services Teaser to Bento Grid */}
      <WaveDivider color={isDark ? '#12121e' : '#f8f8fc'} flip />

      {/* ═══════════════════════════════════════════════ */}
      {/* WHAT SETS US APART — BENTO GRID                  */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="section-capabilities" className="py-24 section-glow-top dot-grid-dense" style={{ background: isDark ? '#12121e' : '#f8f8fc' }}>
        {/* Grid pattern overlay for texture */}
        <div className="pointer-events-none absolute inset-0 grid-pattern" />
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
              WHAT SETS US APART
            </p>
            <h2
              className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]"
              style={{ lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
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
                className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 ${item.size === 'large' ? 'md:col-span-2 lg:col-span-2 p-8 bento-large-border' : ''}`}
                style={{
                  background: isDark ? '#12121e' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                }}
                onMouseEnter={(e) => {
                  const isLarge = item.size === 'large';
                  e.currentTarget.style.borderColor = isLarge ? 'rgba(255,72,0,0.35)' : 'rgba(255,72,0,0.2)';
                  e.currentTarget.style.boxShadow = isLarge
                    ? '0 0 0 1px rgba(255,72,0,0.15), 0 8px 30px rgba(255,72,0,0.12), inset 0 1px 0 rgba(255,72,0,0.05)'
                    : '0 8px 30px rgba(255,72,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const iconContainer = e.currentTarget.querySelector('.bento-icon-wrap');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1.1)';
                  const dot = e.currentTarget.querySelector('.bento-hover-dot');
                  if (dot) (dot as HTMLElement).style.opacity = '1';
                  const glow = e.currentTarget.querySelector('.bento-gradient-glow');
                  if (glow) (glow as HTMLElement).style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const iconContainer = e.currentTarget.querySelector('.bento-icon-wrap');
                  if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1)';
                  const dot = e.currentTarget.querySelector('.bento-hover-dot');
                  if (dot) (dot as HTMLElement).style.opacity = '0';
                  const glow = e.currentTarget.querySelector('.bento-gradient-glow');
                  if (glow) (glow as HTMLElement).style.opacity = '0';
                }}
              >
                {/* Brand orange dot — top-right corner on hover */}
                <div
                  className="bento-hover-dot pointer-events-none absolute top-3 right-3 h-[6px] w-[6px] rounded-full transition-opacity duration-300"
                  style={{ background: '#FF4800', opacity: 0 }}
                />
                {/* Large card gradient border glow */}
                {item.size === 'large' && (
                  <div
                    className="bento-gradient-glow pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,72,0,0.04) 0%, transparent 40%, rgba(255,72,0,0.02) 100%)',
                    }}
                  />
                )}
                <div
                  className="bento-icon-wrap mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300"
                  style={{ background: isDark ? 'rgba(255,72,0,0.12)' : 'rgba(255,72,0,0.08)' }}
                >
                  <item.icon className="h-6 w-6" style={{ color: '#FF4800' }} />
                </div>
                <h3
                  className="mb-2 font-normal text-[clamp(1.25rem,2.5vw,2rem)]"
                  style={{ lineHeight: 1.15, color: isDark ? '#f0f0f5' : '#1a1a2e' }}
                >
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
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
        id="section-about"
        className="relative py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]"
      >
        {/* Decorative orange dot pattern */}
        <div
          className="pointer-events-none absolute top-8 right-8 h-48 w-48 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,72,0,0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:px-8">
          {/* LEFT — 40% */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex w-full flex-col justify-center lg:w-[40%]"
          >
            <div className="counter-hover-gradient inline-block"><Counter target={14} suffix="+" /></div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mt-3 h-[3px] w-8 rounded-full"
              style={{ background: '#FF4800', transformOrigin: 'left' }}
            />
            <p className="mt-6 text-[16px] text-[#6b7280] dark:text-[#9ca3af]">
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
              <span className="text-[15px] text-[#6b7280] dark:text-[#9ca3af]">
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
              className="text-[20px] leading-[1.7] text-[#1a1a2e] dark:text-[#d1d5db]"
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
                <StatCounter target={7} suffix="" />
                <span
                  className="mt-1 text-[13px] text-[#6b7280] dark:text-[#9ca3af]"
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
                <StatCounter target={100} suffix="%" />
                <span
                  className="mt-1 text-[13px] text-[#6b7280] dark:text-[#9ca3af]"
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
                <span className="counter-hover-gradient text-[28px] font-bold text-[#1a1a2e] dark:text-[#f0f0f5]">
                  Cost-Effective
                </span>
                <span
                  className="mt-1 text-[13px] text-[#6b7280] dark:text-[#9ca3af]"
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
        id="section-process"
        className="relative py-24 bg-white dark:bg-[#0a0a14] overflow-hidden"
      >
        {/* Background orange radial glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse at top, rgba(255,72,0,0.05) 0%, transparent 65%)',
          }}
        />
        {/* Dot grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #FF4800 1px, transparent 1px)',
            backgroundSize: '32px 32px',
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
              className="mb-4 text-[11px] font-medium uppercase tracking-widest"
              style={{ color: '#FF4800', fontWeight: 400 }}
            >
              HOW WE WORK
            </p>
            <div
              className="mb-8"
              style={{ width: '40px', height: '2px', background: '#FF4800', borderRadius: '1px' }}
            />
            <h2
              className="font-normal heading-gradient"
              style={{ fontSize: 'clamp(40px,5vw,60px)', lineHeight: 0.95, letterSpacing: '-2.05px', maxWidth: '680px' }}
            >
              A proven process for enterprise transformation.
            </h2>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative grid grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-4"
          >
            {/* Desktop top connecting line — animates in */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-none absolute top-[38px] left-0 hidden h-px xl:block"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #FF4800 0%, rgba(255,72,0,0.12) 100%)',
                transformOrigin: 'left',
              }}
            />

            {[
              {
                num: '01', icon: <Search className="h-5 w-5" style={{ color: '#FF4800' }} />,
                title: 'Discovery',
                desc: 'We assess your current landscape, identify pain points, and define success metrics.',
              },
              {
                num: '02', icon: <Target className="h-5 w-5" style={{ color: '#FF4800' }} />,
                title: 'Strategy',
                desc: 'We craft a tailored roadmap aligned with your business goals and budget.',
              },
              {
                num: '03', icon: <Zap className="h-5 w-5" style={{ color: '#FF4800' }} />,
                title: 'Execution',
                desc: 'Our experts implement solutions using proven frameworks and agile delivery.',
              },
              {
                num: '04', icon: <TrendingUp className="h-5 w-5" style={{ color: '#FF4800' }} />,
                title: 'Optimize',
                desc: 'We measure results, refine approaches, and ensure long-term sustainability.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                variants={{
                  hidden: { opacity: 0, y: 36 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
                }}
                className="group relative flex flex-col pt-12 pb-12 xl:pr-10"
                style={{
                  borderTop: '2px solid transparent',
                  borderImage: 'linear-gradient(90deg,#FF4800,rgba(255,72,0,0.2)) 1',
                  paddingLeft: i === 0 ? 0 : undefined,
                }}
              >
                {/* Step number badge */}
                <span
                  className="mb-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{
                    background: 'rgba(255,72,0,0.08)',
                    color: '#FF4800',
                    border: '1px solid rgba(255,72,0,0.2)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {step.num}
                </span>

                {/* Watermark number */}
                <span
                  className="pointer-events-none absolute -bottom-2 right-4 select-none font-bold leading-none"
                  style={{
                    fontSize: '88px',
                    color: '#FF4800',
                    opacity: 0.05,
                    letterSpacing: '-4px',
                  }}
                >
                  {step.num}
                </span>

                {/* Icon + Title row */}
                <div className="mb-4 flex items-center gap-3">
                  {step.icon}
                  <h3
                    className="font-normal text-[#1a1a2e] dark:text-[#f0f0f5]"
                    style={{ fontSize: '32px', lineHeight: 1.15, letterSpacing: '-0.5px', fontWeight: 400 }}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className="text-[16px] leading-[1.5] text-[#6b7280] dark:text-[#9ca3af]"
                  style={{ maxWidth: '240px' }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════ */}
      {/* RESULTS THAT SPEAK — METRICS BANNER               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative py-24 gradient-mesh-indigo section-glow-top">
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
              className="font-normal text-[#1a1a2e]"
              style={{ fontSize: '56px', lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
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

      {/* Wave divider — ImpactMetrics to Testimonials */}
      <WaveDivider color="#FFFFFF" flip />

      {/* ═══════════════════════════════════════════════ */}
      {/* TESTIMONIALS — CLIENT FEEDBACK                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        id="section-testimonials"
        className="relative overflow-hidden py-24 section-glow-top"
        style={{ background: '#f8f8fc' }}
      >
        {/* Decorative radial gradient — subtle orange glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(255,72,0,0.04) 0%, transparent 50%)',
          }}
        />
        {/* Decorative circle — top-right corner */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full"
          style={{ background: 'rgba(255,72,0,0.05)' }}
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
              CLIENT FEEDBACK
            </p>
            <h2
              className="font-normal text-[#1a1a2e]"
              style={{ fontSize: '56px', lineHeight: 0.95, letterSpacing: '-2.05px' }}
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
        className="py-24 section-glow-top"
        style={{ background: isDark ? '#12121e' : '#f8f8fc' }}
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
              className="font-normal heading-gradient text-[clamp(2rem,5vw,3.5rem)]"
              style={{ lineHeight: 0.95, letterSpacing: '-2.05px', maxWidth: '580px' }}
            >
              Real results for real enterprises.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280', maxWidth: '520px' }}>
              From financial services to government agencies, we deliver measurable outcomes that transform enterprise operations.
            </p>
          </motion.div>

          {/* Case Study Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Card 1 — Fortune 500 Financial Services */}
            <motion.div
              variants={cardVariants}
              className="card-glow hover-lift rounded-xl transition-all duration-300"
              style={{
                background: isDark ? '#12121e' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;
              }}
            >
              <div className="p-6 md:p-8">
                {/* Card number */}
                <span
                  className="mb-2 block"
                  style={{ fontSize: 'clamp(40px, 10vw, 64px)', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
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
                  className="mb-6 font-normal text-[clamp(1.25rem,2.5vw,2rem)]"
                  style={{ lineHeight: 1.15, color: isDark ? '#f0f0f5' : '#1a1a2e' }}
                >
                  Fortune 500 Financial Services
                </h3>
                {/* Challenge */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Challenge</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Legacy middleware causing 60% downtime during peak hours
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Enterprise Architecture modernization with Red Hat middleware
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    99.9% uptime, 40% cost reduction, 3x faster deployments
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
                  >
                    99.9% uptime
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
                  >
                    -40% cost
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
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
                background: isDark ? '#12121e' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;
              }}
            >
              <div className="p-6 md:p-8">
                {/* Card number */}
                <span
                  className="mb-2 block"
                  style={{ fontSize: 'clamp(40px, 10vw, 64px)', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
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
                  className="mb-6 font-normal text-[clamp(1.25rem,2.5vw,2rem)]"
                  style={{ lineHeight: 1.15, color: isDark ? '#f0f0f5' : '#1a1a2e' }}
                >
                  Global Healthcare Provider
                </h3>
                {/* Challenge */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Challenge</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Fragmented IT systems across 12 regional offices
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Technology Strategy roadmap + API integration platform
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Unified platform, 65% faster data sharing, $2.1M annual savings
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
                  >
                    Unified platform
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
                  >
                    65% faster
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
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
                background: isDark ? '#12121e' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,72,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;
              }}
            >
              <div className="p-6 md:p-8">
                {/* Card number */}
                <span
                  className="mb-2 block"
                  style={{ fontSize: 'clamp(40px, 10vw, 64px)', fontWeight: 700, color: '#FF4800', opacity: 0.15, lineHeight: 1 }}
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
                  className="mb-6 font-normal text-[clamp(1.25rem,2.5vw,2rem)]"
                  style={{ lineHeight: 1.15, color: isDark ? '#f0f0f5' : '#1a1a2e' }}
                >
                  Government Agency
                </h3>
                {/* Challenge */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Challenge</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Aging infrastructure with critical security vulnerabilities
                  </p>
                </div>
                {/* Solution */}
                <div className="mb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <ArrowRight className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Solution</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Management Consulting + Agile PMO delivery framework
                  </p>
                </div>
                {/* Results */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: '#FF4800' }} />
                    <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }}>Results</span>
                  </div>
                  <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Zero security incidents, 50% faster delivery cycles, 100% compliance
                  </p>
                </div>
                {/* Metric badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
                  >
                    Zero incidents
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
                  >
                    50% faster
                  </span>
                  <span
                    className="rounded-lg px-3 py-1.5 text-[13px] font-semibold"
                    style={{ color: isDark ? '#f0f0f5' : '#1a1a2e', background: isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.12)' }}
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
      {/* BACK TO TOP LINK                                 */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="flex justify-center py-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}
          className="link-hover-underline text-[14px] cursor-pointer"
          style={{ color: '#6b7280', background: 'none', border: 'none', padding: 0 }}
        >
          Back to top ↑
        </button>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* FAQ SECTION                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════ */}
      {/* SUBSCRIBE SECTION                                */}
      {/* ═══════════════════════════════════════════════ */}
      <SubscribeSection onNavigate={onNavigate} />

      {/* ═══════════════════════════════════════════════ */}
      {/* FINAL CTA BANNER                                 */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-32"
        style={{ background: 'linear-gradient(135deg, #0e0c1c 0%, #1a1535 50%, #0e0c1c 100%)' }}
      >
        {/* Dot grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Orange radial glow — center */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '900px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(255,72,0,0.18) 0%, rgba(255,72,0,0.06) 35%, transparent 65%)',
          }}
        />
        {/* Top edge orange line */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.6) 50%, transparent)' }}
        />
        {/* Bottom edge orange line */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,72,0,0.3) 50%, transparent)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center lg:px-8"
        >
          {/* Eyebrow label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: '#FF4800' }}
          >
            Let&apos;s Build Together
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-normal text-white"
            style={{ fontSize: 'clamp(40px,5.5vw,68px)', lineHeight: 0.95, letterSpacing: '-2.05px' }}
          >
            Ready to modernize{' '}
            <span style={{ color: '#FF4800' }}>your enterprise?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-6 text-[18px] leading-[1.5]"
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px', fontWeight: 400 }}
          >
            Let Straveda architect your path forward — from discovery to long-term optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => onNavigate('contact')}
              className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-[14px] font-normal uppercase tracking-widest text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,72,0,0.4)]"
              style={{ background: '#FF4800', fontWeight: 400 }}
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[14px] font-normal uppercase tracking-widest transition-all duration-200 hover:bg-white/10"
              style={{
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              View case studies
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 text-[13px]"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Or reach us at{' '}
            <a
              href="mailto:info@straveda.com"
              className="transition-colors duration-200"
              style={{ color: 'rgba(255,72,0,0.7)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4800')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,72,0,0.7)')}
            >
              info@straveda.com
            </a>
          </motion.p>
        </motion.div>
      </section>

    </div>
  );
}

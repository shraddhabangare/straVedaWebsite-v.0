'use client';

import { useRef, useEffect, useState } from 'react';
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
import ParallaxShowcase from '@/components/straveda/ParallaxShowcase';
import AnimatedRingProgress from '@/components/straveda/AnimatedRingProgress';
import AnimatedHero from '@/components/straveda/AnimatedHero';
import SubscribeSection from '@/components/straveda/SubscribeSection';
import WaveDivider from '@/components/straveda/WaveDivider';
import { MarqueeLogoScroller } from '@/components/marquee-logo-scroller';

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
  { title: "Global Scale", description: "Multi-region deployment with 99.99% SLA guarantee.", size: "normal", icon: Globe }
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
    question: 'What industries do you serve?',
    answer: 'We work across financial services, healthcare, government, energy, and technology sectors. Our deep enterprise expertise translates seamlessly across industries.',
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
          <p
            className="mb-4 text-[11px] font-medium uppercase tracking-wider"
            style={{ color: '#FF4800' }}
          >
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            className="font-normal heading-gradient"
            style={{ fontSize: '56px', lineHeight: 0.95, letterSpacing: '-2.05px' }}
          >
            Questions? We&apos;ve got answers.
          </h2>
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
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${openIndex === index ? 'bg-[#FF4800] text-white' : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#6b7280] dark:text-[#9ca3af]'}`}
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
              { src: 'https://www.dropbox.com/scl/fi/05tvh664nd2eivo56vv7a/Azure-Database-MariaDB-Server.svg?rlkey=s0swm90cwzl3458r45drs7pm4&raw=1', 
              alt: 'Microsoft Azure', gradient: { from: '#0078D4', via: '#00BCF2', to: '#50E6FF' } },
              { src: 'https://www.dropbox.com/scl/fi/0klrm4vry5vusyzy5id0u/AWS_Simple_Icons_AWS_Cloud.svg.png?rlkey=zh6tapbxpwp3tsgqn343jttdv&st=5bx24ri3&raw=1', alt: 'AWS', gradient: { from: '#FF9900', via: '#FFB84D', to: '#FFD700' } },
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
      {/* WHAT SETS US APART — HORIZONTAL SCROLLER         */}
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

          {/* UPDATED: HORIZONTAL CONTAINER */}
          <div className="relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex gap-8 overflow-x-auto pb-12 px-4 no-scrollbar snap-x snap-mandatory"
            >
              {bentoItems.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease },
                    },
                  }}
                  className={`relative flex-shrink-0 w-[85vw] md:w-[420px] snap-center overflow-hidden rounded-xl p-10 transition-all duration-300 flex gap-6 items-start ${item.size === 'large' ? 'bg-white dark:bg-[#12121e] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-black/[0.03] scale-105 z-10' : ''}`}
                  style={{
                    background: item.size === 'large' ? (isDark ? '#12121e' : '#FFFFFF') : 'transparent',
                    border: item.size === 'large' ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    const isLarge = item.size === 'large';
                    e.currentTarget.style.borderColor = isLarge ? 'rgba(255,72,0,0.35)' : 'rgba(255,72,0,0.2)';
                    e.currentTarget.style.boxShadow = isLarge
                      ? '0 0 0 1px rgba(255,72,0,0.15), 0 8px 30px rgba(255,72,0,0.12), inset 0 1px 0 rgba(255,72,0,0.05)'
                      : '0 8px 30px rgba(255,72,0,0.08)';
                    e.currentTarget.style.transform = isLarge ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)';
                    const iconContainer = e.currentTarget.querySelector('.bento-icon-wrap');
                    if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1.1)';
                    const dot = e.currentTarget.querySelector('.bento-hover-dot');
                    if (dot) (dot as HTMLElement).style.opacity = '1';
                    const glow = e.currentTarget.querySelector('.bento-gradient-glow');
                    if (glow) (glow as HTMLElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = item.size === 'large' ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'transparent';
                    e.currentTarget.style.boxShadow = item.size === 'large' ? '0 30px 60px_-15px_rgba(0,0,0,0.1)' : 'none';
                    e.currentTarget.style.transform = item.size === 'large' ? 'scale(1.05) translateY(0)' : 'translateY(0)';
                    const iconContainer = e.currentTarget.querySelector('.bento-icon-wrap');
                    if (iconContainer) (iconContainer as HTMLElement).style.transform = 'scale(1)';
                    const dot = e.currentTarget.querySelector('.bento-hover-dot');
                    if (dot) (dot as HTMLElement).style.opacity = '0';
                    const glow = e.currentTarget.querySelector('.bento-gradient-glow');
                    if (glow) (glow as HTMLElement).style.opacity = '0';
                  }}
                >
                  {/* Brand orange dot — top-right corner on hover */}
                  <div className="bento-hover-dot pointer-events-none absolute top-6 right-6 h-[6px] w-[6px] rounded-full transition-opacity duration-300" style={{ background: '#FF4800', opacity: 0 }} />
                  
                  {/* Large card gradient border glow */}
                  {item.size === 'large' && (
                    <div className="bento-gradient-glow pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,72,0,0.04) 0%, transparent 40%, rgba(255,72,0,0.02) 100%)', }} />
                  )}

                  <div className="bento-icon-wrap flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300" style={{ background: isDark ? 'rgba(255,72,0,0.12)' : 'rgba(255,72,0,0.08)' }} >
                    <item.icon className="h-7 w-7" style={{ color: '#FF4800' }} />
                  </div>

                  <div className="flex flex-col">
                    <h3 className="mb-3 font-normal text-[clamp(1.25rem,2.5vw,2rem)]" style={{ lineHeight: 1.15, color: isDark ? '#f0f0f5' : '#1a1a2e' }} >
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-[1.5]" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Dots (Mock indicators) */}
            <div className="flex justify-center items-center gap-4 mt-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={i === 2 ? "flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800" : "w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700"}>
                  {i === 2 && <div className="w-2 h-2 bg-[#FF4800] rounded-full" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1C — ABOUT / STATS                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="section-about" className="relative py-24 bg-[#f8f8fc] dark:bg-[#0a0a14]" >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:px-8">
          {/* LEFT — 40% */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="flex w-full flex-col justify-center lg:w-[40%]" >
            <div className="counter-hover-gradient inline-block"><Counter target={14} suffix="+" /></div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }} className="mt-3 h-[3px] w-8 rounded-full" style={{ background: '#FF4800', transformOrigin: 'left' }} />
            <p className="mt-6 text-[16px] text-[#6b7280] dark:text-[#9ca3af]"> Years of Enterprise Excellence </p>
            <p className="mt-2 text-[12px] font-medium uppercase tracking-wider" style={{ color: '#9ca3af' }} > Est. 2010 </p>
            <div className="mt-6 flex items-center gap-2"> <MapPin className="h-4 w-4" style={{ color: '#FF4800' }} /> <span className="text-[15px] text-[#6b7280] dark:text-[#9ca3af]"> Plano, Texas </span> </div>
          </motion.div>
          {/* RIGHT — 60% */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease }} className="flex w-full flex-col justify-center lg:w-[60%]" >
            <p className="mb-6 text-[11px] font-medium uppercase tracking-wider" style={{ color: '#FF4800' }} > ABOUT US </p>
            <p className="text-[20px] leading-[1.6] text-[#1a1a2e] dark:text-[#f0f0f5]"> Straveda is an enterprise technology consulting firm specializing in high-performance architecture and strategy. We help Fortune 500 companies and government agencies modernize their digital infrastructure. </p>
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />
      <FAQSection />
      <SubscribeSection />
    </div>
  );
}
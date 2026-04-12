'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ease = [0.4, 0, 0.2, 1] as const;

interface TestimonialsPageProps {
  onNavigate: (page: string) => void;
}

// Testimonial data organized into 3 columns
const testimonialsColumn1 = [
  {
    text: 'Straveda transformed our legacy infrastructure in record time. Their enterprise architecture expertise is unmatched in the industry.',
    name: 'James Richardson',
    role: 'Senior VP, Accenture',
    rating: 5,
  },
  {
    text: 'The technology strategy they delivered gave us a clear roadmap. We shipped 3x faster within the first quarter of engagement.',
    name: 'Sarah Mitchell',
    role: 'Director of Engineering, Deloitte',
    rating: 5,
  },
  {
    text: 'Their management consulting approach eliminated bottlenecks we had struggled with for years. True enterprise partners.',
    name: 'David Kim',
    role: 'CTO, IBM Global Services',
    rating: 5,
  },
  {
    text: 'We reduced our infrastructure costs by 40% while improving performance. The ROI was visible within the first 90 days.',
    name: 'Emily Thompson',
    role: 'VP of Technology, Northrop Grumman',
    rating: 5,
  },
  {
    text: 'The team at Straveda doesn\'t just consult — they embed with you and become an extension of your organization.',
    name: 'Robert Chen',
    role: 'Head of IT, JP Morgan Chase',
    rating: 5,
  },
];

const testimonialsColumn2 = [
  {
    text: 'Their Red Hat middleware expertise saved us from a vendor lock-in situation that would have cost millions over the next decade.',
    name: 'Michael Barnes',
    role: 'CIO, State of Texas',
    rating: 5,
  },
  {
    text: 'Straveda\'s technology strategy roadmap transformed our IT investment approach. We now have a clear 3-year vision.',
    name: 'Priya Kapoor',
    role: 'Director of Operations, Deloitte',
    rating: 5,
  },
  {
    text: 'From discovery to deployment, every phase was meticulously planned and executed. The quality of their work speaks for itself.',
    name: 'Alexander Volkov',
    role: 'VP Engineering, Goldman Sachs',
    rating: 5,
  },
  {
    text: 'The enterprise architecture modernization eliminated our legacy debt. We\'re now running 99.99% uptime across all systems.',
    name: 'Lisa Nakamura',
    role: 'CTO, McKinsey & Company',
    rating: 5,
  },
  {
    text: 'Their open-standards approach gave us flexibility we never had before. We can now adapt to market changes in weeks, not months.',
    name: 'Thomas Wright',
    role: 'SVP Technology, IBM',
    rating: 5,
  },
];

const testimonialsColumn3 = [
  {
    text: 'We chose Straveda for their deep enterprise expertise and they exceeded every expectation. A truly world-class consulting team.',
    name: 'Jennifer Adams',
    role: 'Managing Director, Accenture',
    rating: 5,
  },
  {
    text: 'Their agile delivery methodology combined with enterprise rigor is exactly what modern organizations need to stay competitive.',
    name: 'Carlos Rodriguez',
    role: 'COO, Federal Reserve Bank',
    rating: 5,
  },
  {
    text: 'The knowledge transfer was exceptional. Our internal teams are now self-sufficient and confident in maintaining the solutions.',
    name: 'Amanda Foster',
    role: 'Director of Digital, Deloitte',
    rating: 5,
  },
  {
    text: 'Straveda helped us navigate a complex cloud migration with zero downtime. Their planning and execution were flawless.',
    name: 'Daniel Park',
    role: 'VP Cloud Infrastructure, AWS',
    rating: 5,
  },
  {
    text: 'Working with Straveda felt like having an elite internal team. They understood our domain from day one and delivered beyond scope.',
    name: 'Rachel Green',
    role: 'Head of Platform, Microsoft',
    rating: 5,
  },
];

// Scroll column component (auto-scrolling)
function TestimonialScrollColumn({
  testimonials,
  duration = 30,
  direction = 'up',
}: {
  testimonials: typeof testimonialsColumn1;
  duration?: number;
  direction?: 'up' | 'down';
}) {
  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #000000, transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000000, transparent)' }}
      />

      <motion.div
        animate={{ translateY: direction === 'up' ? '-50%' : '0%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6"
        style={{ transform: direction === 'down' ? 'translateY(-50%)' : undefined }}
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, name, role, rating }, i) => (
              <motion.div
                key={`${index}-${i}`}
                className="rounded-2xl p-6 md:p-8 max-w-[360px] w-full transition-all duration-300 group cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(43,35,88,0.4), rgba(43,35,88,0.2))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(255,72,0,0.3)',
                  boxShadow: '0 8px 32px rgba(255,72,0,0.08)',
                }}
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(rating)].map((_, si) => (
                    <Star
                      key={si}
                      className="h-3.5 w-3.5 fill-current"
                      style={{ color: '#FBBF24' }}
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-[15px] leading-[1.7] mb-5" style={{ color: '#d4d4d8' }}>
                  &ldquo;{text}&rdquo;
                </p>

                {/* Divider */}
                <div
                  className="mb-4 w-full"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar with initials */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold text-sm flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FF4800, #2B2358)',
                    }}
                  >
                    {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-[14px] text-white tracking-tight">
                      {name}
                    </div>
                    <div className="text-[12px] opacity-60 tracking-tight" style={{ color: '#a1a1aa' }}>
                      {role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsPage({ onNavigate }: TestimonialsPageProps) {
  return (
    <div>
      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION                                     */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
        style={{ background: '#000000' }}
      >
        {/* Decorative gradient glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '600px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,72,0,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center px-6 py-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: '#FF4800' }}
          >
            — TESTIMONIALS
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-[42px] md:text-[56px] font-semibold text-white mb-6"
            style={{ fontWeight: 600 }}
          >
            Trusted by{' '}
            <span style={{ color: '#FF4800' }}>industry leaders.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="text-[18px] max-w-[560px] mx-auto"
            style={{ color: '#A1A1A1' }}
          >
            Real results from real enterprises. See how we&apos;ve helped organizations transform their IT landscape.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-10 flex items-center justify-center gap-8 md:gap-16"
          >
            {[
              { value: '5.0', label: 'Google Rating', icon: '★' },
              { value: '14+', label: 'Years Experience', icon: '◆' },
              { value: '100%', label: 'Client Satisfaction', icon: '●' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[28px] md:text-[36px] font-bold text-white">
                  {stat.icon} {stat.value}
                </div>
                <div className="text-[12px] uppercase tracking-wider mt-1" style={{ color: '#6b7280' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SCROLLING TESTIMONIALS COLUMNS                   */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-20"
        style={{ background: '#000000' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center mb-12"
          >
            <p
              className="mb-3 text-[11px] font-medium uppercase tracking-wider"
              style={{ color: '#FF4800' }}
            >
              WHAT CLIENTS SAY
            </p>
            <h2
              className="text-[32px] md:text-[42px] font-medium text-white"
              style={{ fontWeight: 500 }}
            >
              Voices of transformation
            </h2>
          </motion.div>

          {/* 3-column grid of scrolling testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TestimonialScrollColumn
              testimonials={testimonialsColumn1}
              duration={35}
              direction="up"
            />
            <TestimonialScrollColumn
              testimonials={testimonialsColumn2}
              duration={40}
              direction="down"
            />
            <TestimonialScrollColumn
              testimonials={testimonialsColumn3}
              duration={30}
              direction="up"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FEATURED TESTIMONIAL — HIGHLIGHT                */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{
          background: 'linear-gradient(180deg, #000000, #0a0a14, #000000)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="text-center"
          >
            {/* Large quote */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8"
              style={{ background: 'rgba(255,72,0,0.1)' }}
            >
              <Quote className="h-7 w-7" style={{ color: '#FF4800' }} />
            </div>

            <blockquote className="text-[24px] md:text-[32px] font-medium text-white leading-[1.6] mb-8 italic">
              &ldquo;Straveda doesn&apos;t just deliver projects — they transform how organizations think about technology. Their strategic vision and execution excellence made our digital transformation a resounding success.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #FF4800, #2B2358)' }}
              >
                JR
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-[16px]">James Richardson</div>
                <div className="text-[14px]" style={{ color: '#A1A1A1' }}>Senior VP · Accenture</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#FBBF24' }} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CTA SECTION                                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ background: '#000000' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-[32px] md:text-[42px] font-medium text-white mb-4">
              Ready to join our success stories?
            </h2>
            <p className="text-[18px] mb-8" style={{ color: '#A1A1A1' }}>
              Let&apos;s discuss how Straveda can transform your enterprise IT landscape.
            </p>
            <motion.button
              onClick={() => onNavigate('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-[16px] font-medium text-white transition-all duration-200 shadow-lg shadow-orange-500/20"
              style={{ background: '#FF4800' }}
            >
              Start your project
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

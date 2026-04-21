'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Globe, CheckCircle2, Loader2, Award, FolderGit2, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';
import TextReveal from '@/components/straveda/TextReveal';
import MagneticButton from '@/components/straveda/MagneticButton';
import ProjectRequestWizard from '@/components/straveda/ProjectRequestWizard';

const ease = [0.4, 0, 0.2, 1] as const;

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

const infoItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease },
  }),
}

const benefitCards = [
  {
    icon: <Award size={20} className="text-[#FF4800]" />,
    title: '14+ Years Experience',
  },
  {
    icon: <FolderGit2 size={20} className="text-[#FF4800]" />,
    title: '200+ Projects Delivered',
  },
  {
    icon: <ThumbsUp size={20} className="text-[#FF4800]" />,
    title: '100% Client Satisfaction',
  },
]

/* ─── Floating Label Input ────────────────────────────────────────── */
function FloatingInput({
  id,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  label,
}: {
  id: string
  name: string
  type?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="floating-input-group relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`floating-input w-full bg-white dark:bg-white/[0.04] border text-[#1a1a2e] dark:text-[#f0f0f5] rounded-lg px-4 py-3.5 text-[15px] outline-none transition-colors duration-200 ${
          focused
            ? 'border-[#FF4800]'
            : 'border-[#e5e7eb] dark:border-white/[0.1] hover:border-[#d1d5db] dark:hover:border-white/[0.15]'
        }`}
      />
      <label
        htmlFor={id}
        className={`floating-label absolute left-4 transition-all duration-200 ease-out pointer-events-none ${
          isActive
            ? 'floating-label-active'
            : 'floating-label-inactive'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

/* ─── Floating Label Textarea ─────────────────────────────────────── */
function FloatingTextarea({
  id,
  name,
  required = false,
  value,
  onChange,
  label,
  rows = 5,
}: {
  id: string
  name: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  label: string
  rows?: number
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="floating-input-group relative">
      <textarea
        id={id}
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`floating-input w-full bg-white dark:bg-white/[0.04] border text-[#1a1a2e] dark:text-[#f0f0f5] rounded-lg px-4 py-3.5 text-[15px] outline-none transition-colors duration-200 resize-none ${
          focused
            ? 'border-[#FF4800]'
            : 'border-[#e5e7eb] dark:border-white/[0.1] hover:border-[#d1d5db] dark:hover:border-white/[0.15]'
        }`}
      />
      <label
        htmlFor={id}
        className={`floating-label absolute left-4 transition-all duration-200 ease-out pointer-events-none ${
          isActive
            ? 'floating-label-active'
            : 'floating-label-inactive'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData(initialFormData)
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-[#0a0a14] min-h-screen">
      {/* ─── Inline styles for floating labels & animations ─── */}
      <style>{`
        /* ── Floating Label ── */
        .floating-label-inactive {
          top: 50%;
          transform: translateY(-50%);
          font-size: 15px;
          color: #9ca3af;
        }
        .floating-label-active {
          top: 0;
          transform: translateY(-50%);
          font-size: 11px;
          font-weight: 500;
          color: #FF4800;
          background: white;
          padding: 0 6px;
          letter-spacing: 0.02em;
        }
        /* For textarea, default position is different */
        textarea ~ .floating-label-inactive {
          top: 16px;
          transform: translateY(0);
        }
        textarea ~ .floating-label-active {
          top: 0;
          transform: translateY(-50%);
        }
        /* ── Decorative Dots stagger ── */
        @keyframes accent-dot-fade {
          0% { opacity: 0; transform: scale(0.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        .accent-dot {
          opacity: 0;
          animation: accent-dot-fade 0.6s ease-out forwards;
        }
        .accent-dot:nth-child(1) { animation-delay: 0.8s; }
        .accent-dot:nth-child(2) { animation-delay: 1.0s; }
        .accent-dot:nth-child(3) { animation-delay: 1.2s; }
        /* ── Map pin pulse ── */
        @keyframes map-pin-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
        .map-pin-pulse {
          animation: map-pin-pulse 2.5s ease-in-out infinite;
        }
        /* ── Dark Mode Floating Labels ── */
        html.dark .floating-label-inactive {
          color: #9ca3af;
        }
        html.dark .floating-label-active {
          color: #FF4800;
          background: #0a0a14;
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative flex items-center justify-center bg-white dark:bg-[#0a0a14] overflow-hidden"
        style={{ minHeight: '50vh' }}
      >
        {/* Floating accent blob — top-right */}
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,72,0,0.05) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-4"
          >
            Get in Touch
          </motion.p>
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] leading-tight">
            <span className="text-shimmer"><TextReveal delay={0.2} stagger={0.08}>Let&apos;s architect your path forward.</TextReveal></span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            style={{ transformOrigin: 'center center' }}
            className="h-[2px] w-16 bg-[#FF4800] mx-auto mt-8"
          />
          {/* Decorative accent dots */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
            <span className="accent-dot w-[6px] h-[6px] rounded-full bg-[#FF4800]" />
            <span className="accent-dot w-[6px] h-[6px] rounded-full bg-[#2B2358]" />
            <span className="accent-dot w-[6px] h-[6px] rounded-full bg-[#FF4800]" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
            className="text-[#6b7280] dark:text-[#9ca3af] text-lg md:text-xl mt-6"
          >
            Tell us about your enterprise challenge. We&apos;ll respond within 1
            business day.
          </motion.p>
        </div>
      </section>

      {/* WHY CHOOSE STRAVEDA — Benefit Cards */}
      <section className="px-6 pb-8 pt-4 bg-[#f8f8fc] dark:bg-[#0a0a14]">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease }}
            className="text-center text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-4"
          >
            Why choose Straveda?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {benefitCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="glass-card flex items-center gap-3 rounded-lg px-5 py-3.5"
              >
                {card.icon}
                <span className="text-[14px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5] whitespace-nowrap">{card.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 bg-[#f8f8fc] dark:bg-[#0a0a14]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-5 sm:p-8 space-y-6 magnetic-border"
            >
              <FloatingInput
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                label="Full Name *"
              />

              <FloatingInput
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                label="Company *"
              />

              <FloatingInput
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                label="Work Email *"
              />

              <FloatingInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                label="Phone (optional)"
              />

              <FloatingTextarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                label="Tell us about your challenge... *"
              />

              <MagneticButton>
                <button
                  data-magnetic
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF4800] hover:bg-[#e63f00] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[16px] font-medium rounded-lg py-4 transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,72,0,0.3)] flex items-center justify-center gap-2 btn-shine cta-pulse"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </MagneticButton>

              <p className="text-[#9ca3af] dark:text-[#6b7280] text-[12px] text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </motion.div>

          {/* RIGHT — Contact Info */}
          <div className="mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0, ease }}
              custom={0}
              className="text-[#6b7280] dark:text-[#9ca3af] text-[12px] uppercase tracking-[0.15em] font-medium mb-8"
            >
              Or reach us directly
            </motion.div>

            {/* Email */}
            <motion.div
              custom={1}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <Mail className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[18px] font-medium">
                  hello@straveda.com
                </p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              custom={2}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <MapPin className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[16px] font-medium">
                  Pune, Maharashtra 411001
                </p>
                <p className="text-[#6b7280] dark:text-[#9ca3af] text-[14px]">India</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              custom={3}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <Clock className="w-5 h-5 text-[#FF4800] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1a1a2e] dark:text-[#f0f0f5] text-[16px] font-medium">
                  Monday &ndash; Friday
                </p>
                <p className="text-[#6b7280] dark:text-[#9ca3af] text-[14px]">
                  9:00 AM &ndash; 6:00 PM IST
                </p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              custom={4}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex items-start gap-4 mb-6"
            >
              <a
                href="#"
                className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#FF4800] transition-colors"
                aria-label="LinkedIn"
              >
                <Globe className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Map Placeholder — Enhanced */}
            <motion.div
              custom={5}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="my-8"
            >
              <div className="relative rounded-xl border border-[#e5e7eb] dark:border-white/[0.06] bg-[#f8f8fc] dark:bg-white/[0.04] overflow-hidden h-48 flex flex-col items-center justify-center gap-2">
                {/* Subtle radial gradient for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,72,0,0.04) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4800]/10">
                    <MapPin className="h-5 w-5 text-[#FF4800] map-pin-pulse" />
                  </div>
                  <p className="text-[14px] font-medium text-[#1a1a2e] dark:text-[#f0f0f5]">Pune, Maharashtra 411001 · India</p>
                  <a
                    href="https://maps.google.com/?q=Pune+Maharashtra+411001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-[#FF4800] hover:text-[#e63f00] font-medium underline underline-offset-2 transition-colors"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              custom={6}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="h-px bg-[#e5e7eb] dark:bg-white/[0.06] my-8"
            />

            {/* Why work with us */}
            <div className="space-y-4">
              {[
                'Response within 1 business day',
                'Free initial consultation',
                'No lock-in contracts',
                'Guaranteed satisfaction',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  custom={7 + index}
                  variants={infoItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF4800] shrink-0" />
                  <span className="text-[#6b7280] dark:text-[#9ca3af] text-[14px]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT REQUEST WIZARD */}
      <section className="px-6 py-24 bg-white dark:bg-[#0a0a14]">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-4"
          >
            QUICK START
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] leading-tight mb-4"
          >
            Start Your Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] dark:text-[#9ca3af] text-base md:text-lg"
          >
            Tell us about your needs in 3 easy steps
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            style={{ transformOrigin: 'center' }}
            className="h-[2px] w-12 bg-[#FF4800] mx-auto mt-6"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <ProjectRequestWizard />
        </motion.div>
      </section>
    </div>
  );
}

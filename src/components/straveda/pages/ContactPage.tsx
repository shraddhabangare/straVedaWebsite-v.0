'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Globe, CheckCircle2, Loader2, Award, FolderGit2, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';
import TextReveal from '@/components/straveda/TextReveal';
import MagneticButton from '@/components/straveda/MagneticButton';
import ProjectRequestWizard from '@/components/straveda/ProjectRequestWizard';

const ease = [0.4, 0, 0.2, 1] as const;

const serviceOptions = [
  'Enterprise Architecture',
  'Technology Strategy',
  'Management Consulting',
  'Software Solutions',
  "Not sure — let's talk",
]

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
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


  const inputClasses =
    'w-full bg-white border border-[#e5e7eb] focus:border-[#FF4800] text-[#1a1a2e] rounded-lg px-4 py-3.5 text-[15px] placeholder-[#9ca3af] outline-none transition-colors'

  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <section
        className="relative flex items-center justify-center bg-white"
        style={{ minHeight: '50vh' }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-6"
          >
            Get in Touch
          </motion.p>
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold text-[#1a1a2e] leading-tight">
            <span className="text-shimmer"><TextReveal delay={0.2} stagger={0.08}>Let&apos;s architect your path forward.</TextReveal></span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            style={{ transformOrigin: 'left center' }}
            className="h-[2px] w-16 bg-[#FF4800] mx-auto mt-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
            className="text-[#6b7280] text-lg md:text-xl mt-6"
          >
            Tell us about your enterprise challenge. We&apos;ll respond within 1
            business day.
          </motion.p>
        </div>
      </section>

      {/* WHY CHOOSE STRAVEDA — Benefit Cards */}
      <section className="px-6 pb-8 pt-4 bg-[#f8f8fc]">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease }}
            className="text-center text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-6"
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
                className="flex items-center gap-3 rounded-lg bg-white px-5 py-3.5 border border-[#e5e7eb] shadow-sm"
              >
                {card.icon}
                <span className="text-[14px] font-medium text-[#1a1a2e] whitespace-nowrap">{card.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-6 pt-16 pb-24 bg-[#f8f8fc]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-8 space-y-5 border border-[#e5e7eb] shadow-sm magnetic-border"
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="company" className="sr-only">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Company *"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Work Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Work Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="service" className="sr-only">
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="bg-white text-[#9ca3af]">
                    Service Interest *
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-white text-[#1a1a2e]">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your challenge... *"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <MagneticButton>
                <button
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

              <p className="text-[#9ca3af] text-[12px] text-center">
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
              className="text-[#6b7280] text-[12px] uppercase tracking-[0.15em] font-medium mb-8"
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
                <p className="text-[#1a1a2e] text-[18px] font-medium">
                  info@straveda.com
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
                <p className="text-[#1a1a2e] text-[16px] font-medium">
                  Plano, TX 75024
                </p>
                <p className="text-[#6b7280] text-[14px]">United States</p>
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
                <p className="text-[#1a1a2e] text-[16px] font-medium">
                  Monday &ndash; Friday
                </p>
                <p className="text-[#6b7280] text-[14px]">
                  9:00 AM &ndash; 6:00 PM CST
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
                className="text-[#6b7280] hover:text-[#FF4800] transition-colors"
                aria-label="LinkedIn"
              >
                <Globe className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              custom={5}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="my-8"
            >
              <div className="relative rounded-xl border border-[#e5e7eb] bg-[#f8f8fc] overflow-hidden h-48 flex flex-col items-center justify-center gap-3">
                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4800]/10">
                    <MapPin className="h-5 w-5 text-[#FF4800]" />
                  </div>
                  <p className="text-[14px] font-medium text-[#1a1a2e]">Plano, TX 75024 · United States</p>
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
              className="h-px bg-[#e5e7eb] my-8"
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
                  <span className="text-[#6b7280] text-[14px]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT REQUEST WIZARD */}
      <section className="px-6 py-24 bg-white">
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
            className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold text-[#1a1a2e] leading-tight mb-4"
          >
            Start Your Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="text-[#6b7280] text-base md:text-lg"
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

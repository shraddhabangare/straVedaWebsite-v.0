'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Linkedin, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

  const heroHeadline = "Let's architect your path forward."

  const inputClasses =
    'w-full bg-[#1e1a3f] border border-white/[0.08] focus:border-[#FF4800] text-white rounded-lg px-4 py-3.5 text-[15px] placeholder-[#52525B] outline-none transition-colors'

  return (
    <div className="bg-black min-h-screen">
      {/* 5A — HERO */}
      <section
        className="relative flex items-center justify-center bg-black"
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
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold text-white leading-tight">
            {heroHeadline.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
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
            className="text-[#A1A1A1] text-lg md:text-xl mt-6"
          >
            Tell us about your enterprise challenge. We&apos;ll respond within 1
            business day.
          </motion.p>
        </div>
      </section>

      {/* 5B — CONTACT SECTION */}
      <section className="px-6 py-24 bg-black">
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
              className="bg-[#2B2358] rounded-xl p-8 space-y-5"
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
                  <option value="" disabled className="bg-[#1e1a3f] text-[#52525B]">
                    Service Interest *
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#1e1a3f] text-white">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF4800] hover:bg-[#e63f00] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[16px] font-medium rounded-lg py-4 transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,72,0,0.3)] flex items-center justify-center gap-2"
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

              <p className="text-[#52525B] text-[12px] text-center">
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
              className="text-[#A1A1A1] text-[12px] uppercase tracking-[0.15em] font-medium mb-8"
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
                <p className="text-white text-[18px] font-medium">
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
                <p className="text-white text-[16px] font-medium">
                  Plano, TX 75024
                </p>
                <p className="text-[#A1A1A1] text-[14px]">United States</p>
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
                <p className="text-white text-[16px] font-medium">
                  Monday &ndash; Friday
                </p>
                <p className="text-[#A1A1A1] text-[14px]">
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
                className="text-[#A1A1A1] hover:text-[#FF4800] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Divider */}
            <motion.div
              custom={5}
              variants={infoItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="h-px bg-[#27272A] my-8"
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
                  custom={6 + index}
                  variants={infoItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF4800] shrink-0" />
                  <span className="text-[#A1A1A1] text-[14px]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

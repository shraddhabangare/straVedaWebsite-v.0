'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const ease = [0.4, 0, 0.2, 1] as const;

interface SubscribeSectionProps {
  onNavigate?: (page: string) => void;
}

/**
 * Straveda Subscribe Section — Email-only subscription
 * Light theme: #f8f8fc background, white form card, dark text
 * Orange (#FF4800) accent unchanged
 */
export default function SubscribeSection({ onNavigate }: SubscribeSectionProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Welcome aboard!', {
          description: 'You\'ve been subscribed to Straveda insights.',
        });
        setEmail('');
        setTimeout(() => setIsSuccess(false), 4000);
      } else if (response.status === 409) {
        toast.error('Already subscribed', {
          description: 'This email is already on our list.',
        });
      } else {
        toast.error('Something went wrong', {
          description: 'Please try again later.',
        });
      }
    } catch {
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: '#f8f8fc' }}
    >
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,72,0,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,72,0,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-[1px]"
            style={{
              left: `${15 + i * 10}%`,
              background: 'linear-gradient(to bottom, transparent, #000000, transparent)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
              style={{ background: 'rgba(255,72,0,0.1)' }}
            >
              <Mail className="h-6 w-6" style={{ color: '#FF4800' }} />
            </motion.div>

            <h2
              className="text-[32px] md:text-[40px] font-medium mb-4 leading-tight"
              style={{ fontWeight: 500, color: '#1a1a2e' }}
            >
              Stay ahead of the curve
            </h2>
            <p
              className="text-[17px] leading-relaxed max-w-[440px]"
              style={{ color: '#6b7280' }}
            >
              Subscribe to our insights newsletter. Get expert analysis on enterprise IT trends, architecture patterns, and technology strategy delivered to your inbox.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex items-center gap-6 justify-center md:justify-start">
              {[
                { label: '2,000+ readers', icon: '◆' },
                { label: 'Weekly digest', icon: '●' },
                { label: 'No spam', icon: '★' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: '#FF4800', fontSize: '10px' }}>{badge.icon}</span>
                  <span className="text-[13px]" style={{ color: '#6b7280' }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Subscribe form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="w-full md:w-auto md:min-w-[400px]"
          >
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <h3 className="text-[22px] font-medium mb-2" style={{ fontWeight: 500, color: '#1a1a2e' }}>
                Subscribe to insights
              </h3>
              <p className="text-[14px] mb-6" style={{ color: '#6b7280' }}>
                Enterprise IT expertise delivered weekly.
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8"
                >
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
                    style={{ background: 'rgba(34,197,94,0.15)' }}
                  >
                    <CheckCircle className="h-7 w-7" style={{ color: '#22c55e' }} />
                  </div>
                  <p className="font-medium text-[16px]" style={{ color: '#1a1a2e' }}>You&apos;re subscribed!</p>
                  <p className="text-[14px] mt-1" style={{ color: '#6b7280' }}>
                    Check your inbox for a welcome email.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div>
                    <label
                      htmlFor="subscribe-email"
                      className="block text-[13px] font-medium mb-2"
                      style={{ color: '#1a1a2e' }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="subscribe-email"
                      placeholder="you@company.com"
                      className={`text-[14px] w-full py-3 px-4 rounded-lg outline-none transition-all duration-200 placeholder:text-[#9ca3af] ${
                        emailError
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-transparent focus:ring-1 focus:ring-[#FF4800]'
                      }`}
                      style={{
                        background: '#FFFFFF',
                        border: emailError ? '1px solid #ef4444' : '1px solid #e5e7eb',
                        color: '#1a1a2e',
                      }}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      aria-invalid={!!emailError}
                      aria-describedby="subscribe-email-error"
                    />
                    {emailError && (
                      <p id="subscribe-email-error" className="text-red-500 text-xs mt-1.5">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="glow-hover w-full flex items-center justify-center gap-2 rounded-lg py-3 px-4 text-[14px] font-medium text-white transition-all duration-200 shadow-lg shadow-orange-500/15 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: '#FF4800' }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-[12px] text-center mt-1" style={{ color: '#9ca3af' }}>
                    Unsubscribe anytime. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

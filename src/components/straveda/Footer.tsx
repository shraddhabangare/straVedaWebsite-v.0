'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, CSSProperties } from 'react';
import { Mail, MapPin, Phone, ArrowUp, CheckCircle, Loader2 } from 'lucide-react';
import { useCursorStyle } from '@/lib/cursor-context';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const FOOTER_LINKS = {
  explore: [
    { label: 'Home', page: 'home' },
    { label: 'What We Build', page: 'services' },
    { label: 'Why Straveda', page: 'about' },
    { label: 'Insights', page: 'insights' },
    { label: 'Contact', page: 'contact' },
  ],
  services: [
    { label: 'AI & Automation', page: 'services' },
    { label: 'Custom Software', page: 'services' },
    { label: 'AI Strategy & Integration', page: 'services' },
    { label: 'Web Development & 3D', page: 'services' },
  ],
  resources: [
    { label: 'Insights (Blog)', page: 'insights' },
    { label: 'Discovery Call Guide', page: 'contact' },
    { label: 'Pricing & Timeline', page: 'contact' },
    { label: 'Contact Us', page: 'contact' },
  ],
} as const;

const ease = [0.4, 0, 0.2, 1] as const;

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease },
  }),
};

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const socialIcons = [
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/company/straveda-llc', label: 'LinkedIn' },
  { icon: GitHubIcon, href: 'https://github.com/straveda', label: 'GitHub' },
];

type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });
  const { setCursorStyle } = useCursorStyle();
  const [brandHovered, setBrandHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>('idle');
  const [subscribeError, setSubscribeError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribeStatus('loading');
    setSubscribeError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
        setSubscribeError(data.message || 'Something went wrong.');
      }
    } catch {
      setSubscribeStatus('error');
      setSubscribeError('Network error. Please try again.');
    }
  };

  const brandStyle: CSSProperties = {
    fontFamily: 'Geist, sans-serif',
    fontWeight: 500,
    fontSize: 20,
    transition: 'text-shadow 0.3s ease',
    textShadow: brandHovered ? '0 0 20px rgba(255, 72, 0, 0.25), 0 0 40px rgba(255, 72, 0, 0.1)' : 'none',
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative mt-auto bg-noise-subtle bg-gradient-to-br from-[#fafafa] to-[#f5f5fa] dark:from-[#0a0a14] dark:to-[#0d0d1a]"
      onMouseEnter={() => setCursorStyle('nav')}
      onMouseLeave={() => setCursorStyle('default')}
    >
      {/* ── Gradient top line (3px, #FF4800 → transparent) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{
          background: 'linear-gradient(90deg, #FF4800 0%, rgba(255,72,0,0.1) 60%, transparent 100%)',
        }}
      />

      {/* ── Dot pattern background overlay (opacity 0.03) ── */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ── Back to top ── */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="flex justify-end px-6 md:px-10 pt-8 max-w-7xl mx-auto"
        >
          <a
            href="#"
            data-magnetic
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-lg transition-all duration-300"
            style={{ color: '#9ca3af' }}
            onMouseEnter={(e) => {
              e.stopPropagation(); setCursorStyle('link');
              e.currentTarget.style.color = '#FF4800';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,72,0,0.15)';
              e.currentTarget.style.background = 'rgba(255,72,0,0.05)';
            }}
            onMouseLeave={(e) => {
              setCursorStyle('nav');
              e.currentTarget.style.color = '#9ca3af';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </motion.div>
      </div>

      {/* ── Main grid ── */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8"
        >
          {/* ── Column 1: Brand ── */}
          <motion.div variants={columnVariants} className="sm:col-span-2 lg:col-span-1 lg:pr-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); setBrandHovered(true); }}
              onMouseLeave={() => { setCursorStyle('nav'); setBrandHovered(false); }}
              className="inline-block text-xl font-medium tracking-tight select-none mb-3 text-[#1a1a2e] dark:text-white"
              style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 20, transition: 'text-shadow 0.3s ease', textShadow: brandStyle.textShadow }}
            >
              Str<span style={{ color: '#FF4800' }}>a</span>veda
            </a>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              Exceptional value. Cost-effective solutions.
            </p>
            {/* Availability status */}
            <div className="flex items-center gap-2 mb-6">
              <span className="pulse-dot" />
              <span className="text-[13px]" style={{ color: '#6b7280' }}>Available for projects</span>
            </div>

            {/* ── Social media icons ── */}
            <div className="flex items-center gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 bg-black/[0.04] dark:bg-white/[0.06] text-[#6b7280]"
                  onMouseEnter={(e) => {
                    e.stopPropagation(); setCursorStyle('link');
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FF4800';
                    e.currentTarget.style.transform = 'scale(1.15)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 72, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    setCursorStyle('nav');
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* ── Newsletter subscription form ── */}
            <div className="mt-6">
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: '#FF4800' }}
              >
                Stay Updated
              </h3>
              <p className="text-[13px] mb-3" style={{ color: '#6b7280' }}>
                Get the latest insights delivered to your inbox.
              </p>

              {subscribeStatus === 'success' ? (
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: '#22c55e' }} />
                  <span className="text-sm font-medium" style={{ color: '#22c55e' }}>
                    You&rsquo;re in!
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (subscribeStatus === 'error') setSubscribeStatus('idle');
                    }}
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-all duration-200 text-[#1a1a2e] dark:text-white dark:bg-white/[0.05] dark:placeholder-white/40"
                    style={{
                      borderColor: subscribeStatus === 'error' ? '#ef4444' : 'rgba(0,0,0,0.1)',
                      minWidth: 0,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#FF4800';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,72,0,0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = subscribeStatus === 'error' ? '#ef4444' : 'rgba(0,0,0,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    disabled={subscribeStatus === 'loading'}
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
                    style={{
                      background: subscribeStatus === 'loading' ? '#cc3d00' : '#FF4800',
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation(); setCursorStyle('link');
                      if (subscribeStatus !== 'loading') {
                        e.currentTarget.style.background = '#e63f00';
                      }
                    }}
                    onMouseLeave={(e) => {
                      setCursorStyle('nav');
                      e.currentTarget.style.background = subscribeStatus === 'loading' ? '#cc3d00' : '#FF4800';
                    }}
                  >
                    {subscribeStatus === 'loading' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Subscribing&hellip;
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              )}

              {subscribeStatus === 'error' && subscribeError && (
                <p className="text-xs mt-2" style={{ color: '#ef4444' }}>
                  {subscribeError}
                </p>
              )}
            </div>
          </motion.div>

          {/* ── Column 2: Explore ── */}
          <motion.div variants={columnVariants}>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#FF4800' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map(({ label, page }, i) => (
                <motion.li
                  key={label}
                  custom={i}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <a
                    href={`#${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(page);
                    }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#6b7280' }}
                    onMouseEnter={(e) => {
                      e.stopPropagation(); setCursorStyle('link');
                      e.currentTarget.style.color = '#FF4800';
                    }}
                    onMouseLeave={(e) => {
                      setCursorStyle('nav');
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 3: Services ── */}
          <motion.div variants={columnVariants}>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#FF4800' }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map(({ label, page }, i) => (
                <motion.li
                  key={label}
                  custom={i}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <a
                    href={`#${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(page);
                    }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#6b7280' }}
                    onMouseEnter={(e) => {
                      e.stopPropagation(); setCursorStyle('link');
                      e.currentTarget.style.color = '#FF4800';
                    }}
                    onMouseLeave={(e) => {
                      setCursorStyle('nav');
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 4: Resources ── */}
          <motion.div variants={columnVariants}>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#FF4800' }}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map(({ label, page }, i) => (
                <motion.li
                  key={label}
                  custom={i}
                  variants={linkItemVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <a
                    href={`#${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(page);
                    }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#6b7280' }}
                    onMouseEnter={(e) => {
                      e.stopPropagation(); setCursorStyle('link');
                      e.currentTarget.style.color = '#FF4800';
                    }}
                    onMouseLeave={(e) => {
                      setCursorStyle('nav');
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Column 5: Contact ── */}
          <motion.div variants={columnVariants}>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#FF4800' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@straveda.com"
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-200 text-[#1a1a2e] dark:text-[#e2e8f0]"
                  style={{
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    textDecorationColor: '#FF4800',
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation(); setCursorStyle('link');
                    e.currentTarget.style.color = '#FF4800';
                  }}
                  onMouseLeave={(e) => {
                    setCursorStyle('nav');
                    e.currentTarget.style.color = '';
                  }}
                >
                  <Mail size={14} style={{ color: '#FF4800', flexShrink: 0 }} />
                  hello@straveda.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{ color: '#6b7280' }}
                  onMouseEnter={(e) => { e.stopPropagation(); setCursorStyle('link'); e.currentTarget.style.color = '#FF4800'; }}
                  onMouseLeave={(e) => { setCursorStyle('nav'); e.currentTarget.style.color = '#6b7280'; }}
                >
                  <Phone size={14} style={{ color: '#FF4800', flexShrink: 0 }} />
                  +91 XXXXXXXXXX
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: '#6b7280' }}>
                <MapPin size={14} style={{ color: '#FF4800', marginTop: 3, flexShrink: 0 }} />
                <span className="leading-relaxed">
                  Nashik, Maharashtra 422001
                  <br />
                  India
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="border-t border-black/[0.06] dark:border-white/[0.08]"
        style={{ padding: '20px 0' }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            &copy; 2025 Straveda Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs transition-colors duration-200 cursor-pointer"
              style={{ color: '#9ca3af' }}
              onMouseEnter={(e) => {
                e.stopPropagation(); setCursorStyle('link');
                e.currentTarget.style.color = '#FF4800';
              }}
              onMouseLeave={(e) => {
                setCursorStyle('nav');
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              Privacy Policy
            </button>
            <span style={{ color: '#d1d5db' }}>&middot;</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs transition-colors duration-200 cursor-pointer"
              style={{ color: '#9ca3af' }}
              onMouseEnter={(e) => {
                e.stopPropagation(); setCursorStyle('link');
                e.currentTarget.style.color = '#FF4800';
              }}
              onMouseLeave={(e) => {
                setCursorStyle('nav');
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

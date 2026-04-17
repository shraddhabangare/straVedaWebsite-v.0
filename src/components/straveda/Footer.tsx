'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, CSSProperties } from 'react';
import { Mail, MapPin, Code, ArrowUp, Globe, CheckCircle, Loader2 } from 'lucide-react';
import { useCursorStyle } from '@/lib/cursor-context';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const FOOTER_LINKS = {
  explore: [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'About', page: 'about' },
    { label: 'Insights', page: 'insights' },
  ],
  services: [
    { label: 'Enterprise Architecture', page: 'services' },
    { label: 'Technology Strategy', page: 'services' },
    { label: 'Management', page: 'services' },
    { label: 'Software Solutions', page: 'services' },
  ],
  resources: [
    { label: 'Blog', page: 'insights' },
    { label: 'Case Studies', page: 'insights' },
    { label: 'Whitepapers', page: 'insights' },
    { label: 'Contact', page: 'contact' },
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

const socialIcons = [
  { icon: Globe, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Code, href: 'https://github.com', label: 'GitHub' },
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
      className="relative mt-auto bg-noise-subtle"
      style={{ background: 'linear-gradient(135deg, #fafafa, #f5f5fa)' }}
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
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
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
              className="inline-block text-xl font-medium tracking-tight select-none mb-3"
              style={{ ...brandStyle, color: '#1a1a2e' }}
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
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(0, 0, 0, 0.04)',
                    color: '#6b7280',
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation(); setCursorStyle('link');
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FF4800';
                    e.currentTarget.style.transform = 'scale(1.15)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 72, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    setCursorStyle('nav');
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.color = '#6b7280';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={18} />
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
                    className="flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-all duration-200"
                    style={{
                      borderColor: subscribeStatus === 'error' ? '#ef4444' : 'rgba(0,0,0,0.1)',
                      color: '#1a1a2e',
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
                  href="mailto:info@straveda.com"
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{
                    color: '#1a1a2e',
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
                    e.currentTarget.style.color = '#1a1a2e';
                  }}
                >
                  <Mail size={14} style={{ color: '#FF4800', flexShrink: 0 }} />
                  info@straveda.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: '#6b7280' }}>
                <MapPin size={14} style={{ color: '#FF4800', marginTop: 3, flexShrink: 0 }} />
                <span className="leading-relaxed">
                  Plano, TX 75024
                  <br />
                  United States
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
        style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          padding: '20px 0',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            &copy; {new Date().getFullYear()} Straveda LLC. All rights reserved.
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

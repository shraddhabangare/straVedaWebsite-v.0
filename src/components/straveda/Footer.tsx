'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, CSSProperties } from 'react';
import { Mail, MapPin, Code, ArrowUp, Globe } from 'lucide-react';

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

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });
  const [brandHovered, setBrandHovered] = useState(false);

  const brandStyle: CSSProperties = {
    fontFamily: 'Geist, sans-serif',
    fontWeight: 500,
    fontSize: 20,
    transition: 'text-shadow 0.3s ease',
    textShadow: brandHovered ? '0 0 20px rgba(255, 72, 0, 0.4), 0 0 40px rgba(255, 72, 0, 0.15)' : 'none',
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative mt-auto bg-noise-subtle" style={{ background: '#2B2358' }}>
      {/* ── Orange accent top border (animated from left) ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease }}
        style={{
          height: 2,
          backgroundColor: '#FF4800',
          transformOrigin: 'left',
        }}
      />

      {/* ── Dot pattern background overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
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
            onClick={handleBackToTop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors duration-200"
            style={{ color: '#52525B' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF4800';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#52525B';
            }}
          >
            <ArrowUp size={14} />
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
              onMouseEnter={() => setBrandHovered(true)}
              onMouseLeave={() => setBrandHovered(false)}
              className="inline-block text-white text-xl font-medium tracking-tight select-none mb-3"
              style={brandStyle}
            >
              Str<span style={{ color: '#FF4800' }}>a</span>veda
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#A1A1A1' }}>
              Exceptional value. Cost-effective solutions.
            </p>

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
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#A1A1A1',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#FF4800';
                    e.currentTarget.style.transform = 'scale(1.15)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 72, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#A1A1A1';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
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
                    style={{ color: '#A1A1A1' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#A1A1A1';
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
                    style={{ color: '#A1A1A1' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#A1A1A1';
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
                    style={{ color: '#A1A1A1' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#A1A1A1';
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
                  className="inline-flex items-center gap-2 text-sm text-white transition-colors duration-200"
                  style={{
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    textDecorationColor: '#FF4800',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FF4800';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <Mail size={14} style={{ color: '#FF4800', flexShrink: 0 }} />
                  info@straveda.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: '#A1A1A1' }}>
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
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '20px 0',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#52525B' }}>
            &copy; {new Date().getFullYear()} Straveda LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs transition-colors duration-200 cursor-pointer"
              style={{ color: '#52525B' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF4800';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#52525B';
              }}
            >
              Privacy Policy
            </button>
            <span style={{ color: '#3f3f46' }}>&middot;</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs transition-colors duration-200 cursor-pointer"
              style={{ color: '#52525B' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF4800';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#52525B';
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

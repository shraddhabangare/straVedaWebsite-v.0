'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Mail, MapPin } from 'lucide-react';

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

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  return (
    <footer ref={footerRef} className="mt-auto" style={{ background: '#2B2358' }}>
      {/* ── Orange accent top border ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease }}
        style={{
          height: 2,
          backgroundColor: '#FF4800',
          transformOrigin: 'center',
        }}
      />

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 md:py-16">
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
              className="inline-block text-white text-xl font-medium tracking-tight select-none mb-3"
              style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 20 }}
            >
              Str<span style={{ color: '#FF4800' }}>a</span>veda
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#A1A1A1' }}>
              Exceptional value. Cost-effective solutions.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#A1A1A1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF4800';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#A1A1A1';
              }}
            >
              <Linkedin size={18} />
            </a>
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
              {FOOTER_LINKS.explore.map(({ label, page }) => (
                <li key={label}>
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
                </li>
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
              {FOOTER_LINKS.services.map(({ label, page }) => (
                <li key={label}>
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
                </li>
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
              {FOOTER_LINKS.resources.map(({ label, page }) => (
                <li key={label}>
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
                </li>
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
            &copy; 2024 Straveda LLC. All rights reserved.
          </p>
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
        </div>
      </motion.div>
    </footer>
  );
}

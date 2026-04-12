'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const NAV_LINKS = [
  { label: 'Services', page: 'services' },
  { label: 'About', page: 'about' },
  { label: 'Insights', page: 'insights' },
  { label: 'Contact', page: 'contact' },
] as const;

const ease = [0.4, 0, 0.2, 1] as const;

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll shadow detection ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMobileLinkClick = useCallback(
    (page: string) => {
      setMobileOpen(false);
      onNavigate(page);
    },
    [onNavigate]
  );

  const isActive = (page: string) => currentPage === page;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10 transition-shadow duration-300"
        style={{
          background: scrolled
            ? 'rgba(43, 35, 88, 0.97)'
            : 'rgba(43, 35, 88, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0, 0, 0, 0.25)'
            : 'none',
        }}
      >
        {/* ── Wordmark ── */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-white font-medium text-lg tracking-tight select-none"
          style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 18 }}
        >
          Str<span style={{ color: '#FF4800' }}>a</span>veda
        </motion.a>

        {/* ── Center-right nav links (desktop) ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, page }, index) => (
            <motion.a
              key={page}
              href={`#${page}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(page);
              }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.08, ease }}
              className="nav-link relative text-sm transition-colors duration-200 group"
              style={{
                color: isActive(page) ? '#FFFFFF' : '#A1A1A1',
                fontWeight: 400,
                fontSize: 14,
              }}
            >
              {label}
              {/* Orange underline on hover/active */}
              <span
                className="absolute bottom-[-4px] left-0 h-[2px] rounded-full transition-all duration-300 group-hover:w-full"
                style={{
                  backgroundColor: '#FF4800',
                  width: isActive(page) ? '100%' : '0',
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          <motion.button
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
            onClick={() => onNavigate('contact')}
            className="hidden md:block text-white transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: '#FF4800',
              borderRadius: 8,
              padding: '11px 22px',
              fontSize: 14,
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e63f00';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FF4800';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Start a project
          </motion.button>

          {/* Hamburger button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-white cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-in panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="fixed inset-y-0 right-0 z-[60] w-[280px] flex flex-col pt-20 px-6 pb-8"
              style={{
                background: 'rgba(43, 35, 88, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex flex-col gap-1 mt-4">
                {NAV_LINKS.map(({ label, page }, index) => (
                  <motion.a
                    key={page}
                    href={`#${page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileLinkClick(page);
                    }}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.06, ease }}
                    className="block py-3 text-base transition-colors duration-200"
                    style={{
                      color: isActive(page) ? '#FFFFFF' : '#A1A1A1',
                      fontWeight: isActive(page) ? 500 : 400,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {label}
                    {isActive(page) && (
                      <span
                        className="inline-block ml-2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#FF4800' }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.4, ease }}
                className="mt-8 w-full text-white transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: '#FF4800',
                  borderRadius: 8,
                  padding: '13px 22px',
                  fontSize: 14,
                  fontWeight: 500,
                }}
                onClick={() => handleMobileLinkClick('contact')}
              >
                Start a project
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

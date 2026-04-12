'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/straveda/ThemeToggle';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearchToggle: () => void;
}

const NAV_LINKS = [
  { label: 'Services', page: 'services' },
  { label: 'About', page: 'about' },
  { label: 'Testimonials', page: 'testimonials' },
  { label: 'Insights', page: 'insights' },
  { label: 'Contact', page: 'contact' },
] as const;

const ease = [0.4, 0, 0.2, 1] as const;

export default function Navbar({ currentPage, onNavigate, onSearchToggle }: NavbarProps) {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === 'dark';

  // ── Scroll detection (>80px triggers styled navbar) ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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

  // ── Close mobile menu on 'close-all' custom event (Escape key from page.tsx) ──
  useEffect(() => {
    const handleCloseAll = () => {
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('close-all', handleCloseAll);
    return () => window.removeEventListener('close-all', handleCloseAll);
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
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-10"
        style={{
          background: scrolled
            ? isDark
              ? 'rgba(10, 10, 20, 0.85)'
              : 'rgba(255, 255, 255, 0.85)'
            : 'transparent',
          backdropFilter: scrolled
            ? 'blur(12px)'
            : 'none',
          WebkitBackdropFilter: scrolled
            ? 'blur(12px)'
            : 'none',
          borderBottom: scrolled
            ? isDark
              ? '1px solid rgba(255, 255, 255, 0.06)'
              : '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? isDark
              ? '0 1px 3px rgba(0, 0, 0, 0.2)'
              : '0 1px 3px rgba(0, 0, 0, 0.04)'
            : 'none',
          transition: 'background 300ms ease-out, backdrop-filter 300ms ease-out, -webkit-backdrop-filter 300ms ease-out, border-bottom 300ms ease-out, box-shadow 300ms ease-out',
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
          className="font-medium text-lg tracking-tight select-none"
          style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 18, color: isDark ? '#f0f0f5' : '#1a1a2e' }}
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
                color: isActive(page) ? (isDark ? '#f0f0f5' : '#1a1a2e') : (isDark ? '#9ca3af' : '#6b7280'),
                fontWeight: isActive(page) ? 500 : 400,
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

        {/* ── Search + CTA + Hamburger ── */}
        <div className="flex items-center gap-3">
          {/* Theme toggle — desktop */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="hidden md:block"
          >
            <ThemeToggle />
          </motion.div>

          {/* Search icon — desktop */}
          <motion.button
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            onClick={onSearchToggle}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 cursor-pointer"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isDark ? '#f0f0f5' : '#1a1a2e';
              e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? '#9ca3af' : '#6b7280';
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Open search"
          >
            <Search className="h-[18px] w-[18px]" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
            onClick={() => onNavigate('contact')}
            className="hidden md:block text-white transition-all duration-200 cursor-pointer btn-shine"
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
            className="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer"
            style={{ color: isDark ? '#f0f0f5' : '#1a1a2e' }}
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
              className="fixed inset-0 z-[55] bg-black/20 md:hidden"
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
                background: isDark ? 'rgba(10, 10, 20, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
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
                      color: isActive(page) ? (isDark ? '#f0f0f5' : '#1a1a2e') : (isDark ? '#9ca3af' : '#6b7280'),
                      fontWeight: isActive(page) ? 500 : 400,
                      borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
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

              {/* Mobile search button */}
              <motion.button
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.4, ease }}
                className="flex items-center gap-3 py-3 text-base transition-colors duration-200 w-full"
                style={{
                  color: isDark ? '#9ca3af' : '#6b7280',
                  borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
                }}
                onClick={() => {
                  setMobileOpen(false);
                  onSearchToggle();
                }}
              >
                <Search className="h-[18px] w-[18px]" />
                Search
              </motion.button>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.45, ease }}
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

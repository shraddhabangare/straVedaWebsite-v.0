'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
const stickyEase = [0.25, 0.1, 0.25, 1] as const;

export default function Navbar({ currentPage, onNavigate, onSearchToggle }: NavbarProps) {
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isDark = theme === 'dark';

  // ── Scroll-driven animations using Framer Motion ──
  const { scrollY } = useScroll();

  // Header padding transitions: "1.5rem 0" at top → "1rem 0" when scrolled
  const headerPadding = useTransform(scrollY, [0, 80], ['1.5rem 0', '1rem 0']);
  // Header margin transitions: "0 10%" at top → "0 5%" when scrolled
  const headerMargin = useTransform(scrollY, [0, 80], ['0 10%', '0 5%']);
  // Header opacity: 1 at top → 0.5 when scrolled (>80px)
  const headerOpacity = useTransform(scrollY, [0, 80], [1, 0.5]);

  // ── Hydration guard ──
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
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

  // ── Theme-aware colors ──
  const textPrimary = isDark ? '#f0f0f5' : '#1a1a2e';
  const textSecondary = isDark ? '#9ca3af' : '#6b7280';
  const bgTransparent = 'transparent';
  const bgFrosted = isDark ? 'rgba(10, 10, 20, 0.85)' : 'rgba(255, 255, 255, 0.85)';
  const bgSemi = isDark ? 'rgba(10, 10, 20, 0.6)' : 'rgba(255, 255, 255, 0.6)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const shadowStyle = 'shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]';

  if (!mounted) {
    // SSR skeleton — prevents layout shift
    return (
      <header className="fixed top-4 left-0 right-0 z-50 px-0 md:px-0">
        <div className="mx-[10%]">
          <div className="rounded-3xl border border-transparent bg-transparent h-16 flex items-center justify-between px-6 md:px-8" />
        </div>
      </header>
    );
  }

  return (
    <>
      {/* ── Sticky Header ── */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-50"
        style={{ padding: headerPadding }}
        transition={{ duration: 0.4, ease: stickyEase }}
      >
        {/* Inner rounded container */}
        <motion.div
          className="mx-[10%] rounded-3xl border border-border/40 transition-shadow duration-500"
          style={{
            margin: headerMargin,
            background: bgSemi,
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            boxShadow: 'none',
            transition: 'background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* Scroll-driven backdrop blur + background + shadow */}
          <StickyHeaderEffects
            scrollY={scrollY}
            isDark={isDark}
            bgFrosted={bgFrosted}
            shadowStyle={shadowStyle}
          />

          {/* Nav content */}
          <nav
            role="banner"
            className="relative flex items-center justify-between px-6 md:px-8 h-16"
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
              style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 18, color: textPrimary }}
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
                    color: isActive(page) ? textPrimary : textSecondary,
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
                style={{ color: textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textPrimary;
                  e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textSecondary;
                  e.currentTarget.style.background = 'transparent';
                }}
                aria-label="Open search"
              >
                <Search className="h-[18px] w-[18px]" />
              </motion.button>

              {/* CTA — desktop */}
              <motion.button
                initial={{ opacity: 0, y: -16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease }}
                onClick={() => onNavigate('contact')}
                className="hidden md:block text-white transition-all duration-200 cursor-pointer btn-shine rounded-full"
                style={{
                  backgroundColor: '#FF4800',
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
                style={{ color: textPrimary }}
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-[55] md:hidden"
            style={{
              background: isDark ? 'rgba(10, 10, 20, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-6 pt-6">
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                }}
                className="font-medium text-lg tracking-tight select-none"
                style={{ fontFamily: 'Geist, sans-serif', fontWeight: 500, fontSize: 18, color: textPrimary }}
              >
                Str<span style={{ color: '#FF4800' }}>a</span>veda
              </motion.a>

              <button
                className="flex items-center justify-center w-10 h-10 cursor-pointer"
                style={{ color: textPrimary }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Centered nav links — staggered entrance */}
            <div className="flex flex-col items-center justify-center flex-1 pt-24 gap-2">
              {NAV_LINKS.map(({ label, page }, index) => (
                <motion.a
                  key={page}
                  href={`#${page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileLinkClick(page);
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-3xl font-medium py-3 transition-colors duration-200"
                  style={{
                    color: isActive(page) ? textPrimary : textSecondary,
                    fontWeight: isActive(page) ? 600 : 400,
                  }}
                >
                  {label}
                  {isActive(page) && (
                    <span
                      className="ml-1 inline-block w-2 h-2 rounded-full align-middle"
                      style={{ backgroundColor: '#FF4800' }}
                    />
                  )}
                </motion.a>
              ))}

              {/* Search link */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-3 text-3xl font-normal py-3"
                style={{ color: textSecondary }}
                onClick={() => {
                  setMobileOpen(false);
                  onSearchToggle();
                }}
              >
                <Search className="h-7 w-7" />
                Search
              </motion.button>
            </div>

            {/* Bottom: Theme toggle + CTA */}
            <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 px-6">
              {/* Theme toggle — mobile */}
              <ThemeToggle />

              {/* CTA — mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-[280px] text-white transition-all duration-200 cursor-pointer rounded-full"
                style={{
                  backgroundColor: '#FF4800',
                  padding: '14px 28px',
                  fontSize: 16,
                  fontWeight: 500,
                }}
                onClick={() => handleMobileLinkClick('contact')}
              >
                Start a project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sub-component: Scroll-driven frosted glass effect ── */
function StickyHeaderEffects({
  scrollY,
  isDark,
  bgFrosted,
  shadowStyle,
}: {
  scrollY: ReturnType<typeof useScroll>['scrollY'];
  isDark: boolean;
  bgFrosted: string;
  shadowStyle: string;
}) {
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      setShowEffect(v > 80);
    });
    return () => unsubscribe();
  }, [scrollY]);

  if (!showEffect) return null;

  return (
    <div
      className="absolute inset-0 rounded-3xl pointer-events-none"
      style={{
        background: bgFrosted,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
          : '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease, box-shadow 0.4s ease',
        borderRadius: 'inherit',
        zIndex: -1,
      }}
    />
  );
}

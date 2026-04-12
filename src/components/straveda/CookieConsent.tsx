'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'straveda-cookie-consent';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent) return;

    const showTimer = setTimeout(() => {
      setMounted(true);
      // Enable pointer events just after the entrance animation begins
      setTimeout(() => {
        setCanInteract(true);
      }, 50);
    }, 2000);
    return () => clearTimeout(showTimer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setDismissed(true);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setDismissed(true);
  };

  return (
    <div
      className={
        canInteract ? '' : 'pointer-events-none'
      }
    >
      <AnimatePresence>
        {mounted && !dismissed && (
          <motion.div
            key="cookie-consent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-30"
          >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Brand orange accent line at top */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #FF4800 30%, #FF4800 70%, transparent 100%)',
              }}
            />

            <div className="px-5 py-5 sm:px-6 sm:py-5 flex flex-col gap-4">
              {/* Content row */}
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(255, 72, 0, 0.08)' }}
                >
                  <Cookie className="w-4 h-4" style={{ color: '#FF4800' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] sm:text-[14px] leading-relaxed"
                    style={{ color: '#6b7280' }}
                  >
                    We use cookies to enhance your experience. By continuing to visit
                    this site, you agree to our use of cookies.{' '}
                    <a
                      href="#"
                      className="font-medium underline underline-offset-2 transition-colors hover:opacity-80"
                      style={{ color: '#FF4800' }}
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <button
                  onClick={handleDecline}
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
                  aria-label="Close cookie consent"
                >
                  <X className="w-3.5 h-3.5" style={{ color: '#9ca3af' }} />
                </button>
              </div>

              {/* Button row */}
              <div className="flex items-center gap-3 pl-11 sm:justify-end sm:pl-0">
                <button
                  onClick={handleDecline}
                  className="text-[13px] sm:text-sm font-medium rounded-lg px-4 py-2 transition-all duration-200 border"
                  style={{
                    borderColor: '#e5e7eb',
                    color: '#6b7280',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="text-[13px] sm:text-sm font-medium rounded-lg px-5 py-2 text-white transition-all duration-200"
                  style={{
                    background: '#FF4800',
                    boxShadow: '0 2px 8px rgba(255, 72, 0, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e63f00';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 72, 0, 0.35)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FF4800';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 72, 0, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

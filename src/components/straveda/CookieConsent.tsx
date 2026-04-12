'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'straveda-cookie-consent';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent) return;

    const timer = setTimeout(() => {
      setMounted(true);
    }, 2000);
    return () => clearTimeout(timer);
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
    <AnimatePresence>
      {mounted && !dismissed && (
        <motion.div
          key="cookie-consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 w-full"
          style={{
            background: 'rgba(43, 35, 88, 0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#A1A1A1] text-[14px] leading-relaxed text-center sm:text-left">
              We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{' '}
              <a
                href="#"
                className="text-[#FF4800] underline underline-offset-2 hover:text-[#ff6a33] transition-colors"
              >
                Privacy Policy
              </a>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleAccept}
                className="bg-[#FF4800] hover:bg-[#e63f00] text-white font-medium text-sm rounded-lg px-5 py-2.5 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="border border-[#27272A] text-[#A1A1A1] hover:text-white hover:border-white/20 font-medium text-sm rounded-lg px-5 py-2.5 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

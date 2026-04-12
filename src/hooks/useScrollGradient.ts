'use client';

import { useSyncExternalStore, useCallback } from 'react';

/**
 * useScrollGradient — returns a boolean indicating whether the page
 * has scrolled past the given threshold. Used to toggle text-gradient
 * class on hero headings.
 *
 * Uses useSyncExternalStore to avoid setState-in-effect ESLint errors.
 *
 * @param threshold - scroll Y value at which to activate (default 100)
 * @returns `isScrolled` — true when scrollY > threshold
 */
export function useScrollGradient(threshold = 100): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleScroll = () => {
        onStoreChange();
      };
      const handlePageChange = () => {
        onStoreChange();
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('page-change', handlePageChange);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('page-change', handlePageChange);
      };
    },
    [threshold],
  );

  const getSnapshot = useCallback(() => {
    return window.scrollY > threshold;
  }, [threshold]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

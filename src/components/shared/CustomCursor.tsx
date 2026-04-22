'use client';

import { ReactNode, useCallback, useRef, useSyncExternalStore } from 'react';
import { Cursor as PremiumCursor } from '@/components/ui/inverted-cursor';
import { CursorProvider } from '@/lib/utils/cursor-context';

interface CustomCursorProps {
  children: ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  // ─── SSR-safe: fine pointer detection ──────────────────────────────
  const pointerMq = useRef<MediaQueryList | null>(null);

  const subscribeToPointer = useCallback((cb: () => void) => {
    pointerMq.current ??= window.matchMedia('(pointer: fine)');
    pointerMq.current.addEventListener('change', cb);
    return () => pointerMq.current?.removeEventListener('change', cb);
  }, []);

  const getPointerSnapshot = useCallback(() => {
    pointerMq.current ??= window.matchMedia('(pointer: fine)');
    return pointerMq.current.matches;
  }, []);

  const isDesktop = useSyncExternalStore(
    subscribeToPointer,
    getPointerSnapshot,
    () => false, // server snapshot
  );

  // ─── SSR-safe: prefers-reduced-motion detection ────────────────────
  const motionMq = useRef<MediaQueryList | null>(null);

  const subscribeToMotion = useCallback((cb: () => void) => {
    motionMq.current ??= window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMq.current.addEventListener('change', cb);
    return () => motionMq.current?.removeEventListener('change', cb);
  }, []);

  const getMotionSnapshot = useCallback(() => {
    motionMq.current ??= window.matchMedia('(prefers-reduced-motion: reduce)');
    return motionMq.current.matches;
  }, []);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    () => false,
  );

  // Touch or reduced-motion: no custom cursor
  if (!isDesktop || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <CursorProvider>
      <PremiumCursor />
      {children}
    </CursorProvider>
  );
}

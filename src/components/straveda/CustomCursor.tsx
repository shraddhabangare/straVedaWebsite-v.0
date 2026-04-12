'use client';

import { ReactNode, useCallback, useRef, useSyncExternalStore } from 'react';
import { CustomCursor as CursorDot } from '@/components/ui/custom-cursor';

interface CustomCursorProps {
  children: ReactNode;
}

/**
 * Straveda-branded custom cursor wrapper.
 *
 * - Only renders the custom cursor on fine-pointer (desktop) devices.
 *   Touch/touchpad devices get children only — no cursor overlay.
 * - Uses the `useSyncExternalStore` pattern for SSR-safe pointer detection.
 * - Brand color: #FF4800 (orange) with difference blend mode.
 * - Hides the native cursor on desktop via CSS (see globals.css).
 */
export default function CustomCursor({ children }: CustomCursorProps) {
  // ─── Detect fine-pointer device via external store (SSR-safe) ──────
  const pointerMq = useRef<MediaQueryList | null>(null);

  const subscribeToPointer = useCallback((onStoreChange: () => void) => {
    if (!pointerMq.current) {
      pointerMq.current = window.matchMedia('(pointer: fine)');
    }
    pointerMq.current.addEventListener('change', onStoreChange);
    return () => {
      pointerMq.current?.removeEventListener('change', onStoreChange);
    };
  }, []);

  const getPointerSnapshot = useCallback(() => {
    if (!pointerMq.current) {
      pointerMq.current = window.matchMedia('(pointer: fine)');
    }
    return pointerMq.current.matches;
  }, []);

  const getPointerServerSnapshot = useCallback(() => false, []);

  const isDesktop = useSyncExternalStore(
    subscribeToPointer,
    getPointerSnapshot,
    getPointerServerSnapshot,
  );

  // ─── Mobile / touch: render children only, no cursor ─────────────
  if (!isDesktop) {
    return <>{children}</>;
  }

  // ─── Desktop: render the branded cursor alongside children ────────
  return (
    <>
      <CursorDot variant="default" text="" className="bg-[#FF4800]" />
      {children}
    </>
  );
}

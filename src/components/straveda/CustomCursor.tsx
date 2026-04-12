'use client';

import { ReactNode, useCallback, useRef, useSyncExternalStore } from 'react';
import { Cursor as InvertedCursor } from '@/components/ui/inverted-cursor';
import { CursorProvider } from '@/lib/cursor-context';

interface CustomCursorProps {
  children: ReactNode;
}

/**
 * Straveda-branded custom cursor wrapper.
 *
 * - Only renders the custom cursor on fine-pointer (desktop) devices.
 *   Touch/touchpad devices get children only — no cursor overlay.
 * - Uses the `useSyncExternalStore` pattern for SSR-safe pointer detection.
 * - Inverted white cursor (60px) with mix-blend-difference for visibility
 *   on both light and dark backgrounds.
 * - Turns black & shrinks on navbar hover via CursorContext.
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

  // ─── Desktop: render the cursor context + inverted cursor wrapping children ────────
  return (
    <CursorProvider>
      <div className="relative" style={{ cursor: 'none' }}>
        <InvertedCursor defaultSize={60} />
        {children}
      </div>
    </CursorProvider>
  );
}

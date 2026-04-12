'use client';

import { ReactNode, useCallback, useRef, useSyncExternalStore } from 'react';
import { MagneticCursor } from '@/components/ui/magnetic-cursor';

interface CustomCursorProps {
  children: ReactNode;
}

/**
 * Straveda-branded custom cursor wrapper using MagneticCursor.
 *
 * - Only renders on fine-pointer (desktop) devices — touch/touchpad devices get children only.
 * - Uses the `data-magnetic` attribute to create fluid magnetic pull effects on interactive elements.
 * - Brand-configured: orange cursor (#FF4800), difference blend mode, circle shape.
 * - Hides the native cursor on desktop via CSS (see globals.css Phase 21 section).
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

  // ─── Desktop: wrap children with MagneticCursor ──────────────────
  return (
    <MagneticCursor
      cursorColor="#FF4800"
      blendMode="difference"
      shape="circle"
      cursorSize={20}
      magneticFactor={0.3}
      hoverPadding={16}
      speedMultiplier={0.03}
      maxScaleX={0.8}
      maxScaleY={0.25}
      contrastBoost={1.5}
      cursorClassName="straveda-cursor"
    >
      {children}
    </MagneticCursor>
  );
}

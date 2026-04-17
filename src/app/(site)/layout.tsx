import type { ReactNode } from 'react';

/**
 * (site) route group layout
 * Wraps all public-facing marketing/website pages.
 * The root layout (app/layout.tsx) handles <html>, fonts, ThemeProvider.
 * Add site-wide analytics scripts, announcement banners, etc. here.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

---
Task ID: 15-b
Agent: full-stack-developer
Task: Accessibility + Scroll Animation Polish

Work Log:
- Read worklog.md (1002 lines) and page.tsx to understand SPA routing structure
- Created `/src/components/straveda/KeyboardHint.tsx` component:
  - Fixed-position pill at bottom center, z-40
  - Shows on Tab/Arrow/Home/End key press, auto-hides after 3 seconds
  - Styled: bg-[#1e1a3f]/95 backdrop-blur, text-[#A1A1A1], text-[11px], rounded-full
  - Responsive: full hints on desktop, shorter on mobile
  - Framer Motion AnimatePresence for fade in/out (0.25s)
  - role="status" and aria-live="polite" for accessibility
- Updated `/src/app/page.tsx` with comprehensive keyboard navigation:
  - useEffect listening for keydown events (skips when typing in INPUT/TEXTAREA)
  - Left/Right arrows cycle through pages (forward), Shift+Left/Right reverses direction
  - Home/End keys jump to first/last page
  - Escape dispatches custom 'close-all' event for global modal/panel dismissal
  - Number keys 1-5 jump directly to corresponding page
  - Added aria-live="polite" and aria-atomic="true" screen reader live region
  - Added role="main" and tabIndex={0} to main content area
  - Imported and rendered KeyboardHint component
- Updated `/src/components/straveda/Navbar.tsx`:
  - Added role="banner" to the nav element
  - Added 'close-all' custom event listener to close mobile menu on Escape key
- Updated `/src/components/straveda/FloatingCTA.tsx`:
  - Added 'close-all' custom event listener to close expanded contact panel on Escape key
- Updated `/src/components/straveda/pages/InsightsPage.tsx`:
  - Added 'close-all' custom event listener to BlogPostModal for global Escape dismissal
- Created `/src/hooks/useScrollGradient.ts` custom hook:
  - Uses useSyncExternalStore (avoids setState-in-effect ESLint error)
  - Subscribes to scroll and page-change events
  - Returns boolean: true when scrollY > threshold (default 100)
  - Automatically resets when page-change event fires
- Applied scroll-triggered text gradient to hero headings in 4 pages:
  - HomePage.tsx: hero h1 transitions from text-white to text-gradient-brand when scrollY > 100
  - ServicesPage.tsx: hero h1 same scroll gradient effect
  - AboutPage.tsx: hero h1 same scroll gradient effect
  - InsightsPage.tsx: hero h1 same scroll gradient effect
  - All use transitionDuration: 0.6s for smooth CSS transition
- Fixed pre-existing lint error in SearchOverlay.tsx:
  - Moved setQuery('') out of synchronous effect body into callback-based pattern
  - Used useRef to track previous isOpen state
- ESLint: zero errors confirmed

Stage Summary:
- Full keyboard navigation support: arrow keys, number keys, Home/End, Escape for page cycling and modal dismissal
- KeyboardHint component: auto-hiding accessibility hints pill at bottom of viewport
- ARIA accessibility enhancements: live region, role="banner", role="main", tabIndex
- Scroll-triggered text gradient animation on 4 hero headings (white to orange gradient)
- useScrollGradient custom hook using useSyncExternalStore for performance
- Global 'close-all' event system for Escape key to dismiss modals/panels across components
- Pre-existing SearchOverlay lint error fixed
- Zero ESLint errors, all existing functionality preserved

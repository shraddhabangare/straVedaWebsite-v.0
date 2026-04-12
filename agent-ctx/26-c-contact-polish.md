---
Task ID: 26-c
Agent: Full-Stack Developer
Task: Polish the contact page with enhanced visual design, floating labels, and better layout details

Work Log:
- Read worklog.md for project context (Phase 25, 69 features, stable)
- Read current ContactPage.tsx (517 lines) — analyzed all form inputs, hero section, map placeholder
- Implemented all 5 requested enhancements in a single pass

### Changes Made:

1. **Floating Labels on Form Inputs:**
   - Created `FloatingInput` helper component with focused/active state detection
   - Created `FloatingTextarea` helper component for message field
   - Labels animate from placeholder position (centered, 15px, gray #9ca3af) to top border (11px, orange #FF4800, white background pill)
   - CSS transitions: `transition-all duration-200 ease-out` for smooth movement
   - Select dropdown also gets floating label behavior (uses value state instead of focus)
   - All `sr-only` labels replaced with visible floating labels
   - Input border highlights orange on focus, subtle gray on hover

2. **Decorative Accent Dots Below Hero Divider:**
   - Three small dots (6px) in horizontal line: `#FF4800`, `#2B2358`, `#FF4800`
   - Staggered fade-in animation with scale (0.4 → 1) via CSS `@keyframes accent-dot-fade`
   - Animation delays: 0.8s, 1.0s, 1.2s (after the divider animates in at 0.6s)
   - Centered below the existing `h-[2px] w-16 bg-[#FF4800]` divider
   - `aria-hidden="true"` for accessibility

3. **Enhanced Map Placeholder:**
   - Added `map-pin-pulse` CSS animation to MapPin icon (scale 1 → 1.15, 2.5s infinite)
   - Added faint radial gradient behind the map area (`rgba(255,72,0,0.04)`) for depth
   - Added "View on Google Maps" text link below the address text
   - Link opens in new tab, styled with orange underline + hover transition
   - Reduced gap between icon and address for tighter layout

4. **Floating Accent Blob in Hero Section:**
   - 400px radial gradient circle positioned top-right (-top-20, -right-20)
   - Color: `rgba(255,72,0,0.05)` (brand orange at 5% opacity)
   - `pointer-events-none` to not interfere with interactions
   - Hero section given `overflow-hidden` to clip the blob
   - Content container has `relative z-10` to stay above the blob

5. **CSS Animations (Inline `<style>` tag):**
   - `.floating-label-inactive` / `.floating-label-active` classes for label positioning
   - `textarea ~ .floating-label-*` selector overrides for textarea default position
   - `@keyframes accent-dot-fade` for decorative dots
   - `@keyframes map-pin-pulse` for MapPin icon breathing effect

### Verification:
- ESLint: zero errors
- Dev server: compiled successfully, GET / 200
- All existing functionality preserved (form submission, validation, toast notifications)
- All existing props/interfaces unchanged (FormData, serviceOptions, etc.)

Stage Summary:
- Contact page polished with 5 visual enhancements
- Floating labels replace static placeholders with animated labels (#FF4800 when focused)
- Three decorative accent dots below hero divider with staggered fade-in
- Map section enhanced with pulsing icon, radial gradient, Google Maps link
- Floating accent blob adds depth to hero section (top-right corner)
- Zero lint errors, dev server stable

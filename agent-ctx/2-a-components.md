# Task 2-a: SmoothScroll, Navbar, Footer Components

## Files Created

### 1. `/src/components/straveda/SmoothScroll.tsx`
- Lenis smooth scroll provider (`'use client'`)
- Configures duration 1.2s with custom easing
- Exposes `window.__lenis` for GSAP ScrollTrigger integration
- Properly cleans up on unmount

### 2. `/src/components/straveda/Navbar.tsx`
- Fixed top nav, z-50, 64px height
- Background: `rgba(43, 35, 88, 0.95)` with backdrop-filter blur(16px)
- "Str**a**veda" wordmark with orange `#FF4800` accent on "A"
- 4 nav links (Services, About, Insights, Contact) — #A1A1A1, 14px, orange underline on hover via CSS group
- "Start a project" CTA button — #FF4800 bg, hover #e63f00, scale(1.02)
- Props: `currentPage` and `onNavigate`
- Scroll shadow: adds boxShadow when scrollY > 50px
- GSAP entrance: wordmark → nav links stagger → CTA fade in
- Mobile: hamburger icon (Menu/X from lucide-react), slide-in panel from right with GSAP timeline, backdrop overlay, body scroll lock

### 3. `/src/components/straveda/Footer.tsx`
- Background: #2B2358, 2px #FF4800 top border (animated scaleX from center)
- 5-column responsive grid (stacks on mobile via sm/lg breakpoints)
  - Col 1: Wordmark, tagline, LinkedIn icon
  - Col 2: EXPLORE links
  - Col 3: SERVICES links
  - Col 4: RESOURCES links
  - Col 5: CONTACT — email with orange underline, address with MapPin icon
- Bottom bar: copyright + Privacy Policy link
- GSAP ScrollTrigger: border line grow, columns stagger in, bottom bar fade
- All links call `onNavigate` prop
- `mt-auto` for sticky footer behavior

## Notes
- Lint passes cleanly (0 errors, 0 warnings)
- All components use `'use client'` directive
- GSAP ScrollTrigger registered for Footer
- Lucide-react icons: Menu, X, Linkedin, Mail, MapPin

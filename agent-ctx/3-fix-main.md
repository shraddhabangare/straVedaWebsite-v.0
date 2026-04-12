# Task 3-fix: Remove GSAP/Lenis, Use Only Framer Motion

## Summary
Successfully removed all GSAP, ScrollTrigger, and Lenis dependencies from all 7 Straveda page components and layout components. Replaced with Framer Motion animations only.

## Files Modified

### 1. `/home/z/my-project/src/components/straveda/pages/HomePage.tsx`
- Removed: `gsap`, `ScrollTrigger` imports and all `gsap.registerPlugin(ScrollTrigger)`
- Removed: All `useEffect` with GSAP timelines and ScrollTrigger contexts
- Added: `motion` from `framer-motion` for hero word-by-word stagger animation
- Added: `useInView` for scroll-triggered counter animation (14+ years)
- Added: `whileInView` for Services cards, About section, Testimonials, Contact CTA
- Added: Custom `Counter` component using `useEffect` + `requestAnimationFrame`
- Added: `containerVariants`/`cardVariants` for staggered card reveals

### 2. `/home/z/my-project/src/components/straveda/pages/ServicesPage.tsx`
- Removed: `gsap`, `ScrollTrigger` imports
- Added: `motion` for HeroSection entrance animation (eyebrow, accent line, word stagger, subtext)
- Added: `whileInView` with custom direction variants for ServiceBlock slide-in animations
- Added: Staggered card reveals for WhyStraveda section

### 3. `/home/z/my-project/src/components/straveda/pages/AboutPage.tsx`
- Removed: `gsap`, `ScrollTrigger` imports
- Added: `motion` for HeroSection entrance animation
- Added: `whileInView` for Mission section (left/right slide)
- Added: Staggered card reveals for Values section
- Added: Custom `AnimatedCounter` component using `useEffect` + `requestAnimationFrame` for stats (14+, 7, 100%, 2010)
- Added: Staggered tag reveals for Expertise section

### 4. `/home/z/my-project/src/components/straveda/pages/InsightsPage.tsx`
- Removed: `gsap`, `ScrollTrigger` imports
- Added: `motion` for hero word-by-word stagger, accent line, subtext
- Added: `whileInView` for Featured Post, Post Grid (staggered), Newsletter CTA

### 5. `/home/z/my-project/src/components/straveda/pages/ContactPage.tsx`
- Removed: `gsap`, `ScrollTrigger` imports
- Kept: All form state management, API call, toast notifications
- Added: `motion` for hero word-by-word stagger, accent line, subtext
- Added: `whileInView` for Contact Form (slide from left)
- Added: Custom `infoItemVariants` with index-based delay for Contact Info stagger

### 6. `/home/z/my-project/src/components/straveda/Navbar.tsx`
- Removed: `gsap` import and all GSAP timelines
- Added: `AnimatePresence` + `motion.div` for mobile slide-in panel
- Added: `motion.a` for nav links with staggered entrance delays
- Added: `motion.button` for CTA with scale entrance
- Kept: All content, styles, mobile menu behavior, scroll shadow detection

### 7. `/home/z/my-project/src/components/straveda/Footer.tsx`
- Removed: `gsap`, `ScrollTrigger` imports
- Added: `useInView` for scroll-triggered top border scaleX animation
- Added: `staggerContainer` + `columnVariants` for column reveals
- Added: `motion.div` for bottom bar fade-in
- Kept: All content, links, hover effects

### 8. `/home/z/my-project/src/app/globals.css`
- Removed: Lenis CSS classes (`.lenis`, `.lenis-smooth`, `.lenis-stopped`)
- Removed: GSAP animation helpers (`.gsap-reveal`, `.gsap-reveal-left`, `.gsap-reveal-right`, `.gsap-reveal-scale`, `.gsap-word-reveal`, `.gsap-line-reveal`)
- Removed: `.hero-word` CSS (now handled by Framer Motion inline styles)
- Removed: Page transition CSS (handled by Framer Motion `AnimatePresence`)
- Kept: Card hover lift, button flair, magnetic cursor, bounce-slow, orange-pulse animations

## Verification
- ESLint: ✅ No errors
- Dev server: ✅ Running and serving pages
- No `gsap` or `lenis` imports remain in active source files
- `SmoothScroll.tsx` still exists but is NOT imported anywhere (dead code)

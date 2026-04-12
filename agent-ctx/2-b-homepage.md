# Task 2-b: HomePage Component

## Status: ✅ Completed

## What was built
Created `/home/z/my-project/src/components/straveda/pages/HomePage.tsx` — a complete enterprise homepage with 5 sections, all using GSAP ScrollTrigger for scroll-based animations.

## Sections Implemented

### Section 1A — HERO (100vh, black background)
- Eyebrow with orange dash prefix
- Word-by-word stagger headline animation (10 words, 0.08s stagger, `power3.out`)
- "efficiently." has orange period (`#FF4800`)
- Tagline with fade + translateY animation
- Two CTA buttons with stagger animation
- Social proof row (5 stars, 5.0 rating, Google Reviews)
- Bouncing ChevronDown scroll indicator

### Section 1B — SERVICES TEASER (black bg, top divider)
- Orange eyebrow "OUR SERVICES"
- Headline with ScrollTrigger fade-in
- 4-column card grid (Enterprise Architecture, Technology Strategy, Management Consulting, Software Solutions)
- Each card: lucide-react icon, orange badge, title, body, "Learn more →" link
- ScrollTrigger stagger reveal (0.1s)

### Section 1C — ABOUT / STATS (black bg, 40/60 split)
- Left: Animated counter for "14+", location with MapPin icon
- Right: About text, 3-column stats row with orange dividers
- Left/right slide-in animations

### Section 1D — TESTIMONIALS (#2B2358 dark indigo)
- 3 testimonial cards with orange quote marks, star ratings, quotes, names
- Stagger reveal animation

### Section 1E — CONTACT CTA (black bg, centered)
- Large headline, subtext, primary orange CTA button
- Email link with orange underline
- Fade + scale ScrollTrigger animation

## Technical Details
- `gsap.registerPlugin(ScrollTrigger)` called at module level
- Hero uses `gsap.timeline()` with sequential animations on mount
- All other sections use `ScrollTrigger` with `start: "top 80%"` and `toggleActions: "play none none reverse"`
- `gsap.context()` used for scoping ScrollTrigger instances per section
- Full cleanup on unmount: timeline kill, context revert, ScrollTrigger kill
- ESLint: 0 errors
- Dev server: compiles successfully

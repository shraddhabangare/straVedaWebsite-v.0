# Project Status & Roadmap: Straveda LLC x McShannock Design Replication

This document outlines the progress made so far in replicating the premium, pixel-perfect aesthetic and animation fidelity of `mcshannock.design` for the Straveda LLC website, as well as the roadmap for future development.

---

## ✅ Phase 1: Completed Work (Current State)

### 1. Architecture & Setup
* **Framework**: Next.js 15 (App Router) configured for optimal SEO and performance (SSR/SSG).
* **Styling Engine**: Tailwind CSS v4 integrated with a custom design system.
* **Color Palette**: Successfully pivoted to the requested light theme (White, Black, and Brand Orange `#FF4800`), overriding the initial dark indigo theme.
* **Typography**: Integrated `next/font/google` using the **Geist** font family for a modern, clean enterprise look.

### 2. Pages & Routing
* **Home (`/`)**: Full landing page structure.
* **About (`/about`)**: Story, mission, and stats.
* **Services (`/services`)**: Detailed capabilities breakdown.
* **Insights (`/insights`)**: Blog listing page.
* **Insight Detail (`/insights/[slug]`)**: Dynamic routing for individual articles with `generateStaticParams`.
* **Contact (`/contact`)**: Contact form and company information.

### 3. UI Components
* **Core UI**: Extracted reusable components including `Button`, `Card`, `Divider`, and `SectionLabel`.
* **Layout**: Built a responsive `Navbar` and a comprehensive 5-column `Footer`.
* **Sections**: Modularized page sections (`Hero`, `ServicesGrid`, `AboutStats`, `Testimonials`, `ContactCTA`, `Newsletter`).

### 4. Baseline Animations (Framer Motion)
* **Animation Library**: Integrated `motion/react`.
* **Global Variants**: Created `lib/animations.js` with `fadeUpVariants` and `staggerContainer` using precise cubic-bezier easing (`[0.16, 1, 0.3, 1]`) to match premium agency feels.
* **Scroll Triggers**: Implemented `whileInView` across all major sections so elements reveal smoothly as they enter the viewport.
* **Navbar**: Added a smooth slide-down entrance animation on initial load.
* **Motion Wrapper**: Created a reusable `<FadeUpStagger>` and `<FadeUpItem>` utility to easily wrap server components in client-side animations.

---

## 🚧 Phase 2: Future Roadmap (What is Left to Build)

To achieve **100% pixel-perfect parity** with the high-end interaction design of `mcshannock.design`, the following advanced features must be implemented:

### 1. Advanced Animations & Interactions
* **Smooth Scrolling**: Implement a smooth scroll library (like **Lenis** or Locomotive Scroll) to hijack native scrolling and provide a buttery, eased scroll experience.
* **Magnetic Buttons**: Add Framer Motion logic to make buttons and icons "pull" slightly toward the user's cursor on hover.
* **Custom Cursor**: Replace the default browser cursor with a custom follower (e.g., a small dot that expands when hovering over clickable elements).
* **Page Transitions**: Wrap the Next.js `template.tsx` or layout in `AnimatePresence` to create seamless fade/slide transitions between route changes (no hard reloads or flickers).
* **Parallax Effects**: Add subtle vertical parallax to background elements and images as the user scrolls.
* **Infinite Marquee**: Build a smooth, continuously scrolling horizontal marquee for client logos or a list of services.

### 2. Image Sizing & Handling
* **Next/Image Integration**: Replace any placeholder blocks with highly optimized `next/image` components.
* **Aspect Ratios**: Enforce strict aspect ratios (e.g., `aspect-[4/3]` or `aspect-square`) on all imagery to match the reference grid perfectly.
* **Image Reveals**: Implement "wipe" or "unveil" animations where a colored block slides away to reveal the image underneath as it scrolls into view.
* **Scale-on-Scroll**: Add a subtle scale-down effect (e.g., `scale: 1.1` to `scale: 1.0`) on images as they enter the viewport.

### 3. UI & Layout Polish
* **Mobile Navigation**: Build a full-screen, animated hamburger menu overlay for mobile devices, featuring staggered link reveals.
* **Bento Grid Layouts**: Refine the `ServicesGrid` and `AboutStats` into tighter, pixel-perfect "bento box" layouts with precise 1px borders and exact gap measurements.
* **Interactive Accordions**: Build animated FAQ or Service Detail accordions where the height animates smoothly on open/close.
* **Hover States**: Enhance card hover states with dynamic shadow casting and subtle border color transitions.

### 4. Content & Data
* **CMS Integration**: (Optional) Move the static `lib/insights.js` data into a headless CMS or MDX setup for easier content management.
* **Form Submission**: Connect the `ContactForm` to a real API endpoint (e.g., Resend, SendGrid, or a Next.js Server Action) to handle live inquiries.

---
Task ID: 4b-features
Agent: Main Agent
Task: Create SmoothScroll, BackToTop, and Preloader components

Work Log:
- Read worklog.md for project context (Straveda website with Framer Motion animations)
- Created SmoothScroll.tsx - Lenis smooth scroll provider with custom easing and touch support
- Created BackToTop.tsx - Floating button with Framer Motion entrance/exit, appears after 400px scroll
- Created Preloader.tsx - Full-screen loader with spinning ring and brand name, auto-dismisses after 1.2s
- Verified ESLint passes with zero errors

Stage Summary:
- All 3 components created at /src/components/straveda/
- SmoothScroll wraps children with Lenis for butter-smooth scrolling
- BackToTop uses AnimatePresence for smooth show/hide with Straveda brand orange (#FF4800)
- Preloader shows spinning loader with branded text, fades out with 0.5s transition
- Zero ESLint errors

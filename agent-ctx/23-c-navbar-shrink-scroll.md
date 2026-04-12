---
Task ID: 23-c
Agent: Full-Stack Developer
Task: Fix navbar to reduce size on scroll down

Work Log:
- Read worklog.md (Phase 22 context) and current Navbar.tsx (408 lines)
- Identified the problem: headerMargin went 10% → 5% (navbar gets WIDER on scroll), opacity faded to 0.5
- Changed headerMargin from ["0 10%", "0 5%"] to ["0 8%", "0 15%"] — margins INCREASE on scroll, navbar NARROWS
- Changed headerPadding from ["1.5rem 0", "1rem 0"] to ["1.5rem 0", "0.75rem 0"] — more compact
- Removed headerOpacity transform entirely (was fading to 0.5) — navbar stays fully visible
- Added navHeight useTransform: 64px → 52px on scroll, applied to nav container via style
- Added wordmarkSize useTransform: 18px → 15px on scroll, applied to wordmark
- Added navLinkSize useTransform: 14px → 13px on scroll, applied to nav links
- Removed redundant mx-[10%] className from inner motion.div (inline style handles margin)
- Updated SSR skeleton margin from mx-[10%] to mx-[8%] to match new default state
- Frosted glass effect (StickyHeaderEffects) preserved with 80px threshold
- All existing functionality preserved: theme toggle, search, CTA, mobile hamburger, full-screen mobile menu
- Note: Could not append to worklog.md due to root-owned file permissions (uid=1001(z))

Stage Summary:
- Navbar now SHRINKS (narrows) when scrolling down: side margins 8%→15%, height 64px→52px, font sizes reduce
- Opacity stays at 1 (no fading) — navbar remains fully visible
- Frosted glass effect still activates at 80px scroll threshold
- Zero lint errors, dev server compiles successfully

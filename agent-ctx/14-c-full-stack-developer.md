# Task 14-c: Blog Category Filtering + Mobile FloatingCTA

## Agent: full-stack-developer
## Task: Blog Category Filtering on InsightsPage + Enable Mobile FloatingCTA Support

---

## Work Log:

### Part 1: Blog Category Filtering on InsightsPage
- Read worklog.md (1002 lines, 13 phases of prior work) for full project history
- Read InsightsPage.tsx (457 lines) to understand current blog post grid structure
- Added `filterCategory` field to all 7 blog posts (featuredPost + 6 posts array):
  - Architecture: "The Case for Open Standards in Modern Enterprise Architecture", "Microservices vs. Monolith: An Enterprise Decision Framework"
  - Strategy: "How to Align IT Investment with Business Goals", "Building a Digital Transformation Roadmap That Works"
  - Cloud: "Red Hat Middleware: Lowering TCO at Scale"
  - Leadership: "Eliminating Enterprise Delivery Bottlenecks", "Agile PMO: Bridging Traditional Governance and Modern Delivery"
- Added `FilterCategory` type union and `categories` constant array ['All', 'Architecture', 'Strategy', 'Cloud', 'Leadership']
- Added `useMemo` import and `activeCategory` state (default: 'All')
- Created `filteredPosts` computed value that filters posts based on activeCategory
- Built category filter bar section with `section-glow-top` class above the post grid:
  - 5 category pill buttons with rounded-full, text-[13px] font-medium
  - Active pill: bg-[#FF4800] text-white (no border)
  - Default pill: bg-transparent border border-white/10 text-[#A1A1A1]
  - Hover (non-active): border-[#FF4800]/40 text-white
  - Framer Motion whileTap={{ scale: 0.95 }} press feedback on all pills
  - Scroll-triggered reveal with whileInView + viewport={{ once: true, margin: '-100px' }}
- Added "Showing X articles" count indicator below pills, updates dynamically with filter
- Replaced parent stagger variants with AnimatePresence mode="popLayout" on the grid:
  - Each post uses `layout` prop for smooth position transitions between filter states
  - Enter animation: opacity 0, scale 0.95, y 20 → opacity 1, scale 1, y 0 (with 0.05s stagger delay per post)
  - Exit animation: opacity 0, scale 0.95, y 10 (0.25s duration)
  - Posts use `post.title` as stable key for AnimatePresence tracking
  - Original post index preserved via `posts.indexOf(post)` for modal click handler
- Removed unused `useEffect` import (only `useMemo` needed for filter computation)

### Part 2: Enable Mobile FloatingCTA Support
- Read FloatingCTA.tsx (313 lines) to understand current desktop-only FAB implementation
- Removed `md:hidden` placeholder div that was hiding the component on mobile
- Added `isMobile` state with window resize listener (default: true for SSR safety)
- Added `ArrowRight` icon import from lucide-react for mobile panel navigation link
- Extracted `handleNavigateToContact` callback for reusable navigation logic
- FAB now visible on all screen sizes:
  - Mobile: w-12 h-12, right-4
  - Desktop: md:w-14 md:h-14, md:right-6
  - Safe area support: `style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}`
  - z-[47] to stay above both panel types and backdrop
- Mobile panel implementation:
  - Fixed position bottom-0 right-4, width calc(100vw - 2rem), max-w-[320px]
  - rounded-t-2xl with square bottom (borderBottom: none)
  - Slides up from bottom with Framer Motion (y: '100%' → y: 0, 0.35s duration)
  - backdrop-filter blur(16px), indigo glass background
  - Content: Name input, Email input, "Send quick message" primary button, "Go to Contact Page" link
  - Close on backdrop tap (shared overlay)
- Desktop panel: unchanged behavior, positioned above FAB with full form (name, email, message, submit)
  - Now uses conditional `!isMobile` rendering instead of CSS `hidden md:block` class
  - z-[46] for proper layering below FAB
- Shared backdrop overlay: fixed inset-0 bg-black/40 z-[44], closes panel on click
- Tooltip only renders on desktop (guarded by `!isMobile` check)

### Part 3: Verification
- Ran `bun run lint`: zero errors confirmed
- Both files compile without TypeScript or ESLint issues

---

## Stage Summary:
- **Blog category filtering**: Interactive filter bar with 5 categories, AnimatePresence transitions, dynamic article count
- **7 blog posts tagged**: 2 Architecture, 2 Strategy, 1 Cloud, 2 Leadership
- **Mobile FloatingCTA**: Compact slide-up panel with name/email + navigation to contact page, safe area bottom margin
- **Desktop FloatingCTA**: Preserved full form behavior unchanged
- **ESLint**: Zero errors confirmed
- **Files modified**: InsightsPage.tsx (now ~480 lines), FloatingCTA.tsx (now ~310 lines)

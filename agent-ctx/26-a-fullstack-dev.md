---
Task ID: 26-a
Agent: Full-Stack Developer
Task: Dark mode CSS for services animated hover modal + enhance ScrollProgress component

Work Log:
- Read worklog.md for project context (Phase 25, animated hover modal integrated, dark mode visual QA needed)
- Read globals.css (2379 lines) to identify append point
- Read services-with-animated-hover-modal.tsx to identify hardcoded light-mode classes
- Read ScrollProgress.tsx to assess enhancement needs

Task 1 — Dark Mode for Animated Hover Modal:
- Appended scoped dark mode CSS overrides to END of globals.css (no existing styles modified)
- `.dark .bg-\[\#f9f9f9\]` → background-color: #0f0f1a (deep dark navy)
- `.dark .border-\[rgb\(201\,201\,201\)\]` → border-color: rgba(255,255,255,0.08)
- `.dark .bg-\[\#f9f9f9\] .text-\[\#1a1a2e\]` → color: #f0f0f5 (titles scoped to section)
- `.dark .bg-\[\#f9f9f9\] .text-\[\#9ca3af\]` → color: #a1a1aa (subtitles)
- `.dark .bg-\[\#f9f9f9\] .text-\[\#6b7280\]` → color: #9ca3af (description/"Explore" text)
- `.dark .bg-\[\#f9f9f9\] .shadow-2xl` → darker shadow for modal image container

Task 2 — Enhance ScrollProgress Component:
- Existing component already used gradient `linear-gradient(90deg, #FF4800, #ff6a33)` ✓
- Added box-shadow glow effect on progress bar: `0 0 8px rgba(255,72,0,0.5), 0 0 20px rgba(255,72,0,0.2)`
- Added ambient glow layer: separate motion.div below the bar with blur(6px) filter
- Glow intensity (opacity) is spring-animated based on scroll progress for smooth fade-in
- Preserved all existing functionality: spring smoothing, top position transform, page reset

Verification:
- ESLint: zero errors
- Dev server: compiled successfully, GET / 200

Stage Summary:
- 6 dark mode CSS rules appended to globals.css for the services animated hover modal section
- All overrides are scoped using `.dark .bg-\[\#f9f9f9\]` parent context to avoid affecting other sections
- ScrollProgress enhanced with dual-layer glow: direct box-shadow + blurred ambient layer
- Brand gradient #FF4800 → #FF6B33 preserved and enhanced
- Zero lint errors, dev server stable

# MINERVA UI Doctrine

## Positioning

MINERVA is a calm, adult-friendly personal math tutor — not a military game or test-prep drill app.

## Style

- **Stanford Cardinal** (`#8c1515`) as the primary accent
- Light academic surfaces (page `#f7f7f7`, cards white)
- Cool gray and sandstone for secondary text
- Duolingo-style progression (path map, bottom nav, chunky Continue buttons)
- Khan-style lesson clarity (left-aligned copy, readable steps)

## Layout

- Mobile-first, max width ~512px (`max-w-lg`)
- Lesson and hub content is **left-aligned** for readability
- Landing hero and profile summary may center key stats
- Bottom tab bar: Learn · Practice · Quick drills · You

## Usability rules

- Math must remain readable (KaTeX for fractions and equations)
- Animations must not hide learning; respect reduced motion
- Wrong answers use gentle feedback — no lives, no shame
- Progress always visible (lesson bar, XP, path map)
- Explicit **Continue** after question feedback (no forced auto-advance)

## Token naming

Use semantic tokens: `text-primary`, `text-secondary`, `bg-surface-page`, `bg-surface-card`, `text-cardinal`.

## Accessibility

- Focus rings on interactive elements
- Progress bars use `role="progressbar"`
- Path nodes use SVG icons with `aria-label`
- Settings: large text, high contrast, reduced motion

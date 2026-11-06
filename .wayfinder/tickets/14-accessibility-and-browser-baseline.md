---
title: Set accessibility and browser-support baseline
type: grilling
status: closed
assignee: rupali
blocked-by: [09-design-direction]
---

## Question

Choose the accessibility target (e.g. WCAG 2.2 AA), the concrete checks for the chosen sidebar design (contrast in light and dark, focus states, skip link, keyboard-operable theme toggle, reduced motion, mobile sidebar collapse), and the browser-support baseline (evergreen only, or older). Decide how it is checked (axe, Lighthouse, manual).

## Resolution

Decided with the owner:
- Accessibility target: WCAG 2.2 AA. Concrete checks for design D (sidebar plus index rows): text contrast of at least 4.5:1 in light and dark, including muted date and tag text; visible focus outline on nav links, index rows and the theme toggle; a "skip to content" link past the sidebar; keyboard-operable theme toggle that announces its state; `prefers-reduced-motion` respected; one `<h1>` per page, correct heading order, landmark regions (`<nav>`, `<main>`); tap targets of at least 24x24px; meaningful alt text; text resizes without breakage; mobile sidebar strip usable by keyboard and screen reader.
- Browser support: evergreen plus a 4-5 year window, roughly Chrome/Edge 100+, Firefox 100+, Safari and iOS Safari 15.4+, Chrome on Android. Set via one `browserslist` entry. Stick to CSS that range supports (system fonts, variables, flexbox, grid, `prefers-color-scheme`); avoid CSS nesting, `:has()`, container queries and `color-mix()` unless given a plain fallback. Older browsers are unsupported but get readable plain HTML.
- No JavaScript: the site is fully readable, and the theme follows the system.
- Verification: manual gate, same moments as the performance gate (ticket 12): before launch and after changes to layout, colours or nav. Automated pass (axe or Lighthouse accessibility), keyboard-only pass over every page, and one VoiceOver pass on Home. Browser check at launch: oldest supported iOS Safari, plus Chrome and Firefox.

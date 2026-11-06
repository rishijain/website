---
title: Pick minimal design direction
type: prototype
status: closed
assignee: rupali
blocked-by: [08-site-structure-and-content-model]
---

## Question

Make a cheap, rough artifact (a throwaway static page or two variants) to react to: typography, spacing, colour, light/dark, and how a minimal text-light home page and blog index should feel. Outcome: a chosen direction the build spec can reference.

## Resolution

Chosen with the owner: **variant D, sidebar plus index rows** (a hybrid of variant B's sidebar and variant C's ruled index rows). Prototype (variants A-D, throwaway, never to be merged): branch `prototype/design-direction`, file `.wayfinder/prototype/design-direction.html`.
- Layout: fixed left sidebar (photo, name, role "Product engineer", the only navigation, contact links at the bottom); main column on the right, about 760px max.
- Home: headline (positioning line), short bio, "Selected work" index rows (hand-curated), "Latest posts" index rows. The sidebar is the only nav, so the main column does not repeat it.
- Blog index: tag chips above a year-grouped list of index rows (date, title, tags).
- Index rows: ruled lines, a small mono number or date, bold title, mono tag column; they invert on hover.
- Type: system fonts only (no web font requests, supports the sub-1-second goal); sans body, monospace for dates, numbers and tags.
- Colour: light and dark both, default follows the system via `prefers-color-scheme`. A sidebar toggle with three states (system/light/dark) saves the choice in `localStorage`; an inline `<head>` script applies it before first paint to avoid a flash.
- Mobile: below 760px the sidebar collapses into a strip above the content, and each row's tag wraps to a second line. NOT yet tested by the owner on a phone: verify at build time, and compact the nav strip if it takes too much of the first screen.

---
title: Decide share images, favicon and metadata assets
type: grilling
status: closed
assignee: rupali
blocked-by: [08-site-structure-and-content-model, 09-design-direction]
---

## Question

Decide the social/share preview images (one default, or generated per blog post at build time?), favicon and app icons, the photo used in Person JSON-LD, and default OG/Twitter metadata. Keep it simple and fast; say who creates each asset and where it lives in the repo.

## Resolution

Decided with the owner:
- Share image: one default for every page, `og-default.png`, 1200x630, under about 100 KB, with the owner's name, title and a plain background matching the design direction (variant D). Per-post generated images are a later upgrade; only the image URL in the metadata template would change.
- Favicon: initials, as a single hand-written `favicon.svg` in the site's accent colour, dark-mode aware (via `prefers-color-scheme` in the SVG), plus a 180x180 PNG `apple-touch-icon`. No web manifest and no 192/512 PNG icons (not an installable app).
- Authorship: Claude makes the favicon and the share image (SVG or HTML template rendered to PNG, committed as files). Regenerate by asking Claude to edit the source SVG. Assets live in `public/`.
- Profile photo: supplied by the owner (ticket 06). Astro resizes it to a square and converts to WebP or AVIF at build time, under the 40 KB above-the-fold image budget (ticket 12). Also used as the `image` in Person JSON-LD.
- Default metadata on every page, filled per page from front matter: `<title>`, `<meta name="description">`, canonical URL, `og:title`, `og:description`, `og:image`, `og:type` (`website` for pages, `article` for posts), `twitter:card=summary_large_image`.

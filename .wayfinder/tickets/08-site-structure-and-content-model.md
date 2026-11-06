---
title: Define site structure and content model
type: grilling
status: closed
assignee: rupali
blocked-by: [03-seo-and-aeo-requirements]
---

## Question

Decide the pages and URLs (Home/About, Resume, Projects, Blog, Contact?), what each says in minimal text, how the resume page and PDF relate, the shape of a blog post (front matter, tags), and the tag taxonomy approach, all shaped by the SEO/AEO requirements.

## Resolution

Decided with the owner:
- Home page `/` is the About page: name as `<h1>`, positioning line, 2-3 sentence bio, photo, links, 3 latest posts. No separate `/about`.
- Positioning line (provisional, expected to change): "Product engineer building production AI agents. Rails conference speaker." JSON-LD `jobTitle`: "Product engineer". Proof points: production AI agents, Rails expertise, conference speaking.
- Pages: `/`, `/resume`, `/projects`, `/talks`, `/blog`, `/blog/<slug>`, `/blog/tags/<tag>`, `/contact`, plus `/resume.pdf`, `/rss.xml`, `/sitemap.xml`, `/robots.txt`, custom 404.
- Nav order (same on every page): Home, Resume, Projects, Talks, Blog, Contact. Lowercase URLs, no trailing slash.
- Resume: HTML page and PDF both built from one resume data file (single source of truth). Other pages link to projects/talks by name rather than repeating descriptions.
- Projects: about 4, one Markdown entry each (title, one-line summary, role, stack, links, year); list only, no detail pages for now. Some work may be under NDA.
- Talks: separate page; one Markdown entry per talk (title, conference, date, video and slides links).
- Blog post: slug fixed at creation, no date in URL. Front matter: `title`, `description` (~150 chars), `pubDate`, `updatedDate` (optional), `tags`, `draft`. Drafts excluded from build. `BlogPosting` JSON-LD with owner as author, linked to the Person entity.
- Tags: controlled vocabulary in one file, build fails on unknown tag. Initial five: `ai-agents`, `rails`, `speaking`, `building-products`, `career`.
- Contact: `/contact` page with email, LinkedIn, GitHub, optional calendar link; same links in the footer of every page and in Person `sameAs`.
- RSS at `/rss.xml` via Astro's official package, advertised with `<link rel="alternate">`.

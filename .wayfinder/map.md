---
label: wayfinder:map
title: Personal website: resume, portfolio, blog
---

## Destination

A build-ready spec of locked decisions (stack, host, SEO/AEO approach, content model, design direction, deploy/edit workflow) for a personal site at firstnamelastname.com, which a separate agent session can build without further decisions. Planning only: no site is built in this map.

## Notes

- Tracker: local-markdown. Tickets live in `.wayfinder/tickets/NN-slug.md` with front matter `type`, `status` (open/closed), `assignee`, `blocked-by`. Frontier = open, unassigned, all blockers closed.
- Audience (equal first priority): recruiters, hiring managers, potential clients. Blog readers second.
- Key goal: searching the owner's name, or asking an AI "who is <name>?", surfaces the site and cites it accurately (SEO + AEO).
- Hard requirements: loads in under 1 second; easy to change; easy to deploy; as simple as possible.
- Default stance: static site, no server to maintain, content as Markdown in git. A backend needs a justification. Stack/host are open to recommendation.
- Contact: links only (email, LinkedIn, GitHub) plus an optional calendar-booking link. No form.
- Blog: weekly cadence, tags yes, comments no, RSS only if it helps discovery.
- Design: minimal, text-light (visitors skim), nothing flashy. Separate pages (e.g. Home/About, Resume, Projects, Blog, Contact) with a downloadable PDF resume.
- Analytics: privacy-friendly, cookie-free, no consent banner.
- Editing: Markdown + git push to deploy; Claude does most edits. No CMS UI.
- Starting from nothing: no domain, resume or content yet.

## Decisions so far

<!-- one line per closed ticket -->

- [Compare static site generators](tickets/01-compare-static-site-generators.md): Astro, Hugo, Eleventy, Zola all fit; Next.js export keeps a React runtime. No perf data yet.
- [Compare hosting and deploy options](tickets/02-compare-hosting-and-deploy.md): Vercel Hobby bars commercial use; Netlify is credit-limited; Cloudflare and GitHub Pages are viable. Check Pages vs Workers.
- [Establish current SEO and AEO requirements](tickets/03-seo-and-aeo-requirements.md): AEO is SEO for Google: static HTML, Person JSON-LD, sitemap, permissive robots, good Core Web Vitals. Skip llms.txt.
- [Compare privacy-friendly analytics](tickets/04-compare-privacy-friendly-analytics.md): Plausible, GoatCounter, Umami, Fathom are cookie-free; GoatCounter free and ~3.5KB.

## Not yet specified

- Weekly publishing workflow (drafting, scheduling, Claude-assisted posting) and tag strategy.
- Performance budget and how "under one second" is verified.
- Social/share preview images, favicon, and other metadata assets.
- Resume PDF generation (single source of truth with the resume page?).
- Accessibility and browser-support baseline.
- Final assembly of the build spec.

## Out of scope

- Building or deploying the site (follows this map, separate sessions).
- Comments, contact form, CMS UI, newsletter.

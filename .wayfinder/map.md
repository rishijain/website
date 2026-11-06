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
- Stack (decided): fully static Astro site on Cloudflare Workers static assets, source in GitHub, deploy on push to `main`. No backend.
- Contact: links only (email, LinkedIn, GitHub) plus an optional calendar-booking link. No form.
- Blog: weekly cadence, tags yes, comments no, RSS only if it helps discovery.
- Design: minimal, text-light (visitors skim), nothing flashy. Separate pages (e.g. Home/About, Resume, Projects, Blog, Contact) with a downloadable PDF resume.
- Analytics: Cloudflare Web Analytics (privacy-friendly, cookie-free); GoatCounter as fallback.
- Editing: Markdown + git push to deploy; Claude does most edits. No CMS UI.
- Starting from nothing: no domain, resume or content yet.

## Decisions so far

<!-- one line per closed ticket -->

- [Compare static site generators](tickets/01-compare-static-site-generators.md): Astro, Hugo, Eleventy, Zola all fit; Next.js export keeps a React runtime. No perf data yet.
- [Compare hosting and deploy options](tickets/02-compare-hosting-and-deploy.md): Vercel Hobby bars commercial use; Netlify is credit-limited; Cloudflare and GitHub Pages are viable. Check Pages vs Workers.
- [Establish current SEO and AEO requirements](tickets/03-seo-and-aeo-requirements.md): AEO is SEO for Google: static HTML, Person JSON-LD, sitemap, permissive robots, good Core Web Vitals. Skip llms.txt.
- [Compare privacy-friendly analytics](tickets/04-compare-privacy-friendly-analytics.md): Plausible, GoatCounter, Umami, Fathom are cookie-free; GoatCounter free and ~3.5KB.
- [Choose static site generator and host](tickets/05-choose-generator-and-host.md): Astro, fully static, on Cloudflare Workers static assets; GitHub push-to-deploy; Cloudflare Web Analytics; Cloudflare Registrar (purchase later). About $11/yr total.
- [Define site structure and content model](tickets/08-site-structure-and-content-model.md): `/` is About; Resume (HTML+PDF from one file), Projects (~4), Talks, Blog (5 fixed tags), Contact; RSS yes.
- [Decide AI crawler policy](tickets/10-ai-crawler-policy.md): Allow all AI bots (training and search); permissive `robots.txt` with sitemap line; verify Cloudflare AI-bot settings are off.
- [Pick minimal design direction](tickets/09-design-direction.md): Variant D: left sidebar nav plus ruled index rows; system fonts; light/dark following the system with a saved override. Mobile still to verify.
- [Set performance budget and how it is verified](tickets/12-performance-budget.md): LCP under 1.0s on Lighthouse mobile; under 100 KB per page, 5 KB JS, no web fonts; manual Lighthouse gate before launch and after layout, image or script changes.
- [Decide share images, favicon and metadata assets](tickets/13-share-images-and-metadata-assets.md): One default 1200x630 share image; initials SVG favicon plus apple-touch-icon; Claude makes both; default OG/Twitter metadata on every page.
- [Set accessibility and browser-support baseline](tickets/14-accessibility-and-browser-baseline.md): WCAG 2.2 AA with design-D checks; browsers from the last 4-5 years via browserslist; readable with JS off; manual axe/keyboard/VoiceOver gate at launch and after layout changes.
- [Define weekly publishing workflow](tickets/11-weekly-publishing-workflow.md): Any mix of Claude-written and owner-written posts; owner approves every post, no invented first-hand claims; publish on push with `draft` flag; tags added by deliberate edit; `content/ideas.md` backlog.
- [Assemble the build spec](tickets/15-assemble-build-spec.md): Written to `.wayfinder/spec.md`; owner inputs (06, 07) and veto-able defaults listed in it.

## Not yet specified

- Nothing left to decide. Remaining owner inputs: resume, bio, photo ([06](tickets/06-gather-content-and-assets.md)); domain ([07](tickets/07-buy-domain.md)).

## Out of scope

- Building or deploying the site (follows this map, separate sessions).
- Comments, contact form, CMS UI, newsletter.

---
title: Assemble the build spec
type: task
status: closed
assignee: rupali
blocked-by: [11-weekly-publishing-workflow, 12-performance-budget, 13-share-images-and-metadata-assets, 14-accessibility-and-browser-baseline, 10-ai-crawler-policy]
---

## Question

Merge every closed ticket into one build-ready spec at `.wayfinder/spec.md`: stack, host and deploy, repo layout, pages and URLs, content model and front matter, design direction, SEO/AEO (JSON-LD, sitemap, robots, canonicals), analytics, performance budget, accessibility, assets, publishing workflow, and a build checklist. A separate agent session must be able to build the site from it with no further decisions. List anything still owed by the owner (resume, bio, photo, domain) as inputs, not decisions. Re-check the Cloudflare analytics consent note and the AI-bot settings.

## Resolution

Build spec written to `.wayfinder/spec.md` from tickets 01-14. It covers stack and host, repo layout, pages and URLs, content model, SEO/AEO (head tags and JSON-LD), design (variant D), resume and PDF, publishing workflow, crawlers and headers, performance budget, accessibility, browser support, assets, a build-order checklist and a definition of done.
- Section 17 lists inputs the owner still owes (tickets 06 and 07, positioning line, optional handle, phone test); these are not decisions and do not block the build.
- Section 18 lists defaults chosen while assembling (apex canonical host, committed headless-browser resume PDF, `featured` flag for Selected work, AI-assistance disclosure line, minimal security headers); the owner may veto them.
- To verify at build time: exact Cloudflare Workers static-assets config keys; whether Cloudflare states a consent banner is unnecessary for Web Analytics; Cloudflare zone AI-bot settings are off.

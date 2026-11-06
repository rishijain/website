---
title: Compare static site generators
type: research
status: closed
assignee:
blocked-by: []
---

## Question

Which static site generators (Astro, Eleventy, Hugo, Next.js static export, others worth a look) best fit: sub-second loads with near-zero JS, Markdown blog with tags and optional RSS, first-class SEO/structured-data support, simple to edit, and easy for an AI agent to modify? Report facts and trade-offs only; the decision is made in a later ticket.

## Resolution

Astro (zero client JS by default, validated Markdown collections, official RSS package), Hugo (built-in RSS and taxonomies), Eleventy (official RSS plugin), Zola (built-in taxonomies, feeds, sitemap), Next.js export (keeps React runtime, no built-in blog/tags/RSS). Gaps: no performance measurements; sitemap, JSON-LD and AI-editability not verified per tool.

Full findings (unmerged, never to be merged): branch `research/static-site-generators`, file `.wayfinder/research/01-static-site-generators.md`.

---
title: Establish current SEO and AEO requirements
type: research
status: closed
assignee:
blocked-by: []
---

## Question

What concretely makes a personal site rank for the owner's name and get cited by AI answer engines? Cover: schema.org JSON-LD (Person, ProfilePage, Article, BreadcrumbList), `sameAs` entity linking, sitemap, robots.txt and AI-crawler policy, llms.txt (does it matter yet?), canonical/OG metadata, Core Web Vitals thresholds, content-structure patterns AI engines extract well. Use primary sources (Google docs, schema.org, crawler docs); flag what is evidence-backed versus folklore.

## Resolution

Google says AI Overviews need no special markup: AEO is SEO. Requirements: static HTML, Person/ProfilePage JSON-LD with sameAs, self-canonicals, sitemap, permissive robots.txt, Core Web Vitals (LCP<=2.5s, INP<=200ms, CLS<=0.1). Allow search bots; training bots can be blocked separately. Skip llms.txt in v1. Open question for owner: allow or block AI training bots.

Full findings (unmerged, never to be merged): branch `research/seo-and-aeo`, file `.wayfinder/research/seo-and-aeo.md`.

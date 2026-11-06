---
title: Set performance budget and how it is verified
type: grilling
status: open
assignee: rupali
blocked-by: [05-choose-generator-and-host, 09-design-direction]
---

## Question

What does "loads in under 1 second" mean concretely (metric, network and device profile, which pages)? Set a budget (HTML, CSS, JS, image bytes, requests) and decide how it is verified: Lighthouse or WebPageTest run by hand, a CI check on push, or both. Fold in the Core Web Vitals targets from the SEO/AEO research (LCP<=2.5s, INP<=200ms, CLS<=0.1), image handling for the photo and share images, and caching headers via `_headers`.

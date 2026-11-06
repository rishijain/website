---
title: Set performance budget and how it is verified
type: grilling
status: closed
assignee: rupali
blocked-by: [05-choose-generator-and-host, 09-design-direction]
---

## Question

What does "loads in under 1 second" mean concretely (metric, network and device profile, which pages)? Set a budget (HTML, CSS, JS, image bytes, requests) and decide how it is verified: Lighthouse or WebPageTest run by hand, a CI check on push, or both. Fold in the Core Web Vitals targets from the SEO/AEO research (LCP<=2.5s, INP<=200ms, CLS<=0.1), image handling for the photo and share images, and caching headers via `_headers`.

## Resolution

Decided with the owner:
- Target: LCP under 1.0s on Lighthouse's mobile profile (mid-range phone, throttled fast 4G). Applies to Home, Blog index and blog post pages. This is stricter than the Core Web Vitals "good" LCP of 2.5s; INP<=200ms and CLS<=0.1 still apply.
- Budget per page, compressed over the wire: HTML 30 KB; CSS 15 KB (inlined or one file); JavaScript 5 KB (theme toggle only); fonts 0 (system fonts); above-the-fold images 40 KB; total transfer under 100 KB; zero third-party requests apart from Cloudflare's own Web Analytics beacon (excluded from the JS figure).
- Build rules: photo has explicit `width`/`height`, is not lazy-loaded when it is the LCP element, and is resized and converted to WebP or AVIF by Astro at build time. Static assets get long cache headers and HTML is revalidated, via `_headers`.
- Verification: manual gate, no CI check for now. Run Lighthouse (mobile profile) on Home, Blog index and one post before launch, plus a one-off check on a real phone at launch. Re-run after any change to layout, images, scripts or dependencies; not needed for a routine new post.
- Upgrade path, not adopted: Lighthouse CI on every push with the LCP and byte budget as hard assertions, if regressions ever slip through.

---
title: Choose static site generator and host
type: grilling
status: closed
assignee: rupali
blocked-by: [01-compare-static-site-generators, 02-compare-hosting-and-deploy, 03-seo-and-aeo-requirements]
---

## Question

Given the research, lock the site generator and the host/deploy pipeline, and confirm whether any decision truly needs a backend. Also decide the analytics provider using the analytics comparison if it is closed by then (otherwise leave to a follow-up).

## Resolution

Decided with the owner:
- Fully static, no backend (contact is links only; a form is the only thing that would reintroduce a server).
- Generator: Astro (no client JS by default, validated Markdown collections, official RSS package). Tag pages and JSON-LD are hand-built.
- Host: Cloudflare Workers with static assets (Cloudflare now directs new static projects here; `_headers`/`_redirects` and git-push builds are supported). Free: static requests unlimited, 3,000 build minutes/month.
- Source and deploy: GitHub repo (private fine); push to `main` builds and deploys.
- Analytics: Cloudflare Web Analytics (free, no cookies/localStorage; sampled, 6-month history, no custom events). Fallback: GoatCounter. Consent-banner need not stated by Cloudflare: re-check at spec time.
- Registrar: Cloudflare Registrar (about $11/yr for .com, free WHOIS privacy). Purchase deferred; needed before launch only. Builds can use the workers.dev address until then.

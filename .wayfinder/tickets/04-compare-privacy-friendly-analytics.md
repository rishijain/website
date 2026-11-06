---
title: Compare privacy-friendly analytics
type: research
status: closed
assignee:
blocked-by: []
---

## Question

Compare cookie-free analytics options (Plausible, GoatCounter, Cloudflare Web Analytics, Umami, Fathom, others): price, script size and speed impact, whether a consent banner is needed, self-host vs hosted, and fit with the hosting candidates. Report facts only.

## Resolution

Plausible, GoatCounter, Umami, Fathom all state no cookies. Prices: GoatCounter free, Umami $0 tier, Plausible from $9/mo, Fathom from $15/mo. Self-host possible for Plausible, GoatCounter, Umami. GoatCounter script ~3.5KB. Cloudflare analytics is sampled, 6-month history, no custom events. Gaps: no speed measurements; Cloudflare cost/consent unconfirmed.

Full findings (unmerged, never to be merged): branch `research/privacy-analytics`, file `.wayfinder/research/04-privacy-friendly-analytics.md`.

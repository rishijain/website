---
title: Compare hosting and deploy options
type: research
status: closed
assignee:
blocked-by: []
---

## Question

Compare Cloudflare Pages, Netlify, Vercel, GitHub Pages (and any strong alternative) for a static personal site: free-tier limits, global CDN speed, deploy-on-git-push, custom domain and HTTPS, redirects/headers control, built-in analytics, and whether buying the domain at the same provider is worthwhile. Report facts only.

## Resolution

Vercel Hobby is non-commercial only (client work may count as commercial). Netlify Free is credit-metered (300/mo, hard limit). Cloudflare has _headers/_redirects, unlimited static requests, at-cost domains. GitHub Pages has a soft 100 GB/mo limit and no documented header control. Gaps: no CDN speed data; unclear whether Cloudflare Pages or Workers static assets is now the recommended path.

Full findings (unmerged, never to be merged): branch `research/hosting-and-deploy`, file `.wayfinder/research/02-hosting-and-deploy.md`.

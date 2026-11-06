---
title: Decide AI crawler policy
type: grilling
status: closed
assignee: rupali
blocked-by: []
---

## Question

Should robots.txt allow or block AI training bots (GPTBot, ClaudeBot, Google-Extended) while allowing search bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot)? The research says the two can be set independently without hurting search visibility.

## Resolution

Decided with the owner: allow all AI bots, training and search/answer alike (GPTBot, ClaudeBot, Google-Extended, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot). Rationale: personal site meant to be found, public content, and training data helps models answer "who is <name>?" accurately.
- `robots.txt`: `User-agent: *` / `Allow: /`, plus a `Sitemap:` line. No per-bot rules, no edge enforcement.
- Spec-time check: Cloudflare has zone-level settings (managed robots.txt, "block AI bots") that can override or prepend rules. Confirm they are off for this domain so they do not contradict this policy.

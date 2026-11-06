---
title: List blog posts written on another platform
type: decision
status: open
assignee:
blocked-by: []
---

## Question

The owner has already written blog posts on a different platform and wants them listed on this site alongside posts written here. Decide how.

Raised after the spec was assembled (spec sections 4, 5, 9 and `/blog` assume only local Markdown posts).

## Open points

- Which platform, and does it have an RSS feed or API?
- Link out only (index row that opens the original), or copy full content here?
- Manual list in a data file, or fetched automatically at build time from the feed?
- SEO/AEO: a full copy risks duplicate content unless `rel=canonical` points to the original; link-out avoids that but sends readers away. Either way these posts support the "who is <Name>" goal if they are clearly attributed to the same person.
- Tags: external posts would need tags from the controlled vocabulary (`src/data/tags.ts`).
- RSS (`/rss.xml`) and sitemap: should external posts appear in either?
- JSON-LD: external posts cannot be `BlogPosting` pages on this domain; they would be plain index rows.

## Resolution

(open)

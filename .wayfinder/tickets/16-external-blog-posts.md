---
title: List blog posts written on another platform
type: decision
status: closed
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

Link out, with a hand-written list. Each external post is an index row in the blog list that opens the original post; no copies, so no duplicate-content risk. Entries live in `src/data/external-posts.ts` (title, https URL, date, source platform, optional tags from the controlled vocabulary), validated at build time. They are merged by date into `/blog`, the tag pages and Home's "Latest posts", with an "Originally published on <platform>" line. They are excluded from `/rss.xml`, the sitemap and JSON-LD, since they are not pages on this domain. No feed fetching in v1; it can be added later by generating the same entries from a feed.

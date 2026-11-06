---
title: Define weekly publishing workflow
type: grilling
status: closed
assignee: rupali
blocked-by: [08-site-structure-and-content-model]
---

## Question

How does a weekly post get from idea to live? Cover drafting (where, in what format), the role of Claude in drafting and editing, review before publish, scheduling (future `pubDate` handling on a static site, or publish on push), the `draft` flag, how tags are added or extended in the controlled vocabulary, and how the owner keeps a weekly cadence without it becoming a chore.

## Resolution

Decided with the owner:
- Authoring modes are deliberately not locked. Any mix is allowed: Claude writes a whole post; the owner gives notes and Claude drafts; or the owner writes most of it and Claude edits. Posts are Markdown files in `src/content/blog/`.
- Rules that hold in every mode:
  - The owner approves every post by reading the git diff and pushing it.
  - Claude does not invent first-hand claims (experiences, numbers, client or employer names, quotes). Where a draft needs a fact only the owner has, Claude leaves a visible `TODO(rishi)` marker, and the build fails if a published post still contains a `TODO`.
  - The owner only publishes posts on topics they can vouch for.
- Publishing: publish on push to `main`. No scheduled rebuilds and no future-dated posts. `draft: true` posts are excluded from the build, including the RSS feed, sitemap and tag pages. Drafts are previewed locally with `astro dev`, where they are shown. To publish, flip `draft` to `false` and push. Writing ahead means keeping posts as drafts and pushing one at a time.
- Tags: controlled vocabulary in one file; an unknown tag fails the build. Adding a tag is a deliberate edit to that file: Claude proposes the tag and the reason, the owner approves it in the same diff as the post. Soft cap of about 8 tags to avoid thin tag pages.
- Cadence: site copy never promises "weekly"; dates on the blog index show the real rhythm. A skipped week is fine, and no backfilling to catch up. Keep an ideas list in the repo (`content/ideas.md`) where the owner or Claude add a line whenever a topic comes up; each week starts from it.

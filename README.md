# Personal website

A static site (Astro, no UI framework) with a resume, projects, talks and a blog. Built to `dist/` and served by Cloudflare Workers static assets. Pushing to `main` deploys.

Planning lives in `.wayfinder/` (the build spec is `.wayfinder/spec.md`, decisions are in `.wayfinder/tickets/`). Things waiting on the owner are in `TODO.md`.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22.23.4 or newer; see `.node-version`). |
| `npm run dev` | Local dev server at http://localhost:4321. Shows draft posts. |
| `npm run build` | Build to `dist/`. Fails on the content rules below. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run check` | Type-check the project (`astro check`). |
| `npm run deploy:dry` | Validate `wrangler.jsonc` against `dist/` without deploying. |

## Add a blog post

1. Create `src/content/blog/<slug>.md`. The filename is the URL (`/blog/<slug>`) and never changes, so pick it carefully. No dates in it.
2. Start with front matter:

   ```markdown
   ---
   title: "Post title"
   description: "About 150 characters, used for the meta description and share cards."
   pubDate: 2026-11-09
   tags: ["ai-agents"]
   draft: false
   ---
   ```

   `updatedDate` is optional: set it only for substantive edits.
3. Write the body in Markdown. Where a fact only you know is missing, write `TODO(rishi)`; the build fails until it is resolved.
4. Preview with `npm run dev`, then commit and push to `main`.

Rules the build enforces:
- `draft: true` posts are left out of every output (pages, `/blog`, tag pages, RSS, sitemap, Home). They show in `npm run dev` only. To write ahead, keep posts as drafts and flip one to `false` when it is ready.
- A published post containing `TODO(` in its body, title or description fails the build.
- A tag that is not in `src/data/tags.ts` fails the build.

Keep post ideas in `content/ideas.md`. Never promise a "weekly" cadence in site copy.

## Add a tag

Edit `src/data/tags.ts`: add the id to `TAG_IDS` and a display name to `TAG_NAMES`. Keep the list to about 8. Approve the tag in the same diff as the post that needs it. A tag page is generated only once a published post uses the tag.

## Add a project

Create `src/content/projects/<name>.md` with front matter only:

```markdown
---
title: "Project name"
summary: "One line."
role: "Lead engineer"
stack: ["Rails", "TypeScript"]
year: 2025
links:
  - label: "Write-up"
    url: "https://example.com"
featured: true   # shows in Selected work on Home (max 3 across projects and talks, newest first)
order: 1         # sort order on /projects
---
```

Only publish work that is public (nothing under NDA).

## Add a talk

Create `src/content/talks/<name>.md`:

```markdown
---
title: "Talk title"
conference: "Conference name"
date: 2025-09-15
videoUrl: "https://example.com/video"   # optional
slidesUrl: "https://example.com/slides" # optional
featured: false                         # true to show in Selected work on Home
---
```

## List a post written on another platform

Add an entry to `src/data/external-posts.ts`: `title`, `url` (https), `date` (YYYY-MM-DD), `source` (platform name) and optional `tags` from the controlled list. It appears as a link-out row in `/blog`, the tag pages and Home's "Latest posts". External posts are not in the RSS feed or sitemap. The build fails on a non-https URL, a bad date or an unknown tag.

## Edit the resume, bio and links

- Resume content: `src/data/resume.yaml`. It feeds the `/resume` page.
- Name, bio, positioning line, links, `sameAs`: `src/data/site.ts`. Keep the name, title and bio identical on LinkedIn and GitHub.
- Profile photo: replace `src/assets/photo.png` (square crop). Astro resizes and converts it at build time.
- Bump `siteUpdated` in `src/lib.ts` after human edits to the site (it drives the Home page's `dateModified`).

## Regenerate the resume PDF

The PDF is exported by hand and committed; there is no script. After every change to `resume.yaml`:

1. Run `npm run dev` and open http://localhost:4321/resume.
2. Print (Cmd+P), destination "Save as PDF", default margins, background graphics off.
3. Save over `public/resume.pdf` and commit. The filename must stay `resume.pdf` so the URL is stable.

The print stylesheet hides the sidebar and switches to black on white.

## Regenerate icons and the share image

`node scripts/make-assets.mjs` rewrites `public/favicon.svg`, `public/apple-touch-icon.png` and `public/og-default.png`. Edit the name, title and initials at the top of the script first, then commit the results.

## Domain

The production domain lives in one place: `SITE_URL` in `astro.config.mjs`. When the real domain is attached, change it there, then update the `Sitemap:` line in `public/robots.txt`. The sitemap is at `/sitemap-index.xml`.

## Deploy

Cloudflare builds and deploys on every push to `main` (build `npm run build`, deploy `npx wrangler deploy`, config in `wrangler.jsonc`). Until the domain exists the site runs on its `workers.dev` address. Caching and security headers are in `public/_headers` (when several rules match a path, Cloudflare joins header values, so no header is set twice).

## Manual quality gates

There is no CI check. Run these before launch and again after any change to layout, colours, nav, images, scripts or dependencies (a routine new post does not need them). The targets are in `.wayfinder/spec.md`.

- **Performance** (section 11): Lighthouse, mobile profile, on Home, the Blog index and one post. LCP under 1.0 s, under 100 KB per page, no third-party requests except the Cloudflare analytics beacon. Plus one check on a real phone.
- **Accessibility** (section 12): WCAG 2.2 AA. An axe or Lighthouse pass, a keyboard-only pass over every page, and a VoiceOver pass on Home.
- **Browsers** (section 13): the oldest supported iOS Safari (15.4), plus current Chrome and Firefox. The site must read fine with JavaScript off.
- **Structured data**: validate the JSON-LD with the Schema Markup Validator and Google's Rich Results Test.

## Layout

```
src/content/{blog,projects,talks}/   Markdown content
src/content.config.ts                collection schemas
src/data/                            site.ts, tags.ts, resume.yaml, external-posts.ts
src/layouts/Base.astro               <head>, skip link, sidebar, theme script
src/components/                      Sidebar, IndexRow, PostRow, TagChips, ThemeToggle, JsonLd
src/pages/                           one file per URL
src/styles/global.css                all styles (light/dark, rows, print, mobile)
public/                              robots.txt, _headers, icons, share image, resume.pdf
scripts/make-assets.mjs              icon and share-image generator
content/ideas.md                     post backlog (not published)
```

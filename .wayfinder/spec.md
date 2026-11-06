# Build spec: personal website

Status: build-ready. Assembled from closed tickets 01-14 (ticket 15). A separate agent session should be able to build the site from this document alone.

Placeholders used below: `<Name>` (owner's full name), `<domain>` (`firstnamelastname.com`, not yet bought), `<handle>` (not yet decided; omit `alternateName` until then). Items the owner still owes are listed in section 17; items marked **[default]** were chosen while assembling this spec rather than decided in a ticket, and are listed in section 18 so the owner can veto them.

## 1. Goals and constraints

- Audience, equal first priority: recruiters, hiring managers, potential clients. Blog readers second.
- Key goal: searching `<Name>`, or asking an AI "who is <Name>?", surfaces the site and cites it accurately.
- Hard requirements: loads fast (section 11), easy to change, easy to deploy, as simple as possible.
- No backend, no CMS UI, no comments, no contact form, no newsletter.
- Editing: Markdown and data files in git; Claude does most edits; deploy by pushing to `main`.

## 2. Stack and hosting

- Generator: **Astro**, fully static output (`output: 'static'`). No UI framework, no client JS by default. Content in Astro content collections with schema validation. Official `@astrojs/rss` and `@astrojs/sitemap` packages. Tag pages and JSON-LD are hand-built.
- Language: TypeScript for config and content schemas; plain `.astro` components and one global CSS file.
- Host: **Cloudflare Workers with static assets**, serving the built `dist/` directory. Free: static requests unlimited, 3,000 build minutes a month. `_headers` and `_redirects` files in `public/` control headers and redirects.
- Source: GitHub repository (private is fine). Cloudflare's git integration builds and deploys on every push to `main`. Build command `npm run build`, output directory `dist`. Other branches may get preview URLs.
- Config: a `wrangler.jsonc` (or `wrangler.toml`) at the repo root with the worker name, a current `compatibility_date`, and the assets directory `./dist`. **Verify the exact config keys against current Cloudflare docs at build time**; this spec has not confirmed them.
- Until the domain exists, the site runs on its `workers.dev` address. Nothing in the code may hard-code the final domain: take it from one `SITE_URL` constant in `astro.config` (`site:`) so a domain change is a one-line edit.
- Registrar: Cloudflare Registrar (about $11 a year for a `.com`, free WHOIS privacy). Purchase is deferred (ticket 07) and needed before launch only. DNS is then managed in Cloudflare.
- Analytics: **Cloudflare Web Analytics** (free, no cookies or localStorage, sampled, 6-month history, no custom events). Enabled in the Cloudflare dashboard; the beacon is the only allowed third-party request. Fallback: GoatCounter (about 3.5 KB script). **Re-check at build time** whether Cloudflare states a consent banner is unnecessary; do not add a banner unless that check says one is needed.
- Estimated cost: about $11 a year, all in.

## 3. Repository layout

```
.
├── astro.config.mjs            # site, integrations (sitemap), no UI framework
├── wrangler.jsonc              # Cloudflare Workers static assets config
├── package.json                # build, dev, check scripts; browserslist
├── content/
│   └── ideas.md                # backlog of post topics (not published)
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png    # 180x180
│   ├── og-default.png          # 1200x630
│   ├── resume.pdf              # exported by hand from /resume, committed
│   ├── robots.txt
│   └── _headers                # cache and security headers
├── src/
│   ├── content.config.ts       # collection schemas, tag enum
│   ├── content/
│   │   ├── blog/*.md
│   │   ├── projects/*.md
│   │   └── talks/*.md
│   ├── data/
│   │   ├── site.ts             # name, title, positioning line, bio, links, sameAs
│   │   ├── tags.ts             # the controlled tag vocabulary
│   │   └── resume.yaml         # single source for the resume page and PDF
│   ├── layouts/Base.astro      # <head>, sidebar, skip link, theme script, footer
│   ├── components/             # Sidebar, IndexRow, JsonLd, TagChips, ThemeToggle
│   ├── pages/                  # see section 4
│   └── styles/global.css
└── scripts/
    └── make-assets.mjs         # regenerates favicon, touch icon, share image
```

## 4. Pages and URLs

Lowercase URLs, no trailing slash (`build.format: 'file'` or `trailingSlash: 'never'` plus matching host behavior; verify redirects so that only one form resolves). Navigation order, identical on every page, in the sidebar only: Home, Resume, Projects, Talks, Blog, Contact.

| URL | Source | Content |
|---|---|---|
| `/` | `pages/index.astro` | The About page. `<h1>` with the owner's name; the positioning line; photo; 2-3 sentence bio; "Selected work" index rows; "Latest posts" index rows (3). |
| `/resume` | `pages/resume.astro` | Resume rendered as HTML from `resume.yaml`, with a "Download PDF" link to `/resume.pdf`. |
| `/resume.pdf` | `public/resume.pdf` | Exported by hand from the HTML page (section 8). |
| `/projects` | `pages/projects.astro` | About 4 entries as index rows. List only, no detail pages. |
| `/talks` | `pages/talks.astro` | One index row per talk: title, conference, date, video and slides links. |
| `/blog` | `pages/blog/index.astro` | Tag chips above a year-grouped list of index rows (date, title, tags). |
| `/blog/<slug>` | `pages/blog/[slug].astro` | A post. |
| `/blog/tags/<tag>` | `pages/blog/tags/[tag].astro` | Posts for one tag. Generated for the tags that have at least one published post. |
| `/contact` | `pages/contact.astro` | Email, LinkedIn, GitHub, optional calendar link. No form. |
| `/rss.xml` | `pages/rss.xml.ts` | Published posts only. |
| `/sitemap.xml` | `@astrojs/sitemap` | All public pages. |
| `/robots.txt` | `public/robots.txt` | Section 10. |
| `/404` | `pages/404.astro` | Short message and a link home, same layout. |

There is no separate `/about`. Contact links also appear in the sidebar footer on every page (section 7), satisfying "contact page plus footer".

## 5. Content model

### Site data (`src/data/site.ts`)

`name`, `jobTitle` ("Product engineer"), `positioningLine`, `bio`, `photo` (imported image asset), `email`, `linkedin`, `github`, `calendarUrl` (optional), `sameAs` (array of profile URLs, at least LinkedIn and GitHub).

Positioning line (provisional; the owner expects to change it): "Product engineer building production AI agents. Rails conference speaker." Proof points to feature: production AI agents, Rails expertise, conference speaking. The same name, title and bio must appear identically on LinkedIn and GitHub.

### Blog posts (`src/content/blog/<slug>.md`)

The slug is the filename, fixed at creation, with no date in the URL. Front matter schema:

| Field | Type | Notes |
|---|---|---|
| `title` | string | Also the `<h1>`. |
| `description` | string | About 150 characters; used for meta description and OG description. |
| `pubDate` | date | Visible on the page and in the index. |
| `updatedDate` | date, optional | Set only for substantive edits; drives `dateModified`. |
| `tags` | array of enum | Values must come from `src/data/tags.ts`; an unknown tag fails the build. |
| `draft` | boolean | Default `false`. |

Build-time rules (implement as schema validation and a small check in the build):
- Posts with `draft: true` are excluded from every output: pages, `/blog`, tag pages, RSS, sitemap, "Latest posts". In `astro dev` drafts are shown.
- The build fails if a published post body contains the string `TODO(`.
- The build fails if a tag in the enum is spelled differently in front matter (enum validation does this).

### Tags (`src/data/tags.ts`)

Controlled vocabulary, single source: `ai-agents`, `rails`, `speaking`, `building-products`, `career`. Soft cap of about 8. Adding a tag is a deliberate edit to this file, approved by the owner in the same diff as the post that needs it. Display names are derived or mapped in the same file.

### Projects (`src/content/projects/*.md`)

Front matter: `title`, `summary` (one line), `role`, `stack` (array of strings), `year`, `links` (array of `{label, url}`), `featured` (boolean; featured items show in "Selected work" on Home), `order` (number). About 4 entries. Some work may be under NDA: only publish what the owner confirms is public.

### Talks (`src/content/talks/*.md`)

Front matter: `title`, `conference`, `date`, `videoUrl` (optional), `slidesUrl` (optional), `featured` (boolean). Body is optional.

"Selected work" on Home is built from entries with `featured: true` across projects and talks, newest first, capped at 3. It is hand-curated through that flag.

### Resume (`src/data/resume.yaml`)

One data file is the single source for `/resume` and `/resume.pdf`: summary, experience (employer, title, dates, bullets), skills, education, and optional links. Other pages link to projects and talks by name rather than repeating their descriptions.

## 6. SEO and AEO

AEO is SEO: Google states AI features need no special markup. Everything below is static, server-rendered HTML; no content may require JavaScript to appear.

### Per-page `<head>` (in `Base.astro`)

- `<title>`: unique per page. Home: "<Name> - Product engineer" (or the current positioning); others: "<Page> - <Name>". First `<h1>` matches the page.
- `<meta name="description">`: unique per page. Home echoes the entity sentence. Posts use front matter `description`.
- `<link rel="canonical">`: absolute HTTPS URL, self-referencing. Single host: **apex `<domain>`** [default]; redirect `www` to apex with a 301 (in `_redirects` or Cloudflare rules).
- Open Graph: `og:title`, `og:description`, `og:type` (`website` for pages, `article` for posts), `og:url`, `og:image` (default `/og-default.png`, absolute URL), `og:image:alt`, `og:image:width` 1200, `og:image:height` 630.
- `twitter:card` = `summary_large_image`.
- `<link rel="alternate" type="application/rss+xml" href="/rss.xml">`.
- `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` and `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`.
- `<html lang="en">`; `<meta name="viewport">`; `<meta name="color-scheme" content="light dark">`.

### JSON-LD (one `<script type="application/ld+json">` block per page, `@graph`, using `@id` references)

Shared Person node, `@id` = `https://<domain>/#person`: `name`, `jobTitle`, `url`, `image` (the profile photo, real, not an icon), `description` (the entity sentence), `sameAs` (LinkedIn, GitHub, other profiles the owner controls), and `alternateName` only once a handle exists.

- **Home**: `ProfilePage` (with `mainEntity` pointing at the Person `@id`, `dateCreated`, `dateModified` reflecting human edits) plus `WebSite` (`name`, `url`) plus the Person node.
- **Blog posts**: `BlogPosting` (`headline`, `description`, `image`, `datePublished`, `dateModified` with timezone, `author` = Person `@id`, `mainEntityOfPage`) plus `BreadcrumbList` (Home > Blog > Post).
- **Other pages**: no JSON-LD required beyond the Person reference where relevant.
- Markup must match visible content. Do not claim anything the page does not show. Validate with the Schema Markup Validator and Google's Rich Results Test before launch.

### Content patterns

- Home opens with a plain entity sentence: "<Name> is a product engineer building production AI agents, a longtime Rails developer and conference speaker." Echoed in the meta description and JSON-LD `description`.
- Short self-contained paragraphs; lists and index rows for facts; visible dates on posts; a byline on each post linking to Home.
- Resume is an HTML page, not only a PDF.
- Internal links between pages; descriptive link text.
- Do not change dates without substantive updates. Disclose AI assistance where readers would wonder (a short line on the About/Home page is enough); never fabricate credentials or personas.
- Skip `llms.txt` in v1.

### Launch tasks

Submit `sitemap.xml` in Google Search Console (and Bing Webmaster Tools); ensure LinkedIn and GitHub profiles link back to the site; confirm the Cloudflare zone does not block search or AI bots (section 10).

## 7. Design

Chosen direction: **variant D, sidebar plus index rows**. Reference prototype (throwaway, never merged): branch `prototype/design-direction`, file `.wayfinder/prototype/design-direction.html` (view with `git show prototype/design-direction:.wayfinder/prototype/design-direction.html`, variant `D`).

- **Layout**: fixed left sidebar (about 240px) with photo, name, role "Product engineer", the six nav links, and contact links (Email, LinkedIn, GitHub) at the bottom. Main column on the right, about 760px max, 56px top padding. The sidebar is the only navigation; the main column never repeats it.
- **Index rows** (`IndexRow` component): a ruled list. Each row is a grid of small monospace number or date, bold title, monospace tag or label column; hairline borders; on hover the row inverts (foreground and background swap). Used for Selected work, Latest posts, the blog list and the talks list. Projects use the same row with a one-line summary.
- **Type**: system fonts only. Sans-serif body (`system-ui, -apple-system, "Segoe UI", sans-serif`); monospace for dates, numbers and tags (`ui-monospace, Menlo, monospace`). No web font requests. `h1` about 2rem, tight letter-spacing.
- **Colour**: light and dark. Default follows the system via `prefers-color-scheme` and CSS variables. A sidebar toggle with three states (system, light, dark) stores the choice in `localStorage`. A small inline script in `<head>` applies the stored choice before first paint to avoid a flash; with JavaScript off, the site follows the system. The prototype's palette is the starting point: light `--bg #fff`, `--side #f4f5f7`, `--fg #14171a`, `--mut #5b6670`, `--acc #2563eb`, `--rule #d5d9de`; dark `--bg #0e1013`, `--side #15181c`, `--fg #e8eaed`, `--mut #8b949e`, `--acc #60a5fa`, `--rule #2c3238`. Adjust any value that fails the contrast rule in section 12.
- **Mobile**: below 760px the sidebar becomes a strip above the content and each row's tag wraps to a second line. The owner has **not yet tested this on a phone**: check it at build time and compact the nav strip into a single row of links if it takes too much of the first screen.
- Keep the page minimal and text-light. No carousels, modals, animations beyond the hover inversion.

## 8. Resume and PDF

- `/resume` renders `resume.yaml` with the same layout as the rest of the site, plus a print stylesheet (`@media print`: hide the sidebar and toggle, single column, black on white, sensible page breaks).
- `public/resume.pdf` is **exported by hand** (owner's decision, no script and no browser dependency): open `/resume` in Chrome, Print, destination Save as PDF, margins default, background graphics off, then save over `public/resume.pdf` and commit. Repeat after every `resume.yaml` change, or the PDF drifts out of date. Until the first export, the "Download PDF" link returns 404.
- The PDF filename stays `resume.pdf` so the URL is stable. Add a note in the README about re-exporting it.

## 9. Blog and publishing workflow

- Posts are Markdown files in `src/content/blog/`. Publish on push to `main`. No scheduling, no future-dated posts, no scheduled rebuilds.
- To write ahead, keep posts as `draft: true` and flip one to `false` per week. Preview drafts with `astro dev`.
- Authoring modes are not locked. Any mix is allowed: Claude writes a whole post; the owner gives notes and Claude drafts; or the owner writes most and Claude edits.
- Rules in every mode: the owner approves every post by reading the git diff and pushing it. Claude does not invent first-hand claims (experiences, numbers, client or employer names, quotes); where a draft needs a fact only the owner has, Claude leaves `TODO(rishi)` and the build fails until it is resolved. The owner only publishes posts on topics they can vouch for.
- Tag additions are deliberate edits to `src/data/tags.ts`: Claude proposes the tag and why; the owner approves in the same diff.
- Cadence: site copy never promises "weekly". A skipped week is fine; do not backfill. Keep `content/ideas.md` as the backlog: add a line whenever a topic comes up; each week starts from it.
- RSS at `/rss.xml` via `@astrojs/rss`: published posts, newest first, with title, description, link, `pubDate`, categories from tags.

## 10. Crawlers and headers

- **AI crawler policy: allow all** (training and search/answer bots alike: GPTBot, ClaudeBot, Google-Extended, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot). `public/robots.txt`:

  ```
  User-agent: *
  Allow: /

  Sitemap: https://<domain>/sitemap.xml
  ```

  No per-bot rules, no edge enforcement. Take `<domain>` from the same constant used elsewhere, or edit it when the domain is bought.
- **Check at build time**: Cloudflare has zone-level settings (managed robots.txt, "block AI bots") that can prepend or override rules. Confirm they are off for this domain.
- `public/_headers`: long immutable caching for hashed assets (`/_astro/*`: `Cache-Control: public, max-age=31536000, immutable`); HTML and `robots.txt`/`sitemap.xml`/`rss.xml` revalidated (`max-age=0, must-revalidate` or a short max-age); `/favicon.svg`, `/og-default.png` and `/resume.pdf` a moderate max-age since their names are not hashed. Add `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`. Do not add a Content-Security-Policy unless the Cloudflare analytics beacon is accounted for.

## 11. Performance budget

- Target: **LCP under 1.0 s on Lighthouse's mobile profile** (mid-range phone, throttled fast 4G), for Home, the Blog index and blog posts. INP at most 200 ms, CLS at most 0.1 (the Core Web Vitals "good" thresholds, which this target comfortably beats).
- Budget per page, compressed over the wire: HTML 30 KB; CSS 15 KB (inlined or one file); JavaScript 5 KB (theme toggle only); fonts 0; above-the-fold images 40 KB; total transfer under 100 KB; zero third-party requests apart from the Cloudflare analytics beacon (excluded from the JS figure).
- Build rules: the profile photo has explicit `width` and `height`, is not lazy-loaded when it is the LCP element, and is resized and converted to WebP or AVIF by Astro's image handling at build time. Do not ship images beyond what the layout needs.
- Verification: **manual gate**, no CI check. Run Lighthouse (mobile profile) on Home, the Blog index and one post before launch, plus one check on a real phone. Re-run after any change to layout, images, scripts or dependencies; a routine new post does not need it. Upgrade path, not adopted: Lighthouse CI on every push with these numbers as assertions.

## 12. Accessibility

Target: **WCAG 2.2 AA**. Concretely:
- Text contrast at least 4.5:1 in light and dark, including muted date and tag text.
- Visible focus outline on nav links, index rows and the theme toggle.
- A "skip to content" link as the first focusable element, bypassing the sidebar.
- Theme toggle operable by keyboard and announcing its state (a `<button>` with `aria-pressed` or a labelled radio group).
- `prefers-reduced-motion` respected (the hover inversion must not animate if reduced motion is requested).
- One `<h1>` per page, correct heading order, landmarks (`<nav>`, `<main>`, `<footer>` or an `<aside>` for the sidebar with an accessible name).
- Tap targets at least 24x24 px; text resizes without breakage; meaningful `alt` text (the photo gets a real description; decorative images get empty alt).
- The mobile sidebar strip is usable by keyboard and screen reader.

Verification: **manual gate** at the same moments as the performance gate (before launch; after changes to layout, colours or nav): an automated pass (axe or Lighthouse accessibility), a keyboard-only pass over every page, and one VoiceOver pass on Home.

## 13. Browser support

- Baseline: browsers released in the last 4-5 years, roughly Chrome and Edge 100+, Firefox 100+, Safari and iOS Safari 15.4+, Chrome on Android. Set with one `browserslist` entry in `package.json`.
- CSS rule: system fonts, CSS variables, flexbox, grid, `prefers-color-scheme`. Avoid CSS nesting, `:has()`, container queries and `color-mix()` unless given a plain fallback.
- Older browsers are unsupported but get readable plain HTML.
- Without JavaScript the site is fully readable and the theme follows the system.
- At launch, check the oldest supported iOS Safari, plus current Chrome and Firefox.

## 14. Assets

| Asset | Spec | Made by |
|---|---|---|
| `favicon.svg` | Owner's initials in the accent colour; dark-mode aware via `prefers-color-scheme` inside the SVG | Claude, hand-written SVG |
| `apple-touch-icon.png` | 180x180 | Claude, rendered from the favicon source |
| `og-default.png` | 1200x630, under about 100 KB, owner's name and title on a plain background matching the design; one default for every page; per-post images are a later upgrade (only the image URL in the metadata template changes) | Claude, SVG or HTML template rendered to PNG, committed |
| Profile photo | Square crop; Astro resizes and converts to WebP or AVIF; under 40 KB above the fold | Owner supplies (ticket 06); Astro processes |

No web manifest and no 192/512 icons (not an installable app). Assets live in `public/` except the photo, which lives under `src/` so Astro can process it.

## 15. Build order (checklist for the building agent)

1. Scaffold Astro (no framework), TypeScript, `@astrojs/sitemap`, `@astrojs/rss`; set `site` from one constant; add the `browserslist` entry.
2. Content schemas, `tags.ts`, `site.ts`, `resume.yaml`, and placeholder content (clearly marked) until the owner's real content arrives.
3. `Base.astro` with the full `<head>` (section 6), skip link, sidebar, theme script and toggle, footer links.
4. Global CSS: variables, light and dark, index rows, print stylesheet, mobile strip.
5. Pages in section 4, JSON-LD component, RSS, 404.
6. Build-time checks: draft exclusion, `TODO(` detection, tag enum.
7. `public/` files: `robots.txt`, `_headers`, favicon, apple-touch-icon, `og-default.png`.
8. Resume PDF: no script; the owner exports `resume.pdf` by hand (section 8). Document the steps in the README.
9. `wrangler` config; connect the GitHub repo to Cloudflare; confirm push-to-deploy on the `workers.dev` address; enable Cloudflare Web Analytics.
10. Run the manual gates (sections 11, 12, 13) and validate JSON-LD.
11. After the domain is bought: attach it in Cloudflare, set `SITE_URL`, add the `www` redirect, update `robots.txt`, submit the sitemap, update the profile back-links.
12. README: how to add a post, a tag, a project, a talk; how to regenerate the PDF; where the manual gates live.

## 16. Definition of done

- All pages in section 4 exist and build with no errors or warnings.
- Lighthouse mobile LCP under 1.0 s on Home, Blog index and a post; page transfer under 100 KB.
- Accessibility gate passed (axe or Lighthouse clean, keyboard pass, VoiceOver pass on Home).
- JSON-LD validates; canonical, OG and sitemap are correct; `robots.txt` allows all; no Cloudflare bot-blocking settings active.
- Pushing to `main` deploys; a draft post does not appear anywhere; a post with `TODO(` fails the build.
- The owner can add a post by creating one Markdown file and pushing.

## 17. Inputs the owner still owes (not decisions)

- Ticket 06: current resume, 3-5 line bio, professional photo, links (email, LinkedIn, GitHub, optional calendar), 3-6 projects with one-line descriptions (about 4 will be shown), and the talks list. The build can proceed with clearly marked placeholders.
- Ticket 07: buy the domain (Cloudflare Registrar) and record where DNS is managed. Needed before launch only.
- Final choice of the positioning line, and a `<handle>` for `alternateName` if wanted.
- Phone test of the mobile layout.

## 18. Defaults chosen while assembling this spec (owner may veto)

- Canonical host is the apex domain, with `www` redirecting to it.
- (Resolved by owner) The resume PDF is exported by hand from the browser's print dialog and committed; no generation script.
- "Selected work" on Home is driven by a `featured` flag on projects and talks, capped at 3.
- Projects and talks are Markdown collections with the front matter listed in section 5.
- A short AI-assistance disclosure line on Home, in line with Google's helpful-content guidance.
- Security headers limited to `nosniff` and a referrer policy; no CSP.

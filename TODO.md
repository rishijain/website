# Owner to-do (parked)

Things only the owner can do, or that wait on the owner's input. Tick them off as they happen.
Build progress lives in `.wayfinder/spec.md` section 15; decisions live in `.wayfinder/tickets/`.

## Deploy (build step 9)
- [ ] Create a GitHub repo (private is fine), add it as `origin`, push `main`.
- [ ] Cloudflare: Workers & Pages > Create > Import a repository. Build command `npm run build`, deploy command `npx wrangler deploy`, worker name `website` (must match `wrangler.jsonc`), production branch `main`.
- [ ] Confirm the first build deploys to `website.<subdomain>.workers.dev`, then send the URL to Claude.
- [ ] Enable Cloudflare Web Analytics. Check whether Cloudflare says a consent banner is unnecessary (spec section 2) and tell Claude.

## Content and assets ([ticket 06](.wayfinder/tickets/06-gather-content-and-assets.md))
- [ ] Resume, 3-5 line bio, professional photo (square crop).
- [ ] Links: email, LinkedIn, GitHub, optional calendar booking.
- [ ] 3-6 projects with a one-line description each (only what is public, no NDA work).
- [ ] Talks list: title, conference, date, video and slides links.
- [ ] Your posts from the other platform: give Claude title, URL, date and platform name for each (goes in `src/data/external-posts.ts`; replace the placeholder entry).
- [ ] Final positioning line; decide whether you want a `<handle>` for `alternateName`.
- [ ] Export the real resume PDF: open `/resume` in Chrome, Print, Save as PDF, overwrite `public/resume.pdf`, commit (repeat after every `resume.yaml` change).

## Domain ([ticket 07](.wayfinder/tickets/07-buy-domain.md))
- [ ] Buy `firstnamelastname.com` at Cloudflare Registrar (privacy and auto-renew on). Record where DNS is managed.
- [ ] After buying: attach the domain in Cloudflare, tell Claude so `SITE_URL` and `robots.txt` get updated, add the `www` to apex 301.
- [ ] Cloudflare zone: confirm managed robots.txt and "block AI bots" are off.

## Before launch (build step 10, manual gates)
- [ ] Test the mobile layout on a real phone.
- [ ] Lighthouse mobile on Home, Blog index and one post (LCP under 1.0 s, under 100 KB).
- [ ] Accessibility: axe or Lighthouse pass, keyboard-only pass on every page, VoiceOver pass on Home.
- [ ] Oldest supported iOS Safari, plus current Chrome and Firefox.
- [ ] Validate JSON-LD (Schema Markup Validator and Rich Results Test).
- [ ] Delete the placeholder posts, project and talk in `src/content/`; replace placeholder data in `src/data/`.
- [ ] Re-run `node scripts/make-assets.mjs` with the real name, commit the new icons and share image.

## After launch
- [ ] Submit `sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
- [ ] Make sure LinkedIn and GitHub profiles link back to the site, with the same name, title and bio.

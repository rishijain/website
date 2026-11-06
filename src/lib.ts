import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from './data/site';

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const year = (d: Date) => d.getUTCFullYear();

/** Published posts, newest first. Drafts show in `astro dev` only (spec section 5). */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Hand-edited: bump `siteUpdated` on human edits to the site. Drives ProfilePage dateModified.
export const siteCreated = '2026-11-06';
export const siteUpdated = '2026-11-06';

/** Shared Person node; other nodes reference it by @id. */
export function personNode(siteUrl: URL | string) {
  const base = new URL(siteUrl).origin;
  return {
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: site.name,
    jobTitle: site.jobTitle,
    url: `${base}/`,
    image: new URL(site.photo.src, base).href,
    description: site.entitySentence,
    sameAs: site.sameAs,
    ...(site.handle ? { alternateName: site.handle } : {}),
  };
}

import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from './data/site';
import { externalPosts } from './data/external-posts';
import { TAG_IDS, type Tag } from './data/tags';

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
export const year = (d: Date) => d.getUTCFullYear();

/** Published posts, newest first. Drafts show in `astro dev` only (spec section 5). */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  // Build-time rule (spec section 5, 9): an unresolved TODO( in a published post fails the build.
  // Drafts are filtered out above in production, so they may keep TODO( markers.
  if (!import.meta.env.DEV) {
    const bad = posts.filter((p) => /TODO\(/.test(`${p.body ?? ''}\n${p.data.title}\n${p.data.description}`));
    if (bad.length) {
      throw new Error(
        `Unresolved TODO( in published post(s): ${bad.map((p) => p.id).join(', ')}. ` +
          'Resolve each TODO(owner) or set draft: true.',
      );
    }
  }
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

/** A row for the blog list: a post written here, or one linked out to another platform. */
export interface ListedPost {
  title: string;
  date: Date;
  tags: Tag[];
  href: string;
  source?: string; // set only for external posts
}

/** Local and external posts merged, newest first. Used by the lists, never by RSS or JSON-LD. */
export async function getListedPosts(): Promise<ListedPost[]> {
  const local: ListedPost[] = (await getPosts()).map((p) => ({
    title: p.data.title,
    date: p.data.pubDate,
    tags: p.data.tags,
    href: `/blog/${p.id}`,
  }));
  const external: ListedPost[] = externalPosts.map((e) => {
    if (!e.url.startsWith('https://')) throw new Error(`External post needs an https:// URL: ${e.title}`);
    const bad = (e.tags ?? []).filter((t) => !(TAG_IDS as readonly string[]).includes(t));
    if (bad.length) throw new Error(`External post "${e.title}" has unknown tag(s): ${bad.join(', ')}`);
    const date = new Date(e.date);
    if (Number.isNaN(date.valueOf())) throw new Error(`External post "${e.title}" has an invalid date: ${e.date}`);
    return { title: e.title, date, tags: e.tags ?? [], href: e.url, source: e.source };
  });
  return [...local, ...external].sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

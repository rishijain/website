import type { Tag } from './tags';

// Posts written on another platform. Listed on /blog and the tag pages as link-out rows;
// they are NOT pages on this site, so they are left out of /rss.xml, the sitemap and JSON-LD.
// Add one entry per post, newest anywhere in the list (order does not matter; the site sorts by date).
// Tags must come from src/data/tags.ts (a wrong tag fails the build).
export interface ExternalPost {
  title: string;
  url: string; // full https:// URL of the original post
  date: string; // YYYY-MM-DD, the original publication date
  source: string; // platform name shown to readers, e.g. "Medium"
  tags?: Tag[];
}

// PLACEHOLDER: replace with the real posts (and delete this entry) before launch.
export const externalPosts: ExternalPost[] = [
  {
    title: 'Placeholder external post',
    url: 'https://example.com/placeholder-external-post',
    date: '2025-06-01',
    source: 'Placeholder Platform',
    tags: ['rails'],
  },
];

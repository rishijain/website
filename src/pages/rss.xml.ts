import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { TAG_NAMES } from '../data/tags';
import { getPosts } from '../lib';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.positioningLine,
    site: context.site!,
    trailingSlash: false,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      link: `/blog/${p.id}`,
      pubDate: p.data.pubDate,
      categories: p.data.tags.map((t) => TAG_NAMES[t]),
    })),
  });
}

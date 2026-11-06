import { defineCollection } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAG_IDS } from './data/tags';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // about 150 characters; meta and OG description
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(), // only for substantive edits
    tags: z.array(z.enum(TAG_IDS)).default([]), // unknown tags fail the build
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(), // one line
    role: z.string(),
    stack: z.array(z.string()).default([]),
    year: z.number(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    conference: z.string(),
    date: z.coerce.date(),
    videoUrl: z.url().optional(),
    slidesUrl: z.url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects, talks };

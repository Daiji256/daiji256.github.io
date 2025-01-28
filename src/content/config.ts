import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { posts, pages };

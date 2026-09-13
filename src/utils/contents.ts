import { getCollection } from 'astro:content';
import { type ContentSummary } from '../models/contentSummary';
import { type Tag } from '../models/tag';
import { ACTIVITIES } from '../activities';

export type TagWithCount = Tag & {
  count: number;
};

export async function getPosts(): Promise<ContentSummary[]> {
  return (await getCollection('posts'))
    .map((post) => ({
      platform: null,
      title: post.data.title,
      description: post.data.description,
      publishedDate: post.data.publishedDate,
      tags: post.data.tags,
      url: `/posts/${post.id}/`,
    }))
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export function getActivities(): ContentSummary[] {
  return ACTIVITIES.map((activity) => ({
    platform: activity.platform,
    title: activity.title,
    description: activity.description,
    publishedDate: new Date(activity.publishedDate),
    tags: activity.tags,
    url: activity.url,
  })).sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export async function getAllContents(): Promise<ContentSummary[]> {
  const posts = await getPosts();
  const activities = getActivities();
  return [...posts, ...activities].sort(
    (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime(),
  );
}

export async function getAllTagsWithCount(): Promise<TagWithCount[]> {
  const contents = await getAllContents();
  const tagsCount = new Map<string, TagWithCount>();
  contents.forEach((content) => {
    content.tags?.forEach((tag) => {
      const existing = tagsCount.get(tag.id);
      tagsCount.set(tag.id, {
        id: tag.id,
        name: existing?.name ?? tag.name,
        count: (existing?.count ?? 0) + 1,
      });
    });
  });
  return Array.from(tagsCount.values()).sort((a, b) => b.count - a.count);
}

export async function getAllTags(): Promise<Tag[]> {
  const tagsWithCount = await getAllTagsWithCount();
  return tagsWithCount.map(({ id, name }) => ({ id, name }));
}

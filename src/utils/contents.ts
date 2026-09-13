import { getCollection } from 'astro:content';
import { type ContentSummary } from '../models/contentSummary';
import { ACTIVITIES } from '../activities';

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

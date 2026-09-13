import { type Tag } from '../models/tag';
import { type ContentSummary } from '../models/contentSummary';
import { getAllContents } from './contents';

export type TagWithCount = Tag & {
  count: number;
};

export async function getAllTagsWithCount(
  contents?: ContentSummary[],
): Promise<TagWithCount[]> {
  const allContents = contents ?? (await getAllContents());
  return extractTagsWithCount(allContents);
}

export function extractTagsWithCount(
  contents: ContentSummary[],
): TagWithCount[] {
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

export function extractTags(contents: ContentSummary[]): Tag[] {
  return extractTagsWithCount(contents).map(({ id, name }) => ({ id, name }));
}

export async function getAllTags(contents?: ContentSummary[]): Promise<Tag[]> {
  const allContents = contents ?? (await getAllContents());
  return extractTags(allContents);
}

export function hasTag(content: ContentSummary, tagId: string): boolean {
  return content.tags?.some((tag) => tag.id === tagId) ?? false;
}

export function filterContentsByTag(
  contents: ContentSummary[],
  tagId: string,
): ContentSummary[] {
  return contents.filter((content) => hasTag(content, tagId));
}

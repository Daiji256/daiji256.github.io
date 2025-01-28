import { type Tag } from './tag';

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  publishedDate: Date;
  tags: Tag[] | undefined;
};

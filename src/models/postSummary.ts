import { type Tag } from './tag';

export type PostSummary = {
  id: string;
  title: string;
  description: string;
  publishedDate: Date;
  tags: Tag[] | undefined;
};

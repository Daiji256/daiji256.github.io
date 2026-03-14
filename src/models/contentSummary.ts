import { type Tag } from './tag';

export type ContentSummary = {
  platform: null | { name: string; url: string };
  title: string;
  description: string;
  publishedDate: Date;
  tags: Tag[] | undefined;
  url: string;
};

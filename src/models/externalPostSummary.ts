import { type Tag } from './tag';

export type ExternalPostSummary = {
  platform: string;
  title: string;
  description: string;
  publishedDate: Date;
  tags: Tag[] | undefined;
  url: string;
};

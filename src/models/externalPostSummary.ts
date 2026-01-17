import { type ExternalPostPlatform } from './externalPostPlatform';
import { type Tag } from './tag';

export type ExternalPostSummary = {
  platform: ExternalPostPlatform;
  title: string;
  description: string;
  publishedDate: Date;
  tags: Tag[] | undefined;
  url: string;
};

import { PAGE_SIZE } from '../consts';

export type PaginatedPage<T> = {
  params: { page: string | undefined };
  pageLength: number;
  items: T[];
};

export function paginate<T>(
  items: T[],
  pageSize: number = PAGE_SIZE,
): PaginatedPage<T>[] {
  const pageLength = Math.ceil(items.length / pageSize);
  const pages: PaginatedPage<T>[] = [];
  for (let i = 0; i < pageLength; i++) {
    pages.push({
      params: { page: i === 0 ? undefined : String(i + 1) },
      pageLength,
      items: items.slice(i * pageSize, (i + 1) * pageSize),
    });
  }
  return pages;
}

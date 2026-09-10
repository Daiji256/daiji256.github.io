import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeQuotes from 'rehype-quotes';
import rehypeAdjustAki from 'rehype-adjust-aki';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeQuotes)
  .use(rehypeAdjustAki)
  .use(rehypeStringify);

export function adjustText(text: string): string {
  return processor
    .processSync(text)
    .toString()
    .replace(/<\/?p>/g, '');
}

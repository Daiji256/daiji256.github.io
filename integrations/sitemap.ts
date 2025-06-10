import type { AstroIntegration } from 'astro';
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';

const sitemap = (): AstroIntegration => {
  return {
    name: 'daiji256/sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const hostname = 'https://daiji256.github.io/';
        const sms = new SitemapStream({ hostname });
        const excludes = ['404/', 'privacy-policy/'];
        [...new Set(pages.map((p) => p.pathname))]
          .sort((a, b) => a.localeCompare(b))
          .forEach((pathname) => {
            if (!excludes.includes(pathname)) {
              sms.write(hostname + pathname);
            }
          });
        sms.end();
        sms.pipe(createWriteStream(fileURLToPath(dir) + 'sitemap.xml'));
      },
    },
  };
};

export default sitemap;

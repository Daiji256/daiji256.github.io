import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeMathML from '@daiji256/rehype-mathml';
import rehypeQuotes from 'rehype-quotes';
import rehypeAdjustAki from 'rehype-adjust-aki';
import rehypeExternalLinks from 'rehype-external-links';
import { FOOTNOTE_LABEL, FOOTNOTE_BACK_LABEL, SITE_URL } from './src/consts';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-light-high-contrast' },
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeMathML,
      rehypeQuotes,
      rehypeAdjustAki,
      [
        rehypeExternalLinks,
        {
          target: ['_blank'],
          rel: ['noopener'],
          properties: { className: ['external-link'] },
        },
      ],
    ],
    remarkRehype: {
      footnoteLabelProperties: { className: ['footnote'] },
      footnoteLabel: FOOTNOTE_LABEL,
      footnoteBackLabel(referenceIndex, rereferenceIndex) {
        return (
          referenceIndex +
          1 +
          (rereferenceIndex > 1 ? '-' + rereferenceIndex : '') +
          FOOTNOTE_BACK_LABEL
        );
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData:
            '@use "/src/styles/colors.scss"; @use "/src/styles/typography.scss"; @use "/src/styles/dimensions.scss";',
        },
      },
    },
    build: {
      assetsInlineLimit: 16384,
    },
  },
  redirects: {
    '/about': '/',
    '/privacy': '/privacy-policy/',
    '/categories': '/tags/',
    '/categories/tex-latex': '//tags/tex/',
    '/categories/日記-備忘録': '/tags/diary/',
    '/categories/hugo': '/tags/hugo/',
    '/categories/c': '/tags/c/',
    '/categories/android': '/tags/android/',
    '/categories/cdn': '/tags/cdn/',
    '/categories/python': '/tags/python/',
    '/categories/プログラミング': '/tags/programming/',
    '/categories/画像処理': '/tags/image-processing/',
    '/categories/論文': '/tags/paper/',
    '/tags/まとめ': '/tags/memorandum/',
    '/tags/就職活動': '/tags/job-hunting/',
    '/tags/アルバイト': '/tags/part-time-job/',
    '/tags/コメント欄': '/tags/comments-section/',
    '/tags/ネタ': '/tags/joke/',
    '/tags/翻訳': '/tags/translation/',
    '/tags/高専': '/tags/kosen/',
    '/posts/c/popcnt': '/posts/popcnt/',
    '/posts/tex-latex/tex-word': '/posts/tex-word/',
    '/posts/c/eval-c': '/posts/eval-c/',
    '/posts/tex-latex/lualatex-susume': '/posts/lualatex-susume/',
    '/posts/tex-latex/latex-susume': '/posts/latex-susume/',
    '/posts/tex-latex/tex-tikz-heatran': '/posts/tex-tikz-heatran/',
    '/posts/diary/job-hunting': '/posts/job-hunting/',
    '/posts/diary/atkart-note': '/posts/atkart-note/',
    '/posts/diary/write-paper': '/posts/write-paper/',
    '/posts/diary/utterances': '/posts/utterances/',
    '/posts/paper/depth-prediction-without-the-sensors-leveraging-structure-for-unsupervised-learning-from-monocular-videos':
      '/posts/depth-prediction-without-the-sensors-leveraging-structure-for-unsupervised-learning-from-monocular-videos/',
    '/posts/blog/tex2svg': '/posts/tex2svg/',
    '/posts/hugo/tex2svg': '/posts/tex2svg/',
    '/posts/blog/yakukumifonts': '/posts/yakukumi-fonts/',
    '/posts/cdn/yakukumifonts': '/posts/yakukumi-fonts/',
    '/posts/image-processing/cupy-trans': '/posts/cupy-trans/',
    '/posts/tex-latex/auto-maze': '/posts/auto-maze/',
    '/posts/hugo/generate-ogp': '/posts/generate-ogp/',
    '/posts/diary/fuller-part-1': '/posts/fuller-part-1/',
    '/posts/diary/kosen-graduation': '/posts/kosen-graduation/',
    '/posts/diary/onclick-onclicked': '/posts/onclick-onclicked/',
  },
});

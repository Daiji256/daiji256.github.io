import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathML from "rehype-mathml";
import rehypeQuotes from "rehype-quotes";
import rehypeAdjustAki from "rehype-adjust-aki";
import rehypeExternalLinks from "rehype-external-links";
import { FOOTNOTE_LABEL, SITE_URL } from "./src/consts";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: SITE_URL,
	integrations: [
		mdx(),
		sitemap({
			filter: (page) =>
				[
					"categories/",
					"tags/まとめ/",
					"tags/就職活動/",
					"tags/アルバイト/",
					"tags/コメント欄/",
					"tags/ネタ/",
					"tags/翻訳/",
					"tags/高専/",
					"posts/tex-latex/",
					"posts/c/",
					"posts/diary/",
					"posts/paper/",
					"posts/blog/",
					"posts/hugo/",
					"posts/cdn/",
					"posts/image-processing/",
				].every((path) =>
					!page.includes(encodeURI(`https://daiji256.github.io/${path}`))
				)
		}),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: { theme: "github-light" },
		remarkPlugins: [remarkMath],
		rehypePlugins: [
			rehypeMathML,
			rehypeQuotes,
			rehypeAdjustAki,
			[
				rehypeExternalLinks,
				{
					target: ["_blank"],
					rel: ["noopener"],
					properties: { className: ["external-link"] },
				},
			]
		],
		remarkRehype: {
			footnoteLabel: FOOTNOTE_LABEL,
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "src/styles/variables.scss";',
				},
			},
		},
	},
});

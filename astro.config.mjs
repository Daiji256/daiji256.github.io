import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathML from "@daiji256/rehype-mathml";
import rehypeQuotes from "rehype-quotes";
import rehypeAdjustAki from "rehype-adjust-aki";
import rehypeExternalLinks from "rehype-external-links";
import { FOOTNOTE_LABEL, SITE_URL } from "./src/consts";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: SITE_URL,
	integrations: [
		mdx(),
		sitemap(),
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
					api: "modern-compiler",
					additionalData: '@use "/src/styles/colors.scss"; @use "/src/styles/typography.scss"; @use "/src/styles/dimensions.scss";',
				},
			},
		},
	},
});

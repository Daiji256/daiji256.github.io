import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathML from "rehype-mathml";
import rehypeQuotes from "rehype-quotes";
import rehypeAdjustAki from "rehype-adjust-aki";
import rehypeExternalLinks from "rehype-external-links";
import { FOOTNOTE_LABEL, SITE_URL } from "./src/consts";
import { redirects } from "./src/redirects";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: SITE_URL,
	integrations: [
		mdx(),
		sitemap({
			filter: (page) =>
				redirects.every((r) =>
					!page.includes(encodeURI(`https://daiji256.github.io/${r.from}`))
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
					additionalData: '@use "src/styles/colors.scss"; @use "src/styles/typography.scss"; @import "src/styles/variables.scss";',
				},
			},
		},
	},
});

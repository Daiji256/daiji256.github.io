import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeMathML from "rehype-mathml";
import rehypeQuotes from "rehype-quotes";
import rehypeAdjustAki from "rehype-adjust-aki";
import rehypeExternalLinks from "rehype-external-links";
import { FOOTNOTE_LABEL } from "./src/consts";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://example.com",
	integrations: [mdx(), sitemap()],
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

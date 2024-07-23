import type { APIRoute } from "astro";
import { SITE_URL } from "../../src/consts";
import { redirects } from "../../src/redirects";

const robots = `
User-agent: *
${redirects.map((r) => `Disallow: /${encodeURI(r.from)}/`).join("\n")}
Sitemap: ${new URL("sitemap-index.xml", SITE_URL).href}
`.trim();

export const GET: APIRoute = () =>
	new Response(robots, {
		headers: { "Content-Type": "text/plain" },
	});

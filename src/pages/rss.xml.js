import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import excerptHtml from "excerpt-html";
import { marked } from "marked";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => {
      let html = marked.parse(post.body);
      let excerpt = excerptHtml(html, { pruneLength: 500 });
      return {
        ...post.data,
        content: sanitizeHtml(html),
        description: sanitizeHtml(excerpt),
        link: `/blog/${post.slug}/`,
      };
    }),
  });
}

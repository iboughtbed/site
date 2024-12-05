import { getBlogPosts } from "@/lib/blog";

export default async function sitemap() {
  const posts = getBlogPosts().map((post) => ({
    url: `https://sanzhar.xyz/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/craft", "/projects"].map((route) => ({
    url: `https://sanzhar.xyz${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...posts];
}

import fs from "fs";
import matter from "gray-matter";
import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";
import path from "path";
import { remark } from "remark";
import { visit } from "unist-util-visit";

import { slugify } from "@/lib/utils";

type Metadata = {
  title: string;
  description: string;
  publishedAt: string;
  authors?: { url: string; name: string; image: string }[];
  date: string;
};

type TableOfContents = {
  value: string;
  depth: number;
  url: string;
}[];

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return matter(rawContent);
}

function extractHeadings(content: string): TableOfContents {
  const headings: TableOfContents = [];

  const tree = remark().parse(content);

  visit(tree, ["heading", "html"], (node) => {
    if (node.type === "heading") {
      // Handle Markdown-style headings
      const value = node.children
        .filter((child) => child.type === "text")
        .map((child) => child.value)
        .join("");

      const slug = slugify(value);
      headings.push({ value, depth: 1, url: `#${slug}` });
    } else if (node.type === "html") {
      const htmlTree = fromHtml(node.value, { fragment: true });
      const element = htmlTree.children[0];

      if (
        element &&
        "tagName" in element &&
        /^h[1-6]$/i.test(element.tagName)
      ) {
        const value = toText(element);

        const slug = slugify(value);
        headings.push({ value, depth: 1, url: `#${slug}` });
      }
    }
  });

  return headings;
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));
    const toc = extractHeadings(content);

    return {
      metadata: data as Metadata,
      slug,
      content,
      toc,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "src", "content", "blog"));
}

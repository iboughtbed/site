import path from "path";

import { getMDXData } from "@/lib/mdx";

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "src", "content", "blog"));
}

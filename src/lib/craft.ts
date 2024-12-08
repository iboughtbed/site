import path from "path";

import { getMDXData } from "@/lib/mdx";

export function getCraftPosts() {
  return getMDXData(path.join(process.cwd(), "src", "content", "crafts"));
}

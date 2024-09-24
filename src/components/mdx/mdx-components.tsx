import rehypeShiki from "@shikijs/rehype";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import * as React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

import vesper from "@/lib/themes/vesper.json";
import { cn } from "@/lib/utils";
import { Video } from "./video";

// function CodeBlock({
//   children,
//   ...props
// }: React.HTMLAttributes<HTMLPreElement>) {
//   return <pre></pre>;
// }

const components = {
  code: async ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return <code className={cn("codeblock-code", className)} {...props} />;
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="codeblock-pre">
      {children}
    </pre>
  ),
  Image: (props: React.ComponentProps<typeof Image>) => (
    <Image {...props} alt={props.alt} />
  ),
  Video: (props: React.HTMLAttributes<HTMLVideoElement>) => (
    <Video {...props} />
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={{ ...components }}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [
              rehypeShiki,
              {
                theme: vesper,
                langs: ["ts", "js", "tsx", "jsx", "css", "mdx", "md", "json"],
                transformers: [
                  transformerNotationDiff(),
                  transformerMetaHighlight(),
                ],
              },
            ],
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ["subheading-anchor"],
                  ariaLabel: "Link to section",
                },
              },
            ],
          ],
        },
      }}
    />
  );
}

import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import * as React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { codeToHtml, createHighlighter, ThemeInput } from "shiki";

import vesperTheme from "@/lib/themes/vesper.json";
import { cn } from "@/lib/utils";

// function CodeBlock({
//   children,
//   ...props
// }: React.HTMLAttributes<HTMLPreElement>) {
//   return <pre></pre>;
// }

const components = {
  code: async ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const highlighter = await createHighlighter({
      langs: ["ts", "js", "tsx", "jsx", "css", "mdx", "md", "json"],
      themes: [],
    });

    await highlighter.loadTheme(vesperTheme as ThemeInput);

    const html = await codeToHtml(children as string, {
      lang: "ts",
      theme: "vesper",
    });

    highlighter.dispose();

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={cn("h-full w-full bg-[#1c1c1c]", className)}
        {...props}
      />
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className="bg-[#1c1c1c] px-0 py-4">
      {children}
    </pre>
  ),
  Image: (props: React.ComponentProps<typeof Image>) => (
    <Image {...props} alt={props.alt} />
  ),
  Video: ({ className, ...props }: React.HTMLAttributes<HTMLVideoElement>) => (
    <div className="my-3 aspect-video rounded-xl">
      <video
        {...props}
        className={cn("w-full rounded-md object-contain", className)}
        playsInline
        loop
        autoPlay
        muted
      />
    </div>
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

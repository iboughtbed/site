import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx/mdx-components";
import { getBlogPosts } from "@/lib/blog";
import { SectionAuthors } from "../_components/section-authors";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-32 max-md:pt-10">
      <div className="top-blur"></div>
      <div className="flex flex-col">
        <div className="blog-nav-bar">
          <Link
            href="/blog"
            className="-m-[3px] inline-flex w-fit items-center gap-1 rounded-md p-[3px] text-sm leading-5 text-neutral-700 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            <Icons.back
              style={{
                transform: "translateY(-1px)",
              }}
            />
            Blog
          </Link>
          <nav
            className="mt-[60px]"
            style={{
              opacity: 0,
              animation: "fadeIn 0.5s ease forwards",
            }}
          >
            <ul className="flex flex-col flex-nowrap gap-2.5">
              {post.toc.map((item) => (
                <li
                  key={item.url}
                  className="flex text-[13px] text-neutral-700 dark:text-neutral-400"
                >
                  <Link
                    href={item.url}
                    className="-m-[3px] rounded-md p-[3px] transition-colors hover:text-black dark:hover:text-neutral-200"
                  >
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mb-8 flex flex-nowrap items-center justify-start">
          <div className="flex flex-col justify-start gap-2">
            <h1 className="text-base font-medium leading-5">
              {post.metadata.title}
            </h1>
            <p className="text-sm leading-5 text-[#6f6f6f] dark:text-[#a0a0a0]">
              {post.metadata.publishedAt}
            </p>
          </div>
          <div className="ml-auto flex flex-nowrap justify-start gap-2">
            <CopyButton />
            {post.metadata.authors && (
              <SectionAuthors authors={post.metadata.authors} />
            )}
          </div>
        </div>
        <article className="prose prose-neutral prose-quoteless min-w-full dark:prose-invert">
          <Mdx source={post.content} />
        </article>
        <hr className="my-10 h-px bg-[#1d1d1d] dark:bg-[#ffffff20]" />
      </div>
    </main>
  );
}

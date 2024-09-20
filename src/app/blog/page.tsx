import Link from "next/link";

import { getBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-32 max-md:pt-10">
      <h1 className="text-2xl font-medium tracking-tighter">Read my blog</h1>
      <section className="mt-8 flex flex-col gap-[28px]">
        {posts
          .sort((a, b) => {
            if (a.metadata.pinned && b.metadata.pinned) {
              return b.metadata.pinned - a.metadata.pinned;
            }

            if (a.metadata.pinned && !b.metadata.pinned) return -1;
            if (!a.metadata.pinned && b.metadata.pinned) return 1;

            return (
              new Date(b.metadata.date).getTime() -
              new Date(a.metadata.date).getTime()
            );
          })
          .map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="relative -m-3 flex w-[calc(100%+32px)] items-center gap-3 overflow-hidden rounded-xl p-3 hover:bg-[#f3f3f3] dark:hover:bg-[#232323]"
              style={{
                opacity: 0,
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s forwards`,
              }}
            >
              <span className="text-sm font-normal leading-7 text-[#6f6f6f] dark:text-[#a0a0a0]">
                {post.metadata.title}
              </span>
              <div className="grow"></div>
              <span className="shrink-0 text-sm font-normal leading-7 text-[#707070]">
                {post.metadata.publishedAt}
              </span>
            </Link>
          ))}
      </section>
    </main>
  );
}

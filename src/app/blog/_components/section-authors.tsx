"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface SectionAuthorsProps {
  authors: {
    url: string;
    name: string;
    image: string;
  }[];
}

export function SectionAuthors({ authors }: SectionAuthorsProps) {
  const [activeAuthor, setActiveAuthor] = React.useState<string | null>(null);
  const [contentInView, setContentInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains("prose")) {
            setContentInView(entry.isIntersecting);
          } else if (contentInView) {
            const authorName = entry.target.getAttribute("data-author");
            if (entry.isIntersecting && authorName) {
              setActiveAuthor(authorName);
            }
          } else if (!contentInView) {
            setActiveAuthor(null);
          }
        });
      },
      { rootMargin: "0px 0px -100% 0px" },
    );

    const contentElement = document.querySelector(".prose");
    if (contentElement) {
      observer.observe(contentElement);
    }

    const authorSection = document.querySelectorAll("[data-author]");
    authorSection.forEach((paragraph) => observer.observe(paragraph));

    return () => observer.disconnect();
  }, [contentInView]);

  return (
    <div className="fixed left-1/2 top-10 z-[1] -translate-x-1/2 -translate-y-1/2">
      <motion.div
        layout="size"
        className="flex flex-nowrap items-center gap-1 bg-[#f3f3f3] p-1 text-neutral-700 transition-all duration-300 ease-in-out hover:bg-[#f3f3f3]/70 dark:bg-[#232323] dark:text-neutral-400 dark:hover:bg-[#232323]/70"
        initial={{ opacity: 0, borderRadius: "9999px" }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 0.3, delay: 0.5 },
          layout: { duration: 0.3 },
        }}
      >
        {authors.map((author, index) => (
          <Link
            key={author.name}
            data-name={author.name}
            data-active={activeAuthor === author.name}
            href={author.url}
            className="section-authors-link transition-all duration-300"
            style={
              {
                "--outline-color": `${["#ca8a04", "#2563eb", "#16a34a", "#db2777"][index % 4]}`,
                transform: `translateX(${activeAuthor ? -8 * index : 0}px)`,
              } as React.CSSProperties
            }
          >
            <Image
              alt={`Avatar of ${author.name}`}
              src={author.image}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full shadow-lg"
            />
          </Link>
        ))}

        <div
          className="overflow-hidden transition-[width,margin] duration-300 ease-in-out"
          style={{
            width: activeAuthor ? "auto" : 0,
            marginLeft: activeAuthor ? "0.5rem" : 0,
            marginRight: activeAuthor ? "0.5rem" : 0,
          }}
        >
          {activeAuthor && (
            <motion.div
              className="flex items-center justify-center whitespace-nowrap text-sm font-normal leading-4 text-foreground blur-sm"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              key={activeAuthor}
            >
              {activeAuthor}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

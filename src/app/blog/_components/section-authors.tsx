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
      {
        // threshold: [0, 0.5],
        // rootMargin: "top right bottom left",
        rootMargin: "0px 0px -100% 0px",
      },
    );

    const contentElement = document.querySelector(".prose");
    if (contentElement) {
      observer.observe(contentElement);
    }

    const authorSection = document.querySelectorAll("[data-author]");
    authorSection.forEach((paragraph) => observer.observe(paragraph));

    return () => observer.disconnect();
  }, [contentInView]);

  const MotionLink = motion.create(Link);

  return (
    <div className="fixed left-1/2 top-10 z-[1] -translate-x-1/2 -translate-y-1/2">
      <motion.div
        layout
        className="flex flex-nowrap gap-1 bg-[#f3f3f3] p-1 text-neutral-700 transition-all hover:bg-[#f3f3f3]/70 dark:bg-[#232323] dark:text-neutral-400 dark:hover:bg-[#232323]/70"
        initial={{ opacity: 0, borderRadius: "9999px", scale: 1 }}
        animate={{ opacity: 1 }}
        style={
          {
            // scale: containerScale,
            // borderRadius: containerBorderRadius,
          }
        }
        transition={{
          opacity: { duration: 0.3, delay: 0.5 },
          layout: { duration: 0.3 },
        }}
      >
        {authors.map((author, index) => (
          <MotionLink
            data-name={author.name}
            data-active={activeAuthor === author.name}
            key={index}
            href={author.url}
            className="section-authors-link transition-all"
            animate={
              {
                // x: activeAuthor ? -8 * index : 0,
              }
            }
            transition={{ duration: 0.01 }}
            style={{
              // @ts-expect-error react css properties
              "--outline-color": `${["#ca8a04", "#2563eb", "#16a34a", "#db2777"][index % 4]}`,
            }}
          >
            <Image
              alt={`Avatar of ${author.name}`}
              src={author.image}
              width={24}
              height={24}
              className="h-6 w-6 rounded-full shadow-lg"
            />
          </MotionLink>
        ))}

        {activeAuthor && (
          <motion.div
            className="ml-2 mr-2 flex items-center justify-center text-sm font-normal leading-4 text-foreground"
            initial={{ opacity: 0, filter: "blur(3px)", x: "-5px" }}
            animate={{ opacity: 1, filter: "blur(0px)", x: "0px" }}
            transition={{ duration: 0.2 }}
            key={activeAuthor} // This ensures the animation runs every time the author changes
          >
            {activeAuthor}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { surfacePillClassName } from "@/components/chip";
import { ChevronIcon } from "@/components/icons";

export type Photo = { id: string; alt: string; width: number };

const arrowClassName = `${surfacePillClassName} grid size-7 place-items-center text-foreground-strong transition-opacity hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-strong/30 disabled:pointer-events-none disabled:opacity-35`;

export function PhotoCarousel({ heading, photos }: { heading: ReactNode; photos: Photo[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  function updateEdges() {
    const strip = stripRef.current;
    if (!strip) return;
    setEdges({
      atStart: strip.scrollLeft <= 4,
      atEnd: strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4,
    });
  }

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  function scrollByPage(direction: 1 | -1) {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.6, behavior: "smooth" });
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {heading}
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="previous photos"
            disabled={edges.atStart}
            onClick={() => scrollByPage(-1)}
            className={arrowClassName}
          >
            <ChevronIcon className="size-3.5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="next photos"
            disabled={edges.atEnd}
            onClick={() => scrollByPage(1)}
            className={arrowClassName}
          >
            <ChevronIcon className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="relative -mx-8 -my-4 [--fade:2rem] md:mr-0 md:-ml-24 md:w-[calc(50vw+20rem)] md:[--fade:6rem]">
        <div
          ref={stripRef}
          onScroll={updateEdges}
          className="scrollbar-hide fade-left flex snap-x scroll-px-8 gap-5 overflow-x-auto px-8 py-4 md:scroll-px-24 md:pr-8 md:pl-24"
        >
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className="shrink-0 snap-start rounded-[3px] bg-surface p-2.5 pb-0 shadow-raised"
            >
              <div className="film-grain relative h-100" style={{ width: photo.width }}>
                <Image
                  src={`https://l54l40586t.ufs.sh/f/${photo.id}`}
                  alt={photo.alt}
                  fill
                  sizes={`${photo.width}px`}
                  loading={index < 3 ? "eager" : undefined}
                  className="object-cover brightness-[1.04] contrast-[.95] saturate-[1.05] sepia-[.08]"
                  quality={75}
                />
              </div>
              <figcaption
                className="truncate py-2.5 text-xs text-foreground/80"
                style={{ width: photo.width }}
              >
                {photo.alt}
              </figcaption>
            </figure>
          ))}
        </div>
        <div
          aria-hidden
          className="fade-left-blur pointer-events-none absolute inset-y-0 left-0 w-(--fade)"
        />
      </div>
    </>
  );
}

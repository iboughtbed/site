"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import type { Craft } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

interface CraftCardProps {
  craft: Craft;
}

export function CraftCard({ craft }: CraftCardProps) {
  const ref = React.useRef(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref);
  const mounted = useMounted();

  React.useEffect(() => {
    if (craft.type !== "video") return;

    if (videoRef.current) {
      videoRef.current.src = craft.src;

      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView, craft]);

  const content = (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="craft-card-inner relative h-full w-full"
        data-theme={craft.theme}
        data-position={craft.position}
      >
        <div
          style={{ aspectRatio: craft.height / craft.width }}
          className="relative"
        >
          {craft.type === "video" ? (
            <>
              <Image
                aria-hidden="true"
                alt=""
                src={craft.placeholder}
                style={{ aspectRatio: craft.height / craft.width }}
                className="craft-placeholder absolute bottom-0 left-0 right-0 top-0 block h-full w-full object-cover object-center"
                width={craft.width}
                height={craft.height}
              />

              {mounted && isInView && (
                <video
                  ref={videoRef}
                  style={{ aspectRatio: craft.height / craft.width }}
                  className="relative block h-full w-full overflow-clip object-cover"
                  playsInline
                  loop
                  autoPlay
                  muted
                ></video>
              )}
            </>
          ) : (
            <Image
              alt={craft.title}
              src={craft.src}
              style={{ aspectRatio: craft.height / craft.width }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={craft.width}
              height={craft.height}
            />
          )}
        </div>

        <div
          className="craft-card-info absolute z-[1] flex h-8 w-full items-center justify-between gap-3 whitespace-nowrap p-4 transition-opacity duration-200"
          data-theme={craft.theme}
          data-position={craft.position}
        >
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] leading-7">
            {craft.title}
          </div>
          <div className="craft-card-date whitespace-nowrap text-[13px] leading-7">
            {craft.date}
          </div>
        </div>
      </div>
    </div>
  );

  const className =
    "relative mb-2 w-full overflow-hidden rounded-xl border bg-white border-[#e8e8e8] dark:border-[#2e2e2e] dark:bg-[#1c1c1c]";

  if (craft.slug || craft.href) {
    return (
      <Link
        ref={ref}
        href={craft.slug ? `/craft/${craft.slug}` : (craft.href ?? "#")}
        rel={craft.href ? "noopener noreferrer" : undefined}
        target={craft.href ? "_blank" : undefined}
        className={cn(className, "group block cursor-pointer p-1")}
        aria-label={craft.title}
      >
        {content}
        <div className="relative mt-1 flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-[#f3f3f3] text-xs font-medium transition-colors group-hover:bg-[#ededed] dark:bg-[#232323] group-hover:dark:bg-[#282828]">
          {craft.writing
            ? "Read Post"
            : craft.href
              ? "View Production"
              : craft.slug
                ? "View Prototype"
                : ""}
          <Icons.arrow />
        </div>
      </Link>
    );
  } else {
    return (
      <div ref={ref} className={className} aria-label={craft.title}>
        {content}
      </div>
    );
  }
}

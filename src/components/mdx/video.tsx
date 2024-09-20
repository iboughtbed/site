"use client";

import { useInView } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

export function Video({
  className,
  ...props
}: React.HTMLAttributes<HTMLVideoElement>) {
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref} className="my-3 aspect-video rounded-xl">
      {isInView ? (
        <video
          {...props}
          className={cn("w-full rounded-md object-contain", className)}
          playsInline
          loop
          autoPlay
          muted
        />
      ) : null}
    </div>
  );
}

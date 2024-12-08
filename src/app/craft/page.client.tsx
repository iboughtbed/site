"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { crafts } from "@/lib/constants";
import { splitIntoColumns } from "@/lib/utils";
import { CraftCard } from "./_components/craft-card";

export function ClientPage() {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 960px)");

  const columnCount = React.useMemo(() => {
    if (typeof window === "undefined") return 3;

    if (isMobile) return 1;
    if (isTablet) return 2;
    else return 3;
  }, [isMobile, isTablet]);

  const columns = splitIntoColumns(crafts, columnCount);

  return (
    <>
      {columns.map((column, index) => (
        <div
          key={index}
          className="bg-clip-padding pl-2"
          style={{ width: `${100 / columnCount}%` }}
        >
          {column.map((craft, idx) => (
            <CraftCard key={idx} craft={craft} />
          ))}
        </div>
      ))}
    </>
  );
}

"use client";

import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyButtonProps {
  text?: string;
  icon?: keyof typeof Icons;
}

export function CopyButton({
  text = "Copy URL",
  icon = "link",
}: CopyButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#f3f3f3] text-neutral-700 hover:bg-[#f3f3f3]/70 dark:bg-[#232323] dark:text-neutral-400 dark:hover:bg-[#232323]/70"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          {Icons[icon]({ className: "h-5 w-5" })}
        </button>
      </TooltipTrigger>
      <TooltipContent className="whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-400">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

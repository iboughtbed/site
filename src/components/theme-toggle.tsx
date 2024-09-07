"use client";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MAX_SIZE = 80;
const MIN_SIZE = 40;
const MAX_DISTANCE = 160;

export function ThemeToggle({
  mouseX,
  mouseY,
  isHovering,
  isDesktop,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovering: MotionValue<boolean>;
  isDesktop: boolean;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [hover, setHover] = React.useState(false);
  // const [itemHovered, setItemHovered] = React.useState(false);

  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const unsubscribe = isHovering.on("change", (latest) => {
      setHover(latest);
    });

    return () => unsubscribe();
  }, [isHovering, isDesktop]);

  const distance = useTransform([mouseX, mouseY], ([x, y]) => {
    if (!ref.current || !hover || !isDesktop) return MAX_DISTANCE;
    const rect = ref.current.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const itemCenterY = rect.top + rect.height / 2;
    return Math.sqrt(
      Math.pow((x as number) - itemCenterX, 2) +
        Math.pow((y as number) - itemCenterY, 2),
    );
  });

  const size = useTransform(distance, [0, MAX_DISTANCE], [MAX_SIZE, MIN_SIZE]);
  const smoothSize = useSpring(size, { damping: 20, stiffness: 200 });

  const springY = useSpring(0, { stiffness: 150, damping: 12, mass: 0.9 });

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setTheme(theme === "light" ? "dark" : "light");

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const itemHeight = rect.height;

      // Adjust the jump height and duration
      const jumpHeight = -60 * (0.8 - 0.6 * (clickY / itemHeight)); // Reduced from -60
      const jumpDuration = 100; // Increased from 100

      springY.set(isDesktop ? jumpHeight : -20);
      setTimeout(() => {
        springY.set(0);
      }, jumpDuration);
    }
  }

  const MotionTooltipContent = motion.create(TooltipContent);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          aria-label="Toggle theme"
          className="footer-item"
          // onMouseEnter={() => setItemHovered(true)}
          // onMouseLeave={() => setItemHovered(false)}
          whileTap={{ top: 8 }}
          style={{
            width: smoothSize,
            height: smoothSize,
            y: springY,
          }}
          onClick={handleClick}
        >
          {/* <AnimatePresence>
            {itemHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="footer-item-label absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              >
                Toggle theme
              </motion.div>
            )}
          </AnimatePresence> */}
          <div className="footer-item-background"></div>
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            color="hsl(0 0% 49.4%)"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            className="pointer-events-none h-1/2 w-1/2"
            animate={{ rotate: theme === "light" ? 90 : 40 }}
            transition={{ duration: 0.6 }}
          >
            <mask id="myMask2">
              <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
              <motion.circle
                r="9"
                fill="black"
                animate={{
                  cx: theme === "dark" ? "50%" : "100%",
                  cy: theme === "dark" ? "23%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              ></motion.circle>
            </mask>
            <motion.circle
              cx="12"
              cy="12"
              fill="hsl(0 0% 49.4%)"
              mask="url(#myMask2)"
              animate={{ r: theme === "light" ? 5 : 9 }}
              transition={{ duration: 0.3 }}
            ></motion.circle>
            <motion.g
              stroke="currentColor"
              animate={{ opacity: theme === "dark" ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </motion.g>
          </motion.svg>
        </motion.button>
      </TooltipTrigger>
      <MotionTooltipContent
        className="footer-item-label whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-400"
        style={{
          y: !isDesktop ? springY : undefined,
        }}
      >
        <p className="font-mono text-xs">Toogle theme</p>
      </MotionTooltipContent>
    </Tooltip>
  );
}

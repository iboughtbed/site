"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

// Updated items structure with groups
const itemGroups = [
  [
    { label: "Home", href: "/", icon: Icons.home, external: false },
    { label: "Craft", href: "/craft", icon: Icons.craft, external: false },
    {
      label: "Projects",
      href: "/projects",
      icon: Icons.projects,
      external: false,
    },
    { label: "Photos", href: "/photos", icon: Icons.photos, external: false },
    { label: "Blog", href: "/blog", icon: Icons.pen, external: false },
  ],
  [
    {
      label: "Twitter",
      href: "https://x.com/iboughtbed",
      icon: Icons.twitter,
      external: true,
    },
    {
      label: "GitHub",
      href: "https://github.com/iboughtbed",
      icon: Icons.github,
      external: true,
    },
    {
      label: "Mail",
      href: "mailto:zhangalievsanzhar@gmail.com",
      icon: Icons.mail,
      external: true,
    },
  ],
];

const MAX_SIZE = 80;
const MIN_SIZE = 40;
const MAX_DISTANCE = 160;

export function SiteFooter() {
  const pathname = usePathname();

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovering = useMotionValue(false);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (isDesktop) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        isHovering.set(true);
      }
    },
    [mouseX, mouseY, isHovering, isDesktop],
  );

  const handleMouseLeave = React.useCallback(() => {
    isHovering.set(false);
  }, [isHovering]);

  if (!mounted) {
    return <></>;
  }

  return (
    <motion.footer
      id="footer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="footer-animation fixed -bottom-2 left-1/2 z-10 flex h-[58px] w-auto items-end rounded-full border border-[hsl(0_0%_100%_/_0.077)] bg-background px-2 shadow-lg max-sm:bottom-0 max-sm:top-[unset] max-sm:w-[calc(100%-69px)]"
    >
      <div className="flex w-full items-end gap-2 py-2 max-sm:h-[72px] max-sm:overflow-x-auto max-sm:overflow-y-hidden">
        {itemGroups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {groupIndex > 0 && <hr className="footer-hr" />}
            {group.map((item, itemIndex) => {
              const globalIndex =
                itemGroups.slice(0, groupIndex).flat().length + itemIndex;
              return (
                <FooterItem
                  key={`${groupIndex}-${itemIndex}`}
                  item={item}
                  index={globalIndex}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isHovering={isHovering}
                  isActive={pathname === item.href}
                  isDesktop={isDesktop}
                />
              );
            })}
          </React.Fragment>
        ))}

        <hr className="footer-hr" />

        <ThemeToggle
          mouseX={mouseX}
          mouseY={mouseY}
          isHovering={isHovering}
          isDesktop={isDesktop}
        />
      </div>
    </motion.footer>
  );
}

function FooterItem({
  item,
  index,
  mouseX,
  mouseY,
  isHovering,
  isActive,
  isDesktop,
}: {
  item: (typeof itemGroups)[number][number];
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovering: MotionValue<boolean>;
  isActive: boolean;
  isDesktop: boolean;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = React.useState(false);

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

  const size = useTransform(distance, [0, MAX_DISTANCE], [MAX_SIZE, MIN_SIZE], {
    clamp: true,
  });
  const smoothSize = useSpring(size, {
    damping: 20,
    stiffness: 200,
    mass: 0.5,
    restSpeed: 0.5,
  });

  const springY = useSpring(0, { stiffness: 150, damping: 12, mass: 0.9 });

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (ref.current) {
      if (e.detail === 0) {
        springY.set(-30);
        setTimeout(() => {
          springY.set(0);
        }, 300);
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const itemHeight = rect.height;
      const jumpHeight = -60 * (0.8 - 0.6 * (clickY / itemHeight));
      const jumpDuration = 300;

      springY.set(isDesktop ? jumpHeight : -30);
      setTimeout(() => {
        springY.set(0);
      }, jumpDuration);
    }
  }

  const MotionLink = motion.create(Link);
  const MotionTooltipContent = motion.create(TooltipContent);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <MotionLink
          ref={ref}
          href={item.href}
          className="footer-item"
          aria-label={item.label}
          rel={item.external ? "noopener noreferrer" : undefined}
          target={item.external ? "_blank" : undefined}
          whileTap={{ top: 8 }}
          style={{
            width: smoothSize,
            height: smoothSize,
            y: springY,
          }}
          onClick={handleClick}
          data-item-index={index}
        >
          <div className="footer-item-background"></div>
          <item.icon className="pointer-events-none h-1/2 w-1/2" />
          {isActive && (
            <div className="absolute -bottom-1.5 z-[1] h-1 w-1 rounded-full bg-zinc-700 opacity-100"></div>
          )}
        </MotionLink>
      </TooltipTrigger>
      <MotionTooltipContent
        className="footer-item-label whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-400"
        style={{
          y: !isDesktop ? springY : undefined,
        }}
      >
        <p className="font-mono text-xs">{item.label}</p>
      </MotionTooltipContent>
    </Tooltip>
  );
}

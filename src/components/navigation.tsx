"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { surfacePillClassName } from "@/components/chip";
import { sections, socials } from "@/lib/links";

const itemClassName = "relative block rounded-full transition-colors duration-150";

function useActiveSection() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const releaseScrollLockRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (releaseScrollLockRef.current) return;
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  function selectSection(id: string) {
    releaseScrollLockRef.current?.();
    setActiveId(id);
    const timeout = window.setTimeout(release, 1200);
    function release() {
      window.clearTimeout(timeout);
      window.removeEventListener("scrollend", release);
      releaseScrollLockRef.current = null;
    }
    window.addEventListener("scrollend", release);
    releaseScrollLockRef.current = release;
  }

  return { activeId, selectSection };
}

function SectionPills({
  activeId,
  onSelect,
  listClassName,
  linkClassName,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  listClassName: string;
  linkClassName: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    function placeIndicator() {
      const link = listRef.current?.querySelector<HTMLElement>(`[data-section="${activeId}"]`);
      const indicator = indicatorRef.current;
      if (!link || !indicator || link.offsetWidth === 0) return;
      indicator.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.height = `${link.offsetHeight}px`;
      if (!indicator.dataset.ready) {
        void indicator.offsetWidth;
        indicator.dataset.ready = "true";
      }
    }
    placeIndicator();
    window.addEventListener("resize", placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [activeId]);

  return (
    <ul ref={listRef} className={`relative ${listClassName}`}>
      <span
        ref={indicatorRef}
        aria-hidden
        className={`${surfacePillClassName} absolute top-0 left-0 opacity-0 ease-[cubic-bezier(0.3,0.7,0.2,1)] data-ready:opacity-100 data-ready:transition-[transform,width] data-ready:duration-300`}
      />
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            data-section={section.id}
            onClick={() => onSelect(section.id)}
            aria-current={activeId === section.id ? "location" : undefined}
            className={`${itemClassName} ${linkClassName} ${
              activeId === section.id ? "text-foreground-strong" : "hover:text-foreground-strong"
            }`}
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navigation() {
  const { activeId, selectSection } = useActiveSection();

  return (
    <>
      <aside className="fixed top-32 left-[calc(50%-30rem)] hidden w-40 lg:block">
        <nav className="-ml-3 flex flex-col items-start gap-10">
          <SectionPills
            activeId={activeId}
            onSelect={selectSection}
            listClassName="flex flex-col items-start gap-1"
            linkClassName="px-3 leading-7"
          />
          <ul className="flex flex-col items-start gap-1">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`${itemClassName} inline-flex items-center gap-1.5 px-3 leading-7 text-foreground/70 hover:text-foreground-strong`}
                >
                  {social.icon}
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <nav className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4 lg:hidden">
        <div className="flex items-center gap-1 rounded-full border border-foreground-strong/8 bg-background/80 p-1 text-xs shadow-raised backdrop-blur-md">
          <SectionPills
            activeId={activeId}
            onSelect={selectSection}
            listClassName="flex items-center"
            linkClassName="px-3 leading-8"
          />
          <span aria-hidden className="mx-1 h-4 w-px bg-foreground-strong/10" />
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              className="grid size-8 place-items-center rounded-full text-foreground/70 transition-colors hover:text-foreground-strong"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

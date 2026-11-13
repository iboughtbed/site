import Image from "next/image";
import type { ReactNode } from "react";

import { Chip, chipClassName, surfacePillClassName } from "@/components/chip";
import { NetworkSchoolIcon, SparkIcon } from "@/components/icons";
import { Navigation } from "@/components/navigation";
import { type Photo, PhotoCarousel } from "@/components/photo-carousel";

const linkClassName =
  "inline-flex items-center gap-1 text-foreground-strong underline underline-offset-2 decoration-foreground/40 hover:decoration-foreground-strong";

const headingClassName = "text-xs tracking-wide text-foreground/70 uppercase";

type Entry = { name: string; href?: string; date: string; description: ReactNode };

const work: Entry[] = [
  {
    name: "apex studio",
    date: "2025-now",
    description: (
      <>
        co-founder. building <span className="text-foreground-strong">tolgau</span>, ai agents for
        businesses in kazakhstan.
      </>
    ),
  },
  {
    name: "garderob",
    date: "2024",
    description: "built the next.js web view inside their app, now used by 200k+ people.",
  },
];

const projects: Entry[] = [
  {
    name: "analog",
    href: "https://analog.now",
    date: "2025",
    description: "open source calendar with an ai agent. 1.4k github stars, in vercel's oss program.",
  },
  {
    name: "parallax",
    date: "2024",
    description: 'ai podcast generator. won "prodigy of the year" at a central asian nfactorial incubator.',
  },
  {
    name: "trpc-to-mcp",
    href: "https://github.com/iboughtbed/trpc-to-mcp",
    date: "2025",
    description: "turns trpc routers into mcp servers. listed on trpc.io/awesome.",
  },
];

const photos: Photo[] = [
  { id: "7zQQCVmSpD3A5W8wzhZ09DFQJZmKGNtfEAyCHlBr5Oz1Xe6a", alt: "building", width: 280 },
  { id: "7zQQCVmSpD3ATBOFktuSoBt7EVDnxKZUmqCWaNMbFhpyclvi", alt: "above the fog", width: 300 },
  {
    id: "7zQQCVmSpD3AtiBTcfViOCnRAbF19YcagVKhz5lWxEXUqf26",
    alt: "near golden gate bridge",
    width: 300,
  },
  { id: "7zQQCVmSpD3AtrkO0rViOCnRAbF19YcagVKhz5lWxEXUqf26", alt: "golden gate bridge", width: 300 },
  { id: "7zQQCVmSpD3AC0BsMVnerIpNtPjysEkUXlHhQfqzYOdwnM2u", alt: "outer sunset", width: 300 },
  {
    id: "7zQQCVmSpD3AhWAs1pgD5xlp7oMbKNiYgsXwad2S4ruOAR6T",
    alt: "coffee with bereket (better-auth, yc x25)",
    width: 540,
  },
  {
    id: "7zQQCVmSpD3AnhHMucGqDr0u8ZsTtSqhJIfgeURlKaMBEkCW",
    alt: "at vercel hq with rauchg",
    width: 480,
  },
  {
    id: "7zQQCVmSpD3AdVIdmU6yD8RdWQ6uSvEhlYkPbMCJItc3mUsp",
    alt: "with mark (co-founder of t3chat)",
    width: 300,
  },
  {
    id: "7zQQCVmSpD3AwZmi8VOXc1hARqTYSwCl4DxmoONjefsar85t",
    alt: "palo alto and stanford",
    width: 300,
  },
];

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={linkClassName}>
      {children}
    </a>
  );
}

function EntryList({ id, title, entries }: { id: string; title: string; entries: Entry[] }) {
  return (
    <section id={id} className="flex scroll-mt-32 flex-col gap-6">
      <h2 className={headingClassName}>{title}</h2>
      {entries.map((entry) => (
        <article key={entry.name} className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            {entry.href ? (
              <ExternalLink href={entry.href}>{entry.name}</ExternalLink>
            ) : (
              <h3 className="text-foreground-strong">{entry.name}</h3>
            )}
            <p className="shrink-0 text-xs text-foreground/70 tabular-nums">{entry.date}</p>
          </div>
          <p className="leading-6">{entry.description}</p>
        </article>
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 justify-center px-8 py-24 font-medium md:px-0 md:py-32">
      <div aria-hidden className="golden-gate pointer-events-none fixed right-0 bottom-0 -z-10 hidden lg:block" />
      <Navigation />
      <main className="flex w-full flex-col gap-20 md:w-md">
        <section id="about" className="flex scroll-mt-32 flex-col gap-6">
          <header className="mb-2 flex items-center gap-3">
            <Image
              src="/sanzhar.jpg"
              alt="sanzhar"
              width={40}
              height={40}
              priority
              className="size-10 rounded-full object-cover"
            />
            <h1 className="text-base text-foreground-strong">sanzhar zhangaliyev</h1>
          </header>
          <p className="leading-7">
            my name is{" "}
            <span className="cursor-help text-foreground-strong" title="/sɑːn-ʒɑːr/">
              sanzhar
            </span>
            . i am a{" "}
            <Chip tone="sky">
              <SparkIcon />
              founder
            </Chip>
            . i am still figuring out life. i also code, design, and make art.
          </p>
          <p className="leading-7">
            in 2025 summer i made my first trip abroad to{" "}
            <a href="#sf" className={chipClassName("bridge", "hover:brightness-110")}>
              San Francisco
            </a>
            , met lots of founders and incredible people; visited a lot of places in the city and
            outside of it like Palo Alto and Stanford.
          </p>
          <p className="leading-7">
            now based in Astana, Kazakhstan and{" "}
            <span className="whitespace-nowrap">
              part of{" "}
              <span
                title="network school"
                className={`${surfacePillClassName} px-2.5 py-0.5 text-foreground-strong [&>svg]:mr-1.5`}
              >
                <NetworkSchoolIcon />
                ns
              </span>
              .
            </span>
          </p>
        </section>

        <EntryList id="work" title="work" entries={work} />
        <EntryList id="projects" title="projects" entries={projects} />

        <section id="sf" className="flex scroll-mt-32 flex-col gap-6">
          <PhotoCarousel
            heading={<h2 className={headingClassName}>san francisco, 2025</h2>}
            photos={photos}
          />
        </section>
      </main>
    </div>
  );
}

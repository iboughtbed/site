import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const images = [
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3A5W8wzhZ09DFQJZmKGNtfEAyCHlBr5Oz1Xe6a",
      "building",
      280,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3ATBOFktuSoBt7EVDnxKZUmqCWaNMbFhpyclvi",
      "above the fog",
      300,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AtiBTcfViOCnRAbF19YcagVKhz5lWxEXUqf26",
      "near golden gate bridge",
      300,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AtrkO0rViOCnRAbF19YcagVKhz5lWxEXUqf26",
      "golden gate bridge",
      300,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AC0BsMVnerIpNtPjysEkUXlHhQfqzYOdwnM2u",
      "outer sunset",
      300,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AhWAs1pgD5xlp7oMbKNiYgsXwad2S4ruOAR6T",
      "coffee with bereket (better-auth, yc x25)",
      540,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AnhHMucGqDr0u8ZsTtSqhJIfgeURlKaMBEkCW",
      "at vercel hq with rauchg",
      480,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AdVIdmU6yD8RdWQ6uSvEhlYkPbMCJItc3mUsp",
      "with mark (co-founder of t3chat)",
      300,
    ],
    [
      "https://l54l40586t.ufs.sh/f/7zQQCVmSpD3AwZmi8VOXc1hARqTYSwCl4DxmoONjefsar85t",
      "palo alto and stanford",
      300,
    ],
  ] as [string, string, number | undefined][];

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 font-mono flex flex-col p-8 pb-0 items-center justify-center gap-8">
        <div className="flex flex-col gap-6 w-full md:w-md text-left">
          <div className="flex items-center md:justify-center gap-2 font-medium text-xs md:text-sm">
            <Link
              href="/"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              home
            </Link>
            {" / "}
            <Link
              href="/projects"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              projects
            </Link>
            {" / "}
            <Link
              href="/work"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              work
            </Link>
            {" / "}
            <Link
              href="/sf"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              sf
            </Link>
            {" / "}
            <a
              href="https://x.com/iboughtbed"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              twitter
            </a>
            {" / "}
            <a
              href="https://github.com/iboughtbed"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              github
            </a>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-8 pb-8 mb-20 scrollbar-hide w-full text-left flex flex-nowrap gap-4">
        {images.map(([src, alt, width], index) => (
          <div
            key={index}
            className="min-h-[448px] h-full relative shrink-0"
            style={{
              width: width ? width : 192,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 90vw, 20vw"
              loading={index < 5 ? "eager" : undefined}
              className="relative object-cover rounded-lg"
              quality={75}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

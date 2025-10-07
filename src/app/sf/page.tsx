import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const images = [
    ["/san_francisco_1.webp", "building", 280],
    ["/san_francisco_3.webp", "above the fog", 300],
    ["/san_francisco_4.webp", "near golden gate bridge", 300],
    ["/san_francisco_5.webp", "golden gate bridge", 300],
    ["/san_francisco_2.webp", "outer sunset", 300],
    ["/san_francisco_7.webp", "coffee with bereket (better-auth, yc x25)", 540],
    ["/san_francisco_6.webp", "at vercel hq with rauchg", 480],
    ["/san_francisco_8.webp", "with mark (co-founder of t3chat)", 300],
    ["/palo_alto_stanford.webp", "palo alto and stanford", 300],
  ] as [string, string, number | undefined][];

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 font-mono flex flex-col p-8 pb-0 items-center justify-center gap-8">
        <div className="flex flex-col gap-6 w-full md:w-[28rem] text-left">
          <div className="flex items-center justify-center gap-2 font-medium text-xs md:text-sm">
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
              rel="noreferrer"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              twitter
            </a>
            {" / "}
            <a
              href="https://github.com/iboughtbed"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              github
            </a>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto px-8 pb-8 scrollbar-hide w-full text-left flex flex-nowrap gap-4">
        {images.map(([src, alt, width], index) => (
          <div
            key={index}
            className="min-h-[28rem] h-full relative shrink-0"
            style={{
              width: width ? width : 192,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="relative object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </main>
  );
}

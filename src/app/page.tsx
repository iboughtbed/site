import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="w-full flex-1 font-mono flex p-8 items-center justify-center gap-8">
        <div className="flex flex-col gap-6 w-full md:w-[28rem] text-left">
          <div className="flex items-center gap-2 font-medium text-xs md:text-sm">
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
          <p className="font-medium ">
            my name is{" "}
            <span
              className="underline underline-offset-2 cursor-help"
              title="/sɑːn-ʒɑːr/"
            >
              sanzhar
            </span>
            . i own a computer. i am still figuring out life. i also code,
            design, and make art.
          </p>
          <p className="font-medium">
            in 2025 summer i made my first trip abroad to{" "}
            <Link
              href="/sf"
              className="underline underline-offset-2 whitespace-nowrap"
            >
              San Francisco
            </Link>
            , met lots of founders and incredible people; visited a lot of
            places in the city and outside of it like Palo Alto and Stanford.
          </p>
        </div>
      </div>
    </main>
  );
}

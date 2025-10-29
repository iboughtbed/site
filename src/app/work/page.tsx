import Link from "next/link";

export default function Page() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 font-mono flex flex-col p-8 items-center justify-center gap-8">
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
        </div>

        <div className="flex flex-col gap-6 w-full md:w-[28rem] text-left">
          <div className="flex flex-col gap-6 font-medium">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <a
                  href="https://www.linkedin.com/company/thefashionpeople"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 underline underline-offset-2"
                >
                  the fashion people
                </a>
                <p>aug-sep, 2024</p>
              </div>
              <p className="text-foreground/80">
                developed a web view integration with Next.js for the mobile
                app, now used by <span className="text-foreground">200k+</span>{" "}
                users; directly worked with the CTO, Daulet, who was my mentor
                at a startup incubator. they recently raised{" "}
                <span className="text-foreground">$3.2M</span> seed.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 underline underline-offset-2">
                  art projects
                </p>
                <p>2024-2025</p>
              </div>
              <p className="text-foreground/80">
                made short films, mixed media, and collaborated with my friend
                to film short edits,{" "}
                <span className="text-foreground">130k+ views on reels</span>;
                have filmed North Kazakhstan, Almaty, and my hometown Uralsk in
                West Kazakhstan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

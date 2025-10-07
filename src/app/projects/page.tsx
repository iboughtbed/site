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

        <div className="flex flex-col gap-6 w-full md:w-[28rem] text-left">
          <div className="flex flex-col gap-6 font-medium">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <a
                  href="https://analog.now"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 underline underline-offset-2"
                >
                  analog
                </a>
                <p>2025</p>
              </div>
              <p className="text-foreground/80">
                open source agentic calendar to help you make the most of your
                time; accepted to vercel open source program receiving{" "}
                <span className="text-foreground">$3,600</span> vercel credits
                and <span className="text-foreground">~$14,000</span> tools
                credits. <span className="text-foreground">1,4k</span> stars on
                github.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <a
                  href="https://prllxhq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 underline underline-offset-2"
                >
                  parallax
                </a>
                <p>2024</p>
              </div>
              <p className="text-foreground/80">
                ai powered platform for podcast generation; received{" "}
                <span className="text-foreground">"prodigy of the year"</span>{" "}
                award at an international startup incubator in central asia.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <a
                  href="https://nis-insights.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 underline underline-offset-2"
                >
                  nis insights
                </a>
                <p>2023</p>
              </div>
              <p className="text-foreground/80">
                a website for our school magazine club; design is an inspiration
                and an experiment i made when i was 15.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

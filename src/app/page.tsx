import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="w-full flex-1 font-mono flex p-8 items-center justify-center">
        <div className="flex flex-col gap-6 w-[28rem] text-left">
          <div className="flex items-center justify-center gap-2 font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              home
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
          <div className="flex items-center justify-center font-medium">
            i own a computer. i am still figuring out life. <br />i like math
            and physics. i also code and design.
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

import { AnimatedName } from "@/components/animated-name";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
      <AnimatedName />

      <div className="space-y-4 leading-snug">
        <p>
          I&apos;m a full-stack software engineer and a designer. I finished{" "}
          <Link
            href="https://incubator.nfactorial.school"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-2"
          >
            nFactorial Incubator 2024
          </Link>
          .
        </p>
        <p>
          I use Next.js and React to build{" "}
          <Link href="/projects" className="underline underline-offset-2">
            open-source projects
          </Link>
          . I write{" "}
          <Link href="/blog" className="underline underline-offset-2">
            blogs
          </Link>{" "}
          about variety of themes, including coding, philosophy and I also do
          professional shit-posting
        </p>
        <p>
          I&apos;m inspired to learn new things, and to{" "}
          <Link href="/craft" className="underline underline-offset-2">
            create and design
          </Link>{" "}
          products.
        </p>
        <p>
          <Link
            href="/Sanzhar-Zhangaliyev-CV.pdf"
            className="underline underline-offset-2"
          >
            [Resume]
          </Link>{" "}
          <Link
            href="https://linkedin.com/in/sanzhar-zhangaliyev"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-2"
          >
            [Linkedin]
          </Link>
        </p>
      </div>
    </main>
  );
}

import { AnimatedName } from "@/components/animated-name";
import Link from "next/link";

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
          I&apos;m inspired to learn new things and{" "}
          <span className="">create and design</span> products.
        </p>
      </div>
    </main>
  );
}

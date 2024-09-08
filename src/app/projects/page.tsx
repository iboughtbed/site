import Link from "next/link";

import { CrypticText } from "@/components/cryptic-text";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Parallax Podcast",
      description: "A platform for generating AI podcasts",
      href: "https://prllx.vercel.app",
      external: true,
      year: "2024",
    },
    {
      title: "NIS Insights",
      description: "A magazine club with a twist",
      href: "https://nis-insights.org",
      external: true,
      year: "2024",
    },
    {
      title: "Color Palette",
      description: "The nFactorial application task for stage 2",
      href: "https://github.com/iboughtbed/color-palette",
      external: true,
      year: "2024",
    },
    {
      title: "Web Course",
      description: "A showcase website for the summer school course I taught",
      href: "https://web-course-beta.vercel.app",
      external: true,
      year: "2024",
    },
  ];

  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-32">
      <div className="mt-8 flex flex-col gap-[28px]">
        {projects.map((project, i) => (
          <Link
            key={i}
            href={project.href}
            rel={project.external ? "noopener noreferrer" : undefined}
            target={project.external ? "_blank" : undefined}
            className="relative -m-3 flex w-[calc(100%+32px)] items-center gap-3 overflow-hidden rounded-xl p-3 hover:bg-[#f3f3f3] dark:hover:bg-[#232323]"
            style={{
              opacity: 0,
              animation: `fadeIn 0.5s ease-out ${i * 0.1}s forwards`,
            }}
          >
            <CrypticText className="text-sm font-medium leading-7">
              {project.title}
            </CrypticText>
            <CrypticText className="-m-2 text-sm font-normal leading-7 text-[#6f6f6f] dark:text-[#a0a0a0] max-md:hidden">
              {project.description}
            </CrypticText>
            <div
              className="cryptic-list-line"
              style={{
                // @ts-expect-error react css properties
                "--after-delay": `${0.1 * i}s`,
                "--before-delay": `${(0.1 * i) / 2}s`,
              }}
            ></div>
            <CrypticText
              className="text-sm font-normal leading-7 text-[#707070]"
              speed={100}
            >
              {project.year}
            </CrypticText>
          </Link>
        ))}
      </div>
    </main>
  );
}

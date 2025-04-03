import Link from "next/link";

export default function Home() {
  const projects = [
    {
      name: "Parallax Podcast",
      description:
        "Parallax is an open-source AI platform solution that gives users the power to generate their own podcasts, audiobooks, and audio articles from prompts, documents, images and web search.",
      href: "https://prllxhq.com",
      dates: "2024 - Present",
    },
  ];

  return (
    <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
      <h1 className="mb-6 pt-12 font-medium">Sanzhar Zhangaliyev</h1>

      <div className="mb-6 space-y-4 leading-snug">
        <p>
          I&apos;m a full-stack software engineer and a designer from
          Kazakhstan. I&apos;m an alumni of nFactorial Incubator 2024 (Largest
          Startup Incubator in Central Asia) at 16 years old. I use Next.js and
          React to build open-source projects.
        </p>
        <p>
          I&apos;m inspired to learn new things, and to create and design
          products. I have contributed to YC & San&nbsp;Franciso startups at 16
          years old. I&apos;m currently studying at Nazarbayev Intellectual
          School in grade 11.
        </p>
        <p>
          <Link
            href="https://x.com/iboughtbed"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-2"
          >
            [X/Twitter]
          </Link>{" "}
          <Link
            href="https://github.com/iboughtbed"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-2"
          >
            [Github]
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

      {/* <hr className="border-none mb-6" /> */}

      <div className="mb-6 space-y-4 leading-snug">
        {projects.map((p, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
              <span className="text-sm font-mono">{p.dates}</span>
            </div>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

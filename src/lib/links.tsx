import type { ReactNode } from "react";

import { GitHubIcon, XIcon } from "@/components/icons";

export const sections: { id: string; label: string }[] = [
  { id: "about", label: "about me" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "sf", label: "sf" },
];

export const socials: { href: string; label: string; icon: ReactNode }[] = [
  { href: "https://x.com/iboughtbed", label: "twitter", icon: <XIcon /> },
  { href: "https://github.com/iboughtbed", label: "github", icon: <GitHubIcon /> },
];

import type { Metadata } from "next";
import { preload } from "react-dom";

import { preloadFontHref } from "@/lib/fonts";

import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanzhar.xyz"),
  title: "Sanzhar Zhangaliyev",
  description: "Software engineer and designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preload(preloadFontHref, { as: "font", type: "font/woff2", crossOrigin: "" });

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-jetbrains-mono min-h-svh bg-background flex flex-col font-mono text-sm antialiased">
        {children}
      </body>
    </html>
  );
}

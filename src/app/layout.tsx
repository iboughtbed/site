import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.variable} min-h-svh bg-background flex flex-col font-mono text-sm antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

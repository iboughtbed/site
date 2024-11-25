import "@/styles/globals.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://iboughtbed.vercel.app"),
  title: "iboughtbed",
  description: "Software engineer, designer and shitposter",
};

export const viewport: Viewport = {
  // maximumScale: 1,
  // colorScheme: []
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            {children}
            <SiteFooter />
            <div className="bottom-screen-blur"></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

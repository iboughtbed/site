import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () =>
    ["work", "projects", "sf"].map((section) => ({
      source: `/${section}`,
      destination: `/#${section}`,
      permanent: true,
    })),
  headers: async () => [
    {
      source: "/fonts/:file*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "l54l40586t.ufs.sh",
        pathname: "/f/**",
      },
    ],
    qualities: [50, 75, 100],
    formats: ["image/webp"],
  },
};

export default nextConfig;

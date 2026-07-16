import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

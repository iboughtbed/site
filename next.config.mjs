/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/projects/parallax-podcast",
        destination: "https://prllx.sanzhar.xyz",
        basePath: false,
        permanent: false,
      },
      {
        source: "/projects/nis-insights",
        destination: "https://nis-insights.org",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

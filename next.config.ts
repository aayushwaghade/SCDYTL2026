import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // Place allowedDevOrigins at the root level of config in Next.js 15+
  allowedDevOrigins: ["192.168.87.253", "192.168.87.253:3000", "localhost:3000"],
};

export default nextConfig;

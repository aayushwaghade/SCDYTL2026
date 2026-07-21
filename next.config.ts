import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress static assets using gzip and Brotli
  compress: true,

  // Image Optimization Configuration (AVIF & WebP automatic formats)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
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

  // Package import optimization for tree-shaking icon and motion libraries
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
    ],
  },

  // Allowed dev origins
  allowedDevOrigins: ["192.168.87.253", "192.168.87.253:3000", "localhost:3000"],

  // Custom long-term caching headers for static public image assets
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/speakers/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

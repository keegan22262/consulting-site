import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,

  // Small security hardening.
  poweredByHeader: false,

  // Keep output lean; avoids shipping source maps to browsers by default.
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.100"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Small security hardening.
  poweredByHeader: false,

  // Keep output lean; avoids shipping source maps to browsers by default.
  productionBrowserSourceMaps: false,
};

export default nextConfig;

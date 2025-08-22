import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" to enable proper routing
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;

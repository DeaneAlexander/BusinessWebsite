import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    preloadEntriesOnStart: false,
    serverSourceMaps: false,
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.BUILD_STATIC === "true" ? "export" : undefined,
  serverExternalPackages: ["@sanity/client", "@sanity/image-url"],
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    unoptimized: process.env.BUILD_STATIC === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    qualities: [75, 85, 95],
  },
};

export default nextConfig;

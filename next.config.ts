import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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
  // Reorganizacija Nauke (2026-10-11): CIV i lista istraživača ušli u NIO, CardioView3D LAB → 3D laboratorija.
  async redirects() {
    const moves: [string, string][] = [
      ["/nauka-istrazivanje/centar-izuzetnih-vrednosti", "/nauka-istrazivanje/nio"],
      ["/nauka-istrazivanje/lista-istrazivaca", "/nauka-istrazivanje/nio"],
      ["/nauka-istrazivanje/cardioview3d-lab", "/nauka-istrazivanje/3d-laboratorija"],
      ["/nauka-istrazivanje/cardioview3d-lab/workshop", "/nauka-istrazivanje/3d-laboratorija"],
    ];
    return moves.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `/en${from}`, destination: `/en${to}`, permanent: true },
    ]);
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

export default withNextIntl(nextConfig);

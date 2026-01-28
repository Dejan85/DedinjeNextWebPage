import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: process.env.BUILD_STATIC === "true" ? "export" : undefined,
  images: {
    unoptimized: process.env.BUILD_STATIC === "true",
  },
};

export default nextConfig;

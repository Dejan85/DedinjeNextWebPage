import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.BUILD_STATIC === "true" ? "export" : undefined,
};

export default nextConfig;

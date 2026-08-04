import type { MetadataRoute } from "next";

// Potrebno za `output: "export"` (build:static) — vidi napomenu u sitemap.ts.
export const dynamic = "force-static";

const BASE_URL = "https://www.institutdedinje.rs";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

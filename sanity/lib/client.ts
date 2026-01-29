import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // set to `true` for production
  token: process.env.SANITY_API_TOKEN,
  // Timeout after 5 seconds if server is not available
  requestTagPrefix: "sanity",
  fetch: {
    cache: "no-store",
  },
});

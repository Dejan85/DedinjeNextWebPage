import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY } from "@/sanity/lib/queries";
import type { VideoItem } from "@/sanity/types";
import { GOSTOVANJA } from "./constants";
import GostovanjaClient, { type GostovanjeItem } from "./GostovanjaClient";

async function getGostovanja(): Promise<GostovanjeItem[]> {
  try {
    const videos = await client.fetch<VideoItem[]>(VIDEOS_QUERY);
    if (videos && videos.length > 0) {
      return videos.map((v) => ({
        id: v._id,
        slug: v.slug.current,
        youtubeId: v.youtubeId,
        title: v.title,
        date: v.date || "",
        source: v.source || "",
        description: v.description || "",
        isNew: v.isNew,
      }));
    }
  } catch (error) {
    console.error("Error fetching gostovanja:", error);
  }
  return GOSTOVANJA;
}

export default async function GostovanjaPage() {
  const items = await getGostovanja();
  return <GostovanjaClient items={items} />;
}

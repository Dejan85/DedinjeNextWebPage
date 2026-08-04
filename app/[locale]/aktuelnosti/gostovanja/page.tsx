import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { VideoItem } from "@/sanity/types";
import { GOSTOVANJA } from "./constants";
import GostovanjaClient, { type GostovanjeItem } from "./GostovanjaClient";

async function getGostovanja(locale: Locale): Promise<GostovanjeItem[]> {
  try {
    const videosRaw = await client.fetch<VideoItem[]>(VIDEOS_QUERY);
    const videos = videosRaw ? localize(videosRaw, locale) : videosRaw;
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

export default async function GostovanjaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = await getGostovanja(locale as Locale);
  return <GostovanjaClient items={items} />;
}

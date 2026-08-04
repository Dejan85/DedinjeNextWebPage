import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { VIDEO_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { VideoItem } from "@/sanity/types";
import { GOSTOVANJA } from "../constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const gostovanje = await client.fetch<VideoItem | null>(VIDEO_BY_SLUG_QUERY, { slug });
    if (gostovanje) {
      return {
        title: `${gostovanje.title} | Гостовања | Институт Дедиње`,
        description: gostovanje.description,
      };
    }
  } catch {
    // fall through to local fallback
  }

  const fallback = GOSTOVANJA.find((g) => g.slug === slug);
  if (!fallback) {
    return { title: "Гостовање није пронађено | Институт Дедиње" };
  }

  return {
    title: `${fallback.title} | Гостовања | Институт Дедиње`,
    description: fallback.description,
  };
}

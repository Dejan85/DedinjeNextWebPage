import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { VIDEO_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { VideoItem } from "@/sanity/types";
import { GOSTOVANJA } from "../constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const gostovanjeRaw = await client.fetch<VideoItem | null>(VIDEO_BY_SLUG_QUERY, { slug });
    const gostovanje = gostovanjeRaw ? localize(gostovanjeRaw, locale as Locale) : gostovanjeRaw;
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

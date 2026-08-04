import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { NEWS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { News } from "@/sanity/types";
import { VESTI } from "../constants";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const vest = await client.fetch<News | null>(NEWS_BY_SLUG_QUERY, { slug });
    if (vest) {
      return {
        title: `${vest.title} | Актуелности | Институт Дедиње`,
        description: vest.excerpt,
      };
    }
  } catch {
    // fall through to local fallback
  }

  const fallback = VESTI.find((v) => v.slug === slug);
  if (!fallback) {
    return { title: "Вест није пронађена | Институт Дедиње" };
  }

  return {
    title: `${fallback.title} | Актуелности | Институт Дедиње`,
    description: fallback.excerpt,
  };
}

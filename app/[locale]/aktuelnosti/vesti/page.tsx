import { client } from "@/sanity/lib/client";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { News } from "@/sanity/types";
import { formatSrDate } from "../formatDate";
import { VESTI } from "../constants";
import { generateMetadata } from "./metadata";
import VestiClient, { type VestListItem } from "./VestiClient";

export { generateMetadata };

async function getVesti(locale: Locale): Promise<VestListItem[]> {
  try {
    const newsRaw = await client.fetch<News[]>(NEWS_QUERY);
    const news = newsRaw ? localize(newsRaw, locale) : newsRaw;
    if (news && news.length > 0) {
      return news.map((n) => ({
        id: n._id,
        slug: n.slug.current,
        title: n.title,
        date: formatSrDate(n.publishedAt, locale),
        publishedAt: n.publishedAt,
        author: n.author || "",
        category: n.category || "",
        image: urlFor(n.mainImage).width(800).height(450).url(),
        excerpt: n.excerpt || "",
      }));
    }
  } catch (error) {
    console.error("Error fetching vesti:", error);
  }
  return VESTI.map((v) => ({ ...v, publishedAt: v.date }));
}

export default async function VestiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const vesti = await getVesti(locale as Locale);

  return <VestiClient items={vesti} />;
}

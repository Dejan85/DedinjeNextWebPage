import { getLocale } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { Navigation } from "@/sanity/types";
import Header from "./Header";

async function getNavigationData(locale: Locale) {
  try {
    const raw = await client.fetch<Navigation | null>(
      NAVIGATION_QUERY,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    );
    return raw ? localize(raw, locale) : raw;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return null;
  }
}

export default async function HeaderData() {
  const locale = (await getLocale()) as Locale;
  const navigation = await getNavigationData(locale);
  return <Header menu={navigation?.mainMenu} />;
}

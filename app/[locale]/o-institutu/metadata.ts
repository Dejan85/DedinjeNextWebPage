import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { AboutPage } from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const raw = await client.fetch<AboutPage>(ABOUT_PAGE_QUERY);
    const data = raw ? localize(raw, locale as Locale) : raw;

    if (data?.seo) {
      return {
        title: data.seo.title,
        description: data.seo.description,
      };
    }
  } catch (error) {
    console.error("Error fetching about page metadata:", error);
  }

  // Fallback metadata
  return {
    title: "О институту | Институт Дедиње",
    description:
      "Национални институт за срце и крвне судове „Дедиње” је национална референтна здравствена установа са преко 65 година искуства",
  };
}

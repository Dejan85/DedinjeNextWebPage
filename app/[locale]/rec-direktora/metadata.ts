import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { DIRECTOR_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { DirectorPage } from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const raw = await client.fetch<DirectorPage>(DIRECTOR_PAGE_QUERY);
    const data = raw ? localize(raw, locale as Locale) : raw;

    if (data?.seo) {
      return {
        title: data.seo.title,
        description: data.seo.description,
      };
    }
  } catch (error) {
    console.error("Error fetching director page metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Реч директора | Институт Дедиње",
    description:
      "Упознајте се са визијом и мисијом директора Института за кардиоваскуларне болести Дедиње",
  };
}

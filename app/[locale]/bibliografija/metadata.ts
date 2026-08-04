import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { BIBLIOGRAPHY_PAGE_QUERY } from "@/sanity/lib/queries";
import type { BibliographyPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: BibliographyPage = await client.fetch(BIBLIOGRAPHY_PAGE_QUERY);

    if (data?.seo) {
      return {
        title: data.seo.title,
        description: data.seo.description,
        keywords: data.seo.keywords,
      };
    }
  } catch (error) {
    console.error("Error fetching bibliography metadata:", error);
  }

  return {
    title: "Библиографија | Институт Дедиње",
    description:
      "Преглед научних радова и публикација академика професора др Миодрага Бојића.",
    keywords:
      "библиографија, научни радови, публикације, кардиохирургија, Миодраг Бојић",
  };
}

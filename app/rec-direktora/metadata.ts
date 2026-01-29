import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { DIRECTOR_PAGE_QUERY } from "@/sanity/lib/queries";
import type { DirectorPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch<DirectorPage>(DIRECTOR_PAGE_QUERY);

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


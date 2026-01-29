import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import type { AboutPage } from "@/sanity/types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await client.fetch<AboutPage>(ABOUT_PAGE_QUERY);

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
      "Институт за кардиоваскуларне болести Дедиње је национална референтна здравствена установа са преко 65 година искуства",
  };
}

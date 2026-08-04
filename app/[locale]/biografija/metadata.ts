import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { BIOGRAPHY_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { BiographyPage } from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const raw = await client.fetch<BiographyPage>(BIOGRAPHY_PAGE_QUERY);
  const data = raw ? localize(raw, locale as Locale) : raw;

  return {
    title:
      data?.seo?.title ||
      "Биографија - Академик проф. др Милован М. Бојић | Институт Дедиње",
    description:
      data?.seo?.description ||
      "Биографија академика проф. др Милована М. Бојића, директора Института за кардиоваскуларне болести Дедиње",
    keywords: data?.seo?.keywords || [],
  };
}

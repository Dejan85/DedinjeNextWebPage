import { client } from "@/sanity/lib/client";
import { SCHOOL_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { SchoolPage } from "@/sanity/types";
import { SchoolPageTemplate } from "../_components/SchoolPageTemplate";
import { generateMetadata } from "./metadata";
import { DATA } from "./data";

export { generateMetadata };

const SLUG = "skola-vaskularnog-ultrazvuka";

export default async function SkolaVaskularnogUltrazvukaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let page: SchoolPage | null = null;

  try {
    const raw = await client.fetch<SchoolPage>(SCHOOL_PAGE_QUERY, { slug: SLUG });
    page = raw ? localize(raw, locale as Locale) : null;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const data = page ?? DATA;

  return <SchoolPageTemplate data={data} />;
}

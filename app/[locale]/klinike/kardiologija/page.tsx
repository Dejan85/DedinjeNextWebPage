import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import { client } from "@/sanity/lib/client";
import { CLINIC_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { ClinicPage } from "@/sanity/types";
import { DATA } from "./data";
import { metadata } from "./metadata";

export { metadata };

const SLUG = "kardiologija";

export default async function KardiologijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let clinic: ClinicPage | null = null;

  try {
    const raw = await client.fetch<ClinicPage>(CLINIC_PAGE_QUERY, { slug: SLUG });
    clinic = raw ? localize(raw, locale as Locale) : null;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  return <ClinicPageTemplate data={clinic ?? DATA} />;
}

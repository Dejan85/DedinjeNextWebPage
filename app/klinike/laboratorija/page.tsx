import { ClinicPageTemplate } from "../_components/ClinicPageTemplate";
import { client } from "@/sanity/lib/client";
import { CLINIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { ClinicPage } from "@/sanity/types";
import { DATA } from "./data";
import { metadata } from "./metadata";

export { metadata };

const SLUG = "laboratorija";

export default async function LaboratorijaPage() {
  let clinic: ClinicPage | null = null;

  try {
    clinic = await client.fetch<ClinicPage>(CLINIC_PAGE_QUERY, { slug: SLUG });
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  return <ClinicPageTemplate data={clinic ?? DATA} />;
}

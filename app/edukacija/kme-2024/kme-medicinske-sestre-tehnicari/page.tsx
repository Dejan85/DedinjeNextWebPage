import { PageBuilder, PageHeader } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PatientPage } from "@/sanity/types";
import { generateMetadata } from "./metadata";
import { DATA } from "./data";

export { generateMetadata };

const SLUG = "kme-medicinske-sestre-tehnicari";

export default async function KmeMedicinskeSestreTehnicariPage() {
  let page: PatientPage | null = null;

  try {
    page = await client.fetch<PatientPage>(PAGE_BY_SLUG_QUERY, { slug: SLUG });
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const data = page ?? DATA;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "KME 2024", href: "/edukacija/kme-2024" },
          { label: "КМЕ – медицинске сестре/техничари" },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />
      <PageBuilder blocks={data.pageBuilder} />
    </>
  );
}

import { PageBuilder, PageHeader } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { PatientPage } from "@/sanity/types";
import { generateMetadata } from "./metadata";
import { DATA } from "./data";

export { generateMetadata };

const SLUG = "sestrinska-edukacija-istorijat";

export default async function IstorijatSestrinskeEdukacijePage() {
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
          { label: "Едукација медицинских сестара и техничара", href: "/edukacija/sestrinska-edukacija" },
          { label: "Историјат и међународна сарадња" },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />
      <PageBuilder blocks={data.pageBuilder} />
    </>
  );
}

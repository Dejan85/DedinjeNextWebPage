import { PageBuilder, PageHeader } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { PatientPage } from "@/sanity/types";
import { metadata } from "./metadata";
import { DATA } from "./data";

export { metadata };

const SLUG = "nemedicinski-poslovi";

export default async function NemedicinskiPosloviPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let page: PatientPage | null = null;

  try {
    const raw = await client.fetch<PatientPage>(PAGE_BY_SLUG_QUERY, { slug: SLUG });
    page = raw ? localize(raw, locale as Locale) : null;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const data = page ?? DATA;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "О нама" },
          { label: "Немедицински послови" },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />
      <PageBuilder blocks={data.pageBuilder} />
    </>
  );
}

import type { Metadata } from "next";
import { PageBuilder, PageHeader } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { PatientPage } from "@/sanity/types";
import { HUB_DATA } from "./data";

const SLUG = "3d-laboratorija";

export function generateMetadata(): Metadata {
  return {
    title: "3D лабораторија | Наука и истраживање | Институт Дедиње",
    description:
      "3D лабораторија Института Дедиње — адитивне технологије, инжењеринг и развој, прототипирање и производња медицинских уређаја и модела.",
  };
}

export default async function Lab3dPage({
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

  const data = page ?? HUB_DATA;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "3D лабораторија" },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />
      <PageBuilder blocks={data.pageBuilder} />
    </>
  );
}

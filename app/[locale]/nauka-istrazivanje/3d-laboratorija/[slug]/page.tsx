import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder, PageHeader } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { PatientPage } from "@/sanity/types";
import { LAB_SLUGS, SUB_DATA, type LabSlug } from "../data";

function isLabSlug(slug: string): slug is LabSlug {
  return (LAB_SLUGS as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  return LAB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isLabSlug(slug)) return {};
  return {
    title: `${SUB_DATA[slug].title} | 3D лабораторија | Институт Дедиње`,
    description: SUB_DATA[slug].subtitle,
  };
}

export default async function Lab3dSubPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLabSlug(slug)) notFound();

  const fallback = SUB_DATA[slug];
  let page: PatientPage | null = null;

  try {
    const raw = await client.fetch<PatientPage>(PAGE_BY_SLUG_QUERY, {
      slug: `3d-laboratorija-${slug}`,
    });
    page = raw ? localize(raw, locale as Locale) : null;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const data = page ?? fallback;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Наука и истраживање", href: "/nauka-istrazivanje" },
          { label: "3D лабораторија", href: "/nauka-istrazivanje/3d-laboratorija" },
          { label: fallback.breadcrumb },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />
      <PageBuilder blocks={data.pageBuilder} />
    </>
  );
}

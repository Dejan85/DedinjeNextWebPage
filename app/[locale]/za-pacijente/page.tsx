import { PageHeader, CardGrid, type CardGridItem } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { PATIENT_LINKS_SECTION_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { PatientLinksSection } from "@/sanity/types";
import { metadata } from "./metadata";

export { metadata };

const FALLBACK_LINKS: CardGridItem[] = [
  {
    icon: "fas fa-hospital-user",
    title: "Пријем у болницу",
    description: "Информације о пријему и припреми",
    href: "/za-pacijente/prijem",
  },
  {
    icon: "fas fa-circle-question",
    title: "Честа питања",
    description: "Одговори на најчешћа питања",
    href: "/za-pacijente/cesta-pitanja",
  },
  {
    icon: "fas fa-heart-pulse",
    title: "Кардиохируршки конзилијум",
    description: "Документација и термини",
    href: "/za-pacijente/kardiohirurski-konzilijum",
  },
  {
    icon: "fas fa-stethoscope",
    title: "Васкуларни конзилијум",
    description: "Процес рада и контакт",
    href: "/za-pacijente/vaskularni-konzilijum",
  },
  {
    icon: "fas fa-clipboard-list",
    title: "Амбуланте",
    description: "Радно време и локације",
    href: "/za-pacijente/ambulante",
  },
  {
    icon: "fas fa-utensils",
    title: "План исхране",
    description: "Препоруке за исхрану",
    href: "/za-pacijente/plan-ishrane",
  },
];

export default async function ZaPacijentePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let section: PatientLinksSection | undefined;

  try {
    const raw = await client.fetch<PatientLinksSection>(PATIENT_LINKS_SECTION_QUERY);
    section = raw ? localize(raw, locale as Locale) : undefined;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const cards: CardGridItem[] =
    section?.items && section.items.length > 0
      ? section.items.map((item) => ({
          icon: item.icon,
          title: item.title,
          description: item.desc,
          href: item.href,
        }))
      : FALLBACK_LINKS;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Почетна", href: "/" }, { label: "За пацијенте" }]}
        title={section?.heading || "За пацијенте"}
        subtitle={
          section?.subheading ||
          "Брз приступ најважнијим информацијама за пацијенте Института"
        }
      />

      <CardGrid cards={cards} background="white" />
    </>
  );
}

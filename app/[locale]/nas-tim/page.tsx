import { PageHeader, Section, Container, TeamCard } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { TEAM_SECTION_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { TeamSection, TeamMember } from "@/sanity/types";
import { metadata } from "./metadata";
import styles from "./page.module.css";

export { metadata };

const FALLBACK_TEAM: TeamMember[] = [
  {
    _key: "team-member-1",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    name: "Др Марко Јовановић",
    role: "Кардиохирург",
    description:
      "Специјалиста са 20+ година искуства у комплексним кардиохируршким интервенцијама.",
    socialLinks: [],
  },
  {
    _key: "team-member-2",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    name: "Др Ана Петровић",
    role: "Кардиолог",
    description:
      "Водећи специјалиста за неинвазивну кардиолошку дијагностику и превенцију.",
    socialLinks: [],
  },
  {
    _key: "team-member-3",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    name: "Др Милан Николић",
    role: "Васкуларни хирург",
    description:
      "Експерт за хируршко лечење болести крвних судова и аортне патологије.",
    socialLinks: [],
  },
  {
    _key: "team-member-4",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    name: "Др Јелена Стојковић",
    role: "Анестезиолог",
    description:
      "Специјалиста за кардиоанестезију са богатим искуством у интензивној нези.",
    socialLinks: [],
  },
];

export default async function NasTimPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let section: TeamSection | undefined;

  try {
    const raw = await client.fetch<TeamSection>(TEAM_SECTION_QUERY);
    section = raw ? localize(raw, locale as Locale) : undefined;
  } catch (error) {
    console.error("⚠️ Sanity fetch failed:", error);
  }

  const team = section?.team && section.team.length > 0 ? section.team : FALLBACK_TEAM;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Почетна", href: "/" }, { label: "Наш тим" }]}
        title={section?.heading || "Упознајте наше стручњаке"}
        subtitle={section?.subheading || "Искусни лекари посвећени вашем здрављу"}
      />

      <Section padding="large" background="white">
        <Container>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <TeamCard
                key={member._key}
                image={
                  (member.image?.asset && "url" in member.image.asset
                    ? member.image.asset.url
                    : "") || "/images/o_nama_image.png"
                }
                name={member.name}
                role={member.role}
                description={member.description}
                socialLinks={member.socialLinks?.filter(
                  (
                    link,
                  ): link is {
                    _key: string;
                    platform: "facebook" | "linkedin" | "email";
                    url: string;
                  } =>
                    link.platform === "facebook" ||
                    link.platform === "linkedin" ||
                    link.platform === "email",
                )}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

import { notFound } from "next/navigation";
import {
  Button,
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import {
  getKardiohirurgijaUnit,
  kardiohirurgijaUnits,
  type KardiohirurgijaUnitSection,
} from "../units";
import styles from "./page.module.css";

const SECTION_ICONS: Record<string, string> = {
  "Рад на одељењу": "fas fa-hospital",
  "О амбуланти": "fas fa-stethoscope",
  "Списак процедура": "fas fa-list-check",
  "Упутства за болеснике": "fas fa-user-shield",
  "Упутство за болеснике": "fas fa-user-shield",
  "Опште информације о раду": "fas fa-circle-info",
  "Радно време": "fas fa-clock",
  "Потребна документација": "fas fa-file-medical",
  "Контакт": "fas fa-phone",
  "Шта можете очекивати на прегледу": "fas fa-clipboard-list",
  "Припрема за преглед": "fas fa-notes-medical",
};

function getSectionIcon(title: string) {
  return SECTION_ICONS[title] || "fas fa-notes-medical";
}

function RenderSection({ section }: { section: KardiohirurgijaUnitSection }) {
  const icon = getSectionIcon(section.title);

  if (section.type === "paragraph") {
    return (
      <div className={styles.sectionCard}>
        <div className={styles.sectionCardHeader}>
          <span className={styles.sectionCardIcon}>
            <i className={icon} aria-hidden />
          </span>
          <h3>{section.title}</h3>
        </div>
        <p className={styles.sectionCardText}>{section.text}</p>
      </div>
    );
  }

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionCardHeader}>
        <span className={styles.sectionCardIcon}>
          <i className={icon} aria-hidden />
        </span>
        <h3>{section.title}</h3>
      </div>
      <ul className={styles.sectionList}>
        {section.items.map((item, idx) => (
          <li key={idx}>
            <span className={styles.listBullet}>
              <i className="fas fa-check" aria-hidden />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function generateStaticParams() {
  return kardiohirurgijaUnits.map((u) => ({ slug: u.slug }));
}

export default async function KardiohirurgijaUnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getKardiohirurgijaUnit(slug);

  if (!unit) notFound();

  const firstParagraph = unit.sections.find((s) => s.type === "paragraph") as
    | Extract<KardiohirurgijaUnitSection, { type: "paragraph" }>
    | undefined;
  const restSections = unit.sections.filter((s) => s !== firstParagraph);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Клинике", href: "/klinike" },
          { label: "Кардиохирургија", href: "/klinike/kardiohirurgija" },
          { label: unit.title },
        ]}
        title={unit.title}
        subtitle={unit.heroSubtitle}
      />

      {/* Intro */}
      {firstParagraph && (
        <Section padding="medium" background="white">
          <Container>
            <div className={styles.intro}>
              <div className={styles.introIcon}>
                <i className={getSectionIcon(firstParagraph.title)} aria-hidden />
              </div>
              <div className={styles.introContent}>
                <h2>{firstParagraph.title}</h2>
                <p>{firstParagraph.text}</p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Content sections */}
      {restSections.length > 0 && (
        <Section padding="medium" background="gray">
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIconWrap}>
                <i className="fas fa-folder-open" aria-hidden />
              </span>
              <div>
                <h2>Детаљне информације</h2>
                <p>Све што треба да знате о овој организационој јединици</p>
              </div>
            </div>

            <div className={styles.contentGrid}>
              {restSections.map((section) => (
                <RenderSection key={section.title} section={section} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {unit.sections.length === 0 && (
        <Section padding="medium" background="white">
          <Container>
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <i className="fas fa-circle-info" aria-hidden />
              </div>
              <h3>Садржај у припреми</h3>
              <p>Ова страница ће бити допуњена детаљним информацијама.</p>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaContent}>
            <div className={styles.ctaIcon}>
              <i className="fas fa-phone" aria-hidden />
            </div>
            <h2>Потребне су вам додатне информације?</h2>
            <p>
              Наш тим је спреман да одговори на питања и помогне вам око
              информација и заказивања.
            </p>
            <div className={styles.ctaButtons}>
              <Button variant="primary" href="/kontakt">
                <i className="fas fa-phone" aria-hidden />
                Контактирајте нас
              </Button>
              <Button variant="outline" href="/klinike/kardiohirurgija">
                <i className="fas fa-arrow-left" aria-hidden />
                Клиника за кардиохирургију
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

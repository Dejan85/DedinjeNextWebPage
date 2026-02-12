import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Button,
  Container,
  HeroSection,
  PublicationItem,
} from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import {
  getKardiohirurgijaUnit,
  kardiohirurgijaUnits,
  type KardiohirurgijaUnitSection,
} from "../units";

function renderSection(section: KardiohirurgijaUnitSection) {
  if (section.type === "paragraph") {
    return (
      <div className="publications-list">
        <Text text={section.text} variant="body" />
      </div>
    );
  }

  return (
    <div className="publications-list">
      {section.items.map((item, idx) => (
        <PublicationItem key={item} number={idx + 1} text={item} />
      ))}
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

  return (
    <>
      <div className="clinics-page">
        <HeroSection
          img={unit.heroImage || "/images/kardiohirurgija.jpg"}
          imgAlt={unit.title}
          badge="Клиника за кардиохирургију"
          title={unit.title}
          subtitle={unit.heroSubtitle}
          showScrollIndicator={true}
        />

        <section className="bibliography-section">
          <Container>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 30,
              }}
            >
              <Button variant="outline" href="/klinike/kardiohirurgija">
                <i className="fas fa-arrow-left"></i>
                Назад на клинику
              </Button>
            </div>

            {unit.sections.length === 0 ? (
              <div className="bibliography-category">
                <div className="category-header">
                  <div className="category-icon">
                    <i className="fas fa-circle-info"></i>
                  </div>
                  <div className="category-info">
                    <Heading text="Садржај у припреми" variant="h2" />
                    <Text
                      text="Ова страница ће бити допуњена детаљним информацијама."
                      variant="body"
                      className="category-description"
                    />
                  </div>
                </div>
              </div>
            ) : (
              unit.sections.map((section) => (
                <div key={section.title} className="bibliography-category">
                  <div className="category-header">
                    <div className="category-icon">
                      <i className="fas fa-notes-medical"></i>
                    </div>
                    <div className="category-info">
                      <Heading text={section.title} variant="h2" />
                      <Text
                        text=""
                        variant="body"
                        className="category-description"
                      />
                    </div>
                  </div>
                  {renderSection(section)}
                </div>
              ))
            )}

            <div style={{ marginTop: 30, textAlign: "center" }}>
              <Link
                href="/klinike/kardiohirurgija"
                style={{ color: "var(--primary)" }}
              >
                Погледајте организациону структуру клинике
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}

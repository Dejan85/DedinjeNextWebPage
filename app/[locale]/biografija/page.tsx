import {
  HighlightItem,
  Image,
  ContentTabs,
  Button,
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { BIOGRAPHY_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { BiographyPage } from "@/sanity/types";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default async function BiografijaPage() {
  const data = await client.fetch<BiographyPage>(BIOGRAPHY_PAGE_QUERY);

  const pageHeader = data?.pageHeader || {
    title: "Биографија",
    subtitle: "Академик проф. др Милован М. Бојић",
  };

  const intro = data?.intro || {
    image: null,
    name: "Академик проф. др Милован М. Бојић",
    position: 'Директор Института за кардиоваскуларне болести "Дедиње"',
    shortBio:
      "Рођен у Колашину, где је завршио основну школу и гимназију са одличним успехом. Дипломирао, магистрирао, специјализирао и докторирао на Медицинском факултету у Београду са одличним успехом.",
    highlights: [],
  };

  const professionalPath = data?.professionalPath || {
    badge: "Каријера",
    heading: "Професионални пут",
    timeline: [],
  };

  const academicQualifications = data?.academicQualifications || {
    badge: "Образовање",
    heading: "Академска квалификација",
    qualifications: [],
    additionalInfo: [],
  };

  const fullBiography = data?.fullBiography || {
    sections: [],
    pdfDownloadUrl: "/pdf/BIOGRAFIJA-JUL-2024.pdf",
    pdfButtonText: "Преузмите комплетну биографију (PDF)",
  };

  const cta = data?.cta || {
    heading: "Погледајте и остале информације",
    buttons: [],
  };

  let imageUrl = "/images/rec-direktora.jpg";
  if (intro.image) {
    try {
      const generatedUrl = urlFor(intro.image).width(600).height(800).url();
      if (generatedUrl) imageUrl = generatedUrl;
    } catch (error) {
      console.error("Error generating image URL:", error);
    }
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Реч директора", href: "/rec-direktora" },
          { label: pageHeader.title },
        ]}
        title={pageHeader.title}
        subtitle={pageHeader.subtitle}
      />

      {/* Intro */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.introGrid}>
            <div className={styles.introImageWrap}>
              <Image
                src={imageUrl}
                alt={intro.name}
                width={600}
                height={800}
              />
            </div>
            <div className={styles.introContent}>
              <h2 className={styles.introName}>{intro.name}</h2>
              <div className={styles.positionBadge}>
                <i className="fas fa-hospital" aria-hidden />
                <span>{intro.position}</span>
              </div>
              <p className={styles.shortBio}>{intro.shortBio}</p>
              <div className={styles.highlightsGrid}>
                {intro.highlights.map((highlight) => (
                  <HighlightItem
                    key={highlight._key}
                    icon={highlight.icon}
                    title={highlight.title}
                    description={highlight.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tabs */}
      <Section padding="medium" background="gray">
        <Container>
          <ContentTabs
            defaultTab="professional-path"
            tabs={[
              {
                id: "professional-path",
                icon: "fas fa-briefcase",
                text: professionalPath.heading,
                content: (
                  <div className={styles.tabSection}>
                    <div className={styles.tabHeader}>
                      <span className={styles.tabBadge}>
                        {professionalPath.badge}
                      </span>
                      <h2>{professionalPath.heading}</h2>
                    </div>
                    <div className={styles.timeline}>
                      {professionalPath.timeline.map((item) => (
                        <div key={item._key} className={styles.timelineItem}>
                          <div className={styles.timelineMarker} />
                          <div className={styles.timelineCard}>
                            <span className={styles.timelineYear}>
                              {item.year}
                            </span>
                            <h3>{item.title}</h3>
                            <p className={styles.timelineInstitution}>
                              {item.institution}
                            </p>
                            {item.description && (
                              <p className={styles.timelineDesc}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                id: "academic-qualifications",
                icon: "fas fa-graduation-cap",
                text: academicQualifications.heading,
                content: (
                  <div className={styles.tabSection}>
                    <div className={styles.tabHeader}>
                      <span className={styles.tabBadge}>
                        {academicQualifications.badge}
                      </span>
                      <h2>{academicQualifications.heading}</h2>
                    </div>
                    <div className={styles.educationGrid}>
                      {academicQualifications.qualifications.map((qual) => (
                        <div key={qual._key} className={styles.educationCard}>
                          <div className={styles.educationIcon}>
                            <i className={qual.icon} aria-hidden />
                          </div>
                          <h3>{qual.degree}</h3>
                          <p className={styles.eduInstitution}>
                            {qual.institution}
                          </p>
                          <span className={styles.eduYear}>{qual.year}</span>
                          {qual.description && (
                            <p className={styles.eduDesc}>
                              {qual.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {academicQualifications.additionalInfo.length > 0 && (
                      <div className={styles.additionalGrid}>
                        {academicQualifications.additionalInfo.map((info) => (
                          <div key={info._key} className={styles.infoBox}>
                            <h3>{info.title}</h3>
                            <p>{info.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              },
              {
                id: "full-bio",
                icon: "fas fa-file-alt",
                text: "Комплетна биографија",
                content: (
                  <div className={styles.tabSection}>
                    <div className={styles.fullBioContent}>
                      {fullBiography.sections.map((section) => (
                        <div
                          key={section._key}
                          className={styles.bioTextBlock}
                        >
                          <h3>{section.heading}</h3>
                          {section.paragraphs.map(
                            (paragraph: string, index: number) => (
                              <p key={index}>{paragraph}</p>
                            )
                          )}
                        </div>
                      ))}
                      {fullBiography.pdfDownloadUrl && (
                        <div className={styles.pdfDownload}>
                          <Button
                            variant="download"
                            href={fullBiography.pdfDownloadUrl}
                          >
                            <i className="fas fa-file-download" aria-hidden />{" "}
                            {fullBiography.pdfButtonText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      {/* CTA */}
      {cta.buttons.length > 0 && (
        <section className={styles.ctaSection}>
          <Container>
            <div className={styles.ctaContent}>
              <h2>{cta.heading}</h2>
              <div className={styles.ctaButtons}>
                {cta.buttons.map((button) => (
                  <Button
                    key={button._key}
                    variant={
                      button.variant === "primary" ? "primary" : "outline"
                    }
                    href={button.href}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

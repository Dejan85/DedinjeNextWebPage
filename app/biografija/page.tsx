import Link from "next/link";
import { HighlightItem, Image, ContentTabs } from "@/components/shared";
import { Heading, Text, Badge } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { BIOGRAPHY_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import type { BiographyPage } from "@/sanity/types";

export default async function BiografijaPage() {
  // Fetch data from Sanity
  const data = await client.fetch<BiographyPage>(BIOGRAPHY_PAGE_QUERY);

  // Fallback data u slučaju da Sanity ne vrati podatke
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

  const imageUrl = intro.image
    ? urlFor(intro.image).width(600).height(800).url()
    : "/images/rec-direktora.jpg";

  return (
    <>
      {/* Page Header */}
      <section className="page-header-simple">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Почетна</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/rec-direktora">Реч директора</Link>
            <i className="fas fa-chevron-right"></i>
            <Text as="span" text={pageHeader.title} />
          </div>
          <Heading variant="h1" text={pageHeader.title} />
          <Text text={pageHeader.subtitle} />
        </div>
      </section>

      {/* Biography Content */}
      <section className="biography-section">
        <div className="container">
          <div className="biography-intro">
            <div className="intro-image">
              <Image
                src={imageUrl}
                alt={intro.name}
                width={600}
                height={800}
              />
            </div>
            <div className="intro-content">
              <Heading variant="h2" text={intro.name} />
              <div className="title-badge">
                <Text text={intro.position} />
              </div>
              <Text variant="body" text={intro.shortBio} />
              <div className="bio-highlights">
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

          {/* Biography Tabs */}
          <ContentTabs
            defaultTab="professional-path"
            tabs={[
              {
                id: "professional-path",
                icon: "fas fa-briefcase",
                text: professionalPath.heading,
                content: (
                  <div className="timeline-section">
                    <div className="section-header centered">
                      <Badge variant="primary" text={professionalPath.badge} />
                      <Heading variant="h2" text={professionalPath.heading} />
                    </div>

                    <div className="timeline">
                      {professionalPath.timeline.map((item) => (
                        <div key={item._key} className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="timeline-year">{item.year}</div>
                            <Heading variant="h3" text={item.title} />
                            <Text text={item.institution} />
                            <Text
                              className="timeline-description"
                              text={item.description}
                            />
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
                  <div className="education-section">
                    <div className="section-header centered">
                      <Badge
                        variant="primary"
                        text={academicQualifications.badge}
                      />
                      <Heading
                        variant="h2"
                        text={academicQualifications.heading}
                      />
                    </div>

                    <div className="education-grid">
                      {academicQualifications.qualifications.map((qual) => (
                        <div key={qual._key} className="education-card">
                          <div className="education-icon">
                            <i className={qual.icon}></i>
                          </div>
                          <Heading variant="h3" text={qual.degree} />
                          <Text
                            className="education-institution"
                            text={qual.institution}
                          />
                          <Text className="education-year" text={qual.year} />
                          <Text
                            className="education-description"
                            text={qual.description}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="additional-info">
                      {academicQualifications.additionalInfo.map((info) => (
                        <div key={info._key} className="info-box">
                          <Heading variant="h3" text={info.title} />
                          <Text text={info.content} />
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                id: "full-bio",
                icon: "fas fa-file-alt",
                text: "Комплетна биографија",
                content: (
                  <div className="full-biography-text">
                    {fullBiography.sections.map((section) => (
                      <div key={section._key} className="bio-text-block">
                        <Heading variant="h3" text={section.heading} />
                        {section.paragraphs.map((paragraph, index) => (
                          <Text key={index} text={paragraph} />
                        ))}
                      </div>
                    ))}

                    {fullBiography.pdfDownloadUrl && (
                      <div className="text-center mt-5">
                        <a
                          href={fullBiography.pdfDownloadUrl}
                          className="btn-download"
                          download
                        >
                          <i className="fas fa-file-download"></i>{" "}
                          {fullBiography.pdfButtonText}
                        </a>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-simple">
        <div className="container">
          <div className="cta-content-simple">
            <Heading variant="h2" text={cta.heading} />
            <div className="cta-buttons-simple">
              {cta.buttons.map((button) => (
                <Link
                  key={button._key}
                  href={button.href}
                  className={
                    button.variant === "primary"
                      ? "btn-primary"
                      : "btn-outline"
                  }
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


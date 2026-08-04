import {
  PublicationItem,
  StatItem,
  Button,
  Container,
  PageHeader,
} from "@/components/shared";
import { Heading, Text } from "@/components/typography";
import { client } from "@/sanity/lib/client";
import { BIBLIOGRAPHY_PAGE_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { BibliographyPage } from "@/sanity/types";
import { generateMetadata } from "./metadata";

export { generateMetadata };

// Fallback data
const fallbackData: BibliographyPage = {
  _id: "bibliographyPage",
  _type: "bibliographyPage",
  pageHeader: {
    breadcrumbs: [
      { _key: "home", label: "Почетна", href: "/" },
      { _key: "bibliography", label: "Библиографија", href: "/bibliografija" },
    ],
    title: "Библиографија",
    subtitle:
      "Преглед научних радова и публикација акад. проф. др Миодрага Бојића",
  },
  introduction: {
    heading: "Научноистраживачки допринос",
    description:
      "Академик професор др Миодраг Бојић је објавио преко 190 научних радова у међународним часописима.",
    stats: [],
  },
  categories: [],
  download: {
    heading: "Преузмите комплетну библиографију",
    description: "Сви објављени научни радови и публикације у PDF формату",
    buttonText: "Преузми комплетну библиографију (PDF)",
    fileUrl: "/pdf/АКАДЕМИК-CV-АВГУСТ-2025.pdf",
  },
  seo: {
    title: "Библиографија | Институт Дедиње",
    description: "Преглед научних радова и публикација",
    keywords: ["библиографија", "научни радови"],
  },
};

export default async function BibliografijaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let data: BibliographyPage;

  try {
    const raw = await client.fetch(BIBLIOGRAPHY_PAGE_QUERY);
    data = raw ? localize(raw, locale as Locale) : fallbackData;
  } catch (error) {
    console.error("Error fetching bibliography data:", error);
    data = fallbackData;
  }

  const { pageHeader, introduction, categories, download } = data;

  return (
    <>
      <PageHeader
        breadcrumbs={pageHeader.breadcrumbs.map((crumb) => ({
          label: crumb.label,
          href: crumb.href,
        }))}
        title={pageHeader.title}
        subtitle={pageHeader.subtitle}
      />

      {/* Bibliography Content */}
      <section className="bibliography-section">
        <Container>
          {/* Introduction Card */}
          <div className="intro-card">
            <Heading text={introduction.heading} variant="h2" />
            <Text
              text={introduction.description}
              variant="body"
              className="intro-description"
            />
            <div className="stats-grid">
              {introduction.stats.map((stat) => (
                <StatItem
                  key={stat._key}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>

          {/* Publication Categories */}
          {categories.map((category) => (
            <div key={category._key} className="bibliography-category">
              <div className="category-header">
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <div className="category-info">
                  <Heading text={category.title} variant="h2" />
                  <Text
                    text={category.description}
                    variant="body"
                    className="category-description"
                  />
                </div>
              </div>
              <div className="publications-list">
                {category.collapsible ? (
                  <div className="show-more-wrapper">
                    <details
                      className="show-more-details"
                      open={category.initiallyExpanded}
                    >
                      <summary className="show-more-btn">
                        <i className="fas fa-chevron-down"></i>
                        Прикажи све радове ({category.publications.length})
                      </summary>
                      <div className="additional-pubs">
                        {category.publications.map((pub) => (
                          <PublicationItem
                            key={pub._key}
                            number={pub.number}
                            text={pub.text}
                          />
                        ))}
                        <summary className="show-more-btn show-less-btn">
                          <i className="fas fa-chevron-up"></i>
                          Сакриј радове
                        </summary>
                      </div>
                    </details>
                  </div>
                ) : (
                  <>
                    {category.publications.map((pub) => (
                      <PublicationItem
                        key={pub._key}
                        number={pub.number}
                        text={pub.text}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Download Button */}
          <div className="download-section">
            <Button variant="download-full" href={download.fileUrl}>
              <i className="fas fa-file-pdf"></i>
              {download.buttonText}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

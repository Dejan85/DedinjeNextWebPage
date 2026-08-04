import {
  Container,
  Image,
  PageHeader,
  ProgramCardGrid,
  Section,
  StatItem,
} from "@/components/shared";
import type { SchoolPage } from "@/sanity/types";
import styles from "./SchoolPageTemplate.module.css";

export function SchoolPageTemplate({ data }: { data: SchoolPage }) {
  const hasProgramLinks = data.programNav?.items.some((item) => item.href);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Едукација", href: "/edukacija" },
          { label: "Едукативни програми", href: "/edukacija/programi" },
          { label: data.breadcrumbLabel },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />

      {data.intro && (
        <Section padding="medium" background="gray">
          <Container>
            <div className={styles.introGrid}>
              <div className={styles.introText}>
                {data.intro.heading && <h2>{data.intro.heading}</h2>}
                {data.intro.paragraphs?.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
              {data.intro.images && data.intro.images.length > 0 && (
                <div className={styles.introImages}>
                  {data.intro.images.map((src, idx) => (
                    <div key={idx} className={styles.imageWrap}>
                      <Image src={src} alt={data.title} width={600} height={600} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {data.stats && data.stats.length > 0 && (
        <Section padding="small" background="white">
          <Container>
            <div className={styles.statsRow}>
              {data.stats.map((stat, idx) => (
                <StatItem key={idx} value={stat.value} label={stat.label} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {data.programNav && (
        <Section padding="medium" background={data.intro ? "gray" : "white"}>
          <Container>
            {data.programNav.heading && (
              <h2 className={styles.sectionTitle}>{data.programNav.heading}</h2>
            )}
            {data.programNav.subtitle && (
              <p className={styles.sectionSubtitle}>{data.programNav.subtitle}</p>
            )}
            {hasProgramLinks ? (
              <ProgramCardGrid
                className={styles.kurseviGrid}
                items={data.programNav.items.map((item, idx) => ({
                  id: `${idx}`,
                  title: item.title || "",
                  icon: item.icon || "",
                  href: item.href || "#",
                  buttonText: item.buttonText,
                }))}
              />
            ) : (
              <div className={styles.programGrid}>
                {data.programNav.items.map((item, idx) => (
                  <div key={idx} className={styles.programCard}>
                    {item.icon && (
                      <div className={styles.programCardIcon}>
                        <i className={item.icon} aria-hidden />
                      </div>
                    )}
                    <h3>{item.title}</h3>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      {data.courseSections.map((course, idx) => {
        const background = idx % 2 === 0 ? "white" : "gray";
        return (
          <Section key={idx} padding="medium" background={background}>
            <Container>
              <div id={course.anchorId} className={styles.courseSection}>
                <div className={styles.courseHeader}>
                  {course.icon && (
                    <span className={styles.courseIcon}>
                      <i className={course.icon} aria-hidden />
                    </span>
                  )}
                  <h2>{course.heading}</h2>
                </div>

                {course.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className={styles.introText}>
                    {p}
                  </p>
                ))}

                {course.details && course.details.length > 0 && (
                  <div className={styles.courseDetails}>
                    {course.details.map((detail, dIdx) => (
                      <div key={dIdx} className={styles.courseDetail}>
                        {detail.icon && (
                          <div className={styles.detailIcon}>
                            <i className={detail.icon} aria-hidden />
                          </div>
                        )}
                        <div>
                          <h4>{detail.title}</h4>
                          <p>{detail.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {course.metaLines && course.metaLines.length > 0 && (
                  <div className={styles.courseCardMeta}>
                    {course.metaLines.map((meta, mIdx) => (
                      <span key={mIdx}>
                        {meta.icon && <i className={meta.icon} aria-hidden />} {meta.text}
                      </span>
                    ))}
                  </div>
                )}

                {course.highlight && (
                  <div className={styles.courseHighlight}>
                    <i className="fas fa-globe" aria-hidden />
                    <p>{course.highlight}</p>
                  </div>
                )}

                {course.contactNote && (
                  <p className={styles.contactNote}>{course.contactNote}</p>
                )}

                {course.image && (
                  <div className={styles.singleImage}>
                    <Image src={course.image} alt={course.heading} width={600} height={443} />
                  </div>
                )}
              </div>
            </Container>
          </Section>
        );
      })}

      {data.requirementsSection && (
        <Section
          padding="medium"
          background={data.courseSections.length % 2 === 0 ? "white" : "gray"}
        >
          <Container>
            {data.requirementsSection.heading && (
              <h2 className={styles.sectionTitle}>{data.requirementsSection.heading}</h2>
            )}
            {data.requirementsSection.subtitle && (
              <p className={styles.sectionSubtitle}>{data.requirementsSection.subtitle}</p>
            )}
            {data.requirementsSection.variant === "stats" ? (
              <div className={styles.requirementsRow}>
                {data.requirementsSection.items.map((item, idx) => (
                  <div key={idx} className={styles.requirementStat}>
                    <div className={styles.requirementNumber}>{item.value}</div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.requirementsGrid}>
                {data.requirementsSection.items.map((item, idx) => (
                  <div key={idx} className={styles.requirementCard}>
                    {item.icon && (
                      <div className={styles.requirementIcon}>
                        <i className={item.icon} aria-hidden />
                      </div>
                    )}
                    {item.title && <h4>{item.title}</h4>}
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </Section>
      )}

      {data.examSection && (
        <Section padding="medium" background="gray">
          <Container>
            {data.examSection.heading && (
              <h2 className={styles.sectionTitle}>{data.examSection.heading}</h2>
            )}
            <div className={styles.examGrid}>
              {data.examSection.cards.map((card, idx) => (
                <div key={idx} className={styles.examCard}>
                  {card.icon && (
                    <div className={styles.examCardIcon}>
                      <i className={card.icon} aria-hidden />
                    </div>
                  )}
                  {card.heading && <h3>{card.heading}</h3>}
                  {card.intro && <p>{card.intro}</p>}
                  {card.listItems && card.listItems.length > 0 && (
                    <ul className={styles.examList}>
                      {card.listItems.map((item, liIdx) => (
                        <li key={liIdx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {card.outro && <p>{card.outro}</p>}
                  {card.badge && (
                    <div className={styles.accreditationBadge}>
                      <i className="fas fa-award" aria-hidden />
                      <span>{card.badge}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {data.team && (
        <Section padding="medium" background="white">
          <Container>
            {data.team.heading && (
              <h2 className={styles.sectionTitle}>{data.team.heading}</h2>
            )}
            {data.team.subtitle && (
              <p className={styles.sectionSubtitle}>{data.team.subtitle}</p>
            )}
            <div className={styles.teamGrid}>
              {data.team.members.map((person, idx) => (
                <div key={idx} className={styles.teamMember}>
                  <div className={styles.teamMemberIcon}>
                    <i className="fas fa-user-md" aria-hidden />
                  </div>
                  <div className={styles.teamMemberInfo}>
                    <h4>{person.name}</h4>
                    {person.role && <span>{person.role}</span>}
                  </div>
                </div>
              ))}
            </div>

            {data.techTeam && (
              <>
                {data.techTeam.heading && (
                  <h3 className={styles.sectionTitle}>{data.techTeam.heading}</h3>
                )}
                <div className={styles.techGrid}>
                  {data.techTeam.members.map((name, idx) => (
                    <div key={idx} className={styles.techMember}>
                      <i className="fas fa-user-nurse" aria-hidden />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
                {data.techTeam.footnote && (
                  <p className={styles.footnote}>{data.techTeam.footnote}</p>
                )}
              </>
            )}
          </Container>
        </Section>
      )}
    </>
  );
}

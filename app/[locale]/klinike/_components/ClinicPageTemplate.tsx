"use client";

import {
  Container,
  PageHeader,
  Section,
} from "@/components/shared";
import styles from "./ClinicPageTemplate.module.css";

export interface ClinicArea {
  icon: string;
  title: string;
  desc: string;
}

export interface ClinicStaffMember {
  name: string;
  role?: string;
}

export interface ClinicStaffGroup {
  heading?: string;
  names?: string[];
  members?: ClinicStaffMember[];
}

export interface ClinicStat {
  value: string;
  label: string;
  icon?: string;
}

export interface ClinicHighlight {
  icon?: string;
  text: string;
}

export interface ClinicPageData {
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  introIcon: string;
  introTitle: string;
  introText: string;
  introParagraphs?: string[];
  organizationalStructure?: string;
  areas: ClinicArea[];
  areasTitle?: string;
  areasSubtitle?: string;
  areasIcon?: string;
  extraBanner?: { value: string; label: string; desc: string };
  stats?: ClinicStat[];
  highlights?: ClinicHighlight[];
  proceduresList?: { title: string; items: string[] };
  staffList?: { title: string; groups: ClinicStaffGroup[] };
  patientInstructions?: { title: string; paragraphs: string[] };
}

export function ClinicPageTemplate({ data }: { data: ClinicPageData }) {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Клинике", href: "/klinike" },
          { label: data.breadcrumbLabel },
        ]}
        title={data.title}
        subtitle={data.subtitle}
      />

      <Section padding="medium" background="white">
        <Container>
          <div className={styles.intro}>
            <div className={styles.introIcon}>
              <i className={data.introIcon} aria-hidden />
            </div>
            <div className={styles.introContent}>
              <h2>{data.introTitle}</h2>
              <p>{data.introText}</p>
              {data.introParagraphs?.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              {data.organizationalStructure && (
                <>
                  <h3 className={styles.subheading}>Организациона структура</h3>
                  <p>{data.organizationalStructure}</p>
                </>
              )}
            </div>
          </div>

          {data.stats && data.stats.length > 0 && (
            <div className={styles.statsGrid}>
              {data.stats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <div className={styles.statIcon}>
                    <i className={stat.icon} aria-hidden />
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {data.extraBanner && (
            <div className={styles.banner}>
              <div className={styles.bannerValue}>{data.extraBanner.value}</div>
              <div>
                <strong>{data.extraBanner.label}</strong>
                <p>{data.extraBanner.desc}</p>
              </div>
            </div>
          )}

          {data.proceduresList && (
            <div className={styles.proceduresBlock}>
              <h3>{data.proceduresList.title}</h3>
              <ul className={styles.proceduresList}>
                {data.proceduresList.items.map((item, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {data.highlights && data.highlights.length > 0 && (
        <section className={styles.highlightSection}>
          <Container>
            <div className={styles.highlightHeader}>
              <div className={styles.highlightHeaderIcon}>
                <i className="fas fa-trophy" aria-hidden />
              </div>
              <h2>Најзначајнији резултати</h2>
            </div>
            <div className={styles.highlightGrid}>
              {data.highlights.map((item, idx) => (
                <div key={idx} className={styles.highlightCard}>
                  <span className={styles.highlightCardIcon}>
                    <i className={item.icon} aria-hidden />
                  </span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.staffList && (
        <Section padding="medium" background="gray">
          <Container>
            <div className={styles.staffBlock}>
              <h3>{data.staffList.title}</h3>
              <div className={styles.staffGroups}>
                {data.staffList.groups.map((group, idx) => (
                  <div key={idx} className={styles.staffGroup}>
                    {group.heading && <h4>{group.heading}</h4>}
                    {group.members && group.members.length > 0 ? (
                      <ul>
                        {group.members.map((member, memberIdx) => (
                          <li key={memberIdx}>
                            <strong>{member.name}</strong>
                            {member.role && <span> — {member.role}</span>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul>
                        {group.names?.map((name, nameIdx) => (
                          <li key={nameIdx}>{name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      <Section padding="medium" background={data.staffList ? "white" : "gray"}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className={data.areasIcon || "fas fa-crosshairs"} aria-hidden />
            </span>
            <div>
              <h2>{data.areasTitle || "Кључне области рада"}</h2>
              <p>{data.areasSubtitle || "Од дијагностике до потпуног опоравка"}</p>
            </div>
          </div>

          <div className={styles.areasGrid}>
            {data.areas.map((item, idx) => (
              <div key={idx} className={styles.areaCard}>
                <div className={styles.areaCardIcon}>
                  <i className={item.icon} aria-hidden />
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {data.patientInstructions && (
        <Section padding="medium" background={data.staffList ? "gray" : "white"}>
          <Container>
            <div className={styles.instructionsBlock}>
              <h3>{data.patientInstructions.title}</h3>
              {data.patientInstructions.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

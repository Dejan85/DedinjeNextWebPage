"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { transliterate } from "@/lib/transliteration/cyrillicToLatin";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Container,
  Image,
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

export interface ProcedureDetail {
  title: string;
  desc: string;
  image?: string;
  photos?: { src: string; caption?: string }[];
}

// Lista procedura / novih tehnologija. Sa `popup: true` svaka stavka sa opisom je
// dugme koje otvara prozor sa opisom; inače se opisi prikazuju direktno na stranici.
export interface ProceduresListData {
  title: string;
  items: string[];
  detailedItems?: ProcedureDetail[];
  popup?: boolean;
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
  proceduresList?: ProceduresListData;
  technologies?: ProceduresListData;
  staffList?: { title: string; groups: ClinicStaffGroup[] };
  sections?: { icon?: string; title: string; paragraphs: string[]; image?: string; images?: string[] }[];
  patientInstructions?: { title: string; paragraphs: string[] };
}

// Opis procedure: redovi koji počinju sa "• " prikazuju se kao lista, redovi sa "## " kao
// podnaslov, redovi oblika "![potpis](/putanja/slika.jpg)" kao slika sa potpisom, ostali kao pasus.
export function ProcedureDesc({ text }: { text: string }) {
  const blocks: { kind: "p" | "ul" | "h" | "img"; lines: string[] }[] = [];
  for (const line of text.split("\n").filter(Boolean)) {
    const last = blocks[blocks.length - 1];
    const img = /^!\[(.*)\]\((.+)\)$/.exec(line);
    if (img) {
      blocks.push({ kind: "img", lines: [img[1], img[2]] });
    } else if (line.startsWith("• ")) {
      if (last?.kind === "ul") last.lines.push(line.slice(2));
      else blocks.push({ kind: "ul", lines: [line.slice(2)] });
    } else if (line.startsWith("## ")) {
      blocks.push({ kind: "h", lines: [line.slice(3)] });
    } else {
      blocks.push({ kind: "p", lines: [line] });
    }
  }
  return (
    <>
      {blocks.map((b, i) =>
        b.kind === "img" ? (
          <figure key={i} className={styles.figure}>
            <Image
              src={b.lines[1]}
              alt={b.lines[0]}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 900px"
              className={styles.photo}
            />
            {b.lines[0] && <figcaption>{b.lines[0]}</figcaption>}
          </figure>
        ) : b.kind === "ul" ? (
          <ul key={i} className={styles.procedureBullets}>
            {b.lines.map((l, li) => (
              <li key={li}>{l}</li>
            ))}
          </ul>
        ) : b.kind === "h" ? (
          <h5 key={i} className={styles.procedureSubheading}>
            {b.lines[0]}
          </h5>
        ) : (
          <p key={i}>{b.lines[0]}</p>
        ),
      )}
    </>
  );
}

function ProcedureMedia({ item }: { item: ProcedureDetail }) {
  return (
    <>
      {item.photos && item.photos.length > 0 && (
        <div className={styles.photoRow}>
          {item.photos.map((photo, pIdx) => (
            <figure key={pIdx} className={styles.figure}>
              <Image
                src={photo.src}
                alt={photo.caption || item.title}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 900px"
                className={styles.photo}
              />
              {photo.caption && <figcaption>{photo.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {item.image && (
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 900px"
          className={styles.photo}
        />
      )}
    </>
  );
}

function ProceduresBlock({ list }: { list: ProceduresListData }) {
  const t = useTranslations("ClinicPage");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const detailed = list.detailedItems && list.detailedItems.length > 0 ? list.detailedItems : null;
  const open = detailed && openIdx !== null ? detailed[openIdx] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.proceduresBlock}>
      <h3>{list.title}</h3>
      {detailed && list.popup ? (
        <ul className={styles.procedureButtons}>
          {detailed.map((item, idx) => (
            <li key={idx}>
              <button type="button" onClick={() => setOpenIdx(idx)} aria-haspopup="dialog">
                <span>{item.title}</span>
                <i className="fas fa-circle-info" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : detailed ? (
        <div className={styles.procedureDetails}>
          {detailed.map((item, idx) => (
            <div key={idx} className={styles.procedureDetail}>
              <h4>{item.title}</h4>
              <ProcedureDesc text={item.desc} />
              <ProcedureMedia item={item} />
            </div>
          ))}
        </div>
      ) : (
        <ul className={styles.proceduresList}>
          {list.items.map((item, idx) => (
            <li key={idx}>
              <i className="fas fa-check" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div className={styles.modalBackdrop} onClick={() => setOpenIdx(null)}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setOpenIdx(null)}
              aria-label={t("close")}
            >
              <i className="fas fa-xmark" aria-hidden />
            </button>
            <h4>{open.title}</h4>
            <ProcedureDesc text={open.desc} />
            <ProcedureMedia item={open} />
          </div>
        </div>
      )}
    </div>
  );
}

export function ClinicPageTemplate({ data }: { data: ClinicPageData }) {
  const t = useTranslations("ClinicPage");
  const locale = useLocale();
  // imena lekara nisu lokalizovana u Sanity-ju — na /en idu u latinici
  const personName = (n: string) => (locale === "en" ? transliterate(n) : n);
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop();
  const instructionsHref = `/za-pacijente/uputstva${slug ? `#${slug}` : ""}`;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: t("home"), href: "/" },
          { label: t("clinics"), href: "/klinike" },
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
                  <h3 className={styles.subheading}>{t("orgStructure")}</h3>
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

          {data.proceduresList && <ProceduresBlock list={data.proceduresList} />}
          {data.technologies && <ProceduresBlock list={data.technologies} />}
        </Container>
      </Section>

      {data.highlights && data.highlights.length > 0 && (
        <section className={styles.highlightSection}>
          <Container>
            <div className={styles.highlightHeader}>
              <div className={styles.highlightHeaderIcon}>
                <i className="fas fa-trophy" aria-hidden />
              </div>
              <h2>{t("results")}</h2>
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
        <Section padding="small" className={styles.textBlock} background="gray">
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
                            <strong>{personName(member.name)}</strong>
                            {member.role && <span> — {member.role}</span>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul>
                        {group.names?.map((name, nameIdx) => (
                          <li key={nameIdx}>{personName(name)}</li>
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

      {data.areas.length > 0 && (
      <Section padding="medium" background={data.staffList ? "white" : "gray"}>
        <Container>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIconWrap}>
              <i className={data.areasIcon || "fas fa-crosshairs"} aria-hidden />
            </span>
            <div>
              <h2>{data.areasTitle || t("areasTitle")}</h2>
              <p>{data.areasSubtitle || t("areasSubtitle")}</p>
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
      )}

      {data.sections?.map((section, idx) => (
        <Section
          key={idx}
          padding="small"
          className={styles.textBlock}
          background={idx % 2 === 0 ? "gray" : "white"}
        >
          <Container>
            <div className={styles.textSection}>
              <h3>
                {section.icon && <i className={section.icon} aria-hidden />}
                {section.title}
              </h3>
              {section.paragraphs.map((para, pIdx) => (
                <ProcedureDesc key={pIdx} text={para} />
              ))}
              {(() => {
                const photos = section.images?.length ? section.images : section.image ? [section.image] : [];
                return photos.length > 0 ? (
                  <div className={styles.gallery}>
                    {photos.map((src, pIdx) => (
                      <Image
                        key={pIdx}
                        src={src}
                        alt={section.title}
                        width={900}
                        height={720}
                        sizes="(max-width: 768px) 100vw, 480px"
                        className={styles.galleryPhoto}
                      />
                    ))}
                  </div>
                ) : null;
              })()}
            </div>
          </Container>
        </Section>
      ))}

      {data.patientInstructions && (
        <Section padding="small" className={styles.textBlock} background={data.staffList ? "gray" : "white"}>
          <Container>
            <div className={styles.instructionsBlock}>
              <h3>{data.patientInstructions.title}</h3>
              {data.patientInstructions.paragraphs.map((para, idx) => (
                <ProcedureDesc key={idx} text={para} />
              ))}
              <Link href={instructionsHref} className={styles.instructionsLink}>
                <i className="fas fa-file-medical" aria-hidden />
                {t("allInstructions")}
              </Link>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

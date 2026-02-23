"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import { GOSTOVANJA } from "../constants";
import styles from "./page.module.css";

function YouTubeThumbnail({ youtubeId }: { youtubeId: string }) {
  return (
    <img
      src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
      alt=""
      className={styles.thumbnail}
      loading="lazy"
    />
  );
}

export default function GostovanjePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [playing, setPlaying] = useState(false);
  const gostovanje = GOSTOVANJA.find((g) => g.slug === slug);

  if (!gostovanje) {
    notFound();
  }

  const currentIndex = GOSTOVANJA.findIndex((g) => g.slug === slug);
  const prev = currentIndex > 0 ? GOSTOVANJA[currentIndex - 1] : null;
  const next = currentIndex < GOSTOVANJA.length - 1 ? GOSTOVANJA[currentIndex + 1] : null;

  const related = GOSTOVANJA.filter((g) => g.id !== gostovanje.id).slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Гостовања", href: "/aktuelnosti/gostovanja" },
          { label: gostovanje.title },
        ]}
        title={gostovanje.title}
        subtitle={`${gostovanje.source} · ${gostovanje.date}`}
      />

      {/* Video + text */}
      <Section padding="medium" background="white">
        <Container>
          <article className={styles.article}>
            <div className={styles.videoWrapper}>
              {playing ? (
                <iframe
                  src={`https://www.youtube.com/embed/${gostovanje.youtubeId}?autoplay=1`}
                  title={gostovanje.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.iframe}
                />
              ) : (
                <button
                  type="button"
                  className={styles.thumbnailBtn}
                  onClick={() => setPlaying(true)}
                  aria-label="Пусти видео"
                >
                  <YouTubeThumbnail youtubeId={gostovanje.youtubeId} />
                  <div className={styles.playOverlay}>
                    <div className={styles.playBtn}>
                      <i className="fas fa-play" aria-hidden />
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className={styles.meta}>
              {gostovanje.isNew && <span className={styles.badgeNew}>НОВО</span>}
              <span className={styles.source}>{gostovanje.source}</span>
              <span className={styles.date}>{gostovanje.date}</span>
            </div>

            <div className={styles.content}>
              {gostovanje.fullText.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Prev / Next */}
            <nav className={styles.navigation}>
              {prev ? (
                <Link href={`/aktuelnosti/gostovanja/${prev.slug}`} className={styles.navLink}>
                  <span className={styles.navDirection}>
                    <i className="fas fa-arrow-left" aria-hidden /> Претходно
                  </span>
                  <span className={styles.navTitle}>{prev.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/aktuelnosti/gostovanja/${next.slug}`} className={`${styles.navLink} ${styles.navRight}`}>
                  <span className={styles.navDirection}>
                    Следеће <i className="fas fa-arrow-right" aria-hidden />
                  </span>
                  <span className={styles.navTitle}>{next.title}</span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>
        </Container>
      </Section>

      {/* Related */}
      <Section padding="medium" background="gray">
        <Container>
          <h2 className={styles.relatedTitle}>Погледајте и друга гостовања</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.id} href={`/aktuelnosti/gostovanja/${item.slug}`} className={styles.relatedCardLink}>
                <article className={styles.relatedCard}>
                  <div className={styles.relatedThumb}>
                    <YouTubeThumbnail youtubeId={item.youtubeId} />
                    <div className={styles.playOverlaySmall}>
                      <div className={styles.playBtnSmall}>
                        <i className="fas fa-play" aria-hidden />
                      </div>
                    </div>
                  </div>
                  <div className={styles.relatedBody}>
                    <div className={styles.relatedMeta}>
                      <span className={styles.source}>{item.source}</span>
                      <span className={styles.date}>{item.date}</span>
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY, VIDEO_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import type { VideoItem } from "@/sanity/types";
import { GOSTOVANJA, type Gostovanje } from "../constants";
import GostovanjeVideo, { YouTubeThumbnail } from "./GostovanjeVideo";
import styles from "./page.module.css";

interface GostovanjeDetail {
  id: string;
  slug: string;
  youtubeId: string;
  title: string;
  date: string;
  source: string;
  fullText: string;
  isNew?: boolean;
}

function fromSanity(v: VideoItem): GostovanjeDetail {
  return {
    id: v._id,
    slug: v.slug.current,
    youtubeId: v.youtubeId,
    title: v.title,
    date: v.date || "",
    source: v.source || "",
    fullText: v.fullText || v.description || "",
    isNew: v.isNew,
  };
}

function fromFallback(g: Gostovanje): GostovanjeDetail {
  return {
    id: g.id,
    slug: g.slug,
    youtubeId: g.youtubeId,
    title: g.title,
    date: g.date,
    source: g.source,
    fullText: g.fullText,
    isNew: g.isNew,
  };
}

export async function generateStaticParams() {
  try {
    const all = await client.fetch<VideoItem[]>(VIDEOS_QUERY);
    if (all && all.length > 0) {
      return all.map((v) => ({ slug: v.slug.current }));
    }
  } catch (error) {
    console.error("generateStaticParams (gostovanja) failed:", error);
  }
  return GOSTOVANJA.map((g) => ({ slug: g.slug }));
}

async function getGostovanjeData(
  slug: string,
): Promise<{ item: GostovanjeDetail | null; all: GostovanjeDetail[] }> {
  try {
    const [item, all] = await Promise.all([
      client.fetch<VideoItem | null>(VIDEO_BY_SLUG_QUERY, { slug }),
      client.fetch<VideoItem[]>(VIDEOS_QUERY),
    ]);
    if (item && all && all.length > 0) {
      return { item: fromSanity(item), all: all.map(fromSanity) };
    }
  } catch (error) {
    console.error("Error fetching gostovanje:", error);
  }
  const all = GOSTOVANJA.map(fromFallback);
  const item = all.find((g) => g.slug === slug) || null;
  return { item, all };
}

export default async function GostovanjePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { item: gostovanje, all } = await getGostovanjeData(slug);

  if (!gostovanje) {
    notFound();
  }

  const currentIndex = all.findIndex((g) => g.slug === slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const related = all.filter((g) => g.id !== gostovanje.id).slice(0, 3);

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
            <GostovanjeVideo youtubeId={gostovanje.youtubeId} title={gostovanje.title} />

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

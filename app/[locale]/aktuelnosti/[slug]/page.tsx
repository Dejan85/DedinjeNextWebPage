import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { NEWS_QUERY, NEWS_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { News } from "@/sanity/types";
import { formatSrDate } from "../formatDate";
import { VESTI, type Vest } from "../constants";
import styles from "./page.module.css";

interface VestDetail {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  fullText: string;
}

function fromSanity(n: News): VestDetail {
  return {
    id: n._id,
    slug: n.slug.current,
    title: n.title,
    date: formatSrDate(n.publishedAt),
    author: n.author || "",
    category: n.category || "",
    image: urlFor(n.mainImage).width(1200).height(675).url(),
    excerpt: n.excerpt || "",
    fullText: n.fullText || n.excerpt || "",
  };
}

function fromFallback(v: Vest): VestDetail {
  return {
    id: v.id,
    slug: v.slug,
    title: v.title,
    date: v.date,
    author: v.author,
    category: v.category,
    image: v.image,
    excerpt: v.excerpt,
    fullText: v.fullText,
  };
}

export async function generateStaticParams() {
  try {
    const all = await client.fetch<News[]>(NEWS_QUERY);
    if (all && all.length > 0) {
      return all.map((n) => ({ slug: n.slug.current }));
    }
  } catch (error) {
    console.error("generateStaticParams (aktuelnosti) failed:", error);
  }
  return VESTI.map((v) => ({ slug: v.slug }));
}

async function getVestData(
  slug: string,
  locale: Locale
): Promise<{ vest: VestDetail | null; all: VestDetail[] }> {
  try {
    const [vestRaw, allRaw] = await Promise.all([
      client.fetch<News | null>(NEWS_BY_SLUG_QUERY, { slug }),
      client.fetch<News[]>(NEWS_QUERY),
    ]);
    const vest = vestRaw ? localize(vestRaw, locale) : vestRaw;
    const all = allRaw ? localize(allRaw, locale) : allRaw;
    if (vest && all && all.length > 0) {
      return { vest: fromSanity(vest), all: all.map(fromSanity) };
    }
  } catch (error) {
    console.error("Error fetching vest:", error);
  }
  const all = VESTI.map(fromFallback);
  const vest = all.find((v) => v.slug === slug) || null;
  return { vest, all };
}

export default async function VestPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const { vest, all } = await getVestData(slug, locale as Locale);

  if (!vest) {
    notFound();
  }

  const currentIndex = all.findIndex((v) => v.slug === slug);
  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const related = all.filter((v) => v.id !== vest.id).slice(0, 3);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: vest.title },
        ]}
        title={vest.title}
        subtitle={`${vest.author} · ${vest.date}`}
      />

      <Section padding="medium" background="white">
        <Container>
          <article className={styles.article}>
            <div className={styles.heroImage}>
              <Image
                src={vest.image}
                alt={vest.title}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div className={styles.articleMeta}>
              <span className={styles.categoryBadge}>{vest.category}</span>
              <span className={styles.metaItem}>
                <i className="fas fa-user" aria-hidden /> {vest.author}
              </span>
              <span className={styles.metaItem}>
                <i className="fas fa-calendar-alt" aria-hidden /> {vest.date}
              </span>
            </div>

            <div className={styles.articleContent}>
              {vest.fullText.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <nav className={styles.navigation}>
              {prev ? (
                <Link href={`/aktuelnosti/${prev.slug}`} className={styles.navLink}>
                  <span className={styles.navDirection}>
                    <i className="fas fa-arrow-left" aria-hidden /> Претходно
                  </span>
                  <span className={styles.navTitle}>{prev.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/aktuelnosti/${next.slug}`} className={`${styles.navLink} ${styles.navRight}`}>
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
          <h2 className={styles.relatedTitle}>Прочитајте и друге вести</h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.id} href={`/aktuelnosti/${item.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImg}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedDate}>
                    <i className="fas fa-calendar-alt" aria-hidden /> {item.date}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

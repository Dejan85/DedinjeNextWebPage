import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import { client } from "@/sanity/lib/client";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { News } from "@/sanity/types";
import { formatSrDate } from "../formatDate";
import { VESTI } from "../constants";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

interface VestListItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
}

async function getVesti(locale: Locale): Promise<VestListItem[]> {
  try {
    const newsRaw = await client.fetch<News[]>(NEWS_QUERY);
    const news = newsRaw ? localize(newsRaw, locale) : newsRaw;
    if (news && news.length > 0) {
      return news.map((n) => ({
        id: n._id,
        slug: n.slug.current,
        title: n.title,
        date: formatSrDate(n.publishedAt),
        author: n.author || "",
        category: n.category || "",
        image: urlFor(n.mainImage).width(800).height(450).url(),
        excerpt: n.excerpt || "",
      }));
    }
  } catch (error) {
    console.error("Error fetching vesti:", error);
  }
  return VESTI;
}

export default async function VestiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const vesti = await getVesti(locale as Locale);
  const featured = vesti[0];
  const secondary = vesti.slice(1, 3);
  const rest = vesti.slice(3);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Вести" },
        ]}
        title="Вести"
        subtitle="Најновије вести и дешавања из Института Дедиње"
      />

      {/* Hero: Featured + two secondary */}
      <Section padding="medium" background="white">
        <Container>
          <div className={styles.hero}>
            {/* Main featured */}
            <Link href={`/aktuelnosti/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImg}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className={styles.featuredOverlay}>
                  <span className={styles.categoryBadge}>{featured.category}</span>
                  <h2>{featured.title}</h2>
                  <div className={styles.featuredMeta}>
                    <span>
                      <i className="fas fa-calendar-alt" aria-hidden /> {featured.date}
                    </span>
                    <span>
                      <i className="fas fa-user" aria-hidden /> {featured.author}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Two secondary */}
            <div className={styles.secondaryStack}>
              {secondary.map((vest) => (
                <Link key={vest.id} href={`/aktuelnosti/${vest.slug}`} className={styles.secondaryCard}>
                  <div className={styles.secondaryImg}>
                    <Image
                      src={vest.image}
                      alt={vest.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.secondaryBody}>
                    <span className={styles.categoryBadgeSm}>{vest.category}</span>
                    <h3>{vest.title}</h3>
                    <span className={styles.secondaryDate}>
                      <i className="fas fa-calendar-alt" aria-hidden /> {vest.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Rest of articles */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.restHeader}>
            <h2>Остале вести</h2>
          </div>
          <div className={styles.grid}>
            {rest.map((vest) => (
              <Link key={vest.id} href={`/aktuelnosti/${vest.slug}`} className={styles.card}>
                <div className={styles.cardImg}>
                  <Image
                    src={vest.image}
                    alt={vest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.categoryBadgeSm}>{vest.category}</span>
                    <span className={styles.cardDate}>
                      <i className="fas fa-calendar-alt" aria-hidden /> {vest.date}
                    </span>
                  </div>
                  <h3>{vest.title}</h3>
                  <p>{vest.excerpt}</p>
                  <span className={styles.readMore}>
                    Прочитај више <i className="fas fa-arrow-right" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

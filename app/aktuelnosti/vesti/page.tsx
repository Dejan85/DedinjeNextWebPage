import Image from "next/image";
import Link from "next/link";
import { Container, PageHeader, Section } from "@/components/shared";
import { VESTI } from "../constants";
import { generateMetadata } from "./metadata";
import styles from "./page.module.css";

export { generateMetadata };

export default function VestiPage() {
  const featured = VESTI[0];
  const secondary = VESTI.slice(1, 3);
  const rest = VESTI.slice(3);

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

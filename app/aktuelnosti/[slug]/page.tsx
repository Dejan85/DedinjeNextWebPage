"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import { VESTI } from "../constants";
import styles from "./page.module.css";

export default function VestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const vest = VESTI.find((v) => v.slug === slug);

  if (!vest) {
    notFound();
  }

  const currentIndex = VESTI.findIndex((v) => v.slug === slug);
  const prev = currentIndex > 0 ? VESTI[currentIndex - 1] : null;
  const next = currentIndex < VESTI.length - 1 ? VESTI[currentIndex + 1] : null;
  const related = VESTI.filter((v) => v.id !== vest.id).slice(0, 3);

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

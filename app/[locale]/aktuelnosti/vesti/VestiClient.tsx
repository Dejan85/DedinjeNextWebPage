"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import { categoryLabel } from "../categoryLabels";
import styles from "./page.module.css";

export interface VestListItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  publishedAt: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
}

const ITEMS_PER_PAGE = 9;

export default function VestiClient({ items }: { items: VestListItem[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const CATEGORIES = useMemo(
    () => Array.from(new Set(items.map((n) => n.category).filter(Boolean))),
    [items],
  );

  const featured = items[0];
  const secondary = items.slice(1, 3);
  const rest = items.slice(3);

  const filtered = useMemo(() => {
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo + "T23:59:59") : null;

    const filteredItems = rest.filter((item) => {
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "all" || item.category === categoryFilter;

      let matchDate = true;
      const itemDate = new Date(item.publishedAt);
      if (fromDate && itemDate < fromDate) matchDate = false;
      if (toDate && itemDate > toDate) matchDate = false;

      return matchSearch && matchCategory && matchDate;
    });

    return filteredItems.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [rest, search, categoryFilter, dateFrom, dateTo, sortOrder]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const hasActiveFilters =
    search || categoryFilter !== "all" || dateFrom || dateTo || sortOrder !== "newest";

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setCategoryFilter("all");
    setDateFrom("");
    setDateTo("");
    setSortOrder("newest");
    setVisibleCount(ITEMS_PER_PAGE);
  };

  if (!featured) {
    return (
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Вести" },
        ]}
        title="Вести"
        subtitle="Најновије вести и дешавања из Института Дедиње"
      />
    );
  }

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
                  {featured.category && (
                    <span className={styles.categoryBadge}>{categoryLabel(featured.category)}</span>
                  )}
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
                    {vest.category && (
                      <span className={styles.categoryBadgeSm}>{categoryLabel(vest.category)}</span>
                    )}
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

      {/* Filters + Rest of articles */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.filterBar}>
            <div className={styles.filterTop}>
              <h2 className={styles.filterTitle}>
                Остале вести
                <span className={styles.filterCount}>{filtered.length}</span>
              </h2>
            </div>
            <div className={styles.filterRight}>
              <div className={styles.searchWrapper}>
                <i className="fas fa-search" aria-hidden />
                <input
                  type="text"
                  placeholder="Претражи вести..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={styles.searchInput}
                />
                {search && (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => setSearch("")}
                    aria-label="Обриши претрагу"
                  >
                    <i className="fas fa-times" aria-hidden />
                  </button>
                )}
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={styles.filterSelect}
                >
                  <option value="all">Све категорије</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {categoryLabel(c)}
                    </option>
                  ))}
                </select>
                <i className="fas fa-chevron-down" aria-hidden />
              </div>
              <div className={styles.selectWrapper}>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value as "newest" | "oldest");
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={styles.filterSelect}
                >
                  <option value="newest">Најновије прво</option>
                  <option value="oldest">Најстарије прво</option>
                </select>
                <i className="fas fa-chevron-down" aria-hidden />
              </div>
              <div className={styles.dateRange}>
                <div className={styles.dateField}>
                  <label htmlFor="dateFrom">Од</label>
                  <input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className={styles.dateInput}
                  />
                </div>
                <span className={styles.dateSeparator}>–</span>
                <div className={styles.dateField}>
                  <label htmlFor="dateTo">До</label>
                  <input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className={styles.dateInput}
                  />
                </div>
              </div>
              {hasActiveFilters && (
                <button type="button" className={styles.clearFilters} onClick={handleReset}>
                  <i className="fas fa-times" aria-hidden /> Обриши
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="fas fa-search" aria-hidden />
              <h3>Нема резултата</h3>
              <p>Покушајте другу претрагу или уклоните филтере.</p>
              <button type="button" className={styles.resetBtn} onClick={handleReset}>
                <i className="fas fa-redo" aria-hidden /> Ресетуј филтере
              </button>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {visible.map((vest) => (
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
                        {vest.category && (
                          <span className={styles.categoryBadgeSm}>{categoryLabel(vest.category)}</span>
                        )}
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

              {hasMore && (
                <div className={styles.loadMoreWrapper}>
                  <button type="button" className={styles.loadMoreBtn} onClick={handleLoadMore}>
                    <i className="fas fa-plus" aria-hidden />
                    Прикажи још ({filtered.length - visibleCount} преосталих)
                  </button>
                </div>
              )}

              <div className={styles.resultsInfo}>
                Приказано {visible.length} од {filtered.length} вести
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}

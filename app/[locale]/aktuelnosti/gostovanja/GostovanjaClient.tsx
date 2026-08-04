"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

export interface GostovanjeItem {
  id: string;
  slug: string;
  youtubeId: string;
  title: string;
  date: string;
  source: string;
  description: string;
  isNew?: boolean;
}

const ITEMS_PER_PAGE = 6;

const MONTHS: Record<string, number> = {
  јануар: 0, фебруар: 1, март: 2, април: 3,
  мај: 4, јун: 5, јул: 6, август: 7,
  септембар: 8, октобар: 9, новембар: 10, децембар: 11,
};

function parseSerbianDate(dateStr: string): Date | null {
  const match = dateStr.match(/(\d{1,2})\.\s*(\S+)\s+(\d{4})/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = MONTHS[match[2].toLowerCase()];
  const year = parseInt(match[3], 10);
  if (month === undefined) return null;
  return new Date(year, month, day);
}

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

export default function GostovanjaClient({ items }: { items: GostovanjeItem[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const SOURCES = useMemo(() => Array.from(new Set(items.map((g) => g.source))), [items]);

  const featured = items[0];
  const rest = items.slice(1);

  const filtered = useMemo(() => {
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo + "T23:59:59") : null;

    const filteredItems = rest.filter((item) => {
      const matchSearch =
        !search ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchSource = sourceFilter === "all" || item.source === sourceFilter;

      let matchDate = true;
      if (fromDate || toDate) {
        const itemDate = parseSerbianDate(item.date);
        if (itemDate) {
          if (fromDate && itemDate < fromDate) matchDate = false;
          if (toDate && itemDate > toDate) matchDate = false;
        }
      }

      return matchSearch && matchSource && matchDate;
    });

    return filteredItems.sort((a, b) => {
      const dateA = parseSerbianDate(a.date)?.getTime() || 0;
      const dateB = parseSerbianDate(b.date)?.getTime() || 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [rest, search, sourceFilter, dateFrom, dateTo, sortOrder]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const hasActiveFilters = search || sourceFilter !== "all" || dateFrom || dateTo || sortOrder !== "newest";

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleReset = () => {
    setSearch("");
    setSourceFilter("all");
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
          { label: "Гостовања" },
        ]}
        title="Гостовања"
        subtitle="Медијски наступи и интервјуи стручњака Института Дедиње"
      />
    );
  }

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Гостовања" },
        ]}
        title="Гостовања"
        subtitle="Медијски наступи и интервјуи стручњака Института Дедиње"
      />

      {/* Featured */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.featured}>
            <div className={styles.featuredVideo}>
              {activeVideo === featured.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=1`}
                  title={featured.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.iframe}
                />
              ) : (
                <button
                  type="button"
                  className={styles.thumbnailBtn}
                  onClick={() => setActiveVideo(featured.id)}
                  aria-label="Пусти видео"
                >
                  <YouTubeThumbnail youtubeId={featured.youtubeId} />
                  <div className={styles.playOverlay}>
                    <div className={styles.playBtn}>
                      <i className="fas fa-play" aria-hidden />
                    </div>
                  </div>
                </button>
              )}
            </div>
            <div className={styles.featuredInfo}>
              <div className={styles.featuredMeta}>
                {featured.isNew && <span className={styles.badgeNew}>НОВО</span>}
                <span className={styles.source}>{featured.source}</span>
                <span className={styles.date}>{featured.date}</span>
              </div>
              <Link href={`/aktuelnosti/gostovanja/${featured.slug}`} className={styles.featuredLink}>
                <h2>{featured.title}</h2>
              </Link>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <Link href={`/aktuelnosti/gostovanja/${featured.slug}`} className={styles.readMore}>
                Прочитај више <i className="fas fa-arrow-right" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filters + Grid */}
      <Section padding="medium" background="white">
        <Container>
          {/* Filter bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterTop}>
              <h2 className={styles.filterTitle}>
                Сва гостовања
                <span className={styles.filterCount}>{filtered.length}</span>
              </h2>
            </div>
            <div className={styles.filterRight}>
              <div className={styles.searchWrapper}>
                <i className="fas fa-search" aria-hidden />
                <input
                  type="text"
                  placeholder="Претражи гостовања..."
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
                  value={sourceFilter}
                  onChange={(e) => {
                    setSourceFilter(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className={styles.filterSelect}
                >
                  <option value="all">Сви извори</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
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

          {/* Results */}
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
                {visible.map((item) => (
                  <Link key={item.id} href={`/aktuelnosti/gostovanja/${item.slug}`} className={styles.cardLink}>
                    <article className={styles.card}>
                      <div className={styles.cardVideo}>
                        <div className={styles.cardThumbWrapper}>
                          <YouTubeThumbnail youtubeId={item.youtubeId} />
                          <div className={styles.playOverlay}>
                            <div className={styles.playBtnSmall}>
                              <i className="fas fa-play" aria-hidden />
                            </div>
                          </div>
                          {item.isNew && (
                            <span className={styles.cardBadge}>НОВО</span>
                          )}
                        </div>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.cardMeta}>
                          <span className={styles.source}>{item.source}</span>
                          <span className={styles.date}>{item.date}</span>
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <span className={styles.readMoreSmall}>
                          Прочитај више <i className="fas fa-arrow-right" aria-hidden />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className={styles.loadMoreWrapper}>
                  <button type="button" className={styles.loadMoreBtn} onClick={handleLoadMore}>
                    <i className="fas fa-plus" aria-hidden />
                    Прикажи још ({filtered.length - visibleCount} преосталих)
                  </button>
                </div>
              )}

              {/* Results info */}
              <div className={styles.resultsInfo}>
                Приказано {visible.length} од {filtered.length} гостовања
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}

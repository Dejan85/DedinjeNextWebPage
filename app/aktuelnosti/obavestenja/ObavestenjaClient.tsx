"use client";

import { useState, useMemo } from "react";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

export interface ObavestenjeItem {
  id: string;
  date: string;
  icon: string;
  type: string;
  title: string;
  text: string;
  important: boolean;
}

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  "Радно време": { color: "var(--accent-amber)", bg: "var(--accent-amber-bg)" },
  "Опрема": { color: "var(--accent-teal)", bg: "var(--accent-teal-bg)" },
  "Едукација": { color: "var(--accent-violet)", bg: "var(--accent-violet-bg)" },
  "Информација": { color: "var(--accent-blue)", bg: "var(--accent-blue-bg)" },
  "Кадрови": { color: "var(--accent-emerald)", bg: "var(--accent-emerald-bg)" },
};

function parseSerbianDate(dateStr: string): Date {
  const months: Record<string, number> = {
    "јануар": 0, "фебруар": 1, "март": 2, "април": 3,
    "мај": 4, "јун": 5, "јул": 6, "август": 7,
    "септембар": 8, "октобар": 9, "новембар": 10, "децембар": 11,
  };
  const cleaned = dateStr.replace(".", "").trim();
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length < 3) return new Date(0);
  const day = parseInt(parts[0]);
  const month = months[parts[1]?.toLowerCase()] ?? 0;
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
}

export default function ObavestenjaClient({ items }: { items: ObavestenjeItem[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const types = useMemo(() => {
    const set = new Set(items.map((o) => o.type));
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.text.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") result = result.filter((o) => o.type === typeFilter);

    result.sort((a, b) => {
      const da = parseSerbianDate(a.date).getTime();
      const db = parseSerbianDate(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return result;
  }, [items, search, typeFilter, sortOrder]);

  const hasFilters = search || typeFilter !== "all";
  const featured = filtered.find((o) => o.important);
  const rest = filtered.filter((o) => o !== featured);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Обавештења" },
        ]}
        title="Обавештења"
        subtitle="Званична обавештења Института Дедиње"
      />

      {/* Featured (always visible if exists and no filters hide it) */}
      {featured && (
        <Section padding="medium" background="white">
          <Container>
            <article className={styles.featured}>
              <div className={styles.featuredIcon}>
                <i className={featured.icon} aria-hidden />
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.featuredTop}>
                  <span
                    className={styles.typeBadge}
                    style={{
                      color: TYPE_COLORS[featured.type]?.color,
                      background: TYPE_COLORS[featured.type]?.bg,
                    }}
                  >
                    {featured.type}
                  </span>
                  <span className={styles.dateText}>
                    <i className="fas fa-calendar-alt" aria-hidden /> {featured.date}
                  </span>
                  <span className={styles.importantBadge}>
                    <i className="fas fa-exclamation-circle" aria-hidden /> Важно
                  </span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.text}</p>
              </div>
            </article>
          </Container>
        </Section>
      )}

      {/* Filters + Grid */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <i className="fas fa-search" aria-hidden />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Претражи обавештења..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className={styles.clearBtn} onClick={() => setSearch("")}>
                  <i className="fas fa-times" aria-hidden />
                </button>
              )}
            </div>

            <div className={styles.filterGroup}>
              <select
                className={styles.filterSelect}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Све категорије</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              >
                <option value="newest">Најновије прво</option>
                <option value="oldest">Најстарије прво</option>
              </select>
            </div>

            {hasFilters && (
              <button
                className={styles.clearFilters}
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                }}
              >
                <i className="fas fa-undo" aria-hidden /> Ресетуј филтере
              </button>
            )}
          </div>

          <div className={styles.resultsInfo}>
            Приказано {filtered.length} од {items.length} обавештења
          </div>

          {rest.length === 0 && !featured ? (
            <div className={styles.emptyState}>
              <i className="fas fa-search" aria-hidden />
              <h3>Нема резултата</h3>
              <p>Покушајте са другим критеријумима претраге.</p>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearch("");
                  setTypeFilter("all");
                }}
              >
                Ресетуј филтере
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {rest.map((item) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <i className={item.icon} aria-hidden />
                  </div>
                  <div className={styles.cardTop}>
                    <span
                      className={styles.typeBadgeSmall}
                      style={{
                        color: TYPE_COLORS[item.type]?.color,
                        background: TYPE_COLORS[item.type]?.bg,
                      }}
                    >
                      {item.type}
                    </span>
                    <span className={styles.dateSmall}>
                      <i className="fas fa-calendar-alt" aria-hidden /> {item.date}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

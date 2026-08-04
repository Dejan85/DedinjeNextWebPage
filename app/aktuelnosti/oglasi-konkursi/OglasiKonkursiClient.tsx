"use client";

import { useState, useMemo } from "react";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

export interface OglasItem {
  id: string;
  date: string;
  title: string;
  type: string;
  icon: string;
  text: string;
  active: boolean;
  deadline?: string;
}

const TYPE_ICONS: Record<string, string> = {
  "Запошљавање": "fas fa-user-md",
  "Јавна набавка": "fas fa-file-invoice",
  "Остало": "fas fa-info-circle",
};

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  "Запошљавање": { color: "var(--accent-emerald)", bg: "var(--accent-emerald-bg)" },
  "Јавна набавка": { color: "var(--accent-blue)", bg: "var(--accent-blue-bg)" },
  "Остало": { color: "var(--accent-amber)", bg: "var(--accent-amber-bg)" },
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

export default function OglasiKonkursiClient({ items }: { items: OglasItem[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "closed">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
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

    if (statusFilter === "active") result = result.filter((o) => o.active);
    if (statusFilter === "closed") result = result.filter((o) => !o.active);

    if (typeFilter !== "all") result = result.filter((o) => o.type === typeFilter);

    result.sort((a, b) => {
      const da = parseSerbianDate(a.date).getTime();
      const db = parseSerbianDate(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return result;
  }, [items, search, statusFilter, typeFilter, sortOrder]);

  const activeCount = items.filter((o) => o.active).length;
  const closedCount = items.filter((o) => !o.active).length;
  const hasFilters = search || statusFilter !== "all" || typeFilter !== "all";

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Почетна", href: "/" },
          { label: "Актуелности", href: "/aktuelnosti" },
          { label: "Огласи и конкурси" },
        ]}
        title="Огласи и конкурси"
        subtitle="Отворене позиције и јавне набавке"
      />

      {/* Stats */}
      <Section padding="small" background="white">
        <Container>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconTotal}`}>
                <i className="fas fa-list" aria-hidden />
              </div>
              <div>
                <span className={styles.statNumber}>{items.length}</span>
                <span className={styles.statLabel}>Укупно огласа</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconActive}`}>
                <i className="fas fa-check-circle" aria-hidden />
              </div>
              <div>
                <span className={styles.statNumber}>{activeCount}</span>
                <span className={styles.statLabel}>Активних</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statIconClosed}`}>
                <i className="fas fa-times-circle" aria-hidden />
              </div>
              <div>
                <span className={styles.statNumber}>{closedCount}</span>
                <span className={styles.statLabel}>Затворених</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filters + List */}
      <Section padding="medium" background="gray">
        <Container>
          <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
              <i className="fas fa-search" aria-hidden />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Претражи огласе..."
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "closed")}
              >
                <option value="all">Сви статуси</option>
                <option value="active">Активни</option>
                <option value="closed">Затворени</option>
              </select>

              <select
                className={styles.filterSelect}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Сви типови</option>
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
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                <i className="fas fa-undo" aria-hidden /> Ресетуј филтере
              </button>
            )}
          </div>

          <div className={styles.resultsInfo}>
            Приказано {filtered.length} од {items.length} огласа
          </div>

          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <i className="fas fa-search" aria-hidden />
              <h3>Нема резултата</h3>
              <p>Покушајте са другим критеријумима претраге.</p>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                Ресетуј филтере
              </button>
            </div>
          ) : (
            <div className={styles.list}>
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className={`${styles.card} ${item.active ? styles.cardActive : styles.cardClosed}`}
                >
                  <div className={styles.cardLeft}>
                    <div className={`${styles.cardIcon} ${item.active ? styles.cardIconActive : styles.cardIconClosed}`}>
                      <i className={TYPE_ICONS[item.type] || "fas fa-info-circle"} aria-hidden />
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span
                        className={styles.typeBadge}
                        style={{
                          color: TYPE_COLORS[item.type]?.color,
                          background: TYPE_COLORS[item.type]?.bg,
                        }}
                      >
                        {item.type}
                      </span>
                      <span className={styles.dateText}>
                        <i className="fas fa-calendar-alt" aria-hidden /> {item.date}
                      </span>
                      {item.deadline && (
                        <span className={styles.deadlineText}>
                          <i className="fas fa-hourglass-half" aria-hidden /> Рок: {item.deadline}
                        </span>
                      )}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <div className={styles.cardRight}>
                    <span className={`${styles.statusBadge} ${item.active ? styles.statusActive : styles.statusClosed}`}>
                      <i className={item.active ? "fas fa-check-circle" : "fas fa-times-circle"} aria-hidden />
                      {item.active ? "Активан" : "Затворен"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Container, PageHeader, Section } from "@/components/shared";
import styles from "./page.module.css";

interface Obavestenje {
  id: string;
  date: string;
  icon: string;
  type: string;
  title: string;
  text: string;
  important: boolean;
}

const OBAVESTENJA: Obavestenje[] = [
  {
    id: "1",
    date: "15. фебруар 2026.",
    icon: "fas fa-clock",
    type: "Радно време",
    title: "Радно време за време празника",
    text: "Обавештавамо пацијенте да ће Институт Дедиње радити по измењеном распореду током предстојећих празника. Амбулантни прегледи неће се обављати, док ће ургентни пријем радити 24 часа.",
    important: true,
  },
  {
    id: "2",
    date: "01. фебруар 2026.",
    icon: "fas fa-heartbeat",
    type: "Опрема",
    title: "Нови апарати за дијагностику",
    text: "Институт Дедиње је набавио најсавременије апарате за ехокардиографску и васкуларну дијагностику, чиме се додатно унапређује квалитет прегледа и скраћује време чекања.",
    important: false,
  },
  {
    id: "3",
    date: "20. јануар 2026.",
    icon: "fas fa-graduation-cap",
    type: "Едукација",
    title: "Позив за едукативне програме",
    text: "Отворене су пријаве за нови циклус базичне школе ехокардиографије. Курс почиње у марту 2026. године. Заинтересовани кандидати могу се пријавити путем контакт форме на сајту.",
    important: false,
  },
  {
    id: "4",
    date: "10. јануар 2026.",
    icon: "fas fa-hospital",
    type: "Информација",
    title: "Нова амбуланта за васкуларну дијагностику",
    text: "Од 15. јануара 2026. године, Институт Дедиње отвара нову амбуланту за васкуларну ултразвучну дијагностику на другом спрату главне зграде. Заказивање путем телефона 011 360 1669.",
    important: false,
  },
  {
    id: "5",
    date: "28. децембар 2025.",
    icon: "fas fa-users",
    type: "Кадрови",
    title: "Нови специјалисти у тиму Института",
    text: "Институт Дедиње са задовољством најављује пријем три нова специјалиста кардиологије и два васкуларна хирурга који ће додатно ојачати стручни тим Института.",
    important: false,
  },
  {
    id: "6",
    date: "15. децембар 2025.",
    icon: "fas fa-calendar-check",
    type: "Информација",
    title: "Распоред амбулантних прегледа за јануар 2026.",
    text: "Објављујемо распоред амбулантних прегледа за јануар 2026. године. Прегледи се заказују путем телефона 011 360 1669, радним данима од 08:00 до 14:00.",
    important: false,
  },
  {
    id: "7",
    date: "01. децембар 2025.",
    icon: "fas fa-heartbeat",
    type: "Опрема",
    title: "Инсталиран нови МР скенер",
    text: "Институт Дедиње је инсталирао магнетну резонанцу најновије генерације за кардиолошку дијагностику. Апарат омогућава детаљнији приказ срчаних структура и прецизнију процену виталности миокарда.",
    important: false,
  },
];

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

export default function ObavestenjaPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const types = useMemo(() => {
    const set = new Set(OBAVESTENJA.map((o) => o.type));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    let items = [...OBAVESTENJA];

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.text.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") items = items.filter((o) => o.type === typeFilter);

    items.sort((a, b) => {
      const da = parseSerbianDate(a.date).getTime();
      const db = parseSerbianDate(b.date).getTime();
      return sortOrder === "newest" ? db - da : da - db;
    });

    return items;
  }, [search, typeFilter, sortOrder]);

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
                  <span className={styles.typeBadge}>{featured.type}</span>
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
            Приказано {filtered.length} од {OBAVESTENJA.length} обавештења
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
                    <span className={styles.typeBadgeSmall}>{item.type}</span>
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

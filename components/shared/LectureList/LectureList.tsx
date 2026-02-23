import styles from "./LectureList.module.css";

export interface LectureItem {
  /** Опционо – када је празно, датум се не приказује */
  date?: string;
  title: string;
  lecturer: string;
}

interface LectureListProps {
  items?: LectureItem[] | null;
  emptyMessage?: string;
  className?: string;
  /** Приказуј наслов у српским наводницима. Подразумевано true. */
  showQuotes?: boolean;
}

export default function LectureList({
  items = [],
  emptyMessage = "Садржај биће допуњен.",
  className = "",
  showQuotes = true,
}: LectureListProps) {
  const itemList = items ?? [];

  if (!itemList.length) {
    return <p className={`${styles.empty} ${className}`}>{emptyMessage}</p>;
  }

  return (
    <div className={`${styles.list} ${className}`}>
      {itemList.map((item, i) => (
        <div key={i} className={styles.item}>
          {item.date && <span className={styles.date}>{item.date}</span>}
          <span className={styles.title}>
            {showQuotes ? `${'„'}${item.title}${'"'}` : item.title}
          </span>
          <span className={styles.lecturer}> – {item.lecturer}</span>
        </div>
      ))}
    </div>
  );
}

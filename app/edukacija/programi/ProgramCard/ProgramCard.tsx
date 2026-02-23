import Link from "next/link";
import styles from "./ProgramCard.module.css";

export interface ProgramCardItem {
  id: string;
  title: string;
  icon: string;
  href: string;
  buttonText?: string;
}

interface ProgramCardProps {
  item: ProgramCardItem;
}

export default function ProgramCard({ item }: ProgramCardProps) {
  return (
    <Link href={item.href} className={styles.card}>
      <div className={styles.iconWrap}>
        <i className={item.icon} aria-hidden />
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <span className={styles.btn}>{item.buttonText ?? "Сазнај више"}</span>
    </Link>
  );
}

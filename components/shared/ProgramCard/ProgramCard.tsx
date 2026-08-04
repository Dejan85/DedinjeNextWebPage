import { Link } from "@/i18n/navigation";
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
  titleColor?: "light" | "dark";
}

export default function ProgramCard({ item, titleColor = "light" }: ProgramCardProps) {
  return (
    <Link href={item.href} className={`${styles.card} ${titleColor === "dark" ? styles.titleDark : ""}`}>
      <div className={styles.iconWrap}>
        <i className={item.icon} aria-hidden />
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <span className={styles.btn}>{item.buttonText ?? "Сазнај више"}</span>
    </Link>
  );
}

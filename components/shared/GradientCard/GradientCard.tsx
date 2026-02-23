import Link from "next/link";
import styles from "./GradientCard.module.css";

export interface GradientCardItem {
  id: string;
  title: string;
  icon: string;
  href: string;
  buttonText?: string;
}

interface GradientCardProps {
  item: GradientCardItem;
}

export default function GradientCard({ item }: GradientCardProps) {
  const buttonText = item.buttonText ?? item.title;

  return (
    <Link href={item.href} className={styles.card}>
      <div className={styles.icon}>
        <i className={item.icon}></i>
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <span className={styles.btn}>{buttonText}</span>
    </Link>
  );
}

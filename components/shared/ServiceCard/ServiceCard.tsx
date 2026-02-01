import styles from "./ServiceCard.module.css";
import { Heading, Link, Text } from "@/components/typography";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  linkHref: string;
  featured?: boolean;
  featuredLabel?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  linkHref,
  featured = false,
  featuredLabel = "Најтраженије",
}: ServiceCardProps) {
  return (
    <div className={`${styles.serviceCard} ${featured ? styles.featured : ""}`}>
      {featured && <div className={styles.featuredBadge}>{featuredLabel}</div>}
      <div className={styles.serviceIconWrapper}>
        <div className={styles.serviceIcon}>
          <i className={icon}></i>
        </div>
      </div>
      <Heading variant="h3" text={title} />
      <Text text={description} />
      <ul className={styles.serviceList}>
        {features.map((feature, index) => (
          <li key={index}>
            <i className="fas fa-angle-right"></i> {feature}
          </li>
        ))}
      </ul>
      <Link href={linkHref} className={styles.serviceLink}>
        Сазнајте више <i className="fas fa-long-arrow-alt-right"></i>
      </Link>
    </div>
  );
}

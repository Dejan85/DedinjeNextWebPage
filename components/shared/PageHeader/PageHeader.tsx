import { Link } from "@/i18n/navigation";
import Container from "../Container/Container";
import { Heading, Text } from "@/components/typography";
import styles from "./PageHeader.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
}

export default function PageHeader({
  breadcrumbs,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className={styles.pageHeader}>
      <Container>
        <div className={styles.breadcrumb}>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className={styles.breadcrumbItem}>
              {index > 0 && (
                <i className="fas fa-chevron-right" aria-hidden="true" />
              )}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
        <Heading variant="h1" text={title} />
        {subtitle && <Text text={subtitle} />}
      </Container>
    </section>
  );
}

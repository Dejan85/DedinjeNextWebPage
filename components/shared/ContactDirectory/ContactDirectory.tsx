import Container from "../Container/Container";
import { Section } from "../Section/Section";
import styles from "./ContactDirectory.module.css";

export interface ContactDirectoryContact {
  title: string;
  note?: string;
  phone: string;
  href: string;
  time: string;
}

export interface ContactDirectoryCategory {
  title: string;
  icon?: string;
  contacts: ContactDirectoryContact[];
}

interface ContactDirectoryProps {
  heading?: string;
  subtitle?: string;
  categories: ContactDirectoryCategory[];
  background?: "white" | "gray";
}

export default function ContactDirectory({
  heading,
  subtitle,
  categories,
  background = "gray",
}: ContactDirectoryProps) {
  return (
    <Section padding="medium" background={background}>
      <Container>
        {heading && (
          <div className={styles.sectionHeader}>
            <div>
              <h2>{heading}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        )}

        {categories.map((category, idx) => (
          <div key={idx} className={styles.categoryBlock}>
            <h3 className={styles.categoryTitle}>
              {category.icon && <i className={category.icon} aria-hidden />}
              {category.title}
            </h3>
            <div className={styles.contactGrid}>
              {category.contacts.map((contact, cIdx) => (
                <div key={cIdx} className={styles.contactCard}>
                  <div className={styles.contactCardHeader}>
                    <strong>{contact.title}</strong>
                    {contact.note && (
                      <span className={styles.contactNote}>{contact.note}</span>
                    )}
                  </div>
                  <div className={styles.contactCardBody}>
                    <div className={styles.contactRow}>
                      <i className="fas fa-phone" aria-hidden />
                      <a href={contact.href}>{contact.phone}</a>
                    </div>
                    <div className={styles.contactRow}>
                      <i className="fas fa-clock" aria-hidden />
                      <span>{contact.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
}

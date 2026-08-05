import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { localize, type Locale } from "@/sanity/lib/locale";
import type { Footer as FooterType } from "@/sanity/types";
import Container from "../Container/Container";
import styles from "./Footer.module.css";

const DEFAULT_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5!2d20.4565!3d44.7733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7009d2b5e8d3%3A0x5f8e8b6f7c6d3e0!2z0JjQvdGB0YLQuNGC0YPRgiDQt9CwINC60LDRgNC00LjQvtCy0LDRgdC60YPQu9Cw0YDQvdC1INCx0L7Qu9C10YHRgtC4INCU0LXQtNC40ZrQtQ!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs";

const DEFAULT_LOCATIONS = [
  {
    _key: "dedinje-1",
    title: "ДЕДИЊЕ 1",
    mapEmbedUrl: DEFAULT_MAP_EMBED_URL,
    address: "Хероја Милана Тепића бр. 1",
    city: "11040 Београд, Србија",
  },
  {
    _key: "dedinje-2",
    title: "ДЕДИЊЕ 2",
    mapEmbedUrl: DEFAULT_MAP_EMBED_URL,
    address: "Хероја Милана Тепића бр. 1",
    city: "11040 Београд, Србија",
  },
  {
    _key: "dedinje-3",
    title: "ДЕДИЊЕ 3",
    mapEmbedUrl: DEFAULT_MAP_EMBED_URL,
    address: "Хероја Милана Тепића бр. 1",
    city: "11040 Београд, Србија",
  },
];

async function getFooterData(locale: Locale) {
  try {
    const raw = await client.fetch<FooterType>(
      FOOTER_QUERY,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );
    return raw ? localize(raw, locale) : raw;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
}

export default async function Footer() {
  const locale = (await getLocale()) as Locale;
  const footer = await getFooterData(locale);

  // Fallback values if Sanity data is not available
  const instituteName = footer?.instituteName || "ДЕДИЊЕ";
  const instituteSubtitle = footer?.instituteSubtitle || "Институт за КВБ";
  const description =
    footer?.description ||
    "Институт за кардиоваскуларне болести Дедиње је водећа здравствена установа у региону специјализована за дијагностику и лечење болести срца и крвних судова.";
  const copyright =
    footer?.copyright ||
    "© 2026 Институт за кардиоваскуларне болести Дедиње. Сва права задржана.";

  const locations =
    footer?.locations && footer.locations.length > 0
      ? footer.locations
      : DEFAULT_LOCATIONS;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Container>
          <div className={styles.footerGrid}>
            <div className={`${styles.footerCol} ${styles.about}`}>
              <div className={styles.footerLogo}>
                <div className={styles.logoIcon}>
                  <img
                    src="/images/logo dedinje.png"
                    alt="Institut Dedinje Logo"
                  />
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>{instituteName}</span>
                  <span className={styles.logoSubtitle}>
                    {instituteSubtitle}
                  </span>
                </div>
              </div>
              <p>{description}</p>
              {footer?.socialLinks && (
                <div className={styles.footerSocial}>
                  {footer.socialLinks.facebook && (
                    <a
                      href={footer.socialLinks.facebook}
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                  {footer.socialLinks.twitter && (
                    <a
                      href={footer.socialLinks.twitter}
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  )}
                  {footer.socialLinks.instagram && (
                    <a
                      href={footer.socialLinks.instagram}
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  )}
                  {footer.socialLinks.linkedin && (
                    <a
                      href={footer.socialLinks.linkedin}
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  )}
                  {footer.socialLinks.youtube && (
                    <a
                      href={footer.socialLinks.youtube}
                      aria-label="YouTube"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Locations */}
            {locations.map((location) => (
              <div key={location._key} className={`${styles.footerCol} ${styles.location}`}>
                {location.title && <h4>{location.title}</h4>}
                {location.mapEmbedUrl && (
                  <div className={styles.locationMap}>
                    <iframe
                      src={location.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={location.title || "Локација Института Дедиње"}
                    />
                  </div>
                )}
                {(location.address || location.city) && (
                  <p className={styles.locationAddress}>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      {location.address && (
                        <>
                          {location.address}
                          <br />
                        </>
                      )}
                      {location.city}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className={styles.footerBottom}>
        <Container>
          <div className={styles.footerBottomContent}>
            <p>{copyright}</p>
            {footer?.legalLinks && footer.legalLinks.length > 0 && (
              <div className={styles.footerLinks}>
                {footer.legalLinks.map((link) => (
                  <Link key={link._key} href={link.href}>
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </footer>
  );
}

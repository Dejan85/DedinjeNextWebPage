import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import type { Footer as FooterType } from "@/sanity/types";

async function getFooterData() {
  try {
    const footer = await client.fetch<FooterType>(
      FOOTER_QUERY,
      {},
      {
        cache: "force-cache",
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );
    return footer;
  } catch (error) {
    console.error("Error fetching footer:", error);
    return null;
  }
}

export default async function Footer() {
  const footer = await getFooterData();

  // Fallback values if Sanity data is not available
  const instituteName = footer?.instituteName || "ДЕДИЊЕ";
  const instituteSubtitle = footer?.instituteSubtitle || "Институт за КВБ";
  const description =
    footer?.description ||
    "Институт за кардиоваскуларне болести Дедиње је водећа здравствена установа у региону специјализована за дијагностику и лечење болести срца и крвних судова.";
  const copyright =
    footer?.copyright ||
    "© 2026 Институт за кардиоваскуларне болести Дедиње. Сва права задржана.";

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col about">
              <div className="footer-logo">
                <div className="logo-icon">
                  <img
                    src="/images/logo dedinje.png"
                    alt="Institut Dedinje Logo"
                  />
                </div>
                <div className="logo-text">
                  <span className="logo-name">{instituteName}</span>
                  <span className="logo-subtitle">{instituteSubtitle}</span>
                </div>
              </div>
              <p>{description}</p>
              {footer?.socialLinks && (
                <div className="footer-social">
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

            {/* Quick Links */}
            {footer?.quickLinks && footer.quickLinks.links.length > 0 && (
              <div className="footer-col">
                <h4>{footer.quickLinks.heading}</h4>
                <ul>
                  {footer.quickLinks.links.map((link) => (
                    <li key={link._key}>
                      <Link href={link.href}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Services */}
            {footer?.services && footer.services.links.length > 0 && (
              <div className="footer-col">
                <h4>{footer.services.heading}</h4>
                <ul>
                  {footer.services.links.map((link) => (
                    <li key={link._key}>
                      <Link href={link.href}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            {footer?.contact && (
              <div className="footer-col contact">
                <h4>{footer.contact.heading}</h4>
                <ul className="footer-contact">
                  {(footer.contact.address || footer.contact.city) && (
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>
                        {footer.contact.address && (
                          <>
                            {footer.contact.address}
                            <br />
                          </>
                        )}
                        {footer.contact.city}
                      </span>
                    </li>
                  )}
                  {(footer.contact.phone1 || footer.contact.phone2) && (
                    <li>
                      <i className="fas fa-phone-alt"></i>
                      <span>
                        {footer.contact.phone1}
                        {footer.contact.phone2 && (
                          <>
                            <br />
                            {footer.contact.phone2}
                          </>
                        )}
                      </span>
                    </li>
                  )}
                  {footer.contact.email && (
                    <li>
                      <i className="fas fa-envelope"></i>
                      <span>{footer.contact.email}</span>
                    </li>
                  )}
                  {footer.contact.workingHours && (
                    <li>
                      <i className="fas fa-clock"></i>
                      <span>
                        {footer.contact.workingHours.weekdays && (
                          <>
                            {footer.contact.workingHours.weekdays}
                            <br />
                          </>
                        )}
                        {footer.contact.workingHours.weekend}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>{copyright}</p>
            {footer?.legalLinks && footer.legalLinks.length > 0 && (
              <div className="footer-links">
                {footer.legalLinks.map((link) => (
                  <Link key={link._key} href={link.href}>
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

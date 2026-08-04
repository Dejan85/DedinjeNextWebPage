"use client";

import { useState, useEffect, useCallback } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Container from "../Container/Container";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import styles from "./Header.module.css";
import type { Navigation } from "@/sanity/types";

type MenuItem = NonNullable<Navigation["mainMenu"]>[number];

// Fallback ako Sanity fetch ne uspe ili navigation dokument nema mainMenu.
const DEFAULT_MENU: MenuItem[] = [
  { title: "ПОЧЕТНА", link: "/" },
  {
    title: "О НАМА",
    submenu: [
      { title: "Реч директора", link: "/rec-direktora", icon: "fas fa-user-tie" },
      { title: "О институту", link: "/o-institutu", icon: "fas fa-building" },
      { title: "Наш тим", link: "/nas-tim", icon: "fas fa-user-md" },
      {
        title: "Немедицински послови",
        link: "/o-nama/nemedicinski-poslovi",
        icon: "fas fa-briefcase",
      },
      {
        title: "Одбори и органи Института",
        link: "/o-nama/odbori-i-organi-instituta",
        icon: "fas fa-users",
      },
      {
        title: "Здравствена акредитација Института",
        link: "/o-nama/zdravstvena-akreditacija",
        icon: "fas fa-certificate",
      },
      { title: "Монографија Института", link: "#", icon: "fas fa-book" },
      { title: "Акт института", link: "#", icon: "fas fa-file-alt" },
      { title: "Локација", link: "/o-nama/lokacija", icon: "fas fa-map-marker-alt" },
    ],
  },
  { title: "КЛИНИКЕ", link: "/klinike" },
  {
    title: "ЗА ПАЦИЈЕНТЕ",
    link: "/za-pacijente",
    submenu: [
      { title: "Честа питања", link: "/za-pacijente/cesta-pitanja" },
      { title: "Амбуланте", link: "/za-pacijente/ambulante" },
      {
        title: "Информације",
        items: [
          { title: "Васкуларна хирургија – информације за пацијенте", link: "/za-pacijente/vaskularna-hirurgija" },
          { title: "Кардиологија – информације за пацијенте", link: "/za-pacijente/kardiologija" },
          { title: "Обавештење за електрофизиолошке процедуре", link: "/za-pacijente/elektrofizioloske-procedure" },
          { title: "Обавештење за електростимулативне процедуре", link: "/za-pacijente/elektrostimulativne-procedure" },
        ],
      },
      { title: "Пријем у болницу", link: "/za-pacijente/prijem" },
      { title: "Преоперативна припрема", link: "/za-pacijente/preoperativna-priprema" },
      {
        title: "Информације о здравственом стању пацијента",
        link: "/za-pacijente/informacije-o-stanju",
      },
      { title: "Кардиохируршки конзилијум", link: "/za-pacijente/kardiohirurski-konzilijum" },
      { title: "Васкуларни конзилијум", link: "/za-pacijente/vaskularni-konzilijum" },
      {
        title: "О вашем здрављу",
        items: [{ title: "План исхране", link: "/za-pacijente/plan-ishrane" }],
      },
    ],
  },
  {
    title: "НАУКА И ИСТРАЖИВАЊЕ",
    submenu: [
      { title: "NIO", link: "/nauka-istrazivanje/nio" },
      { title: "Центар изузетних вредности", link: "/nauka-istrazivanje/centar-izuzetnih-vrednosti" },
      { title: "SAIGE пројекат", link: "/nauka-istrazivanje/saige-projekat" },
      { title: "Актуелности из науке", link: "/nauka-istrazivanje/aktuelnosti" },
      { title: "Листа истраживача", link: "/nauka-istrazivanje/lista-istrazivaca" },
      { title: "CardioView3D LAB", link: "/nauka-istrazivanje/cardioview3d-lab" },
      {
        title: "Корисни линкови",
        items: [
          { title: "НИТРА", link: "/nauka-istrazivanje/korisni-linkovi/nitra" },
          { title: "AMPREC", link: "/nauka-istrazivanje/korisni-linkovi/amprec" },
          { title: "КОБСОН", link: "/nauka-istrazivanje/korisni-linkovi/kobson" },
          { title: "Заједница института", link: "/nauka-istrazivanje/korisni-linkovi/zajednica-instituta" },
        ],
      },
      { title: "Монографија Института", link: "/nauka-istrazivanje/monografija" },
    ],
  },
  {
    title: "ЕДУКАЦИЈА",
    submenu: [
      { title: "Едукација Институт Дедиње", link: "/edukacija" },
      { title: "KME 2024", link: "/edukacija/kme-2024" },
      { title: "Едукативни програми", link: "/edukacija/programi" },
      { title: "Интерна едукација", link: "/edukacija/interna-edukacija" },
      {
        title: "Едукација медицинских сестара и техничара",
        link: "/edukacija/sestrinska-edukacija",
      },
      { title: "Радионице", link: "/edukacija/radionice" },
      { title: "Конгреси", link: "/edukacija/kongresi" },
      { title: "Међународни конгреси", link: "/edukacija/medjunarodni-kongresi" },
    ],
  },
  {
    title: "АКТУЕЛНОСТИ",
    submenu: [
      { title: "Актуелности", link: "/aktuelnosti" },
      { title: "Вести", link: "/aktuelnosti/vesti" },
      { title: "Гостовања", link: "/aktuelnosti/gostovanja" },
      { title: "Обавештења", link: "/aktuelnosti/obavestenja" },
      { title: "Огласи и конкурси", link: "/aktuelnosti/oglasi-konkursi" },
      { title: "Часопис Дедиње", link: "/aktuelnosti/casopis-dedinje" },
      { title: "Информатор о раду", link: "/aktuelnosti/informator" },
    ],
  },
  { title: "КОНТАКТ", link: "/kontakt" },
];

export default function Header({
  menu,
  locale = "sr",
}: {
  menu?: MenuItem[] | null;
  locale?: "sr" | "en";
}) {
  const items = menu && menu.length > 0 ? menu : DEFAULT_MENU;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  const isLinkActive = useCallback(
    (link?: string) => {
      if (!link || link === "#") return false;
      if (link === "/") return pathname === "/";
      return pathname === link || pathname.startsWith(`${link}/`);
    },
    [pathname],
  );

  const hasActiveDescendant = useCallback(
    (submenu?: MenuItem["submenu"]) => {
      if (!submenu) return false;
      return submenu.some(
        (sub) =>
          isLinkActive(sub.link) || sub.items?.some((it) => isLinkActive(it.link)),
      );
    },
    [isLinkActive],
  );

  return (
    <>
      <header
        className={`${styles.mainHeader} ${isScrolled ? styles.scrolled : ""}`}
      >
        <Container>
          <div className={styles.headerCard}>
            <div className={styles.topRow}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoIcon}>
                  <img
                    src="/images/logo dedinje.png"
                    alt="Institut Dedinje Logo"
                  />
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>ДЕДИЊЕ</span>
                  <span className={styles.logoSubtitle}>Институт за КВБ</span>
                </div>
              </Link>

              <div className={styles.contactStrip}>
                <div className={styles.contactInfo}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className={styles.infoText}>
                      <span>011 3601 700</span>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <i className="fas fa-at"></i>
                    </div>
                    <div className={`${styles.infoText} ${styles.infoTextEmail}`}>
                      <a href="mailto:dedinje@ikvbd.com">dedinje@ikvbd.com</a>
                      <a href="mailto:pohvaleizsalbe@institutdedinje.org">
                        pohvaleizsalbe@institutdedinje.org
                      </a>
                    </div>
                  </div>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className={styles.infoText}>
                      <span>Хероја Милана Тепића 1</span>
                      <span>11040 Београд, Србија</span>
                    </div>
                  </div>
                </div>
                <div className={styles.headerToggles}>
                  <LanguageSwitch locale={locale} variant="dropdown" />
                </div>
              </div>
            </div>

            <nav className={`${styles.navRow} ${isMobileMenuOpen ? styles.open : ""}`}>
              <div className={styles.mobileToggles}>
                <LanguageSwitch locale={locale} />
              </div>
              <ul className={styles.navMenu}>
                {items.map((item, i) => {
                  const itemKey = item._key ?? `main-${i}`;
                  if (!item.submenu || item.submenu.length === 0) {
                    return (
                      <li key={itemKey}>
                        <Link
                          href={item.link || "#"}
                          onClick={closeMenu}
                          className={isLinkActive(item.link) ? styles.active : undefined}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  }
                  const parentActive = hasActiveDescendant(item.submenu);
                  return (
                    <li
                      key={itemKey}
                      className={`${styles.hasDropdown} ${openDropdown === itemKey ? styles.open : ""}`}
                    >
                      {item.link ? (
                        <Link
                          href={item.link}
                          onClick={closeMenu}
                          className={
                            isLinkActive(item.link) || parentActive ? styles.active : undefined
                          }
                        >
                          {item.title}
                          <i
                            className="fas fa-chevron-down"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleDropdown(itemKey);
                            }}
                          ></i>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleDropdown(itemKey)}
                          className={parentActive ? styles.active : undefined}
                        >
                          {item.title} <i className="fas fa-chevron-down"></i>
                        </button>
                      )}
                      <ul className={styles.dropdown}>
                        {item.submenu.map((sub, j) => {
                          const subKey = sub._key ?? `${itemKey}-${j}`;
                          if (sub.items && sub.items.length > 0) {
                            const subActive = sub.items.some((it) => isLinkActive(it.link));
                            return (
                              <li
                                key={subKey}
                                className={`${styles.hasSubmenu} ${subActive ? styles.active : ""}`}
                              >
                                <span>
                                  {sub.title} <i className="fas fa-chevron-right"></i>
                                </span>
                                <ul className={styles.submenu}>
                                  {sub.items.map((it, k) => (
                                    <li key={it._key ?? `${subKey}-${k}`}>
                                      <Link
                                        href={it.link}
                                        onClick={closeMenu}
                                        className={isLinkActive(it.link) ? styles.active : undefined}
                                      >
                                        {it.icon && <i className={it.icon}></i>} {it.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            );
                          }
                          return (
                            <li key={subKey}>
                              <Link
                                href={sub.link || "#"}
                                onClick={closeMenu}
                                className={isLinkActive(sub.link) ? styles.active : undefined}
                              >
                                {sub.icon && <i className={sub.icon}></i>} {sub.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              <button className={styles.navSearch}>
                <i className="fas fa-search"></i>
              </button>
            </nav>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Мени"
              aria-expanded={isMobileMenuOpen}
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`${styles.backdrop} ${isMobileMenuOpen ? styles.show : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}

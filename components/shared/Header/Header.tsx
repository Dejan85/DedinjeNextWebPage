"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container/Container";
import styles from "./Header.module.css";

export default function Header() {
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

  return (
    <>
      <div
        className={`${styles.mainHeader} ${isScrolled ? styles.scrolled : ""}`}
      >
        {/* Top Bar */}
        <div className={styles.topBar}>
          <Container>
            <button
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Мени"
              aria-expanded={isMobileMenuOpen}
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
            <div className={styles.topBarContent}>
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
              <div className={styles.topBarInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className={styles.infoText}>
                    <span>011 3601 668</span>
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
            </div>
          </Container>
        </div>

        {/* Navigation */}
        <header className={styles.header}>
          <Container>
            <nav className={`${styles.mainNav} ${isMobileMenuOpen ? styles.open : ""}`}>
              <ul className={styles.navMenu}>
                <li>
                  <Link href="/" onClick={closeMenu}>ПОЧЕТНА</Link>
                </li>
                <li className={`${styles.hasDropdown} ${openDropdown === "o-nama" ? styles.open : ""}`}>
                  <button type="button" onClick={() => toggleDropdown("o-nama")}>
                    О НАМА <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/rec-direktora" onClick={closeMenu}>
                        <i className="fas fa-user-tie"></i> Реч директора
                      </Link>
                    </li>
                    <li>
                      <Link href="/o-institutu" onClick={closeMenu}>
                        <i className="fas fa-building"></i> О институту
                      </Link>
                    </li>
                    <li>
                      <Link href="/o-nama/nemedicinski-poslovi" onClick={closeMenu}>
                        <i className="fas fa-briefcase"></i> Немедицински
                        послови
                      </Link>
                    </li>
                    <li>
                      <Link href="/o-nama/odbori-i-organi-instituta" onClick={closeMenu}>
                        <i className="fas fa-users"></i> Одбори и органи
                        Института
                      </Link>
                    </li>
                    <li>
                      <Link href="/o-nama/zdravstvena-akreditacija" onClick={closeMenu}>
                        <i className="fas fa-certificate"></i> Здравствена
                        акредитација Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={closeMenu}>
                        <i className="fas fa-book"></i> Монографија Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#" onClick={closeMenu}>
                        <i className="fas fa-file-alt"></i> Акт института
                      </Link>
                    </li>
                    <li>
                      <Link href="/o-nama/lokacija" onClick={closeMenu}>
                        <i className="fas fa-map-marker-alt"></i> Локација
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/klinike" onClick={closeMenu}>КЛИНИКЕ</Link>
                </li>
                <li className={`${styles.hasDropdown} ${openDropdown === "za-pacijente" ? styles.open : ""}`}>
                  <button type="button" onClick={() => toggleDropdown("za-pacijente")}>
                    ЗА ПАЦИЈЕНТЕ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/za-pacijente/cesta-pitanja" onClick={closeMenu}>
                        Честа питања
                      </Link>
                    </li>
                    <li>
                      <Link href="/za-pacijente/ambulante" onClick={closeMenu}>Амбуланте</Link>
                    </li>
                    <li className={styles.hasSubmenu}>
                      <span>
                        Информације <i className="fas fa-chevron-right"></i>
                      </span>
                      <ul className={styles.submenu}>
                        <li>
                          <Link href="/za-pacijente/vaskularna-hirurgija" onClick={closeMenu}>
                            Васкуларна хирургија – информације за пацијенте
                          </Link>
                        </li>
                        <li>
                          <Link href="/za-pacijente/kardiologija" onClick={closeMenu}>
                            Кардиологија – информације за пацијенте
                          </Link>
                        </li>
                        <li>
                          <Link href="/za-pacijente/elektrofizioloske-procedure" onClick={closeMenu}>
                            Обавештење за електрофизиолошке процедуре
                          </Link>
                        </li>
                        <li>
                          <Link href="/za-pacijente/elektrostimulativne-procedure" onClick={closeMenu}>
                            Обавештење за електростимулативне процедуре
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/za-pacijente/prijem" onClick={closeMenu}>Пријем у болницу</Link>
                    </li>
                    <li>
                      <Link href="/za-pacijente/preoperativna-priprema" onClick={closeMenu}>
                        Преоперативна припрема
                      </Link>
                    </li>
                    <li>
                      <Link href="/za-pacijente/informacije-o-stanju" onClick={closeMenu}>
                        Информације о здравственом стању пацијента
                      </Link>
                    </li>
                    <li>
                      <Link href="/za-pacijente/kardiohirurski-konzilijum" onClick={closeMenu}>
                        Кардиохируршки конзилијум
                      </Link>
                    </li>
                    <li>
                      <Link href="/za-pacijente/vaskularni-konzilijum" onClick={closeMenu}>
                        Васкуларни конзилијум
                      </Link>
                    </li>
                    <li className={styles.hasSubmenu}>
                      <span>
                        О вашем здрављу <i className="fas fa-chevron-right"></i>
                      </span>
                      <ul className={styles.submenu}>
                        <li>
                          <Link href="/za-pacijente/plan-ishrane" onClick={closeMenu}>
                            План исхране
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.hasDropdown} ${openDropdown === "nauka" ? styles.open : ""}`}>
                  <button type="button" onClick={() => toggleDropdown("nauka")}>
                    НАУКА И ИСТРАЖИВАЊЕ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/nauka-istrazivanje/nio" onClick={closeMenu}>NIO</Link>
                    </li>
                    <li>
                      <Link href="/nauka-istrazivanje/centar-izuzetnih-vrednosti" onClick={closeMenu}>
                        Центар изузетних вредности
                      </Link>
                    </li>
                    <li>
                      <Link href="/nauka-istrazivanje/saige-projekat" onClick={closeMenu}>
                        SAIGE пројекат
                      </Link>
                    </li>
                    <li>
                      <Link href="/nauka-istrazivanje/aktuelnosti" onClick={closeMenu}>
                        Актуелности из науке
                      </Link>
                    </li>
                    <li>
                      <Link href="/nauka-istrazivanje/lista-istrazivaca" onClick={closeMenu}>
                        Листа истраживача
                      </Link>
                    </li>
                    <li>
                      <Link href="/nauka-istrazivanje/cardioview3d-lab" onClick={closeMenu}>
                        CardioView3D LAB
                      </Link>
                    </li>
                    <li className={styles.hasSubmenu}>
                      <span>
                        Корисни линкови <i className="fas fa-chevron-right"></i>
                      </span>
                      <ul className={styles.submenu}>
                        <li>
                          <Link href="/nauka-istrazivanje/korisni-linkovi/nitra" onClick={closeMenu}>
                            НИТРА
                          </Link>
                        </li>
                        <li>
                          <Link href="/nauka-istrazivanje/korisni-linkovi/amprec" onClick={closeMenu}>
                            AMPREC
                          </Link>
                        </li>
                        <li>
                          <Link href="/nauka-istrazivanje/korisni-linkovi/kobson" onClick={closeMenu}>
                            КОБСОН
                          </Link>
                        </li>
                        <li>
                          <Link href="/nauka-istrazivanje/korisni-linkovi/zajednica-instituta" onClick={closeMenu}>
                            Заједница института
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link href="/nauka-istrazivanje/monografija" onClick={closeMenu}>
                        Монографија Института
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.hasDropdown} ${openDropdown === "edukacija" ? styles.open : ""}`}>
                  <button type="button" onClick={() => toggleDropdown("edukacija")}>
                    ЕДУКАЦИЈА <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/edukacija" onClick={closeMenu}>Едукација Институт Дедиње</Link>
                    </li>
                    <li>
                      <Link href="/edukacija/kme-2024" onClick={closeMenu}>KME 2024</Link>
                    </li>
                    <li>
                      <Link href="/edukacija/programi" onClick={closeMenu}>Едукативни програми</Link>
                    </li>
                    <li>
                      <Link href="/edukacija/interna-edukacija" onClick={closeMenu}>Интерна едукација</Link>
                    </li>
                    <li>
                      <Link href="/edukacija/sestrinska-edukacija" onClick={closeMenu}>
                        Едукација медицинских сестара и техничара
                      </Link>
                    </li>
                    <li>
                      <Link href="/edukacija/radionice" onClick={closeMenu}>Радионице</Link>
                    </li>
                    <li>
                      <Link href="/edukacija/kongresi" onClick={closeMenu}>Конгреси</Link>
                    </li>
                    <li>
                      <Link href="/edukacija/medjunarodni-kongresi" onClick={closeMenu}>Међународни конгреси</Link>
                    </li>
                  </ul>
                </li>
                <li className={`${styles.hasDropdown} ${openDropdown === "aktuelnosti" ? styles.open : ""}`}>
                  <button type="button" onClick={() => toggleDropdown("aktuelnosti")}>
                    АКТУЕЛНОСТИ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/aktuelnosti" onClick={closeMenu}>Актуелности</Link>
                    </li>
                    <li>
                      <Link href="/aktuelnosti/vesti" onClick={closeMenu}>Вести</Link>
                    </li>
                    <li>
                      <Link href="/aktuelnosti/gostovanja" onClick={closeMenu}>Гостовања</Link>
                    </li>
                    <li>
                      <Link href="/aktuelnosti/obavestenja" onClick={closeMenu}>Обавештења</Link>
                    </li>
                    <li>
                      <Link href="/aktuelnosti/oglasi-konkursi" onClick={closeMenu}>Огласи и конкурси</Link>
                    </li>
                    <li>
                      <Link href="/aktuelnosti/casopis-dedinje" onClick={closeMenu}>Часопис Дедиње</Link>
                    </li>
                    <li>
                      <Link href="/aktuelnosti/informator" onClick={closeMenu}>Информатор о раду</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/kontakt" onClick={closeMenu}>КОНТАКТ</Link>
                </li>
              </ul>
              <button className={styles.navSearch}>
                <i className="fas fa-search"></i>
              </button>
            </nav>
          </Container>
        </header>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`${styles.backdrop} ${isMobileMenuOpen ? styles.show : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}
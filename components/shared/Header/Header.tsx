"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "../Container/Container";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`${styles.mainHeader} fixed ${isScrolled ? styles.scrolled : ""}`}
      >
        {/* Top Bar */}
        <div className={styles.topBar}>
          <Container>
            <button
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Мені"
            >
              <i className="fas fa-bars"></i>
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
                    <a href="mailto:pohvaleizsalbe@institutdedinje.org">pohvaleizsalbe@institutdedinje.org</a>
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
            <nav className={styles.mainNav}>
              <ul className={styles.navMenu}>
                <li>
                  <Link href="/">ПОЧЕТНА</Link>
                </li>
                <li className={styles.hasDropdown}>
                  <button type="button">
                    О НАМА <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/rec-direktora">
                        <i className="fas fa-user-tie"></i> Реч директора
                      </Link>
                    </li>
                    <li>
                      <Link href="/o-institutu">
                        <i className="fas fa-building"></i> О институту
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-briefcase"></i> Немедицински
                        послови
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-users"></i> Одбори и органи
                        Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-certificate"></i> Здравствена
                        акредитација Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-book"></i> Монографија Института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-file-alt"></i> Акт института
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fas fa-map-marker-alt"></i> Локација
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/klinike">КЛИНИКЕ</Link>
                </li>
                <li className={styles.hasDropdown}>
                  <button type="button">
                    СТРАНИЦЕ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="#">Историјат</Link>
                    </li>
                    <li>
                      <Link href="#">Мисија & Визија</Link>
                    </li>
                    <li>
                      <Link href="#">Руководство</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">УСЛУГЕ</Link>
                </li>
                <li>
                  <Link href="#">ОДЕЉЕЊА</Link>
                </li>
                <li className={styles.hasDropdown}>
                  <button type="button">
                    ГАЛЕРИЈА <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="#">Фото галерија</Link>
                    </li>
                    <li>
                      <Link href="#">Видео галерија</Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.hasDropdown}>
                  <button type="button">
                    БЛОГ <i className="fas fa-chevron-down"></i>
                  </button>
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="#">Новости</Link>
                    </li>
                    <li>
                      <Link href="#">Чланци</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="#">КОНТАКТ</Link>
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
      {isMobileMenuOpen && (
        <div
          className={`${styles.backdrop} ${styles.show}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
